import { Metadata } from "next"
import { ForgotPasswordPage } from "./client"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Recuperar Senha",
    description: "Recupere o acesso à sua conta DevThru.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: `${siteConfig.url}/forgot-password`,
    },
}

export default function Page() {
    return <ForgotPasswordPage />
}
