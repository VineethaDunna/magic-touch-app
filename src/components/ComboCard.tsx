import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	FlatList,
} from "react-native";
import { Star, Clock, Plus } from "lucide-react-native";

interface ComboCardProps {
	combo: {
		id: string;
		name: string;
		price: number;
		originalPrice: number;
		image: string;
		rating: number;
		duration: string;
		services: string[];
		savings: number;
	};
	onAddToCart: () => void;
}

export default function ComboCard({ combo, onAddToCart }: ComboCardProps) {
	const renderService = ({ item }: { item: string }) => (
		<Text style={styles.serviceItem}>• {item}</Text>
	);

	return (
		<View style={styles.container}>
			<Image source={{ uri: combo.image }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.name}>{combo.name}</Text>
				<FlatList
					data={combo.services}
					renderItem={renderService}
					keyExtractor={(item, index) => index.toString()}
					scrollEnabled={false}
					style={styles.servicesList}
				/>
				<View style={styles.details}>
					<View style={styles.rating}>
						<Star color='#FFD700' size={14} fill='#FFD700' />
						<Text style={styles.ratingText}>{combo.rating}</Text>
					</View>
					<View style={styles.time}>
						<Clock color='#9CA3AF' size={14} />
						<Text style={styles.timeText}>{combo.duration}</Text>
					</View>
				</View>
				<View style={styles.footer}>
					<View style={styles.pricing}>
						<Text style={styles.originalPrice}>₹{combo.originalPrice}</Text>
						<Text style={styles.price}>₹{combo.price}</Text>
						<Text style={styles.savings}>Save ₹{combo.savings}</Text>
					</View>
					<TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
						<Plus color='white' size={20} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderRadius: 12,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	image: {
		width: "100%",
		height: 160,
		backgroundColor: "#F3F4F6",
	},
	content: {
		padding: 16,
	},
	name: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 12,
	},
	servicesList: {
		marginBottom: 12,
	},
	serviceItem: {
		fontSize: 12,
		color: "#6B7280",
		marginBottom: 4,
	},
	details: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	rating: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	ratingText: {
		fontSize: 14,
		color: "#9CA3AF",
	},
	time: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	timeText: {
		fontSize: 14,
		color: "#9CA3AF",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	pricing: {
		flex: 1,
	},
	originalPrice: {
		fontSize: 12,
		color: "#9CA3AF",
		textDecorationLine: "line-through",
	},
	price: {
		fontSize: 18,
		fontWeight: "600",
		color: "#FF69B4",
	},
	savings: {
		fontSize: 12,
		color: "#10B981",
		fontWeight: "500",
	},
	addButton: {
		backgroundColor: "#FF69B4",
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
});
