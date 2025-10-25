export const boutiqueCategories = [
	"All",
	"Ethnic Wear",
	"Western Wear",
	"Bridal Wear",
	"Party Wear",
	"Accessories",
];
const images = {
	img1: require("../../assets/boutique/1.jpeg"),
	img2: require("../../assets/boutique/2.jpeg"),
	img3: require("../../assets/boutique/3.jpeg"),
};

export const boutiqueItems = [
	{
		id: "b1",
		name: "Designer Lehenga",
		price: 8000,
		category: "Bridal Wear",
		image: images.img1,
		rating: 5.0,
		time: "15 days",
	},
	{
		id: "b2",
		name: "Party Gown",
		price: 3500,
		category: "Party Wear",
		image: images.img2,
		rating: 4.8,
		time: "7 days",
	},
	{
		id: "b3",
		name: "Saree Blouse",
		price: 1200,
		category: "Ethnic Wear",
		image: images.img3,
		rating: 4.9,
		time: "3 days",
	},
];
