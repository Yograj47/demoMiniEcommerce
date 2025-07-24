"use client"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] bg-white px-4">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
            <p className="text-lg text-gray-700 mb-6 text-center">
                Your order has been submitted successfully.
            </p>
            <button
                onClick={() => router.push("/")}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer transition"
            >
                Go to Home
            </button>
        </div>
    )
}
