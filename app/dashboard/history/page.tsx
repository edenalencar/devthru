import { Metadata } from "next"
import { HistoryPage } from "./client"

export const metadata: Metadata = {
    title: "Histórico de Gerações",
    description: "Visualize e gerencie seu histórico de uso das ferramentas do DevThru.",
}

export default function Page() {
    return <HistoryPage />
}
