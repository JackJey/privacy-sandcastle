export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>header</header>
      <main className="text-green-500">{children}</main>
      <footer>footer</footer>
    </div>
  )
}
