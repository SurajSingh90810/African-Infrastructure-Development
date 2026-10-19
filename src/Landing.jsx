import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
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
  Wrench,
  Activity,
  Gauge,
} from "lucide-react";

import Logo from "./assets/logo.jpeg";

// ============================================================================
// REAL-WORLD PROJECT & COMPANY DATA
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
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    description:
      "Our on-site civil engineers and surveyors utilizing total stations, drone mapping, and soil compaction testing to guarantee international engineering compliance.",
  },
];

const ARMP_CERTIFICATES = [
  {
    ref: "ARMP N° 024/2025/DG/DREG/MP/25",
    project:
      "Construction works of the new R+2 building to house the Lubumbashi Courthouse",
    authority: "Public Procurement Regulatory Authority (DRC)",
    amount: "$2,686,856.00 USD",
    status: "Delivered & Inaugurated",
    year: "2025",
  },
  {
    ref: "ARMP N° 038/2025/DG/DREG",
    project:
      "Rehabilitation and asphalt paving of structural urban roadways (Haut-Katanga)",
    authority: "Public Procurement Regulatory Authority (DRC)",
    amount: "Certified Public Contract",
    status: "Active / Completed Phases",
    year: "2025",
  },
  {
    ref: "ARMP N° 142/2024/DG/DREG",
    project: "Sanitation works, box culverts, and stormwater drainage systems",
    authority: "Public Procurement Regulatory Authority (DRC)",
    amount: "Certified Public Contract",
    status: "Compliant & Verified",
    year: "2024",
  },
  {
    ref: "ARMP N° 137 - 139/2024/DG/DREG",
    project:
      "Civil engineering works, public buildings, and road infrastructure",
    authority: "Public Procurement Regulatory Authority (DRC)",
    amount: "Multi-Lot Attestation",
    status: "Compliant & Verified",
    year: "2024",
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
  },
];

const INDUSTRIES_DATA = [
  {
    id: "ind-1",
    title: "Transportation & Roads",
    icon: Truck,
    description:
      "Building the arteries of African commerce with durable highways, urban road modernization, and robust bridges designed for heavy industrial and civilian use.",
  },
  {
    id: "ind-2",
    title: "Public & Civic Infrastructure",
    icon: Landmark,
    description:
      "Executing landmark public works including courthouses, ministries, and hospitals, adhering strictly to national (ARMP) and international standards.",
  },
  {
    id: "ind-3",
    title: "Commercial Construction",
    icon: Factory,
    description:
      "Turnkey development of administrative complexes, retail centers, and industrial facilities with a focus on modern aesthetics and long-term structural integrity.",
  },
  {
    id: "ind-4",
    title: "Utilities & Civil Works",
    icon: Droplet,
    description:
      "Specialized engineering for hydraulic networks, urban drainage, and erosion control systems to protect infrastructure against tropical climates.",
  },
];

const INSIGHTS_DATA = [
  {
    id: "ins-1",
    date: "October 10, 2026",
    tag: "Company News",
    title: "AID SARL Completes Phase 1 of Lubumbashi Road Modernization",
    excerpt:
      "Our dedicated teams have successfully laid over 15 kilometers of hot-mix asphalt in the urban center, drastically improving local commercial mobility.",
    image:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ins-2",
    date: "September 22, 2026",
    tag: "Market Perspective",
    title: "The Future of Sustainable Asphalt & Concrete in the DRC",
    excerpt:
      "Exploring how localized sourcing and advanced batching technologies are reducing the carbon footprint of heavy civil engineering projects.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ins-3",
    date: "August 15, 2026",
    tag: "Project Milestone",
    title: "Inauguration of the New Palais de Justice",
    excerpt:
      "A proud moment as the R+2 institutional complex is officially opened, showcasing our commitment to quality, timely delivery, and structural excellence.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb18086f6?auto=format&fit=crop&w=800&q=80",
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
  { id: "insights", label: "Insights" },
  { id: "resources", label: "Resources" },
  { id: "company", label: "Company" },
  { id: "contact", label: "Contact" },
];

// ============================================================================
// GLOBAL ANIMATION KEYFRAMES & BLUEPRINT PATTERNS
// ============================================================================
const GlobalMotionStyles = () => (
  <style>{`
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
    @keyframes beaconPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.35; transform: scale(1.35); }
    }
    .blob-anim { animation: blobFloat 14s ease-in-out infinite; }
    .blob-anim-delay { animation: blobFloat 18s ease-in-out infinite reverse; }
    .float-anim { animation: floatY 3.5s ease-in-out infinite; }
    .beacon-pulse { animation: beaconPulse 1.4s ease-in-out infinite; }
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

// ============================================================================
// REUSABLE ANIMATION PRIMITIVES
// ============================================================================
const EASE = [0.22, 1, 0.36, 1];

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

const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState(
    "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)",
  );

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt(
      `perspective(900px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) scale3d(1.03,1.03,1.03)`,
    );
  };
  const reset = () =>
    setTilt("perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)");

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform: tilt, transition: "transform 0.25s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
};

// ============================================================================
// NEW 1: TOP ASPHALT PAVING + STEAMROLLER SCROLL BAR
// ============================================================================
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.2,
  });
  const rollerLeft = useTransform(smoothProgress, [0, 1], ["0%", "97%"]);
  const wheelRotate = useTransform(smoothProgress, [0, 1], [0, 1440]);

  return (
    <div className="fixed top-0 left-0 right-0 h-2.5 bg-slate-900/90 z-[70] overflow-visible">
      {/* Freshly Paved Asphalt Layer */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="h-full bg-gradient-to-r from-[#00684A] via-slate-800 to-[#C86D2D] origin-left relative"
      >
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] opacity-80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #fbbf24 0, #fbbf24 10px, transparent 10px, transparent 20px)",
          }}
        />
      </motion.div>

      {/* Live Moving Road Roller SVG */}
      <motion.div
        style={{ left: rollerLeft }}
        className="absolute -top-1 -translate-x-1/2 pointer-events-none hidden sm:block"
      >
        <div className="relative flex items-center">
          <svg
            width="38"
            height="22"
            viewBox="0 0 44 26"
            className="drop-shadow-md"
          >
            {/* Chassis & Cab */}
            <rect x="8" y="4" width="16" height="10" rx="2" fill="#00684A" />
            <rect x="11" y="6" width="10" height="5" rx="1" fill="#a7f3d0" />
            {/* Engine Hood */}
            <path d="M24 8 L36 10 L36 17 L24 17 Z" fill="#C86D2D" />
            {/* Rear Wheel */}
            <motion.g
              style={{ rotate: wheelRotate, originX: "14px", originY: "19px" }}
            >
              <circle
                cx="14"
                cy="19"
                r="6"
                fill="#1e293b"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              <line
                x1="14"
                y1="13"
                x2="14"
                y2="25"
                stroke="#94a3b8"
                strokeWidth="1"
              />
              <line
                x1="8"
                y1="19"
                x2="20"
                y2="19"
                stroke="#94a3b8"
                strokeWidth="1"
              />
            </motion.g>
            {/* Front Heavy Steel Drum Roller */}
            <motion.g
              style={{ rotate: wheelRotate, originX: "34px", originY: "19px" }}
            >
              <circle
                cx="34"
                cy="19"
                r="6.5"
                fill="#475569"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <line
                x1="34"
                y1="13"
                x2="34"
                y2="25"
                stroke="#f59e0b"
                strokeWidth="1.2"
              />
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// NEW 2: FIXED LEFT TOWER CRANE HUD (MOVES WITH PAGE SCROLL)
// ============================================================================
const ScrollTowerCraneHUD = () => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  // Trolley moves outward along the crane jib as user scrolls
  const trolleyX = useTransform(smooth, [0, 0.5, 1], [28, 78, 52]);
  // Cable length extends down as you scroll deeper into the site
  const cableLength = useTransform(smooth, [0, 1], [24, 155]);
  const [depthMeters, setDepthMeters] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setDepthMeters(Math.round(latest * 120));
  });

  return (
    <div className="hidden 2xl:flex flex-col items-start fixed left-4 top-28 bottom-10 w-28 z-30 pointer-events-none select-none opacity-90">
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2.5 shadow-xl text-white w-full">
        <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 beacon-pulse" />
            CRANE-01
          </span>
          <span>{depthMeters}m</span>
        </div>

        <svg viewBox="0 0 100 220" className="w-full h-56 overflow-visible">
          {/* Counter-jib & Counterweight */}
          <rect x="2" y="18" width="18" height="6" rx="1" fill="#475569" />
          <rect x="4" y="23" width="10" height="9" rx="1" fill="#C86D2D" />

          {/* Tower Mast */}
          <rect
            x="18"
            y="10"
            width="8"
            height="200"
            fill="none"
            stroke="#00684A"
            strokeWidth="2"
          />
          {/* Mast Cross Bracing */}
          {Array.from({ length: 12 }).map((_, idx) => (
            <g key={idx}>
              <line
                x1="18"
                y1={16 + idx * 16}
                x2="26"
                y2={24 + idx * 16}
                stroke="#10b981"
                strokeWidth="1.2"
              />
              <line
                x1="26"
                y1={24 + idx * 16}
                x2="18"
                y2={32 + idx * 16}
                stroke="#10b981"
                strokeWidth="1.2"
              />
            </g>
          ))}

          {/* Top Apex & Pendant Cables */}
          <polygon points="18,10 26,10 22,0" fill="#C86D2D" />
          <line
            x1="22"
            y1="1"
            x2="75"
            y2="18"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="22"
            y1="1"
            x2="6"
            y2="18"
            stroke="#94a3b8"
            strokeWidth="1"
          />

          {/* Horizontal Jib Boom */}
          <rect
            x="18"
            y="18"
            width="78"
            height="5"
            fill="none"
            stroke="#C86D2D"
            strokeWidth="1.8"
          />
          {Array.from({ length: 8 }).map((_, idx) => (
            <line
              key={idx}
              x1={26 + idx * 9}
              y1="18"
              x2={31 + idx * 9}
              y2="23"
              stroke="#f59e0b"
              strokeWidth="1.1"
            />
          ))}

          {/* Operator Cab */}
          <rect x="25" y="24" width="8" height="8" rx="1.5" fill="#f8fafc" />
          <rect x="27" y="25.5" width="5" height="4" fill="#0ea5e9" />

          {/* Scroll-Controlled Jib Trolley + Hoist Cable + Precast Concrete Block */}
          <motion.g style={{ x: trolleyX }}>
            {/* Trolley Car */}
            <rect x="-5" y="22" width="10" height="4" rx="1" fill="#f59e0b" />
            {/* Dynamic Hoist Wire */}
            <motion.line
              x1="0"
              y1="26"
              x2="0"
              y2={useTransform(cableLength, (l) => 26 + l)}
              stroke="#e2e8f0"
              strokeWidth="1.2"
              strokeDasharray="2 1"
            />
            {/* Hook & Suspended Precast Concrete Element */}
            <motion.g style={{ y: cableLength }}>
              <circle cx="0" cy="28" r="2.5" fill="#f59e0b" />
              <rect
                x="-11"
                y="31"
                width="22"
                height="11"
                rx="1.5"
                fill="#00684A"
                stroke="#a7f3d0"
                strokeWidth="1"
              />
              <text
                x="0"
                y="38.5"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="5"
                fontWeight="bold"
              >
                AID R+2
              </text>
            </motion.g>
          </motion.g>
        </svg>

        <div className="mt-1 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
          <span>LOAD: 12.4T</span>
          <span className="text-emerald-400 font-bold">ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// NEW 3: SCROLL-DRIVEN INTERACTIVE CONSTRUCTION SITE PANORAMA SECTION
// ============================================================================
const ConstructionPanoramaSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
  });

  // 1. Heavy Dump Truck drives across the site road from left to right
  const truckX = useTransform(smoothScroll, [0.05, 0.85], [-180, 620]);
  const truckWheelRot = useTransform(smoothScroll, [0.05, 0.85], [0, 1080]);
  const dumpBedTilt = useTransform(
    smoothScroll,
    [0.15, 0.35, 0.55],
    [0, -22, 0],
  );

  // 2. Excavator Boom & Bucket dig as user scrolls
  const boomRotate = useTransform(
    smoothScroll,
    [0.1, 0.35, 0.6, 0.85],
    [-12, 18, -18, 8],
  );
  const stickRotate = useTransform(
    smoothScroll,
    [0.1, 0.35, 0.6, 0.85],
    [20, -35, 25, -15],
  );
  const bucketRotate = useTransform(
    smoothScroll,
    [0.1, 0.35, 0.6, 0.85],
    [-15, 45, -30, 20],
  );

  // 3. R+2 Building floors rise progressively with scroll
  const floor1Scale = useTransform(smoothScroll, [0.12, 0.32], [0, 1]);
  const floor2Scale = useTransform(smoothScroll, [0.28, 0.48], [0, 1]);
  const floor3Scale = useTransform(smoothScroll, [0.44, 0.66], [0, 1]);
  const roofTrussY = useTransform(smoothScroll, [0.55, 0.78], [-60, 0]);
  const roofTrussOpacity = useTransform(smoothScroll, [0.55, 0.75], [0, 1]);

  // 4. Site Tower Crane Hoist & Trolley
  const siteTrolleyX = useTransform(smoothScroll, [0.1, 0.75], [-95, 25]);
  const siteHookY = useTransform(smoothScroll, [0.1, 0.45, 0.75], [20, 75, 35]);

  // Live percentage readout
  const [completionPct, setCompletionPct] = useState(12);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const clamped = Math.min(Math.max((v - 0.1) / 0.7, 0), 1);
    setCompletionPct(Math.round(clamped * 100));
  });

  return (
    <section
      id="site-sim"
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden border-b-4 border-[#C86D2D] blueprint-grid-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Engineering Telemetry Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-[#C86D2D]" />
              <span>Interactive Scroll-Driven Engineering Simulation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              <RevealWords text="Watch Our Construction Site Come Alive As You Scroll" />
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Scroll up and down to operate our heavy earthmoving fleet, erect
              the R+2 reinforced concrete structure, and haul aggregate across
              the Lubumbashi jobsite.
            </p>
          </div>

          {/* Live Telemetry Gauges */}
          <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-5 py-3.5 rounded-2xl shrink-0">
            <Gauge className="w-8 h-8 text-[#C86D2D]" />
            <div>
              <div className="text-[11px] font-mono uppercase text-slate-400">
                Structural Erection Progress
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {completionPct}% COMPLETE
              </div>
            </div>
          </div>
        </div>

        {/* Interactive SVG Construction Site Stage */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden p-4 sm:p-6">
          {/* Blueprint Corner Coordinates */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-emerald-400/80 pb-3 border-b border-slate-800/80">
            <span>SITE: LUBUMBASHI R+2 COMPLEX • SECTOR: HAUT-KATANGA</span>
            <span>
              GPS: 11°39&apos;57&quot;S 27°28&apos;35&quot;E • ARMP VERIFIED
            </span>
          </div>

          <div className="relative w-full overflow-hidden pt-4">
            <svg
              viewBox="0 0 1100 420"
              className="w-full h-[270px] sm:h-[360px] lg:h-[420px] select-none"
              preserveAspectRatio="xMidYMax meet"
            >
              <defs>
                <linearGradient id="skyGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#022c22" stopOpacity="0.4" />
                </linearGradient>
                <pattern
                  id="steelGrid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 20 M 0 0 L 20 20"
                    stroke="#10b981"
                    strokeWidth="1.2"
                    strokeOpacity="0.45"
                  />
                </pattern>
              </defs>

              {/* Background Sky & Distant City Silhouette */}
              <rect
                x="0"
                y="0"
                width="1100"
                height="350"
                fill="url(#skyGlow)"
              />
              <g opacity="0.18" fill="#1e293b">
                <rect x="40" y="210" width="55" height="140" />
                <rect x="105" y="240" width="45" height="110" />
                <rect x="920" y="220" width="60" height="130" />
                <rect x="990" y="190" width="70" height="160" />
              </g>

              {/* ============================================================
                  ZONE 1 (LEFT): HYDRAULIC EXCAVATOR DIGGING EARTHWORKS
                  ============================================================ */}
              <g transform="translate(145, 295)">
                {/* Earth Mound / Aggregate Pile */}
                <path
                  d="M -135 55 Q -75 5 -15 55 Z"
                  fill="#78350f"
                  stroke="#C86D2D"
                  strokeWidth="2"
                />
                <path d="M -105 55 Q -60 22 -20 55 Z" fill="#92400e" />

                {/* Excavator Tracks */}
                <rect
                  x="0"
                  y="32"
                  width="92"
                  height="22"
                  rx="11"
                  fill="#1e293b"
                  stroke="#64748b"
                  strokeWidth="2.5"
                />
                {[14, 32, 50, 68, 78].map((cx, i) => (
                  <circle key={i} cx={cx} cy="43" r="6" fill="#475569" />
                ))}

                {/* Excavator House / Cab */}
                <rect
                  x="10"
                  y="0"
                  width="68"
                  height="32"
                  rx="5"
                  fill="#C86D2D"
                />
                <rect
                  x="16"
                  y="5"
                  width="24"
                  height="18"
                  rx="3"
                  fill="#0f172a"
                />
                <text
                  x="55"
                  y="20"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                >
                  AID
                </text>

                {/* Articulated Main Boom (Scroll-Driven) */}
                <motion.g
                  style={{
                    rotate: boomRotate,
                    originX: "20px",
                    originY: "14px",
                  }}
                >
                  <path
                    d="M 20 14 L -35 -45 L -22 -52 L 30 8 Z"
                    fill="#f59e0b"
                    stroke="#78350f"
                    strokeWidth="1.5"
                  />
                  {/* Forearm Stick */}
                  <motion.g
                    style={{
                      rotate: stickRotate,
                      originX: "-28px",
                      originY: "-48px",
                    }}
                  >
                    <rect
                      x="-34"
                      y="-48"
                      width="11"
                      height="64"
                      rx="4"
                      fill="#C86D2D"
                    />
                    {/* Digging Bucket */}
                    <motion.g
                      style={{
                        rotate: bucketRotate,
                        originX: "-28px",
                        originY: "14px",
                      }}
                    >
                      <path
                        d="M -28 14 L -52 14 Q -56 36 -30 34 L -22 22 Z"
                        fill="#334155"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                    </motion.g>
                  </motion.g>
                </motion.g>
              </g>

              {/* ============================================================
                  ZONE 2 (CENTER-RIGHT): R+2 PALAIS DE JUSTICE BUILDING ERECTION
                  ============================================================ */}
              <g transform="translate(560, 0)">
                {/* Reinforced Concrete Foundation Pad */}
                <rect
                  x="0"
                  y="336"
                  width="270"
                  height="16"
                  rx="2"
                  fill="#334155"
                  stroke="#10b981"
                  strokeWidth="1.5"
                />
                <text
                  x="135"
                  y="347"
                  textAnchor="middle"
                  fill="#a7f3d0"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  SEISMIC FOUNDATION SLAB • ISO 9001
                </text>

                {/* FLOOR 1 (Ground Level - Scales Up First) */}
                <motion.g
                  style={{
                    scaleY: floor1Scale,
                    originX: "135px",
                    originY: "336px",
                  }}
                >
                  <rect
                    x="12"
                    y="270"
                    width="246"
                    height="66"
                    fill="#064e3b"
                    fillOpacity="0.75"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  {[35, 80, 125, 170, 215].map((wx, idx) => (
                    <rect
                      key={idx}
                      x={wx}
                      y="282"
                      width="24"
                      height="42"
                      rx="2"
                      fill="#022c22"
                      stroke="#34d399"
                      strokeWidth="1.2"
                    />
                  ))}
                  <text
                    x="248"
                    y="265"
                    textAnchor="end"
                    fill="#34d399"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    LEVEL R+0
                  </text>
                </motion.g>

                {/* FLOOR 2 (First Floor - Scales Up Second) */}
                <motion.g
                  style={{
                    scaleY: floor2Scale,
                    originX: "135px",
                    originY: "270px",
                  }}
                >
                  <rect
                    x="12"
                    y="204"
                    width="246"
                    height="66"
                    fill="#065f46"
                    fillOpacity="0.8"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  {[35, 80, 125, 170, 215].map((wx, idx) => (
                    <rect
                      key={idx}
                      x={wx}
                      y="216"
                      width="24"
                      height="42"
                      rx="2"
                      fill="#0f172a"
                      stroke="#fbbf24"
                      strokeWidth="1.2"
                    />
                  ))}
                  <text
                    x="248"
                    y="199"
                    textAnchor="end"
                    fill="#fbbf24"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    LEVEL R+1
                  </text>
                </motion.g>

                {/* FLOOR 3 (Second Floor R+2 - Scales Up Third) */}
                <motion.g
                  style={{
                    scaleY: floor3Scale,
                    originX: "135px",
                    originY: "204px",
                  }}
                >
                  <rect
                    x="12"
                    y="138"
                    width="246"
                    height="66"
                    fill="url(#steelGrid)"
                    stroke="#C86D2D"
                    strokeWidth="2.2"
                  />
                  {[35, 80, 125, 170, 215].map((wx, idx) => (
                    <rect
                      key={idx}
                      x={wx}
                      y="150"
                      width="24"
                      height="40"
                      rx="2"
                      fill="#1e293b"
                      fillOpacity="0.85"
                      stroke="#f59e0b"
                      strokeWidth="1.2"
                    />
                  ))}
                  <text
                    x="248"
                    y="133"
                    textAnchor="end"
                    fill="#f59e0b"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    LEVEL R+2
                  </text>
                </motion.g>

                {/* Crown Pediment / Roof Truss Lowered into Place */}
                <motion.g style={{ y: roofTrussY, opacity: roofTrussOpacity }}>
                  <polygon
                    points="4,138 135,96 266,138"
                    fill="#00684A"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                  <rect
                    x="75"
                    y="118"
                    width="120"
                    height="15"
                    rx="3"
                    fill="#0f172a"
                  />
                  <text
                    x="135"
                    y="129"
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontSize="8.5"
                    fontWeight="bold"
                  >
                    PALAIS DE JUSTICE • AID
                  </text>
                </motion.g>
              </g>

              {/* ============================================================
                  ZONE 3: GIANT TOWER CRANE OVERSEING THE R+2 STRUCTURE
                  ============================================================ */}
              <g transform="translate(885, 0)">
                {/* Crane Base & Mast */}
                <rect x="-18" y="332" width="36" height="18" fill="#475569" />
                <rect
                  x="-10"
                  y="38"
                  width="20"
                  height="294"
                  fill="url(#steelGrid)"
                  stroke="#00684A"
                  strokeWidth="2.5"
                />
                {/* Slewing Unit & Jib Boom */}
                <polygon points="-12,38 12,38 0,14" fill="#C86D2D" />
                <line
                  x1="0"
                  y1="15"
                  x2="-210"
                  y2="42"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <line
                  x1="0"
                  y1="15"
                  x2="75"
                  y2="42"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                {/* Main Horizontal Jib */}
                <rect
                  x="-265"
                  y="42"
                  width="355"
                  height="9"
                  fill="url(#steelGrid)"
                  stroke="#C86D2D"
                  strokeWidth="2"
                />
                {/* Counterweight Blocks */}
                <rect
                  x="58"
                  y="51"
                  width="24"
                  height="18"
                  rx="2"
                  fill="#f59e0b"
                />

                {/* Moving Trolley & Suspended Steel Girder */}
                <motion.g style={{ x: siteTrolleyX }}>
                  <rect
                    x="-165"
                    y="50"
                    width="22"
                    height="7"
                    rx="2"
                    fill="#f59e0b"
                  />
                  <motion.line
                    x1="-154"
                    y1="57"
                    x2="-154"
                    y2={useTransform(siteHookY, (v) => 57 + v)}
                    stroke="#e2e8f0"
                    strokeWidth="1.8"
                  />
                  <motion.g style={{ y: siteHookY }}>
                    <line
                      x1="-154"
                      y1="57"
                      x2="-184"
                      y2="72"
                      stroke="#fbbf24"
                      strokeWidth="1.4"
                    />
                    <line
                      x1="-154"
                      y1="57"
                      x2="-124"
                      y2="72"
                      stroke="#fbbf24"
                      strokeWidth="1.4"
                    />
                    {/* Suspended Steel I-Beam */}
                    <rect
                      x="-200"
                      y="72"
                      width="92"
                      height="12"
                      rx="2"
                      fill="#C86D2D"
                      stroke="#fde68a"
                      strokeWidth="1.5"
                    />
                    <text
                      x="-154"
                      y="81"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="7"
                      fontWeight="bold"
                    >
                      AID STEEL BEAM
                    </text>
                  </motion.g>
                </motion.g>
              </g>

              {/* ============================================================
                  ZONE 4 (BOTTOM): PAVED ASPHALT ROAD + MOVING DUMP TRUCK
                  ============================================================ */}
              <g transform="translate(0, 350)">
                {/* Road Sub-base & Hot-Mix Asphalt Surface */}
                <rect x="0" y="0" width="1100" height="70" fill="#1e293b" />
                <line
                  x1="0"
                  y1="3"
                  x2="1100"
                  y2="3"
                  stroke="#00684A"
                  strokeWidth="4"
                />
                <line
                  x1="0"
                  y1="36"
                  x2="1100"
                  y2="36"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeDasharray="28 20"
                />

                {/* Scroll-Driven Heavy Dump Truck */}
                <motion.g style={{ x: truckX }} transform="translate(180, -32)">
                  {/* Tilting Dump Bed */}
                  <motion.g
                    style={{
                      rotate: dumpBedTilt,
                      originX: "18px",
                      originY: "42px",
                    }}
                  >
                    {/* Aggregate Load Inside Bed */}
                    <path d="M 14 14 Q 45 -2 78 14 Z" fill="#d97706" />
                    <polygon
                      points="6,12 88,12 82,42 12,42"
                      fill="#00684A"
                      stroke="#34d399"
                      strokeWidth="2"
                    />
                    <text
                      x="47"
                      y="31"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      AID FLEET
                    </text>
                  </motion.g>

                  {/* Truck Cab & Chassis */}
                  <rect
                    x="10"
                    y="42"
                    width="108"
                    height="8"
                    rx="2"
                    fill="#334155"
                  />
                  <path
                    d="M 88 18 L 114 18 L 122 32 L 122 48 L 88 48 Z"
                    fill="#C86D2D"
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                  />
                  <polygon points="94,22 111,22 117,32 94,32" fill="#bae6fd" />

                  {/* Rotating Heavy-Duty Wheels */}
                  {[26, 52, 104].map((wx, i) => (
                    <motion.g
                      key={i}
                      style={{
                        rotate: truckWheelRot,
                        originX: `${wx}px`,
                        originY: "52px",
                      }}
                    >
                      <circle
                        cx={wx}
                        cy="52"
                        r="11"
                        fill="#0f172a"
                        stroke="#94a3b8"
                        strokeWidth="3"
                      />
                      <line
                        x1={wx - 7}
                        y1="52"
                        x2={wx + 7}
                        y2="52"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                      <line
                        x1={wx}
                        y1="45"
                        x2={wx}
                        y2="59"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                    </motion.g>
                  ))}
                </motion.g>
              </g>
            </svg>
          </div>

          {/* Interactive Legend Bar */}
          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C86D2D]" />
              <span>Excavator: Geotechnical Earthworks</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>R+2 Complex: Progressive Floor Erection</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Tower Crane: Heavy Structural Hoist</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span>65+ Fleet: Autonomous Haulage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// NEW 4: SCROLL-LINKED ROAD PAVER & ASPHALT ROLLER SECTION DIVIDER
// ============================================================================
const RoadPaverDivider = ({
  label = "URBAN ROADWAY & HOT-MIX ASPHALT DIVISION",
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const paverX = useTransform(scrollYProgress, [0, 1], ["-10%", "85%"]);
  const asphaltWidth = useTransform(scrollYProgress, [0, 1], ["5%", "95%"]);

  return (
    <div
      ref={ref}
      className="relative h-20 bg-slate-900 border-y border-slate-800 overflow-hidden flex items-center select-none"
    >
      {/* Newly laid asphalt mat that grows with scroll */}
      <motion.div
        style={{ width: asphaltWidth }}
        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-slate-950 via-slate-900 to-[#00684A]/40 border-r-4 border-[#C86D2D]"
      >
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 opacity-70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #f59e0b 0, #f59e0b 24px, transparent 24px, transparent 48px)",
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex items-center justify-between pointer-events-none">
        <span className="px-3 py-1 rounded bg-slate-950/90 border border-slate-700 text-[11px] font-mono font-bold text-amber-300 tracking-wider">
          {label}
        </span>
        <span className="hidden sm:inline-block px-3 py-1 rounded bg-slate-950/90 border border-slate-700 text-[11px] font-mono text-emerald-400">
          SCROLL TO COMPACT SUB-BASE
        </span>
      </div>

      {/* Moving Heavy Asphalt Paver Machine */}
      <motion.div
        style={{ left: paverX }}
        className="absolute bottom-1 z-20 pointer-events-none"
      >
        <svg width="110" height="52" viewBox="0 0 120 56">
          {/* Screed & Hopper */}
          <polygon points="8,26 42,16 42,40 8,40" fill="#00684A" />
          <rect x="42" y="10" width="44" height="30" rx="3" fill="#C86D2D" />
          <rect x="52" y="14" width="22" height="14" rx="2" fill="#fde68a" />
          {/* Canopy */}
          <rect x="46" y="4" width="34" height="4" rx="1" fill="#0f172a" />
          {/* Crawler Tracks */}
          <rect
            x="36"
            y="38"
            width="54"
            height="12"
            rx="6"
            fill="#1e293b"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <circle cx="46" cy="44" r="4" fill="#f59e0b" />
          <circle cx="63" cy="44" r="4" fill="#f59e0b" />
          <circle cx="80" cy="44" r="4" fill="#f59e0b" />
        </svg>
      </motion.div>
    </div>
  );
};

// ============================================================================
// SIDE DOT NAVIGATION
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

// ============================================================================
// HEADER
// ============================================================================
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
// 1. HERO (WITH ANIMATED SKYLINE CRANE SILHOUETTE)
// ============================================================================
const HeroSection = ({ scrollToSection }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const craneBoomShift = useTransform(scrollYProgress, [0, 1], [0, 45]);

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
    >
      <motion.div
        style={{ y: bgY, opacity: fade }}
        className="absolute inset-0 bg-cover bg-center scale-110"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 2, ease: EASE }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb18086f6?auto=format&fit=crop&w=1920&q=85')`,
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#003928]/95 via-[#004D36]/85 to-slate-950/90" />

      {/* Scroll-Parallax Background Construction Cranes */}
      <motion.svg
        style={{ x: craneBoomShift }}
        viewBox="0 0 600 320"
        className="absolute right-0 top-6 w-[480px] h-[260px] opacity-15 pointer-events-none hidden lg:block"
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

      {/* Floating decorative blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl blob-anim pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-orange-500/10 blur-3xl blob-anim-delay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
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

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg text-emerald-50/90 max-w-2xl leading-relaxed"
            >
              Africa Infrastructures Développement SARL (AID) is a premier civil
              engineering, building construction, and urban road modernization
              company delivering landmark institutional and industrial projects
              across the Democratic Republic of the Congo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7, ease: EASE }}
              className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border-l-4 border-[#C86D2D] max-w-xl"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Landmark Achievement • Lubumbashi
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                Constructor of the New Palais de Justice of Lubumbashi (R+2) &
                Provincial Road Modernization
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
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
            </motion.div>
          </div>

          <motion.div style={{ y: cardY }} className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, rotateY: -25, x: 60 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ transformStyle: "preserve-3d" }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-t-8 border-[#C86D2D] text-slate-900 relative"
            >
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
            </motion.div>
          </motion.div>
        </div>

        <motion.button
          onClick={() => scrollToSection("site-sim")}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:flex items-center gap-2 mx-auto mt-16 text-emerald-200/70 text-xs font-semibold"
        >
          <MousePointer2 className="w-4 h-4" />
          Scroll to operate live construction site
        </motion.button>
      </div>
    </section>
  );
};

// ============================================================================
// 2. ABOUT
// ============================================================================
const AboutSection = () => {
  const imgRef = useRef(null);
  const isInView = useInView(imgRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-white overflow-hidden blueprint-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#00684A] text-xs font-extrabold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>About AID SARL</span>
              </div>
            </FadeUp>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              <RevealWords text="Pioneering Infrastructure Development in the DRC" />
            </h2>
            <FadeUp delay={0.1}>
              <p className="text-slate-600 leading-relaxed">
                Founded with a vision to modernize Africa&apos;s structural
                backbone, Africa Infrastructures Développement SARL brings
                together world-class engineering, local expertise, and an
                unwavering commitment to quality.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-slate-600 leading-relaxed">
                We specialize in executing complex public procurement contracts,
                managing end-to-end heavy civil engineering projects from
                architectural design to turnkey delivery, ensuring full
                compliance with the ARMP regulatory framework.
              </p>
            </FadeUp>
            <StaggerGroup
              className="grid grid-cols-2 gap-6 pt-4"
              stagger={0.15}
            >
              <StaggerItem className="border-l-4 border-[#00684A] pl-4 bg-white/80 p-3 rounded-r-xl">
                <div className="text-2xl font-extrabold text-slate-900">
                  Vision
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  To be the undeniable leader in sustainable civil works across
                  Central Africa.
                </p>
              </StaggerItem>
              <StaggerItem className="border-l-4 border-[#C86D2D] pl-4 bg-white/80 p-3 rounded-r-xl">
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
            <div
              ref={imgRef}
              className="relative overflow-hidden rounded-3xl shadow-2xl"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                alt="Engineering Team"
                initial={{ scale: 1.3 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.2, ease: EASE }}
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ x: "0%" }}
                animate={isInView ? { x: "100%" } : {}}
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-0 bg-slate-950 z-10"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
              className="absolute -bottom-6 -left-6 bg-[#00684A] text-white p-6 rounded-3xl shadow-xl hidden md:block border-2 border-amber-400/40"
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
// 3. SERVICES — Sticky scrolly-telling + Rotating Survey Theodolite
// ============================================================================
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#00684A] transition-all group overflow-hidden"
    >
      <span className="absolute -right-4 -top-6 text-[7rem] font-black text-slate-50 select-none leading-none pointer-events-none group-hover:text-emerald-50 transition-colors">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
          service.accent === "green"
            ? "bg-emerald-50 text-[#00684A] group-hover:bg-[#00684A] group-hover:text-white"
            : "bg-orange-50 text-[#C86D2D] group-hover:bg-[#C86D2D] group-hover:text-white"
        }`}
      >
        <service.icon className="w-7 h-7" />
      </div>
      <h3 className="relative text-xl font-extrabold text-slate-900 mb-3">
        {service.title}
      </h3>
      <p className="relative text-sm text-slate-600 mb-6 leading-relaxed">
        {service.shortDesc}
      </p>
      <ul className="relative space-y-2">
        {service.highlights.map((highlight, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-slate-700"
          >
            <Check
              className={`w-4 h-4 mt-0.5 shrink-0 ${
                service.accent === "green" ? "text-[#00684A]" : "text-[#C86D2D]"
              }`}
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const ServicesSection = () => {
  const secRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start end", "end start"],
  });
  const dialRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

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
                  <span>Our Expertise</span>
                </div>
              </FadeUp>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                <RevealWords text="Comprehensive Engineering Services" />
              </h2>
              <FadeUp delay={0.1}>
                <p className="text-slate-600">
                  From heavy earthmoving and highway construction to multi-story
                  structural engineering, we deliver precision at every scale.
                  Scroll to walk through our core capabilities.
                </p>
              </FadeUp>

              {/* Scroll-Driven Survey Theodolite / Compass Widget */}
              <div className="hidden lg:flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm mt-6">
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
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900">
                    Topographical Laser Alignment
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    Survey reticle calibrates with your scroll position.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {SERVICES_DATA.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 4. INDUSTRIES — 3D tilt cards
// ============================================================================
const IndustriesSection = () => (
  <section
    id="industries"
    className="py-20 lg:py-28 bg-white border-t border-slate-200"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#00684A] text-xs font-extrabold uppercase tracking-wider mx-auto">
            <Factory className="w-4 h-4" />
            <span>Sectors We Serve</span>
          </div>
        </FadeUp>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          <RevealWords text="Core Infrastructure Industries" />
        </h2>
        <FadeUp delay={0.15}>
          <p className="text-slate-600">
            Driving development and economic growth across diverse sectors in
            the Democratic Republic of the Congo.
          </p>
        </FadeUp>
      </div>

      <StaggerGroup
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        stagger={0.12}
      >
        {INDUSTRIES_DATA.map((industry, i) => (
          <StaggerItem key={industry.id}>
            <TiltCard className="relative p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#00684A] transition-colors group h-full overflow-hidden">
              <span className="absolute -right-3 -bottom-4 text-7xl font-black text-slate-100 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-[#C86D2D] group-hover:bg-[#00684A] group-hover:text-white transition-colors">
                <industry.icon className="w-7 h-7" />
              </div>
              <h3 className="relative text-xl font-extrabold text-slate-900 mb-3">
                {industry.title}
              </h3>
              <p className="relative text-sm text-slate-600 leading-relaxed">
                {industry.description}
              </p>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

// ============================================================================
// 5. OUR WORK — Pinned horizontal scroll gallery + Moving Overhead Gantry
// ============================================================================
const GalleryCard = ({ item, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "0px -10% 0px -10%" }}
    transition={{ duration: 0.5, ease: EASE }}
    onClick={onClick}
    className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 hover:border-[#C86D2D] transition-colors duration-300 flex flex-col justify-between shadow-lg shrink-0 w-[78vw] sm:w-[360px]"
  >
    <div className="relative h-56 overflow-hidden bg-slate-950">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#00684A]/95 text-white text-[11px] font-bold shadow">
        {item.category}
      </span>
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <div className="p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-amber-300 font-semibold">
        <span className="flex items-center gap-1 truncate">
          <MapPin className="w-3 h-3 shrink-0 text-[#C86D2D]" />
          {item.location}
        </span>
        <span className="px-2 py-0.5 rounded bg-black/60 text-white shrink-0">
          {item.year}
        </span>
      </div>
    </div>
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
          {item.badge}
        </div>
        <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-700/70 flex items-center justify-between text-[11px]">
        <span className="text-slate-300 font-semibold">{item.budget}</span>
        <span className="text-[#C86D2D] font-bold flex items-center gap-1">
          Inspect <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </motion.div>
);

const HorizontalScrollGallery = ({ items, onItemClick }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  const measure = useCallback(() => {
    if (trackRef.current) {
      setTrackWidth(
        Math.max(trackRef.current.scrollWidth - window.innerWidth, 0),
      );
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items, measure]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -trackWidth]);
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.3 });
  const gantryX = useTransform(scrollYProgress, [0, 1], ["5%", "88%"]);

  const pinHeight = Math.max(items.length * 55, 180);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${pinHeight}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Overhead Gantry Crane Rail that tracks horizontal scroll */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-6">
          <div className="relative h-3 bg-slate-800 rounded-full border border-slate-700">
            <motion.div
              style={{ left: gantryX }}
              className="absolute -top-3 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="px-2.5 py-0.5 rounded bg-[#C86D2D] text-[10px] font-mono font-bold text-white shadow">
                GANTRY HOIST
              </div>
              <div className="w-3 h-3 rounded-full bg-amber-300 border-2 border-slate-900" />
            </motion.div>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x: springX }}
          className="flex gap-6 pl-4 sm:pl-6 pr-[20vw] will-change-transform"
        >
          {items.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => onItemClick(item)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const WorkGallerySection = ({
  galleryItems,
  categories,
  selectedCategory,
  setSelectedCategory,
  filteredGallery,
  setLightboxItem,
}) => (
  <section id="work" className="py-20 lg:py-16 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C86D2D]/20 border border-[#C86D2D]/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <ImageIcon className="w-4 h-4 text-[#C86D2D]" />
              <span>Project Portfolio & Visual Showcase</span>
            </div>
          </FadeUp>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
            <RevealWords text="Our Work: Infrastructure in Action" />
          </h2>
          <FadeUp delay={0.1}>
            <p className="text-slate-300 mt-2 max-w-2xl text-sm sm:text-base">
              Explore our completed institutional buildings, urban road asphalt
              works, hydraulic drainage systems, and heavy machinery fleet
              across the DRC. Keep scrolling — the overhead gantry moves with
              you.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
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
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
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
        <div className="text-xs text-slate-400">
          Showing {filteredGallery.length} project showcase image(s) • Scroll
          down to pan through • Click any photo to enlarge
        </div>
      </div>
    </div>

    <div className="mt-4">
      <HorizontalScrollGallery
        key={selectedCategory}
        items={filteredGallery}
        onItemClick={setLightboxItem}
      />
    </div>
  </section>
);

// ============================================================================
// 6. INSIGHTS
// ============================================================================
const InsightsSection = () => (
  <section
    id="insights"
    className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-[#C86D2D] text-xs font-extrabold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>News & Perspectives</span>
            </div>
          </FadeUp>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            <RevealWords text="Company Insights" />
          </h2>
        </div>
        <MagneticButton className="text-[#00684A] font-bold text-sm flex items-center gap-1.5 hover:text-[#004D36] transition-colors">
          View All News <ArrowUpRight className="w-4 h-4" />
        </MagneticButton>
      </div>

      <StaggerGroup className="grid md:grid-cols-3 gap-8" stagger={0.15}>
        {INSIGHTS_DATA.map((insight) => (
          <StaggerItem key={insight.id}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[11px] font-bold text-[#00684A] shadow-sm">
                  {insight.tag}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-semibold mb-2">
                    {insight.date}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight mb-3 hover:text-[#C86D2D] transition-colors cursor-pointer">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3">
                    {insight.excerpt}
                  </p>
                </div>
                <button className="mt-6 text-[#00684A] font-bold text-sm flex items-center gap-1.5 group">
                  Read Article{" "}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

// ============================================================================
// 7. RESOURCES
// ============================================================================
const ResourcesSection = () => (
  <section
    id="resources"
    className="py-20 lg:py-28 bg-white border-t border-slate-200"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C86D2D]/10 text-[#C86D2D] text-xs font-extrabold uppercase tracking-wider mx-auto">
            <BookOpen className="w-4 h-4" />
            <span>Downloads & Documentation</span>
          </div>
        </FadeUp>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          <RevealWords text="Corporate Resources" />
        </h2>
        <FadeUp delay={0.1}>
          <p className="text-slate-600">
            Access our latest brochures, compliance policies, and technical case
            studies.
          </p>
        </FadeUp>
      </div>

      <StaggerGroup
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        stagger={0.1}
      >
        {RESOURCES_DATA.map((resource) => (
          <StaggerItem key={resource.id}>
            <MagneticButton
              strength={0.15}
              className="w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-[#00684A] transition-colors flex flex-col items-center text-center group cursor-pointer"
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
              <div className="text-xs text-slate-500 mb-4">
                {resource.type} • {resource.size}
              </div>
              <div className="mt-auto px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 group-hover:bg-[#C86D2D] group-hover:border-[#C86D2D] group-hover:text-white transition-all">
                Download
              </div>
            </MagneticButton>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

// ============================================================================
// 8. COMPANY / ARMP — animated SVG timeline
// ============================================================================
const CertTimelineItem = ({ cert, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="p-5 hover:bg-slate-50 transition relative"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
        <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-[#00684A] font-mono text-xs font-bold">
          {cert.ref}
        </span>
        <span className="text-xs font-extrabold text-[#C86D2D] bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
          {cert.amount}
        </span>
      </div>
      <h4 className="font-bold text-slate-900 text-sm">{cert.project}</h4>
      <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-slate-500">
        <span>{cert.authority}</span>
        <span className="text-emerald-700 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> {cert.status} ({cert.year})
        </span>
      </div>
    </motion.div>
  );
};

const CompanySection = () => {
  const panelRef = useRef(null);
  const isInView = useInView(panelRef, { once: true, margin: "-100px" });

  return (
    <section
      id="company"
      className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200 blueprint-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#00684A] text-xs font-extrabold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Corporate Governance & Credentials</span>
              </div>
            </FadeUp>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              <RevealWords text="Verified Public Works Track Record (ARMP DRC)" />
            </h2>
            <FadeUp delay={0.1}>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Africa Infrastructures Développement SARL operates with full
                regulatory compliance under the Autorité de Régulation des
                Marchés Publics (ARMP). Our public contracts are backed by
                official regulatory attestations, demonstrating our commitment
                to Transparency, Equity, and Probity.
              </p>
            </FadeUp>
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#00684A] to-[#004D36] text-white shadow-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Official Registration
                </span>
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-lg font-extrabold">
                AFRICA INFRASTRUCTURES DÉVELOPPEMENT SARL
              </div>
              <div className="text-xs text-emerald-100 space-y-1">
                <div>
                  • Forme Juridique : Société à Responsabilité Limitée (SARL)
                </div>
                <div>
                  • Siège Opérationnel : Lubumbashi, Province du Haut-Katanga,
                  RDC
                </div>
                <div>
                  • Certificats ARMP : N° 024/2025, N° 038/2025, N° 137–142/2024
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <FadeUp
              delay={0.15}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
            >
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b-4 border-[#C86D2D]">
                <div>
                  <h3 className="font-bold text-base">
                    Verified Public Contracts & ARMP Attestations
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fetched from official DRC public procurement records
                  </p>
                </div>
                <FileCheck className="w-6 h-6 text-[#C86D2D]" />
              </div>
              <div className="divide-y divide-slate-200">
                {ARMP_CERTIFICATES.map((cert, index) => (
                  <CertTimelineItem key={index} cert={cert} index={index} />
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 9. CONTACT
// ============================================================================
const ContactSection = ({
  contactForm,
  setContactForm,
  contactSubmitted,
  setContactSubmitted,
  handleContactSubmit,
}) => (
  <section
    id="contact"
    className="py-20 lg:py-28 bg-slate-100 border-t border-slate-200"
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
          <FadeUp delay={0.1}>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Contact our engineering and tender desk for public procurement
              bids, private building contracts, road construction, or civil
              engineering consultations.
            </p>
          </FadeUp>
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

        <div className="lg:col-span-7">
          <FadeUp
            delay={0.1}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200"
          >
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              Request a Quote or Tender Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Fill out the project specifications below and our engineering desk
              will respond promptly.
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
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 16,
                      delay: 0.1,
                    }}
                    className="w-14 h-14 rounded-full bg-[#00684A] text-white flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
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
                    strength={0.1}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00684A] to-[#00523A] hover:from-[#00523A] hover:to-[#003E2C] text-white font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Submit Project Inquiry to AID SARL</span>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeUp>
        </div>
      </div>
    </div>
  </section>
);

// ============================================================================
// FOOTER
// ============================================================================
const Footer = ({ scrollToSection }) => (
  <footer className="bg-slate-950 text-slate-400">
    {/* Animated Hazard Stripe Bar */}
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
// MAIN LANDING COMPONENT
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
    projectType: "Civil Engineering & Buildings",
    message: "",
  });

  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.id);
      const scrollPos = window.scrollY + 180;
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const categories = [
    "All",
    "Buildings",
    "Roads & Asphalt",
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
      <ScrollProgressBar />
      <ScrollTowerCraneHUD />
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
      <ConstructionPanoramaSection />
      <AboutSection />
      <RoadPaverDivider label="HIGHWAY & URBAN ASPHALT PAVING FLEET • HAUT-KATANGA" />
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
      <RoadPaverDivider label="PUBLIC INFRASTRUCTURE & DRAINAGE ENGINEERING • OVD / ARMP" />
      <InsightsSection />
      <ResourcesSection />
      <CompanySection />
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
