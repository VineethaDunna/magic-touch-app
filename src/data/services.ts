export const categories = [
	"All",
	"Facial",
	"Hair Care",
	"Makeup",
	"Mehendi",
	"Massage",
	"Manicure & Pedicure",
];

export const beautyServices = [
	{
		id: "1",
		name: "Gold Facial",
		price: 1500,
		category: "Facial",
		image: "https://example.com/facial.jpg",
		rating: 4.9,
		time: "45 mins",
	},
	{
		id: "2",
		name: "Bridal Makeup",
		price: 5000,
		category: "Makeup",
		image: "https://example.com/makeup.jpg",
		rating: 5.0,
		time: "90 mins",
	},
	{
		id: "3",
		name: "Hair Cut & Style",
		price: 800,
		category: "Hair Care",
		image: "https://example.com/haircut.jpg",
		rating: 4.8,
		time: "60 mins",
	},
	{
		id: "4",
		name: "Bridal Mehendi",
		price: 2000,
		category: "Mehendi",
		image: "https://example.com/mehendi.jpg",
		rating: 5.0,
		time: "120 mins",
	},
];

export const comboPackages = [
	{
		id: "combo1",
		name: "Bridal Special Package",
		price: 12000,
		originalPrice: 15000,
		image: "https://example.com/bridal-combo.jpg",
		rating: 5.0,
		duration: "4-5 hours",
		services: [
			"Bridal Makeup",
			"Hair Styling",
			"Bridal Mehendi",
			"Manicure & Pedicure",
		],
		savings: 3000,
	},
	{
		id: "combo2",
		name: "Glow Up Package",
		price: 2500,
		originalPrice: 3000,
		image: "https://example.com/glow-combo.jpg",
		rating: 4.8,
		duration: "2-3 hours",
		services: ["Gold Facial", "Hair Wash & Style", "Basic Manicure"],
		savings: 500,
	},
];
