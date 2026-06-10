// ── CNP shared data ───────────────────────────────────────────────
// Generic sample video (Big Buck Bunny — Creative Commons) for popups.
const SAMPLE_VIDEO = "https://www.youtube.com/embed/aqz-KE-bpKQ?rel=0&modestbranding=1";

export const CNP_PROJECTS = [
  {
    id: "barrios",
    name: "Barrios Latinos",
    client: "Call of Duty: Mobile",
    year: "2025",
    img: "assets/proj-brand.png",
    // palette
    bg: "#e2ff0d", fg: "#000000", accent: "#d142a4", chip: "#000000", chipFg: "#e2ff0d",
    tag: "Collab Drop",
    services: ["Brand Identity", "3D / Toy Design", "Art Direction"],
    keywords: ["streetwear", "collectible", "gaming", "latino culture"],
    desc: "Una cápsula coleccionable que traduce el barrio a vinilo. Curamos el cruce entre gaming global y cultura local — sin perder el acento.",
  },
  {
    id: "idea",
    name: "Idea Machine",
    client: "CNP Labs",
    year: "2024",
    img: "assets/svc-1.png",
    bg: "#5944ff", fg: "#ffffff", accent: "#e2ff0d", chip: "#e2ff0d", chipFg: "#000000",
    tag: "Internal R&D",
    services: ["Product Design", "Industrial", "AI Systems"],
    keywords: ["gachapon", "generative", "serendipity", "toy"],
    desc: "Una máquina de cápsulas que dispensa ideas, no juguetes. Random ideas, fresh daily. La curaduría hecha objeto físico.",
  },
  {
    id: "rewind",
    name: "Be Kind Rewind",
    client: "Nivora Records",
    year: "2024",
    img: "assets/svc-2.png",
    bg: "#2892fb", fg: "#ffffff", accent: "#191919", chip: "#191919", chipFg: "#ffffff",
    tag: "Music Drop",
    services: ["Packaging", "Sound Identity", "Editorial"],
    keywords: ["cassette", "analog", "nostalgia", "limited"],
    desc: "Edición limitada en cinta transparente. Recuperamos el ritual del play físico para una generación que solo conoció el stream.",
  },
  {
    id: "viper",
    name: "Viper",
    client: "Outfit × Hello Hello",
    year: "2023",
    img: "assets/btn-contacto.png",
    bg: "#f95c4b", fg: "#000000", accent: "#191919", chip: "#191919", chipFg: "#faff22",
    tag: "Hardware Concept",
    services: ["Hardware", "UX Writing", "Branding"],
    keywords: ["pager", "Y2K", "signal", "comms"],
    desc: "Un buscapersonas reinventado para la era del ruido. 1 new message. La señal por encima del scroll infinito.",
  },
  {
    id: "pet",
    name: "CNP Pet",
    client: "Pixelvault",
    year: "2023",
    img: "assets/btn-game.png",
    bg: "#00bf63", fg: "#000000", accent: "#820cea", chip: "#191919", chipFg: "#00bf63",
    tag: "Digital Toy",
    services: ["Game Design", "Character", "Web App"],
    keywords: ["tamagotchi", "virtual pet", "nostalgia", "playful"],
    desc: "Una mascota digital que alimentas con criterio, no con clicks. Low ego, high care. El juguete que cuida de vuelta.",
  },
];
CNP_PROJECTS.forEach(p => p.video = SAMPLE_VIDEO);

// Merch collage — fashion editorial (text always present per card)
export const CNP_MERCH = [
  { id: "cap", img: "assets/merch-1.png", name: "Nerdy Cap + Bandana", price: "$38", drop: "OJAI SERIES", color: "#2892fb" },
  { id: "tee", name: "Low Ego Tee", price: "$45", drop: "THE CODE", color: "#e2ff0d", typeOnly: true, sub: "Heavyweight cotton. One statement." },
  { id: "tote", name: "Curaduría Tote", price: "$28", drop: "THE FILTER", color: "#d142a4", typeOnly: true, sub: "Carry less. Choose better." },
  { id: "stk", name: "Cursor Sticker Pack", price: "$12", drop: "LA SEÑAL", color: "#5944ff", typeOnly: true, sub: "Not decoration. A signal." },
  { id: "hoodie", name: "Signal Hoodie", price: "$72", drop: "THE DROP", color: "#f95c4b", typeOnly: true, sub: "Tech as tool. Worn warm." },
];

export const CNP_SOCIAL = [
  { id: "linkedin", label: "CNP on LinkedIn", href: "https://www.linkedin.com/" },
  { id: "instagram", label: "CNP on Instagram", href: "https://www.instagram.com/" },
];
