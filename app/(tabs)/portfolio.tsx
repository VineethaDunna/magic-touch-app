import React, { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Modal,
	Dimensions,
	Linking,
} from "react-native";
import { Star, Heart, Share2, Eye, X } from "lucide-react-native";
import {
	portfolioItems,
	testimonials,
	PortfolioItem,
	Testimonial,
	categories,
} from "../../src/data/portfolio";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function PortfolioScreen() {
	const [activeTab, setActiveTab] = useState<"gallery" | "testimonials">(
		"gallery"
	);
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [selectedImage, setSelectedImage] = useState<any>(null);
	const [isImageModalVisible, setIsImageModalVisible] = useState(false);

	// Filter portfolio items by category
	const filteredItems =
		selectedCategory === "All"
			? portfolioItems
			: portfolioItems.filter((item) => item.category === selectedCategory);

	// Open image modal
	const openImageModal = (image: any) => {
		setSelectedImage(image);
		setIsImageModalVisible(true);
	};

	// Close image modal
	const closeImageModal = () => {
		setIsImageModalVisible(false);
		setSelectedImage(null);
	};

	const renderCategoryTab = ({ item }: { item: string }) => (
		<TouchableOpacity
			style={[
				styles.categoryTab,
				selectedCategory === item && styles.activeCategoryTab,
			]}
			onPress={() => setSelectedCategory(item)}>
			<Text
				style={[
					styles.categoryTabText,
					selectedCategory === item && styles.activeCategoryTabText,
				]}>
				{item}
			</Text>
		</TouchableOpacity>
	);

	const renderPortfolioItem = ({ item }: { item: PortfolioItem }) => (
		<View style={styles.card}>
			<TouchableOpacity
				style={styles.imageBox}
				onPress={() => openImageModal(item.image)}>
				<Image source={item.image} style={styles.image} />
				<View style={styles.ratingBadge}>
					<Star color='#FFD700' size={14} fill='#FFD700' />
					<Text style={styles.ratingText}>{item.rating}</Text>
				</View>
			</TouchableOpacity>
			<View style={styles.cardContent}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.category}>{item.category}</Text>
				<Text style={styles.description}>{item.description}</Text>
				<View style={styles.cardFooter}>
					<View style={styles.stats}>
						<View style={styles.statItem}>
							<Heart color='#9CA3AF' size={12} />
							<Text style={styles.statText}>{item.likes}</Text>
						</View>
						<View style={styles.statItem}>
							<Eye color='#9CA3AF' size={12} />
							<Text style={styles.statText}>{item.views}</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.shareButton}>
						<Share2 color='#9CA3AF' size={12} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	const renderTestimonial = ({ item }: { item: Testimonial }) => (
		<View style={styles.testimonialCard}>
			<View style={styles.testimonialHeader}>
				<View style={styles.avatar}>
					<Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
				</View>
				<View style={styles.testimonialInfo}>
					<View style={styles.ratingRow}>
						<Text style={styles.testimonialName}>{item.name}</Text>
						<View style={styles.testimonialStars}>
							{[...Array(item.rating)].map((_, i) => (
								<Star key={i} color='#FFD700' size={12} fill='#FFD700' />
							))}
						</View>
					</View>
					<Text style={styles.testimonialService}>{item.service}</Text>
					<Text style={styles.testimonialText}>{item.text}</Text>
				</View>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}

			{/* Tabs */}
			<View style={styles.tabsRow}>
				<TouchableOpacity
					style={[styles.tab, activeTab === "gallery" && styles.activeTab]}
					onPress={() => setActiveTab("gallery")}>
					<Text
						style={[
							styles.tabText,
							activeTab === "gallery" && styles.activeTabText,
						]}>
						Gallery
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, activeTab === "testimonials" && styles.activeTab]}
					onPress={() => setActiveTab("testimonials")}>
					<Text
						style={[
							styles.tabText,
							activeTab === "testimonials" && styles.activeTabText,
						]}>
						Reviews
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={styles.content}>
				{activeTab === "gallery" ? (
					<>
						{/* Category Filter */}
						<FlatList
							data={categories}
							renderItem={renderCategoryTab}
							keyExtractor={(item) => item}
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.categoriesList}
							contentContainerStyle={styles.categoriesContent}
						/>

						{/* Portfolio Grid */}
						<FlatList
							data={filteredItems}
							renderItem={renderPortfolioItem}
							keyExtractor={(item) => item.id}
							scrollEnabled={false}
							contentContainerStyle={styles.list}
						/>

						{filteredItems.length === 0 && (
							<View style={styles.emptyState}>
								<Text style={styles.emptyText}>
									No items found in {selectedCategory}
								</Text>
								<Text style={styles.emptySubText}>
									Try selecting a different category
								</Text>
							</View>
						)}
					</>
				) : (
					<View>
						<FlatList
							data={testimonials}
							renderItem={renderTestimonial}
							keyExtractor={(item) => item.id}
							scrollEnabled={false}
							contentContainerStyle={styles.list}
						/>
						<View style={styles.reviewPrompt}>
							<Text style={styles.reviewPromptText}>
								Want to share your experience?
							</Text>
							<TouchableOpacity
								style={styles.reviewButton}
								onPress={() =>
									Linking.openURL("https://share.google/8o3iSk2vJ2vuMXCWl")
								}>
								<Text style={styles.reviewButtonText}>just give in google</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</ScrollView>

			{/* Simple Image Modal */}
			<Modal
				visible={isImageModalVisible}
				transparent={true}
				statusBarTranslucent={true}
				onRequestClose={closeImageModal}>
				<View style={styles.modalContainer}>
					<TouchableOpacity
						style={styles.modalCloseButton}
						onPress={closeImageModal}>
						<X color='white' size={24} />
					</TouchableOpacity>

					<ScrollView
						style={styles.modalScrollView}
						contentContainerStyle={styles.modalContent}
						showsVerticalScrollIndicator={false}
						maximumZoomScale={3}
						minimumZoomScale={1}>
						<Image
							source={selectedImage}
							style={styles.modalImage}
							resizeMode='contain'
						/>
					</ScrollView>

					<View style={styles.modalInstructions}>
						<Text style={styles.instructionText}>
							Tap and drag to view • Tap X to close
						</Text>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	header: {
		alignItems: "center",
		paddingTop: 16,
		paddingBottom: 8,
		backgroundColor: "rgba(255,255,255,0.95)",
		borderBottomWidth: 1,
		borderColor: "#FFD1DC",
	},
	headerTitle: { fontSize: 20, fontWeight: "bold", color: "#1F2937" },
	headerSubtitle: { fontSize: 12, color: "#9CA3AF" },

	tabsRow: {
		flexDirection: "row",
		justifyContent: "center",
		paddingVertical: 10,
		gap: 8,
	},
	tab: {
		paddingHorizontal: 22,
		paddingVertical: 7,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		marginHorizontal: 4,
	},
	activeTab: {
		backgroundColor: "#FF69B4",
		borderColor: "#FF69B4",
	},
	tabText: { color: "#9CA3AF", fontSize: 15, fontWeight: "500" },
	activeTabText: { color: "white" },

	content: { padding: 16 },

	// Categories
	categoriesList: {
		marginBottom: 16,
	},
	categoriesContent: {
		gap: 8,
	},
	categoryTab: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: "#F3F4F6",
	},
	activeCategoryTab: {
		backgroundColor: "#FF69B4",
	},
	categoryTabText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#9CA3AF",
	},
	activeCategoryTabText: {
		color: "white",
	},

	list: { gap: 16 },
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		overflow: "hidden",
		marginBottom: 16,
	},
	imageBox: {
		position: "relative",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: 200,
		backgroundColor: "#F3F4F6",
	},
	ratingBadge: {
		position: "absolute",
		top: 10,
		right: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		backgroundColor: "rgba(255,255,255,0.90)",
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	ratingText: { fontSize: 12, fontWeight: "500", color: "#1F2937" },

	cardContent: { padding: 14 },
	title: { fontSize: 16, fontWeight: "600", color: "#1F2937", marginBottom: 3 },
	category: { fontSize: 12, color: "#FF69B4", fontWeight: "500" },
	description: {
		fontSize: 13,
		color: "#636363",
		marginVertical: 6,
		lineHeight: 18,
	},
	cardFooter: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
		justifyContent: "space-between",
	},
	stats: { flexDirection: "row", gap: 12 },
	statItem: { flexDirection: "row", alignItems: "center", gap: 3 },
	statText: { fontSize: 12, color: "#636363" },
	shareButton: {
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderRadius: 8,
		padding: 4,
		backgroundColor: "#FFF",
	},

	// Testimonials
	testimonialCard: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 2,
		elevation: 1,
		marginBottom: 13,
	},
	testimonialHeader: { flexDirection: "row", gap: 10 },
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "#FF69B4",
		alignItems: "center",
		justifyContent: "center",
	},
	avatarText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
	testimonialInfo: { flex: 1 },
	ratingRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	testimonialStars: { flexDirection: "row", gap: 2 },
	testimonialName: { fontWeight: "bold", fontSize: 15, color: "#1F2937" },
	testimonialService: {
		fontSize: 12,
		color: "#FF69B4",
		marginVertical: 1,
		fontWeight: "500",
	},
	testimonialText: {
		fontSize: 14,
		color: "#214254",
		marginVertical: 4,
		lineHeight: 20,
	},

	reviewPrompt: { alignItems: "center", marginTop: 24, paddingVertical: 16 },
	reviewPromptText: { fontSize: 14, color: "#636363", marginBottom: 10 },
	reviewButton: {
		backgroundColor: "#FF69B4",
		borderRadius: 25,
		paddingHorizontal: 24,
		paddingVertical: 10,
	},
	reviewButtonText: { color: "#fff", fontWeight: "600" },

	// Empty state
	emptyState: {
		alignItems: "center",
		paddingVertical: 48,
		paddingHorizontal: 32,
	},
	emptyText: {
		fontSize: 16,
		color: "#6B7280",
		textAlign: "center",
		marginBottom: 8,
		fontWeight: "500",
	},
	emptySubText: {
		fontSize: 14,
		color: "#9CA3AF",
		textAlign: "center",
		lineHeight: 20,
	},

	// Modal styles
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.9)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalCloseButton: {
		position: "absolute",
		top: 50,
		right: 20,
		zIndex: 1000,
		backgroundColor: "rgba(0,0,0,0.5)",
		borderRadius: 20,
		padding: 8,
	},
	modalScrollView: {
		flex: 1,
		width: "100%",
	},
	modalContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		minHeight: SCREEN_HEIGHT,
	},
	modalImage: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT * 0.8,
	},
	modalInstructions: {
		position: "absolute",
		bottom: 50,
		alignSelf: "center",
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	instructionText: {
		color: "white",
		fontSize: 12,
		textAlign: "center",
	},
});
