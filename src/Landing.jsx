import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValueEvent,
} from "framer-motion";
import {
  Building2,
  HardHat,
  Compass,
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  CheckCircle2,
  X,
  ZoomIn,
  ChevronLeft,
  FileCheck,
  ShieldCheck,
  Truck,
  ArrowUpRight,
  Users,
  Layers,
  Sparkles,
  Image as ImageIcon,
  Send,
  Clock,
  Menu,
  Check,
  Factory,
  Landmark,
  Droplet,
  BookOpen,
  Download,
  FileText,
  Lightbulb,
  MousePointer2,
  Gauge,
  Wrench,
  Activity,
  LayoutGrid,
  MoveHorizontal,
} from "lucide-react";

import Logo from "./assets/logo.jpeg";

// ============================================================================
// EXPANDED DATA SETS
// ============================================================================
const INITIAL_GALLERY_ITEMS = [
  {
    id: "proj-1",
    title: "New Palais de Justice of Lubumbashi (R+2)",
    category: "Buildings",
    location: "Lubumbashi, Haut-Katanga, DRC",
    year: "2025",
    budget: "$2,686,856 USD",
    client: "Ministry of Infrastructure & Public Works / ARMP",
    badge: "Inaugurated Presidential Project",
    metrics: "6,400 m² • 48 Months Warranty",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb18086f6?auto=format&fit=crop&w=1200&q=85",
    description:
      "Flagship R+2 institutional complex built by Africa Infrastructures Développement SARL. Features modern courtrooms, magistrate chambers, reinforced concrete seismic structure, and solar-assisted backup systems.",
  },
  {
    id: "proj-2",
    title: "Lubumbashi Urban Roadways & Asphalt Modernization",
    category: "Roads & Asphalt",
    location: "Lubumbashi, Haut-Katanga, DRC",
    year: "2025",
    budget: "Multi-Phase Provincial Contract",
    client: "Haut-Katanga Provincial Government",
    badge: "ARMP Certified",
    metrics: "18.5 km • 120mm Hot-Mix Asphalt",
    image:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=85",
    description:
      "Heavy sub-base stabilization, hot-mix asphalt paving, and street lighting installation along strategic urban arteries in Lubumbashi to improve commercial mobility and regional trade.",
  },
  {
    id: "proj-3",
    title: "Reinforced Concrete & High-Rise Structural Works",
    category: "Site Progress",
    location: "Haut-Katanga & Kinshasa, DRC",
    year: "2024 - 2025",
    budget: "$3.4M USD",
    client: "Public & Corporate Clients",
    badge: "ISO 9001 Standards",
    metrics: "C35/45 Concrete • 1,200T Rebar",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
    description:
      "High-precision structural engineering, foundation piling, and steel reinforcement executed by AID SARL engineering teams with strict laboratory testing of concrete strength.",
  },
  {
    id: "proj-4",
    title: "Urban Drainage, Culverts & Hydraulic Sanitation Network",
    category: "Roads & Asphalt",
    location: "Lubumbashi & Likasi Axis, DRC",
    year: "2024",
    budget: "$1.85M USD",
    client: "Office des Voiries et Drainage (OVD)",
    badge: "Attestation ARMP N° 138/2024",
    metrics: "9.2 km Channels • 45m³/s Flow",
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=85",
    description:
      "Construction of reinforced concrete stormwater channels, box culverts, and erosion control systems protecting newly paved urban roads during heavy tropical rainy seasons.",
  },
  {
    id: "proj-5",
    title: "AID Heavy Earthmoving & Asphalt Paving Fleet",
    category: "Equipment",
    location: "Lubumbashi Central Depot",
    year: "2025",
    budget: "Proprietary Fleet",
    client: "AID SARL Internal Logistics",
    badge: "65+ Heavy Machines",
    metrics: "180T/hr Mobile Batching",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=85",
    description:
      "Dedicated fleet of motor graders, asphalt pavers, pneumatic rollers, hydraulic excavators, and mobile batching plants enabling 100% autonomous execution of large-scale works.",
  },
  {
    id: "proj-6",
    title: "Commercial & Administrative Complex Development",
    category: "Buildings",
    location: "Kinshasa / Lubumbashi, DRC",
    year: "2024",
    budget: "$4.10M USD",
    client: "Private & Institutional Partners",
    badge: "Turnkey Delivery",
    metrics: "R+5 Curtain Wall • Smart HVAC",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    description:
      "Architectural design and turnkey construction of contemporary glass-and-concrete administrative complexes engineered for energy efficiency and durability.",
  },
  {
    id: "proj-7",
    title: "Mining Corridor Access Roads & Industrial Civil Works",
    category: "Roads & Asphalt",
    location: "Kolwezi - Lubumbashi Corridor",
    year: "2024",
    budget: "$2.95M USD",
    client: "Mining & Industrial Operators",
    badge: "Heavy Load Engineering",
    metrics: "60-Ton Axle Load Capacity",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85",
    description:
      "High-axle-load haul roads, industrial concrete pads, and bridge reinforcements supporting copper and cobalt logistics corridors in the Copperbelt region.",
  },
  {
    id: "proj-8",
    title: "Field Engineering, Topographical Survey & Geotechnical Lab",
    category: "Site Progress",
    location: "Haut-Katanga, DRC",
    year: "2025",
    budget: "Continuous QA/QC",
    client: "AID Bureau d’Études",
    badge: "Zero-Defect Policy",
    metrics: "±2mm RTK GNSS Precision",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    description:
      "Our on-site civil engineers and surveyors utilizing total stations, drone mapping, and soil compaction testing to guarantee international engineering compliance.",
  },
  {
    id: "proj-9",
    title: "Lualaba River Reinforced Concrete Bridge Crossing",
    category: "Bridges & Civil",
    location: "Kasumbalesa - Mokambo Axis, DRC",
    year: "2025",
    budget: "$3.75M USD",
    client: "FONER / Ministry of Public Works",
    badge: "Post-Tensioned Girder",
    metrics: "85m Span • Deep Pile Abutments",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=85",
    description:
      "Multi-span reinforced concrete box-girder bridge engineered to withstand seasonal river surges and heavy cross-border mineral freight trucks.",
  },
  {
    id: "proj-10",
    title: "Provincial Hospital & Diagnostic Center Annex (R+3)",
    category: "Buildings",
    location: "Lubumbashi, Haut-Katanga, DRC",
    year: "2025",
    budget: "$2.40M USD",
    client: "Ministry of Public Health",
    badge: "Medical Grade MEP",
    metrics: "140 Beds • Cleanroom HVAC",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85",
    description:
      "Turnkey hospital wing featuring lead-lined radiology suites, medical gas piping, antimicrobial flooring, and redundant backup power.",
  },
  {
    id: "proj-11",
    title: "Kasumbalesa Border Freight Logistics Terminal Pad",
    category: "Bridges & Civil",
    location: "Kasumbalesa, Haut-Katanga, DRC",
    year: "2024",
    budget: "$2.15M USD",
    client: "DGDA & Logistics Operators",
    badge: "Fiber-Reinforced Concrete",
    metrics: "42,000 m² Heavy Apron",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    description:
      "High-load industrial parking apron, customs weighbridge foundations, and perimeter high-mast floodlighting for 500+ daily freight trucks.",
  },
  {
    id: "proj-12",
    title: "Automated Hot-Mix Asphalt & Crushing Plant",
    category: "Equipment",
    location: "Likasi Road Quarry Site, DRC",
    year: "2025",
    budget: "Industrial Asset",
    client: "AID SARL Production Unit",
    badge: "160 Tons / Hour Output",
    metrics: "0-31.5mm Aggregate Crushing",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=85",
    description:
      "Dedicated aggregate crushing line and computerized bitumen batching plant ensuring uninterrupted supply of certified hot-mix asphalt.",
  },
];

const SITE_SIMULATION_PHASES = [
  {
    step: "01",
    code: "GEO-RTK // 01",
    title: "Topographical Drone Survey & Geotechnical Core Drilling",
    metric: "CBR Soil Bearing > 35%",
    depth: "-18.0m Borehole Stratum",
    load: "450 kN/m² Bedrock",
    layerLabel: "L1 • BEDROCK & GEOTECHNICAL GRID",
    accent: "#10b981",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    specs: [
      "±2mm RTK GNSS Rover Array",
      "Rotary Core Diamond Drilling",
      "Triaxial Shear & Plasticity Index",
    ],
    desc: "RTK GPS rover arrays and rotary core rigs map sub-surface rock strata, water tables, and soil compaction baselines prior to bulk excavation.",
  },
  {
    step: "02",
    code: "FND-RAFT // 02",
    title: "Deep Foundation Piling & Seismic Raft Pouring",
    metric: "C40/50 Sulfate-Resistant",
    depth: "-6.5m Monolithic Raft",
    load: "1,450 m³ Continuous Pour",
    layerLabel: "L2 • DEEP PILES & SEISMIC RAFT",
    accent: "#34d399",
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80",
    specs: [
      "B500B High-Tensile Rebar Cages",
      "Ø800mm Secant Bored Piles",
      "Hydro-Insulated Foundation Slab",
    ],
    desc: "High-tensile B500B steel reinforcement cages lowered into bored piles and locked into a monolithic reinforced concrete seismic foundation raft.",
  },
  {
    step: "03",
    code: "STR-CORE // 03",
    title: "R+2 Structural Frame, Columns & Post-Tensioned Slabs",
    metric: "Zero-Defect Ultrasonic QC",
    depth: "+14.2m Superstructure",
    load: "1,200 Tons Structural Steel",
    layerLabel: "L3 • R+2 POST-TENSIONED CORE",
    accent: "#f59e0b",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    specs: [
      "Slip-Form Seismic Shear Walls",
      "Post-Tensioned Multi-Span Slabs",
      "28-Day Cube Compression Lab QC",
    ],
    desc: "Vertical slip-form columns and post-tensioned floor slabs rise floor-by-floor with real-time laboratory slump and ultrasonic weld verification.",
  },
  {
    step: "04",
    code: "HWY-ASP // 04",
    title: "Sub-Base Stabilization & 120mm Hot-Mix Asphalt Paving",
    metric: "165°C Bitumen Laydown",
    depth: "98.5% Marshall Density",
    load: "60-Ton Axle Load Rating",
    layerLabel: "L4 • 120MM POLYMER ASPHALT ARTERY",
    accent: "#C86D2D",
    image:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80",
    specs: [
      "0-31.5mm Crushed Stone Base",
      "Vögele Laser Screed Finisher",
      "Precast Box Culvert Drainage",
    ],
    desc: "Laser-guided Vögele finishers and tandem vibratory rollers lay polymer-modified wearing courses bordered by reinforced hydraulic channels.",
  },
  {
    step: "05",
    code: "MEP-ARMP // 05",
    title: "Smart MEP Commissioning, Solar Array & ARMP Handover",
    metric: "100% ARMP State Quitus",
    depth: "+24.0m Roof Microgrid",
    load: "250 kWp Hybrid Solar",
    layerLabel: "L5 • SOLAR CROWN & ARMP HANDOVER",
    accent: "#38bdf8",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb18086f6?auto=format&fit=crop&w=1200&q=80",
    specs: [
      "Solar-Assisted Backup Microgrid",
      "Acoustic Courtroom & HVAC BMS",
      "ARMP N° 024/2025 Final Quitus",
    ],
    desc: "Full architectural solar glazing, acoustic courtroom paneling, centralised BMS HVAC commissioning, and official presidential inauguration.",
  },
];

const FLEET_SHOWCASE_DATA = [
  {
    id: "flt-1",
    name: "Vögele Super 1800-3i Tracked Paver",
    category: "Asphalt Division",
    capacity: "700 Tons/Hr Laydown",
    count: "4 Units",
    spec: "9.0m Screed Width • Niveltronic Plus Laser Grade",
    image:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "flt-2",
    name: "CAT 336D2 L Hydraulic Excavators",
    category: "Bulk Earthworks",
    capacity: "36-Ton Operating Weight",
    count: "14 Units",
    spec: "2.4m³ Heavy Rock Bucket • Hydraulic Breaker Ready",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "flt-3",
    name: "CAT 140K Motor Graders (Laser-Guided)",
    category: "Sub-Base Precision",
    capacity: "3.7m Moldboard Blade",
    count: "8 Units",
    spec: "±3mm 3D GNSS Cross-Slope Automation",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "flt-4",
    name: "Liebherr 150 EC-B Tower Cranes & Mobile Cranes",
    category: "High-Rise Structural",
    capacity: "8-Ton Tip / 60m Jib",
    count: "5 Units",
    spec: "Frequency Converter Hoist • Anti-Collision Telemetry",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "flt-5",
    name: "Hamm HD+ 120i Tandem & Pneumatic Rollers",
    category: "Compaction Fleet",
    capacity: "12-Ton High-Frequency",
    count: "16 Units",
    spec: "HCM Compaction Meter • Oscillation Drum",
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "flt-6",
    name: "Mobile Concrete Batching & Transit Mixers",
    category: "Concrete Production",
    capacity: "120 m³/Hr Output",
    count: "18 Units",
    spec: "Twin-Shaft Mixer • Automated Moisture Sensors",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=80",
  },
];

const SERVICES_DATA = [
  {
    id: "srv-1",
    icon: Building2,
    title: "Civil Engineering & Institutional Buildings",
    shortDesc:
      "Turnkey design and construction of courthouses, ministries, commercial towers, hospitals, and educational complexes.",
    highlights: [
      "Seismic-resistant reinforced concrete & steel frames",
      "Full MEP (Mechanical, Electrical, Plumbing) & HVAC integration",
      "Architectural finishing & smart building systems",
    ],
    accent: "green",
    metric: "ISO-9001 Structural Code",
  },
  {
    id: "srv-2",
    icon: Compass,
    title: "Urban Roadways, Asphalt Paving & Bridges",
    shortDesc:
      "Modernizing African transportation networks with high-durability hot-mix asphalt roads, highways, and reinforced bridges.",
    highlights: [
      "Sub-grade soil stabilization & crushed stone base layers",
      "Hot-mix asphalt paving & compaction",
      "Reinforced concrete bridges & box culverts",
    ],
    accent: "orange",
    metric: "120mm Polymer Bitumen",
  },
  {
    id: "srv-3",
    icon: Layers,
    title: "Hydraulic Networks & Urban Sanitation",
    shortDesc:
      "Comprehensive stormwater drainage, concrete canals, anti-erosion engineering, and potable water distribution networks.",
    highlights: [
      "Primary & secondary stormwater collector channels",
      "Urban anti-erosion stabilization & retaining walls",
      "Industrial & municipal water supply pipelines",
    ],
    accent: "green",
    metric: "45 m³/s Peak Drainage",
  },
  {
    id: "srv-4",
    icon: FileCheck,
    title: "Public Procurement & Turnkey Megaprojects",
    shortDesc:
      "Fully accredited public works partner operating under strict ARMP compliance, transparency, equity, and probity.",
    highlights: [
      "Multiple official ARMP Quitus & Attestations",
      "Public-Private Partnership (PPP) execution",
      "Strict adherence to contractual timelines & budgets",
    ],
    accent: "orange",
    metric: "100% ARMP Probity",
  },
  {
    id: "srv-5",
    icon: Truck,
    title: "Mining Infrastructure & Industrial Civil Works",
    shortDesc:
      "Tailored heavy civil engineering for Copperbelt mining operators in Haut-Katanga and Lualaba.",
    highlights: [
      "Heavy-duty haul roads & industrial concrete platforms",
      "Warehouse foundations, workshops & security walls",
      "Tailings & earthworks bulk excavation services",
    ],
    accent: "green",
    metric: "60-Ton Axle Load Rated",
  },
  {
    id: "srv-6",
    icon: HardHat,
    title: "Architectural Studies, BIM & Project Management",
    shortDesc:
      "In-house engineering bureau delivering feasibility studies, geotechnical testing, 3D BIM modeling, and site supervision.",
    highlights: [
      "Topographical drone mapping & geotechnical analysis",
      "Structural load calculations & 3D rendering",
      "Full QHSE (Quality, Health, Safety, Environment) supervision",
    ],
    accent: "orange",
    metric: "±2mm RTK GNSS Survey",
  },
];

const EXPANDED_INDUSTRIES_DATA = [
  {
    id: "ind-1",
    title: "Transportation & Highways",
    icon: Truck,
    stat: "180+ km Paved",
    metrics: ["120mm Polymer Asphalt", "60T Axle Load Rating"],
    image:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=85",
    description:
      "Building the arteries of African commerce with durable highways, urban road modernization, and robust reinforced concrete bridges designed for heavy industrial freight.",
  },
  {
    id: "ind-2",
    title: "Civic & Institutional Centers",
    icon: Landmark,
    stat: "R+2 to R+6 Complexes",
    metrics: ["Seismic Raft Foundations", "ISO 9001 Structural"],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb18086f6?auto=format&fit=crop&w=1200&q=85",
    description:
      "Executing landmark public works including courthouses, ministries, and administrative hubs, adhering strictly to national ARMP procurement standards.",
  },
  {
    id: "ind-3",
    title: "Corporate & Commercial Hubs",
    icon: Factory,
    stat: "Turnkey MEP & Glass",
    metrics: ["3D BIM Modeling", "Smart BMS HVAC"],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    description:
      "Turnkey development of corporate towers, retail centers, and high-rise commercial facilities focusing on modern architectural aesthetics and energy efficiency.",
  },
  {
    id: "ind-4",
    title: "Hydraulic & Utility Networks",
    icon: Droplet,
    stat: "Zero-Erosion Channels",
    metrics: ["45m³/s Peak Flow", "Reinforced Box Culverts"],
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=85",
    description:
      "Specialized deep civil engineering for stormwater drainage, massive concrete canals, and aggressive erosion control systems protecting urban areas.",
  },
  {
    id: "ind-5",
    title: "Healthcare & Diagnostics",
    icon: Activity,
    stat: "Cleanroom HVAC Standards",
    metrics: ["Lead-Lined Suites", "Redundant Microgrids"],
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85",
    description:
      "Construction of advanced hospital wings and diagnostic centers featuring critical medical gas piping, antimicrobial finishing, and rigorous biological shielding.",
  },
  {
    id: "ind-6",
    title: "Border Logistics & Freight",
    icon: Building2,
    stat: "High-Load Transit Aprons",
    metrics: ["42,000m² Fiber-Concrete", "Customs Weighbridges"],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    description:
      "Developing massive border freight logistics terminals, customs clearance zones, and heavy truck parking aprons specifically for cross-border mineral transit.",
  },
];

const INSIGHTS_DATA = [
  {
    id: "ins-1",
    date: "October 10, 2026",
    tag: "Company News",
    title: "AID SARL Completes Phase 1 of Lubumbashi Road Modernization",
    excerpt: "Our dedicated teams have laid over 15 kilometers of hot-mix asphalt in the urban center, drastically improving local commercial mobility.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ins-2",
    date: "September 22, 2026",
    tag: "Market Perspective",
    title: "The Future of Sustainable Asphalt & Concrete in the DRC",
    excerpt: "Exploring how localized sourcing and advanced batching technologies are reducing the carbon footprint of heavy civil engineering projects.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ins-3",
    date: "August 15, 2026",
    tag: "Project Milestone",
    title: "Inauguration of the New Palais de Justice",
    excerpt: "A proud moment as the R+2 institutional complex is officially opened, showcasing our commitment to quality, timely delivery, and structural excellence.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb18086f6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ins-4",
    date: "July 04, 2026",
    tag: "Engineering Tech",
    title: "Deploying 3D BIM & RTK Drone Surveying on Mega-Projects",
    excerpt: "How our topographical bureau utilizes sub-millimeter drone mapping to ensure precision engineering before the first excavator hits the dirt.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ins-5",
    date: "June 18, 2026",
    tag: "Public Procurement",
    title: "Maintaining 100% ARMP Probity in State Contracts",
    excerpt: "A deep dive into our zero-defect policy, transparent bidding, and strictly audited material procurement ensuring public funds build lasting legacy.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ins-6",
    date: "May 30, 2026",
    tag: "Company News",
    title: "Expanding the Heavy Machinery Fleet for Lualaba Operations",
    excerpt: "Arrival of 14 new CAT excavators and tandem rollers at our logistics depot to support upcoming cross-border mining corridor highways.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
  },
];

const RESOURCES_DATA = [
  {
    id: "res-1",
    title: "Corporate Profile 2026",
    type: "PDF Document",
    size: "4.2 MB",
    icon: FileText,
  },
  {
    id: "res-2",
    title: "ARMP Compliance & Transparency Policy",
    type: "PDF Document",
    size: "1.8 MB",
    icon: ShieldCheck,
  },
  {
    id: "res-3",
    title: "QHSE Standards & Safety Guide",
    type: "PDF Document",
    size: "3.5 MB",
    icon: BookOpen,
  },
  {
    id: "res-4",
    title: "Case Study: Lubumbashi Urban Drainage",
    type: "Project Report",
    size: "2.1 MB",
    icon: Download,
  },
];

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "site-sim", label: "Live Site" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "industries", label: "Industries" },
  { id: "work", label: "Our Work", badge: INITIAL_GALLERY_ITEMS.length },
  { id: "fleet", label: "Fleet" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

// ============================================================================
// LENIS + GLOBAL STYLES
// ============================================================================
const GlobalMotionStyles = () => (
  <style>{`
    html.lenis, html.lenis body {
      height: auto;
    }
    .lenis.lenis-smooth {
      scroll-behavior: auto !important;
    }
    .lenis.lenis-smooth [data-lenis-prevent] {
      overscroll-behavior: contain;
    }
    .lenis.lenis-stopped {
      overflow: hidden;
    }
    @keyframes blobFloat {
      0%, 100% { transform: translate(0,0) scale(1); }
      33% { transform: translate(40px,-50px) scale(1.15); }
      66% { transform: translate(-30px,30px) scale(0.9); }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-14px); }
    }
    @keyframes hazardStripe {
      0% { background-position: 0 0; }
      100% { background-position: 40px 0; }
    }
    @keyframes scanlineSweep {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(400%); }
    }
    .blob-anim { animation: blobFloat 14s ease-in-out infinite; }
    .blob-anim-delay { animation: blobFloat 18s ease-in-out infinite reverse; }
    .float-anim { animation: floatY 3.5s ease-in-out infinite; }
    .scanline-bar { animation: scanlineSweep 4.5s linear infinite; }
    .hazard-bar {
      background: repeating-linear-gradient(
        -45deg,
        #C86D2D,
        #C86D2D 12px,
        #0f172a 12px,
        #0f172a 24px
      );
      background-size: 34px 34px;
      animation: hazardStripe 2s linear infinite;
    }
    .blueprint-grid {
      background-image:
        linear-gradient(to right, rgba(0, 104, 74, 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 104, 74, 0.07) 1px, transparent 1px);
      background-size: 36px 36px;
    }
    .blueprint-grid-dark {
      background-image:
        linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .scroll-hide::-webkit-scrollbar { display: none; }
    .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

const EASE = [0.22, 1, 0.36, 1];

// ============================================================================
// ADVANCED SCROLL PRIMITIVES
// ============================================================================
const ScrollProgressLaser = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00684A] via-emerald-400 to-[#C86D2D] origin-left z-50 shadow-[0_0_14px_#10b981]"
    />
  );
};

const LenisTelemetryHUD = ({ activeSection }) => {
  const { scrollY, scrollYProgress } = useScroll();
  const velocity = useVelocity(scrollY);
  const [speed, setSpeed] = useState(0);
  const [depth, setDepth] = useState(0);

  useMotionValueEvent(velocity, "change", (v) => {
    setSpeed(Math.min(9999, Math.round(Math.abs(v))));
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setDepth(Math.round(p * 100));
  });

  return (
    <div className="hidden lg:flex fixed bottom-5 left-5 z-40 items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/30 text-white shadow-2xl font-mono text-[11px]">
      <div className="flex items-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${
            speed > 50 ? "bg-amber-400 animate-ping" : "bg-emerald-400"
          }`}
        />
        <span className="text-slate-400">LENIS:</span>
        <span className="text-emerald-300 font-bold w-14">{speed} px/s</span>
      </div>
      <div className="h-3 w-[1px] bg-slate-800" />
      <div>
        <span className="text-slate-400">DEPTH: </span>
        <span className="text-amber-400 font-bold">{depth}%</span>
      </div>
      <div className="h-3 w-[1px] bg-slate-800" />
      <div className="text-emerald-400 uppercase font-bold">
        SEC // {activeSection}
      </div>
    </div>
  );
};

const ScrollScrubParagraph = ({ text, className = "" }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 88%", "end 45%"],
  });
  const words = text.split(" ");

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <ScrubWord
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};

const ScrubWord = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.3em] inline-block">
      {word}
    </motion.span>
  );
};

const VelocityMarquee = ({ items, baseVelocity = 1.2, dark = true }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    let next = baseX.get() + moveBy;
    if (next <= -50) next = 0;
    if (next > 0) next = -50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div
      className={`overflow-hidden py-3.5 border-y select-none ${
        dark
          ? "bg-slate-950 border-slate-800 text-emerald-300"
          : "bg-emerald-950 border-emerald-800 text-white"
      }`}
    >
      <motion.div
        style={{ x, skewX: skewVelocity }}
        className="flex whitespace-nowrap gap-10 w-max"
      >
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-xs sm:text-sm font-black uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-[#C86D2D]" />
            <span>{text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const RevealWords = ({ text, className = "", delay = 0, as: Tag = "span" }) => {
  const words = text.split(" ");
  return (
    <Tag className={className} style={{ perspective: 800 }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 36, rotateX: -50 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: delay + i * 0.055, ease: EASE }}
          className="inline-block mr-[0.28em]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

const FadeUp = ({
  children,
  delay = 0,
  y = 36,
  className = "",
  once = true,
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerGroup = ({ children, className = "", stagger = 0.1 }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: stagger } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = "", y = 30 }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const parseStat = (str) => {
  const match = String(str).match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: str, decimals: false };
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
    decimals: match[2].includes("."),
  };
};

const AnimatedCounter = ({ value, duration = 1.8 }) => {
  const stat = parseStat(value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(`${stat.prefix}0${stat.suffix}`);

  useEffect(() => {
    if (!isInView) return;
    let frame;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = stat.number * eased;
      const formatted = stat.decimals
        ? current.toFixed(1)
        : Math.floor(current);
      setDisplay(`${stat.prefix}${formatted}${stat.suffix}`);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return <span ref={ref}>{display}</span>;
};

const MagneticButton = ({
  children,
  className = "",
  onClick,
  strength = 0.35,
  type = "button",
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type={type}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================
const SideDotNav = ({ activeSection, scrollToSection }) => (
  <div className="hidden xl:flex flex-col gap-3.5 fixed right-6 top-1/2 -translate-y-1/2 z-40">
    {NAV_ITEMS.map((item) => (
      <button
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        className="group relative flex items-center justify-end"
        aria-label={item.label}
      >
        <span className="absolute right-6 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-bold opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap pointer-events-none">
          {item.label}
        </span>
        <motion.span
          animate={{
            scale: activeSection === item.id ? 1.4 : 1,
            backgroundColor: activeSection === item.id ? "#C86D2D" : "#cbd5e1",
          }}
          transition={{ duration: 0.25 }}
          className="w-2.5 h-2.5 rounded-full block ring-2 ring-white shadow"
        />
      </button>
    ))}
  </div>
);

const Header = ({
  activeSection,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => (
  <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-4">
      <div className="flex-shrink-0 flex items-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollToSection("home")}
          className="focus:outline-none flex items-center py-1"
        >
          <img
            src={Logo}
            alt="Africa Infrastructures Développement Logo"
            className="h-16 object-contain"
          />
        </motion.button>
      </div>

      <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-colors flex items-center gap-1.5 ${
                isActive
                  ? "text-[#00684A]"
                  : "text-slate-700 hover:text-[#00684A] hover:bg-slate-100/70"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="navActivePill"
                  className="absolute inset-0 rounded-xl bg-emerald-50/90"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
              {item.badge && (
                <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-[#C86D2D] text-white leading-none">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <motion.span
                  layoutId="navActiveUnderline"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C86D2D] rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center justify-end flex-shrink-0">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>

    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="lg:hidden bg-white border-t border-slate-200 overflow-hidden shadow-xl"
        >
          <div className="px-4 pt-3 pb-6 space-y-1.5">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-between transition ${
                    isActive
                      ? "bg-emerald-50 text-[#00684A]"
                      : "text-slate-800 hover:bg-slate-50 hover:text-[#00684A]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-[#C86D2D] text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#C86D2D]" />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </header>
);

// ============================================================================
// 1. HERO SECTION — 3D MULTI-PLANE PARALLAX & SPLIT CURTAIN SCROLL
// ============================================================================
const HeroSection = ({ scrollToSection }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
  });

  const bgY = useTransform(smoothScroll, [0, 1], ["0%", "34%"]);
  const bgScale = useTransform(smoothScroll, [0, 1], [1.08, 1.28]);
  const fade = useTransform(smoothScroll, [0, 0.85], [1, 0]);
  const leftColX = useTransform(smoothScroll, [0, 1], [0, -70]);
  const rightCardY = useTransform(smoothScroll, [0, 1], [0, 110]);
  const rightCardRotateX = useTransform(smoothScroll, [0, 1], [0, 18]);
  const rightCardRotateY = useTransform(smoothScroll, [0, 1], [0, -14]);
  const craneBoomShift = useTransform(smoothScroll, [0, 1], [0, 95]);

  const stats = [
    {
      label: "Executed Infrastructure",
      value: "$15M+",
      color: "text-[#00684A]",
      bg: "bg-emerald-50/70 border-emerald-200/60",
    },
    {
      label: "Official State Attestations",
      value: "6+",
      color: "text-[#C86D2D]",
      bg: "bg-orange-50/70 border-orange-200/60",
    },
    {
      label: "Engineers & Technicians",
      value: "250+",
      color: "text-slate-900",
      bg: "bg-slate-100 border-slate-200",
    },
    {
      label: "Quality & Compliance",
      value: "100%",
      color: "text-[#00684A]",
      bg: "bg-slate-100 border-slate-200",
    },
  ];

  return (
    <section
      ref={ref}
      id="home"
      className="relative overflow-hidden bg-slate-950 text-white pt-14 pb-24 lg:py-28"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ y: bgY, scale: bgScale, opacity: fade }}
        className="absolute inset-0 bg-cover bg-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb18086f6?auto=format&fit=crop&w=1920&q=85')`,
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#003928]/95 via-[#004D36]/85 to-slate-950/90" />

      <motion.svg
        style={{ x: craneBoomShift }}
        viewBox="0 0 600 320"
        className="absolute right-0 top-6 w-[480px] h-[260px] opacity-20 pointer-events-none hidden lg:block"
      >
        <line
          x1="420"
          y1="20"
          x2="420"
          y2="320"
          stroke="#fbbf24"
          strokeWidth="6"
        />
        <line
          x1="120"
          y1="45"
          x2="560"
          y2="45"
          stroke="#fbbf24"
          strokeWidth="5"
        />
        <line
          x1="420"
          y1="15"
          x2="180"
          y2="45"
          stroke="#34d399"
          strokeWidth="2"
        />
        <line
          x1="420"
          y1="15"
          x2="540"
          y2="45"
          stroke="#34d399"
          strokeWidth="2"
        />
        <line
          x1="230"
          y1="45"
          x2="230"
          y2="170"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <rect x="205" y="170" width="50" height="22" fill="#C86D2D" />
      </motion.svg>

      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl blob-anim pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-orange-500/10 blur-3xl blob-anim-delay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            style={{ x: leftColX, opacity: fade }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-emerald-400/30 text-amber-300 text-xs sm:text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 text-[#C86D2D] float-anim" />
              <span>LEADER IN AFRICAN CIVIL ENGINEERING & PUBLIC WORKS</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              <RevealWords text="Building the Future of" />{" "}
              <RevealWords
                text="African Infrastructure"
                delay={0.3}
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300"
              />
            </h1>

            <p className="text-base sm:text-lg text-emerald-50/90 max-w-2xl leading-relaxed">
              Africa Infrastructures Développement SARL (AID) is a premier civil
              engineering, building construction, and urban road modernization
              company delivering landmark institutional and industrial projects
              across the Democratic Republic of the Congo.
            </p>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border-l-4 border-[#C86D2D] max-w-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Landmark Achievement • Lubumbashi
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                Constructor of the New Palais de Justice of Lubumbashi (R+2) &
                Provincial Road Modernization
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton
                onClick={() => scrollToSection("work")}
                className="px-7 py-4 rounded-xl bg-[#C86D2D] hover:bg-[#b55e22] text-white font-bold text-sm sm:text-base shadow-xl shadow-orange-950/40 transition-colors flex items-center gap-2.5 group"
              >
                <span>Explore Our Work Gallery</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection("site-sim")}
                className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm sm:text-base backdrop-blur-sm transition-colors flex items-center gap-2"
              >
                <span>Interactive Site Simulation</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            style={{
              y: rightCardY,
              rotateX: rightCardRotateX,
              rotateY: rightCardRotateY,
              transformStyle: "preserve-3d",
            }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-t-8 border-[#C86D2D] text-slate-900 relative">
              <div className="absolute -top-4 right-6 bg-[#00684A] text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow">
                OFFICIAL CORPORATE IDENTITY
              </div>
              <div className="flex flex-col items-center justify-center py-4 px-2 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6">
                <img
                  src={Logo}
                  alt="Africa Infrastructures Développement Logo"
                  className="h-20 object-contain"
                />
              </div>
              <StaggerGroup className="grid grid-cols-2 gap-3.5" stagger={0.1}>
                {stats.map((s, i) => (
                  <StaggerItem
                    key={i}
                    className={`p-3.5 rounded-xl border ${s.bg}`}
                  >
                    <div className={`text-2xl font-extrabold ${s.color}`}>
                      <AnimatedCounter value={s.value} />
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5">
                      {s.label}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={() => scrollToSection("site-sim")}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:flex items-center gap-2 mx-auto mt-16 text-emerald-200/70 text-xs font-semibold"
        >
          <MousePointer2 className="w-4 h-4" />
          Scroll to operate 3D structural twin & phase wheel
        </motion.button>
      </div>
    </section>
  );
};

// ============================================================================
// 1.5 UPGRADED: 3D ISOMETRIC EXPLODED STRUCTURAL CORE (LEFT) +
//     3D REVOLVING CYLINDER / ROLODEX PHASE DRUM (RIGHT)
// ============================================================================
const IsometricLayerSlab = ({
  phase,
  index,
  activePhaseIdx,
  smoothProgress,
}) => {
  const isActive = index === activePhaseIdx;
  const isUnlocked = index <= activePhaseIdx;

  // Scroll-scrubbed vertical explosion spacing between isometric slabs
  const baseOffsets = [110, 55, 0, -55, -110];
  const explodedOffsets = [148, 74, 0, -74, -148];
  const y = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      baseOffsets[index] * 0.55,
      explodedOffsets[index],
      baseOffsets[index] * 1.15,
    ],
  );

  return (
    <motion.div
      style={{
        y,
        zIndex: index + 10,
      }}
      animate={{
        scale: isActive ? 1.08 : isUnlocked ? 0.96 : 0.86,
        opacity: isUnlocked ? 1 : 0.28,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* 3D Isometric Tilted Slab */}
      <div
        style={{
          transform: "rotateX(58deg) rotateZ(-38deg)",
          transformStyle: "preserve-3d",
          borderColor: isActive ? phase.accent : "rgba(148, 163, 184, 0.3)",
          boxShadow: isActive
            ? `0 24px 45px -10px ${phase.accent}55, inset 0 0 28px ${phase.accent}44`
            : "0 14px 25px -10px rgba(0,0,0,0.7)",
        }}
        className={`w-56 h-56 sm:w-64 sm:h-64 rounded-3xl border-2 backdrop-blur-md transition-colors duration-300 relative flex flex-col justify-between p-4 ${
          isActive
            ? "bg-slate-900/90"
            : isUnlocked
              ? "bg-slate-900/65"
              : "bg-slate-950/40"
        }`}
      >
        {/* Internal Isometric CAD Wireframe Pattern */}
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span
            style={{ color: phase.accent }}
            className="font-black tracking-wider"
          >
            {phase.code}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">
            {phase.step}
          </span>
        </div>

        {/* Distinct visual schematic inside each slab */}
        <div className="my-auto grid grid-cols-3 gap-2 opacity-85">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                borderColor: isActive ? phase.accent : "rgba(255,255,255,0.15)",
                backgroundColor:
                  isActive && i % 2 === 0
                    ? `${phase.accent}33`
                    : "rgba(15,23,42,0.6)",
              }}
              className="h-7 rounded-lg border flex items-center justify-center"
            >
              <div
                style={{ backgroundColor: phase.accent }}
                className="w-1.5 h-1.5 rounded-full"
              />
            </div>
          ))}
        </div>

        <div className="text-[10px] font-mono text-white/90 font-bold truncate border-t border-white/10 pt-1.5">
          {phase.layerLabel}
        </div>

        {/* 3D Slab Thickness Extrusion Edge */}
        <div
          style={{
            backgroundColor: isActive ? phase.accent : "#1e293b",
          }}
          className="absolute -bottom-2.5 left-2 right-2 h-2.5 rounded-b-xl opacity-80"
        />
      </div>
    </motion.div>
  );
};

// Right-Side 3D Revolving Cylinder / Rolodex Card
const PhaseWheelCard = ({ phase, index, smoothProgress, activePhaseIdx }) => {
  const total = SITE_SIMULATION_PHASES.length;
  const centerPoint = index / (total - 1); // 0, 0.25, 0.5, 0.75, 1.0

  // Continuous distance from current scroll progress
  const relativeOffset = useTransform(smoothProgress, (v) => v - centerPoint);

  // 3D Drum transformations driven directly by scroll
  const y = useTransform(relativeOffset, [-0.5, 0, 0.5], [190, 0, -190]);
  const scale = useTransform(
    relativeOffset,
    [-0.45, -0.2, 0, 0.2, 0.45],
    [0.76, 0.9, 1.03, 0.9, 0.76],
  );
  const opacity = useTransform(
    relativeOffset,
    [-0.48, -0.22, 0, 0.22, 0.48],
    [0, 0.45, 1, 0.45, 0],
  );
  const rotateX = useTransform(relativeOffset, [-0.45, 0, 0.45], [-38, 0, 38]);
  const z = useTransform(relativeOffset, [-0.45, 0, 0.45], [-140, 30, -140]);

  // Individual phase completion progress bar
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const stageFill = useTransform(
    smoothProgress,
    [segStart, segEnd],
    ["0%", "100%"],
  );

  const isActive = index === activePhaseIdx;

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        rotateX,
        z,
        zIndex: isActive ? 30 : 20 - Math.abs(index - activePhaseIdx),
        transformPerspective: 1100,
      }}
      className="absolute inset-x-0 mx-auto max-w-xl pointer-events-auto"
    >
      <div
        className={`rounded-3xl p-6 sm:p-7 border-2 transition-all duration-300 backdrop-blur-xl ${
          isActive
            ? "bg-slate-900/95 border-emerald-400 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.4)]"
            : "bg-slate-900/70 border-slate-800/80"
        }`}
      >
        {/* Top Row: Step Badge + Code + Load Spec */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              style={{
                backgroundColor: isActive ? phase.accent : "#1e293b",
              }}
              className="px-3 py-1 rounded-xl text-slate-950 font-mono font-black text-xs shadow"
            >
              PHASE {phase.step}
            </span>
            <span className="font-mono text-xs text-emerald-300 font-bold">
              {phase.code}
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-950 text-amber-300 font-mono text-[11px] font-bold border border-amber-400/30">
            {phase.load}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
          {phase.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          {phase.desc}
        </p>

        {/* 3 Engineering Spec Pills */}
        <div className="grid sm:grid-cols-3 gap-2 mt-4">
          {phase.specs.map((spec, sIdx) => (
            <div
              key={sIdx}
              className="px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] text-slate-200 flex items-center gap-1.5 font-medium"
            >
              <CheckCircle2
                style={{ color: phase.accent }}
                className="w-3.5 h-3.5 shrink-0"
              />
              <span className="truncate">{spec}</span>
            </div>
          ))}
        </div>

        {/* Bottom Telemetry Metrics + Scroll-Scrubbed Stage Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/90 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-emerald-400 font-bold">
              QC TARGET: {phase.metric}
            </span>
            <span className="text-slate-400">ELEV: {phase.depth}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              style={{
                width: stageFill,
                backgroundColor: phase.accent,
              }}
              className="h-full rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InteractiveSiteSimulation = () => {
  const containerRef = useRef(null);
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const idx = Math.min(
      SITE_SIMULATION_PHASES.length - 1,
      Math.max(0, Math.round(v * (SITE_SIMULATION_PHASES.length - 1))),
    );
    setActivePhaseIdx(idx);
  });

  const radarRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const radarReverse = useTransform(smoothProgress, [0, 1], [360, 0]);
  const percentText = useTransform(
    smoothProgress,
    (v) => `${Math.min(100, Math.round(v * 100))}%`,
  );

  const activePhase = SITE_SIMULATION_PHASES[activePhaseIdx];

  return (
    <section
      ref={containerRef}
      id="site-sim"
      className="relative h-[380vh] bg-slate-950 text-white blueprint-grid-dark border-t border-slate-800"
    >
      <div className="sticky top-24 h-[calc(100vh-6rem)] flex flex-col justify-between overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Engineering Command Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#C86D2D]" />
              3D Structural Twin & Phase Drum
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold">
              Scroll-Driven Megaproject Execution Matrix
            </h2>
          </div>

          {/* Step Quick-Jump Indicators */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {SITE_SIMULATION_PHASES.map((p, i) => (
              <div
                key={p.step}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  i === activePhaseIdx
                    ? "bg-[#C86D2D] border-amber-300 text-white font-black scale-105"
                    : i < activePhaseIdx
                      ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                      : "bg-slate-900 border-slate-800 text-slate-500"
                }`}
              >
                {p.step}
              </div>
            ))}
            <div className="hidden sm:block px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 font-bold ml-2">
              <motion.span>{percentText}</motion.span>
            </div>
          </div>
        </div>

        {/* Main Split Viewport: Left 3D Isometric Core | Right 3D Revolving Phase Drum */}
        <div className="grid lg:grid-cols-12 gap-8 items-center my-auto py-2">
          {/* LEFT: New 3D Isometric Exploded Structural Core + Live Site Photo Morph */}
          <div className="lg:col-span-6 relative h-[360px] sm:h-[430px] rounded-3xl bg-slate-900/90 border border-emerald-500/30 overflow-hidden shadow-2xl flex flex-col justify-between p-5">
            {/* Crossfading Live Construction Photo Backdrop */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activePhase.image}
                src={activePhase.image}
                alt={activePhase.title}
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 0.26, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80 pointer-events-none" />

            {/* Scanning Laser Bar */}
            <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-emerald-400/15 to-transparent scanline-bar pointer-events-none" />

            {/* Rotating Orbital Radar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.svg
                style={{ rotate: radarRotate }}
                viewBox="0 0 300 300"
                className="w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] opacity-30"
              >
                <circle
                  cx="150"
                  cy="150"
                  r="135"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="105"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  strokeDasharray="18 12"
                />
              </motion.svg>
              <motion.svg
                style={{ rotate: radarReverse }}
                viewBox="0 0 300 300"
                className="absolute w-[230px] h-[230px] opacity-25"
              >
                <circle
                  cx="150"
                  cy="150"
                  r="95"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4 14"
                />
              </motion.svg>
            </div>

            {/* Top Overlay HUD inside Left Viewport */}
            <div className="relative z-20 flex items-center justify-between text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-emerald-500/40 text-emerald-300 font-bold">
                ISOMETRIC CORE // {activePhase.code}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-700 text-amber-300">
                {activePhase.depth}
              </span>
            </div>

            {/* Center 5-Layer 3D Isometric Stack */}
            <div className="relative flex-1 flex items-center justify-center">
              {SITE_SIMULATION_PHASES.map((phase, index) => (
                <IsometricLayerSlab
                  key={phase.step}
                  phase={phase}
                  index={index}
                  activePhaseIdx={activePhaseIdx}
                  smoothProgress={smoothProgress}
                />
              ))}
            </div>

            {/* Bottom Overlay Telemetry Footer inside Left Viewport */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-slate-400">ACTIVE LAYER: </span>
                <span className="text-white font-bold">
                  {activePhase.layerLabel}
                </span>
              </div>
              <span
                style={{ color: activePhase.accent }}
                className="font-extrabold"
              >
                {activePhase.metric}
              </span>
            </div>
          </div>

          {/* RIGHT: 3D Revolving Cylinder / Rolodex Phase Wheel */}
          <div className="lg:col-span-6 relative h-[380px] sm:h-[430px] flex items-center justify-center">
            {/* Vertical Drum Guide Rail */}
            <div className="absolute right-2 top-8 bottom-8 w-1.5 rounded-full bg-slate-900 border border-slate-800 hidden sm:flex flex-col justify-between p-0.5">
              {SITE_SIMULATION_PHASES.map((p, idx) => (
                <span
                  key={p.step}
                  style={{
                    backgroundColor:
                      idx === activePhaseIdx ? p.accent : "transparent",
                  }}
                  className="w-full h-6 rounded-full transition-colors duration-300"
                />
              ))}
            </div>

            {/* 3D Revolving Phase Cards */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              style={{ perspective: "1200px" }}
            >
              {SITE_SIMULATION_PHASES.map((phase, idx) => (
                <PhaseWheelCard
                  key={phase.step}
                  phase={phase}
                  index={idx}
                  smoothProgress={smoothProgress}
                  activePhaseIdx={activePhaseIdx}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Scrubber Bar */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-full bg-gradient-to-r from-[#00684A] via-emerald-400 to-[#C86D2D] origin-left"
          />
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 2. ABOUT SECTION — WORD-BY-WORD SCROLL SCRUB + CIRCULAR IRIS PORTAL REVEAL
// ============================================================================
const AboutSection = () => {
  const secRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start 85%", "end 20%"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
  });

  const clipRadius = useTransform(
    smoothScroll,
    [0, 0.6],
    ["inset(18% 18% 18% 18% round 48px)", "inset(0% 0% 0% 0% round 24px)"],
  );
  const imgScale = useTransform(smoothScroll, [0, 1], [1.35, 1]);
  const badgeY = useTransform(smoothScroll, [0, 1], [60, -25]);
  const ringRotate = useTransform(smoothScroll, [0, 1], [0, 180]);

  return (
    <section
      ref={secRef}
      id="about"
      className="py-24 lg:py-32 bg-white overflow-hidden blueprint-grid relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#00684A] text-xs font-extrabold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>About AID SARL • Scroll-Scrubbed Manifesto</span>
              </div>
            </FadeUp>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              <RevealWords text="Pioneering Infrastructure Development in the DRC" />
            </h2>

            <ScrollScrubParagraph
              text="Founded with a bold engineering vision to modernize Central Africa's structural backbone, Africa Infrastructures Développement SARL unites world-class civil engineering, heavy autonomous machinery, and uncompromising regulatory probity across every province."
              className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed"
            />

            <ScrollScrubParagraph
              text="We execute complex public procurement contracts from geotechnical soil testing and 3D BIM modeling to turnkey delivery, operating in 100% compliance with the ARMP regulatory framework."
              className="text-sm sm:text-base text-slate-600 leading-relaxed"
            />

            <StaggerGroup
              className="grid grid-cols-2 gap-6 pt-4"
              stagger={0.15}
            >
              <StaggerItem className="border-l-4 border-[#00684A] pl-4 bg-white/90 p-4 rounded-r-2xl shadow-sm">
                <div className="text-2xl font-extrabold text-slate-900">
                  Vision
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  To be the undeniable leader in sustainable civil works across
                  Central Africa.
                </p>
              </StaggerItem>
              <StaggerItem className="border-l-4 border-[#C86D2D] pl-4 bg-white/90 p-4 rounded-r-2xl shadow-sm">
                <div className="text-2xl font-extrabold text-slate-900">
                  Mission
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Delivering exceptional infrastructure on time, on budget, and
                  beyond expectations.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>

          <div className="relative">
            <motion.svg
              style={{ rotate: ringRotate }}
              viewBox="0 0 200 200"
              className="absolute -top-10 -right-10 w-44 h-44 text-[#00684A]/15 pointer-events-none hidden sm:block"
            >
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="8 8"
              />
              <circle
                cx="100"
                cy="100"
                r="65"
                fill="none"
                stroke="#C86D2D"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
            </motion.svg>

            <motion.div
              style={{ clipPath: clipRadius }}
              className="relative overflow-hidden shadow-2xl h-[430px]"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                alt="Engineering Team"
                style={{ scale: imgScale }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-400/40">
                  FIELD GEOTECHNICAL TEAM
                </span>
                <span className="text-amber-300 font-bold">LUBUMBASHI HQ</span>
              </div>
            </motion.div>

            <motion.div
              style={{ y: badgeY }}
              className="absolute -bottom-6 -left-6 bg-[#00684A] text-white p-6 rounded-3xl shadow-2xl hidden md:block border-2 border-amber-400/50"
            >
              <div className="text-4xl font-extrabold">
                <AnimatedCounter value="10+" />
              </div>
              <div className="text-sm font-semibold mt-1">
                Years of Engineering
                <br />
                Excellence
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 3. SERVICES — STICKY 3D CARD STACKING DECK + LASER DEPTH GAUGE
// ============================================================================
const StickyStackServiceCard = ({ service, index, total }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 75%", "end 15%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -4]);

  return (
    <div
      ref={cardRef}
      style={{ top: `${110 + index * 18}px` }}
      className="sticky mb-8 last:mb-0"
    >
      <motion.div
        style={{ scale, rotateX, transformPerspective: 1000 }}
        className="relative bg-white rounded-3xl p-7 sm:p-9 border-2 border-slate-200/90 hover:border-[#00684A] shadow-xl transition-colors overflow-hidden"
      >
        <div
          className={`absolute top-0 left-0 bottom-0 w-2 ${
            service.accent === "green" ? "bg-[#00684A]" : "bg-[#C86D2D]"
          }`}
        />

        <span className="absolute right-6 top-4 text-6xl sm:text-7xl font-black text-slate-100 select-none leading-none pointer-events-none">
          0{index + 1}/0{total}
        </span>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                service.accent === "green"
                  ? "bg-emerald-50 text-[#00684A]"
                  : "bg-orange-50 text-[#C86D2D]"
              }`}
            >
              <service.icon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                CAPABILITY MODULE 0{index + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {service.title}
              </h3>
            </div>
          </div>

          <span
            className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-mono font-bold ${
              service.accent === "green"
                ? "bg-emerald-50 text-[#00684A] border border-emerald-200"
                : "bg-orange-50 text-[#C86D2D] border border-orange-200"
            }`}
          >
            {service.metric}
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed max-w-2xl">
          {service.shortDesc}
        </p>

        <div className="grid sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
          {service.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60"
            >
              <Check
                className={`w-4 h-4 mt-0.5 shrink-0 ${
                  service.accent === "green"
                    ? "text-[#00684A]"
                    : "text-[#C86D2D]"
                }`}
              />
              <span className="font-medium">{highlight}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  const secRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start end", "end start"],
  });
  const dialRotate = useTransform(scrollYProgress, [0, 1], [0, 540]);
  const barHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={secRef}
      id="services"
      className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-5">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-[#C86D2D] text-xs font-extrabold uppercase tracking-wider">
                  <HardHat className="w-4 h-4" />
                  <span>Sticky 3D Card Deck</span>
                </div>
              </FadeUp>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                <RevealWords text="Comprehensive Engineering Services" />
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                As you scroll down, each engineering division locks into our
                vertical inspection stack.
              </p>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm mt-6">
                <motion.svg
                  style={{ rotate: dialRotate }}
                  width="56"
                  height="56"
                  viewBox="0 0 64 64"
                  className="shrink-0"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="#00684A"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="18"
                    fill="none"
                    stroke="#C86D2D"
                    strokeWidth="2"
                  />
                  <line
                    x1="32"
                    y1="2"
                    x2="32"
                    y2="62"
                    stroke="#00684A"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="2"
                    y1="32"
                    x2="62"
                    y2="32"
                    stroke="#00684A"
                    strokeWidth="1.5"
                  />
                  <polygon points="32,8 27,24 37,24" fill="#C86D2D" />
                </motion.svg>
                <div className="text-xs flex-1">
                  <div className="font-extrabold text-slate-900">
                    Topographical Laser Alignment
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    Deck stack depth calibrated to Lenis scroll.
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                    <motion.div
                      style={{ width: barHeight }}
                      className="h-full bg-gradient-to-r from-[#00684A] to-[#C86D2D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {SERVICES_DATA.map((service, i) => (
              <StickyStackServiceCard
                key={service.id}
                service={service}
                index={i}
                total={SERVICES_DATA.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AdvancedIndustryCard = ({ industry, index, total, smoothProgress }) => {
  // Calculate relative position: 0 is center focus, -1 is left, 1 is right
  const rel = useTransform(smoothProgress, (v) => v * (total - 1) - index);

  // 3D Matrix Transformations based on relative distance to center
  // Adjust X translation to be wider on large screens, tighter on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const xMultiplier = isMobile ? 85 : 110;
  const x = useTransform(
    rel,
    [-2.5, -1, 0, 1, 2.5],
    [
      `${xMultiplier * 1.5}%`,
      `${xMultiplier}%`,
      "0%",
      `-${xMultiplier}%`,
      `-${xMultiplier * 1.5}%`,
    ],
  );

  const z = useTransform(rel, [-2, -1, 0, 1, 2], [-400, -150, 40, -150, -400]);
  const rotateY = useTransform(
    rel,
    [-2.5, -1, 0, 1, 2.5],
    [45, 25, 0, -25, -45],
  );
  const scale = useTransform(
    rel,
    [-2, -1, 0, 1, 2],
    [0.75, 0.85, 1.05, 0.85, 0.75],
  );
  const opacity = useTransform(rel, [-2.5, -1, 0, 1, 2.5], [0, 0.6, 1, 0.6, 0]);
  const zIndex = useTransform(rel, (v) => 30 - Math.round(Math.abs(v) * 10));

  // Dynamic Glow & Internal Image Parallax
  const boxShadow = useTransform(
    rel,
    [-0.5, 0, 0.5],
    [
      "0px 10px 30px rgba(0,0,0,0.5)",
      "0px 30px 60px -15px rgba(16,185,129,0.35)",
      "0px 10px 30px rgba(0,0,0,0.5)",
    ],
  );
  const borderColor = useTransform(
    rel,
    [-0.5, 0, 0.5],
    ["rgba(30,41,59,1)", "rgba(16,185,129,0.7)", "rgba(30,41,59,1)"],
  );

  // Inverse image pan for deep parallax effect inside the card
  const imgX = useTransform(rel, [-1, 1], ["20%", "-20%"]);

  return (
    <motion.div
      style={{
        x,
        z,
        rotateY,
        scale,
        opacity,
        zIndex,
        boxShadow,
        borderColor,
      }}
      className="absolute w-[320px] sm:w-[420px] lg:w-[460px] h-[480px] sm:h-[560px] rounded-[2rem] bg-slate-900 border-2 overflow-hidden flex flex-col justify-end p-6 sm:p-8"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={industry.image}
          alt={industry.title}
          style={{ x: imgX, scale: 1.3 }}
          className="w-full h-full object-cover"
        />
        {/* Dynamic vignette based on focus */}
        <motion.div
          style={{ opacity: useTransform(rel, [-1, 0, 1], [0.8, 0.3, 0.8]) }}
          className="absolute inset-0 bg-slate-950"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      {/* Card Content Top Elements */}
      <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
        <div className="w-14 h-14 rounded-2xl bg-[#00684A]/90 backdrop-blur-md text-white flex items-center justify-center shadow-xl border border-emerald-400/30">
          <industry.icon className="w-7 h-7" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-5xl font-black text-white/10 select-none leading-none">
            0{index + 1}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-mono font-bold border border-amber-500/30">
            {industry.stat}
          </span>
        </div>
      </div>

      {/* Card Content Bottom Text & Specs */}
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-tight drop-shadow-md">
          {industry.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 line-clamp-3">
          {industry.description}
        </p>

        <div className="pt-4 border-t border-slate-700/80 grid grid-cols-2 gap-3">
          {industry.metrics.map((metric, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-emerald-100"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D2D] shrink-0" />
              <span className="truncate">{metric}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const IndustriesSection = () => {
  const secRef = useRef(null);

  // Tall container for extended scrolling duration
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Background dynamic elements
  const bgGradientY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={secRef}
      id="industries"
      className="relative h-[450vh] bg-slate-950 text-white border-y border-slate-800 blueprint-grid-dark"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Dynamic Radar/Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,104,74,0.12)_0%,rgba(15,23,42,1)_70%)] pointer-events-none" />
        <motion.div
          style={{ top: bgGradientY }}
          className="absolute left-0 right-0 h-[40vh] bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent pointer-events-none blur-3xl"
        />

        {/* Section Header */}
        <div className="absolute top-24 left-0 right-0 px-4 text-center z-40 pointer-events-none">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest mx-auto backdrop-blur-md">
              <Activity className="w-4 h-4 text-[#C86D2D]" />
              <span>3D Sectors Navigation Matrix</span>
            </div>
          </FadeUp>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight drop-shadow-lg">
            <RevealWords text="Core Infrastructure Sectors" />
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-3 font-mono">
            OPERATIONAL DEPLOYMENT ZONES ACROSS THE DRC
          </p>
        </div>

        {/* 3D Cover Flow Track */}
        <div
          className="relative w-full max-w-7xl h-[600px] flex items-center justify-center mt-16 sm:mt-24 pointer-events-none"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          {EXPANDED_INDUSTRIES_DATA.map((industry, i) => (
            <AdvancedIndustryCard
              key={industry.id}
              industry={industry}
              index={i}
              total={EXPANDED_INDUSTRIES_DATA.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>

        {/* Scroll Progress & Pagination HUD */}
        <div className="absolute bottom-12 left-0 right-0 px-6 flex flex-col items-center gap-4 z-40 pointer-events-none">
          <div className="flex gap-2.5">
            {EXPANDED_INDUSTRIES_DATA.map((_, i) => {
              // Active state dots based on scroll range
              const isActive = useTransform(
                smoothProgress,
                (v) =>
                  Math.round(v * (EXPANDED_INDUSTRIES_DATA.length - 1)) === i,
              );
              return (
                <motion.div
                  key={i}
                  style={{
                    backgroundColor: isActive ? "#10b981" : "#1e293b",
                    scale: isActive ? 1.4 : 1,
                  }}
                  className="w-2 h-2 rounded-full transition-colors duration-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                />
              );
            })}
          </div>
          <div className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-[0.2em] flex items-center gap-2">
            <ChevronLeft className="w-3 h-3" />
            Scroll to Navigate Sectors
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 5. WORK GALLERY — GANTRY HORIZONTAL TRACK + INTERNAL IMAGE PARALLAX
// ============================================================================
const ProjectImageCard = ({
  item,
  index,
  setLightboxItem,
  skewX,
  imgShiftX,
}) => (
  <motion.div
    style={skewX ? { skewX } : undefined}
    whileHover={{ y: -10 }}
    onClick={() => setLightboxItem(item)}
    className="group relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-emerald-400/60 shadow-2xl cursor-pointer flex flex-col justify-between shrink-0 w-[330px] sm:w-[400px] h-[470px]"
  >
    <div className="relative h-60 overflow-hidden">
      <motion.img
        src={item.image}
        alt={item.title}
        style={imgShiftX ? { x: imgShiftX, scale: 1.18 } : undefined}
        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
        <span className="px-3 py-1 rounded-full bg-[#00684A]/95 text-white text-[11px] font-extrabold shadow">
          {item.category}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-300 text-[11px] font-mono font-bold border border-amber-400/30">
          #{String(index + 1).padStart(2, "0")} • {item.year}
        </span>
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <span className="text-[11px] font-bold text-emerald-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30">
          {item.badge}
        </span>
        <span className="w-9 h-9 rounded-full bg-[#C86D2D] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
          <ZoomIn className="w-4 h-4" />
        </span>
      </div>
    </div>

    <div className="p-6 flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
          <MapPin className="w-3.5 h-3.5 text-[#C86D2D] shrink-0" />
          <span className="truncate">{item.location}</span>
        </div>
        <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-800/90 flex items-center justify-between text-xs">
        <div>
          <div className="text-[10px] uppercase text-slate-500 font-bold">
            Engineering Spec
          </div>
          <div className="font-mono font-bold text-slate-200">
            {item.metrics}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase text-slate-500 font-bold">
            Valuation
          </div>
          <div className="font-extrabold text-amber-400">{item.budget}</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const WorkGallerySection = ({
  galleryItems,
  categories,
  selectedCategory,
  setSelectedCategory,
  filteredGallery,
  setLightboxItem,
}) => {
  const [viewMode, setViewMode] = useState("gantry");
  const targetRef = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 350 });
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [7, -7]);

  const totalShift = Math.max(0, (filteredGallery.length - 2.5) * 420);
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -totalShift]);
  const x = useSpring(rawX, { stiffness: 120, damping: 26 });
  const trolleyLeft = useTransform(scrollYProgress, [0, 1], ["4%", "92%"]);
  const imgShiftX = useTransform(scrollYProgress, [0, 1], ["-22px", "22px"]);

  return (
    <section id="work" className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C86D2D]/20 border border-[#C86D2D]/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-[#C86D2D]" />
                <span>12 Landmark Projects & Visual Showcase</span>
              </div>
            </FadeUp>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              <RevealWords text="Our Work: Infrastructure in Action" />
            </h2>
            <p className="text-slate-300 mt-2 max-w-2xl text-sm sm:text-base">
              Scroll vertically to drive the overhead gantry crane and pan
              across our completed institutional buildings, urban roads, and
              bridges.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start">
            <button
              onClick={() => setViewMode("gantry")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === "gantry"
                  ? "bg-[#00684A] text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MoveHorizontal className="w-4 h-4" />
              Crane Horizontal Scroll
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === "grid"
                  ? "bg-[#C86D2D] text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              All Cards Grid ({filteredGallery.length})
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              const count =
                cat === "All"
                  ? galleryItems.length
                  : galleryItems.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                    active
                      ? "text-white"
                      : "bg-slate-800/90 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="categoryPill"
                      className="absolute inset-0 rounded-xl bg-[#00684A] border border-emerald-400/40 shadow-md"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                  <span
                    className={`relative z-10 px-2 py-0.5 rounded-full text-[11px] ${
                      active
                        ? "bg-[#C86D2D] text-white"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Showing {filteredGallery.length} project card(s) • Click any card
            for high-res inspection
          </div>
        </div>
      </div>

      {viewMode === "gantry" ? (
        <div ref={targetRef} className="relative h-[300vh]">
          <div className="sticky top-24 h-[calc(100vh-6rem)] flex flex-col justify-center overflow-hidden">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="relative h-6 bg-slate-950 rounded-full border border-slate-800 flex items-center px-3">
                <div className="w-full h-1 bg-gradient-to-r from-[#00684A] via-amber-500 to-[#C86D2D] opacity-50" />
                <motion.div
                  style={{ left: trolleyLeft }}
                  className="absolute -top-1.5 w-20 h-9 rounded-lg bg-[#C86D2D] border-2 border-amber-300 shadow-lg flex items-center justify-center text-[10px] font-mono font-black text-white"
                >
                  GANTRY
                </motion.div>
              </div>
            </div>

            <div className="pl-4 sm:pl-12 lg:pl-20 overflow-visible">
              <motion.div
                style={{ x }}
                className="flex items-center gap-7 w-max"
              >
                {filteredGallery.map((item, idx) => (
                  <ProjectImageCard
                    key={item.id}
                    item={item}
                    index={idx}
                    setLightboxItem={setLightboxItem}
                    skewX={skewX}
                    imgShiftX={imgShiftX}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center">
            {filteredGallery.map((item, idx) => (
              <ProjectImageCard
                key={item.id}
                item={item}
                index={idx}
                setLightboxItem={setLightboxItem}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// ============================================================================
// 5.5 UPGRADED: HEAVY MACHINERY FLEET — CENTER-PULL FAN DECK (FIXED CLIPPING)
// ============================================================================
const HandCard = ({
  unit,
  index,
  total,
  scrollYProgress,
  hoveredIndex,
  setHoveredIndex,
}) => {
  // 1. Calculate the staggering timeline for this card to "deal" onto the screen
  const startIn = index * 0.12;
  const endIn = startIn + 0.12;

  // 2. Calculate the Fan Arc Math
  const normalizedIdx = index - (total - 1) / 2;

  const maxFanX = normalizedIdx * 100; // How far left/right it spreads
  const maxFanY = Math.abs(normalizedIdx) * 20; // How much it dips down to create an arc
  const maxFanRot = normalizedIdx * 7.5; // How much it tilts

  // 3. Scroll-Driven Outer Wrapper
  const y = useTransform(scrollYProgress, [startIn, endIn], [1200, maxFanY]);
  const x = useTransform(scrollYProgress, [startIn, endIn], [0, maxFanX]);
  const rotateZ = useTransform(
    scrollYProgress,
    [startIn, endIn],
    [0, maxFanRot],
  );
  const opacity = useTransform(
    scrollYProgress,
    [startIn, startIn + 0.05],
    [0, 1],
  );

  // 4. Hover State Logic
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const isSiblingHovered = isAnyHovered && !isHovered;

  return (
    <motion.div
      style={{
        x,
        y,
        rotateZ,
        opacity,
        transformOrigin: "center center",
        zIndex: isHovered ? 50 : index,
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] cursor-pointer"
    >
      <motion.div
        animate={{
          // Hovered: Hit exact center X.
          x: isHovered ? -maxFanX : isSiblingHovered ? normalizedIdx * 45 : 0,

          // FIXED: Adjusted Y offset to stop it from hitting the header.
          // Instead of pulling up strongly (-100), we neutralize the fan arc and let it sit comfortably.
          y: isHovered ? -maxFanY + 30 : isSiblingHovered ? 180 : 0,

          rotateZ: isHovered
            ? -maxFanRot
            : isSiblingHovered
              ? normalizedIdx * 12
              : 0,

          // FIXED: Reduced scale slightly so it fits safely on smaller laptop screens
          scale: isHovered ? 1.15 : isSiblingHovered ? 0.75 : 1,

          opacity: isSiblingHovered ? 0.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 25 }}
        className="w-full h-full bg-slate-900 rounded-3xl overflow-hidden border-[3px] shadow-2xl flex flex-col group transition-colors will-change-transform"
        style={{
          borderColor: isHovered ? "#C86D2D" : "rgba(30,41,59,1)",
          boxShadow: isHovered
            ? "0 40px 100px -10px rgba(0,0,0,0.9), 0 0 40px rgba(200,109,45,0.4)"
            : "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div className="h-[52%] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10 transition-opacity"
            style={{ opacity: isHovered ? 0 : 1 }}
          />
          <motion.img
            src={unit.image}
            alt={unit.name}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />

          <div className="absolute top-3 left-3 z-20">
            <span className="px-2.5 py-1 rounded-md bg-slate-950/90 text-emerald-300 text-[10px] sm:text-xs font-bold border border-emerald-500/30">
              {unit.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2.5 py-1 rounded-md bg-[#C86D2D] text-white text-[11px] font-extrabold shadow-md">
              QTY: {unit.count}
            </span>
          </div>
        </div>

        <div className="h-[48%] p-5 sm:p-6 flex flex-col justify-between relative bg-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

          <div className="relative z-10">
            <h3
              className="text-lg sm:text-xl font-black text-white leading-tight line-clamp-2"
              style={{ color: isHovered ? "#fcd34d" : "white" }}
            >
              {unit.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2">
              {unit.spec}
            </p>
          </div>

          <div className="relative z-10 mt-auto pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider">
              CAPACITY
            </span>
            <span className="text-emerald-400 font-extrabold text-xs sm:text-sm bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {unit.capacity}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FleetShowcaseSection = () => {
  const secRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={secRef}
      id="fleet"
      className="relative h-[400vh] bg-slate-950 text-white border-y border-slate-800 blueprint-grid-dark"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          animate={{ opacity: hoveredIndex !== null ? 0.05 : 0.25 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,104,74,1)_0%,transparent_60%)] pointer-events-none transition-opacity duration-500"
        />

        <motion.div
          animate={{
            opacity: hoveredIndex !== null ? 0 : 1,
            y: hoveredIndex !== null ? -20 : 0,
          }}
          className="absolute top-20 sm:top-24 left-0 w-full px-4 sm:px-6 z-0 pointer-events-none flex flex-col items-center text-center transition-all duration-500"
        >
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest backdrop-blur-md">
              <Wrench className="w-4 h-4 text-[#C86D2D]" />
              <span>Interactive Machinery Deck</span>
            </div>
          </FadeUp>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight drop-shadow-lg">
            Heavy Machinery Fleet
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm mt-3 uppercase tracking-widest">
            Scroll down to deal • Hover cards to center
          </p>
        </motion.div>

        {/* FIXED: Increased top margin (mt-24 sm:mt-32) to push the whole deck lower down the screen */}
        <div className="relative w-full max-w-7xl flex items-center justify-center mt-24 sm:mt-32">
          {FLEET_SHOWCASE_DATA.map((unit, idx) => (
            <HandCard
              key={unit.id}
              unit={unit}
              index={idx}
              total={FLEET_SHOWCASE_DATA.length}
              scrollYProgress={scrollYProgress}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 z-50 pointer-events-none">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-full bg-gradient-to-r from-emerald-500 to-[#C86D2D]"
          />
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 6. UPGRADED: INSIGHTS — CINEMATIC SCROLL ACCORDION
// ============================================================================
const InsightAccordionCard = ({ insight, index, total, scrollYProgress }) => {
  // Calculate the "peak" focus point for this specific card
  const peak = index / (total - 1);
  const threshold = 1.2 / (total - 1); // How wide the active zone is

  // Mathematically clamp the width to avoid browser animation errors
  const width = useTransform(scrollYProgress, (v) => {
    const dist = Math.abs(v - peak);
    if (dist >= threshold) return "8%"; // Collapsed state
    const pct = 1 - dist / threshold;
    return `${8 + 52 * pct}%`; // Expands up to 60%
  });

  // Fade content in only when the card is near its peak width
  const contentOpacity = useTransform(scrollYProgress, (v) => {
    const dist = Math.abs(v - peak);
    if (dist >= threshold * 0.5) return 0;
    return 1 - dist / (threshold * 0.5);
  });

  // Darken the overlay heavily when collapsed, brighten when expanded
  const overlayOpacity = useTransform(scrollYProgress, (v) => {
    const dist = Math.abs(v - peak);
    if (dist >= threshold) return 0.65;
    return 0.2 + (dist / threshold) * 0.45;
  });

  return (
    <motion.div
      style={{ width }}
      className="relative h-full overflow-hidden rounded-[2rem] cursor-pointer group flex-shrink-0 transition-all duration-300 shadow-xl border border-slate-200/50"
    >
      {/* Background Image */}
      <img
        src={insight.image}
        alt={insight.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      
      {/* Dynamic Overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-slate-950 transition-colors"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

      {/* Expanded Content (Fades out when collapsed) */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end"
      >
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1.5 rounded-full bg-[#00684A] text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
              {insight.tag}
            </span>
            <span className="text-sm font-mono text-emerald-300 font-bold tracking-wider drop-shadow-md">
              {insight.date}
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg line-clamp-2">
            {insight.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl mb-6">
            {insight.excerpt}
          </p>

          <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C86D2D] hover:bg-[#a65924] text-white font-bold text-sm shadow-xl transition-colors group/btn">
            Read Full Article
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Collapsed Spine Label (Always visible, looks like a book spine) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap pointer-events-none mix-blend-overlay opacity-50">
        <span className="text-3xl font-black text-white tracking-widest uppercase">
          0{index + 1} // {insight.tag}
        </span>
      </div>
    </motion.div>
  );
};

const InsightsSection = () => {
  const secRef = useRef(null);

  // Creates a highly extended scrolling section (400vh) to power the accordion
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={secRef}
      id="insights"
      className="relative h-[400vh] bg-slate-50 border-t border-slate-200 blueprint-grid"
    >
      {/* Sticky container locks the viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#C86D2D] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest shadow-sm">
                <Lightbulb className="w-4 h-4" />
                <span>Scroll-Driven Editorial Deck</span>
              </div>
            </FadeUp>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight drop-shadow-sm">
              Company Insights
            </h2>
          </div>
          <p className="text-slate-500 font-mono text-xs sm:text-sm uppercase tracking-widest text-right max-w-xs">
            Scroll down to expand reports and industry perspectives
          </p>
        </div>

        {/* Cinematic Accordion Container */}
        <div className="flex items-stretch gap-3 w-full h-[65vh] min-h-[450px] max-h-[700px] bg-white p-3 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200">
          {INSIGHTS_DATA.map((insight, i) => (
            <InsightAccordionCard
              key={insight.id}
              insight={insight}
              index={i}
              total={INSIGHTS_DATA.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom Scroll Scrubber Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300 pointer-events-none shadow-inner">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-full bg-gradient-to-r from-[#00684A] via-emerald-400 to-[#C86D2D]"
          />
        </div>
      </div>
    </section>
  );
};


// ============================================================================
// 7. RESOURCES — CONVERGING VAULT DRAWER SCROLL
// ============================================================================
const ResourceVaultCard = ({ resource, index, scrollYProgress }) => {
  const fromLeft = index < 2;
  const x = useTransform(
    scrollYProgress,
    [0.05, 0.55],
    [fromLeft ? -90 : 90, 0],
  );
  const opacity = useTransform(scrollYProgress, [0.05, 0.45], [0.2, 1]);
  const barWidth = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"]);

  return (
    <motion.div style={{ x, opacity }}>
      <MagneticButton
        strength={0.15}
        className="w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-[#00684A] transition-colors flex flex-col items-center text-center group cursor-pointer shadow-sm hover:shadow-xl"
      >
        <motion.div
          whileHover={{ rotate: 12 }}
          className="w-12 h-12 rounded-full bg-white shadow-sm group-hover:bg-[#00684A] flex items-center justify-center mb-4 transition-colors"
        >
          <resource.icon className="w-5 h-5 text-slate-600 group-hover:text-white" />
        </motion.div>
        <h4 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-[#00684A] transition-colors">
          {resource.title}
        </h4>
        <div className="text-xs text-slate-500 mb-3">
          {resource.type} • {resource.size}
        </div>
        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mb-4">
          <motion.div
            style={{ width: barWidth }}
            className="h-full bg-[#00684A]"
          />
        </div>
        <div className="mt-auto px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 group-hover:bg-[#C86D2D] group-hover:border-[#C86D2D] group-hover:text-white transition-all">
          Download Ready
        </div>
      </MagneticButton>
    </motion.div>
  );
};

// ============================================================================
// 9. CONTACT — 3D PERSPECTIVE UNFOLD ON SCROLL
// ============================================================================
const ContactSection = ({
  contactForm,
  setContactForm,
  contactSubmitted,
  setContactSubmitted,
  handleContactSubmit,
}) => {
  const secRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start 90%", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [-18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <section
      ref={secRef}
      id="contact"
      className="py-20 lg:py-28 bg-slate-100 border-t border-slate-200"
      style={{ perspective: 1200 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#00684A] text-xs font-extrabold uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </div>
            </FadeUp>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              <RevealWords text="Partner With AID SARL for Your Next Project" />
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Contact our engineering and tender desk for public procurement
              bids, private building contracts, road construction, or civil
              engineering consultations.
            </p>
            <StaggerGroup className="space-y-4 pt-2" stagger={0.12}>
              <StaggerItem className="p-5 rounded-2xl bg-white border-l-4 border-[#00684A] shadow-sm">
                <div className="text-xs font-extrabold uppercase text-[#00684A]">
                  Headquarters • Haut-Katanga
                </div>
                <div className="font-bold text-slate-900 text-base mt-1">
                  Lubumbashi, Democratic Republic of Congo
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Quartier Industriel & Administratif
                </p>
              </StaggerItem>
              <StaggerItem className="p-5 rounded-2xl bg-white border-l-4 border-[#C86D2D] shadow-sm">
                <div className="text-xs font-extrabold uppercase text-[#C86D2D]">
                  National Liaison Office
                </div>
                <div className="font-bold text-slate-900 text-base mt-1">
                  Kinshasa - Gombe, DRC
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Liaison Ministry of Infrastructure & ARMP
                </p>
              </StaggerItem>
              <StaggerItem className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <Mail className="w-5 h-5 text-[#00684A] mb-1.5" />
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    contact@aid-rdc.com
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <Clock className="w-5 h-5 text-[#C86D2D] mb-1.5" />
                  <div className="text-xs text-slate-500">Working Hours</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    Mon - Sat : 08:00 - 17:30
                  </div>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>

          <motion.div
            style={{ rotateX, scale, transformOrigin: "top center" }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                Request a Quote or Tender Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Fill out the project specifications below and our engineering
                desk will respond promptly.
              </p>
              <AnimatePresence mode="wait">
                {contactSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#00684A] text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900">
                      Thank You! Inquiry Received.
                    </h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Our technical directorate at Africa Infrastructures
                      Développement SARL has received your message.
                    </p>
                    <button
                      onClick={() => setContactSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-[#00684A] text-white text-xs font-bold"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Ex: Jean-Marc Kabongo"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00684A] focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Organization / Ministry
                        </label>
                        <input
                          type="text"
                          value={contactForm.organization}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              organization: e.target.value,
                            })
                          }
                          placeholder="Ex: Ministry of Infrastructure"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00684A] focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00684A] focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+243 ..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00684A] focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Infrastructure Sector
                      </label>
                      <select
                        value={contactForm.projectType}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            projectType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00684A] focus:outline-none text-sm bg-white"
                      >
                        <option>
                          Civil Engineering & Institutional Buildings
                        </option>
                        <option>Urban Roadways & Asphalt Paving</option>
                        <option>Hydraulic & Drainage Networks</option>
                        <option>Public Procurement / ARMP Tender</option>
                        <option>Mining & Industrial Civil Works</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Project Details & Location *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        placeholder="Describe your project scope, location, timeline..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00684A] focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                      />
                    </div>
                    <MagneticButton
                      type="submit"
                      strength={0.1}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00684A] to-[#00523A] hover:from-[#00523A] hover:to-[#003E2C] text-white font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Submit Project Inquiry to AID SARL</span>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FOOTER
// ============================================================================
const Footer = ({ scrollToSection }) => (
  <footer className="bg-slate-950 text-slate-400">
    <div className="h-2.5 w-full hazard-bar" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <FadeUp className="space-y-4">
          <div className="bg-white p-3 rounded-2xl inline-block">
            <img
              src={Logo}
              alt="Africa Infrastructures Développement Logo"
              className="h-12 object-contain"
            />
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            AFRICA INFRASTRUCTURES DÉVELOPPEMENT SARL (AID) — Designing,
            building, and modernizing vital public and private infrastructure
            across the Democratic Republic of the Congo.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5 text-xs">
            {NAV_ITEMS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-amber-400 transition flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#C86D2D]" />{" "}
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Core Sectors
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>• Public & Institutional Buildings</li>
            <li>• Urban Roadways & Asphalt Paving</li>
            <li>• Bridges & Civil Engineering Structures</li>
            <li>• Sanitation & Erosion Control</li>
            <li>• Industrial & Mining Infrastructure</li>
          </ul>
        </FadeUp>
        <FadeUp delay={0.3}>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Regional Presence
          </h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Headquartered in Lubumbashi (Haut-Katanga) with active
            infrastructure operations across Lualaba and Kinshasa.
          </p>
          <MagneticButton
            strength={0.15}
            onClick={() => scrollToSection("contact")}
            className="w-full py-3 rounded-xl bg-[#00684A] hover:bg-[#00543b] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span>Contact Engineering Desk</span>
          </MagneticButton>
        </FadeUp>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} AFRICA INFRASTRUCTURES DÉVELOPPEMENT SARL
          (AID). All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-400 font-semibold">
            Lubumbashi • Kinshasa • Kolwezi
          </span>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================================================
// LIGHTBOX MODAL
// ============================================================================
const LightboxModal = ({
  lightboxItem,
  setLightboxItem,
  handleLightboxNav,
}) => (
  <AnimatePresence>
    {lightboxItem && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setLightboxItem(null)}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl relative"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-md bg-[#00684A] text-white text-xs font-bold">
                {lightboxItem.category}
              </span>
              <span className="text-xs text-amber-300 font-semibold">
                {lightboxItem.location} • {lightboxItem.year}
              </span>
            </div>
            <button
              onClick={() => setLightboxItem(null)}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
            <motion.img
              key={lightboxItem.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="max-h-[65vh] w-auto object-contain"
            />
            <button
              onClick={() => handleLightboxNav("prev")}
              className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-[#00684A] text-white transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleLightboxNav("next")}
              className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-[#C86D2D] text-white transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#C86D2D] uppercase">
                {lightboxItem.badge} — {lightboxItem.client}
              </div>
              <h3 className="text-xl font-extrabold mt-0.5">
                {lightboxItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                {lightboxItem.description}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-xs text-slate-400">Contract / Scope</div>
              <div className="text-base font-extrabold text-emerald-400">
                {lightboxItem.budget}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ============================================================================
// MAIN LANDING PAGE WITH LENIS ENGINE
// ============================================================================
const Landing = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [galleryItems] = useState(INITIAL_GALLERY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    projectType: "Civil Engineering & Institutional Buildings",
    message: "",
  });

  const [toastMessage, setToastMessage] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.id);
      const scrollPos = window.scrollY + 240;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (
          el &&
          scrollPos >= el.offsetTop &&
          scrollPos < el.offsetTop + el.offsetHeight
        ) {
          setActiveSection(sec);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -88, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = [
    "All",
    "Buildings",
    "Roads & Asphalt",
    "Bridges & Civil",
    "Site Progress",
    "Equipment",
  ];
  const filteredGallery =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const handleLightboxNav = (direction) => {
    if (!lightboxItem) return;
    const currentIndex = filteredGallery.findIndex(
      (i) => i.id === lightboxItem.id,
    );
    if (currentIndex === -1) return;
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % filteredGallery.length
        : (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
    setLightboxItem(filteredGallery[nextIndex]);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    triggerToast("Your inquiry has been sent to AID SARL Engineering Desk!");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#00684A] selection:text-white">
      <GlobalMotionStyles />
      <ScrollProgressLaser />
      <LenisTelemetryHUD activeSection={activeSection} />
      <SideDotNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#00684A] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-400/30"
          >
            <CheckCircle2 className="w-5 h-5 text-[#F59E0B] shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection scrollToSection={scrollToSection} />

      <VelocityMarquee
        items={[
          "ARMP CERTIFIED PUBLIC WORKS",
          "PALAIS DE JUSTICE LUBUMBASHI (R+2)",
          "160T/HR HOT-MIX ASPHALT PLANT",
          "ISO 9001 STRUCTURAL ENGINEERING",
          "COPPERBELT HAUL ROAD INFRASTRUCTURE",
        ]}
        baseVelocity={1.1}
      />

      <InteractiveSiteSimulation />
      <AboutSection />
      <ServicesSection />
      <IndustriesSection />

      <WorkGallerySection
        galleryItems={galleryItems}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filteredGallery={filteredGallery}
        setLightboxItem={setLightboxItem}
      />

      <FleetShowcaseSection />

      <VelocityMarquee
        items={[
          "65+ PROPRIETARY HEAVY MACHINES",
          "LUBUMBASHI • KINSHASA • KOLWEZI",
          "GEOTECHNICAL & TOPOGRAPHICAL LAB",
          "ZERO-DEFECT QUALITY POLICY",
        ]}
        baseVelocity={-1.1}
        dark={false}
      />

      <InsightsSection />
      <ContactSection
        contactForm={contactForm}
        setContactForm={setContactForm}
        contactSubmitted={contactSubmitted}
        setContactSubmitted={setContactSubmitted}
        handleContactSubmit={handleContactSubmit}
      />
      <Footer scrollToSection={scrollToSection} />

      <LightboxModal
        lightboxItem={lightboxItem}
        setLightboxItem={setLightboxItem}
        handleLightboxNav={handleLightboxNav}
      />
    </div>
  );
};

export default Landing;
