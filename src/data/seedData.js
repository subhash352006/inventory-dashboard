// Relational Seed Data for Retail Inventory Dashboard
// Contains 520+ pre-seeded retail records spanning 8 categories

export const CATEGORIES = [
  { id: 1, name: 'Electronics', code: 'ELC', description: 'Gadgets, peripherals, and consumer electronics' },
  { id: 2, name: 'Grocery & Gourmet', code: 'GRO', description: 'Packaged foods, pantry essentials, and beverages' },
  { id: 3, name: 'Apparel & Footwear', code: 'APP', description: 'Clothing, athletic wear, and footwear' },
  { id: 4, name: 'Home & Kitchen', code: 'HMK', description: 'Cookware, dining, bedding, and home essentials' },
  { id: 5, name: 'Health & Personal Care', code: 'HPC', description: 'Skincare, vitamins, toiletries, and hygiene' },
  { id: 6, name: 'Sports & Outdoors', code: 'SPO', description: 'Fitness gear, outdoor recreation, and sports accessories' },
  { id: 7, name: 'Books & Stationery', code: 'BKS', description: 'Office supplies, journals, writing instruments' },
  { id: 8, name: 'Hardware & Tools', code: 'HDW', description: 'Hand tools, DIY hardware, and maintenance gear' }
];

export const SUPPLIERS = [
  { id: 1, name: 'Apex Distribution Group', leadTimeDays: 3, rating: 4.8 },
  { id: 2, name: 'Nordic Merchant Partners', leadTimeDays: 5, rating: 4.6 },
  { id: 3, name: 'Pacific Coast Wholesale', leadTimeDays: 2, rating: 4.9 },
  { id: 4, name: 'Vanguard Retail Logistics', leadTimeDays: 4, rating: 4.5 },
  { id: 5, name: 'Summit Supply Chain Inc.', leadTimeDays: 6, rating: 4.7 }
];

const ITEM_CATALOG = [
  // Category 1: Electronics (65 items)
  {
    prefix: 'ELC',
    catId: 1,
    catName: 'Electronics',
    templates: [
      'Pro ANC Wireless Headphones', 'USB-C Fast Charging Cable 2m', 'MagSafe Magnetic Power Bank 10000mAh',
      'Ultra-Slim Bluetooth Keyboard', 'Ergonomic Vertical Mouse', '4K 60Hz HDMI 2.1 Cable',
      '1080p FHD Streaming Webcam', 'Multi-Port USB 3.2 Hub', 'Noise-Cancelling Earbuds Pro',
      'Smart LED Desk Lamp w/ Wireless Qi', 'Portable SSD Drive 1TB', 'Dual Monitor Desk Mount Arm',
      'Braided Audio Aux Cable 3.5mm', 'Smart WiFi Plug Mini (2-Pack)', 'GaN Wall Charger 65W Triple Port',
      'Microfiber Screen Cleaning Kit', 'Laptop Cooling Stand Aluminum', 'Surge Protector 8-Outlet Power Strip',
      'Bluetooth 5.3 Audio Receiver', 'Wireless Barcode Scanner Handheld', 'Cable Management Sleeve Kit',
      'Stylus Pen for Touchscreens', 'Smart Fitness Tracker Band', 'Cat-8 High-Speed Ethernet Cable 5m',
      'External DVD-RW Drive USB 3.0', 'RGB Gaming Mousepad Extended', 'Webcam Privacy Shutter (3-Pack)',
      'USB Flash Drive 128GB Metal', 'Car Phone Mount Air-Vent Gravity', 'Magnetic Wireless Car Charger',
      'Compact Bluetooth Speaker 15W', 'Micro SD Card 256GB V30', 'USB to Lightning Adapter Braided',
      'Screen Protector Tempered Glass 2x', 'Active Noise-Cancelling Over-Ear', 'Rechargeable AA Batteries 4-Pack',
      'Smart Home Zigbee Bridge Hub', 'Mini DisplayPort to HDMI Adapter', 'Microphone Boom Scissor Arm',
      'Podcast USB Cardioid Microphone', 'Digital Voice Recorder 16GB', 'Universal Travel Plug Adapter',
      'Wireless Presentation Clicker Remote', 'Fast Qi Charging Pad 15W', 'Mechanical Gaming Keyboard TKL',
      'Studio Monitor Desktop Stands Pair', 'High-Speed SD Card Reader Type-C', 'Heavy-Duty Laptop Sleeve 14-inch',
      'Bluetooth Tracker Key Finder', 'Action Camera Bike Mount Kit', 'Dual Band AC1200 WiFi Dongle',
      'Thermal Label Printer 4x6', 'Barcode Label Rolls 500ct', 'Smart Door Sensor Bluetooth',
      'Digital Infrared Thermometer', 'LED Ring Light 10-inch with Tripod', 'USB-C to DisplayPort Cable 4K',
      'Smart Water Leak Detector', 'Wireless Ergonomic Trackball Mouse', '100W PD Braided Fast Cable',
      'Hard Shell Protective Tech Case', 'HDMI Bi-Directional Switch 2 in 1', 'Anti-Static Wristband Grounding',
      'Mini Tripod with Phone Grip', 'USB Desktop Microphone w/ Mute'
    ]
  },
  // Category 2: Grocery & Gourmet (65 items)
  {
    prefix: 'GRO',
    catId: 2,
    catName: 'Grocery & Gourmet',
    templates: [
      'Organic Single-Origin Coffee Beans 1kg', 'Cold-Pressed Extra Virgin Olive Oil 750ml',
      'Rolled Jumbo Oats Organic 1kg', 'Pure Mountain Wildflower Honey 500g', 'Himalayan Fine Pink Salt 1kg',
      'Aged Balsamic Vinegar of Modena 250ml', 'Unsweetened Almond Milk Barista 1L', 'Matcha Green Tea Ceremonial Grade 50g',
      'Organic Basmati Rice Royal 5kg', 'Raw Artisan Mixed Nuts 400g', 'Dark Chocolate 85% Cacao Bar 100g',
      'Organic Quinoa Grain Tri-Color 750g', 'Whole Grain Chia Seeds 500g', 'Pure Maple Syrup Grade A 375ml',
      'Sparkling Mineral Water 750ml (12-pack)', 'Roasted Sunflower Seeds Salted 250g', 'Creamy Organic Peanut Butter 500g',
      'Ground Ceylon Cinnamon Powder 150g', 'Gluten-Free Penne Rigate Pasta 500g', 'San Marzano Canned Peeled Tomatoes 800g',
      'Cold Brew Nitro Coffee Can 330ml', 'Dried Organic Cranberries 300g', 'Organic Coconut Flour 500g',
      'Artisan Granola Honey Almond 450g', 'Matcha Latte Powder Blend 250g', 'Raw Honeycomb Square 300g',
      'Tahini Pure Sesame Paste 300g', 'Organic Apple Cider Vinegar 500ml', 'Lentils Green Organic 1kg',
      'Gourmet Truffle Flavored Olive Oil 100ml', 'Kombucha Ginger Lemon 330ml 6-pack', 'Dark Roasted Espresso Pods 50ct',
      'Cold-Pressed Avocado Oil 500ml', 'Flaxseed Whole Organic 500g', 'Natural Sea Salt Flakes 250g',
      'Cashew Butter Smooth 350g', 'Herbal Chamomile Tea Bags 40ct', 'Coconut Water Pure 1L',
      'Raw Macadamia Nuts 200g', 'Black Peppercorns Whole Grinder 180g', 'Spelt Flour Stone Ground 1kg',
      'Goji Berries Sun Dried 250g', 'Pumpkin Seeds Raw Shelled 400g', 'Sourdough Crispbread Rye 200g',
      'Dijon Mustard Authentic 200g', 'Smoked Spanish Paprika Sweet 100g', 'Steel-Cut Oats Organic 1kg',
      'Organic Vegetable Broth Concentrate 250ml', 'Fair Trade Cocoa Powder 250g', 'Medjool Dates Premium 500g',
      'White Truffle Sea Salt 100g', 'Pistachios Roasted & Salted 300g', 'Almond Flour Blanched 500g',
      'Peppermint Herbal Infusion 50ct', 'Earl Grey Bergamot Tea Loose 150g', 'Raw Walnuts Halves 350g',
      'Organic Brown Basmati Rice 2kg', 'Wild Berry Jam Reduced Sugar 340g', 'Tahitian Vanilla Bean Pods (3-pk)',
      'Dry Roasted Edamame 200g', 'Toasted Sesame Oil Pure 250ml', 'Organic Hemp Hearts Seeds 450g',
      'Ghirardelli Dark Melting Wafers 300g', 'Jasmine Rice Fragrant 5kg', 'Agave Nectar Organic Blue 500ml'
    ]
  },
  // Category 3: Apparel & Footwear (65 items)
  {
    prefix: 'APP',
    catId: 3,
    catName: 'Apparel & Footwear',
    templates: [
      'Heavyweight Cotton Crew T-Shirt Black', 'Heavyweight Cotton Crew T-Shirt White', 'Slim-Fit Stretch Denim Jeans 32/32',
      'Merino Wool Crewneck Sweater Heather Grey', 'Technical Running Shorts 7-inch Black', 'Moisture-Wicking Athletic Tee Navy',
      'Fleece Pullover Hoodie Charcoal M', 'Water-Resistant Windbreaker Jacket', 'Cushioned Athletic Ankle Socks 6-Pack',
      'Classic Canvas Low-Top Sneakers 42', 'Tailored Chino Trousers Khaki 32/30', 'Breathable Training Tank Top',
      'Waterproof Trail Hiking Shoes 43', 'Unisex Corduroy Cap Navy', 'Thermal Base Layer Long Sleeve Top',
      'Merino Wool Trail Socks 3-Pack', 'Full-Zip French Terry Track Jacket', 'Lightweight Packable Down Vest',
      'Relaxed Fit Linen Button-Down Shirt', 'Quick-Dry Swim Trunks Patterned', 'Genuine Leather Belt Reversible Black/Brown',
      'Polarized Sunglasses Classic Wayfarer', 'Ribbed Beanie Hat Cashmere Blend', 'Water-Repellent Commuter Backpack 22L',
      'Seamless Compression Tights Running', 'Brushed Flannel Plaid Workshirt', 'Performance Golf Polo Shirt Blue',
      'Lightweight Rain Poncho Hooded', 'Ankle Compression Sleeves Pair', 'Vintage Wash Graphic Tee Olive',
      'Everyday Canvas Tote Bag Natural', 'Knit Wool Fingerless Gloves', 'Waterproof Winter Mittens Insulated',
      'Casual Slip-On Loafers Suede Brown 42', 'Supportive Cross-Training Shoes 44', 'Heavyweight Canvas Chore Coat',
      'Drawstring Elastic Waist Lounge Pants', 'Silk Patterned Necktie Classic', 'Woven Leather Cardholder Wallet',
      'Bifold RFID Blocking Leather Wallet', 'Anti-Blister Running Socks Tab 3-pk', 'Heavy Cotton Oversized Boxy Tee',
      'Cargo Work Utility Pants Multi-Pocket', 'Packable Bucket Hat Waterproof', 'Thermal Merino Wool Balaclava',
      'Lightweight Walking Sneakers Knit 41', 'Chelsea Boots Waterproof Leather 43', 'Reflective Night Running Vest',
      'Stretch Athletic Headband 3-Pack', 'Performance No-Show Socks 6-Pack', 'Quilted Bomber Jacket Lightweight',
      'Slim Fit Oxford Dress Shirt White', 'Chambray Casual Workshirt Blue', 'Sherpa Lined Denim Jacket',
      'Modal Ribbed Lounge Shorts', 'Fleece Jogger Sweatpants Heather Grey', 'Thermal Ski Socks Padded 2-Pack',
      'Waxed Canvas Duffle Bag 35L', 'Neoprene Water Shoes Quick Dry 42', 'Gym Stringer Tank Top Ribbed',
      'Pima Cotton V-Neck Undershirt 3-pk', 'Heavy Duty Work Boot Crew Socks', 'Waterproof Shoe Covers Silicone',
      'Athletic Wrist Sweatbands Set of 4', 'Classic Aviator Sunglasses UV400'
    ]
  },
  // Category 4: Home & Kitchen (65 items)
  {
    prefix: 'HMK',
    catId: 4,
    catName: 'Home & Kitchen',
    templates: [
      'Tri-Ply Stainless Steel Fry Pan 10-inch', 'Chef Knife 8-inch High Carbon Steel', 'French Press Coffee Maker 1L Glass',
      'Double-Walled Borosilicate Glasses (4-pk)', 'Silicone Cooking Utensils Set 10-pc', 'Magnetic Knife Strip Wall Mount 16in',
      'Airtight Glass Food Storage Containers (8-pk)', 'Microfiber Kitchen Cleaning Towels 12-pk', 'Digital Kitchen Food Scale 5kg Precision',
      'Cast Iron Skillet Pre-Seasoned 12-inch', 'Electric Stainless Kettle Variable Temp', 'Non-Slip Bamboo Cutting Board Set (3-pk)',
      'Silicone Baking Mats Sheet Pan Size (2-pk)', 'Stainless Steel Mixing Bowls w/ Lids (5-pk)', 'Stainless Measuring Cups and Spoons 12-pc',
      'Ceramic Pour-Over Coffee Dripper V60', 'Cold Brew Iced Coffee Pitcher 1.5L', 'Reusable Silicone Food Storage Bags (6-pk)',
      'Rotary Cheese Grater Stainless Drum', 'Over-The-Sink Roll-Up Dish Drying Rack', 'Heavy Duty Kitchen Shears Utility Scissors',
      'Stoneware Ceramic Dinner Plates (Set of 4)', 'Ceramic Cereal Bowls Matte Slate (Set of 4)', 'Insulated Gravy Boat Double Wall 500ml',
      'Manual Salt and Pepper Grinder Mill Set', 'Barista Espresso Tamper 54mm Calibrated', 'Espresso Knock Box Stainless Steel Compact',
      'Countertop Compost Bin Odor Filter 3L', 'Drawer Bamboo Organizer Expandable', 'Under-Sink Storage Sliding Organizers (2-pk)',
      'Memory Foam Bath Mat Ultra Absorbent', 'Waffle Weave Turkish Cotton Hand Towel 2x', 'Microfiber Bed Sheet Set Queen Deep Pocket',
      'Hypoallergenic Pillow Inserts Queen (2-pk)', 'Velvet Hangers Heavy Duty 50-Pack Black', 'Underbed Storage Fabric Bags Zippered 3x',
      'Aromatherapy Essential Oil Diffuser 300ml', 'Pure Soy Wax Scented Candle Cedar & Amber', 'Wall Mount Spice Rack Grippers 4-Pack',
      'Stainless Steel Trash Can Step Pedal 30L', 'Motion Sensor Trash Can Kitchen 50L', 'Silicone Ice Cube Trays with Lids (4-pk)',
      'Cocktail Shaker Set Bartender 14-Piece', 'Stemless Wine Glasses Crystal 18oz (4-pk)', 'Moscow Mule Copper Mugs Handcrafted 4x',
      'Tea Infuser Basket Stainless Steel 2x', 'Vegetable Mandoline Slicer Multi-Blade', 'Meat Temperature Probe Instant Read Digital',
      'Handheld Milk Frother Whisk Electric', 'Cast Iron Dutch Oven Enameled 5.5-Quart', 'Silicone Oven Mitts Heat Resistant Pair',
      'Pan Protectors Pot Dividers 6-Piece Set', 'Cabinet Shelf Risers Wire Storage (2-pk)', 'Self-Adhesive Wall Hooks Stainless 6-pk',
      'Glass Oil and Vinegar Dispenser Cruet 2x', 'Ceramic Spoon Rest Stove Top Dish', 'Garlic Press Crusher Stainless Steel Pro',
      'Stainless Steel Peeler Y-Shape Sharp', 'Pizza Stone Round Cordierite 14-inch', 'Non-Stick Springform Cake Pan 9-inch',
      'Cooling Racks Wire Grid Stainless (2-pk)', 'Silicone Ice Pop Molds Reusable 6-Cavity', 'Glass Water Pitcher with Filter Lid 2L',
      'Bamboo Paper Towel Holder Countertop', 'Linen Coasters Absorbent Round Set of 6'
    ]
  },
  // Category 5: Health & Personal Care (65 items)
  {
    prefix: 'HPC',
    catId: 5,
    catName: 'Health & Personal Care',
    templates: [
      'Broad Spectrum Sunscreen SPF 50+ 150ml', 'Sonic Electric Toothbrush Smart Sensor', 'Replacement Brush Heads Sonic 4-Pack',
      'Hydro Boost Hyaluronic Acid Serum 50ml', 'Gentle Foaming Daily Facial Cleanser 200ml', 'Vitamin C Brightening Serum 30ml Dropper',
      'Niacinamide 10% + Zinc 1% Blemish Serum', 'Ceramide Barrier Moisturizing Cream 100g', 'Deep Conditioning Argan Hair Mask 250ml',
      'Sulfate-Free Tea Tree Shampoo 400ml', 'Hydrating Biotin Hair Conditioner 400ml', 'Organic Virgin Jojoba Oil Dropper 100ml',
      'Vitamin D3 + K2 Liquid Drops 50ml', 'Magnesium Glycinate Capsules 400mg 120ct', 'High Potency Omega-3 Fish Oil 120 Softgels',
      'Probiotic 50 Billion CFU 60 Veggie Caps', 'Hydrocolloid Pimple Patches 72-Count', 'Natural Mineral Deodorant Stick 75g',
      'Bamboo Charcoal Dental Floss 50m (2-pk)', 'Water Flosser Cordless Portable Oral Irrigator', 'Exfoliating Coffee Body Scrub 300g',
      'Shea Butter Ultra Nourishing Hand Cream', 'Retinol Night Renewal Cream 50ml', 'Under-Eye Caffeine Gel Treatment 15ml',
      'Epsom Bath Soaking Salt Eucalyptus 2kg', 'Essential Lavender Sleep Mist Pillow Spray', 'Digital Forehead Thermometer Non-Contact',
      'Upper Arm Blood Pressure Monitor Auto', 'Pulse Oximeter Fingertip Oxygen Reader', 'First Aid Travel Medical Kit 120-Piece',
      'Reusable Ice Gel Pack Hot Cold Therapy', 'Acupressure Foot Massage Roller Spiky', 'Zinc Oxide Mineral Diaper Rash Cream',
      'Natural Lip Balm Beeswax Mint (4-Pack)', 'Microfiber Hair Towel Wrap Fast Drying', 'Silicone Scalp Massager Shampoo Brush',
      'Facial Jade Roller and Gua Sha Stone Set', 'Nail Clipper Set Professional Stainless 5-pc', 'Cuticle Oil Pen Hydrating Almond 3-pk',
      'Pumice Stone Foot Scrubber Natural Lava', 'Hypoallergenic Adhesive Bandages 100ct', 'Sterile Saline Nasal Spray Mist 150ml',
      'Sleep Mask 100% Mulberry Silk Contoured', 'Silicone Noise Cancelling Earplugs (3-pk)', 'Collagen Peptides Hydrolyzed Powder 500g',
      'Zinc Gluconate 50mg Immune Support 100ct', 'Elderberry Immune Gummies Vitamin C 60ct', 'Iron Complex Gentle Capsules 90ct',
      'Melatonin 3mg Sleep Dissolving Tablets 90ct', 'Turmeric Curcumin w/ BioPerine 120ct', 'Ashwagandha Organic Root Extract 90ct',
      'Apple Cider Vinegar Gummies Raw 60ct', 'Hand Sanitizer Spray Ethyl 80% (4-Pack)', 'Moisturizing Antibacterial Foam Wash 300ml',
      'Nose Pore Strips Deep Cleansing 14-pk', 'Beard Oil Organic Cedarwood 50ml Dropper', 'Boar Bristle Beard Brush Wood Handle',
      'Safety Razor Double Edge Stainless Steel', 'Platinum Coated Razor Blades 50-Pack', 'Tea Tree Blemish Spot Treatment Wand',
      'Soothing Aloe Vera Gel 99% Pure 300ml', 'Witch Hazel Toner Alcohol Free 250ml', 'Exfoliating Bath Washcloth Loofah 3-pk',
      'Foot Peel Mask Exfoliating Booties 2-pk', 'Organic Castor Oil Cold-Pressed 250ml'
    ]
  },
  // Category 6: Sports & Outdoors (65 items)
  {
    prefix: 'SPO',
    catId: 6,
    catName: 'Sports & Outdoors',
    templates: [
      'High Density Non-Slip Yoga Mat 6mm', 'Fabric Booty Resistance Bands Set of 3', 'Loop Resistance Exercise Bands 5-Pack',
      'Insulated Stainless Gym Bottle 1 Liter', 'High-Density Foam Roller Deep Muscle 18in', 'Speed Cable Jump Rope Ball Bearings',
      'Adjustable Hand Grip Strengthener 10-60kg', 'Core Sliders Exercise Gliding Discs Pair', 'Yoga Foam Blocks 2-Pack with Yoga Strap',
      'Ankle Wrist Weights 2lb Pair Adjustable', 'Ab Roller Wheel with Extra Knee Pad', 'Push Up Bars Stands Ergonomic Grips',
      'Gym Chalk Block Carbonate Magnesium 2x', 'Microfiber Fast Dry Travel Towel XL', 'Waterproof Dry Bag Sack 20L Roll Top',
      'Camping LED Lantern Rechargeable 1000lm', 'Headlamp LED USB Rechargeable 500 Lumen', 'Ultralight Trekking Poles Carbon Fiber Pair',
      'Compact Backpacking Hammock Parachute', 'Stainless Steel Camping Mess Kit Cookware', 'Pocket Multi-Tool Pliers 14-in-1 Stainless',
      'Emergency Mylar Thermal Blankets 4-Pack', 'Fire Starter Ferrocerium Rod and Striker', 'Water Filter Straw Purifier 0.01 Micron',
      'Bike U-Lock Heavy Duty with Cable 4ft', 'Rechargeable Bike Light Set Front & Rear', 'Mini Bike Floor Pump with Pressure Gauge',
      'Bicycle Repair Tool Kit Saddle Bag Set', 'Hydration Bladder 2L Leak Proof TPU', 'Running Belt Waist Fanny Pack Water Res',
      'Swimming Goggles Anti-Fog UV Protection', 'Silicone Swim Cap Unisex Durable', 'Microfiber Swim Towel Compact Pouch',
      'Pickleball Paddles Set of 2 with Balls', 'Badminton Racket Set 4-Pack with Net', 'Table Tennis Paddles Set 4 Bats 8 Balls',
      'Inflatable Stand Up Paddle Board Ankle Leash', 'Neoprene Dumbbell Pair 5 lb Non-Slip', 'Neoprene Dumbbell Pair 10 lb Non-Slip',
      'Cast Iron Kettlebell 16kg Powder Coated', 'Pull Up Assistance Resistance Bands 4x', 'Weightlifting Wrist Wraps 18-inch Pair',
      'Leather Gym Lifting Belt Lever Buckle', 'Liquid Grip Chalk Alcohol Base 100ml', 'Bouldering Climbing Chalk Bag w/ Belt',
      'Paracord 550 Survival Bracelet with Whistle', 'Inflatable Sleeping Pad Ultralight Camping', 'Compressible Memory Foam Camping Pillow',
      'Thermal Camping Blanket Fleece Lined', 'Portable Folding Camp Stool Aluminum', 'Stainless Camping Stove Wood Burning',
      'Bear Bell Safety Whistle Keychain', 'Mosquito Net Bug Shield Tent Single', 'Trail Running Gaiters Low Ankle Breathable',
      'Waterproof Compass Military Sighting Lens', 'Bicycle Water Bottle Cage Aluminum Pair', 'Bike Bell Brass Crisp Sound Loud Ring',
      'Reflective Safety Armbands Running 4-pk', 'Gym Duffel Bag Wet Pocket Compartment', 'Agility Speed Ladder 12-Rung 20ft',
      'Soccer Ball Size 5 Match Training', 'Basketball Composite Leather Indoor Outdoor', 'Ball Pump with Flexible Hose 5 Needles',
      'Elastic Kinetic Sports Physio Tape 2-pk', 'Deep Tissue Massage Gun Percussion 6 Heads'
    ]
  },
  // Category 7: Books & Stationery (65 items)
  {
    prefix: 'BKS',
    catId: 7,
    catName: 'Books & Stationery',
    templates: [
      'Hardcover Dot Grid Journal 160gsm A5', 'Smooth Gel Ink Pens 0.5mm Black 12-Pack', 'Pastel Aesthetic Highlighters Dual-Tip 8-pk',
      'Retractable Ballpoint Pens Medium 10-Pack', 'Mechanical Pencils 0.7mm with Lead Refills', 'Fine Liner Drawing Pens Waterproof 6-pk',
      'Softcover Spiral Notebook College Ruled 3x', 'Self-Adhesive Sticky Notes 3x3in 12-Pads', 'Transparent Sticky Notes Waterproof 6-pk',
      'Correction Tape Applicators 6-Pack White', 'Executive Metal Rollerball Pen Matte Black', 'Fountain Pen Classic Nib with Ink Converter',
      'Bottled Fountain Pen Ink 50ml Deep Navy', 'Heavy Duty Desktop Tape Dispenser Weighted', 'Invisible Magic Tape Refills 6-Rolls',
      'Stainless Steel Desk Scissors 8-inch', 'Ergonomic Desk Stapler 25-Sheet Capacity', 'Standard 1/4-inch Staples Box of 5000',
      'Heavy Duty Staple Remover Metal Jaw', 'Assorted Binder Clips Metal Tub of 60', 'Vinyl Coated Paper Clips 2-inch Box of 100',
      'Mesh Metal Desktop File Document Tray 3-Tier', 'Pencil Cup Desk Pen Organizer Black Mesh', 'PU Leather Large Desk Blotter Pad 36x20in',
      'Clear Acrylic Desktop Monitor Riser Stand', 'Dual-Powered 12-Digit Desktop Calculator', 'Plastic Expanding File Folder 13 Pockets',
      'Heavy Duty 3-Ring Binder 2-inch White (2-pk)', 'Plastic Sheet Protectors Heavy Weight 100ct', 'Index Tab Dividers 8-Tab Multicolor 3-Sets',
      'Dry Erase Whiteboard 24x18in Magnetic', 'Magnetic Dry Erase Markers Low Odor 8-Pack', 'Whiteboard Microfiber Eraser Magnetic 2-pk',
      'Natural Cork Bulletin Board Wood Frame 24x18', 'Wooden Push Pins Thumb Tacks Box of 100', 'Stainless Steel Metric Ruler 12-inch / 30cm',
      'Precision Utility Craft Hobby Knife w/ Blades', 'Self-Healing Cutting Mat 12x18in A3 Grid', 'Label Maker Handheld Thermal Bluetooth',
      'Adhesive Thermal Continuous Paper Rolls 3x', 'Color Coding Dot Stickers Assorted 1000ct', 'Plastic Envelope Wallets Snap Closure 6x',
      'Daily Productivity Planner Non-Dated 6-Month', 'Weekly Desk Pad Tear-Off Schedule 52 Sheets', 'Habit Tracker Journal Wire-O Bound',
      'Watercolor Paint Set 36 Colors with Brush', 'Cold-Press Watercolor Paper Pad 300gsm A4', 'Sketchbook Hardcover Spiral 100lb 100 Sheets',
      'Charcoal Sketching Pencils Set of 12', 'Eraser Pencil Kneaded & Vinyl Erasers 4-pk', 'Calligraphy Brush Pen Set Lettering 4-Sizes',
      'Washi Tape Decorative Foil Rolls 10-Pack', 'Sticker Storage Album Reusable Release Paper', 'Book Stand Desktop Reading Rest Adjustable',
      'LED Clip-On Book Reading Light Rechargeable', 'Magnetic Bookmark Clips Set of 6 Vintage', 'Address and Password Keeper Book Wire-O',
      'Polypropylene Envelopes Letter Size 10-pk', 'Legal Writing Pads 50 Sheets Canary 6-Pack', 'Carbonless Sales Order Book 2-Part 50 Sets',
      'Compact Cash Box with Money Tray Key Lock', 'Thermal Paper Register Rolls 3-1/8in 10-pk', 'Heavy Duty Packing Tape with Dispenser 2in'
    ]
  },
  // Category 8: Hardware & Tools (65 items)
  {
    prefix: 'HDW',
    catId: 8,
    catName: 'Hardware & Tools',
    templates: [
      'Cordless Drill Driver 20V Lithium-Ion Kit', 'Magnetic Precision Screwdriver Set 64-in-1', 'Heavy Duty Tape Measure 25-Foot Dual Scale',
      'Torpedo Level 9-inch Magnetic 3-Vial', 'Claw Hammer 16oz Fiberglass Shock Reduction', 'Adjustable Wrench 10-inch Chrome Vanadium',
      'Linesman Pliers 8-inch High Leverage Grip', 'Needle Nose Pliers 6-inch Spring Loaded', 'Diagonal Wire Cutting Pliers 7-inch Flush',
      'Utility Box Cutter Knife Retractable (2-pk)', 'Replacement Utility Blades Carbon Steel 50x', 'Heavy Duty Duct Tape 2-inch x 60 Yards',
      'Electrical Insulation Tape PVC 5-Roll Variety', 'Waterproof Silicone Sealant Clear 300ml', 'Caulking Gun Drip-Free Smooth Rod 10oz',
      'Drywall Anchors and Screws Assortment 200pc', 'Stainless Wood Screws Self-Tapping 300pc', 'Hex Key Allen Wrench Set Metric/SAE 30-pc',
      'Ratchet Socket Wrench Set 1/4 & 3/8-inch 40pc', 'Plumbers PTFE Thread Seal Tape 1/2in 5-pk', 'Heavy Duty Cable Zip Ties 12-inch 100-Pack',
      'Adjustable Wire Stripper and Crimper 8-in-1', 'Digital Multimeter Auto-Ranging 600V AC/DC', 'Voltage Detector Pen Non-Contact AC 90-1000V',
      'Safety Goggles Anti-Fog Scratch Resistant', 'Nitrile Work Gloves Heavy Grip Touchscreen L', 'Leather Palm Work Safety Gloves Pair XL',
      'Dust Mask Particulate Respirator Box of 20', 'Foam Earplugs Noise Reduction 32dB 50-Pairs', 'Knee Pads Gel Cushion Flooring Work Pro',
      'Magnetic Parts Tray Stainless Steel 6-inch', 'Telescoping Magnetic Pickup Tool with LED', 'Inspection Mirror Swivel Ball Joint Telescopic',
      'LED Work Light Magnetic Base Swivel Hook 800lm', 'Heavy Duty Steel Extension Cord 25ft 14AWG', 'Plastic Hardware Storage Organizer 30 Drawers',
      'Tool Bag 16-inch Wide Mouth Canvas 14-Pockets', 'Foldable Step Stool Heavy Duty 300lb Anti-Slip', 'Bungee Cords with Metal Hooks Assorted 10-pk',
      'Ratchet Tie Down Straps 1-inch x 15ft 4-Pack', 'Heavy Duty Wheelbarrow Inner Tube 4.80/4.00-8', 'Lubricant Spray Multi-Use Penetrating 400ml',
      'Silicone Lubricant Waterproof Spray 300ml', 'Contact Cleaner Quick Drying Electrical 250ml', 'Heavy Duty Hand Cleaner Citrus Pumice 1L',
      'All-Purpose Sandpaper Sheets Assorted 20-pk', 'Sanding Sponge Block Medium & Fine (4-pk)', 'Wood Glue Quick Dry Waterproof 500ml',
      'Super Glue Gel Precision No-Drip (3-Pack)', 'Epoxy Putty Steel Reinforced 2-Part Stick', 'Picture Hanging Hardware Kit 220 Pieces',
      'Felt Furniture Pads Floor Protectors 180pc', 'Self-Adhesive Rubber Bumper Pads Clear 100pc', 'Draft Stopper Door Seal Weatherstripping 39in',
      'Window Insulation Foam Tape Adhesive 17ft', 'Drain Snake Hair Clog Remover Tool (3-pk)', 'Plunger Heavy Duty Toilet Flange with Caddy',
      'LED Headlamp Hard Hat Clips Pack of 4', 'Carpenter Wood Pencils Octagonal 12-Pack', 'Chalk Line Reel with Blue Chalk Powder 100ft',
      'Hacksaw 12-inch Adjustable Tension Frame', 'C-Clamp 3-inch Ductile Cast Iron Heavy Duty', 'Bar Clamp 12-inch Quick Release Spreader (2-pk)'
    ]
  }
];

// Helper to deterministically build 520+ items
export function generateSeedInventory() {
  const items = [];
  let idCounter = 1;

  const now = new Date();
  const aisles = ['Aisle 1', 'Aisle 2', 'Aisle 3', 'Aisle 4', 'Aisle 5', 'Aisle 6', 'Aisle 7', 'Aisle 8', 'Warehouse Bay A', 'Warehouse Bay B'];
  const shelves = ['Rack A', 'Rack B', 'Rack C', 'Rack D', 'Bin 01', 'Bin 02', 'Bin 03', 'Shelf 1', 'Shelf 2', 'Shelf 3'];

  ITEM_CATALOG.forEach((cat) => {
    cat.templates.forEach((name, index) => {
      const id = idCounter++;
      const skuNumber = (1000 + id).toString();
      const sku = `${cat.prefix}-${skuNumber}`;
      const barcode = `890${cat.catId.toString().padStart(2, '0')}${skuNumber.padStart(8, '0')}`;

      // Distribute stock numbers realistically:
      // ~5% out of stock (stock = 0)
      // ~15% low stock (stock <= reorderPoint)
      // ~80% healthy stock (stock > reorderPoint)
      const seedMod = (id * 17 + index * 31) % 100;
      let currentStock;
      let reorderPoint = 10 + ((id * 7) % 20); // 10 to 29

      if (seedMod < 5) {
        currentStock = 0; // Out of stock
      } else if (seedMod < 22) {
        currentStock = Math.max(1, Math.floor(reorderPoint * 0.45)); // Low stock
      } else {
        currentStock = reorderPoint + 12 + ((id * 13) % 95); // Healthy: 22 to 130
      }

      // Base pricing
      const costBasis = 3.5 + ((id * 4.3) % 75);
      const costPrice = parseFloat(costBasis.toFixed(2));
      const retailPrice = parseFloat((costBasis * (1.35 + ((id * 3) % 45) / 100)).toFixed(2));

      // Supplier distribution
      const supplier = SUPPLIERS[(id + index) % SUPPLIERS.length];

      // Physical location in store
      const aisle = aisles[(cat.catId - 1 + ((id * 3) % aisles.length)) % aisles.length];
      const shelf = shelves[(index + id) % shelves.length];
      const location = `${aisle}, ${shelf}`;

      // Audit status & timestamp
      // Audit status: "audited", "pending", "discrepancy"
      let auditStatus = 'pending';
      let lastAuditedDate = new Date(now.getTime() - ((id * 37) % 14) * 86400000);
      let discrepancyQty = 0;

      if (seedMod % 5 === 0) {
        auditStatus = 'audited';
        lastAuditedDate = new Date(now.getTime() - ((id * 7) % 12) * 3600000); // audited today
      } else if (seedMod % 13 === 0) {
        auditStatus = 'discrepancy';
        discrepancyQty = (seedMod % 2 === 0 ? 1 : -1) * (1 + (id % 4));
        lastAuditedDate = new Date(now.getTime() - ((id * 11) % 18) * 3600000);
      }

      items.push({
        id,
        sku,
        barcode,
        name,
        categoryId: cat.catId,
        category: cat.catName,
        currentStock,
        reorderPoint,
        costPrice,
        retailPrice,
        supplierId: supplier.id,
        supplierName: supplier.name,
        location,
        lastAudited: lastAuditedDate.toISOString(),
        auditStatus,
        discrepancyQty,
        active: true,
        updatedAt: lastAuditedDate.toISOString()
      });
    });
  });

  return items;
}
