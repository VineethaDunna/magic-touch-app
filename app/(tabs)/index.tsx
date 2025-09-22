import React from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	StyleSheet,
	SafeAreaView,
	Dimensions,
} from "react-native";
import { router } from "expo-router";
import { Sparkles, Calendar, Phone, MapPin, Star } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<Image
							source={require("@/assets/images/icon.png")}
							style={styles.logo}
						/>
						<View>
							<Text style={styles.title}>Magic Touch</Text>
							<Text style={styles.subtitle}>
								Beauty & Style, All in One Place
							</Text>
						</View>
					</View>
					<View style={styles.rating}>
						<Star color='#FFD700' size={16} fill='#FFD700' />
						<Text style={styles.ratingText}>4.9</Text>
					</View>
				</View>

				{/* Hero Section */}
				<View style={styles.heroContainer}>
					<LinearGradient
						colors={["#FF69B4", "#FF1493"]}
						style={styles.heroCard}>
						<View style={styles.heroContent}>
							<View style={styles.offerBadge}>
								<Sparkles color='#FFD700' size={16} />
								<Text style={styles.offerText}>Special Offer</Text>
							</View>
							<Text style={styles.heroTitle}>
								Get 10% Off on Combo Packages
							</Text>
							<Text style={styles.heroSubtitle}>
								Book multiple services and save more!
							</Text>
							<TouchableOpacity
								style={styles.heroButton}
								onPress={() => router.push("/parlour")}>
								<Text style={styles.heroButtonText}>Explore Services</Text>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</View>

				{/* Quick Access */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Quick Access</Text>
					<View style={styles.quickAccessGrid}>
						<TouchableOpacity
							style={styles.quickAccessCard}
							onPress={() => router.push("/parlour")}>
							<Image
								source={require("@/assets/images/icon.png")}
								style={styles.quickAccessImage}
							/>
							<Text style={styles.quickAccessText}>Beauty Parlour</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.quickAccessCard}
							onPress={() => router.push("/boutique")}>
							<Image
								source={require("@/assets/images/icon.png")}
								style={styles.quickAccessImage}
							/>
							<Text style={styles.quickAccessText}>Boutique</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.quickAccessCard}
							onPress={() => router.push("/portfolio")}>
							<Image
								source={require("@/assets/images/icon.png")}
								style={styles.quickAccessImage}
							/>
							<Text style={styles.quickAccessText}>Portfolio</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Featured Services */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Featured Services</Text>
					<View style={styles.featuredServices}>
						<View style={styles.serviceCard}>
							<Image
								source={require("@/assets/images/icon.png")}
								style={styles.serviceImage}
							/>
							<View style={styles.serviceInfo}>
								<Text style={styles.serviceName}>Bridal Makeup Package</Text>
								<Text style={styles.serviceDescription}>
									Complete bridal makeover
								</Text>
								<View style={styles.serviceDetails}>
									<Text style={styles.price}>₹15,000</Text>
									<View style={styles.ratingSmall}>
										<Star color='#FFD700' size={12} fill='#FFD700' />
										<Text style={styles.ratingSmallText}>5.0</Text>
									</View>
								</View>
							</View>
						</View>

						<View style={styles.serviceCard}>
							<Image
								source={require("@/assets/images/icon.png")}
								style={styles.serviceImage}
							/>
							<View style={styles.serviceInfo}>
								<Text style={styles.serviceName}>Gold Facial</Text>
								<Text style={styles.serviceDescription}>
									Luxurious anti-aging treatment
								</Text>
								<View style={styles.serviceDetails}>
									<Text style={styles.price}>₹1,500</Text>
									<View style={styles.ratingSmall}>
										<Star color='#FFD700' size={12} fill='#FFD700' />
										<Text style={styles.ratingSmallText}>4.9</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>

				{/* Contact Info */}
				<View style={styles.section}>
					<LinearGradient
						colors={["#FF69B420", "#FF149320"]}
						style={styles.contactCard}>
						<View style={styles.contactHeader}>
							<Phone color='#FF69B4' size={20} />
							<Text style={styles.contactTitle}>Contact Us</Text>
						</View>
						<View style={styles.contactInfo}>
							<View style={styles.contactItem}>
								<Phone color='#9CA3AF' size={14} />
								<Text style={styles.contactText}>+91 90145 12860</Text>
							</View>
							<View style={styles.contactItem}>
								<MapPin color='#9CA3AF' size={14} />
								<Text style={styles.contactText}>
									123 Beauty Street, Fashion City
								</Text>
							</View>
							<View style={styles.contactItem}>
								<Calendar color='#9CA3AF' size={14} />
								<Text style={styles.contactText}>
									Mon-Sun: 9:00 AM - 9:00 PM
								</Text>
							</View>
						</View>
					</LinearGradient>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255, 105, 180, 0.2)",
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	logo: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#1F2937",
	},
	subtitle: {
		fontSize: 12,
		color: "#9CA3AF",
	},
	rating: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	ratingText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#FFD700",
	},
	heroContainer: {
		paddingHorizontal: 16,
		paddingVertical: 24,
	},
	heroCard: {
		borderRadius: 16,
		padding: 24,
		alignItems: "center",
	},
	heroContent: {
		alignItems: "center",
	},
	offerBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		marginBottom: 16,
	},
	offerText: {
		color: "white",
		fontSize: 14,
		fontWeight: "500",
	},
	heroTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
		marginBottom: 8,
	},
	heroSubtitle: {
		fontSize: 14,
		color: "rgba(255, 255, 255, 0.8)",
		textAlign: "center",
		marginBottom: 16,
	},
	heroButton: {
		backgroundColor: "white",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 24,
	},
	heroButtonText: {
		color: "#FF69B4",
		fontSize: 16,
		fontWeight: "600",
	},
	section: {
		paddingHorizontal: 16,
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 12,
		color: "#1F2937",
	},
	quickAccessGrid: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	quickAccessCard: {
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 12,
		padding: 12,
		width: (width - 48) / 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	quickAccessImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginBottom: 8,
	},
	quickAccessText: {
		fontSize: 12,
		fontWeight: "500",
		textAlign: "center",
		color: "#1F2937",
	},
	featuredServices: {
		gap: 12,
	},
	serviceCard: {
		flexDirection: "row",
		backgroundColor: "white",
		borderRadius: 12,
		padding: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	serviceImage: {
		width: 64,
		height: 64,
		borderRadius: 8,
	},
	serviceInfo: {
		flex: 1,
		marginLeft: 12,
		justifyContent: "space-between",
	},
	serviceName: {
		fontSize: 14,
		fontWeight: "500",
		color: "#1F2937",
	},
	serviceDescription: {
		fontSize: 12,
		color: "#9CA3AF",
		marginTop: 2,
	},
	serviceDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 8,
	},
	price: {
		fontSize: 14,
		fontWeight: "600",
		color: "#FF69B4",
		backgroundColor: "rgba(255, 105, 180, 0.1)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 8,
	},
	ratingSmall: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	ratingSmallText: {
		fontSize: 12,
		color: "#9CA3AF",
	},
	contactCard: {
		borderRadius: 16,
		padding: 16,
	},
	contactHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 12,
	},
	contactTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1F2937",
	},
	contactInfo: {
		gap: 8,
	},
	contactItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	contactText: {
		fontSize: 14,
		color: "#6B7280",
	},
});
