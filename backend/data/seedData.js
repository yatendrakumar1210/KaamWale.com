export const initialCities = [
  {
    id: "city-1",
    name: "Bulandshahr",
    state: "Uttar Pradesh",
    serviceAreas: ["Civil Lines", "Yamunapuram", "DM Colony", "Awas Vikas", "Bhoor", "Khurja Road", "Industrial Area"],
    pinCodes: ["203001", "203002", "203131"],
    active: true
  },
  {
    id: "city-2",
    name: "Noida",
    state: "Uttar Pradesh",
    serviceAreas: ["Sector 18", "Sector 62", "Sector 137", "Greater Noida West", "Sector 15"],
    pinCodes: ["201301", "201309"],
    active: true
  },
  {
    id: "city-3",
    name: "Delhi NCR",
    state: "Delhi",
    serviceAreas: ["Connaught Place", "Okhla Industrial Area", "Lajpat Nagar", "Dwarka", "Rohini"],
    pinCodes: ["110001", "110020"],
    active: true
  }
];

export const initialServices = [
  // Majdoor Category
  { id: "srv-1", name: "General Labour", category: "majdoor", icon: "HardHat", description: "General unskilled labour for manual work, site cleanup, and helper tasks.", active: true, popular: true },
  { id: "srv-2", name: "Construction Labour", category: "majdoor", icon: "Building2", description: "Experienced labour for concrete mixing, brick carrying, scaffolding, and site work.", active: true, popular: true },
  { id: "srv-3", name: "Loading / Unloading", category: "majdoor", icon: "Truck", description: "Heavy lifting helpers for trucks, containers, warehouses, and freight handling.", active: true, popular: true },
  { id: "srv-4", name: "House Shifting", category: "majdoor", icon: "PackageCheck", description: "Dedicated helpers for household packing, furniture loading, carrying, and shifting.", active: true, popular: true },
  { id: "srv-5", name: "Farm Labour", category: "majdoor", icon: "Wheat", description: "Agricultural workers for crop harvesting, field tilling, soil prep, and farming.", active: true },
  { id: "srv-6", name: "Digging / Excavation", category: "majdoor", icon: "Shovel", description: "Manual trench digging, foundation excavation, pipeline channels, and soil removal.", active: true },
  { id: "srv-7", name: "Road Work", category: "majdoor", icon: "Construction", description: "Labourers for road paving, bitumen handling, pipe laying, and civil infrastructure.", active: true },
  { id: "srv-8", name: "Warehouse Labour", category: "majdoor", icon: "Boxes", description: "Inventory helpers, stacking, sorting, packing, and dispatch handling staff.", active: true },
  { id: "srv-9", name: "Factory Labour", category: "majdoor", icon: "Factory", description: "Industrial helpers for assembly line support, material movement, and factory duty.", active: true },
  { id: "srv-10", name: "Event / Tent Labour", category: "majdoor", icon: "Tent", description: "Helpers for wedding tent setup, stage erection, chairs arrangement, and catering support.", active: true },
  { id: "srv-11", name: "Demolition Labour", category: "majdoor", icon: "Hammer", description: "Manual wall demolition, debris clearance, concrete breaking, and site clearance.", active: true },
  { id: "srv-12", name: "General Helper", category: "majdoor", icon: "UserCheck", description: "Versatile daily wage helpers for shop, office, garden, or custom odd jobs.", active: true },

  // Mistri Category
  { id: "srv-13", name: "Raj Mistri", category: "mistri", icon: "Wall", description: "Master mason for brickwork, wall construction, stone masonry, and foundation work.", active: true, popular: true },
  { id: "srv-14", name: "Brick Work", category: "mistri", icon: "Blocks", description: "Specialized masons for clay brick, fly-ash brick, and concrete block laying.", active: true },
  { id: "srv-15", name: "Plaster Work", category: "mistri", icon: "Layers", description: "Smooth internal and external wall plastering, cement finish, and POP base work.", active: true },
  { id: "srv-16", name: "Tile Mistri", category: "mistri", icon: "Grid", description: "Precision floor and wall tile fitting, marble polishing, and ceramic tile laying.", active: true },
  { id: "srv-17", name: "Flooring", category: "mistri", icon: "LayoutGrid", description: "Concrete floor casting, Kota stone, granite, and terrazzo flooring specialists.", active: true },
  { id: "srv-18", name: "Construction Work", category: "mistri", icon: "Building", description: "Full structural mason supervision and civil structure repair experts.", active: true },

  // Other Services
  { id: "srv-19", name: "Electrician", category: "other", icon: "Zap", description: "Certified electricians for house wiring, breaker repairs, lighting, and DB box work.", active: true, popular: true },
  { id: "srv-20", name: "Plumber", category: "other", icon: "Wrench", description: "Pipe fitting, leak repairs, bathroom sanitary installation, and water pump fix.", active: true, popular: true },
  { id: "srv-21", name: "Carpenter", category: "other", icon: "Axe", description: "Furniture repair, door fitting, wood cabinetry, modular kitchen, and woodwork.", active: true },
  { id: "srv-22", name: "Painter", category: "other", icon: "Paintbrush", description: "Interior & exterior wall painting, waterproof coating, and texture finish.", active: true },
  { id: "srv-23", name: "Cleaning", category: "other", icon: "Sparkles", description: "Deep home cleaning, post-construction cleanup, and water tank sanitation.", active: true },
  { id: "srv-24", name: "Gardener", category: "other", icon: "Sprout", description: "Lawn trimming, plant pruning, soil fertilization, and garden maintenance.", active: true },
  { id: "srv-25", name: "Welder", category: "other", icon: "Flame", description: "Iron gate fabrication, window grill welding, structural steel repair.", active: true },
  { id: "srv-26", name: "AC Technician", category: "other", icon: "Wind", description: "AC installation, gas refill, jet service, and compressor troubleshooting.", active: true },
  { id: "srv-27", name: "Other Services", category: "other", icon: "HelpCircle", description: "Custom work requirements and specialized trade labour.", active: true }
];

export const initialUsers = [
  {
    id: "usr-cust-1",
    name: "Yatendra Kumar",
    phone: "9876543210",
    email: "customer@labourchowk.com",
    password: "$2a$10$wKxO9tK1T1n.eO1vV5z5/.R1tL6aXWnJz9J3h8N7O6P5Q4R3S2T1U", // hashed password
    role: "customer",
    city: "Bulandshahr"
  },
  {
    id: "usr-admin-1",
    name: "Operations Admin",
    phone: "9999999999",
    email: "admin@labourchowk.com",
    password: "$2a$10$wKxO9tK1T1n.eO1vV5z5/.R1tL6aXWnJz9J3h8N7O6P5Q4R3S2T1U",
    role: "admin",
    city: "Bulandshahr"
  },
  {
    id: "usr-ops-1",
    name: "Subhash Sharma (Supervisor)",
    phone: "9811223344",
    email: "ops@labourchowk.com",
    password: "$2a$10$wKxO9tK1T1n.eO1vV5z5/.R1tL6aXWnJz9J3h8N7O6P5Q4R3S2T1U",
    role: "operations",
    city: "Bulandshahr"
  }
];

export const initialWorkers = [
  {
    id: "wrk-101",
    workerId: "LCW-801",
    name: "Ram Kumar",
    phone: "9812345671",
    skills: ["Construction Labour", "Brick Work", "General Labour"],
    experienceYears: 6,
    city: "Bulandshahr",
    serviceAreas: ["Civil Lines", "Yamunapuram", "Awas Vikas"],
    availability: "available",
    verificationStatus: "verified",
    dailyRate: 650
  },
  {
    id: "wrk-102",
    workerId: "LCW-802",
    name: "Suresh Pal",
    phone: "9812345672",
    skills: ["Loading / Unloading", "House Shifting", "Warehouse Labour"],
    experienceYears: 4,
    city: "Bulandshahr",
    serviceAreas: ["DM Colony", "Khurja Road", "Industrial Area"],
    availability: "assigned",
    verificationStatus: "verified",
    dailyRate: 600
  },
  {
    id: "wrk-103",
    workerId: "LCW-803",
    name: "Mohan Singh Mistri",
    phone: "9812345673",
    skills: ["Raj Mistri", "Brick Work", "Plaster Work"],
    experienceYears: 12,
    city: "Bulandshahr",
    serviceAreas: ["Yamunapuram", "Civil Lines"],
    availability: "available",
    verificationStatus: "verified",
    dailyRate: 950
  },
  {
    id: "wrk-104",
    workerId: "LCW-804",
    name: "Dinesh Kumar",
    phone: "9812345674",
    skills: ["Construction Labour", "Digging / Excavation", "Demolition Labour"],
    experienceYears: 5,
    city: "Bulandshahr",
    serviceAreas: ["Bhoor", "Awas Vikas"],
    availability: "available",
    verificationStatus: "verified",
    dailyRate: 650
  },
  {
    id: "wrk-105",
    workerId: "LCW-805",
    name: "Vikram Chauhan",
    phone: "9812345675",
    skills: ["Loading / Unloading", "Factory Labour", "Road Work"],
    experienceYears: 3,
    city: "Bulandshahr",
    serviceAreas: ["Industrial Area", "Khurja Road"],
    availability: "assigned",
    verificationStatus: "verified",
    dailyRate: 600
  },
  {
    id: "wrk-106",
    workerId: "LCW-806",
    name: "Aslam Khan",
    phone: "9812345676",
    skills: ["Tile Mistri", "Flooring", "Plaster Work"],
    experienceYears: 9,
    city: "Bulandshahr",
    serviceAreas: ["Civil Lines", "DM Colony"],
    availability: "available",
    verificationStatus: "verified",
    dailyRate: 900
  },
  {
    id: "wrk-107",
    workerId: "LCW-807",
    name: "Rajesh Saini",
    phone: "9812345677",
    skills: ["Farm Labour", "General Helper", "Gardener"],
    experienceYears: 7,
    city: "Bulandshahr",
    serviceAreas: ["Bhoor", "Yamunapuram"],
    availability: "available",
    verificationStatus: "verified",
    dailyRate: 550
  },
  {
    id: "wrk-108",
    workerId: "LCW-808",
    name: "Pankaj Sharma",
    phone: "9812345678",
    skills: ["Electrician", "AC Technician"],
    experienceYears: 8,
    city: "Bulandshahr",
    serviceAreas: ["Civil Lines", "Awas Vikas"],
    availability: "available",
    verificationStatus: "verified",
    dailyRate: 850
  }
];

export const initialBookings = [
  {
    id: "bk-10245",
    bookingId: "LCB-10245",
    customerId: "usr-cust-1",
    customerName: "Yatendra Kumar",
    customerPhone: "9876543210",
    customerEmail: "customer@labourchowk.com",
    serviceId: "srv-2",
    serviceName: "Construction Labour",
    category: "majdoor",
    workerCount: 5,
    date: "2026-08-30",
    duration: "3 Days",
    startTime: "09:00 AM",
    endTime: "06:00 PM",
    city: "Bulandshahr",
    area: "Yamunapuram",
    address: "Plot No 42, Near Water Tank, Yamunapuram, Bulandshahr",
    description: "Need 5 construction labourers for concrete mixing, lintel casting, and site material handling.",
    requirements: "Workers should have safety boots and helmet.",
    status: "finding_labour",
    estimatedCost: 9750,
    createdAt: "2026-08-28T10:15:00.000Z",
    assignedWorkers: [] // INTERNAL ONLY - sanitized when sent to customer!
  },
  {
    id: "bk-10230",
    bookingId: "LCB-10230",
    customerId: "usr-cust-1",
    customerName: "Yatendra Kumar",
    customerPhone: "9876543210",
    customerEmail: "customer@labourchowk.com",
    serviceId: "srv-22",
    serviceName: "Painter",
    category: "other",
    workerCount: 2,
    date: "2026-08-25",
    duration: "2 Days",
    startTime: "09:00 AM",
    endTime: "06:00 PM",
    city: "Bulandshahr",
    area: "Civil Lines",
    address: "House 114, Near Collectorate, Civil Lines, Bulandshahr",
    description: "Interior wall primer and 2 coats tractor emulsion painting.",
    requirements: "Brooms and ladder to be arranged on site.",
    status: "confirmed",
    estimatedCost: 3200,
    createdAt: "2026-08-24T14:30:00.000Z",
    assignedWorkers: ["wrk-101", "wrk-102"] // Internal details
  },
  {
    id: "bk-10195",
    bookingId: "LCB-10195",
    customerId: "usr-cust-1",
    customerName: "Yatendra Kumar",
    customerPhone: "9876543210",
    customerEmail: "customer@labourchowk.com",
    serviceId: "srv-20",
    serviceName: "Plumber",
    category: "other",
    workerCount: 1,
    date: "2026-08-20",
    duration: "1 Day",
    startTime: "10:00 AM",
    endTime: "04:00 PM",
    city: "Bulandshahr",
    area: "DM Colony",
    address: "Block B, Street 3, DM Colony, Bulandshahr",
    description: "Overhead water tank pipeline leakage repair and new valve installation.",
    requirements: "Bring CPVC cutter and Teflon tape.",
    status: "completed",
    estimatedCost: 800,
    createdAt: "2026-08-19T09:00:00.000Z",
    assignedWorkers: ["wrk-108"]
  }
];

export const initialReviews = [
  {
    id: "rev-1",
    bookingId: "LCB-10195",
    customerId: "usr-cust-1",
    customerName: "Yatendra Kumar",
    rating: 5,
    comment: "Excellent service! LabourChowk sent punctual and hard-working workers. The plumbing work was done cleanly.",
    createdAt: "2026-08-21T11:00:00.000Z"
  }
];
