import Header from "@/components/Header";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
