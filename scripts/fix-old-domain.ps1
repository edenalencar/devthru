param()
# Substitui URLs hardcoded do dominio antigo nos JSON-LD das pages

$appDir = Join-Path (Split-Path $PSScriptRoot) "app"
$files = Get-ChildItem -Path $appDir -Recurse -Filter "page.tsx"
$fixed = 0

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    if ($content -match "devhubtools\.com") {
        $content = $content -replace "https://devhubtools\.com", "https://www.devthru.com"
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host ("Fixed: " + ($f.FullName -replace [regex]::Escape($appDir), ""))
        $fixed++
    }
}

Write-Host ("Done! Fixed " + $fixed + " files")
