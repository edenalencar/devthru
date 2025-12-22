import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
                    <p className="text-muted-foreground mb-8">Última atualização: 28 de Novembro de 2025</p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">1. Termos</h2>
                    <p className="mb-4">
                        Ao acessar ao site <strong>DevThru</strong>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
                    </p>
                    <p className="mb-4">
                        Ao utilizar nossos serviços, você também concorda com a coleta e uso de informações conforme estabelecido em nossa <a href="/privacy" className="text-primary hover:underline">Política de Privacidade</a>, incluindo o uso de ferramentas de análise de terceiros (como Microsoft Clarity e Google Analytics) para melhoria contínua da experiência do usuário e otimização do serviço.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">2. Uso de Licença</h2>
                    <p className="mb-4">
                        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site DevThru , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Modificar ou copiar os materiais;</li>
                        <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
                        <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site DevThru;</li>
                        <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
                        <li>Transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
                    </ul>
                    <p className="mb-4">
                        Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por DevThru a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">3. Isenção de responsabilidade</h2>
                    <p className="mb-4">
                        Os materiais no site da DevThru são fornecidos 'como estão'. DevThru não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
                    </p>
                    <p className="mb-4">
                        Além disso, o DevThru não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">4. Limitações</h2>
                    <p className="mb-4">
                        Em nenhum caso o DevThru ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em DevThru, mesmo que DevThru ou um representante autorizado da DevThru tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">5. Precisão dos materiais</h2>
                    <p className="mb-4">
                        Os materiais exibidos no site da DevThru podem incluir erros técnicos, tipográficos ou fotográficos. DevThru não garante que qualquer material em seu site seja preciso, completo ou atual. DevThru pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, DevThru não se compromete a atualizar os materiais.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">6. Links</h2>
                    <p className="mb-4">
                        O DevThru não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por DevThru do site. O uso de qualquer site vinculado é por conta e risco do usuário.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">7. Modificações</h2>
                    <p className="mb-4">
                        O DevThru pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">8. Lei aplicável</h2>
                    <p className="mb-4">
                        Estes termos e condições são regidos e interpretados de acordo com as leis do DevThru e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
