import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { GuitarT, CartItem, AlertT } from "../types";

export const useCart = () => {
    const initialStateCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [data] = useState<GuitarT[]>(db);
    const [cart, setCart] = useState<CartItem[]>(initialStateCart);
    const [alert, setAlert] = useState<AlertT | null>(null);

    const MAX_ITEMS = 5;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(item: GuitarT): void {
        const itemIndex = cart.findIndex(guitar => guitar.id === item.id);

        if (itemIndex >= 0) {
            const existingItem = cart[itemIndex];
            if (existingItem.quantity < MAX_ITEMS) {
                const updatedCart = [...cart];
                updatedCart[itemIndex] = { ...existingItem, quantity: existingItem.quantity + 1 };
                setCart(updatedCart);
                setAlert({ msg: 'Added to cart', type: 'success' });
            } else {
                setAlert({ msg: `You can not buy more than ${MAX_ITEMS} same items`, type: 'error' });
            }
        } else {
            const newItem: CartItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
            setAlert({ msg: 'Added to cart', type: 'success' });
        }

        setTimeout(() => setAlert(null), 3000);
    }

    function removeFromCart(id: number): void {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
        setAlert({ msg: 'Product deleted', type: 'error' });
        setTimeout(() => setAlert(null), 3000);
    }

    function increaseQuantity(id: number): void {
        let quantityChanged = false;
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                quantityChanged = true;
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });

        if (!quantityChanged) {
            setAlert({ msg: `You can not buy more than ${MAX_ITEMS} same items`, type: 'error' });
            setTimeout(() => setAlert(null), 3000);
            return;
        }

        setCart(updatedCart);
    }

    function decreaseQuantity(id: number): void {
        const updatedCart = cart
            .map(item => {
                if (item.id === id && item.quantity > 0) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }
                return item;
            })
            .filter(item => item.quantity > 0);

        setCart(updatedCart);
    }

    function clearCart(): void {
        setCart([]);
    }

    const cartTotal = useMemo(() =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

    return {
        data,
        cart,
        alert,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal
    };
};
