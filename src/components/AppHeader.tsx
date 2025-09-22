import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Menu, ShoppingCart } from "lucide-react-native";
import { useCartContext } from "../context/CartContext"; // Adjust path as needed
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type AppHeaderProps = {
	title?: string;
	onMenuPress?: () => void;
};

const AppHeader = ({ title = "Magic Touch", onMenuPress }: AppHeaderProps) => {
	const router = useRouter();
	const { cartItems } = useCartContext();

	return (
		<SafeAreaView edges={["top"]} style={styles.safeArea}>
			<View style={styles.container}>
				<TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
					<Menu size={24} color='#FF69B4' />
				</TouchableOpacity>

				<Text style={styles.title}>{title}</Text>

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
	safeArea: {
		backgroundColor: "white",
	},
	container: {
		height: 56,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "#FF69B420",
	},
	menuButton: {
		padding: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FF69B4",
		flex: 1,
		textAlign: "center",
	},
	cartButton: {
		padding: 6,
	},
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
