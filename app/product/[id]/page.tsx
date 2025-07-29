"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/cart";
import { useParams } from "next/navigation";

type Product = {
    _id: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
    category?: string;
    mainImage: {
        url: string;
    };
};


export default function ProductDetailPage() {
    const params = useParams();
    const id = typeof params.id === "string" ? params.id : "";
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://demoserver-production-6df5.up.railway.app/products/${id}`);
                const json = await res.json();
                setProduct(json);

            } catch (err) {
                console.error("Failed to fetch product", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p className="p-6 text-center text-lg">Loading...</p>;
    if (!product) return <p className="p-6 text-red-500 text-center">Product not found</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-lg p-6">
                <div>
                    <img
                        src={product.mainImage.url}
                        alt={product.name}
                        className="w-full rounded-lg border-2 border-solid border-gray-400  object-cover min-h-1/2 max-h-[500px]"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="mt-4 text-gray-700 text-base">{product.description}</p>
                        <p className="mt-6 text-2xl font-semibold text-black">Rs. {product.price}</p>
                    </div>

                    <button
                        className="mt-8 bg-black text-white hover:cursor-pointer hover:bg-gray-800 px-5 py-3 rounded-lg transition duration-200 ease-in-out"
                        onClick={() => addToCart({
                            _id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.mainImage.url,
                            quantity: 1,
                        })}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
