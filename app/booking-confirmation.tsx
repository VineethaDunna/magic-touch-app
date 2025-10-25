// BookingConfirmation.tsx - Separate screen for confirmation
import React from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	BackHandler,
} from "react-native";
import { CheckCircle } from "lucide-react-native";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function BookingConfirmation() {
	const params = useLocalSearchParams();

	// Parse the booking details from params
	const bookingData = params.bookingData ? JSON.parse(params.bookingData) : {};

	// Handle back button - always go to home from confirmation
	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				router.replace("/");
				return true;
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				onBackPress
			);
			return () => backHandler.remove();
		}, [])
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='dark' />
			<ScrollView contentContainerStyle={styles.scrollView}>
				{/* Success Icon */}
				<View style={styles.successIconContainer}>
					<CheckCircle size={80} color='#16A34A' />
				</View>

				{/* Main Title */}
				<Text style={styles.title}>Booking Sent Successfully!</Text>
				<Text style={styles.subtitle}>
					Your booking request has been sent via WhatsApp. We'll call you
					shortly to confirm.
				</Text>

				{/* Booking Summary Card */}
				{/* <View style={styles.bookingCard}>
					<Text style={styles.cardTitle}>Your Booking Details</Text>
					<View style={styles.detailRow}>
						<Text style={styles.label}>Name:</Text>
						<Text style={styles.value}>
							{bookingData.name || "Not provided"}
						</Text>
					</View>
					<View style={styles.detailRow}>
						<Text style={styles.label}>Date & Time:</Text>
						<Text style={styles.value}>
							{bookingData.date || "TBD"} at {bookingData.timeSlot || "TBD"}
						</Text>
					</View>
					<View style={styles.detailRow}>
						<Text style={styles.label}>Service Type:</Text>
						<Text style={styles.value}>
							{bookingData.isHomeService
								? "🏠 Home Service"
								: "🏪 Shop Service"}
						</Text>
					</View>
					<View style={styles.detailRow}>
						<Text style={styles.label}>Total Amount:</Text>
						<Text style={styles.totalValue}>₹{bookingData.total || "0"}</Text>
					</View>
				</View> */}

				{/* What's Next Card */}
				<View style={styles.stepsCard}>
					<Text style={styles.stepsTitle}>What happens next?</Text>

					<View style={styles.stepItem}>
						<View style={styles.stepNumber}>
							<Text style={styles.stepNumberText}>1</Text>
						</View>
						<Text style={styles.stepText}>
							If your message reached, We will call you within 5-15 minutes
						</Text>
					</View>
					<View style={styles.stepItem}>
						<View style={styles.stepNumber}>
							<Text style={styles.stepNumberText}>2</Text>
						</View>
						<Text style={styles.stepText}>
							Confirm your appointment details
						</Text>
					</View>
					<View style={styles.stepItem}>
						<View style={styles.stepNumber}>
							<Text style={styles.stepNumberText}>3</Text>
						</View>
						<Text style={styles.stepText}>
							Get ready for your beauty session!
						</Text>
					</View>
				</View>

				{/* Important Note */}
				<View style={styles.importantNote}>
					<Text style={styles.importantTitle}>📞 Important!</Text>
					<Text style={styles.importantText}>
						Please keep your phone nearby and answer our confirmation call to
						complete your booking.
					</Text>
				</View>

				{/* Action Buttons */}
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.primaryButton}
						onPress={() => router.replace("/")}>
						<Text style={styles.primaryButtonText}>Back to Home</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={() => router.replace("/parlour")}>
						<Text style={styles.secondaryButtonText}>See More Services</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9FAFB",
	},
	scrollView: {
		flexGrow: 1,
		padding: 24,
		alignItems: "center",
	},
	successIconContainer: {
		marginBottom: 32,
		marginTop: 40,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#1F2937",
		textAlign: "center",
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 16,
		color: "#6B7280",
		textAlign: "center",
		marginBottom: 40,
		lineHeight: 24,
		paddingHorizontal: 20,
	},
	bookingCard: {
		backgroundColor: "#fff",
		padding: 24,
		borderRadius: 16,
		marginBottom: 24,
		width: "100%",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 20,
		textAlign: "center",
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	label: {
		fontSize: 15,
		color: "#6B7280",
		fontWeight: "500",
	},
	value: {
		fontSize: 15,
		color: "#1F2937",
		fontWeight: "600",
		flex: 1,
		textAlign: "right",
	},
	totalValue: {
		fontSize: 18,
		color: "#EC4899",
		fontWeight: "bold",
		flex: 1,
		textAlign: "right",
	},
	stepsCard: {
		backgroundColor: "#F0F9FF",
		padding: 24,
		borderRadius: 16,
		marginBottom: 24,
		width: "100%",
		borderWidth: 1,
		borderColor: "#BAE6FD",
	},
	stepsTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: "#0F172A",
		marginBottom: 20,
		textAlign: "center",
	},
	stepItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	stepNumber: {
		backgroundColor: "#0EA5E9",
		width: 28,
		height: 28,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	stepNumberText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "600",
	},
	stepText: {
		fontSize: 15,
		color: "#0F172A",
		flex: 1,
		fontWeight: "500",
	},
	importantNote: {
		backgroundColor: "#FEF3C7",
		padding: 20,
		borderRadius: 16,
		marginBottom: 32,
		width: "100%",
		borderWidth: 1,
		borderColor: "#FCD34D",
	},
	importantTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#92400E",
		marginBottom: 8,
	},
	importantText: {
		fontSize: 14,
		color: "#92400E",
		lineHeight: 20,
	},
	buttonContainer: {
		width: "100%",
		gap: 16,
	},
	primaryButton: {
		backgroundColor: "#EC4899",
		paddingVertical: 16,
		borderRadius: 12,
		shadowColor: "#EC4899",
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	primaryButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
	},
	secondaryButton: {
		backgroundColor: "#fff",
		paddingVertical: 16,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#EC4899",
	},
	secondaryButtonText: {
		color: "#EC4899",
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
	},
});
