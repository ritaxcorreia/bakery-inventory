export function formatPrice(cents) {
	return (cents / 100).toLocaleString("en-US", {
		style: "currency",
		currency: "GBP",
	});
}

export function random(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
}

export function getFunName() {
	const adjectives = [
		"adorable",
		"beautiful",
		"clean",
		"drab",
		"elegant",
		"fancy",
		"glamorous",
		"handsome",
		"long",
		"magnificent",
		"old-fashioned",
		"plain",
		"quaint",
		"sparkling",
		"ugliest",
		"unsightly",
		"angry",
		"bewildered",
		"clumsy",
		"defeated",
		"embarrassed",
		"fierce",
		"grumpy",
		"helpless",
		"itchy",
		"jealous",
		"lazy",
		"mysterious",
		"nervous",
		"obnoxious",
		"panicky",
		"repulsive",
		"scary",
		"thoughtless",
		"uptight",
		"worried",
	];

	const nouns = [
		"pretzels",
		"croissants",
		"bread",
		"muffins",
		"baker",
		"bakery",
		"flour",
		"baguette",
	];

	return `${random(adjectives)}-${random(adjectives)}-${random(nouns)}`;
}
