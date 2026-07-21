# Script para registrar a tarefa no Agendador de Tarefas do Windows (Task Scheduler)
$TaskName = "DevThru_Editorial_Workflow"
$ScriptPath = "$PSScriptRoot\editorial_workflow.py"
$WorkDir = (Get-Item "$PSScriptRoot\..").FullName

Write-Host "Configurando tarefa agendada: $TaskName..." -ForegroundColor Cyan

$Action = New-ScheduledTaskAction -Execute "python.exe" -Argument "`"$ScriptPath`"" -WorkingDirectory "$WorkDir"
$Trigger = New-ScheduledTaskTrigger -Daily -At 08:00AM
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

try {
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Gera diariamente o rascunho do calendário editorial do blog DevThru" -Force | Out-Null
    Write-Host "Tarefa '$TaskName' agendada com sucesso para rodar diariamente as 08:00!" -ForegroundColor Green
} catch {
    Write-Host "Falha ao registrar a tarefa agendada: $($_.Exception.Message)" -ForegroundColor Red
}
