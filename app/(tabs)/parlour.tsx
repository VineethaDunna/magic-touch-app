import React, { useState, useMemo } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	FlatList,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Filter } from "lucide-react-native";
import { useCartContext } from "@/src/context/CartContext";
import { beautyServices, comboPackages, categories } from "@/src/data/services";
import ServiceCard from "@/src/components/ServiceCard";
import ComboCard from "@/src/components/ComboCard";

export default function ParlourScreen() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");
	const [showCombos, setShowCombos] = useState(false);
	const { addToCart } = useCartContext();

	// Universal search function for both services and combos
	const searchResults = useMemo(() => {
		if (!searchTerm.trim()) {
			return {
				services: beautyServices,
				combos: comboPackages,
			};
		}

		const searchQuery = searchTerm.toLowerCase().trim();

		// Search in individual services
		const filteredServices = beautyServices.filter((service) => {
			return (
				// Search in name
				service.name.toLowerCase().includes(searchQuery) ||
				// Search in category
				service.category.toLowerCase().includes(searchQuery) ||
				// Search in description
				service.description.toLowerCase().includes(searchQuery) ||
				// Search in related products
				(service.relatedProducts &&
					service.relatedProducts.some((product) =>
						product.toLowerCase().includes(searchQuery)
					)) ||
				// Search in reviews
				(service.reviews &&
					service.reviews.some((review) =>
						review.toLowerCase().includes(searchQuery)
					))
			);
		});

		// Search in combo packages
		const filteredCombos = comboPackages.filter((combo) => {
			return (
				// Search in name
				combo.name.toLowerCase().includes(searchQuery) ||
				// Search in description
				combo.description.toLowerCase().includes(searchQuery) ||
				// Search in services array
				combo.services.some((service) =>
					service.toLowerCase().includes(searchQuery)
				) ||
				// Search in tags
				combo.tags.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
				// Search in category
				combo.category.toLowerCase().includes(searchQuery)
			);
		});

		return {
			services: filteredServices,
			combos: filteredCombos,
		};
	}, [searchTerm]);

	// Filter by category (only for individual services)
	const filteredServices = useMemo(() => {
		let services = searchResults.services;

		if (activeCategory !== "All") {
			services = services.filter(
				(service) => service.category === activeCategory
			);
		}

		return services;
	}, [searchResults.services, activeCategory]);

	// Filter combo packages by search only (no category filter for combos)
	const filteredCombos = searchResults.combos;

	const handleAddToCart = (service, type) => {
		addToCart(service, type);
		Alert.alert("Success", `${service.name} added to cart!`);
	};

	const renderCategoryTab = ({ item }) => (
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

	const renderService = ({ item, index }) => (
		<View
			style={[styles.serviceItem, { marginRight: index % 2 === 0 ? 8 : 0 }]}>
			<ServiceCard
				item={item}
				onAddToCart={() => handleAddToCart(item, "service")}
				type='service'
			/>
		</View>
	);

	const renderCombo = ({ item }) => (
		<View style={styles.comboItem}>
			<ComboCard
				combo={item}
				onAddToCart={() => handleAddToCart(item, "combo")}
			/>
		</View>
	);

	// Get search result counts
	const serviceResultCount = filteredServices.length;
	const comboResultCount = filteredCombos.length;
	const totalResults = serviceResultCount + comboResultCount;

	return (
		<>
			{/* Search */}
			<View style={styles.searchSection}>
				<View style={styles.searchContainer}>
					<View style={styles.searchInputContainer}>
						<Search color='#9CA3AF' size={20} style={styles.searchIcon} />
						<TextInput
							style={styles.searchInput}
							placeholder='Search services, treatments, combos...'
							value={searchTerm}
							onChangeText={setSearchTerm}
							placeholderTextColor='#9CA3AF'
						/>
						{searchTerm.length > 0 && (
							<TouchableOpacity
								onPress={() => setSearchTerm("")}
								style={styles.clearButton}>
								<Text style={styles.clearButtonText}>×</Text>
							</TouchableOpacity>
						)}
					</View>
				</View>

				{/* Search Results Info */}
				{searchTerm.length > 0 && (
					<View style={styles.searchResultsInfo}>
						<Text style={styles.searchResultsText}>
							Found {totalResults} result{totalResults !== 1 ? "s" : ""} for "
							{searchTerm}"
						</Text>
						<Text style={styles.searchResultsBreakdown}>
							{serviceResultCount} service{serviceResultCount !== 1 ? "s" : ""}{" "}
							• {comboResultCount} combo{comboResultCount !== 1 ? "s" : ""}
						</Text>
					</View>
				)}

				{/* Toggle Buttons */}
				<View style={styles.toggleContainer}>
					<TouchableOpacity
						style={[styles.toggleButton, !showCombos && styles.activeToggle]}
						onPress={() => setShowCombos(false)}>
						<Text
							style={[
								styles.toggleText,
								!showCombos && styles.activeToggleText,
							]}>
							Individual Services
							{searchTerm && ` (${serviceResultCount})`}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.toggleButton, showCombos && styles.activeToggle]}
						onPress={() => setShowCombos(true)}>
						<Text
							style={[
								styles.toggleText,
								showCombos && styles.activeToggleText,
							]}>
							Combo Packages
							{searchTerm && ` (${comboResultCount})`}
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
				{!showCombos ? (
					<>
						{/* Categories - Only show if not searching */}
						{!searchTerm && (
							<FlatList
								data={categories}
								renderItem={renderCategoryTab}
								keyExtractor={(item) => item}
								horizontal
								showsHorizontalScrollIndicator={false}
								style={styles.categoriesList}
								contentContainerStyle={styles.categoriesContent}
							/>
						)}

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
								{searchTerm ? (
									<>
										<Text style={styles.emptyText}>
											No individual services found for "{searchTerm}"
										</Text>
										<Text style={styles.emptySubText}>
											Try searching for treatments, beauty services, or check
											combo packages
										</Text>
									</>
								) : (
									<>
										<Text style={styles.emptyText}>
											No services found in {activeCategory}
										</Text>
										<Text style={styles.emptySubText}>
											Try selecting a different category
										</Text>
									</>
								)}
							</View>
						)}
					</>
				) : (
					<View style={styles.combosSection}>
						<View style={styles.comboHeader}>
							<Text style={styles.comboTitle}>
								{searchTerm ? `Combo Search Results` : `Special Combo Packages`}
							</Text>
							<Text style={styles.comboSubtitle}>
								{searchTerm
									? `${comboResultCount} combo${
											comboResultCount !== 1 ? "s" : ""
									  } found for "${searchTerm}"`
									: `Save up to 10% on combo packages!`}
							</Text>
						</View>

						<FlatList
							data={filteredCombos}
							renderItem={renderCombo}
							keyExtractor={(item) => item.id}
							scrollEnabled={false}
							contentContainerStyle={styles.combosList}
						/>

						{filteredCombos.length === 0 && (
							<View style={styles.emptyState}>
								{searchTerm ? (
									<>
										<Text style={styles.emptyText}>
											No combo packages found for "{searchTerm}"
										</Text>
										<Text style={styles.emptySubText}>
											Try searching for beauty treatments, packages, or check
											individual services
										</Text>
									</>
								) : (
									<>
										<Text style={styles.emptyText}>
											No combo packages available
										</Text>
										<Text style={styles.emptySubText}>
											Check back later for new combo deals!
										</Text>
									</>
								)}
							</View>
						)}
					</View>
				)}
			</ScrollView>

			{/* Quick Search Suggestions */}
			{searchTerm.length === 0 && (
				<View style={styles.suggestionsContainer}>
					<Text style={styles.suggestionsTitle}>Popular Searches:</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View style={styles.suggestionsList}>
							{[
								"facial",
								"hair cut",
								"manicure",
								"bridal",
								"massage",
								"wax",
								"threading",
							].map((suggestion) => (
								<TouchableOpacity
									key={suggestion}
									style={styles.suggestionChip}
									onPress={() => setSearchTerm(suggestion)}>
									<Text style={styles.suggestionText}>{suggestion}</Text>
								</TouchableOpacity>
							))}
						</View>
					</ScrollView>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		flex: 1,
	},
	searchSection: {
		backgroundColor: "rgba(255, 255, 255, 0.95)",
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255, 105, 180, 0.1)",
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
	clearButton: {
		padding: 4,
		marginLeft: 8,
	},
	clearButtonText: {
		fontSize: 20,
		color: "#9CA3AF",
		fontWeight: "bold",
	},
	searchResultsInfo: {
		paddingHorizontal: 16,
		paddingBottom: 8,
	},
	searchResultsText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#1F2937",
	},
	searchResultsBreakdown: {
		fontSize: 12,
		color: "#9CA3AF",
		marginTop: 2,
	},
	toggleContainer: {
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingBottom: 12,
		gap: 8,
	},
	toggleButton: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	activeToggle: {
		backgroundColor: "#FF69B4",
		borderColor: "#FF69B4",
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
		marginTop: 8,
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
		paddingBottom: 16,
	},
	servicesRow: {
		justifyContent: "space-between",
	},
	serviceItem: {
		width: "48%",
		marginBottom: 16,
	},
	combosSection: {
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	comboHeader: {
		marginBottom: 16,
	},
	comboTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 4,
	},
	comboSubtitle: {
		fontSize: 14,
		color: "#9CA3AF",
	},
	combosList: {
		gap: 16,
		paddingBottom: 16,
	},
	comboItem: {
		marginBottom: 8,
	},
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
	suggestionsContainer: {
		paddingVertical: 1,
		paddingHorizontal: 16,
		backgroundColor: "#FAFAFA",
		borderTopWidth: 1,
		borderTopColor: "#E5E7EB",
	},
	suggestionsTitle: {
		fontSize: 12,
		color: "#6B7280",
		marginBottom: 8,
		fontWeight: "500",
	},
	suggestionsList: {
		flexDirection: "row",
		gap: 8,
	},
	suggestionChip: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	suggestionText: {
		fontSize: 12,
		color: "#6B7280",
		textTransform: "capitalize",
	},
});
