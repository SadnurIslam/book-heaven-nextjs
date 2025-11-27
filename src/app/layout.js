import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./contexts/AuthProvider";

export const metadata = {
  title: {
    default: "The Book Heaven",
    template: "%s | The Book Heaven",
  },
};

export default function RootLayout({ children }) {



  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar></Navbar>
          <main className="grow md:w-11/12 min-h-screen mx-auto px-4 py-5">
            {children}
          </main>
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}
