import React from "react";
import { Switch as RNSwitch, StyleSheet } from "react-native";

type SwitchProps = {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
};

export const Switch = ({ checked, onCheckedChange }: SwitchProps) => {
	return (
		<RNSwitch
			value={checked}
			onValueChange={onCheckedChange}
			style={styles.switch}
		/>
	);
};

const styles = StyleSheet.create({
	switch: {
		transform: [{ scale: 0.8 }],
	},
});
