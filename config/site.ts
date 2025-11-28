export const siteConfig = {
    name: "DevTools Hub",
    description: "Plataforma moderna de ferramentas online para desenvolvedores e empresas. Geração e validação de dados, utilidades e muito mais.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ogImage: "/og-image.png",
    links: {
        twitter: "https://twitter.com/devtoolshub",
        github: "https://github.com/devtoolshub",
    },
    creator: {
        name: "DevTools Hub Team",
        url: "https://devtoolshub.com",
    },
}

export const navLinks = [
    {
        title: "Ferramentas",
        href: "/tools",
    },
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Documentação",
        href: "/docs",
    },
    {
        title: "Preços",
        href: "/pricing",
    },
    {
        title: "Sobre",
        href: "/about",
    },
]
