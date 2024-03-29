import React, { useContext, useState } from "react";
import { promptContextValue } from "../types";

interface BalanceContextInterface {
  promptBalance: promptContextValue;
  setPromptBalance: any;
}

export const BalanceCtx = React.createContext<BalanceContextInterface>({
  promptBalance: {
    balance: 0,
    quota: 25,
    name: "",
    referralCodes: [],
  },
  setPromptBalance: () => null,
});

export const useBalance = () => useContext(BalanceCtx);
