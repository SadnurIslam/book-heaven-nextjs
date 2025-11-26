import "./globals.css";
import Navbar from "./components/Navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col">
        <Navbar></Navbar>
        <main className="grow md:w-11/12 min-h-screen mx-auto px-4 py-5">
        {children}
        </main>
        
      </body>
    </html>
  );
}
