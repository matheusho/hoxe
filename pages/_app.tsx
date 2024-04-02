import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Um aplicativo completo para gerenciar suas tarefas diárias e manter um backlog organizado. Priorize tarefas, acompanhe o progresso e aumente sua produtividade." />
        <meta name="keywords" content="gestão de tarefas, lista de tarefas, backlog, priorização de tarefas, produtividade, organização" />
        <meta name="application-name" content="Hoxe" />
        <meta name="author" content="mushion.co - Digital Studio" />
        <meta name="robots" content="index, follow" />
        <title>Hoxe - Held Today</title>
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
