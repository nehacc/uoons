import React from "react";

const data = {
  Audio: [
    "Bluetooth Headphones",
    "Wired Headphones",
    "Bluetooth Speakers",
    "Wireless Earbuds",
    "Microphones Accessories",
    "Ceiling Speakers"
  ],
  Gaming: [
    "Gaming Chair",
    "Gaming Mouse",
    "Gaming Headphones",
    "Toys",
    "Gaming Keyboard",
    "Gaming Accessories",
    "Gaming Components",
    "Gaming Laptops",
    "DIY Kits"
  ],
  Refurbish: ["Storage Devices", "Mobiles", "Laptops", "Streaming Devices"],
  Peripherals: [
    "Car Accessories",
    "Laptop Charger, Adapter",
    "USB Cables",
    "Mouse",
    "Power Supplies / SMPS",
    "Keyboards",
    "UPS",
    "RAM",
    "Projectors",
    "Streaming Devices",
    "Laptop Tables",
    "Laptop Stands",
    "Cables & Adapters",
    "Webcam / CCTV",
    "CPU Coolers",
    "Computer Case Cabinets",
    "Barcode Scanners",
    "Pen Drives",
    "Monitors",
    "Others",
    "Motherboards",
    "Networking Devices",
    "Software"
  ],
  "Mobile Accessories": [
    "Power Bank",
    "AUX Cables",
    "Batteries",
    "USB Charger",
    "USB Cable",
    "OTG Cables",
    "Charging Cable",
    "Ear phones",
    "Memory Cards",
    "Selfie sticks & Tripods",
    "Bluetooth",
    "Screen Guards",
    "Mobile lens",
    "Cases & Covers",
    "OTG adapters",
    "Speakers",
    "Skin Stickers",
    "Smart Watch",
    "Headphone Jack Adapter",
    "Holders & Mounts",
    "Wireless Chargers",
    "Microphones Accessories",
    "Other Cables",
    "Fingerprint Scanners"
  ],
  Appliance: [
    "Mini Fan",
    "Ceiling Fan",
    "Kitchen Appliances",
    "Home Appliances",
    "Home Improvement",
    "Irons & Steamers",
    "Table Fans",
    "Wall Fans",
    "Tower Fans",
    "Stand Fans",
    "Exhaust Fans",
    "Water Purifiers",
    "Hydro Extractor",
    "LED Lights",
    "Solar Lights",
    "Lighters & Fire Starters"
  ],
  "Smart Home": [
    "Smart Locks",
    "Smart TV Box",
    "Ceiling Lamps",
    "Air Purifier",
    "Televisions",
    "Security Cameras",
    "Smart LED Bulb",
    "Smart Plugs",
    "Air Conditioners",
    "Premium Ceiling Fans",
    "Fancy Lights",
    "Aquarium Accessories",
    "Festive Décor & Gifts",
    "Sewing Machines & Accessories"
  ],
  "Laptop and Desktop": ["HP", "Dell"],
  "Smart Gadgets": [
    "Smart Watch",
    "Smart Watch Accessories",
    "Streaming Devices",
    "Smart Trackers",
    "Smart LED Bulb"
  ],
  "Personal and Health": [
    "Trimmers",
    "Pulse Oximeter",
    "Infrared Thermometer",
    "Oxygen Concentrator",
    "Hair Dryers",
    "Hair Straighteners",
    "Body Fat Analyzers",
    "Weighing Scales",
    "Body Massagers",
    "Fly Swatters",
    "Electric Toothbrushes",
    "Hair Steamers",
    "Watches",
    "Beauty and Grooming",
    "Pet Accessories"
  ],
  Mobiles: [
    "Redmi",
    "POCO",
    "Realme",
    "Oppo",
    "Vivo",
    "Xiaomi Mi",
    "Samsung",
    "OnePlus",
    "Panasonic"
  ]
};

const CompactCategoriesGrid = () => {
  return (
    <div className="bg-blue-100 w-screen">
    <div className="container mx-auto p-4">
      {Object.keys(data).map((category) => (
        <div key={category} className="mb-6">
          <h2 className="text-lg font-medium mb-3">{category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {data[category].map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-2 rounded-md text-center border border-gray-200 hover:bg-orange-100 transition duration-200 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CompactCategoriesGrid;
