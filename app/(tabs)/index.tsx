// HomeScreen.tsx (or app/index.tsx)
import React, { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	StyleSheet,
	SafeAreaView,
	Dimensions,
	FlatList,
	Modal,
	Pressable,
	Alert,
} from "react-native";
import { router } from "expo-router";
import {
	Sparkles,
	Calendar,
	Phone,
	MapPin,
	Star,
	X,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCartContext } from "../../src/context/CartContext";

const { width } = Dimensions.get("window");

const FEATURED = [
	{
		id: "combo-1",
		title: "Beauty Essentials — Fast & Chic",
		description: "Quick beauty pack to get you camera-ready.",
		priceLabel: "Diwaali",
		image: require("@/assets/images/gold-facial.webp"),
		items: [
			{ name: "Eyebrow", duration: "5 min" },
			{ name: "Facial", duration: "45 min" },
			{ name: "Manicure", duration: "30 min" },
			{ name: "Pedicure", duration: "30 min" },
			{ name: "Wax", duration: "10 min" },
		],
	},
	{
		id: "combo-2",
		title: "Hair Care Pack — Relax & Shine",
		description: "Cut, wash, spa — your hair’s new best day.",
		priceLabel: "Dasara offer",
		image: require("@/assets/beautyservices/30.webp"),
		items: [
			{ name: "Hair cut", duration: "20 min" },
			{ name: "Hair wash", duration: "15 min" },
			{ name: "Hair spa", duration: "30 min" },
			{ name: "Dandruff treatment", duration: "30 min" },
			{ name: "Oil massage", duration: "15 min" },
		],
	},
];

export default function HomeScreen() {
	const [selected, setSelected] = useState<any>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const openDetails = (item: any) => {
		setSelected(item);
		setModalVisible(true);
	};

	const closeDetails = () => {
		setModalVisible(false);
		setSelected(null);
	};

	const goToParlourCombos = () => {
		// open parlour page and ask it to show combos via query param
		// parlour screen should read this param (showCombos=true) and toggle
		router.push("/parlour?showCombos=true");
	};
	// inside HomeScreen component
	const { addToCart } = useCartContext();

	// if selected comes from FEATURED (title, priceLabel)
	const handleAddToCartFromModal = () => {
		if (!selected) return Alert.alert("Oops", "Nothing selected");
		// you can pass raw object — cart will normalize it
		addToCart(selected, "combo"); // second arg is optional and ignored by cart, kept for compatibility
		Alert.alert(
			"Success",
			`${selected?.title ?? selected?.name ?? "Combo"} added to cart`
		);
		closeDetails();
	};

	const handleViewMoreCombos = () => {
		router.push("/parlour?showCombos=true");
		closeDetails();
	};

	const renderFeatured = ({ item }: { item: any }) => {
		return (
			<View style={styles.featureCard}>
				<TouchableOpacity activeOpacity={0.9} onPress={() => openDetails(item)}>
					<Image
						source={item.image}
						style={styles.featureImage}
						resizeMode='cover'
					/>
					<View style={styles.featureInfo}>
						<View style={styles.featureRow}>
							<Text style={styles.featureTitle}>{item.title}</Text>
							<TouchableOpacity
								style={styles.likeButton}
								onPress={() => openDetails(item)}>
								<Text style={styles.likeText}>❤</Text>
							</TouchableOpacity>
						</View>
						<Text style={styles.featureDesc}>{item.description}</Text>
						<View style={styles.featureBottom}>
							<Text style={styles.priceTag}>{item.priceLabel}</Text>
							<View style={styles.ratingSmall}>
								<Star color='#FFD700' size={14} fill='#FFD700' />
								<Text style={styles.ratingSmallText}>4.9</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 48 }}>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<View>
							<Text style={styles.subtitle}>
								Beauty & Style, All in One Place
							</Text>
						</View>
					</View>
					<View style={styles.rating}>
						<Star color='#e2c004ff' size={20} fill='#FFD700' />
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
								onPress={goToParlourCombos}>
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
								source={require("@/assets/images/beauty-parlour.jpg")}
								style={styles.quickAccessImage}
							/>
							<Text style={styles.quickAccessText}>Beauty Parlour</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.quickAccessCard}
							onPress={() => router.push("/boutique")}>
							<Image
								source={require("@/assets/images/boutique.jpg")}
								style={styles.quickAccessImage}
							/>
							<Text style={styles.quickAccessText}>Boutique</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.quickAccessCard}
							onPress={() => router.push("/portfolio")}>
							<Image
								source={require("@/assets/images/port.jpg")}
								style={styles.quickAccessImage}
							/>
							<Text style={styles.quickAccessText}>Portfolio</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Featured Services as List (large images) */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Featured Services</Text>

					<FlatList
						data={FEATURED}
						keyExtractor={(i) => i.id}
						renderItem={renderFeatured}
						ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
						contentContainerStyle={{ paddingBottom: 8 }}
						scrollEnabled={false} // parent scroll handles it
					/>
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
								<Text style={styles.contactText}>+91 83413 38158</Text>
							</View>
							<View style={styles.contactItem}>
								<MapPin color='#9CA3AF' size={14} />
								<Text style={styles.contactText}>
									opp apollo pharmacy, prahaladapuram, simhachalam rd.
								</Text>
							</View>
							<View style={styles.contactItem}>
								<Calendar color='#9CA3AF' size={14} />
								<Text style={styles.contactText}>
									Everyday: 9:00 AM - 8:00 PM
								</Text>
							</View>
						</View>
					</LinearGradient>
				</View>
			</ScrollView>

			{/* Details Modal */}
			<Modal visible={modalVisible} animationType='slide' transparent>
				<View style={styles.modalOverlay}>
					<View style={styles.modalCard}>
						{/* Header */}
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>{selected?.title}</Text>
							<Pressable onPress={closeDetails} style={styles.modalClose}>
								<X size={20} color='#374151' />
							</Pressable>
						</View>

						{/* Image */}
						<Image
							source={selected?.image}
							style={styles.modalImage}
							resizeMode='cover'
						/>

						{/* Body */}
						<ScrollView style={styles.modalBody}>
							<Text style={styles.modalDesc}>{selected?.description}</Text>

							<View style={styles.modalSection}>
								<Text style={styles.modalSectionTitle}>Services included</Text>
								{selected?.items?.map((it: any, idx: number) => (
									<View key={idx} style={styles.modalItemRow}>
										<Text style={styles.modalItemName}>{it.name}</Text>
										<Text style={styles.modalItemDuration}>{it.duration}</Text>
									</View>
								))}
							</View>

							{/* Footer actions */}
							<View style={[styles.modalFooter, { paddingBottom: 28 }]}>
								<Text style={styles.modalPrice}>{selected?.priceLabel}</Text>

								<View style={{ flexDirection: "row", alignItems: "center" }}>
									{/* Add to Cart (primary) */}

									{/* View more combos (secondary) */}
									<TouchableOpacity
										style={{
											marginLeft: 10,
											paddingHorizontal: 16,
											paddingVertical: 10,
											borderRadius: 10,
											backgroundColor: "#FFFFFF",
											borderWidth: 1,
											borderColor: "#FF69B4",
										}}
										onPress={handleViewMoreCombos}>
										<Text style={{ color: "#FF69B4", fontWeight: "700" }}>
											View more combos
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</ScrollView>
					</View>
				</View>
			</Modal>
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
	},
	subtitle: {
		fontSize: 12,
		color: "#9CA3AF",
	},
	rating: {
		flexDirection: "row",
		alignItems: "center",
	},
	ratingText: {
		fontSize: 14,
		fontWeight: "800",
		color: "#e2c004ff",
		marginLeft: 6,
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
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
		marginBottom: 12,
	},
	offerText: {
		color: "white",
		fontSize: 14,
		fontWeight: "500",
		marginLeft: 8,
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
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2,
	},
	quickAccessImage: {
		width: "100%",
		height: "100",
		borderRadius: 8,
		marginBottom: 8,
	},
	quickAccessText: {
		fontSize: 12,
		fontWeight: "500",
		textAlign: "center",
		color: "#1F2937",
	},

	/* Featured list styles */
	featureCard: {
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#fff",
		marginHorizontal: 0,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 3,
	},
	featureImage: {
		width: width - 32,
		height: 180,
	},
	featureInfo: {
		padding: 12,
	},
	featureRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	featureTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1F2937",
		flex: 1,
	},
	likeButton: {
		marginLeft: 12,
		backgroundColor: "rgba(255,105,180,0.08)",
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 20,
	},
	likeText: {
		color: "#FF69B4",
		fontWeight: "700",
	},
	featureDesc: {
		fontSize: 13,
		color: "#6B7280",
		marginTop: 6,
	},
	featureBottom: {
		marginTop: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	priceTag: {
		fontSize: 14,
		fontWeight: "700",
		color: "#FF69B4",
		backgroundColor: "rgba(255,105,180,0.08)",
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 8,
	},

	ratingSmall: {
		flexDirection: "row",
		alignItems: "center",
	},
	ratingSmallText: {
		fontSize: 12,
		color: "#9CA3AF",
		marginLeft: 6,
	},

	contactCard: {
		borderRadius: 16,
		padding: 16,
	},
	contactHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	contactTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1F2937",
		marginLeft: 8,
	},
	contactInfo: {},
	contactItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	contactText: {
		fontSize: 14,
		color: "#6B7280",
		marginLeft: 8,
	},

	/* Modal styles */
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.35)",
		justifyContent: "flex-end",
	},
	modalCard: {
		height: "80%",
		backgroundColor: "#fff",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		overflow: "hidden",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 8,
		borderBottomColor: "#F3F4F6",
		borderBottomWidth: 1,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#1F2937",
		flex: 1,
	},
	modalClose: {
		padding: 8,
		marginLeft: 12,
	},
	modalImage: {
		width: "100%",
		height: 160,
	},
	modalBody: {
		paddingHorizontal: 16,
		paddingTop: 12,
	},
	modalDesc: {
		fontSize: 14,
		color: "#6B7280",
		marginBottom: 12,
	},
	modalSection: {
		marginBottom: 12,
	},
	modalSectionTitle: {
		fontSize: 15,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 8,
	},
	modalItemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 8,
		borderBottomColor: "#F3F4F6",
		borderBottomWidth: 1,
	},
	modalItemName: {
		fontSize: 14,
		color: "#111827",
	},
	modalItemDuration: {
		fontSize: 13,
		color: "#6B7280",
	},
	modalFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 12,
		paddingBottom: 20,
	},
	modalPrice: {
		fontSize: 16,
		fontWeight: "700",
		color: "#FF69B4",
	},
	modalAction: {
		backgroundColor: "#FF69B4",
		paddingHorizontal: 18,
		paddingVertical: 10,
		borderRadius: 10,
	},
	modalActionText: {
		color: "#fff",
		fontWeight: "700",
	},
});
