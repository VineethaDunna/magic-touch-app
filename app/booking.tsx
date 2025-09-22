import React, { useState } from "react";
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
} from "react-native";
import { MessageCircle } from "lucide-react-native";
import { router } from "expo-router";

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
	const [cartItems, setCartItems] = useState([
		{ id: 1, name: "Service A", price: 500, quantity: 1, time: "30min" },
		{ id: 2, name: "Service B", price: 300, quantity: 2, time: "20min" },
	]);
	const [isHomeService, setIsHomeService] = useState(true);
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		address: "",
		date: "",
		timeSlot: "",
		notes: "",
	});
	const [step, setStep] = useState(1);

	const summary = {
		subtotal: cartItems.reduce((a, b) => a + b.price * b.quantity, 0),
		discount: 0,
		homeServiceCharge: isHomeService ? 50 : 0,
		total:
			cartItems.reduce((a, b) => a + b.price * b.quantity, 0) +
			(isHomeService ? 50 : 0),
		totalTime: cartItems.map((i) => i.time).join(", "),
	};

	const handleInputChange = (field, value) => {
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

	const sendToWhatsApp = () => {
		const bookingDetails = `
📌 *New Booking Request*
👩 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
💅 *Services:*
${cartItems
	.map(
		(item) => `- ${item.name} (₹${item.price}, ${item.time}) x${item.quantity}`
	)
	.join("\n")}
🕑 *Slot:* ${formData.date} at ${formData.timeSlot}
🏠 *Service Type:* ${isHomeService ? "Home Service" : "Shop Service"}
${isHomeService ? `📍 *Address:* ${formData.address}` : ""}
💰 *Total:* ₹${summary.total}
${formData.notes ? `📝 *Notes:* ${formData.notes}` : ""}
`;
		const phoneNumber = "919014512860";
		const encodedMessage = encodeURIComponent(bookingDetails);
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
		Linking.openURL(whatsappUrl);
		setStep(3);
		setCartItems([]);
	};

	if (cartItems.length === 0) {
		router.push("/cart");
		return null;
	}

	if (step === 3) {
		return (
			<SafeAreaView style={styles.centerContainer}>
				<View style={styles.centerContent}>
					<MessageCircle size={48} color='green' />
					<Text style={styles.title}>Booking Sent!</Text>
					<Text style={styles.subtitle}>
						Your booking request has been sent via WhatsApp. Our team will
						contact you shortly.
					</Text>
					<TouchableOpacity
						style={styles.primaryButton}
						onPress={() => router.push("/")}>
						<Text style={styles.primaryButtonText}>Back to Home</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={() => router.push("/portfolio")}>
						<Text style={styles.secondaryButtonText}>View Our Work</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	if (step === 2) {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<Text style={styles.pageTitle}>Confirm Booking</Text>

					<View style={styles.card}>
						<Text style={styles.cardTitle}>Customer Details</Text>
						<Text>Name: {formData.name}</Text>
						<Text>Phone: {formData.phone}</Text>
						{isHomeService && <Text>Address: {formData.address}</Text>}
					</View>

					<View style={styles.card}>
						<Text style={styles.cardTitle}>Appointment Details</Text>
						<Text>Date: {formData.date}</Text>
						<Text>Time: {formData.timeSlot}</Text>
						<Text>
							Service Type: {isHomeService ? "Home Service" : "Shop Service"}
						</Text>
						<Text>Duration: {summary.totalTime}</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.cardTitle}>Selected Services</Text>
						{cartItems.map((item) => (
							<View key={item.id} style={styles.rowBetween}>
								<Text>
									{item.name} x{item.quantity}
								</Text>
								<Text>₹{item.price * item.quantity}</Text>
							</View>
						))}
					</View>

					<View style={styles.card}>
						<Text style={styles.cardTitle}>Payment Summary</Text>
						<View style={styles.rowBetween}>
							<Text>Subtotal</Text>
							<Text>₹{summary.subtotal}</Text>
						</View>
						{summary.discount > 0 && (
							<View style={styles.rowBetween}>
								<Text style={{ color: "green" }}>Discount</Text>
								<Text style={{ color: "green" }}>-₹{summary.discount}</Text>
							</View>
						)}
						{summary.homeServiceCharge > 0 && (
							<View style={styles.rowBetween}>
								<Text>Home Service</Text>
								<Text>+₹{summary.homeServiceCharge}</Text>
							</View>
						)}
						<View style={[styles.rowBetween, { marginTop: 5 }]}>
							<Text style={{ fontWeight: "bold" }}>Total</Text>
							<Text style={{ fontWeight: "bold" }}>₹{summary.total}</Text>
						</View>
					</View>

					<TouchableOpacity
						style={styles.primaryButton}
						onPress={sendToWhatsApp}>
						<Text style={styles.primaryButtonText}>
							Send Booking via WhatsApp
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={() => setStep(1)}>
						<Text style={styles.secondaryButtonText}>Edit Details</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		);
	}

	// Step 1: Booking Form
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Text style={styles.pageTitle}>Book Appointment</Text>

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
							<Text style={styles.label}>Address *</Text>
							<TextInput
								value={formData.address}
								onChangeText={(value) => handleInputChange("address", value)}
								placeholder='Enter your complete address'
								style={styles.input}
								multiline
							/>
						</>
					)}
				</View>

				<View style={styles.card}>
					<Text style={styles.cardTitle}>Select Date & Time</Text>
					<Text style={styles.label}>Preferred Date *</Text>
					<TextInput
						value={formData.date}
						onChangeText={(value) => handleInputChange("date", value)}
						placeholder='YYYY-MM-DD'
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

				<View style={styles.card}>
					<Text style={styles.cardTitle}>Additional Notes</Text>
					<TextInput
						value={formData.notes}
						onChangeText={(value) => handleInputChange("notes", value)}
						placeholder='Any special requests or notes...'
						style={styles.input}
						multiline
					/>
				</View>

				<TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
					<Text style={styles.primaryButtonText}>Continue to Confirmation</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: "#F3F4F6" },
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
		backgroundColor: "#F3F4F6",
	},
	centerContent: { alignItems: "center" },
	pageTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
	card: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
	label: { marginBottom: 4, fontWeight: "500" },
	input: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		padding: 10,
		marginBottom: 8,
		backgroundColor: "#fff",
	},
	timeSlots: { flexDirection: "row", flexWrap: "wrap" },
	slotButton: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 8,
		backgroundColor: "#E5E7EB",
		margin: 4,
	},
	selectedSlot: { backgroundColor: "#EC4899" },
	slotText: { color: "#374151" },
	selectedSlotText: { color: "#fff" },
	rowBetween: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	primaryButton: {
		backgroundColor: "#EC4899",
		paddingVertical: 12,
		borderRadius: 8,
		marginBottom: 8,
	},
	primaryButtonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
	secondaryButton: {
		backgroundColor: "#E5E7EB",
		paddingVertical: 12,
		borderRadius: 8,
		marginBottom: 8,
	},
	secondaryButtonText: {
		color: "#374151",
		textAlign: "center",
		fontWeight: "600",
	},
	title: { fontSize: 24, fontWeight: "bold", marginVertical: 8 },
	subtitle: {
		textAlign: "center",
		fontSize: 16,
		marginBottom: 16,
		color: "#4B5563",
	},
});
