import React, { createContext, useContext, useState } from "react";

type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	category: string;
	time: string;
};

type CartContextType = {
	cartItems: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
	getCartSummary: () => {
		subtotal: number;
		discount: number;
		homeServiceCharge: number;
		total: number;
		totalTime: string;
	};
	isHomeService: boolean;
	setIsHomeService: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isHomeService, setIsHomeService] = useState(false);

	const addToCart = (item: CartItem) => {
		const exist = cartItems.find((i) => i.id === item.id);
		if (exist) {
			setCartItems(
				cartItems.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
				)
			);
		} else {
			setCartItems([...cartItems, { ...item, quantity: 1 }]);
		}
	};

	const removeFromCart = (id: string) => {
		setCartItems(cartItems.filter((i) => i.id !== id));
	};

	const updateQuantity = (id: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(id);
		} else {
			setCartItems(
				cartItems.map((i) => (i.id === id ? { ...i, quantity } : i))
			);
		}
	};

	const clearCart = () => setCartItems([]);

	const getCartSummary = () => {
		const subtotal = cartItems.reduce(
			(sum, i) => sum + i.price * i.quantity,
			0
		);
		const discount = subtotal >= 500 ? 50 : 0;
		const homeServiceCharge = isHomeService ? 100 : 0;
		const total = subtotal - discount + homeServiceCharge;
		const totalTime = cartItems.map((i) => i.time).join(", ");
		return { subtotal, discount, homeServiceCharge, total, totalTime };
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getCartSummary,
				isHomeService,
				setIsHomeService,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCartContext must be used within a CartProvider");
	}
	return context;
};
