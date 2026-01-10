import { Metadata } from "next"
import { DashboardPage } from "./client"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Gerencie suas atividades, histórico e acesso rápido às ferramentas do DevThru.",
}

export default function Page() {
    return <DashboardPage />
}
