import { createContext, useEffect, useState } from "react";

const initState = JSON.parse(localStorage.getItem("palette")) || {
  color: "black",
};

export const PaletteContext = createContext();

export const PaletteProvider = ({ children }) => {
  const [palette, setPalette] = useState(initState);

  useEffect(() => {
    localStorage.setItem("palette", JSON.stringify(palette));
  }, [palette]);
  const changePalette = (newColor) => {
    setPalette({ ...palette, color: newColor });
  };

  return (
    <PaletteContext.Provider value={{ palette, changePalette }}>
      {children}
    </PaletteContext.Provider>
  );
};
