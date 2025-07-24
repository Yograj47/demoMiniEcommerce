"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function AdminDashboard() {
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState<Order[]>([])
    const [totalRevenue, setTotalRevenue] = useState(0)

    useEffect(() => {
        // Fetch allOrders from localStorage
        const storedOrders = localStorage.getItem("allOrders")
        const parsedOrders: Order[] = storedOrders ? JSON.parse(storedOrders) : []

        setOrders(parsedOrders)

        // Calculate total revenue
        const revenue = parsedOrders.reduce((sum, order) => sum + (order.total || 0), 0)
        setTotalRevenue(revenue)

        // Fetch products from backend
        fetch("https://demoserver-production-6df5.up.railway.app/products")
            .then((res) => res.json())
            .then((data) => setProducts(data.data.products))
            .catch(error => console.error("Error occurred:", error))
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Total Products</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                    {products.length}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Total Orders</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                    {orders.length}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                    ${totalRevenue.toFixed(2)}
                </CardContent>
            </Card>
        </div>
    )
}
