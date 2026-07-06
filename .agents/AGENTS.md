# Workspace Rules - DevThru

As regras abaixo devem ser seguidas sem exceção neste repositório.

## Git & GPG Signing
- **Nunca utilize a flag `--no-gpg-sign`** ao realizar commits do Git. Todos os commits do agente devem ser devidamente assinados.
- Caso o commit falhe ou trave devido a credenciais do GPG expiradas no cache, interrompa a execução, relate o ocorrido e **solicite explicitamente ao usuário que execute um commit rápido** (ou comando `echo "teste" | gpg --clearsign`) em seu terminal principal para renovar o cache da chave GPG.
