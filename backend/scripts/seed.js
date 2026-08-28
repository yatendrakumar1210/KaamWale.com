import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Worker from '../models/Worker.js';
import City from '../models/City.js';
import Booking, { Counter } from '../models/Booking.js';
import Review from '../models/Review.js';
import Assignment from '../models/Assignment.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/labourchowk';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // --- Drop existing collections ---
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Worker.deleteMany({}),
      City.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
      Assignment.deleteMany({}),
      Counter.deleteMany({})
    ]);
    console.log('🗑️  Cleared all existing data');

    // --- Seed Counter ---
    await Counter.create({ _id: 'bookingId', seq: 10244 });

    // --- Seed Users ---
    const users = await User.create([
      {
        name: 'Yatendra Kumar',
        phone: '9876543210',
        email: 'customer@labourchowk.com',
        password: 'password123',
        role: 'customer',
        city: 'Bulandshahr'
      },
      {
        name: 'Operations Admin',
        phone: '9999999999',
        email: 'admin@labourchowk.com',
        password: 'admin123',
        role: 'admin',
        city: 'Bulandshahr'
      },
      {
        name: 'Subhash Sharma (Supervisor)',
        phone: '9811223344',
        email: 'ops@labourchowk.com',
        password: 'admin123',
        role: 'operations',
        city: 'Bulandshahr'
      }
    ]);
    console.log(`👤 Seeded ${users.length} users`);

    const customer = users[0];

    // --- Seed Cities ---
    const cities = await City.create([
      {
        name: 'Bulandshahr',
        state: 'Uttar Pradesh',
        serviceAreas: ['Civil Lines', 'Yamunapuram', 'DM Colony', 'Awas Vikas', 'Bhoor', 'Khurja Road', 'Industrial Area'],
        pinCodes: ['203001', '203002', '203131'],
        active: true
      },
      {
        name: 'Noida',
        state: 'Uttar Pradesh',
        serviceAreas: ['Sector 18', 'Sector 62', 'Sector 137', 'Greater Noida West', 'Sector 15'],
        pinCodes: ['201301', '201309'],
        active: true
      },
      {
        name: 'Delhi NCR',
        state: 'Delhi',
        serviceAreas: ['Connaught Place', 'Okhla Industrial Area', 'Lajpat Nagar', 'Dwarka', 'Rohini'],
        pinCodes: ['110001', '110020'],
        active: true
      }
    ]);
    console.log(`🏙️  Seeded ${cities.length} cities`);

    // --- Seed Services ---
    const servicesData = [
      // Majdoor
      { name: 'General Labour', category: 'majdoor', icon: 'HardHat', description: 'General unskilled labour for manual work, site cleanup, and helper tasks.', popular: true },
      { name: 'Construction Labour', category: 'majdoor', icon: 'Building2', description: 'Experienced labour for concrete mixing, brick carrying, scaffolding, and site work.', popular: true },
      { name: 'Loading / Unloading', category: 'majdoor', icon: 'Truck', description: 'Heavy lifting helpers for trucks, containers, warehouses, and freight handling.', popular: true },
      { name: 'House Shifting', category: 'majdoor', icon: 'PackageCheck', description: 'Dedicated helpers for household packing, furniture loading, carrying, and shifting.', popular: true },
      { name: 'Farm Labour', category: 'majdoor', icon: 'Wheat', description: 'Agricultural workers for crop harvesting, field tilling, soil prep, and farming.' },
      { name: 'Digging / Excavation', category: 'majdoor', icon: 'Shovel', description: 'Manual trench digging, foundation excavation, pipeline channels, and soil removal.' },
      { name: 'Road Work', category: 'majdoor', icon: 'Construction', description: 'Labourers for road paving, bitumen handling, pipe laying, and civil infrastructure.' },
      { name: 'Warehouse Labour', category: 'majdoor', icon: 'Boxes', description: 'Inventory helpers, stacking, sorting, packing, and dispatch handling staff.' },
      { name: 'Factory Labour', category: 'majdoor', icon: 'Factory', description: 'Industrial helpers for assembly line support, material movement, and factory duty.' },
      { name: 'Event / Tent Labour', category: 'majdoor', icon: 'Tent', description: 'Helpers for wedding tent setup, stage erection, chairs arrangement, and catering support.' },
      { name: 'Demolition Labour', category: 'majdoor', icon: 'Hammer', description: 'Manual wall demolition, debris clearance, concrete breaking, and site clearance.' },
      { name: 'General Helper', category: 'majdoor', icon: 'UserCheck', description: 'Versatile daily wage helpers for shop, office, garden, or custom odd jobs.' },
      // Mistri
      { name: 'Raj Mistri', category: 'mistri', icon: 'Wall', description: 'Master mason for brickwork, wall construction, stone masonry, and foundation work.', popular: true },
      { name: 'Brick Work', category: 'mistri', icon: 'Blocks', description: 'Specialized masons for clay brick, fly-ash brick, and concrete block laying.' },
      { name: 'Plaster Work', category: 'mistri', icon: 'Layers', description: 'Smooth internal and external wall plastering, cement finish, and POP base work.' },
      { name: 'Tile Mistri', category: 'mistri', icon: 'Grid', description: 'Precision floor and wall tile fitting, marble polishing, and ceramic tile laying.' },
      { name: 'Flooring', category: 'mistri', icon: 'LayoutGrid', description: 'Concrete floor casting, Kota stone, granite, and terrazzo flooring specialists.' },
      { name: 'Construction Work', category: 'mistri', icon: 'Building', description: 'Full structural mason supervision and civil structure repair experts.' },
      // Other
      { name: 'Electrician', category: 'other', icon: 'Zap', description: 'Certified electricians for house wiring, breaker repairs, lighting, and DB box work.', popular: true },
      { name: 'Plumber', category: 'other', icon: 'Wrench', description: 'Pipe fitting, leak repairs, bathroom sanitary installation, and water pump fix.', popular: true },
      { name: 'Carpenter', category: 'other', icon: 'Axe', description: 'Furniture repair, door fitting, wood cabinetry, modular kitchen, and woodwork.' },
      { name: 'Painter', category: 'other', icon: 'Paintbrush', description: 'Interior & exterior wall painting, waterproof coating, and texture finish.' },
      { name: 'Cleaning', category: 'other', icon: 'Sparkles', description: 'Deep home cleaning, post-construction cleanup, and water tank sanitation.' },
      { name: 'Gardener', category: 'other', icon: 'Sprout', description: 'Lawn trimming, plant pruning, soil fertilization, and garden maintenance.' },
      { name: 'Welder', category: 'other', icon: 'Flame', description: 'Iron gate fabrication, window grill welding, structural steel repair.' },
      { name: 'AC Technician', category: 'other', icon: 'Wind', description: 'AC installation, gas refill, jet service, and compressor troubleshooting.' },
      { name: 'Other Services', category: 'other', icon: 'HelpCircle', description: 'Custom work requirements and specialized trade labour.' }
    ];
    const services = await Service.create(servicesData);
    console.log(`🛠️  Seeded ${services.length} services`);

    const constructionService = services.find(s => s.name === 'Construction Labour');
    const painterService = services.find(s => s.name === 'Painter');
    const plumberService = services.find(s => s.name === 'Plumber');

    // --- Seed Workers ---
    const workersData = [
      { workerId: 'LCW-801', name: 'Ram Kumar', phone: '9812345671', skills: ['Construction Labour', 'Brick Work', 'General Labour'], experienceYears: 6, city: 'Bulandshahr', serviceAreas: ['Civil Lines', 'Yamunapuram', 'Awas Vikas'], availability: 'available', dailyRate: 650 },
      { workerId: 'LCW-802', name: 'Suresh Pal', phone: '9812345672', skills: ['Loading / Unloading', 'House Shifting', 'Warehouse Labour'], experienceYears: 4, city: 'Bulandshahr', serviceAreas: ['DM Colony', 'Khurja Road', 'Industrial Area'], availability: 'available', dailyRate: 600 },
      { workerId: 'LCW-803', name: 'Mohan Singh Mistri', phone: '9812345673', skills: ['Raj Mistri', 'Brick Work', 'Plaster Work'], experienceYears: 12, city: 'Bulandshahr', serviceAreas: ['Yamunapuram', 'Civil Lines'], availability: 'available', dailyRate: 950 },
      { workerId: 'LCW-804', name: 'Dinesh Kumar', phone: '9812345674', skills: ['Construction Labour', 'Digging / Excavation', 'Demolition Labour'], experienceYears: 5, city: 'Bulandshahr', serviceAreas: ['Bhoor', 'Awas Vikas'], availability: 'available', dailyRate: 650 },
      { workerId: 'LCW-805', name: 'Vikram Chauhan', phone: '9812345675', skills: ['Loading / Unloading', 'Factory Labour', 'Road Work'], experienceYears: 3, city: 'Bulandshahr', serviceAreas: ['Industrial Area', 'Khurja Road'], availability: 'available', dailyRate: 600 },
      { workerId: 'LCW-806', name: 'Aslam Khan', phone: '9812345676', skills: ['Tile Mistri', 'Flooring', 'Plaster Work'], experienceYears: 9, city: 'Bulandshahr', serviceAreas: ['Civil Lines', 'DM Colony'], availability: 'available', dailyRate: 900 },
      { workerId: 'LCW-807', name: 'Rajesh Saini', phone: '9812345677', skills: ['Farm Labour', 'General Helper', 'Gardener'], experienceYears: 7, city: 'Bulandshahr', serviceAreas: ['Bhoor', 'Yamunapuram'], availability: 'available', dailyRate: 550 },
      { workerId: 'LCW-808', name: 'Pankaj Sharma', phone: '9812345678', skills: ['Electrician', 'AC Technician'], experienceYears: 8, city: 'Bulandshahr', serviceAreas: ['Civil Lines', 'Awas Vikas'], availability: 'available', dailyRate: 850 }
    ];
    const workers = await Worker.create(workersData);
    console.log(`👷 Seeded ${workers.length} workers`);

    // --- Seed Bookings ---
    // Booking 1: Finding Labour
    const booking1 = new Booking({
      customerId: customer._id,
      customerName: 'Yatendra Kumar',
      customerPhone: '9876543210',
      customerEmail: 'customer@labourchowk.com',
      serviceId: constructionService._id,
      serviceName: 'Construction Labour',
      category: 'majdoor',
      workerCount: 5,
      date: '2026-08-30',
      duration: '3 Days',
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      city: 'Bulandshahr',
      area: 'Yamunapuram',
      address: 'Plot No 42, Near Water Tank, Yamunapuram, Bulandshahr',
      description: 'Need 5 construction labourers for concrete mixing, lintel casting, and site material handling.',
      requirements: 'Workers should have safety boots and helmet.',
      status: 'finding_labour',
      estimatedCost: 9750
    });
    await booking1.save();

    // Booking 2: Confirmed
    const booking2 = new Booking({
      customerId: customer._id,
      customerName: 'Yatendra Kumar',
      customerPhone: '9876543210',
      customerEmail: 'customer@labourchowk.com',
      serviceId: painterService._id,
      serviceName: 'Painter',
      category: 'other',
      workerCount: 2,
      date: '2026-08-25',
      duration: '2 Days',
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      city: 'Bulandshahr',
      area: 'Civil Lines',
      address: 'House 114, Near Collectorate, Civil Lines, Bulandshahr',
      description: 'Interior wall primer and 2 coats tractor emulsion painting.',
      requirements: 'Brooms and ladder to be arranged on site.',
      status: 'confirmed',
      estimatedCost: 3200,
      assignedWorkers: [workers[0]._id, workers[1]._id],
      assignedBy: 'Operations Admin',
      assignedAt: new Date()
    });
    await booking2.save();

    // Booking 3: Completed
    const booking3 = new Booking({
      customerId: customer._id,
      customerName: 'Yatendra Kumar',
      customerPhone: '9876543210',
      customerEmail: 'customer@labourchowk.com',
      serviceId: plumberService._id,
      serviceName: 'Plumber',
      category: 'other',
      workerCount: 1,
      date: '2026-08-20',
      duration: '1 Day',
      startTime: '10:00 AM',
      endTime: '04:00 PM',
      city: 'Bulandshahr',
      area: 'DM Colony',
      address: 'Block B, Street 3, DM Colony, Bulandshahr',
      description: 'Overhead water tank pipeline leakage repair and new valve installation.',
      requirements: 'Bring CPVC cutter and Teflon tape.',
      status: 'completed',
      estimatedCost: 800,
      assignedWorkers: [workers[7]._id],
      assignedBy: 'Operations Admin',
      assignedAt: new Date()
    });
    await booking3.save();

    console.log(`📋 Seeded 3 bookings (${booking1.bookingId}, ${booking2.bookingId}, ${booking3.bookingId})`);

    // --- Seed a Review ---
    await Review.create({
      bookingId: booking3.bookingId,
      customerId: customer._id,
      customerName: 'Yatendra Kumar',
      rating: 5,
      comment: 'Excellent service! LabourChowk sent punctual and hard-working workers. The plumbing work was done cleanly.'
    });
    console.log('⭐ Seeded 1 review');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n--- Login Credentials ---');
    console.log('Customer : customer@labourchowk.com / password123');
    console.log('Admin    : admin@labourchowk.com    / admin123');
    console.log('Ops      : ops@labourchowk.com      / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
};

seed();
