import React, { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Alert,
} from "react-native";
import { Search } from "lucide-react-native";
import { useCartContext } from "@/src/context/CartContext";
import { beautyServices, comboPackages, categories } from "@/src/data/services";
import ServiceCard from "@/src/components/ServiceCard";
import ComboCard from "@/src/components/ComboCard";

export default function ParlourScreen() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");
	const [showCombos, setShowCombos] = useState(false);
	const { addToCart } = useCartContext();

	const filteredServices = beautyServices.filter((service) => {
		const matchesCategory =
			activeCategory === "All" || service.category === activeCategory;
		const matchesSearch =
			service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			service.category.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const handleAddToCart = (service: any, type: "service" | "combo") => {
		addToCart(service, type);
		Alert.alert("Success", `${service.name} added to cart!`);
	};

	const renderCategoryTab = ({ item }: { item: string }) => (
		<TouchableOpacity
			style={[
				styles.categoryTab,
				activeCategory === item && styles.activeCategoryTab,
			]}
			onPress={() => setActiveCategory(item)}>
			<Text
				style={[
					styles.categoryTabText,
					activeCategory === item && styles.activeCategoryTabText,
				]}>
				{item}
			</Text>
		</TouchableOpacity>
	);

	const renderService = ({ item, index }: { item: any; index: number }) => (
		<View
			style={[styles.serviceItem, { marginRight: index % 2 === 0 ? 8 : 0 }]}>
			<ServiceCard
				item={item}
				onAddToCart={() => handleAddToCart(item, "service")}
				type='service'
			/>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Beauty Parlour</Text>
				<Text style={styles.headerSubtitle}>Professional beauty services</Text>
			</View>

			{/* Search */}
			<View style={styles.searchContainer}>
				<View style={styles.searchInputContainer}>
					<Search color='#9CA3AF' size={20} style={styles.searchIcon} />
					<TextInput
						style={styles.searchInput}
						placeholder='Search services...'
						value={searchTerm}
						onChangeText={setSearchTerm}
						placeholderTextColor='#9CA3AF'
					/>
				</View>
			</View>

			{/* Toggle Buttons */}
			<View style={styles.toggleContainer}>
				<TouchableOpacity
					style={[styles.toggleButton, !showCombos && styles.activeToggle]}
					onPress={() => setShowCombos(false)}>
					<Text
						style={[styles.toggleText, !showCombos && styles.activeToggleText]}>
						Individual Services
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.toggleButton, showCombos && styles.activeToggle]}
					onPress={() => setShowCombos(true)}>
					<Text
						style={[styles.toggleText, showCombos && styles.activeToggleText]}>
						Combo Packages
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
				{!showCombos ? (
					<>
						{/* Categories */}
						<FlatList
							data={categories}
							renderItem={renderCategoryTab}
							keyExtractor={(item) => item}
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.categoriesList}
							contentContainerStyle={styles.categoriesContent}
						/>

						{/* Services Grid */}
						<FlatList
							data={filteredServices}
							renderItem={renderService}
							keyExtractor={(item) => item.id}
							numColumns={2}
							scrollEnabled={false}
							contentContainerStyle={styles.servicesGrid}
							columnWrapperStyle={styles.servicesRow}
						/>

						{filteredServices.length === 0 && (
							<View style={styles.emptyState}>
								<Text style={styles.emptyText}>
									No services found for "{searchTerm}" in {activeCategory}
								</Text>
							</View>
						)}
					</>
				) : (
					<View style={styles.combosSection}>
						<View style={styles.comboHeader}>
							<Text style={styles.comboTitle}>Special Combo Packages</Text>
							<Text style={styles.comboSubtitle}>
								Save 10% on combo packages!
							</Text>
						</View>
						<FlatList
							data={comboPackages}
							renderItem={({ item }) => (
								<ComboCard
									combo={item}
									onAddToCart={() => handleAddToCart(item, "combo")}
								/>
							)}
							keyExtractor={(item) => item.id}
							scrollEnabled={false}
							contentContainerStyle={styles.combosList}
						/>
					</View>
				)}
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
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255, 105, 180, 0.2)",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#1F2937",
	},
	headerSubtitle: {
		fontSize: 12,
		color: "#9CA3AF",
	},
	searchContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	searchInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F9FAFB",
		borderRadius: 12,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		paddingVertical: 12,
		fontSize: 16,
		color: "#1F2937",
	},
	toggleContainer: {
		flexDirection: "row",
		paddingHorizontal: 16,
		marginBottom: 16,
		gap: 8,
	},
	toggleButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: "rgba(255, 255, 255, 0.5)",
	},
	activeToggle: {
		backgroundColor: "#FF69B4",
	},
	toggleText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#9CA3AF",
	},
	activeToggleText: {
		color: "white",
	},
	content: {
		flex: 1,
	},
	categoriesList: {
		paddingHorizontal: 16,
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
	servicesGrid: {
		paddingHorizontal: 16,
	},
	servicesRow: {
		justifyContent: "space-between",
	},
	serviceItem: {
		width: "48%",
		marginBottom: 16,
	},
	emptyState: {
		alignItems: "center",
		paddingVertical: 32,
	},
	emptyText: {
		color: "#9CA3AF",
		textAlign: "center",
	},
	combosSection: {
		paddingHorizontal: 16,
	},
	comboHeader: {
		marginBottom: 16,
	},
	comboTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 8,
	},
	comboSubtitle: {
		fontSize: 14,
		color: "#9CA3AF",
	},
	combosList: {
		gap: 16,
	},
});
