import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
	Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Trash2,
	Plus,
	Minus,
	Home,
	Store,
	Clock,
	Tag,
} from "lucide-react-native";
import { useCartContext } from "../../src/context/CartContext";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

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

	// Empty cart
	if (cartItems.length === 0) {
		return (
			<>
				<View style={styles.emptyContainer}>
					<Store size={60} color='#FF69B4' style={styles.emptyIcon} />
					<Text style={styles.emptyTitle}>Your cart is empty</Text>
					<Text style={styles.emptyText}>
						Add some services to get started!
					</Text>
					<TouchableOpacity
						style={styles.exploreButton}
						onPress={() => router.push("/parlour")}>
						<Text style={styles.exploreButtonText}>Explore Services</Text>
					</TouchableOpacity>
				</View>
			</>
		);
	}

	return (
		<>
			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={{ paddingBottom: 30 }}>
				{/* Service Location Card */}
				<View style={styles.serviceLocationCard}>
					<Text style={styles.sectionTitle}>Service Location</Text>
					<View style={styles.rowBetween}>
						<View style={styles.row}>
							{isHomeService ? (
								<Home size={28} color='#FF69B4' />
							) : (
								<Store size={28} color='#FF69B4' />
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
								{isHomeService ? "Tap to change shop" : "Tap to change Home"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Cart Items */}
				{cartItems.map((item) => (
					<View key={item.id} style={styles.cartItem}>
						<Image
							source={
								typeof item.image === "string"
									? { uri: item.image }
									: item.image
							}
							style={styles.itemImage}
							onError={(error) => console.log("Image load error:", error)}
							defaultSource={require("../../assets/beautyservices/1.jpeg")} // Add a placeholder
						/>
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

				{/* Order Summary */}
				<View style={styles.orderSummaryCard}>
					<View style={styles.row}>
						<Tag size={22} color='#FF69B4' />
						<Text style={[styles.sectionTitle, { marginLeft: 8 }]}>
							Order Summary
						</Text>
					</View>
					<View style={styles.orderSummary}>
						<View style={styles.rowBetween}>
							<Text style={styles.summaryText}>Subtotal</Text>
							<Text style={styles.summaryText}>₹{summary.subtotal}</Text>
						</View>
						{summary.discount > 0 && (
							<View style={styles.rowBetween}>
								<Text style={styles.discountText}>Discount (₹500+ order)</Text>
								<Text style={styles.discountText}>-₹{summary.discount}</Text>
							</View>
						)}
						{summary.homeServiceCharge > 0 && (
							<View style={styles.rowBetween}>
								<Text style={styles.summaryText}>Home Service Charge</Text>
								<Text style={styles.summaryText}>
									+₹{summary.homeServiceCharge}
								</Text>
							</View>
						)}
						<View style={styles.rowBetween}>
							<Text style={styles.summaryText}>Estimated Time</Text>
							<Text style={styles.summaryText}>{summary.totalTime}</Text>
						</View>
						<View style={[styles.rowBetween, styles.orderTotal]}>
							<Text style={styles.orderTotalText}>Total</Text>
							<Text style={styles.orderTotalText}>₹{summary.total}</Text>
						</View>
					</View>
				</View>

				{/* Buttons */}
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
		</>
	);
}

const styles = StyleSheet.create({
	flexSafeArea: { flex: 1, backgroundColor: "#FAFAFA" },
	scrollContainer: { paddingHorizontal: 20 },

	// Empty cart
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF0F6",
		padding: 24,
		borderRadius: 20,
	},
	emptyIcon: { marginBottom: 20 },
	emptyTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
		color: "#1F2937",
	},
	emptyText: { fontSize: 14, color: "#6B7280", marginBottom: 20 },
	exploreButton: {
		backgroundColor: "#FF69B4",
		paddingVertical: 14,
		paddingHorizontal: 30,
		borderRadius: 25,
	},
	exploreButtonText: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
	},

	// Service Location Card
	serviceLocationCard: {
		backgroundColor: "#FFFFFF",
		padding: 20,
		borderRadius: 25,
		marginVertical: 12,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 3,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#1F2937",
		marginBottom: 12,
	},
	row: { flexDirection: "row", alignItems: "center" },
	rowBetween: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	locationTextWrapper: { marginLeft: 12 },
	locationTitle: { fontWeight: "700", fontSize: 16, color: "#1F2937" },
	locationSubtitle: { color: "#9CA3AF", fontSize: 12, marginTop: 2 },
	toggleButton: {
		backgroundColor: "#93014aff",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 20,
	},
	toggleButtonText: { fontWeight: "700", color: "#f9fbfeff" },

	// Cart Item
	cartItem: {
		flexDirection: "row",
		backgroundColor: "#FFFFFF",
		borderRadius: 25,
		padding: 18,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 3,
	},
	itemImage: { width: 70, height: 70, borderRadius: 15 },
	itemInfo: { flex: 1, marginLeft: 14 },
	itemName: { fontWeight: "700", fontSize: 16, color: "#1F2937" },
	itemCategory: { fontSize: 14, color: "#9CA3AF", marginVertical: 4 },
	itemTime: { fontSize: 12, color: "#6B7280", marginLeft: 6 },
	itemPrice: { fontWeight: "700", color: "#FF69B4", fontSize: 18 },

	// Quantity controls
	quantityControls: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
	},
	quantityButton: { backgroundColor: "#F3F4F6", padding: 8, borderRadius: 10 },
	quantityText: {
		fontSize: 16,
		width: 36,
		textAlign: "center",
		marginHorizontal: 10,
	},
	removeButton: { backgroundColor: "#FF3366", marginLeft: 6 },

	// Order Summary
	orderSummaryCard: {
		backgroundColor: "#FFFFFF",
		padding: 20,
		borderRadius: 25,
		marginVertical: 16,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 3,
	},
	orderSummary: { marginTop: 12 },
	summaryText: { fontSize: 14, color: "#1F2937", marginVertical: 2 },
	discountText: { color: "#16A34A", fontWeight: "700" },
	orderTotal: {
		borderTopWidth: 1,
		borderTopColor: "#E5E7EB",
		marginTop: 14,
		paddingTop: 12,
	},
	orderTotalText: { fontWeight: "700", fontSize: 16, color: "#1F2937" },

	// Buttons
	checkoutButton: {
		backgroundColor: "#FF69B4",
		paddingVertical: 16,
		borderRadius: 25,
		marginBottom: 12,
	},
	checkoutButtonText: {
		color: "#FFFFFF",
		fontWeight: "700",
		fontSize: 18,
		textAlign: "center",
	},
	clearButton: {
		borderWidth: 2,
		borderColor: "#FF69B4",
		paddingVertical: 16,
		borderRadius: 25,
		marginBottom: 20,
	},
	clearButtonText: {
		color: "#FF69B4",
		fontWeight: "700",
		fontSize: 16,
		textAlign: "center",
	},
});
