param()
# Corrige o template literal quebrado nas canonicals geradas pelo script anterior
# O problema: canonical: ${siteConfig.url}/tools/... sem crases
# Deve ser:  canonical: `${siteConfig.url}/tools/...`

$toolsDir = Join-Path (Split-Path $PSScriptRoot) "app\tools"
$files = Get-ChildItem -Path $toolsDir -Recurse -Filter "page.tsx"
$fixed = 0

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)

    # Padrao incorreto: canonical: ${siteConfig.url}/tools/ALGO,
    # Padrao correto:   canonical: `${siteConfig.url}/tools/ALGO`,
    if ($content -match "canonical: \$\{siteConfig\.url\}") {
        $content = $content -replace "canonical: (\$\{siteConfig\.url\}[^,`]+),", 'canonical: `$1`,'
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host ("FIXED: " + $f.FullName.Replace((Split-Path $PSScriptRoot), ""))
        $fixed++
    }
}

Write-Host ("Done! Fixed: " + $fixed + " files")
