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
} from "react-native";
import { Star, Heart, Share2, Eye } from "lucide-react-native"; // Make sure you have lucide-react-native installed
import makeupImg from "../../assets/images/makeup.jpeg"; // Replace with actual image paths

interface PortfolioItem {
	id: string;
	image: any;
	title: string;
	category: string;
	rating: number;
	likes: number;
	views: number;
	description: string;
}

const portfolioItems: PortfolioItem[] = [
	{
		id: "1",
		image: makeupImg,
		title: "Bridal Makeup - Radha's Wedding",
		category: "Bridal Makeup",
		rating: 5.0,
		likes: 156,
		views: 2341,
		description:
			"Complete bridal makeover with traditional gold jewelry styling",
	},
	{
		id: "2",
		image: makeupImg,
		title: "Gold Facial Transformation",
		category: "Facial Treatment",
		rating: 4.9,
		likes: 89,
		views: 1205,
		description: "Before and after of our signature gold facial treatment",
	},
	{
		id: "3",
		image: makeupImg,
		title: "Intricate Bridal Mehendi",
		category: "Mehendi",
		rating: 5.0,
		likes: 234,
		views: 3456,
		description: "Beautiful bridal mehendi design with intricate patterns",
	},
	{
		id: "4",
		image: makeupImg,
		title: "Layer Cut Transformation",
		category: "Hair Styling",
		rating: 4.8,
		likes: 67,
		views: 987,
		description: "Modern layer cut with professional styling",
	},
	{
		id: "5",
		image: makeupImg,
		title: "Custom Designer Gown",
		category: "Boutique",
		rating: 5.0,
		likes: 189,
		views: 2987,
		description: "Handcrafted designer gown with intricate embroidery work",
	},
	{
		id: "6",
		image: makeupImg,
		title: "Reception Look",
		category: "Party Makeup",
		rating: 4.9,
		likes: 123,
		views: 1876,
		description: "Elegant reception makeup with shimmer highlights",
	},
];

const testimonials = [
	{
		id: "1",
		name: "Priya Sharma",
		rating: 5,
		text: "Amazing bridal makeup! I felt like a princess on my wedding day. Thank you Magic Touch!",
		service: "Bridal Makeup",
	},
	{
		id: "2",
		name: "Anita Patel",
		rating: 5,
		text: "The gold facial was incredible. My skin is glowing and I received so many compliments!",
		service: "Gold Facial",
	},
	{
		id: "3",
		name: "Meera Joshi",
		rating: 4,
		text: "Beautiful mehendi design and very professional service. Highly recommended!",
		service: "Bridal Mehendi",
	},
];

export default function PortfolioScreen() {
	const [activeTab, setActiveTab] = useState<"gallery" | "testimonials">(
		"gallery"
	);

	const renderPortfolioItem = ({ item }: { item: PortfolioItem }) => (
		<View style={styles.card}>
			<View style={styles.imageBox}>
				<Image source={item.image} style={styles.image} />
				<View style={styles.ratingBadge}>
					<Star color='#FFD700' size={14} fill='#FFD700' />
					<Text style={styles.ratingText}>{item.rating}</Text>
				</View>
			</View>
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

	const renderTestimonial = ({ item }: { item: any }) => (
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
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Portfolio</Text>
				<Text style={styles.headerSubtitle}>Our work & client reviews</Text>
			</View>

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
					<FlatList
						data={portfolioItems}
						renderItem={renderPortfolioItem}
						keyExtractor={(item) => item.id}
						scrollEnabled={false}
						contentContainerStyle={styles.list}
					/>
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
							<TouchableOpacity style={styles.reviewButton}>
								<Text style={styles.reviewButtonText}>Write a Review</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</ScrollView>
			{/* Add your BottomNav component if you have one */}
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
	},
	imageBox: { position: "relative" },
	image: { width: "100%", height: 180, backgroundColor: "#F3F4F6" },
	ratingBadge: {
		position: "absolute",
		top: 10,
		right: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		backgroundColor: "rgba(255,255,255,0.85)",
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	ratingText: { fontSize: 12, fontWeight: "500", color: "#1F2937" },
	cardContent: { padding: 14 },
	title: { fontSize: 16, fontWeight: "600", color: "#1F2937", marginBottom: 3 },
	category: { fontSize: 12, color: "#9CA3AF" },
	description: { fontSize: 12, color: "#636363", marginVertical: 4 },
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
	testimonialService: { fontSize: 12, color: "#9CA3AF", marginVertical: 1 },
	testimonialText: { fontSize: 14, color: "#214254", marginVertical: 2 },
	reviewPrompt: { alignItems: "center", marginTop: 18 },
	reviewPromptText: { fontSize: 14, color: "#636363", marginBottom: 7 },
	reviewButton: {
		backgroundColor: "#FF69B4",
		borderRadius: 18,
		paddingHorizontal: 22,
		paddingVertical: 8,
	},
	reviewButtonText: { color: "#fff" },
});
