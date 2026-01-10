import { Metadata } from "next"
import { ProfilePage } from "./client"

export const metadata: Metadata = {
    title: "Meu Perfil",
    description: "Gerencie suas informações pessoais e preferências da conta DevThru.",
}

export default function Page() {
    return <ProfilePage />
}
