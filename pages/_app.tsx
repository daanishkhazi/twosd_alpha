import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { BalanceCtx } from "../Context/balance-context";
import { useState } from "react";
import { promptContextValue } from "../types";


export default function App({ Component, pageProps }: AppProps) {
  const [promptBalance, setPromptBalance] = useState<promptContextValue>({
    balance: -1,
    quota: 100 
  })

  return (
    <SessionProvider session={pageProps.session}>
      <BalanceCtx.Provider value={{promptBalance, setPromptBalance}}>
        <Component {...pageProps} />
      </BalanceCtx.Provider>
    </SessionProvider>
  );
}
