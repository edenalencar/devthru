@echo off
rem Script de execução automática do fluxo editorial diário do DevThru para o Agendador de Tarefas do Windows
cd /d "%~dp0.."
python scripts\editorial_workflow.py >> scripts\editorial.log 2>&1
