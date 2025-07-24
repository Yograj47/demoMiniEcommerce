"use client"
import Link from "next/link";
import { useCart } from "../cart";

export default function Navbar() {
    const { getCartLength } = useCart();
    const cartLength = getCartLength();
    return (
        <nav className="w-full bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
                    Mini<span className="text-black">Ecommerce</span>
                </h1>
                <ul className="flex items-center gap-5">
                    <li>
                        <Link
                            href="/"
                            className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="relative">
                        <Link
                            href="/cart"
                            className="bg-gray-900 text-white px-4 py-1.5 rounded-md hover:bg-gray-700 transition"
                        >
                            Cart
                        </Link>
                        {cartLength > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                {cartLength}
                            </span>
                        )}
                    </li>
                    <li>
                        <Link
                            href="/admin/login"
                            className="bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5 duration-200 ease-in-out"
                        >
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
