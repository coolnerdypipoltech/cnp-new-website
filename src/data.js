import React from 'react';

// ── CNP shared data ───────────────────────────────────────────────
// Generic sample video (Big Buck Bunny — Creative Commons) for popups.

const A = (p) => `${process.env.PUBLIC_URL}${p}`;

export const CNP_PROJECTS = [
  {
    id: "cnp",
    name: "Cool Nerdy People Reel",
    client: "",
    videoTitle: "",
    year: "Since 2024",
    img: A("/assets/proyects/CNP.png"),
    logo: A("/assets/proyects/logos/Logo_CNPBlack.png"),
    video: [A("/assets/proyects/videos/CNP.mp4")],
    videoMobil: [A("/assets/proyects/videos/CNP.mp4")],
    deskCover: [A("/assets/proyects/videos/thumbnailDesktop/others/cnp-Cover.jpg")],
    cover: [A("/assets/proyects/videos/thumbnail/others/cnp-Cover.png")],
    videoFill: [true],
    // palette
    bg: "#00BF63",
    fg: "#000000",
    accent: "#820cea",
    chip: "#000000",
    chipFg: "#00BF63",
    tag: "",
    videoKeywords: ["", "", "", "", ""],
    services: ["", "", "", "", ""],
    keywords: ["streetwear", "collectible", "gaming", "latino culture"],
    desc: "Una cápsula coleccionable que traduce el barrio a vinilo. Curamos el cruce entre gaming global y cultura local — sin perder el acento.",
  },
  {
    id: "barrios",
    name: "Activision",
    client: "Call of Duty Mobile — Barrios Latinos",
    videoTitle: "Barrios Latinos",
    year: "2026",
    img: A("/assets/proyects/codm.png"),
    logo: A("/assets/proyects/logos/Logo_CD_M.png"),
    video: [A("/assets/proyects/videos/barrios/Desktop/16X9_AFTERMOVIE_CODM.mp4"), A("/assets/proyects/videos/barrios/Desktop/16X9_HERO_CODM.mp4")],
    videoMobil : [A("/assets/proyects/videos/barrios/Movil/9X16_AFTERMOVIE_CODM.mp4"), A("/assets/proyects/videos/barrios/Movil/9X16_HERO_CODM.mp4")],
    deskCover: [A("/assets/proyects/videos/thumbnailDesktop/barrios/barrios-1.jpg"), A("/assets/proyects/videos/thumbnailDesktop/barrios/barrios-2.jpg")],
    cover: [A("/assets/proyects/videos/thumbnail/barrios/barrios-1.jpg"), A("/assets/proyects/videos/thumbnail/barrios/barrios-2.jpg")],
    videoFill: [true, true],
    
    // palette
    bg: "#FFEA2E",
    fg: "#000000",
    accent: "#820cea",
    chip: "#000000",
    chipFg: "#FFEA2E",
    tag: "",
    services: ["Consumer Insights & Strategic Planning", "Creative Concept Development", "Visual Identity & Campaign Design", "Social Media Strategy & Content Creation", "Website Design & Development", "Video Production & Aftermovie"],
    keywords: ["Gaming", "Latin America", "Culture", "Freestyle", "Entertainment"],
    desc: (
      <>
        For Activision’s Call of Duty: Mobile, we created Barrios Latinos, a culture-powered competitive platform merging freestyle and gaming. From strategy and creative development to content, community, and live experience design, we integrated leading talent including <a href="https://www.instagram.com/aczino_oficial/?hl=es-la" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 700 }}>Aczino</a>, <a href="https://www.instagram.com/marithearap/?hl=es-la" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 700 }}>Marithea</a> and <a href="https://www.instagram.com/elmenorroficial._free24.7/?hl=es-la" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 700 }}>El Menor</a> directly into the gameplay, culminating in an epic live final in Mexico City to drive cultural relevance, fan engagement, and entertainment impact across Latin America.
      </>
    ),
  },
  {
    id: "sams",
    name: "Sam's Club",
    client: "⁠Sam's Hot Sale 2026 — Mi Gran Jugada",
    videoTitle: "Mi Gran Jugada Hot Sale 2026",
    year: "2026",
    img: A("/assets/proyects/hotsale.png"),
    logo: A("/assets/proyects/logos/Logo_Sams.png"),
    video: [A("/assets/proyects/videos/sams/Desktop/16X9_Preventa_Sams.mp4"),A("/assets/proyects/videos/sams/Desktop/16X9_Livestream_Sams.mp4"),A("/assets/proyects/videos/sams/Desktop/16X9_Warmup_Sams.mp4"),A("/assets/proyects/videos/sams/SamsBotanas.mp4")],
    videoMobil : [A("/assets/proyects/videos/sams/Mobil/9X16_Preventa_Sams.mp4"),A("/assets/proyects/videos/sams/Mobil/9X16_Livestream_Sams.mp4"),A("/assets/proyects/videos/sams/Mobil/9X16_Warmup_Sams.mp4"),A("/assets/proyects/videos/sams/SamsBotanas.mp4")],
    videoFill: [true, true, true, true],
    deskCover: [A("/assets/proyects/videos/thumbnailDesktop/sams/sams-1.jpg"), A("/assets/proyects/videos/thumbnailDesktop/sams/sams-2.jpg"), A("/assets/proyects/videos/thumbnailDesktop/sams/sams-3.jpg"), A("/assets/proyects/videos/thumbnailDesktop/sams/sams-4.jpg")],

    cover: [A("/assets/proyects/videos/thumbnail/sams/sams-4.jpg"), A("/assets/proyects/videos/thumbnail/sams/sams-1.jpg"), A("/assets/proyects/videos/thumbnail/sams/sams-3.jpg"), A("/assets/proyects/videos/thumbnail/sams/sams-2.jpg")],
    
    bg: "#3979FB",
    fg: "#ffffff",
    accent: "#820cea",
    chip: "#191919",
    chipFg: "#00bf63",
    tag: "Sams Club",
    services: ["Campaign Creativity & Storytelling", "Talent Casting, Contracting & Direction", "Full-Service Production & Post-Production", "AI-Powered Content Production", "Livestream Creative, Production & Execution", "Original Jingle Concept, Composition & Production"],
    keywords: ["Retail", "Celebrity Endorsement", "Branded Entertainment", "Hot Sale Seasonality", "Omnichannel"],
    desc: (
      <>
        For Sam’s Club Hot Sale 2026 seasonality, we developed an integrated branded entertainment campaign featuring top Mexican talent: digital comedian and creator <a href="https://www.instagram.com/pacodemiguel/?hl=es-la" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 700 }}>Paco de Miguel</a>, iconic soccer broadcaster <a href="https://www.instagram.com/cmartinolimx/?hl=es-la" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 700 }}>Christian Martinoli</a>, and former football star and commentator <a href="https://www.instagram.com/garciaposti/?hl=es-la" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 700 }}>Luis García</a>. Blending storytelling, humor, soccer, and membership benefits, the omnichannel experience culminated in the first Scan & Go Cup: a live activation transformed into content, competition, and meaningful audience engagement.
      </>
    ),
  },
  {
    id: "depend",
    name: "Femenine Depend",
    client: "Femenine Depend — Celebra Una Vida Plena",
    videoTitle: "Celebra Una Vida Plena",
    year: "2025-2026",
    img: A("/assets/proyects/depend-podcast.png"),
    logo: A("/assets/proyects/logos/Logo_Depend.png"),
    
    video: [A("/assets/proyects/videos/femenine/desktop/16X9_Femenine_TVC.mp4"), A("/assets/proyects/videos/femenine/desktop/16X9_Femenine_Image.jpg"), A("/assets/proyects/videos/femenine/Femenine_Eva1.mp4"), A("/assets/proyects/videos/femenine/Femenine_Eva2.mp4"), A("/assets/proyects/videos/femenine/desktop/16X9_Femenine_Stand.mp4")],
    videoMobil: [A("/assets/proyects/videos/femenine/mobile/9X16_Femenine_TVC.mp4"), A("/assets/proyects/videos/femenine/mobile/19X6_Femenine_Image.jpg"), A("/assets/proyects/videos/femenine/Femenine_Eva1.mp4"), A("/assets/proyects/videos/femenine/Femenine_Eva2.mp4"), A("/assets/proyects/videos/femenine/mobile/9X16_Femenine_Stand.mp4")],
    videoFill: [true, true, true, true, true, true],
    deskCover: [A("/assets/proyects/videos/thumbnailDesktop/depend/depend-1.jpg"), "", A("/assets/proyects/videos/thumbnailDesktop/depend/depend-2.jpg"), A("/assets/proyects/videos/thumbnailDesktop/depend/depend-3.jpg"), A("/assets/proyects/videos/thumbnailDesktop/depend/depend-4.jpg")],

    cover: [A("/assets/proyects/videos/thumbnail/depend/depend-1.jpg"), "", A("/assets/proyects/videos/thumbnail/depend/depend-2.jpg"), A("/assets/proyects/videos/thumbnail/depend/depend-3.jpg"), A("/assets/proyects/videos/thumbnail/depend/depend-4.jpg")],
    bg: "#CB6CE6",
    fg: "#ffffff",
    accent: "#820cea",
    chip: "#191919",
    chipFg: "#faff22",
    tag: "",
    services: ["Consumer Insights & Campaign Strategy", "Creative Concept, Messaging & Integrated Campaign Development", "Campaign Visual Identity & Design System", "Celebrity Contracting, Management & Direction", "Full-Service Production & Post-Production", "Video Podcast Development & Production", "Experiential Marketing & BTL Activation"],
    keywords: ["360 Campaign", "Branding", "Celebrity Endorsement", "Cultural Conversations", "Women Empowerment"],
    desc: (
      <>
        For Femenine Depend, we developed a 360° campaign designed to reframe the conversation around incontinence. We built a partnership with two Mexican prominent public figures, <a href="https://www.instagram.com/luzelenaglezz/?hl=es-la" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 700 }}>Luz Elena González</a> and <a href="https://www.instagram.com/paolarojas/?hl=es-la" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 700 }}>Paola Rojas</a> as brand ambassadors, strategically leveraging their credibility and cultural relevance across a TV ad, a six-episode video podcast, OOH, BTL activation, digital content and brand assets to launch a new product line, reduce stigma, and build trust with women.
      </>
    ),
  },
  {
    id: "costa",
    name: "Costa Coffee",
    client: "⁠Costa Coffee — Digitechon 2025 AR Takeover",
    videoTitle: "Digitechon 2025 Augmented Reality Takeover",
    year: "2025",
    img: A("/assets/proyects/costa.png"),
    logo: A("/assets/proyects/logos/Logo_CostaC.png"),
    video: [A("/assets/proyects/videos/COSTA.mp4")],
    videoMobil: [A("/assets/proyects/videos/COSTA.mp4")],
    videoFill: [true],
    deskCover: [A("/assets/proyects/videos/thumbnailDesktop/others/costa-Cover.jpg")],
    cover: [A("/assets/proyects/videos/thumbnail/others/costa-Cover.jpg")],
    bg: "#F38CE5",
    fg: "#ffffff",
    accent: "#820cea",
    chip: "#191919",
    chipFg: "#ffffff",
    tag: "",
    services: ["Creative Concept & Experience Strategy", "Immersive Experience Design", "Augmented Reality Design & Development", "UX/UI Design", "End-to-End Technology Development", "On-Site Activation & Technical Execution"],
    keywords: ["Augmented Reality", "Brand Activation", "Creative Technology", "Immersive Experience", "Digital Transformation"],
    desc: "For Costa Coffee, we transformed a traditional event into an immersive augmented reality experience. Instead of relying on screens, we created a digital AR takeover of the entire venue, inviting guests to unlock and explore the brand universe through a QR code. The activation achieved a 99% scan rate, turning brand presence into memorable interaction.",
  },

  {
    id: "axe",
    name: "AXE",
    client: "Axess — App",
    videoTitle: "Axess App",
    year: "2024",
    img: A("/assets/proyects/axe.png"),
    logo: A("/assets/proyects/logos/Logo_AxessbyAxe.png"),
    
    video: [A("/assets/proyects/videos/AXESS.mp4")],
    videoMobil: [A("/assets/proyects/videos/AXESS.mp4")],
    videoFill: [true],
    deskCover: [A("/assets/proyects/videos/thumbnailDesktop/others/axe-Cover.jpg")],
    cover: [A("/assets/proyects/videos/thumbnail/others/axe-Cover.jpg")],
    bg: "#F95C4B",
    fg: "#ffffff",
    accent: "#820cea",
    chip: "#191919",
    chipFg: "#1E1E1E",
    tag: "",
    services: ["Creative Technology Strategy & Concept", "Gamified Experience, UX/UI & Product Design", "End-to-End App Development & Systems Integration", "Platform Deployment, Management & Optimization", "Rewards, Referral & Engagement Mechanics"],
    keywords: ["Advergaming", "Music Festivals", "Metaverse", "Brand Loyalty", "Gen Z"],
    desc: "For AXE, we created the AXESS app, the first brand metaverse in Latin America: a gamified digital ecosystem designed to turn engagement into real access to music and culture. Through avatar customization, mini-games, virtual goods, referral mechanics, and rewards, users unlocked concert tickets, VIP experiences, Meet & Greets, and access to AXE-sponsored events",
  },
];

// Merch collage — fashion editorial (text always present per card)
export const CNP_MERCH = [
  {
    id: "cap",
    img: A("/assets/merch/merch1.png"),
    name: "Nerdy Cap + Bandana",
    price: "$38",
    drop: "OJAI SERIES",
    color: "#2892fb",
  },
  {
    id: "tee",
    name: "Low Ego Tee",
    price: "$45",
    drop: "THE CODE",
    color: "#e2ff0d",
    typeOnly: true,
    sub: "Heavyweight cotton. One statement.",
  },
  {
    id: "tote",
    name: "Curaduría Tote",
    price: "$28",
    drop: "THE FILTER",
    color: "#d142a4",
    typeOnly: true,
    sub: "Carry less. Choose better.",
  },
  {
    id: "stk",
    name: "Cursor Sticker Pack",
    price: "$12",
    drop: "LA SEÑAL",
    color: "#5944ff",
    typeOnly: true,
    sub: "Not decoration. A signal.",
  },
  {
    id: "hoodie",
    name: "Signal Hoodie",
    price: "$72",
    drop: "THE DROP",
    color: "#f95c4b",
    typeOnly: true,
    sub: "Tech as tool. Worn warm.",
  },
];

export const CNP_SOCIAL = [
  {
    id: "linkedin",
    label: "CNP on LinkedIn",
    href: "https://www.linkedin.com/",
  },
    {
    id: "spacer",
    label: "",
    href: "",
  },
  {
    id: "instagram",
    label: "CNP on Instagram",
    href: "https://www.instagram.com/",
  },

];
