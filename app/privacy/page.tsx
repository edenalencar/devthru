import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
                    <p className="text-muted-foreground mb-8">Última atualização: 28 de Novembro de 2025</p>

                    <p className="mb-6">
                        A sua privacidade é importante para nós. É política do <strong>DevThru</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site DevThru, e outros sites que possuímos e operamos.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">1. Informações que coletamos</h2>
                    <p className="mb-4">
                        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                    </p>
                    <p className="mb-4">
                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">2. Uso de Dados e Ferramentas de Terceiros</h2>
                    <p className="mb-4">
                        Utilizamos serviços de terceiros para melhorar a funcionalidade e o desempenho do nosso site, bem como para fins de publicidade e análise. Estes serviços podem coletar dados sobre o seu uso do site.
                    </p>

                    <h3 className="text-lg font-medium mt-6 mb-2">Google Analytics e Google Ads</h3>
                    <p className="mb-4">
                        Utilizamos o <strong>Google Analytics</strong> para entender como os visitantes interagem com o nosso site. O Google Analytics utiliza cookies para coletar informações como o tempo de visita, páginas visitadas e tempo gasto em cada página. Essas informações são agregadas e anônimas.
                    </p>
                    <p className="mb-4">
                        Também utilizamos o <strong>Google Ads</strong> para fornecer publicidade relevante. O Google utiliza cookies para exibir anúncios com base nas suas visitas anteriores ao nosso site ou a outros sites na Internet.
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Você pode desativar a publicidade personalizada acessando as <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Configurações de Anúncios do Google</a>.</li>
                        <li>Para mais informações sobre como o Google utiliza dados, consulte a <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Política de Privacidade e Termos do Google</a>.</li>
                    </ul>

                    <h3 className="text-lg font-medium mt-6 mb-2">Microsoft Clarity</h3>
                    <p className="mb-4">
                        Temos parceria com o Microsoft Clarity e o Microsoft Advertising para capturar como você usa e interage com nosso site por meio de métricas comportamentais, mapas de calor e reprodução de sessões para melhorar e comercializar nossos produtos/serviços. Os dados de uso do site são capturados usando cookies primários e de terceiros e outras tecnologias de rastreamento para determinar a popularidade de produtos/serviços e atividade online. Além disso, usamos essas informações para otimização do site, fins de fraude/segurança e publicidade. Para mais informações sobre como a Microsoft coleta e usa seus dados, visite a <a href="https://privacy.microsoft.com/pt-br/privacystatement" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Declaração de Privacidade da Microsoft</a>.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">3. Compartilhamento de dados</h2>
                    <p className="mb-4">
                        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">4. Cookies</h2>
                    <p className="mb-4">
                        O DevThru utiliza cookies para melhorar a experiência do usuário. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. Se você deixar um comentário em nosso site, poderá optar por salvar seu nome, endereço de e-mail e site nos cookies. Isso é para sua conveniência, para que você não precise preencher seus dados novamente quando fizer outro comentário.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">5. Dados Gerados</h2>
                    <p className="mb-4">
                        Os dados gerados pelas nossas ferramentas (CPFs, CNPJs, etc.) são <strong>fictícios</strong> e criados algoritmicamente para fins de testes e desenvolvimento de software. Não armazenamos esses dados gerados, a menos que você utilize a funcionalidade de "Histórico" estando logado em sua conta, onde eles são mantidos de forma segura e privada para seu uso pessoal.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">6. Compromisso do Usuário</h2>
                    <p className="mb-4">
                        O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o DevThru oferece no site e com caráter enunciativo, mas não limitativo:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
                        <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
                        <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do DevThru, de seus fornecedores ou terceiros.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8 mb-4">7. Mais informações</h2>
                    <p className="mb-4">
                        Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
