export const siteConfig = {
    name: "DevThru",
    description: "DevThru: Dados rápidos pra viagem. Plataforma moderna e ágil para desenvolvedores.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ogImage: "/og-image.png",
    keywords: [
        "devtools",
        "developer tools",
        "validador cpf",
        "gerador cpf",
        "formatador json",
        "conversor imagem",
        "brasil",
    ],
    links: {
        twitter: "https://twitter.com/devtoolshub",
        github: "https://github.com/devtoolshub",
    },
    creator: {
        name: "DevThru Team",
        url: "https://devthru.com",
    },
}

export const navLinks = [
    {
        title: "Preços",
        href: "/pricing",
    },
    {
        title: "Contato",
        href: "/contact",
    },
    {
        title: "Atualizações",
        href: "/updates",
    },
]
