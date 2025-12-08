#!/usr/bin/env pwsh

# Script to add HistoryButton to all remaining tools
# This script adds the import and button integration

$tools = @(
    @{Path="c:\Users\edena\Projetos\devhubtools\app\tools\documents\rg\page.tsx"; ToolId="rg"; ToolName="RG"; Variable="generatedRG"},
    @{Path="c:\Users\edena\Projetos\devhubtools\app\tools\documents\cnh\page.tsx"; ToolId="cnh"; ToolName="CNH"; Variable="generatedCNH"},
    @{Path="c:\Users\edena\Projetos\devhubtools\app\tools\personal\name\page.tsx"; ToolId="name"; ToolName="Nome"; Variable="generatedName"},
    @{Path="c:\Users\edena\Projetos\devhubtools\app\tools\personal\email\page.tsx"; ToolId="email"; ToolName="Email"; Variable="generatedEmail"},
    @{Path="c:\Users\edena\Projetos\devhubtools\app\tools\personal\phone\page.tsx"; ToolId="phone"; ToolName="Telefone"; Variable="generatedPhone"},
    @{Path="c:\Users\edena\Projetos\devhubtools\app\tools\personal\address\page.tsx"; ToolId="address"; ToolName="Endereço"; Variable="generatedAddress"}
)

Write-Host "Tools to update: $($tools.Count)" -ForegroundColor Green

foreach ($tool in $tools) {
    Write-Host "`nProcessing: $($tool.ToolName)" -ForegroundColor Cyan
    Write-Host "  Path: $($tool.Path)"
    Write-Host "  ToolId: $($tool.ToolId)"
    Write-Host "  Variable: $($tool.Variable)"
}

Write-Host "`nThis is a dry-run. Manual integration required." -ForegroundColor Yellow
