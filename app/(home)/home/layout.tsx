import Navbar from "@/components/modals/Navbar";
 
 
  

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
