import Header from "@/components/modals/Navbar";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
