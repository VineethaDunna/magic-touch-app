// src/context/CartContext.tsx
import React, { createContext, useContext, useState } from "react";

export type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image?: string | any;
	category?: string;
	time?: string;
};

type CartContextType = {
	cartItems: CartItem[];
	addToCart: (
		item: Partial<CartItem> & Record<string, any>,
		type?: "service" | "combo"
	) => void;
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

// small helper to parse "Only 1,499" or "₹1,499" -> 1499
const parsePriceLabel = (lbl?: string | number) => {
	if (typeof lbl === "number") return lbl;
	if (!lbl || typeof lbl !== "string") return null;
	const m = lbl.match(/(\d[\d,]*)/);
	if (!m) return null;
	return Number(m[1].replace(/,/g, ""));
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isHomeService, setIsHomeService] = useState(false);

	const addToCart = (
		raw: Partial<CartItem> & Record<string, any>,
		_type?: "service" | "combo"
	) => {
		// normalize fields from various screens (title -> name, priceLabel -> price)
		const id = raw.id ?? raw._id ?? `tmp-${Date.now()}`;
		const name = raw.name ?? raw.title ?? raw.serviceName ?? "Item";
		const price =
			typeof raw.price === "number"
				? raw.price
				: parsePriceLabel(raw.priceLabel ?? raw.amount ?? raw.priceText) ?? 0;
		const image = raw.image ?? raw.img ?? "";
		const category = raw.category ?? raw.type ?? "General";
		const time =
			raw.time ??
			raw.duration ??
			rawMinutesToString?.(raw) ??
			raw.timeLabel ??
			"0";

		const normalized: CartItem = {
			id,
			name,
			price,
			quantity: raw.quantity ?? 1,
			image,
			category,
			time,
		};

		setCartItems((prev) => {
			const exist = prev.find((i) => i.id === normalized.id);
			if (exist) {
				return prev.map((i) =>
					i.id === normalized.id ? { ...i, quantity: i.quantity + 1 } : i
				);
			} else {
				return [...prev, normalized];
			}
		});
	};

	// fallback helper (optional): try to convert different time shapes to readable string
	const rawMinutesToString = (r: any) => {
		if (!r) return undefined;
		if (typeof r === "string") return r;
		if (r.minutes) return `${r.minutes} min`;
		return undefined;
	};

	const removeFromCart = (id: string) => {
		setCartItems((prev) => prev.filter((i) => i.id !== id));
	};

	const updateQuantity = (id: string, quantity: number) => {
		setCartItems((prev) =>
			prev
				.map((i) => (i.id === id ? { ...i, quantity } : i))
				.filter((i) => i.quantity > 0)
		);
	};

	const clearCart = () => setCartItems([]);

	const getCartSummary = () => {
		const subtotal = cartItems.reduce(
			(sum, i) => sum + (Number(i.price) || 0) * i.quantity,
			0
		);

		let discount = 0;
		if (subtotal >= 1000) {
			discount = subtotal * 0.1; // 10% off
		} else if (subtotal >= 500) {
			discount = subtotal * 0.05; // 5% off
		}

		const homeServiceCharge = isHomeService ? 100 : 0;
		const total = subtotal - discount + homeServiceCharge;

		const totalTime = cartItems
			.map((i) => i.time || "")
			.filter(Boolean)
			.join(", ");

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
