import "@/app/globals.css";

import AltHeader from "@/app/components/altHeader";

export default function NewServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AltHeader />
      {children}
    </div>
  );
}
