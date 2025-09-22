import React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	ViewStyle,
	TextStyle,
} from "react-native";

type ButtonProps = {
	children: React.ReactNode;
	onPress?: () => void;
	variant?: "default" | "outline" | "destructive";
	size?: "sm" | "md" | "lg";
	style?: ViewStyle;
	textStyle?: TextStyle;
};

export const Button = ({
	children,
	onPress,
	variant = "default",
	size = "md",
	style,
	textStyle,
}: ButtonProps) => {
	const containerStyles = [
		styles.base,
		variant === "outline" && styles.outline,
		variant === "destructive" && styles.destructive,
		size === "sm" && styles.sm,
		size === "lg" && styles.lg,
		style,
	];

	const textStyles = [
		styles.textBase,
		variant === "outline" && styles.textOutline,
		variant === "destructive" && styles.textDestructive,
		size === "sm" && styles.textSm,
		size === "lg" && styles.textLg,
		textStyle,
	];

	return (
		<TouchableOpacity
			style={containerStyles}
			onPress={onPress}
			activeOpacity={0.7}>
			<Text style={textStyles}>{children}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	base: {
		backgroundColor: "#FF69B4",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	outline: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#FF69B4",
	},
	destructive: {
		backgroundColor: "#FF4C4C",
	},
	textBase: {
		color: "white",
		fontWeight: "600",
		fontSize: 16,
	},
	textOutline: {
		color: "#FF69B4",
	},
	textDestructive: {
		color: "white",
	},
	sm: {
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	lg: {
		paddingVertical: 16,
		paddingHorizontal: 28,
	},
	textSm: {
		fontSize: 14,
	},
	textLg: {
		fontSize: 18,
	},
});
