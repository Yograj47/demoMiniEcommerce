"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Type for a single cart item
export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
};

//  Type for context state
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (item: CartItem) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartLength: () => number;
}

//  Create context
export const CartContext = createContext<CartContextType | null>(null);

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("cartItems");
        if (stored) {
            setCartItems(JSON.parse(stored));
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        const isInCart = cartItems.find((i) => i._id === item._id);
        if (isInCart) {
            setCartItems(
                cartItems.map((i) =>
                    i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (item: CartItem) => {
        const isInCart = cartItems.find((i) => i._id === item._id);
        if (!isInCart) return;

        if (isInCart.quantity === 1) {
            setCartItems(cartItems.filter((i) => i._id !== item._id));
        } else {
            setCartItems(
                cartItems.map((i) =>
                    i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
                )
            );
        }
    };

    const clearCart = () => setCartItems([]);

    const getCartTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const getCartLength = () =>
        cartItems.map((cartItem) => cartItem.quantity).reduce((total, curr) => total += curr, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotal,
                getCartLength
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
