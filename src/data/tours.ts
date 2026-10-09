export interface Tour {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  area: string;
  themes: string[]; // All modes & themes unified under Theme as requested
  duration: string;
  timings: string;
  meetingPoint: string;
  priceShared: number;
  pricePrivate: number;
  currency: string;
  overview: string;
  oneLineHook?: string;
  highlights: string[];
  specialInstructions?: string[];
  imageUrl: string;
  gallery: string[];
  seasonNote?: string;
  groupSize?: string;
}

export const TOURS_DATA: Tour[] = [
  {
    id: 'white-town',
    slug: 'in-the-footsteps-of-the-raj',
    title: 'In the footsteps of the Raj / White Town Walk',
    subtitle: 'Dalhousie Square',
    area: 'Dalhousie Square (B.B.D. Bagh)',
    themes: ['Colonial', 'Architecture', 'Photography', 'Walk'],
    duration: '3 Hours',
    timings: '0700 hrs to 1000 hrs (Apr - Sep) / 0800 hrs to 1100 hrs (Oct - Mar)',
    meetingPoint: 'Outside Indian Airlines / Air India building, Central Avenue',
    priceShared: 2500,
    pricePrivate: 4000,
    currency: 'INR',
    oneLineHook: 'The making of the British Colonial Capital and the second city of the Empire.',
    overview: 'The British had sought to build ‘the second city of the Empire’ right here and it is this ‘building’ that we’ll show you in the course of our walk through the ‘European’ areas of what was once the capital of the British Empire in India. There are major plans on to beautify and restore this heritage site with its rich and varied architectural styles. One of our most popular walks this serves as the perfect introduction to British Calcutta and gives you a sneak peek into what went into the making of the Colonial Capital of India. So prepare to whet your appetite for all things Raj.',
    highlights: [
      'Writers’ Building and the historic tank Lal Dighi',
      'General Post Office (GPO) standing on the site of the Old Fort William',
      'St. John’s Church and Job Charnock’s Mausoleum (1695)',
      'Raj Bhavan (Government House) and the High Court of Calcutta',
      'Lalit Great Eastern Hotel (operating since 1840)'
    ],
    specialInstructions: [
      'Wear comfortable walking shoes suitable for heritage pavements.',
      'Modest dress code recommended as we visit active colonial churches.',
      'Water bottles and morning tea stop provided.'
    ],
    imageUrl: '/images/tours/wm-raj.jpg',
    gallery: [
      '/images/tours/wm-raj.jpg',
      '/images/tours/wm-victoria.jpg',
      '/images/tours/wm-chowringhee.jpg'
    ],
    groupSize: 'Max 8 walkers for an intimate experience',
    seasonNote: 'Operates daily morning year-round'
  },
  {
    id: 'kumartuli-goddess',
    slug: 'bringing-the-goddess-to-earth',
    title: 'Bringing the Goddess To Earth',
    subtitle: 'Life By The River Walk',
    area: 'Flower Market to Kumartuli',
    themes: ['Bengali', 'Hooghly', 'Bazaars', 'Photography', 'Walk'],
    duration: '3.5 Hours',
    timings: '0700 hrs to 1000 hrs (Apr - Sep) / 0800 hrs to 1100 hrs (Oct - Mar)',
    meetingPoint: 'Outside North Port Police Station, Strand Road',
    priceShared: 2500,
    pricePrivate: 4000,
    currency: 'INR',
    oneLineHook: 'Sacred clay, river ghats, and artisan idol-makers who sculpt deities from Ganga silt.',
    overview: 'Our river is the Hooghly, a tributary of the Ganges. It is integral to the very identity of Bengal. It gives and sustains life for the millions that depend on it. From the wrestlers who exercise on its soft clay to the boatmen who ferry people across, from the flower sellers who need the water to keep their produce fresh to the boys who throw magnets and retrieve coins from the riverbed, to the idol makers of Kumartuli who sculpt deities from its holy silt, this walk celebrates life along the river.',
    highlights: [
      'Mullick Ghat Flower Market – Asia’s largest fragrant flower trading hub',
      'Wrestling akharas on the banks of holy river Hooghly',
      'Kumartuli artisan quarters where clay idols of Durga are shaped by hand',
      'Traditional country ferry ride across the waters under Howrah Bridge',
      'Potters mixing bamboo armature, straw, and alluvial Ganga clay'
    ],
    specialInstructions: [
      'Watch your step along wet flower market lanes and river ghat steps.',
      'Photography is warmly welcomed by artisans; always ask courteous permission.',
      'Terracotta tea cups (bharer cha) included.'
    ],
    imageUrl: '/images/tours/wm-kumartuli.jpg',
    gallery: [
      '/images/tours/wm-kumartuli.jpg',
      '/images/tours/wm-sunsetriver.jpg',
      '/images/tours/wm-sovabazar.jpg'
    ],
    groupSize: 'Max 8 walkers',
    seasonNote: 'Spectacular year-round, peaking before Durga Puja festival'
  },
  {
    id: 'black-town',
    slug: 'the-star-still-shines',
    title: 'The Star Still Shines / Black Town Walk',
    subtitle: 'Sovabazar & North Calcutta',
    area: 'Sovabazar',
    themes: ['Bengali', 'Architecture', 'Bazaars', 'Photography', 'Walk'],
    duration: '3 Hours',
    timings: '0700 hrs to 1000 hrs (Apr - Sep) / 0800 hrs to 1100 hrs (Oct - Mar)',
    meetingPoint: 'Girish Park Metro Station Exit No. 1',
    priceShared: 2500,
    pricePrivate: 4000,
    currency: 'INR',
    oneLineHook: 'The aristocracy of old Bengal, courtyard mansions, and intellectual salons.',
    overview: 'The ever-vital hub of traditional Bengali culture, ‘the natives’ area’, Sovabazar is all this and much more. This area contains a fascinatingly cosmopolitan blend of the seemingly incongruous architectural forms (from Islamic to Baroque, from Victorian to Bengali) which made up the old world dwellings of the city’s wealthier Bengalis. No one who wishes to savor the authentic flavor of Bengali culture and cuisine can afford to miss this.',
    highlights: [
      'Sovabazar Rajbari – the grand palace where Robert Clive celebrated Durga Puja in 1757',
      'Thakur Dalan courtyard mansions with neo-classical Corinthian columns',
      'Historic sweet shops serving traditional Sandesh and Mishti Doi',
      'Twisting historic lanes untouched by modern high-rises',
      'Ancestral private shrines and cast-iron balconies'
    ],
    specialInstructions: [
      'Modest footwear easy to slip off when entering sacred courtyards.',
      'Sampling heritage Bengali sweets included in the walk.'
    ],
    imageUrl: '/images/tours/wm-sovabazar.jpg',
    gallery: [
      '/images/tours/wm-sovabazar.jpg',
      '/images/tours/wm-kumartuli.jpg',
      '/images/tours/wm-raj.jpg'
    ],
    groupSize: 'Max 8 walkers'
  },
  {
    id: 'confluence-cultures',
    slug: 'confluence-of-cultures',
    title: 'Confluence Of Cultures / The Melting Pot Walk',
    subtitle: 'Bow Barracks to Burrabazar',
    area: 'Central Calcutta & Bow Barracks',
    themes: ['Multicultural', 'Colonial', 'Bazaars', 'Photography', 'Food', 'Walk'],
    duration: '3 Hours',
    timings: '0700 hrs to 1000 hrs (Apr - Sep) / 0800 hrs to 1100 hrs (Oct - Mar)',
    meetingPoint: 'Outside Air India building, Central Avenue (CR Avenue)',
    priceShared: 2500,
    pricePrivate: 4000,
    currency: 'INR',
    oneLineHook: 'Armenians, Anglo-Indians, Jews, Chinese, Parsis, and Muslims in one sacred mile.',
    overview: 'Hundreds of cultures made Calcutta its cosmopolitan self. Among the most prominent of them being Armenian, Jewish, Chinese, Islamic, Jain, Buddhist coupled with the old influence of the Portuguese, the Scottish, the Greek and so on. We show you the same through a tour of their various worship and cultural centers.',
    highlights: [
      'Bow Barracks – the red-brick Anglo-Indian residential enclave',
      'Armenian Church of Holy Nazareth (1724) – one of the oldest churches in Calcutta',
      'Magen David & Beth El Synagogues – magnificent Renaissance Jewish temples',
      'Sea Ip Temple and old Chinese cantonment associations',
      'Nahoum & Sons – century-old Jewish bakery in New Market'
    ],
    specialInstructions: [
      'Valid passport or government photo ID required for synagogue security entry.',
      'Dress respectfully covering shoulders and knees.'
    ],
    imageUrl: '/images/tours/wm-confluence.jpg',
    gallery: [
      '/images/tours/wm-confluence.jpg',
      '/images/tours/wm-streetfood.jpg',
      '/images/tours/wm-raj.jpg'
    ],
    groupSize: 'Max 8 walkers'
  },
  {
    id: 'cabin-food',
    slug: 'cabin-food-walk',
    title: 'Cabin Food Walk',
    subtitle: 'Indian Coffee House and around',
    area: 'College Street & Esplanade',
    themes: ['Food', 'Bengali', 'Bazaars', 'Walk'],
    duration: '3 Hours',
    timings: 'Any 3 hours between 10:00 AM and 10:00 PM',
    meetingPoint: 'Oberoi Grand hotel lobby, Chowringhee Road',
    priceShared: 3500,
    pricePrivate: 5000,
    currency: 'INR',
    oneLineHook: 'Heritage wooden cabins, mutton Kabiraji cutlets, and vintage adda culture.',
    overview: 'It is something that has been known for a while and a belief we at Calcutta Walks strongly stand by, that food is one of the strongest connects you can have with any city. Any cuisine with its varied flavours, common ingredients and distinct taste adds a unique identity to a place. Join us through iconic culinary cabins, cutlets, fowl rolls, and heritage intellectual addas.',
    highlights: [
      'Indian Coffee House – historic gathering place of revolutionaries, poets, and Nobel laureates',
      'Centuries-old wooden dining cabins created for purdah dining and secretive political discussions',
      'Mutton Cutlets, Kabiraji cutlets with delicate lacy egg crusts',
      'Authentic sweet stops for kacha golla and baked sandesh',
      'Filtered coffee and hot aromatic street tea'
    ],
    specialInstructions: [
      'Arrive with a ravenous appetite; ample food sampling included.',
      'Vegetarian alternatives thoughtfully accommodated at all stops.'
    ],
    imageUrl: '/images/tours/wm-cook.jpg',
    gallery: [
      '/images/tours/wm-cook.jpg',
      '/images/tours/wm-streetfood.jpg',
      '/images/tours/wm-confluence.jpg'
    ],
    groupSize: 'Intimate groups (max 6)'
  },
  {
    id: 'cook-bongs',
    slug: 'cook-as-the-bongs-do',
    title: 'Cook as the Bongs do / Bengali Cooking Experience',
    subtitle: 'Lake Market / Jadu Babu Bazar',
    area: 'Lake Market & South Calcutta',
    themes: ['Bengali', 'Food', 'Bazaars', 'Walk'],
    duration: '3.5 Hours',
    timings: '1800 hrs to 2130 hrs',
    meetingPoint: 'Lake Market / Jadu Babu Bazar or your hotel lobby',
    priceShared: 4000,
    pricePrivate: 5000,
    currency: 'INR',
    oneLineHook: 'Bazaar shopping for fresh fish and mustard, followed by home cooking in a Bengali kitchen.',
    overview: 'Bengal is a foodie’s paradise and more so Calcutta, where various adventurers have left their gastronomical imprints. We take you through an experience not easy to forget…especially because of the satiating burps afterwards. A walk through the market will familiarize you with the ingredients that go into the making of some of authentic Bengali food and we follow that up with hands-on cooking in a traditional household.',
    highlights: [
      'Guided fish and spice shopping inside South Calcutta’s bustling Lake Market',
      'Panch Phoron (five-spice blend) and mustard oil cooking techniques',
      'Preparation of Shorshe Ilish / Bhetki maach, Luchi, and Kosha Mangsho',
      'Interactive sit-down dinner on bell-metal plates (kashar thala)',
      'Learning authentic heirloom recipes directly from family cooks'
    ],
    specialInstructions: [
      'Includes market ingredients, full multi-course dinner, and home kitchen workshop.',
      'Both non-vegetarian and traditional Bengali vegetarian options curated.'
    ],
    imageUrl: '/images/tours/wm-cook.jpg',
    gallery: [
      '/images/tours/wm-cook.jpg',
      '/images/tours/wm-streetfood.jpg',
      '/images/tours/wm-sovabazar.jpg'
    ],
    groupSize: 'Min 2 pax, maximum 6 pax'
  },
  {
    id: 'street-food-tour',
    slug: 'street-food-calcutta',
    title: 'Street Food Calcutta Tours',
    subtitle: 'New Market and around',
    area: 'New Market, Dacres Lane & Esplanade',
    themes: ['Food', 'Bazaars', 'Car/Coach', 'Walk'],
    duration: '4 Hours (Half Day)',
    timings: '0800 hrs onwards or 1500 hrs',
    meetingPoint: 'Your hotel lobby',
    priceShared: 3000,
    pricePrivate: 4000,
    currency: 'INR',
    oneLineHook: 'Kathi rolls, puchkas, telebhaja, and British colonial office snack lanes.',
    overview: 'You get to experience some of the best food in the world at a fraction of the cost that you’d pay anywhere else. While some food items developed indigenously most have been brought in by the many settlers who came in attracted by the city’s trade. Includes car, guide, and all food and entry fees.',
    highlights: [
      'Dacres Lane (James Hickey Sarani) – Calcutta’s legendary century-old street kitchen alley',
      'Nizam’s or Kusum Rolls – birthplace of the authentic paratha Kathi roll',
      'Puchka tasting with spiced tamarind water from hygienic vetted vendors',
      'Singhara, Telebhaja, and Tibetan Momos at Tiretta Bazaar',
      'Mishti kulfi, rabdi, and mishti doi dessert finales'
    ],
    specialInstructions: [
      'All tastings vetted for stringent culinary hygiene and mineral water usage.',
      'Comfortable walking shoes and empty stomachs required.'
    ],
    imageUrl: '/images/tours/wm-streetfood.jpg',
    gallery: [
      '/images/tours/wm-streetfood.jpg',
      '/images/tours/wm-cook.jpg',
      '/images/tours/wm-carcoach.jpg'
    ],
    groupSize: 'Min 2 pax'
  },
  {
    id: 'now-thats-entertainment',
    slug: 'now-thats-entertainment',
    title: 'Now That’s Entertainment',
    subtitle: 'Park Street - Societies to Cemeteries Walk',
    area: 'Park Street',
    themes: ['Colonial', 'Architecture', 'Photography', 'Walk'],
    duration: '3 Hours',
    timings: '0800 hrs to 1100 hrs or 1500 hrs to 1800 hrs',
    meetingPoint: 'Main Entrance of The Asiatic Society, 1 Park Street',
    priceShared: 2500,
    pricePrivate: 4000,
    currency: 'INR',
    oneLineHook: 'The pleasure capital of the British Empire, jazz clubs, and gothic cemeteries.',
    overview: 'Park Street ‘The City That Never Sleeps’ as well as the erstwhile ‘Burial Ground Road’, welcome to the Park Street. If Calcutta was the capital of the British Raj, then Park Street was the capital street of the city, where the rich and the famous lived, dined and made merry. Here, we will traverse down this hugely famous as well as infamous promenade and pay homage to the pleasure capital of the British empire. So, come with us as we take you from one end of the street to the other taking in restaurants, watering holes, hotels, the churches, colleges, stately homes and the burial ground.',
    highlights: [
      'The Asiatic Society (1784) founded by Sir William Jones',
      'South Park Street Cemetery (1767) – grand neoclassical and gothic mausoleums hidden under tropical foliage',
      'St. Xavier’s College and historic colonial mansions',
      'Flurys tearoom – vintage confectionery serving rum balls since 1927',
      'Legendary jazz clubs and dining institutions of the 1960s'
    ],
    specialInstructions: [
      'Shaded pathways inside cemetery; mosquito repellant recommended.',
      'Entry fees and refreshments included.'
    ],
    imageUrl: '/images/tours/wm-parkstreet.jpg',
    gallery: [
      '/images/tours/wm-parkstreet.jpg',
      '/images/tours/wm-chowringhee.jpg',
      '/images/tours/wm-victoria.jpg'
    ],
    groupSize: 'Max 8 walkers'
  },
  {
    id: 'bicycle-tour',
    slug: 'sunrise-on-two-wheels',
    title: 'Pedalling through the Old City / Bicycle Tour',
    subtitle: 'CalWALKS on Two Wheels',
    area: 'White Town | Black Town | Grey Town | Riverside | Wetlands',
    themes: ['Bicycle', 'Colonial', 'Bengali', 'Architecture', 'Hooghly'],
    duration: '3 Hours',
    timings: '0600 hrs to 0900 hrs',
    meetingPoint: 'Indian Airlines Building, Central Avenue',
    priceShared: 2500,
    pricePrivate: 4000,
    currency: 'INR',
    oneLineHook: 'Pedal through the quiet awakening of Calcutta before the traffic rules kick in.',
    overview: 'We set out early morning, much before the rules against bicycles kick in, on an exploration of the old city of Calcutta – through its unique and interesting localities. Comfortable clothing, average biking ability, hugging corners while pedalling with your Explorer through silent colonial avenues, Victoria Memorial, Maidan, and river ghats. Inclusive of bicycle, entry fees, water and guide.',
    highlights: [
      'Gliding through the mist of the Maidan and around Victoria Memorial',
      'Prinsep Ghat on the Hooghly river with neoclassical Corinthian pavilions',
      'Empty boulevards of Dalhousie Square before morning buses awaken',
      'Old Chinatown and ancient Portuguese lanes',
      'Hot chai and kachoris at an authentic morning street stall'
    ],
    specialInstructions: [
      'Geared bicycles and safety helmets provided.',
      'Average cycling capability required.',
      'Hotel pickup and drop available as an add-on (INR 1,000).'
    ],
    imageUrl: '/images/tours/wm-bicycle.jpg',
    gallery: [
      '/images/tours/wm-bicycle.jpg',
      '/images/tours/wm-victoria.jpg',
      '/images/tours/wm-chowringhee.jpg'
    ],
    groupSize: 'Max 6 cyclists'
  },
  {
    id: 'car-coach-tour',
    slug: 'kolkata-city-tours-car-coach',
    title: 'Kolkata City Tours (Car/Coach)',
    subtitle: 'Colonial Calcutta | Bazaars | Renaissance Bengal | Kali Temples',
    area: 'Greater Kolkata Citywide',
    themes: ['Car/Coach', 'Colonial', 'Bengali', 'Architecture', 'Multicultural'],
    duration: 'Half Day (4 hrs) or Full Day (8 hrs)',
    timings: '0800 hrs onwards',
    meetingPoint: 'Your hotel lobby',
    priceShared: 5000,
    pricePrivate: 7000,
    currency: 'INR',
    oneLineHook: 'Comfortable air-conditioned private exploration of the city’s landmark monuments.',
    overview: 'A Half Day City Tour lasting for about 4 hours from pickup to drop costs INR 5000 per person inclusive of car, guide and entry fees. A Full Day City Tour lasts for about 8 hours and costs INR 7000 per person with the same inclusions. Minimum 2 people needed to run, or 1 willing to pay for 2. We cover major architectural landmarks, Kalighat Kali Temple, Victoria Memorial, and iconic quarters with effortless comfort.',
    highlights: [
      'Victoria Memorial hall and landscaped royal gardens',
      'Kalighat Kali Temple – 200-year-old sacred pilgrimage shrine',
      'St. Paul’s Cathedral – Indo-Gothic masterpiece',
      'Indian Museum – oldest and largest museum in the Asia-Pacific region',
      'Marble Palace and Jorasanko Thakur Bari (Tagore’s ancestral house)'
    ],
    specialInstructions: [
      'Chauffeured air-conditioned private vehicle provided door-to-door.',
      'Entry tickets, guide fees, and chilled bottled water included.'
    ],
    imageUrl: '/images/tours/wm-carcoach.jpg',
    gallery: [
      '/images/tours/wm-carcoach.jpg',
      '/images/tours/wm-victoria.jpg',
      '/images/tours/wm-raj.jpg'
    ],
    groupSize: 'Private party (2 to 6 pax)'
  },
  {
    id: 'good-morning-calcutta',
    slug: 'good-morning-calcutta-motorbike',
    title: 'Good Morning Calcutta! / A Royal Enfield Motorbike Tour',
    subtitle: 'Old City to Botanical Gardens via Howrah Bridge',
    area: 'Howrah Bridge to Botanical Gardens',
    themes: ['Motorbike', 'Food', 'Photography', 'Hooghly'],
    duration: '4 Hours',
    timings: '0800 hrs to 1200 hrs',
    meetingPoint: 'Your hotel lobby',
    priceShared: 4000,
    pricePrivate: 6000,
    currency: 'INR',
    oneLineHook: 'Riding pillion or captain on iconic Royal Enfield 350cc/500cc bullets across the river.',
    overview: 'The city from a Royal-Enfield-rider’s perspective. Simply because maneuvering through the old town is easier and faster this way, and we love these beasts that have been in production in our country ever since WWII. Join us on a discovery of the old city and crossing over the mighty cantilever Howrah Bridge all the way to the lush Acharya Jagadish Chandra Bose Indian Botanic Garden.',
    highlights: [
      'Crossing the legendary steel cantilever Howrah Bridge on a roaring Royal Enfield',
      'The Great Banyan Tree – 250-year-old botanical wonder spanning over 3.5 acres',
      'Riverside breeze along the Grand Trunk Road',
      'Breakfast stops for authentic club kachori and hot chai',
      'Thrilling ride through the historic trade terminals of Howrah'
    ],
    specialInstructions: [
      'Rider with chauffeur explorer or self-riding option for experienced motorcyclists with valid license.',
      'Helmets and fuel provided.'
    ],
    imageUrl: '/images/tours/wm-goodmorning.jpg',
    gallery: [
      '/images/tours/wm-goodmorning.jpg',
      '/images/tours/wm-sunsetriver.jpg'
    ],
    groupSize: 'Min 2 pax'
  },
  {
    id: 'little-europe-motorbike',
    slug: 'little-europe-motorbike-tour',
    title: 'Little Europe Motorbike Tour',
    subtitle: 'Barrackpore to Bandel along the Ganges',
    area: 'Hooghly River Colonies',
    themes: ['Motorbike', 'Colonial', 'Architecture', 'Photography'],
    duration: 'Full Day (8 Hours)',
    timings: '0700 hrs to 1600 hrs',
    meetingPoint: 'Your hotel lobby',
    priceShared: 4000,
    pricePrivate: 6000,
    currency: 'INR',
    oneLineHook: 'Five European nations along 50 kilometers of the river: British, French, Danish, Portuguese, and Dutch.',
    overview: 'On regal Royal Enfield motorbikes this tour takes you to all the different European colonies that existed around the Ganges. We start with Barrackpore, once home to British army and site of the beginning of the 1857 revolt, visit Serampore (Danish), Chandannagar (French), Chinsurah (Dutch), and end at Hooghly & Bandel, once home to the earliest Portuguese settlement and the historic Basilica.',
    highlights: [
      'Barrackpore Government House & Flagstaff Park',
      'Serampore – Danish settlement, St. Olav’s Church & Carey Museum',
      'Chandannagar – French promenade, Strand, and French Institute',
      'Chinsurah – Dutch cemetery and colonial governor’s quarters',
      'Bandel Church (1599) – oldest Christian church in Bengal'
    ],
    specialInstructions: [
      'Full day motorcycle excursion covering 100+ km round-trip.',
      'Lunch, bottled water, helmets, and entry fees included.'
    ],
    imageUrl: '/images/tours/wm-goodmorning.jpg',
    gallery: [
      '/images/tours/wm-goodmorning.jpg',
      '/images/tours/wm-raj.jpg'
    ],
    groupSize: 'Min 2 pax'
  },
  {
    id: 'greater-calcutta-cruise',
    slug: 'greater-calcutta-cruise',
    title: 'Greater Calcutta Cruise',
    subtitle: 'Belur Math to Botanical Gardens',
    area: 'Hooghly River',
    themes: ['River Boat', 'Colonial', 'Bengali', 'Hooghly', 'Food'],
    duration: '6 Hours',
    timings: '0800 hrs to 1400 hrs',
    meetingPoint: 'Millennium Park Jetty',
    priceShared: 3500,
    pricePrivate: 7000,
    currency: 'INR',
    oneLineHook: 'Sailing upriver with onboard breakfast and lunch, visiting Belur Math and Botanical Gardens.',
    overview: 'The cruise starts at 8 am and takes you to the pristine Belur Math for a greater understanding into who created the famous Ramakrishna Mission and how. With breakfast and lunch on board we also visit the Botanical Gardens, home of the famous Banyan Tree, the largest living canopy on earth. Relax on the open deck while watching centuries of river history float past.',
    highlights: [
      'Sailing past Howrah Bridge, Armenian Ghat, and flower markets',
      'Belur Math – international headquarters of Ramakrishna Math synthesizing Hindu, Christian, and Islamic motifs',
      'Acharya Jagadish Chandra Bose Indian Botanic Garden',
      'Fresh Bengali breakfast and traditional lunch prepared and served on board',
      'Uninterrupted photography of river ghats and wooden country boats'
    ],
    specialInstructions: [
      'Life jackets and certified boat crew provided.',
      'Meals and guide fees included in tariff.'
    ],
    imageUrl: '/images/tours/wm-calcruise.jpg',
    gallery: [
      '/images/tours/wm-calcruise.jpg',
      '/images/tours/wm-sunsetriver.jpg'
    ],
    groupSize: 'Min 2 pax'
  },
  {
    id: 'sunset-river-cruise',
    slug: 'sailing-towards-the-goddess',
    title: 'Sailing towards the Goddess / Sunset River Cruise',
    subtitle: 'Belur Math at Twilight',
    area: 'Hooghly River: Babughat to Belur Math',
    themes: ['River Boat', 'Hooghly', 'Bengali'],
    duration: '3 Hours',
    timings: '1530 hrs to 1830 hrs',
    meetingPoint: 'Calcutta Swimming Club Ghat / Babughat',
    priceShared: 5000,
    pricePrivate: 10000,
    currency: 'INR',
    oneLineHook: 'Golden hour sunset over the Hooghly with tea, snacks, and evening aarti.',
    overview: 'Our river is the Hooghly, a tributary of the Ganges. And if it weren’t for that test flight at Kitty Hawk, you probably would’ve sailed down this waterway to our city. Take a breather and join us on a river cruise. Take in the glory of the setting sun on our river Hooghly, while sailing upriver to Belur Math, the international headquarters of the Ramakrishna Mission and Dakshineswar, a unique Kali temple. Includes the company of an Explorer.',
    highlights: [
      'Sunset reflections against the silhouetted spans of Howrah and Vivekananda bridges',
      'Evening arati bells echoing across the riverbanks',
      'Hot masala chai and artisanal Bengali savouries served on the river',
      'Quietude far removed from the city traffic and commotion',
      'Fascinating tales of early maritime merchants and river folklore'
    ],
    specialInstructions: [
      'Bring a light shawl or sweater during winter months.',
      'Relaxed, contemplative experience suitable for all ages.'
    ],
    imageUrl: '/images/tours/wm-sunsetriver.jpg',
    gallery: [
      '/images/tours/wm-sunsetriver.jpg',
      '/images/tours/wm-calcruise.jpg',
      '/images/tours/wm-kumartuli.jpg'
    ],
    groupSize: 'Min 2 pax'
  },
  {
    id: 'public-transport-tour',
    slug: 'public-transport-tour',
    title: 'In Calcutta, do as the Calcuttans do / Public Transport Tour',
    subtitle: 'Chowringhee to Riverside',
    area: 'Central Calcutta to Ghats',
    themes: ['Public Transport', 'Colonial', 'Architecture', 'Multicultural', 'Hooghly', 'Food'],
    duration: '3 Hours',
    timings: '1000 hrs to 1300 hrs',
    meetingPoint: 'The Oberoi Grand hotel lobby, Chowringhee Road',
    priceShared: 3500,
    pricePrivate: 5000,
    currency: 'INR',
    oneLineHook: 'Heritage wooden trams, circular railway, vintage yellow Ambassadors, and river ferries.',
    overview: 'One of the best connected cities of the world, Calcutta has a plethora of options to take you from place to place. The International Association of Public Transport ranks this city among the top 40 cities in urban mobility. Trams were introduced in the 1860s. Horse drawn first, then steam and then electric in 1902. We ride the vintage tram, hop into a quintessential yellow Ambassador cab, take the Circular Railway skirting the riverbanks, and take a country ferry boat across the Hooghly.',
    highlights: [
      'Riding the oldest operating electric tramway system in Asia',
      'Cruising along the waterfront on the Eastern Railway Circular line',
      'Wooden passenger ferry across the river with local commuters',
      'Vintage Hindustan Motors Ambassador yellow cab ride through historic alleys',
      'Experiencing the authentic rhythm of everyday Kolkata citizens'
    ],
    specialInstructions: [
      'All public transport ticketing and tokens included.',
      'Comfortable shoes for stepping onto trams and ferry pontoons.'
    ],
    imageUrl: '/images/tours/wm-publictransport.jpg',
    gallery: [
      '/images/tours/wm-publictransport.jpg',
      '/images/tours/wm-chowringhee.jpg',
      '/images/tours/wm-victoria.jpg'
    ],
    groupSize: 'Max 6 participants'
  },
  {
    id: 'photo-walk-chitpur',
    slug: 'photography-walk-chitpur',
    title: 'Photography Walk – Chitpur Architecture & Jatrapara',
    subtitle: 'Chitpur Road & Battala',
    area: 'Chitpur & Battala',
    themes: ['Photography', 'Architecture', 'Bengali', 'Walk'],
    duration: '3.5 Hours',
    timings: '0700 hrs to 1030 hrs',
    meetingPoint: 'Outside Marble Palace entrance, Muktaram Babu Street',
    priceShared: 3000,
    pricePrivate: 4500,
    currency: 'INR',
    oneLineHook: 'Framing 400-year-old Chitpur Road, wooden block print studios, and jatra theatres.',
    overview: 'Chitpur Road is older than Calcutta itself. It is home to an extraordinary mix of neoclassical mansions, wooden-block Battala printing presses, theatrical Jatra rehearsal clubs, musical instrument craftsmen, and brass foundries. Led by our explorer photographers to capture vintage textures, morning light shafts, and candid portraits.',
    highlights: [
      'Marble Palace facade and surrounding classical courtyards',
      'Battala early Bengali woodcut printing studios and book publishers',
      'Jatra theatrical company offices and hand-painted billboard workshops',
      'Royal Turkish attar perfume shops and harmonium makers',
      'Architectural lighting study of decaying Corinthian pediments and wooden green louvres'
    ],
    specialInstructions: [
      'DSLR, mirrorless, film, or smartphone cameras welcomed.',
      'Tips on street composition, lighting, and ethical community photography.'
    ],
    imageUrl: '/images/tours/wm-raj.jpg',
    gallery: [
      '/images/tours/wm-raj.jpg',
      '/images/tours/wm-sovabazar.jpg'
    ],
    groupSize: 'Max 6 photographers'
  },
  {
    id: 'photo-walk-burrabazar',
    slug: 'photography-walk-burrabazar',
    title: 'Photography Walk – Mechuabazar & Burrabazar Wholesale Market',
    subtitle: 'Asia’s Largest Wholesale Bazaar',
    area: 'Burrabazar & Mechuabazar',
    themes: ['Photography', 'Bazaars', 'Multicultural', 'Walk'],
    duration: '3.5 Hours',
    timings: '0700 hrs to 1030 hrs',
    meetingPoint: 'Armenian Ghat / Howrah Bridge approach',
    priceShared: 3000,
    pricePrivate: 4500,
    currency: 'INR',
    oneLineHook: 'Dense labyrinth of spice markets, fruit auctions, muthiyas (porters), and visual intensity.',
    overview: 'Full Day tailor-made Photography Tour costs INR 6000 per person, or join our morning wholesale market walk. Burrabazar is the undisputed mercantile nerve center of Eastern India. From massive wicker baskets of mangoes and pomegranates at Mechua to gunny sacks of red chillies and cardamom, it is a sensory and photographic wonderland.',
    highlights: [
      'Incredible motion photography of traditional porters balancing colossal loads',
      'Sunbeams cutting through high corrugated alleyways of spice markets',
      'Ancient Marwari and Gujarati havelis with intricate carved wooden brackets',
      'Hand-pulled rickshaws navigating narrow market passages',
      'Rooftop panorama of the frantic bustling trade from elevated stairwells'
    ],
    specialInstructions: [
      'Dress casually and leave non-essential bags at hotel.',
      'Prime golden hour light opportunities.'
    ],
    imageUrl: '/images/tours/wm-streetfood.jpg',
    gallery: [
      '/images/tours/wm-streetfood.jpg',
      '/images/tours/wm-confluence.jpg'
    ],
    groupSize: 'Max 6 photographers'
  },
  {
    id: 'wetlands-tour',
    slug: 'east-calcutta-wetlands',
    title: 'East Calcutta Wetlands Ecological Trail',
    subtitle: 'Ramsar Wetlands Living Wonder',
    area: 'East Kolkata Wetlands Ramsar Site',
    themes: ['Wetlands', 'Bengali', 'Public Transport'],
    duration: '4 Hours',
    timings: '0730 hrs to 1130 hrs',
    meetingPoint: 'Science City Main Gate, J.B.S. Haldane Avenue',
    priceShared: 3000,
    pricePrivate: 4500,
    currency: 'INR',
    oneLineHook: 'The world’s largest organic natural wastewater treatment marvel and urban fish farm.',
    overview: 'Discover the world’s largest organic natural wastewater treatment marvel, where bheries (fish farms) and vegetable plots treat the city’s sewage naturally through solar algae purification without costing the taxpayer a single rupee. A globally celebrated ecological wonder that produces tons of fresh carp and organic vegetables daily.',
    highlights: [
      'Walking along the embankments of ancient traditional fish ponds (bheries)',
      'Meeting local fishermen who cultivate sweet water fish using sun-purified runoff',
      'Birdwatching: kingfishers, openbill storks, and migratory waterfowl',
      'Understanding the pioneering hydrology discovered by local peasant engineers',
      'Fresh coconut water and rural snacks at a village co-operative'
    ],
    specialInstructions: [
      'Hat, sunglasses, and walking shoes recommended for unpaved wetland bunds.',
      'Binoculars available upon advance request.'
    ],
    imageUrl: '/images/tours/wm-victoria.jpg',
    gallery: [
      '/images/tours/wm-victoria.jpg',
      '/images/tours/wm-publictransport.jpg'
    ],
    groupSize: 'Max 8 participants'
  }
];
