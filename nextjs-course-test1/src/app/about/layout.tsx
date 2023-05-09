export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>
        <h2 className="px-2 pt-2">About navigation</h2>
      </nav>
      <main>{children}</main>
    </>
  );
}
