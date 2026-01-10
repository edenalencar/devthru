import { Metadata } from "next"
import { SettingsPage } from "./client"

export const metadata: Metadata = {
    title: "Configurações",
    description: "Gerencie suas configurações de conta, chaves de API e plano de assinatura.",
}

export default function Page() {
    return <SettingsPage />
}
