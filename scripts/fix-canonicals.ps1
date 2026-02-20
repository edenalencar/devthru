param()
$toolsDir = Join-Path (Split-Path $PSScriptRoot) "app\tools"
$files = Get-ChildItem -Path $toolsDir -Recurse -Filter "page.tsx"
$fixed = 0
$skipped = 0

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)

    if ($content -match "generateToolMetadata" -or $content -match "canonical") {
        $skipped++
        continue
    }

    $relative = $f.FullName.Replace($toolsDir, "").Replace("\page.tsx", "").Replace("\", "/")
    $canonicalPath = "/tools" + $relative
    $canonicalUrl = "`${siteConfig.url}" + $canonicalPath

    # Adiciona import do siteConfig logo apos o import do Metadata, se nao existir
    if ($content -notmatch "siteConfig") {
        $content = $content -replace '(import \{ Metadata \} from "next")', ('import { siteConfig } from "@/config/site"' + "`r`n" + '$1')
    }

    # Adiciona alternates antes do openGraph ou keywords no metadata
    $altBlock = "    alternates: {`r`n        canonical: `$" + "{siteConfig.url}" + $canonicalPath + "`,`r`n    },"

    if ($content -match "    openGraph:") {
        $content = $content -replace "    openGraph:", ($altBlock + "`r`n    openGraph:")
    }
    elseif ($content -match "    keywords:") {
        $content = $content -replace "    keywords:", ($altBlock + "`r`n    keywords:")
    }

    [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host ("FIXED: " + $canonicalPath)
    $fixed++
}

Write-Host ""
Write-Host ("Done! Fixed: " + $fixed + " | Skipped: " + $skipped)
