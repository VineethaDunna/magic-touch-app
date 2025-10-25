import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Star, Clock, Plus } from "lucide-react-native";

interface ServiceCardProps {
	item: {
		id: string;
		name: string;
		price: number;
		image: string;
		rating: number;
		time: string;
		category: string;
	};
	onAddToCart: () => void;
	type: "service" | "boutique";
}

export default function ServiceCard({
	item,
	onAddToCart,
	type,
}: ServiceCardProps) {
	return (
		<View style={styles.container}>
			<Image source={item.image} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.name} numberOfLines={2}>
					{item.name}
				</Text>
				<Text style={styles.category} numberOfLines={1}>
					{item.category}
				</Text>
				<View style={styles.details}>
					<View style={styles.rating}>
						<Star color='#FFD700' size={12} fill='#FFD700' />
						<Text style={styles.ratingText}>{item.rating}</Text>
					</View>
					<View style={styles.time}>
						<Clock color='#9CA3AF' size={12} />
						<Text style={styles.timeText}>{item.time}</Text>
					</View>
				</View>
				<View style={styles.footer}>
					<Text style={styles.price}>₹{item.price}</Text>
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
		height: 120,
		backgroundColor: "#F3F4F6",
	},
	content: {
		padding: 12,
	},
	name: {
		fontSize: 14,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 4,
	},
	category: {
		fontSize: 12,
		color: "#9CA3AF",
		marginBottom: 8,
	},
	details: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	rating: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	ratingText: {
		fontSize: 12,
		color: "#9CA3AF",
	},
	time: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	timeText: {
		fontSize: 12,
		color: "#9CA3AF",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
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
	addButton: {
		backgroundColor: "#FF69B4",
		width: 40,
		height: 40,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
	},
});
