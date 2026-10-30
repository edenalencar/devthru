import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/dashboard/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/auth/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redireciona non-www para www (308 Permanent - transfere PageRank)
      {
        source: "/:path*",
        has: [{ type: "host", value: "devthru.com" }],
        destination: "https://www.devthru.com/:path*",
        permanent: true,
      },
      // Corrigir 404 GSC - Rota de caractere especial literal $
      {
        source: "/$",
        destination: "/",
        permanent: true,
      },
      // Redirecionamentos para páginas reportadas como 404 no SEMrush/GSC
      {
        source: "/tools/utilities/base64-encoder",
        destination: "/tools/utilities/base64",
        permanent: true,
      },
      {
        source: "/tools/utilities/uuid-generator",
        destination: "/tools/utilities/uuid",
        permanent: true,
      },
      {
        source: "/ferramentas",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ferramentas-documentos",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ferramentas-pessoais",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ferramentas/inscricao-estadual",
        destination: "/tools/documents/inscricao-estadual",
        permanent: true,
      },
      // Corrigir 404 GSC - Rotas de categoria sem página própria
      {
        source: "/tools/business",
        destination: "/ferramentas-fiscais",
        permanent: true,
      },
      {
        source: "/tools/automotive",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tools/image",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tools/personal",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tools/documents",
        destination: "/",
        permanent: true,
      },
      // Corrigir 404 GSC - index.html legado
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      // Inscrição Estadual: redireciona subrota de estado para a rota canônica
      {
        source: "/tools/documents/inscricao-estadual/:state",
        destination: "/ferramentas/inscricao-estadual/:state",
        permanent: true,
      },
      // Corrigindo URL antiga (mudou de renavam-chassis para rotas separadas)
      {
        source: "/tools/automotive/renavam-chassis",
        destination: "/tools/automotive/renavam",
        permanent: true,
      },
      // Corrigir GSC - Rota de settings apontando para rota pública para evitar indexação cega de /dashboard/settings
      {
        source: "/settings/api-keys",
        destination: "/",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/",
        permanent: true,
      },
      // Redirecionamento de slug antigo de post de blog reportado no SEMrush
      {
        source: "/blog/inscricao-estadual-guia",
        destination: "/blog/inscricao-estadual-o-que-e-como-validar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
