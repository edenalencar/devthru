import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
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
      // Redirecionamentos para páginas reportadas como 404 no SEMrush/GSC
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
      // Corrigir 404 GSC - Rota de diretório sem página
      {
        source: "/tools/business",
        destination: "/ferramentas-fiscais",
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
