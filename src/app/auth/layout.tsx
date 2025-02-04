import type { Metadata } from "next";
import AltHeader from "@/app/components/altHeader";

export const metadata: Metadata = {
  title: "Autenticação de Usuário",
  description: "made by tarffienation",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AltHeader />
      {children}
    </>
  );
}
