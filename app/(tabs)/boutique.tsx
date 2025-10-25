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
import { boutiqueItems, boutiqueCategories } from "@/src/data/boutique";
import ServiceCard from "@/src/components/ServiceCard";

export default function BoutiqueScreen() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");
	const { addToCart } = useCartContext();

	const filteredItems = boutiqueItems.filter((item) => {
		const matchesCategory =
			activeCategory === "All" || item.category === activeCategory;
		const matchesSearch =
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.category.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const handleAddToCart = (item: any) => {
		addToCart(item, "boutique");
		Alert.alert("Success", `${item.name} added to cart!`);
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

	const renderItem = ({ item, index }: { item: any; index: number }) => (
		<View
			style={[styles.itemContainer, { marginRight: index % 2 === 0 ? 8 : 0 }]}>
			<ServiceCard
				item={item}
				onAddToCart={() => handleAddToCart(item)}
				type='boutique'
			/>
		</View>
	);

	return (
		<>
			{/* Header */}

			{/* Search */}
			<View style={styles.searchContainer}>
				<View style={styles.searchInputContainer}>
					<Search color='#9CA3AF' size={20} style={styles.searchIcon} />
					<TextInput
						style={styles.searchInput}
						placeholder='Search boutique items...'
						value={searchTerm}
						onChangeText={setSearchTerm}
						placeholderTextColor='#9CA3AF'
					/>
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
				{/* Categories */}
				<FlatList
					data={boutiqueCategories}
					renderItem={renderCategoryTab}
					keyExtractor={(item) => item}
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.categoriesList}
					contentContainerStyle={styles.categoriesContent}
				/>

				{/* Items Grid */}
				<FlatList
					data={filteredItems}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					numColumns={2}
					scrollEnabled={false}
					contentContainerStyle={styles.itemsGrid}
					columnWrapperStyle={styles.itemsRow}
				/>

				{filteredItems.length === 0 && (
					<View style={styles.emptyState}>
						<Text style={styles.emptyText}>
							No items found for "{searchTerm}" in {activeCategory}
						</Text>
					</View>
				)}
			</ScrollView>
		</>
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
	itemsGrid: {
		paddingHorizontal: 16,
	},
	itemsRow: {
		justifyContent: "space-between",
	},
	itemContainer: {
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
});
