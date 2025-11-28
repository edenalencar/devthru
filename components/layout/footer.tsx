import Link from "next/link"
import { Code2, Github, Twitter } from "lucide-react"
import { siteConfig } from "@/config/site"

export function Footer() {
    return (
        <footer className="mt-auto border-t bg-muted/20">
            <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Code2 className="h-6 w-6 text-primary" />
                            <span className="font-bold text-xl">DevTools Hub</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Ferramentas online para desenvolvedores e empresas. Rápido, seguro e gratuito.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href={siteConfig.links.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>

                    {/* Ferramentas */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Ferramentas</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/tools/documents/cpf" className="text-muted-foreground hover:text-primary transition-colors">
                                    Gerador de CPF
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/documents/cnpj" className="text-muted-foreground hover:text-primary transition-colors">
                                    Gerador de CNPJ
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/utilities/uuid" className="text-muted-foreground hover:text-primary transition-colors">
                                    Gerador de UUID
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                                    Ver todas →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Empresa */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Empresa</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    Sobre
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                                    Preços
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contato
                                </Link>
                            </li>
                            <li>
                                <Link href="/updates" className="text-muted-foreground hover:text-primary transition-colors">
                                    Atualizações
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Recursos */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Recursos</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/api-docs" className="text-muted-foreground hover:text-primary transition-colors">
                                    Documentação API
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacidade
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Termos de Uso
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright - sem linha divisória */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} DevTools Hub. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
