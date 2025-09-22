import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type CardProps = {
	children: React.ReactNode;
	style?: ViewStyle;
};

export const Card = ({ children, style }: CardProps) => {
	return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2,
	},
});
