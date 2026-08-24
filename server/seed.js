import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();
connectDB();

const adminUser = {
  name: 'Sibaditya Panda',
  email: 'admin@aerologic.com',
  password: 'password123',
  isAdmin: true,
};

const products = [
  // FPV Drones & Cinewhoops
  { name: 'SpeedyBee Flex25 Cinewhoop', price: 299.99, image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500&q=80', description: 'Premium 2.5-inch cinewhoop with DJI O3 Air Unit support for buttery smooth cinematic footage.', countInStock: 15 },
  { name: 'iFlight Nazgul5 V2 5" FPV', price: 259.99, image: 'https://images.unsplash.com/photo-1527011045970-1f06797b1a20?w=500&q=80', description: 'High-performance 5-inch freestyle quadcopter built for durability and speed.', countInStock: 8 },
  { name: 'GEPRC CineLog35 HD', price: 349.99, image: 'https://images.unsplash.com/photo-1596711718129-45f8e65893a7?w=500&q=80', description: '3.5-inch pusher cinewhoop perfect for carrying a full-size GoPro camera.', countInStock: 5 },
  { name: 'BetaFPV Pavo30 Whoop Quadcopter', price: 199.99, image: 'https://images.unsplash.com/photo-1581481615986-2675a32ec693?w=500&q=80', description: 'A 3-inch pusher whoop with extreme maneuverability and power.', countInStock: 12 },
  { name: 'TBS Tango 2 Pro FPV Radio', price: 199.99, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80', description: 'Compact, high-quality radio controller with built-in Crossfire micro TX.', countInStock: 20 },
  { name: 'Fat Shark HDO2 FPV Goggles', price: 499.99, image: 'https://images.unsplash.com/photo-1523992015099-281b3cc7c458?w=500&q=80', description: 'OLED displays provide incredible color and contrast for analog and digital FPV.', countInStock: 7 },

  // Electronics & Logic Analyzers
  { name: 'Saleae Logic 8 Analyzer', price: 399.99, image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&q=80', description: '8-channel logic analyzer and mixed-signal oscilloscope for embedded systems.', countInStock: 4 },
  { name: 'Digilent Analog Discovery 2', price: 279.99, image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80', description: 'USB oscilloscope, logic analyzer, and multi-function instrument.', countInStock: 9 },
  { name: 'Altera DE10-Nano FPGA Board', price: 215.00, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80', description: 'Cyclone V SoC FPGA development kit perfect for hardware emulation.', countInStock: 11 },
  { name: 'Xilinx Spartan-7 FPGA Kit', price: 149.99, image: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?w=500&q=80', description: 'Cost-optimized FPGA development board with extensive I/O.', countInStock: 14 },
  { name: 'Rigol DS1054Z Oscilloscope', price: 349.99, image: 'https://images.unsplash.com/photo-1614068595508-3ab5d49603d3?w=500&q=80', description: '50 MHz, 4-channel digital oscilloscope with advanced trigger functions.', countInStock: 6 },
  { name: 'Siglent SDG1032X Function Generator', price: 359.99, image: 'https://images.unsplash.com/photo-1614068595701-d7790b848039?w=500&q=80', description: 'Dual-channel arbitrary waveform generator.', countInStock: 8 },

  // Analog Communication Testing
  { name: 'Keysight N9320B Spectrum Analyzer', price: 2995.00, image: 'https://images.unsplash.com/photo-1579895315024-fb73e659b8a3?w=500&q=80', description: '9 kHz to 3 GHz basic spectrum analyzer for RF testing.', countInStock: 2 },
  { name: 'HackRF One Software Defined Radio', price: 339.99, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80', description: 'SDR peripheral capable of transmission or reception of radio signals from 1 MHz to 6 GHz.', countInStock: 18 },
  { name: 'RTL-SDR Blog V3 R820T2', price: 39.99, image: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?w=500&q=80', description: 'Software defined radio receiver with an aluminum enclosure and SMA connector.', countInStock: 45 },
  { name: 'TinySA Ultra Spectrum Analyzer', price: 125.00, image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=500&q=80', description: 'Handheld spectrum analyzer and signal generator covering up to 5.3 GHz.', countInStock: 25 },
  { name: 'NanoVNA V2 Vector Network Analyzer', price: 69.99, image: 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500&q=80', description: '3GHz vector network analyzer to test antennas and filters.', countInStock: 30 },

  // Premium Tech Accessories
  { name: 'Hakko FX-888D Soldering Station', price: 109.99, image: 'https://images.unsplash.com/photo-1603732551658-5fabbafa84f3?w=500&q=80', description: 'Reliable digital soldering station with excellent thermal recovery.', countInStock: 15 },
  { name: 'TS100 Portable Soldering Iron', price: 65.99, image: 'https://images.unsplash.com/photo-1601633596700-6644f6f7b3ea?w=500&q=80', description: 'Smart, programmable soldering iron perfect for field repairs.', countInStock: 22 },
  { name: 'Fluke 117 True RMS Multimeter', price: 219.99, image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500&q=80', description: 'Electrician\'s ideal multimeter with non-contact voltage detection.', countInStock: 12 },
  { name: 'Pinecil Smart Mini Soldering Iron', price: 25.99, image: 'https://images.unsplash.com/photo-1588508065123-287b28e01397?w=500&q=80', description: 'RISC-V based mini portable soldering iron featuring 32-bit SOC.', countInStock: 50 },
  { name: 'Owon B35T+ Bluetooth Multimeter', price: 55.99, image: 'https://images.unsplash.com/photo-1581092926214-783fb737d2f9?w=500&q=80', description: 'Digital multimeter with offline recording function and Bluetooth.', countInStock: 14 },

  // Additional Hobbyist Boards & Components
  { name: 'Raspberry Pi 4 Model B (8GB)', price: 85.00, image: 'https://images.unsplash.com/photo-1601462904263-0f781dfb1b86?w=500&q=80', description: 'High-performance microcomputer with 8GB RAM for demanding projects.', countInStock: 35 },
  { name: 'Arduino Portenta H7', price: 103.40, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80', description: 'Dual-core processing engine designed for industrial applications.', countInStock: 19 },
  { name: 'Teensy 4.1 Development Board', price: 26.85, image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80', description: '600 MHz ARM Cortex-M7 with extensive I/O capabilities.', countInStock: 40 },
  { name: 'ESP32-S3-WROOM-1 Module (10 Pack)', price: 35.00, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80', description: 'Powerful, generic Wi-Fi + Bluetooth LE MCU module.', countInStock: 25 },
  { name: 'Breadboard Pro Power Supply', price: 15.99, image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500&q=80', description: 'Adjustable dual output breadboard power supply module.', countInStock: 60 },
  { name: 'Jumper T-Pro EdgeTX Radio', price: 89.99, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80', description: 'Gamepad style transmitter with hall gimbals and multi-protocol module.', countInStock: 16 },
  { name: 'ExpressLRS 2.4GHz TX Module', price: 39.99, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80', description: 'High-refresh rate long-range radio link module for FPV.', countInStock: 32 },
  { name: 'Caddx Vista Nebula Pro Kit', price: 165.00, image: 'https://images.unsplash.com/photo-1523992015099-281b3cc7c458?w=500&q=80', description: 'Digital FPV transmission system supporting 120fps.', countInStock: 10 }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.create(adminUser);
    const adminId = createdUser._id;

    const sampleProducts = products.map((product) => {
      const name = product.name.toLowerCase();
      let imageUrl = '/images/drone.png';
      if (name.includes('multimeter')) imageUrl = '/images/multimeter.png';
      else if (name.includes('analyzer') || name.includes('oscilloscope') || name.includes('generator')) imageUrl = '/images/oscilloscope.png';
      else if (name.includes('fpga') || name.includes('raspberry') || name.includes('arduino') || name.includes('teensy') || name.includes('esp32') || name.includes('module') || name.includes('breadboard')) imageUrl = '/images/fpga.png';
      else if (name.includes('soldering')) imageUrl = '/images/soldering_iron.png';
      else if (name.includes('radio') || name.includes('sdr') || name.includes('tango') || name.includes('expresslrs') || name.includes('goggles') || name.includes('vista')) imageUrl = '/images/radio.png';
      
      return { ...product, image: imageUrl, user: adminId };
    });

    await Product.insertMany(sampleProducts);

    console.log('Database Seeded Successfully with AeroLogic Dynamics Inventory!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
