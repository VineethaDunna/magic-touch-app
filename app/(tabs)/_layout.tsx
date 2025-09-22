import { Tabs } from "expo-router";
import {
	Home,
	Scissors,
	ShoppingBag,
	User,
	Camera,
	ShoppingCart,
} from "lucide-react-native";
import AppHeader from "../../src/components/AppHeader";

export default function TabLayout() {
	return (
		<>
			<AppHeader />
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: "#FF69B4",
					tabBarInactiveTintColor: "#9CA3AF",
					tabBarStyle: {
						backgroundColor: "white",
						borderTopWidth: 1,
						borderTopColor: "#FF69B420",
						paddingTop: 8,
						paddingBottom: 8,
						height: 70,
					},
				}}>
				<Tabs.Screen
					name='index'
					options={{
						title: "Home",
						tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
					}}
				/>
				<Tabs.Screen
					name='parlour'
					options={{
						title: "Parlour",
						tabBarIcon: ({ color, size }) => (
							<Scissors color={color} size={size} />
						),
					}}
				/>
				<Tabs.Screen
					name='boutique'
					options={{
						title: "Boutique",
						tabBarIcon: ({ color, size }) => (
							<ShoppingBag color={color} size={size} />
						),
					}}
				/>
				<Tabs.Screen
					name='portfolio'
					options={{
						title: "Portfolio",
						tabBarIcon: ({ color, size }) => (
							<Camera color={color} size={size} />
						),
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						title: "Profile",
						tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
					}}
				/>
				<Tabs.Screen
					name='cart'
					options={{
						title: "Cart",
						tabBarIcon: ({ color, size }) => (
							<ShoppingCart color={color} size={size} />
						),
					}}
				/>
			</Tabs>
		</>
	);
}
