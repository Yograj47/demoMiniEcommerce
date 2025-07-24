"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminNavbar() {
    const router = useRouter()

    const handleLogout = () => {
        document.cookie = "admin-auth=; Max-Age=0; path=/";

        router.replace("/admin/login");
        window.location.reload();
    }

    return (
        <nav className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <h1
                    onClick={() => router.push("/auth/admin/dashboard")}
                    className="text-2xl font-extrabold cursor-pointer tracking-tight text-white"
                >
                    Admin<span className="text-blue-400">Panel</span>
                </h1>
                <ul className="flex items-center gap-5">
                    <li>
                        <Link
                            href="/auth/admin/dashboard"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/auth/admin/products"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/auth/admin/orders"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Orders
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
