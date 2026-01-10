import { Metadata } from "next"
import { RenavamChassisPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de RENAVAM e Chassis - Validação de VIN",
    description: "Gere códigos válidos de RENAVAM e Chassis (VIN) para testes de sistemas automotivos.",
}

export default function Page() {
    return <RenavamChassisPage />
}
