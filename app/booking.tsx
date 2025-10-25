import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	Alert,
	Linking,
	StyleSheet,
	BackHandler,
} from "react-native";
import { MessageCircle, ArrowLeft } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import { useCartContext } from "../src/context/CartContext";
import { StatusBar } from "expo-status-bar";

const timeSlots = [
	"9:00 AM",
	"10:00 AM",
	"11:00 AM",
	"12:00 PM",
	"1:00 PM",
	"2:00 PM",
	"3:00 PM",
	"4:00 PM",
	"5:00 PM",
	"6:00 PM",
	"7:00 PM",
	"8:00 PM",
];

export default function Booking() {
	const { cartItems, getCartSummary, isHomeService, clearCart } =
		useCartContext();

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		address: "",
		date: "",
		timeSlot: "",
		notes: "",
	});
	const [step, setStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const summary = getCartSummary();

	// Check cart items and redirect if empty - using useEffect to avoid setState during render

	// Handle back button behavior
	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				if (step === 2) {
					setStep(1);
					return true;
				} else {
					router.push("/cart");
					return true;
				}
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				onBackPress
			);
			return () => backHandler.remove();
		}, [step])
	);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		if (
			!formData.name ||
			!formData.phone ||
			!formData.date ||
			!formData.timeSlot
		) {
			Alert.alert("Error", "Please fill all required fields");
			return;
		}
		if (isHomeService && !formData.address) {
			Alert.alert("Error", "Address is required for home service");
			return;
		}
		setStep(2);
	};

	const sendToWhatsApp = async () => {
		setIsLoading(true);

		try {
			// Format services list with proper alignment
			const servicesList = cartItems
				.map((item, index) => {
					const itemTotal = item.price * item.quantity;
					return `${index + 1}. ${item.name}
   • Price: ₹${item.price} each
   • Quantity: ${item.quantity}
   • Duration: ${item.time || "Not specified"}
   • Category: ${item.category || "General"}
   • Subtotal: ₹${itemTotal}`;
				})
				.join("\n\n");

			// Create comprehensive booking details
			const bookingDetails = `
🎀 *NEW BOOKING REQUEST* 🎀
═══════════════════════════

👤 *CUSTOMER DETAILS*
Name: ${formData.name}
Phone: ${formData.phone}
${isHomeService ? `Address: ${formData.address}` : ""}

📅 *APPOINTMENT DETAILS*
Date: ${formData.date}
Time Slot: ${formData.timeSlot}
Service Type: ${isHomeService ? "🏠 Home Service" : "🏪 Shop Service"}
Total Duration: ${summary.totalTime || "To be calculated"}

💅 *SERVICES BOOKED*
${servicesList}

💰 *PAYMENT BREAKDOWN*
Subtotal: ₹${summary.subtotal}
${summary.discount > 0 ? `Discount: -₹${summary.discount}` : ""}
${
	summary.homeServiceCharge > 0
		? `Home Service Charge: +₹${summary.homeServiceCharge}`
		: ""
}
━━━━━━━━━━━━━━━━━━
*TOTAL AMOUNT: ₹${summary.total}*

${formData.notes ? `📝 *SPECIAL NOTES*\n${formData.notes}` : ""}

━━━━━━━━━━━━━━━━━━
Please confirm this booking and let me know the availability! 💖`;

			const phoneNumber = "918341338158";
			const encodedMessage = encodeURIComponent(bookingDetails);
			const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

			// Open WhatsApp
			await Linking.openURL(whatsappUrl);

			await new Promise((resolve) => setTimeout(resolve, 100));

			// Clear cart
			clearCart();

			// Prepare data for confirmation screen
			const confirmationData = {
				name: formData.name,
				phone: formData.phone,
				address: formData.address,
				date: formData.date,
				timeSlot: formData.timeSlot,
				isHomeService: isHomeService,
				total: summary.total,
				serviceCount: cartItems.length,
			};

			// Navigate to confirmation screen with data
			router.replace({
				pathname: "/booking-confirmation",
				params: {
					// avoid stringifying if you can use params directly
					name: formData.name,
					phone: formData.phone,
					date: formData.date,
				},
			});
		} catch (error) {
			Alert.alert("Error", "Failed to open WhatsApp. Please try again.");
			console.error("WhatsApp error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Early return if no cart items - prevent render
	if (cartItems.length === 0) {
		return null; // useEffect will handle the redirect
	}

	// Step 2: Booking Review Screen
	if (step === 2) {
		return (
			<>
				<StatusBar style='dark' backgroundColor='#ff69b4' />

				<View style={styles.header}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => setStep(1)}>
						<ArrowLeft size={24} color='#374151' />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Review Booking</Text>
				</View>

				<ScrollView style={styles.scrollContent}>
					{/* Customer Details */}
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Customer Details</Text>
						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Name:</Text>
							<Text style={styles.detailValue}>{formData.name}</Text>
						</View>
						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Phone:</Text>
							<Text style={styles.detailValue}>{formData.phone}</Text>
						</View>
						{isHomeService && (
							<View style={styles.detailRow}>
								<Text style={styles.detailLabel}>Address:</Text>
								<Text style={styles.detailValue}>{formData.address}</Text>
							</View>
						)}
					</View>

					{/* Appointment Details */}
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Appointment Details</Text>
						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Date:</Text>
							<Text style={styles.detailValue}>{formData.date}</Text>
						</View>
						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Time:</Text>
							<Text style={styles.detailValue}>{formData.timeSlot}</Text>
						</View>
						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Service Type:</Text>
							<Text style={styles.detailValue}>
								{isHomeService ? "🏠 Home Service" : "🏪 Shop Service"}
							</Text>
						</View>
					</View>

					{/* Services Summary */}
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Selected Services</Text>
						{cartItems.map((item) => (
							<View key={item.id} style={styles.serviceItem}>
								<View style={styles.serviceHeader}>
									<Text style={styles.serviceName}>{item.name}</Text>
									<Text style={styles.servicePrice}>
										₹{item.price * item.quantity}
									</Text>
								</View>
								<Text style={styles.serviceDetails}>
									Quantity: {item.quantity} • Duration: {item.time || "N/A"}
								</Text>
							</View>
						))}

						{/* Payment Summary */}
						<View style={styles.paymentSummary}>
							<View style={styles.summaryRow}>
								<Text style={styles.summaryLabel}>Subtotal:</Text>
								<Text style={styles.summaryValue}>₹{summary.subtotal}</Text>
							</View>
							{summary.discount > 0 && (
								<View style={styles.summaryRow}>
									<Text style={styles.discountLabel}>Discount:</Text>
									<Text style={styles.discountValue}>-₹{summary.discount}</Text>
								</View>
							)}
							{summary.homeServiceCharge > 0 && (
								<View style={styles.summaryRow}>
									<Text style={styles.summaryLabel}>Home Service:</Text>
									<Text style={styles.summaryValue}>
										+₹{summary.homeServiceCharge}
									</Text>
								</View>
							)}
							<View style={[styles.summaryRow, styles.totalRow]}>
								<Text style={styles.totalLabel}>Total Amount:</Text>
								<Text style={styles.totalValue}>₹{summary.total}</Text>
							</View>
						</View>
					</View>

					{/* Special Notes */}
					{formData.notes && (
						<View style={styles.card}>
							<Text style={styles.cardTitle}>Special Notes</Text>
							<Text style={styles.notesText}>{formData.notes}</Text>
						</View>
					)}
				</ScrollView>

				{/* Fixed Bottom Buttons */}
				<View style={styles.bottomButtons}>
					<TouchableOpacity
						style={[styles.primaryButton, isLoading && styles.disabledButton]}
						onPress={sendToWhatsApp}
						disabled={isLoading}>
						<MessageCircle size={20} color='#fff' style={styles.buttonIcon} />
						<Text style={styles.primaryButtonText}>
							{isLoading ? "Sending..." : "Send via WhatsApp"}
						</Text>
					</TouchableOpacity>
				</View>
			</>
		);
	}

	// Step 1: Booking Form
	return (
		<>
			<StatusBar style='dark' backgroundColor='#ff69b4' />

			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => router.push("/cart")}>
					<ArrowLeft size={24} color='#374151' />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Book Appointment</Text>
			</View>

			<ScrollView style={styles.scrollContent}>
				{/* Personal Details */}
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Personal Details</Text>
					<Text style={styles.label}>Full Name *</Text>
					<TextInput
						value={formData.name}
						onChangeText={(value) => handleInputChange("name", value)}
						placeholder='Enter your full name'
						style={styles.input}
					/>
					<Text style={styles.label}>Phone Number *</Text>
					<TextInput
						value={formData.phone}
						onChangeText={(value) => handleInputChange("phone", value)}
						placeholder='Enter your phone number'
						keyboardType='phone-pad'
						style={styles.input}
					/>
					{isHomeService && (
						<>
							<Text style={styles.label}>Complete Address *</Text>
							<TextInput
								value={formData.address}
								onChangeText={(value) => handleInputChange("address", value)}
								placeholder='Enter your complete address with landmark'
								style={[styles.input, styles.textArea]}
								multiline
								numberOfLines={3}
							/>
						</>
					)}
				</View>

				{/* Date & Time Selection */}
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Select Date & Time</Text>
					<Text style={styles.label}>Preferred Date *</Text>
					<TextInput
						value={formData.date}
						onChangeText={(value) => handleInputChange("date", value)}
						placeholder='YYYY-MM-DD (e.g., 2024-01-15)'
						style={styles.input}
					/>
					<Text style={styles.label}>Time Slot *</Text>
					<View style={styles.timeSlots}>
						{timeSlots.map((slot) => (
							<TouchableOpacity
								key={slot}
								onPress={() => handleInputChange("timeSlot", slot)}
								style={[
									styles.slotButton,
									formData.timeSlot === slot && styles.selectedSlot,
								]}>
								<Text
									style={
										formData.timeSlot === slot
											? styles.selectedSlotText
											: styles.slotText
									}>
									{slot}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* Order Summary */}
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Order Summary</Text>
					<Text style={styles.serviceType}>
						{isHomeService ? "🏠 Home Service" : "🏪 Shop Service"}
					</Text>
					{cartItems.map((item) => (
						<View key={item.id} style={styles.summaryItem}>
							<Text style={styles.summaryItemName}>
								{item.name} x{item.quantity}
							</Text>
							<Text style={styles.summaryItemPrice}>
								₹{item.price * item.quantity}
							</Text>
						</View>
					))}
					<View style={styles.totalSummary}>
						<Text style={styles.totalText}>Total: ₹{summary.total}</Text>
					</View>
				</View>

				{/* Additional Notes */}
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Additional Notes (Optional)</Text>
					<TextInput
						value={formData.notes}
						onChangeText={(value) => handleInputChange("notes", value)}
						placeholder='Any special requests, allergies, or preferences...'
						style={[styles.input, styles.textArea]}
						multiline
						numberOfLines={4}
					/>
				</View>
			</ScrollView>

			{/* Fixed Bottom Button */}
			<View style={styles.bottomButtons}>
				<TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
					<Text style={styles.primaryButtonText}>Continue to Review</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9FAFB",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginTop: 30,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},
	backButton: {
		padding: 8,
		marginRight: 8,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1F2937",
	},
	scrollContent: {
		flex: 1,
		padding: 16,
	},
	bottomButtons: {
		padding: 16,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#E5E7EB",
	},
	card: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowRadius: 5,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 12,
		color: "#1F2937",
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	detailLabel: {
		fontSize: 14,
		color: "#6B7280",
		fontWeight: "500",
	},
	detailValue: {
		fontSize: 14,
		color: "#1F2937",
		fontWeight: "500",
		flex: 1,
		textAlign: "right",
	},
	serviceItem: {
		borderBottomWidth: 1,
		borderBottomColor: "#F3F4F6",
		paddingBottom: 12,
		marginBottom: 12,
	},
	serviceHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	serviceName: {
		fontSize: 16,
		fontWeight: "500",
		color: "#1F2937",
		flex: 1,
	},
	servicePrice: {
		fontSize: 16,
		fontWeight: "600",
		color: "#EC4899",
	},
	serviceDetails: {
		fontSize: 12,
		color: "#6B7280",
	},
	paymentSummary: {
		marginTop: 16,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: "#E5E7EB",
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	summaryLabel: {
		fontSize: 14,
		color: "#6B7280",
	},
	summaryValue: {
		fontSize: 14,
		color: "#1F2937",
		fontWeight: "500",
	},
	discountLabel: {
		fontSize: 14,
		color: "#16A34A",
	},
	discountValue: {
		fontSize: 14,
		color: "#16A34A",
		fontWeight: "500",
	},
	totalRow: {
		marginTop: 8,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: "#E5E7EB",
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1F2937",
	},
	totalValue: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#EC4899",
	},
	notesText: {
		fontSize: 14,
		color: "#374151",
		lineHeight: 20,
	},
	label: {
		marginBottom: 6,
		fontSize: 14,
		fontWeight: "500",
		color: "#374151",
	},
	input: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		backgroundColor: "#fff",
		fontSize: 16,
		color: "#1F2937",
	},
	textArea: {
		height: 80,
		textAlignVertical: "top",
	},
	timeSlots: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 8,
	},
	slotButton: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 8,
		backgroundColor: "#F3F4F6",
		margin: 4,
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	selectedSlot: {
		backgroundColor: "#EC4899",
		borderColor: "#EC4899",
	},
	slotText: {
		color: "#374151",
		fontSize: 14,
		fontWeight: "500",
	},
	selectedSlotText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "600",
	},
	serviceType: {
		fontSize: 16,
		fontWeight: "600",
		color: "#EC4899",
		marginBottom: 12,
		textAlign: "center",
	},
	summaryItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	summaryItemName: {
		fontSize: 14,
		color: "#374151",
		flex: 1,
	},
	summaryItemPrice: {
		fontSize: 14,
		fontWeight: "600",
		color: "#1F2937",
	},
	totalSummary: {
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: "#E5E7EB",
	},
	totalText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#EC4899",
		textAlign: "center",
	},
	primaryButton: {
		backgroundColor: "#EC4899",
		paddingVertical: 16,
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	primaryButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	disabledButton: {
		backgroundColor: "#9CA3AF",
	},
	buttonIcon: {
		marginRight: 8,
	},
});
