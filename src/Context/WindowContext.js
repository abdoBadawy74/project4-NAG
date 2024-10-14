import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext();
export default function WindowContext({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }
    // trigger the function on resize of the window
    window.addEventListener("resize", setWindowWidth);

    // Clean up the event listener
    return () => window.removeEventListener("resize", setWindowWidth);
  }, []);

  return (
    <WindowSize.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </WindowSize.Provider>
  );
}
