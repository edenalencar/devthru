import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Icon } from "@/components/ui/icon"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="@container">
          <div className="flex flex-col gap-6 px-4 py-16 text-center items-center @[480px]:gap-8 @[864px]:flex-row @[864px]:text-left @[864px]:py-24 max-w-7xl mx-auto">
            <div className="flex flex-col gap-6 @[480px]:gap-8 @[864px]:justify-center flex-1">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-foreground @[480px]:text-5xl">
                  Ferramentas úteis para desenvolvedores e empresas
                </h1>
                <h2 className="text-base font-normal leading-normal text-muted-foreground @[480px]:text-lg">
                  Acelere seu fluxo de trabalho com nossa suíte de utilitários online.
                </h2>
              </div>
              <Link href="/tools" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-primary-foreground text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors self-center @[864px]:self-start">
                <span className="truncate">Explorar Ferramentas</span>
              </Link>
            </div>
            <div className="w-full max-w-md bg-center bg-no-repeat aspect-square bg-contain @[864px]:w-full flex-1" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYFDyZ59EMTwqubgJGUi3GUwx6MsnRQn79RvZi72H435jrMCvfOayP_VMnvV_lmTqr0KVbEvw20Q14hcH8JwpxO_geZoe5O0ndZQsSOgcwFjQTDbQ_S4BYjWgmShs3riT8LJbTXUg54rtlcQETcp3E87JXQpW4t3aZrCnPxfv5UR-JdWkr2ceQKVpw97ohiJwDHJanu2RwKya-gNUxvABXFf_wG5mKxplB3ZadHx8YVAIFL5wxJc2CiVxMHvw4B6gFeaFnUnYvqQ")' }}></div>
          </div>
        </section>

        {/* Differentials Section */}
        <section className="max-w-7xl mx-auto w-full px-4 py-12">
          <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em] pb-8">Nossos Diferenciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "all_inclusive", title: "Uso Gratuito Ilimitado", desc: "Acesse a maioria das nossas ferramentas sem custo e sem limites de uso." },
              { icon: "api", title: "API Premium", desc: "Integre nossas ferramentas em seus próprios aplicativos com nossa API robusta." },
              { icon: "download_for_offline", title: "Exportação de Dados", desc: "Exporte facilmente os resultados em vários formatos como JSON, CSV ou XML." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm">
                <Icon name={item.icon} className="text-primary text-3xl" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-foreground text-base font-bold leading-tight">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="max-w-7xl mx-auto w-full px-4 py-12">
          <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em] pb-8">Ferramentas Populares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "data_object", title: "Formatador JSON", desc: "Valide, formate e embeleze seus dados JSON com facilidade.", href: "/tools/utilities/json" },
              { icon: "fingerprint", title: "Gerador de UUID", desc: "Gere identificadores únicos universais (UUID v4) para suas aplicações.", href: "/tools/utilities/uuid" },
              { icon: "badge", title: "Gerador de CPF", desc: "Gere e valide números de CPF para testes de software.", href: "/tools/documents/cpf" },
              { icon: "description", title: "Gerador de CNPJ", desc: "Crie CNPJs válidos com formatação para testes.", href: "/tools/documents/cnpj" },
              { icon: "password", title: "Gerador de Senhas", desc: "Crie senhas fortes e seguras com opções personalizáveis.", href: "/tools/utilities/password" },
              { icon: "qr_code_2", title: "Gerador de QR Code", desc: "Crie códigos QR para URLs, textos e contatos.", href: "/tools/utilities/qrcode" },
            ].map((tool, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon name={tool.icon} />
                  </div>
                  <h3 className="text-foreground font-bold">{tool.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{tool.desc}</p>
                <Link href={tool.href} className="text-sm font-bold text-primary hover:underline">Acessar Ferramenta →</Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
