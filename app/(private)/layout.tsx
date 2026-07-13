import Header from "@/components/Header/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="min-h-full flex flex-col bg-gray-900 text-white">
      <Header />

      <h1>Private Page</h1>

      {children}
    </div>
  );
}
