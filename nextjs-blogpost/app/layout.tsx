import "./globals.css"
import Navbar from "./components/Navbar"
import ProfilePic from "./components/ProfilePic"

export const metadata = {
  title: "Andrii Tokar's Blog",
  description: "Created by Andrii Tokar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-800">
        <Navbar />
        <ProfilePic />
        {children}
      </body>
    </html>
  )
}
