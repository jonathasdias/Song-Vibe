import Header from "@/components/Header/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <Header />

      <h1>Private Page</h1>

      {children}
    </div>
  );
}
