"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

type ProductType = {
    _id: string;
    name: string;
    price: number;
    description: string;
    mainImage: {
        url: string;
        localPath: string;
        _id: string;
    };
    url?: string;
};

export default function Product() {
    const [ProductData, setProductData] = useState<ProductType[]>([]);
    const fetchProducts = () => {
        fetch("https://demoserver-production-6df5.up.railway.app/products")
            .then(response => response.json())
            .then(data => {
                setProductData(data.data.products)
                console.log(data.data.products);

            })
            .catch(error => console.error("Error fetching:", error));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(ProductData);

    return (
        <>
            <div className="h-[50vh] bg-blue-300 shadow-xl shadow-blue-200 w-full flex justify-center items-center">
                <p className="text-3xl font-bold font-mono text-gray-600"
                >Welcome to  <span className="text-blue-700">Mini</span>Ecommerce</p>
            </div>
            <div className="flex flex-col w-full items-center mt-5">
                <h1 className="font-extrabold text-3xl text-gray-700">Products</h1>
                <ul className="w-full grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-6 gap-y-8 p-3 mt-2">
                    {
                        ProductData.length > 0 ? (
                            ProductData.map((product, idx) => (
                                <Card
                                    key={idx}
                                    className="p-4 rounded-lg border-2 border-gray-500 hover:-translate-y-1 hover:shadow-xs hover:border-black transition duration-200"
                                >
                                    <Link href={`/product/${product._id}`} className="block space-y-2">
                                        <img
                                            src={product.mainImage?.url}
                                            alt={product.name}
                                            className="w-full h-48 object-cover rounded-md border-2 border-gray-200"
                                        />
                                        <p className="text-lg font-semibold text-gray-800 truncate">
                                            {product.name}
                                        </p>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <p className="text-blue-600 font-bold text-md">${product.price}</p>
                                    </Link>
                                </Card>

                            ))
                        ) : (
                            <p className="text-red-400 font-semibold text-[20px]"
                            >Product Not found</p>
                        )
                    }
                </ul>
            </div>
        </>
    );
}