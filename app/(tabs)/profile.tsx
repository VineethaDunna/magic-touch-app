import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function Profile() {
	return (
		<ScrollView style={styles.container}>
			<View style={[styles.card, styles.contactCard]}>
				<Text style={styles.cardTitle}>Contact Details</Text>

				<View style={styles.contactItem}>
					<Text style={styles.contactLabel}>Owner:</Text>
					<Text style={styles.contactValue}>Gandu Nagamani</Text>
				</View>

				<View style={styles.contactItem}>
					<Text style={styles.contactLabel}>Phone:</Text>
					<Text style={styles.contactValue}>+91 83413 38158</Text>
				</View>

				<View style={styles.contactItem}>
					<Text style={styles.contactLabel}>Location:</Text>
					<Text style={styles.contactValue}>
						Opposite Apollo Pharmacy, Prahaladapuram, Simhachalam
					</Text>
				</View>
			</View>

			<View style={[styles.card, styles.introCard]}>
				<Text style={[styles.aboutText, styles.highlight]}>
					With over 8 years of trusted experience and training from many
					international workshops, Magic Touch provides excellent beauty
					services for all ages.
				</Text>
				<Text style={styles.aboutText}>
					This salon offers a wide range of services daily, including bridal
					makeup, marriage bookings, function styling, and photoshoots.
				</Text>
			</View>

			<View style={[styles.card, styles.rulesCard]}>
				<Text style={[styles.cardTitle, styles.rulesTitle]}>
					Booking Rules:
				</Text>

				<Text style={styles.rulesText}>
					1. Once your booking is confirmed, half the amount must be paid and a
					payment screenshot shared as confirmation.
				</Text>
				<Text style={styles.rulesText}>
					2. Home service within 10 km carries a ₹100 charge. Beyond 10 km,
					additional charges apply based on distance.
				</Text>
				<Text style={styles.rulesText}>
					3. Half payment for home service bookings must be received beforehand.
				</Text>
			</View>

			<View style={[styles.card, styles.thankYouCard]}>
				<Text style={styles.thankYouText}>
					We believe you will definitely love Magic Touch. Thank you for
					choosing us, and please visit again!
				</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f5f5f7",
		paddingHorizontal: 16,
		paddingBottom: 24,
		marginTop: 16,
	},
	card: {
		borderRadius: 16,
		paddingVertical: 24,
		paddingHorizontal: 24,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOpacity: 0.12,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 5 },
		elevation: 6,
		backgroundColor: "#fff",
	},
	contactCard: {
		backgroundColor: "#FFF0F6",
	},
	introCard: {
		backgroundColor: "#ffffff",
	},
	rulesCard: {
		backgroundColor: "#FFF0F6",
	},
	thankYouCard: {
		backgroundColor: "#FFF5F8",
		alignItems: "center",
	},

	cardTitle: {
		fontSize: 22,
		fontWeight: "700",
		color: "#111827",
		marginBottom: 18,
	},
	rulesTitle: {
		color: "#FF69B4",
	},

	contactItem: {
		flexDirection: "row",
		marginBottom: 16,
	},
	contactLabel: {
		width: 90,
		fontWeight: "700",
		color: "#9B2C2C",
	},
	contactValue: {
		flex: 1,
		fontSize: 16,
		color: "#6B7280",
	},

	aboutText: {
		fontSize: 17,
		color: "#374151",
		marginBottom: 16,
		lineHeight: 26,
	},
	highlight: {
		fontWeight: "700",
		color: "#FF4697",
	},
	rulesText: {
		fontSize: 16,
		color: "#9B2C2C",
		marginBottom: 14,
		lineHeight: 26,
	},

	thankYouText: {
		fontSize: 18,
		color: "#D6336C",
		fontWeight: "700",
		textAlign: "center",
	},
});
