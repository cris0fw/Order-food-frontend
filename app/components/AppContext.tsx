import { SessionProvider } from "next-auth/react";
import React from "react";
import { AppContextProps } from "@/app/types/index";

// Le paso la session para que ande el next-auth
// cubro con la SessionProvider para que toda mi app obtenga los datos
// del usuario logueado lo llevo a Layout.tsx
const AppContext = ({ children, session }: AppContextProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AppContext;
