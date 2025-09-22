import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

export const Input = (props: TextInputProps) => {
	return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		paddingHorizontal: 12,
		borderRadius: 8,
		fontSize: 16,
		color: "#111",
		backgroundColor: "white",
	},
});
