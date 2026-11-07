/**
 * Central company content.
 * ---------------------------------------------------------------
 * Everything the business may need to update lives here.
 * Items marked `verified: false` are PLACEHOLDERS and are rendered
 * with a visible "sample / to be confirmed" label on the site.
 * Replace them with verified company records before launch.
 */

export const site = {
  name: "Blanca Investment Limited",
  shortName: "Blanca Investment",
  /** Trading name used on the web domain; included so searches for it find the site. */
  groupName: "Blanca Investment Group",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.blancainvestmentgroup.com").replace(/\/$/, ""),
  tagline: "Building a Sustainable Future for Nigeria",
  description:
    "Blanca Investment Limited is an Abuja-based Nigerian company delivering renewable energy, real estate and property management, building construction, office supplies and procurement, and automation and ICT services.",
  footerBlurb:
    "Nigeria's trusted partner in renewable energy, real estate, construction, procurement, and automation and ICT solutions.",
  address: {
    street: "21 SS Lassa Crescent",
    district: "Jahi",
    city: "Abuja",
    region: "Federal Capital Territory",
    country: "Nigeria",
    countryCode: "NG",
    full: "21 SS Lassa Crescent, Jahi, Abuja",
  },
  phone: { display: "0911 444 2122", href: "tel:+2349114442122", e164: "+2349114442122" },
  email: "info@blancainvestmentltd.co",
  whatsapp: {
    number: "2349114442122",
    display: "+234 911 444 2122",
    defaultMessage: "Hello Blanca Investment Limited, I would like to make an enquiry.",
  },
  hours: { display: "Monday to Friday, 8:00 a.m. to 6:00 p.m.", short: "Mon–Fri, 8am–6pm" },
} as const;

export const whatsappLink = (message: string = site.whatsapp.defaultMessage) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/property-management", label: "Property Management" },
  { href: "/renewable-energy", label: "Renewable Energy" },
  { href: "/contact", label: "Contact Us" },
] as const;

/** Photography. Local files are in /public/images; remote files are free Unsplash-licence images. */
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1800`;
export const img = {
  solarAerial: "/images/solar-farm-aerial.jpg",
  solarTrackers: "/images/solar-trackers.jpg",
  estate: "/images/residential-estate.jpg",
  construction: "/images/commercial-construction.jpg",
  solarRoof: u("photo-1635424709961-f3a150459ad4"),
  cctv: u("photo-1723641989517-7ef7f23a824a"),
  network: u("photo-1558494949-ef010cbdcc31"),
  serverAisle: u("photo-1584169417032-d34e8d805e8b"),
  meetingRoom: u("photo-1717414477663-a5f5384499b0"),
  boardMeeting: u("photo-1541746972996-4e0b0f43e02a"),
  officeSupplies: u("photo-1654931800100-2ecf6eee7c64"),
  smartLock: u("photo-1558002038-1055907df827"),
  cctvPair: u("photo-1563920443079-783e5c786b83"),
  officeInterior: "/images/office-workstations.jpg",
  installationTeam: "/images/solar-installation-team.jpg",
  inverterInstall: "/images/inverter-battery-installation.jpg",
  warehouse: u("photo-1715026323215-a2dbb71272f6"),
  towerCrane: u("photo-1720723317092-a0fe23f6c4bd"),
  abujaStreet: u("photo-1722442746061-054e1cb47540"),
  interiorA: u("photo-1522708323590-d24dbb6b0267"),
  interiorB: u("photo-1560448204-e02f11c3d0e2"),
  interiorC: u("photo-1502672260266-1c1ef2d93688"),
  interiorD: u("photo-1583847268964-b28dc8f51f92"),
} as const;

export type ServiceSlug = "renewable-energy" | "real-estate" | "construction" | "office-supplies" | "automation-ict";

export const services: {
  slug: ServiceSlug;
  index: string;
  title: string;
  short: string;
  summary: string;
  description: string;
  points: string[];
  image: string;
  imageAlt: string;
  /** Optional second photo, shown stacked with the first. */
  image2?: string;
  image2Alt?: string;
  href: string;
}[] = [
  {
    slug: "renewable-energy",
    index: "01",
    title: "Renewable Energy",
    short: "Solar, storage and hybrid power",
    summary: "Solar panels, inverters, battery storage and hybrid systems designed around how you actually use power.",
    description:
      "We design and install solar power systems for homes, businesses and institutions, from a single rooftop array to off-grid and hybrid installations, beginning with an honest assessment of your energy use.",
    points: ["Solar panel systems", "Inverters and battery storage", "Off-grid and hybrid systems", "Energy audits"],
    image: "/images/solar-trackers.jpg",
    imageAlt: "Rows of solar photovoltaic panels mounted on tracking frames in a grassy solar field",
    href: "/renewable-energy",
  },
  {
    slug: "real-estate",
    index: "02",
    title: "Real Estate & Property",
    short: "Development, sales and management",
    summary: "Property development, sales and leasing, facility and tenant management, and valuation.",
    description:
      "From development and sales to the day-to-day running of a building, we help owners, tenants and investors make the most of residential and commercial property.",
    points: ["Property development and sales", "Facility management", "Tenant management", "Property valuation"],
    image: "/images/blanca-property-house.jpg",
    imageAlt: "Modern two-storey white house with timber accents, glass balconies and a lawn at sunset",
    href: "/property-management",
  },
  {
    slug: "construction",
    index: "03",
    title: "Building Construction",
    short: "Residential, commercial, industrial",
    summary: "Residential, commercial and industrial construction, renovation and project management.",
    description:
      "We plan, manage and deliver building works with clear scopes, sensible programmes and close supervision on site, whether new-build, extension or renovation.",
    points: ["Residential construction", "Commercial and industrial buildings", "Renovations and refurbishment", "Project management"],
    image: "/images/building-construction-cranes.jpg",
    imageAlt: "Multi-storey residential blocks under construction with tower cranes against a blue sky",
    href: "/services#construction",
  },
  {
    slug: "office-supplies",
    index: "04",
    title: "Office Supplies & Procurement",
    short: "Furniture, IT equipment, bulk supply",
    summary: "Office furniture, IT equipment, stationery and bulk procurement for organizations of every size.",
    description:
      "One reliable point of supply for the things an organization runs on: sourced to specification, delivered on schedule and documented for your procurement records.",
    points: ["Office furniture", "Information technology equipment", "Stationery and consumables", "Bulk procurement"],
    image: img.officeInterior,
    imageAlt: "Modern open-plan office with workstations, desktop computers, ergonomic chairs and pendant lighting",
    href: "/services#office-supplies",
  },
  {
    slug: "automation-ict",
    index: "05",
    title: "Automation & ICT",
    short: "Security, networks, smart access",
    summary: "Smart locks, CCTV, remote monitoring, wired and wireless networking, maintenance and support.",
    description:
      "We secure and connect buildings: CCTV and remote monitoring, smart access control, and structured wired and wireless networks, with maintenance and technical support after handover.",
    points: ["Smart locks and access control", "CCTV installation and remote monitoring", "Wired and wireless networking", "Maintenance and technical support"],
    image: img.smartLock,
    imageAlt: "Smartphone app being used to operate a smart door lock",
    image2: img.cctvPair,
    image2Alt: "Two CCTV security cameras mounted on a wall",
    href: "/services#automation-ict",
  },
];

export const additionalServices = [
  { title: "Maintenance & Support", text: "Planned and responsive maintenance for the systems and buildings we deliver." },
  { title: "Quality Assurance", text: "Specification checks, inspections and documentation at each stage of work." },
  { title: "Consulting", text: "Feasibility, budgeting and technical advice before you commit to a project." },
  { title: "Logistics", text: "Coordinated sourcing, transport and delivery of materials and equipment." },
];

/** Company statistics (confirmed by Blanca Investment Limited). */
export const stats: { value: string; label: string; verified: boolean }[] = [
  { value: "348", label: "Projects delivered", verified: true },
  { value: "4", label: "Years of experience", verified: true },
  { value: "207", label: "Clients served", verified: true },
  { value: "05", label: "Core business sectors", verified: true },
];

/* ───────────── Organization (supplied by Blanca Investment Limited) ───────────── */

export const leadership = {
  board: { title: "Board of Directors", names: ["Muhammad Hassan Bello", "Maigona Nasiru Umar"], text: "Overall governance and strategic direction" },
  executives: [
    { name: "Muhammad Hassan Bello", role: "Managing Director / CEO" },
    { name: "Khalifa Hassan", role: "General Manager Operations" },
    { name: "Baffa Hassan Bello", role: "Assistant General Manager Operations" },
  ],
};

export type OrgMember = { name: string; role: string; text?: string };
export type OrgDivision = { title: string; head: string; members: OrgMember[] };

export const divisions: OrgDivision[] = [
  {
    title: "Operations & Logistics",
    head: "Head of Operations",
    members: [
      { name: "Owiri Glory", role: "Logistics & Procurement" },
      { name: "Umar Lawan", role: "Storekeeper / Logistics" },
      { name: "Owiri Glory", role: "Inventory Management & Procurement" },
    ],
  },
  {
    title: "Technical & Projects",
    head: "Head of Projects",
    members: [
      { name: "Mustapha Ayuba", role: "Project Supervisor" },
      { name: "Rayyan", role: "Site Foreman" },
      { name: "Umar Paki", role: "Standby Electrician" },
      { name: "Ado Pali", role: "Standby Electrician" },
      { name: "Nuhu Agyo", role: "Corps Member / Electrician" },
      { name: "Hafiz Kabir", role: "Corps Member / Architect" },
      { name: "Nasiru Shuaibu", role: "Research & Development" },
    ],
  },
  {
    title: "Sales & Marketing",
    head: "Head of Sales & Marketing",
    members: [
      { name: "Janet Zubairu", role: "Marketing" },
      { name: "Abdulrasheed Abubakar", role: "Media & Content Creator" },
    ],
  },
  {
    title: "Finance & Administration",
    head: "Head of Finance & Administration",
    members: [
      { name: "Glory Owiri & Hassan Rajiola", role: "Accounts / Finance / Bills" },
      { name: "Tope Wosila Comfort", role: "Administration / HR" },
      { name: "Tope Wosila Comfort", role: "Salary / Vouchers" },
    ],
  },
  {
    title: "Quality, Safety & Compliance",
    head: "Head of Quality & Compliance",
    members: [{ name: "Site Supervisors", role: "Safety & Compliance (collectively)" }],
  },
  {
    title: "Corporate Planning & Coordination",
    head: "Head of Corporate Planning",
    members: [{ name: "To be assigned", role: "Schedule Officer" }],
  },
  {
    title: "Graphics & ICT Support",
    head: "Head of Graphics & ICT",
    members: [{ name: "Oyelude Abiodun", role: "Graphics & ICT" }],
  },
];

/* ───────────── Projects (supplied by Blanca Investment Limited) ───────────── */

export type ProjectStatus = "ongoing" | "proposed";
export const projectStatusLabel: Record<ProjectStatus, string> = { ongoing: "Ongoing", proposed: "Proposed" };

export type ProjectImage = { src: string; alt: string; caption: string };
export type PriceRow = { floor: string; outright: string; sixMonths: string; twelveMonths: string };

export type Project = {
  slug: string;
  name: string;
  shortName: string;
  status: ProjectStatus;
  badge?: string;
  location: string;
  type: string;
  summary: string;
  description: string[];
  facts: [string, string][];
  features: string[];
  gallery: ProjectImage[];
  floorPlan?: ProjectImage;
  brochure?: { href: string; label: string; size: string };
  pricing?: { note: string; rows: PriceRow[] };
};

export const projects: Project[] = [
  {
    slug: "apo-three-bedroom-flats",
    name: "Three Bedroom Flats with BQ, Apo",
    shortName: "Apo 3-Bedroom Flats",
    status: "ongoing",
    badge: "Now selling",
    location: "Apo, near Cedarcrest Hospital, Abuja",
    type: "Residential apartments",
    summary: "FCDA-approved block of three-bedroom apartments, each with a boys' quarters (BQ), now selling off-plan.",
    description: [
      "A contemporary three-storey block of three-bedroom apartments in Apo, close to Cedarcrest Hospital. Every apartment comes with a boys' quarters and is laid out for everyday family living, with a generous main lounge, separate dining area and a private balcony.",
      "The development is FCDA approved and construction is ongoing, with completion expected in December 2027. Units on the ground, first and second floors can be bought outright or on a 6-month or 12-month payment plan.",
    ],
    facts: [
      ["Status", "Ongoing, now selling"],
      ["Expected completion", "December 2027"],
      ["Location", "Apo, near Cedarcrest Hospital, FCT Abuja"],
      ["Unit type", "3-bedroom apartment with BQ"],
      ["Floors", "Ground, first and second floor"],
      ["Typical floor plan", "480.20 m², two apartments per floor"],
      ["Approval", "FCDA approved"],
    ],
    features: [
      "Master bedroom with en-suite bath and dressing area",
      "Two further bedrooms, each with an en-suite bath",
      "Boys' quarters (BQ) with its own bathroom",
      "Spacious main lounge with foyer and visitors' toilet",
      "Separate dining area and fitted kitchen with store",
      "Private balcony and box room",
      "On-site parking and landscaped grounds",
    ],
    gallery: [
      { src: "/images/projects/apo-flats-render.jpg", alt: "Three-storey white apartment block with timber-clad panels, balconies and parked cars, with an aerial inset view", caption: "Front elevation and aerial view" },
    ],
    floorPlan: { src: "/images/projects/apo-flats-floor-plan.jpg", alt: "Typical floor plan showing two mirrored three-bedroom apartments with BQ, lounges, kitchens, dining areas and balconies", caption: "Typical floor plan, 480.20 m² (proposed development)" },
    pricing: {
      note: "Prices in Naira, as published by Blanca Investment Limited. Contact us to confirm current prices and availability.",
      rows: [
        { floor: "Ground floor", outright: "₦100,000,000", sixMonths: "₦110,000,000", twelveMonths: "₦120,000,000" },
        { floor: "First floor", outright: "₦95,000,000", sixMonths: "₦105,000,000", twelveMonths: "₦115,000,000" },
        { floor: "Second floor", outright: "₦90,000,000", sixMonths: "₦100,000,000", twelveMonths: "₦110,000,000" },
      ],
    },
  },
  {
    slug: "residential-estate-apo",
    name: "Residential Estate, Apo",
    shortName: "Residential Estate, Apo",
    status: "ongoing",
    badge: "Now selling",
    location: "Plot 60, Cadastral Zone D03, Apo, Abuja",
    type: "Gated residential estate",
    summary: "A gated community of apartment blocks and terraced homes along landscaped, palm-lined streets, now under construction and selling.",
    brochure: { href: "/downloads/Blanca-Residential-Estate-Brochure.pdf", label: "Download estate brochure", size: "PDF, 29 MB" },
    description: [
      "A gated residential estate in Apo, Abuja, being developed with our partner Besab Homes Limited. It brings together three-storey apartment blocks and terraced homes, arranged along wide, landscaped streets lined with palms.",
      "Construction is ongoing and homes are now selling. The estate is planned around a secure gatehouse entrance, off-street parking and generous green space, with a modern palette of white render, textured stone and dark brick.",
    ],
    facts: [
      ["Status", "Ongoing, now selling"],
      ["Location", "Apo, Abuja, FCT"],
      ["Plot", "Plot 60, Cadastral Zone D03"],
      ["Partner", "Besab Homes Limited"],
      ["Type", "Gated residential estate"],
      ["Homes", "Apartment blocks and terraced houses"],
    ],
    features: [
      "Secure gated entrance with gatehouse",
      "Three-storey apartment blocks with balconies",
      "Terraced homes with private frontages",
      "Palm-lined, landscaped estate roads",
      "Off-street parking throughout",
    ],
    gallery: [
      { src: "/images/projects/estate-blocks.jpg", alt: "Three-storey apartment blocks in white render and grey brick along an estate road", caption: "Apartment blocks" },
      { src: "/images/projects/estate-construction-progress-1.jpg", alt: "Aerial view of two-storey blocks under construction with bamboo scaffolding and workers on site", caption: "Construction progress on site" },
      { src: "/images/projects/estate-construction-progress-2.jpg", alt: "Three-storey apartment block under construction with bamboo scaffolding and rendered walls", caption: "Apartment block under construction" },
      { src: "/images/projects/estate-street.jpg", alt: "Palm-lined estate road with modern white terraced homes and parked cars on both sides", caption: "Site layout, estate road" },
      { src: "/images/projects/estate-gate.jpg", alt: "Gated estate entrance with a central gatehouse, timber-slat gates and pergola canopies", caption: "Estate entrance and gatehouse" },
      { src: "/images/projects/estate-block-parking.jpg", alt: "Apartment block in beige render and blue-grey brick with cars parked in front", caption: "Apartment block and parking" },
      { src: "/images/projects/estate-terraces.jpg", alt: "Row of two-storey terraced homes with timber canopies and a white SUV parked in front", caption: "Terraced homes" },
    ],
  },
];

/* ───────────── Products ───────────── */

export type ProductGroup = { id: string; title: string; text: string; service: string; items: { name: string; text: string; icon: string }[] };

export const productGroups: ProductGroup[] = [
  {
    id: "solar-power",
    title: "Solar & power",
    text: "Everything for a dependable solar or backup power system, from panels to storage.",
    service: "renewable-energy",
    items: [
      { name: "Solar panels", text: "Monocrystalline modules for rooftop and ground-mounted arrays.", icon: "SolarPanel" },
      { name: "Inverters", text: "Pure sine wave inverters for homes and offices.", icon: "Zap" },
      { name: "Hybrid inverters", text: "Solar, grid and battery in one unit.", icon: "Combine" },
      { name: "Lithium batteries", text: "Long-life wall and floor-standing storage.", icon: "BatteryFull" },
      { name: "Tubular batteries", text: "Deep-cycle batteries for backup systems.", icon: "BatteryMedium" },
      { name: "Gel batteries (dry cell)", text: "Maintenance-free sealed batteries.", icon: "BatteryCharging" },
      { name: "Charge controllers", text: "MPPT and PWM controllers to protect your batteries.", icon: "Gauge" },
      { name: "Solar home systems (SHS)", text: "Compact kits for lighting, phone charging and small appliances.", icon: "HousePlug" },
      { name: "Solar street lights", text: "Standalone lighting for roads, estates and compounds.", icon: "LampWallUp" },
    ],
  },
  {
    id: "security-access",
    title: "Security & access",
    text: "Protect people, property and assets with monitored, controlled access.",
    service: "automation-ict",
    items: [
      { name: "CCTV systems", text: "IP and analogue cameras with recording and remote viewing.", icon: "Cctv" },
      { name: "Access controls", text: "Smart locks, keypads, fingerprint and card access.", icon: "Fingerprint" },
    ],
  },
  {
    id: "technology",
    title: "Technology & smart living",
    text: "Equipment that keeps businesses running and homes comfortable.",
    service: "office-supplies",
    items: [
      { name: "POS systems", text: "Point-of-sale terminals, printers and scanners for retail.", icon: "ScanBarcode" },
      { name: "Desktops, laptops & servers", text: "Computers and server hardware for every workload.", icon: "Server" },
      { name: "Drones", text: "Camera drones for surveying, inspection and media.", icon: "Drone" },
      { name: "Smart home appliances", text: "Energy-efficient appliances for modern homes.", icon: "Refrigerator" },
    ],
  },
];

/* ───────────── Partners ───────────── */

export const partners = [
  { name: "Besab Homes Limited", logo: "/brand/partner-besab-homes.png", width: 409, height: 166 },
];

/* ───────────── Downloads (supplied by Blanca Investment Limited, unaltered) ───────────── */

export const downloads = [
  {
    title: "Projects Catalogue",
    text: "Solar and inverter installations we have delivered, with the technical specification of each system.",
    href: "/downloads/Blanca-Projects-Catalogue.pdf",
    meta: "PDF, 18 pages, 1.8 MB",
  },
  {
    title: "Residential Estate Brochure",
    text: "Renders, site layout and floor plans for the apartments and terraced homes at our residential estate in Apo, Abuja.",
    href: "/downloads/Blanca-Residential-Estate-Brochure.pdf",
    meta: "PDF, 36 pages, 29 MB",
  },
];
