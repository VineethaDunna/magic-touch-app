// app/_layout.tsx
import { CartProvider } from "../src/context/CartContext";
import { Slot } from "expo-router";

export default function Layout() {
	return (
		<CartProvider>
			<Slot />
		</CartProvider>
	);
}
