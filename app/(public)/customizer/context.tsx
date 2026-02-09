"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { SnowboardDeckOption, SnowboardBaseOption, SnowboardBindingOption } from "@/data/customizer";

type CustomizerControlsContext = {
  selectedBoard?: SnowboardDeckOption;
  setBoard: (board: SnowboardDeckOption) => void;
  selectedBase?: SnowboardBaseOption;
  setBase: (base: SnowboardBaseOption) => void;
  selectedBinding?: SnowboardBindingOption;
  setBinding: (binding: SnowboardBindingOption) => void;
};

const defaultContext: CustomizerControlsContext = {
  setBoard: () => { },
  setBase: () => { },
  setBinding: () => { },
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  defaultBoard?: SnowboardDeckOption;
  defaultBase?: SnowboardBaseOption;
  defaultBinding?: SnowboardBindingOption;
  children?: ReactNode;
};

export function CustomizerControlsProvider({
  defaultBoard,
  defaultBase,
  defaultBinding,
  children,
}: CustomizerControlsProviderProps) {
  const [selectedBoard, setBoard] = useState(defaultBoard);
  const [selectedBase, setBase] = useState(defaultBase);
  const [selectedBinding, setBinding] = useState(defaultBinding);

  const value = useMemo(() => {
    return {
      selectedBoard,
      setBoard,
      selectedBase,
      setBase,
      selectedBinding,
      setBinding,
    };
  }, [selectedBoard, selectedBase, selectedBinding]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}
