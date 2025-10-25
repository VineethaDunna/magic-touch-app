// src/data/portfolio.ts

export interface PortfolioItem {
	id: string;
	image: any;
	title: string;
	category: string;
	rating: number;
	likes: number;
	views: number;
	description: string;
}

export interface Testimonial {
	id: string;
	name: string;
	rating: number;
	text: string;
	service: string;
}

// Portfolio Images
const portfolioImages = {
	img1: require("../../assets/portfolio/1.jpg"),
	img2: require("../../assets/portfolio/2.jpg"),
	img3: require("../../assets/portfolio/3.jpg"),
	img4: require("../../assets/portfolio/4.jpg"),
	img5: require("../../assets/portfolio/5.jpg"),
	img6: require("../../assets/portfolio/6.jpg"),
	img7: require("../../assets/portfolio/7.jpg"),
	img8: require("../../assets/portfolio/8.jpg"),
	img9: require("../../assets/portfolio/9.jpg"),
	img10: require("../../assets/portfolio/10.jpg"),
	img11: require("../../assets/portfolio/11.jpg"),
	img12: require("../../assets/portfolio/12.jpg"),
};

export const portfolioItems: PortfolioItem[] = [
	{
		id: "1",
		image: portfolioImages.img3,
		title: "Royal Bridal Makeup - Priya's Grand Wedding",
		category: "Bridal Makeup",
		rating: 5.0,
		likes: 234,
		views: 3456,
		description:
			"Complete bridal makeover with traditional gold jewelry styling and heavy dupatta draping",
	},
	{
		id: "2",
		image: portfolioImages.img5,
		title: "Traditional South Indian Bridal Look",
		category: "Bridal Makeup",
		rating: 4.9,
		likes: 189,
		views: 2876,
		description:
			"Classic South Indian bridal makeup with temple jewelry and silk saree styling",
	},
	{
		id: "3",
		image: portfolioImages.img4,
		title: "Elegant Party Makeup",
		category: "Simple Makeup",
		rating: 4.8,
		likes: 145,
		views: 2104,
		description:
			"Sophisticated party makeup with subtle contouring and glossy finish",
	},
	{
		id: "4",
		image: portfolioImages.img4,
		title: "Natural Day Look",
		category: "Simple Makeup",
		rating: 4.7,
		likes: 98,
		views: 1567,
		description:
			"Fresh and natural makeup perfect for daytime events and casual occasions",
	},
	{
		id: "5",
		image: portfolioImages.img11,
		title: "Intricate Bridal Mehendi Design",
		category: "Mehandi",
		rating: 5.0,
		likes: 312,
		views: 4567,
		description:
			"Beautiful bridal mehendi with intricate patterns and traditional motifs",
	},
	{
		id: "6",
		image: portfolioImages.img10,
		title: "Arabic Mehendi Pattern",
		category: "Mehandi",
		rating: 4.9,
		likes: 156,
		views: 2345,
		description:
			"Elegant Arabic mehendi design with floral patterns and bold strokes",
	},
	{
		id: "7",
		image: portfolioImages.img2,
		title: "Designer Saree Draping - Reception Style",
		category: "Saree Folding",
		rating: 4.8,
		likes: 201,
		views: 2987,
		description:
			"Professional saree draping in modern reception style with perfect pleats",
	},
	{
		id: "8",
		image: portfolioImages.img1,
		title: "Traditional Saree Style",
		category: "Saree Folding",
		rating: 4.9,
		likes: 167,
		views: 2456,
		description:
			"Classic Bengali saree draping with traditional pleating and pallu styling",
	},
	{
		id: "9",
		image: portfolioImages.img12,
		title: "Goddess Durga Mata Decoration",
		category: "Decoration",
		rating: 5.0,
		likes: 345,
		views: 5234,
		description:
			"Beautiful decoration setup for Durga Mata puja with traditional flowers and lights",
	},
	{
		id: "10",
		image: portfolioImages.img1,
		title: "Festive Durga Puja Mandap",
		category: "Decoration",
		rating: 4.9,
		likes: 278,
		views: 4123,
		description:
			"Grand mandap decoration for Durga Puja with authentic Bengali styling",
	},
	{
		id: "11",
		image: portfolioImages.img4,
		title: "Style Saree Draping",
		category: "Saree Folding",
		rating: 4.8,
		likes: 189,
		views: 2765,
		description:
			"Modern lehenga style saree draping perfect for wedding functions",
	},
	{
		id: "12",
		image: portfolioImages.img7,
		title: "Minimalist Mehendi Design",
		category: "Mehandi",
		rating: 4.7,
		likes: 134,
		views: 1876,
		description:
			"Simple yet elegant mehendi design for modern brides who prefer minimal patterns",
	},
];

export const testimonials: Testimonial[] = [
	{
		id: "1",
		name: "Priya",
		rating: 5,
		text: "Amazing bridal makeup! I felt like a princess on my wedding day. The team was so professional and the makeup lasted all day long. Thank you Magic Touch!",
		service: "Bridal Makeup",
	},
	{
		id: "2",
		name: "Devi",
		rating: 5,
		text: "The mehendi design was absolutely beautiful! Everyone at my wedding was asking about where I got it done. Highly recommend their artistic work.",
		service: "Bridal Mehendi",
	},
	{
		id: "3",
		name: "Mounika",
		rating: 4,
		text: "Perfect saree draping for my sister's reception. The pleats were so neat and the style was exactly what we wanted. Very professional service!",
		service: "Saree Folding",
	},
	{
		id: "4",
		name: "Vineetha",
		rating: 5,
		text: "Beautiful Durga Mata decoration for our puja. The attention to detail was amazing and everyone loved the traditional setup.",
		service: "Decoration",
	},
	{
		id: "5",
		name: "pavani",
		rating: 4,
		text: "Lovely simple makeup for my office party. It was natural yet glamorous. Will definitely book again for future events.",
		service: "Simple Makeup",
	},
	{
		id: "6",
		name: "Jyothi",
		rating: 5,
		text: "The bridal makeup was flawless! My husband couldn't stop staring at me. Thank you for making my special day even more beautiful.",
		service: "Bridal Makeup",
	},
];

export const categories = [
	"All",
	"Bridal Makeup",
	"Simple Makeup",
	"Mehandi",
	"Saree Folding",
	"Decoration",
];
