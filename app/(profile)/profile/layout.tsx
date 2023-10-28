 
 

export default async function DashboardLayout({
  children,
  
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  

  return (
    <>
      <div>{children}</div>
    </>
  );
}
