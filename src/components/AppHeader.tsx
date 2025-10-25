import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ShoppingCart } from "lucide-react-native";
import { useCartContext } from "../context/CartContext";
import { useRouter, useSegments } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AppHeader = ({ onMenuPress }: { onMenuPress?: () => void }) => {
	const router = useRouter();
	const segments = useSegments();
	const { cartItems } = useCartContext();

	// Map route -> header title
	const getTitle = () => {
		const route = segments[segments.length - 1]; // get last segment
		switch (route) {
			case "parlour":
				return "Parlour Services";
			case "portfolio":
				return "our Happy customers";
			case "boutique":
				return "Boutique Collection";
			case "cart":
				return "My Cart";
			case "profile":
				return "About Us";
			default:
				return "Magic Touch";
		}
	};

	return (
		<SafeAreaView edges={["top"]} style={{ backgroundColor: "white" }}>
			<View style={styles.container}>
				<TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
					<Image
						source={require("@/assets/images/icon.jpg")}
						style={styles.logo}
					/>
				</TouchableOpacity>

				<Text style={styles.title}>{getTitle()}</Text>

				<TouchableOpacity
					style={styles.cartButton}
					onPress={() => router.push("/cart")}
					activeOpacity={0.7}>
					<ShoppingCart size={28} color='#FF69B4' />
					{cartItems.length > 0 && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>
								{cartItems.length > 99 ? "99+" : cartItems.length}
							</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		paddingHorizontal: 16,
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "#FF69B420",
	},
	logo: {
		width: 60,
		height: 60,
		borderRadius: 20,
		padding: 5,
		// marginBottom: 0, <-- removed
		borderWidth: 1,
		shadowColor: "#d705adff",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
		borderColor: "#d705adff",
	},
	menuButton: { padding: 8 },
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FF69B4",
		flex: 1,
		textAlign: "center",
	},
	cartButton: { padding: 6 },
	badge: {
		position: "absolute",
		right: 0,
		top: -4,
		backgroundColor: "#FF3B30",
		borderRadius: 8,
		minWidth: 16,
		height: 16,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 3,
	},
	badgeText: {
		color: "white",
		fontSize: 10,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default AppHeader;
