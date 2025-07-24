import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/navigation";
import { CartProvider } from "./cart";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNavbar from "./component/adminNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Ecommerce",
  description: "this is a demo version of ecommerce website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin-auth")?.value;

  const isOnAdminRoute = typeof window === "undefined" &&
    (typeof window === "undefined" &&
      (typeof location !== "undefined" && location.pathname.startsWith("/admin")));

  if (isAdmin === undefined && isOnAdminRoute) {
    redirect("/admin/login");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isAdmin ? (
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        ) : (
          <>
            <AdminNavbar />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
