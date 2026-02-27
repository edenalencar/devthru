const getBaseUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    }
    // Sempre forçar o domínio final de produção (www) para evitar loops de 
    // redirecionamento nas tags canônicas (ex: naked domain 307 -> www)
    return "https://www.devthru.com";
}

export const siteConfig = {
    name: "DevThru",
    description: "DevThru: Dados rápidos pra viagem. Plataforma moderna e ágil para desenvolvedores.",
    url: getBaseUrl(),
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
        twitter: "https://twitter.com/devthru",
        github: "https://github.com/devthru",
    },
    creator: {
        name: "DevThru Team",
        url: "https://devthru.com",
    },
}

export const navLinks = [
    {
        title: "Ferramentas Fiscais",
        href: "/ferramentas-fiscais",
    },
    {
        title: "Blog",
        href: "/blog",
    },
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
