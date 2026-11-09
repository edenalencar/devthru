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
    description: "DevThru: Dados rápidos pra viagem. Geradores e utilitários essenciais para profissionais, analistas e equipes de tecnologia.",
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
        github: "https://github.com/edenalencar/devthru",
        youtube: "https://www.youtube.com/@Devthru",
        tiktok: "https://www.tiktok.com/@devthru",
        instagram: "https://www.instagram.com/devthru.br/",
    },
    creator: {
        name: "DevThru Team",
        url: "https://www.devthru.com",
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
        title: "Anuncie",
        href: "/anuncie",
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
