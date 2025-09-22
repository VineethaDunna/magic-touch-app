import React from "react";
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import {
	User,
	Settings,
	Star,
	MapPin,
	Phone,
	Mail,
	Heart,
	Gift,
} from "lucide-react-native";

export default function Profile() {
	const userStats = {
		totalBookings: 12,
		favoriteServices: 8,
		memberSince: "Jan 2024",
		totalSpent: 15750,
		loyaltyPoints: 157,
	};

	const recentBookings = [
		{
			id: "1",
			service: "Bridal Makeup",
			date: "Dec 15, 2024",
			status: "Completed",
			rating: 5,
		},
		{
			id: "2",
			service: "Gold Facial",
			date: "Nov 28, 2024",
			status: "Completed",
			rating: 5,
		},
		{
			id: "3",
			service: "Hair Cut",
			date: "Nov 10, 2024",
			status: "Completed",
			rating: 4,
		},
	];

	return (
		<ScrollView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Profile</Text>
			</View>

			{/* Profile Info */}
			<View style={styles.card}>
				<View style={styles.profileRow}>
					<View style={styles.avatar}>
						<User size={32} color='white' />
					</View>
					<View style={styles.profileInfo}>
						<Text style={styles.profileWelcome}>Welcome Back!</Text>
						<Text style={styles.profileSubtitle}>Valued Customer</Text>
						<View style={styles.premiumRow}>
							<Star size={16} color='#FFD700' />
							<Text style={styles.premiumText}>Premium Member</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.settingsButton}>
						<Settings size={16} color='#FF69B4' />
					</TouchableOpacity>
				</View>
				<View style={styles.statsRow}>
					<View style={styles.statItem}>
						<Text style={styles.statValue}>{userStats.totalBookings}</Text>
						<Text style={styles.statLabel}>Total Bookings</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statValue}>{userStats.loyaltyPoints}</Text>
						<Text style={styles.statLabel}>Loyalty Points</Text>
					</View>
				</View>
			</View>

			{/* Your Stats */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Your Stats</Text>
				<View style={styles.statsRow}>
					<View style={styles.statItem}>
						<Text style={styles.statValue}>
							₹{userStats.totalSpent.toLocaleString()}
						</Text>
						<Text style={styles.statLabel}>Total Spent</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statValue}>{userStats.favoriteServices}</Text>
						<Text style={styles.statLabel}>Favorites</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statValue}>{userStats.memberSince}</Text>
						<Text style={styles.statLabel}>Member Since</Text>
					</View>
				</View>
			</View>

			{/* Recent Bookings */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Recent Bookings</Text>
				{recentBookings.map((item) => (
					<View key={item.id} style={styles.bookingRow}>
						<View>
							<Text style={styles.bookingService}>{item.service}</Text>
							<Text style={styles.bookingDate}>{item.date}</Text>
						</View>
						<View style={styles.bookingStatus}>
							<Text
								style={[
									styles.statusText,
									item.status === "Completed"
										? styles.completed
										: styles.pending,
								]}>
								{item.status}
							</Text>
							<View style={styles.ratingRow}>
								{Array.from({ length: item.rating }).map((_, i) => (
									<Star key={i} size={16} color='#FFD700' />
								))}
							</View>
						</View>
					</View>
				))}
				<TouchableOpacity style={styles.viewAllButton}>
					<Text style={styles.viewAllText}>View All Bookings</Text>
				</TouchableOpacity>
			</View>

			{/* Quick Actions */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Quick Actions</Text>
				<View style={styles.quickActionsRow}>
					<TouchableOpacity style={styles.actionButton}>
						<Heart size={16} color='#FF69B4' />
						<Text style={styles.actionText}>Favorites</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.actionButton}>
						<Gift size={16} color='#FF69B4' />
						<Text style={styles.actionText}>Rewards</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Contact Info */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Contact Information</Text>
				<View style={styles.contactColumn}>
					<View style={styles.contactRow}>
						<Phone size={16} color='#FF69B4' />
						<Text style={styles.contactText}>+91 98765 43210</Text>
					</View>
					<View style={styles.contactRow}>
						<Mail size={16} color='#FF69B4' />
						<Text style={styles.contactText}>hello@magictouch.com</Text>
					</View>
					<View style={styles.contactRow}>
						<MapPin size={16} color='#FF69B4' />
						<Text style={styles.contactText}>
							123 Beauty Street, Fashion City
						</Text>
					</View>
				</View>
			</View>

			{/* Loyalty Program */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Loyalty Program</Text>
				<View style={styles.loyaltyBarBackground}>
					<View
						style={[
							styles.loyaltyBarFill,
							{ width: `${userStats.loyaltyPoints % 100}%` },
						]}
					/>
				</View>
				<Text style={styles.loyaltyText}>
					Earn {100 - (userStats.loyaltyPoints % 100)} more points for your next
					reward!
				</Text>
				<TouchableOpacity style={styles.viewAllButton}>
					<Text style={styles.viewAllText}>View Rewards Catalog</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingBottom: 24,
	},
	header: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#FFC0CB",
		alignItems: "center",
		marginBottom: 16,
	},
	headerTitle: { fontSize: 24, fontWeight: "bold", color: "#111827" },

	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 12,
	},

	profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
	avatar: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: "#EC4899",
		justifyContent: "center",
		alignItems: "center",
	},
	profileInfo: { flex: 1, marginLeft: 12 },
	profileWelcome: { fontSize: 18, fontWeight: "bold", color: "#111827" },
	profileSubtitle: { color: "#9CA3AF" },
	premiumRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
	premiumText: { marginLeft: 4, fontWeight: "600", color: "#FACC15" },
	settingsButton: {
		borderWidth: 1,
		borderColor: "#FF69B4",
		borderRadius: 8,
		padding: 4,
	},

	statsRow: { flexDirection: "row", justifyContent: "space-between" },
	statItem: { alignItems: "center", flex: 1 },
	statValue: { fontSize: 18, fontWeight: "bold", color: "#EC4899" },
	statLabel: { fontSize: 12, color: "#9CA3AF" },

	bookingRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#FFF0F6",
		borderRadius: 12,
		padding: 12,
		marginBottom: 12,
	},
	bookingService: { fontWeight: "600" },
	bookingDate: { fontSize: 12, color: "#9CA3AF" },
	bookingStatus: { alignItems: "flex-end" },
	statusText: { fontWeight: "600" },
	completed: { color: "#16A34A" },
	pending: { color: "#F97316" },
	ratingRow: { flexDirection: "row", marginTop: 4 },

	viewAllButton: {
		borderWidth: 1,
		borderColor: "#FF69B4",
		borderRadius: 24,
		paddingVertical: 8,
		paddingHorizontal: 24,
		alignSelf: "center",
	},
	viewAllText: { color: "#EC4899", fontWeight: "600" },

	quickActionsRow: { flexDirection: "row", justifyContent: "space-between" },
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#FF69B4",
		borderRadius: 12,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	actionText: { color: "#EC4899", fontWeight: "600", marginLeft: 4 },

	contactColumn: { space: 12 }, // not necessary in RN but keeping for clarity
	contactRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
	contactText: { color: "#374151", marginLeft: 8 },

	loyaltyBarBackground: {
		height: 8,
		backgroundColor: "#FBCFE8",
		borderRadius: 4,
		marginBottom: 8,
	},
	loyaltyBarFill: { height: 8, backgroundColor: "#EC4899", borderRadius: 4 },
	loyaltyText: { fontSize: 12, color: "#6B7280", marginBottom: 8 },
});
