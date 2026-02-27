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
    ];
  },
};

export default nextConfig;
