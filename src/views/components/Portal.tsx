import { ReactNode, useEffect, useRef, useState } from "react";
import * as React from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: ReactNode;
}
export const Portal = ({ children }: PortalProps) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector("#__portal");
    setMounted(true);
  }, []);
  return mounted ? createPortal(children, ref?.current) : null;
};
