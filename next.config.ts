import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // Redireciona non-www para www (308 Permanent - transfere PageRank)
      {
        source: "/:path*",
        has: [{ type: "host", value: "devthru.com" }],
        destination: "https://www.devthru.com/:path*",
        permanent: true,
      },
      // Corrigir 404 GSC - Rota de diretório sem página
      {
        source: "/tools/business",
        destination: "/ferramentas-fiscais",
        permanent: true,
      },
      // Corrigir 404 GSC - index.html legado
      {
        source: "/((?:index\\.html)$)", // Apenas para index.html na raiz (opcional: ou /*/index.html)
        destination: "/",
        permanent: true,
      },
      // Redirecionamentos para páginas reportadas como 404 no GSC
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
      // Corrigindo URL antiga (mudou de renavam-chassis para rotas separadas)
      {
        source: "/tools/automotive/renavam-chassis",
        destination: "/tools/automotive/renavam",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
