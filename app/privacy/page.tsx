import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1>Política de Privacidade</h1>
                    <p className="lead">Última atualização: 28 de Novembro de 2025</p>

                    <p>
                        A sua privacidade é importante para nós. É política do DevHub Tools respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site DevHub Tools, e outros sites que possuímos e operamos.
                    </p>

                    <h2>1. Informações que coletamos</h2>
                    <p>
                        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                    </p>
                    <p>
                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                    </p>

                    <h2>2. Compartilhamento de dados</h2>
                    <p>
                        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                    </p>

                    <h2>3. Cookies</h2>
                    <p>
                        O DevHub Tools utiliza cookies para melhorar a experiência do usuário. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
                    </p>

                    <h2>4. Dados Gerados</h2>
                    <p>
                        Os dados gerados pelas nossas ferramentas (CPFs, CNPJs, etc.) são fictícios e criados algoritmicamente. Não armazenamos esses dados, a menos que você utilize a funcionalidade de "Histórico" estando logado em sua conta.
                    </p>

                    <h2>5. Compromisso do Usuário</h2>
                    <p>
                        O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o DevHub Tools oferece no site e com caráter enunciativo, mas não limitativo:
                    </p>
                    <ul>
                        <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
                        <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
                        <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do DevHub Tools, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
                    </ul>

                    <h2>6. Mais informações</h2>
                    <p>
                        Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
