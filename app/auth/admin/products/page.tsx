"use client"
import { useEffect, useState } from "react"

type Product = {
    _id: string
    name: string
    price: number
    image: string
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch("https://demoserver-production-6df5.up.railway.app/products")
            .then((res) => res.json())
            .then((data) => setProducts(data.data.products))
    }, [])

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">All Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product: any) => (
                    <div
                        key={product._id}
                        className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-40 w-full object-cover mb-2 rounded"
                        />
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
