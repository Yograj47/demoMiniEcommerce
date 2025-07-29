"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { useCart } from "../cart"
import { useRouter } from "next/navigation"

const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string()
})

type CheckDetail = z.infer<typeof schema>

type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}


export default function Checkout() {
    const { clearCart } = useCart()
    const router = useRouter()

    const { register, handleSubmit } = useForm<CheckDetail>({
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<CheckDetail> = (data) => {
        // 1. Get cart items
        const cartItemsRaw = localStorage.getItem("cartItems");
        const cartItems: CartItem[] = cartItemsRaw ? JSON.parse(cartItemsRaw) : [];

        // 2. Prepare new order
        const newOrder = {
            userInfo: data,
            items: cartItems,
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            createdAt: new Date().toISOString()
        };

        // 3. Append to existing orders
        const existingOrdersRaw = localStorage.getItem("allOrders");
        const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
        const updatedOrders = [...existingOrders, newOrder];
        localStorage.setItem("allOrders", JSON.stringify(updatedOrders));

        // 4. Clear temporary data
        localStorage.removeItem("cartItems");
        localStorage.removeItem("userInfo");

        clearCart();
        router.push("/success");
    };


    return (
        <div className="flex flex-col items-center justify-center bg-white px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-black">Checkout</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-gray-100 border border-gray-300 rounded-lg p-6 shadow"
            >
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Han Li"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        {...register("email")}
                        type="text"
                        placeholder="example@gmail.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        {...register("address")}
                        type="text"
                        placeholder="Balaju Chowk, Kathmandu"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Checkout
                </button>
            </form>
        </div>
    )
}
