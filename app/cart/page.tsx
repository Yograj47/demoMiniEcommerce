"use client";
import Link from "next/link";
import { useCart } from "../cart";
import Image from "next/image";

export default function CartPage() {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();

    return (
        <>
            <div className="m-2">
                <Link href={"/"} className="bg-blue-500 text-white font-medium rounded-md py-1 px-2">Back</Link>
            </div>
            <div className="flex-col flex items-center bg-white border-2 border-gray-200 rounded-2xl gap-8 py-2 px-10 text-black text-sm max-w-[70%] m-auto">
                <h1 className="text-2xl font-extrabold mt-0">Cart</h1>
                <div className="flex flex-col gap-4 w-full max-w-2xl">
                    {cartItems.map((item) => (
                        <div className="flex p-1 justify-between items-center" key={item._id}>
                            <div className="flex gap-4 ">
                                <Image
                                    src={item.image || "/placeholder.jpg"}
                                    alt={item.name}
                                    className="rounded-md h-24 w-24 object-cover border border-black"
                                />
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-bold">{item.name}</h2>
                                    <p className="text-gray-600">${item.price}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center">
                                <button
                                    className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                                    onClick={() => addToCart(item)}
                                >
                                    +
                                </button>
                                <p>{item.quantity}</p>
                                <button
                                    className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                                    onClick={() => removeFromCart(item)}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col items-center gap-2">
                        <h2 className="text-lg font-bold">Total: ${getCartTotal()}</h2>
                        <button
                            className="px-4 py-2 bg-red-600 font-bold text-white rounded hover:bg-red-500"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </button>
                        <Link href={"/checkout"} className="bg-blue-400 text-white rounded-md py-1.5 px-3 text-[18px]">Proceed to Checkout</Link>
                    </div>
                ) : (
                    <>
                        <h2 className="text-lg font-bold">Your cart is empty</h2>
                    </>
                )}
            </div>
        </>
    );
}
