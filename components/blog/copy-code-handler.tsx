"use client"

import { useEffect } from "react"

export function CopyCodeHandler() {
    useEffect(() => {
        // Encontra todos os elementos pre dentro do container de markdown do blog (.prose pre)
        const codeBlocks = document.querySelectorAll(".prose pre")

        codeBlocks.forEach((block) => {
            if (block instanceof HTMLElement) {
                // Garante que o bloco pre tem a classe de relative e padding adequado para não sobrepor o botão
                block.classList.add("relative")

                // Se já tiver o botão de copiar, ignora
                if (block.querySelector(".copy-code-btn")) return

                // Cria o elemento botão
                const button = document.createElement("button")
                // Estilo Tailwind CSS elegante, harmonizando com o design do DevThru (glassmorphism/dark)
                button.className = "copy-code-btn absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800/80 transition-all duration-200 backdrop-blur-sm cursor-pointer z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                button.setAttribute("aria-label", "Copiar código")
                
                // SVG do ícone Lucide Copy
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                `

                // Adiciona classe de grupo no pre para mostrar o botão de copiar no hover (efeito premium de UX!)
                block.classList.add("group")

                // Lógica de cópia no clique
                button.addEventListener("click", async () => {
                    const codeElement = block.querySelector("code")
                    const codeText = codeElement ? codeElement.innerText : block.innerText

                    try {
                        await navigator.clipboard.writeText(codeText)
                        
                        // Transiciona para o ícone de Check (Lucide Check) em verde
                        button.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon text-emerald-500"><path d="M20 6 9 17l-5-5"/></svg>
                        `
                        button.classList.add("border-emerald-500/30", "bg-emerald-950/20")

                        // Retorna ao estado original após 2 segundos
                        setTimeout(() => {
                            button.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                            `
                            button.classList.remove("border-emerald-500/30", "bg-emerald-950/20")
                        }, 2000)
                    } catch (err) {
                        console.error("Falha ao copiar texto: ", err)
                    }
                })

                block.appendChild(button)
            }
        })
    }, [])

    return null
}
