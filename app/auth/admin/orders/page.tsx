"use client"
import { useEffect, useState } from "react"

type Order = {
    userInfo: {
        name: string
        email: string
        address: string
    }
    items: {
        name: string
        price: number
        quantity: number
    }[]
    total: number
    createdAt: string
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        const allOrdersRaw = localStorage.getItem("allOrders")
        const parsedOrders: Order[] = allOrdersRaw ? JSON.parse(allOrdersRaw) : []
        setOrders(parsedOrders)
    }, [])

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Orders</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm p-5"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Order #{index + 1}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Placed on: {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="mb-4 bg-gray-50 p-4 rounded">
                                <h4 className="font-medium text-gray-800 mb-2">Customer Info</h4>
                                <p><strong>Name:</strong> {order.userInfo.name}</p>
                                <p><strong>Email:</strong> {order.userInfo.email}</p>
                                <p><strong>Address:</strong> {order.userInfo.address}</p>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">Items</h4>
                                <ul className="list-disc list-inside text-gray-700 mb-2">
                                    {order.items.map((item, i) => (
                                        <li key={i}>
                                            {item.name} — {item.quantity} × ${item.price}
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-semibold text-gray-900">
                                    Total: ${order.total.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
