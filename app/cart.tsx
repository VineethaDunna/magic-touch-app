import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	Image,
	StyleSheet,
} from "react-native";
import {
	Trash2,
	Plus,
	Minus,
	Home,
	Store,
	Clock,
	Tag,
} from "lucide-react-native";
import { useCartContext } from "../src/context/CartContext";
import { router } from "expo-router";

export default function CartScreen() {
	const {
		cartItems,
		removeFromCart,
		updateQuantity,
		getCartSummary,
		isHomeService,
		setIsHomeService,
		clearCart,
	} = useCartContext();

	const summary = getCartSummary();

	const handleCheckout = () => {
		if (cartItems.length === 0) {
			alert("Your cart is empty!");
			return;
		}
		router.push("/booking");
	};

	if (cartItems.length === 0) {
		return (
			<SafeAreaView style={styles.emptyContainer}>
				<Store size={48} color='#FF69B4' style={styles.emptyIcon} />
				<Text style={styles.emptyTitle}>Your cart is empty</Text>
				<Text style={styles.emptyText}>Add some services to get started!</Text>
				<TouchableOpacity
					style={styles.exploreButton}
					onPress={() => router.push("/parlour")}>
					<Text style={styles.exploreButtonText}>Explore Services</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Your Cart</Text>
				<Text style={styles.headerSubtitle}>{cartItems.length} items</Text>
			</View>

			<ScrollView style={styles.scrollContainer}>
				<View style={styles.serviceLocationCard}>
					<Text style={styles.sectionTitle}>Service Location</Text>
					<View style={styles.rowBetween}>
						<View style={styles.row}>
							{isHomeService ? (
								<Home size={24} color='#FF69B4' />
							) : (
								<Store size={24} color='#FF69B4' />
							)}
							<View style={styles.locationTextWrapper}>
								<Text style={styles.locationTitle}>
									{isHomeService ? "Home Service" : "Shop Service"}
								</Text>
								<Text style={styles.locationSubtitle}>
									{isHomeService ? "+₹100 extra charge" : "No extra charge"}
								</Text>
							</View>
						</View>
						<TouchableOpacity
							style={styles.toggleButton}
							onPress={() => setIsHomeService(!isHomeService)}>
							<Text style={styles.toggleButtonText}>
								{isHomeService ? "Home" : "Shop"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Cart Items List */}
				{cartItems.map((item) => (
					<View key={item.id} style={styles.cartItem}>
						<Image source={{ uri: item.image }} style={styles.itemImage} />
						<View style={styles.itemInfo}>
							<Text style={styles.itemName}>{item.name}</Text>
							<Text style={styles.itemCategory}>{item.category}</Text>
							<View style={styles.row}>
								<Clock size={14} color='#666' />
								<Text style={styles.itemTime}>{item.time}</Text>
							</View>
							<View style={styles.rowBetween}>
								<Text style={styles.itemPrice}>₹{item.price}</Text>
								<View style={styles.quantityControls}>
									<TouchableOpacity
										style={styles.quantityButton}
										onPress={() => updateQuantity(item.id, item.quantity - 1)}>
										<Minus size={16} color='#666' />
									</TouchableOpacity>
									<Text style={styles.quantityText}>{item.quantity}</Text>
									<TouchableOpacity
										style={styles.quantityButton}
										onPress={() => updateQuantity(item.id, item.quantity + 1)}>
										<Plus size={16} color='#666' />
									</TouchableOpacity>
									<TouchableOpacity
										style={[styles.quantityButton, styles.removeButton]}
										onPress={() => removeFromCart(item.id)}>
										<Trash2 size={16} color='white' />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				))}

				<View style={styles.orderSummaryCard}>
					<View style={styles.row}>
						<Tag size={20} color='#FF69B4' />
						<Text style={styles.sectionTitle}>Order Summary</Text>
					</View>
					<View style={styles.orderSummary}>
						<View style={styles.rowBetween}>
							<Text>Subtotal</Text>
							<Text>₹{summary.subtotal}</Text>
						</View>
						{summary.discount > 0 && (
							<View style={styles.rowBetween}>
								<Text style={styles.discountText}>Discount (₹500+ order)</Text>
								<Text style={styles.discountText}>-₹{summary.discount}</Text>
							</View>
						)}
						{summary.homeServiceCharge > 0 && (
							<View style={styles.rowBetween}>
								<Text>Home Service Charge</Text>
								<Text>+₹{summary.homeServiceCharge}</Text>
							</View>
						)}
						<View style={styles.rowBetween}>
							<Text>Estimated Time</Text>
							<Text>{summary.totalTime}</Text>
						</View>
						<View style={[styles.rowBetween, styles.orderTotal]}>
							<Text style={styles.orderTotalText}>Total</Text>
							<Text style={styles.orderTotalText}>₹{summary.total}</Text>
						</View>
					</View>
				</View>

				<TouchableOpacity
					style={styles.checkoutButton}
					onPress={handleCheckout}>
					<Text style={styles.checkoutButtonText}>Proceed to Booking</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.clearButton}
					onPress={() => clearCart()}>
					<Text style={styles.clearButtonText}>Clear Cart</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// General
	container: { flex: 1, backgroundColor: "#fff" },
	scrollContainer: { paddingHorizontal: 16, marginTop: 16 },

	// Empty cart
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		padding: 20,
	},
	emptyIcon: { marginBottom: 20 },
	emptyTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
	emptyText: { fontSize: 14, color: "#666", marginBottom: 20 },
	exploreButton: {
		backgroundColor: "#FF69B4",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 10,
	},
	exploreButtonText: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},

	// Header
	header: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#FFD1DC",
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		color: "#1F2937",
	},
	headerSubtitle: {
		fontSize: 12,
		textAlign: "center",
		color: "#9CA3AF",
		marginTop: 4,
	},

	// Service Location Card
	serviceLocationCard: {
		backgroundColor: "white",
		padding: 16,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 0 },
		elevation: 1,
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 8,
		color: "#1F2937",
	},
	row: { flexDirection: "row", alignItems: "center" },
	rowBetween: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	locationTextWrapper: { marginLeft: 12 },
	locationTitle: { fontWeight: "bold", color: "#1F2937", fontSize: 16 },
	locationSubtitle: { color: "#9CA3AF", fontSize: 12 },
	toggleButton: {
		backgroundColor: "#E5E7EB",
		paddingVertical: 6,
		paddingHorizontal: 14,
		borderRadius: 20,
	},
	toggleButtonText: { fontWeight: "bold", color: "#4B5563" },

	// Cart Item
	cartItem: {
		flexDirection: "row",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 0 },
		elevation: 2,
	},
	itemImage: { width: 64, height: 64, borderRadius: 12 },
	itemInfo: { flex: 1, marginLeft: 12 },
	itemName: { fontWeight: "600", fontSize: 16, color: "#1F2937" },
	itemCategory: { fontSize: 14, color: "#9CA3AF", marginVertical: 4 },
	itemTime: { fontSize: 12, color: "#666", marginLeft: 4 },
	itemPrice: { fontWeight: "bold", color: "#FF69B4", fontSize: 18 },

	// Quantity controls
	quantityControls: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
	quantityButton: {
		backgroundColor: "#E5E7EB",
		padding: 6,
		borderRadius: 8,
	},
	quantityText: {
		fontSize: 16,
		width: 32,
		textAlign: "center",
		marginHorizontal: 8,
	},
	removeButton: { backgroundColor: "#FF69B4" },

	// Order Summary
	orderSummaryCard: {
		backgroundColor: "white",
		padding: 16,
		borderRadius: 20,
		marginTop: 8,
		marginBottom: 26,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 0 },
		elevation: 2,
	},
	orderSummary: { marginTop: 8 },
	discountText: { color: "green" },
	orderTotal: {
		borderTopWidth: 1,
		borderTopColor: "#DDD",
		marginTop: 12,
		paddingTop: 10,
	},
	orderTotalText: { fontWeight: "bold", fontSize: 16 },

	// Buttons
	checkoutButton: {
		backgroundColor: "#FF69B4",
		paddingVertical: 16,
		borderRadius: 20,
		marginBottom: 14,
	},
	checkoutButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
		textAlign: "center",
	},
	clearButton: {
		borderWidth: 2,
		borderColor: "#FF69B4",
		paddingVertical: 14,
		borderRadius: 20,
	},
	clearButtonText: {
		color: "#FF69B4",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
});
