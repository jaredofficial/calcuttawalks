export interface ThenNowItem {
  id: string;
  title: string;
  location: string;
  periodThen: string;
  periodNow: string;
  description: string;
  imageThen: string;
  imageNow: string;
  historicalContext: string;
}

export const THEN_NOW_DATA: ThenNowItem[] = [
  {
    id: 'dalhousie-square',
    title: 'Dalhousie Square & General Post Office',
    location: 'Central Calcutta',
    periodThen: 'Circa 1910 (British Empire Zenith)',
    periodNow: 'Present Day (B.B.D. Bagh Heritage Precinct)',
    description: 'The monumental neoclassical rotunda of the General Post Office stood on the historic ramparts of the old Fort William. Horse buggies and early steam tramways shared the wide European thoroughfare.',
    historicalContext: 'Today designated as Benoy-Badal-Dinesh Bagh (B.B.D. Bagh) in honor of three young Bengali revolutionaries who stormed Writers’ Building in 1930. The architectural majesty endures amidst bustling vintage yellow taxis.',
    imageThen: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    imageNow: '/images/tours/wm-raj.jpg'
  },
  {
    id: 'howrah-river',
    title: 'Hooghly River & Howrah Cantilever Bridge',
    location: 'Between Howrah and Kolkata',
    periodThen: 'Circa 1890 (Old Pontoon Bridge Era)',
    periodNow: 'Present Day (The Cantilever Marvel of 1943)',
    description: 'Before 1943, river crossings were operated via Sir Bradford Leslie’s floating pontoon bridge, unbolted each night to let masted merchant ships pass through.',
    historicalContext: 'The current 705-metre balanced cantilever bridge was erected during World War II without a single underwater pylon to avoid disrupting river currents. It remains one of the busiest bridge structures on earth.',
    imageThen: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80',
    imageNow: '/images/tours/wm-sunsetriver.jpg'
  },
  {
    id: 'college-street-trams',
    title: 'College Street Boi Para & Tramline Heritage',
    location: 'North-Central Kolkata',
    periodThen: 'Circa 1920 (Electric Tramway Boom)',
    periodNow: 'Present Day (Asia’s Largest Secondhand Book Market)',
    description: 'Calcutta was the first Asian city to operate electric tram cars in 1902. College Street emerged as the intellectual heartland of universities, printing presses, and freedom-fighting publishing houses.',
    historicalContext: 'Wooden tramcars still gently trundle past thousands of tiny wooden bookstalls piled high with rare Sanskrit manuscripts, Russian translations, and university textbooks under shaded banyan branches.',
    imageThen: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80',
    imageNow: '/images/tours/wm-chowringhee.jpg'
  },
  {
    id: 'kumartuli-sculptors',
    title: 'Kumartuli Clay Potters Quarter',
    location: 'North Calcutta, Riverfront',
    periodThen: 'Circa 1900 (Settlement of Krishnanagar Artisans)',
    periodNow: 'Present Day (Living Global Guild of Idol Makers)',
    description: 'Artisans from Nadia district settled along the riverbanks where holy Ganga silt and straw arrived by wooden country cargo boats.',
    historicalContext: 'Over 450 artisan studios continue to sculpt deities for Durga Puja — now inscribed on the UNESCO Intangible Cultural Heritage of Humanity list.',
    imageThen: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
    imageNow: '/images/tours/wm-kumartuli.jpg'
  }
];

export interface FaqItem {
  id: string;
  category: 'Preparation' | 'Booking & Pricing' | 'Tours & Safety' | 'Sister Properties';
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'f1',
    category: 'Preparation',
    question: 'Why do most morning walks depart so early (07:00 / 08:00 AM)?',
    answer: 'Calcutta is at its most poetic, serene, and magical during early morning hours. Streets are tranquil, traffic is absent, temperature is pleasant, and the soft golden light reveals architectural details that disappear during busy midday hours.'
  },
  {
    id: 'f2',
    category: 'Preparation',
    question: 'What should I wear, and what should I bring?',
    answer: 'Wear comfortable walking shoes with good support. Dress in breathable cotton attire with shoulders and knees covered, as our routes frequently visit active churches, synagogues, and temple courtyards. Bring a hat, sunscreen, and your camera. We supply mineral water and stop for authentic refreshments.'
  },
  {
    id: 'f3',
    category: 'Tours & Safety',
    question: 'How physically demanding are the walking tours?',
    answer: 'Our walks cover approximately 2 to 3.5 kilometres over 3 hours at a relaxed, conversational strolling pace with frequent stops for shade, photography, stories, and tea. Anyone with average walking mobility will enjoy them comfortably.'
  },
  {
    id: 'f4',
    category: 'Tours & Safety',
    question: 'What happens if it rains?',
    answer: 'Kolkata rains are legendary and romantic! Our walks operate rain or shine. In monsoon season, we carry umbrellas, utilize historic colonnades and covered verandahs, and embrace the city’s atmospheric beauty.'
  },
  {
    id: 'f5',
    category: 'Booking & Pricing',
    question: 'What is the difference between Shared and Private tours?',
    answer: 'Shared walks have a strict maximum cap of 6 to 8 guests so conversations remain intimate and personal. Private walks are exclusively reserved for your party, offering customized start times, customized pacing, and hotel lobby pick-up.'
  },
  {
    id: 'f6',
    category: 'Booking & Pricing',
    question: 'Are food and beverages safe on the culinary tours?',
    answer: 'Yes, rigorously so. We only visit historic culinary institutions with impeccable reputations and clean preparation. On street food safaris, our Explorers handpick dishes from high-turnover vendors using verified ingredients and provide sealed bottled water.'
  },
  {
    id: 'f7',
    category: 'Booking & Pricing',
    question: 'What is the cancellation and rescheduling policy?',
    answer: 'Cancellations made 48 hours or more before the scheduled departure receive a full refund or free date rescheduling. Cancellations within 24 to 48 hours receive a 50% credit. Rescheduling is always accommodated if spots are available.'
  },
  {
    id: 'f8',
    category: 'Sister Properties',
    question: 'What are Calcutta Bungalow and Calcutta Rooms?',
    answer: 'Calcutta Bungalow is our award-winning restored 1920s heritage townhouse bed & breakfast in Shyambazar / Fariapukur, designed by Calcutta Walks. Calcutta Rooms offers boutique apartments with vintage charm. Both immerse you in authentic Bengali residential life.'
  }
];

export interface CalendarDeparture {
  id: string;
  date: string;
  dayName: string;
  tourId: string;
  tourTitle: string;
  tourSlug: string;
  timings: string;
  slotsRemaining: number;
  spotsLeft?: number;
  maxSlots: number;
  priceShared: number;
  explorerName: string;
  leadExplorer?: string;
}

export const CALENDAR_DATA: CalendarDeparture[] = [
  {
    id: 'dep-101',
    date: 'Tomorrow, Oct 1',
    dayName: 'Wednesday',
    tourId: 'white-town',
    tourTitle: 'In the Footsteps of the Raj (White Town)',
    tourSlug: 'in-the-footsteps-of-the-raj',
    timings: '08:00 – 11:00 AM',
    slotsRemaining: 3,
    maxSlots: 8,
    priceShared: 2500,
    explorerName: 'Iftekhar Ahsan'
  },
  {
    id: 'dep-102',
    date: 'Thursday, Oct 2',
    dayName: 'Thursday',
    tourId: 'kumartuli-goddess',
    tourTitle: 'Bringing the Goddess to Earth (Kumartuli)',
    tourSlug: 'bringing-the-goddess-to-earth',
    timings: '07:30 – 11:00 AM',
    slotsRemaining: 4,
    maxSlots: 8,
    priceShared: 2500,
    explorerName: 'Tuhina Chatterjee'
  },
  {
    id: 'dep-103',
    date: 'Friday, Oct 3',
    dayName: 'Friday',
    tourId: 'confluence-cultures',
    tourTitle: 'Confluence of Cultures (Melting Pot)',
    tourSlug: 'confluence-of-cultures',
    timings: '07:30 – 10:30 AM',
    slotsRemaining: 2,
    maxSlots: 8,
    priceShared: 2500,
    explorerName: 'Ritwick Ghosh'
  },
  {
    id: 'dep-104',
    date: 'Saturday, Oct 4',
    dayName: 'Saturday',
    tourId: 'cabin-food',
    tourTitle: 'The Legendary Cabin Food Walk',
    tourSlug: 'cabin-food-walk',
    timings: '11:00 AM – 02:00 PM',
    slotsRemaining: 1,
    maxSlots: 6,
    priceShared: 3500,
    explorerName: 'Tuhina Chatterjee'
  },
  {
    id: 'dep-105',
    date: 'Sunday, Oct 5',
    dayName: 'Sunday',
    tourId: 'sunset-river-cruise',
    tourTitle: 'Sailing Towards the Goddess (Sunset Cruise)',
    tourSlug: 'sailing-towards-the-goddess',
    timings: '03:30 – 06:30 PM',
    slotsRemaining: 5,
    maxSlots: 12,
    priceShared: 6500,
    explorerName: 'Iftekhar Ahsan'
  },
  {
    id: 'dep-106',
    date: 'Monday, Oct 6',
    dayName: 'Monday',
    tourId: 'black-town',
    tourTitle: 'The Star Still Shines (Black Town)',
    tourSlug: 'the-star-still-shines',
    timings: '07:30 – 10:30 AM',
    slotsRemaining: 6,
    maxSlots: 8,
    priceShared: 2500,
    explorerName: 'Ramanuj Mukherjee'
  }
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  summary: string;
  excerpt?: string;
  category: string;
  imageUrl: string;
  content: string[];
}

export const BLOG_DATA: BlogPost[] = [
  {
    id: 'b1',
    slug: 'forgotten-chinese-breakfast-tiretta-bazaar',
    title: 'Steaming Dumplings at Dawn: The Living Chinese Legacy of Tiretta Bazaar',
    author: 'Iftekhar Ahsan',
    date: 'Heritage Dispatch',
    readTime: '4 min read',
    summary: 'Before the sun rises over Kolkata, elderly Hakka and Cantonese vendors set up wooden folding tables with steaming pork buns, fish ball soups, and fried wontons in India’s oldest Chinatown.',
    category: 'Culinary Chronicles',
    imageUrl: '/images/tours/wm-confluence.jpg',
    content: [
      'At 5:30 in the morning, when most of the metropolis is wrapped in slumber, Sun Yat Sen Street begins to hum with quiet industry. Steam rises in thick plumes from stacked aluminum steamers, carrying the fragrance of sesame oil, ginger, and scallions.',
      'Tiretta Bazaar is India’s oldest Chinatown, established when the trader Atchew arrived on the banks of the Hooghly in the late 18th century. Today, third and fourth-generation Chinese-Indians gather here to speak Hakka and Bengali in the same breath while serving piping hot breakfast.',
      'To eat here is to participate in living history. The stalls disappear by 8:00 AM as the wholesale leather and hardware shops open. Our morning walk ensures you arrive while the buns are at their fluffiest.'
    ]
  },
  {
    id: 'b2',
    slug: 'cutlets-and-adda-calcutta-cabin-culture',
    title: 'Behind the Green Curtains: Cutlets, Adda, and Revolution in Calcutta Cabins',
    author: 'Tuhina Chatterjee',
    date: 'Culture & Taste',
    readTime: '5 min read',
    summary: 'How Victorian etiquette collided with Bengali nationalism inside the curtained wooden booths of 19th-century cabins like Basanta, Dilkhusa, and Mitra Cafe.',
    category: 'Living Heritage',
    imageUrl: '/images/tours/wm-cook.jpg',
    content: [
      'In Victorian Bengal, dining outside the home was fraught with social taboos. High-caste gentry could not easily be seen dining in public. To solve this dilemma, astute restaurateurs devised "Cabins" — small dining compartments partitioned by dark teak wood and heavy cloth curtains.',
      'Inside these private alcoves, an extraordinary culinary transformation unfolded. British breaded cutlets were reinvented with fiery green chili paste and pungent mustard kasundi. Mutton chops were wrapped in delicate nets of beaten egg to create the legendary "Kobiraji" cutlet.',
      'More crucially, these cabins became the secret meeting hubs for young freedom fighters who debated independence pamphlets while servers stood watch at the doorway.'
    ]
  },
  {
    id: 'b3',
    slug: 'gentle-heartbeat-calcutta-trams',
    title: 'A Song of Metal and Banyan Leaves: Why the Tramways Must Endure',
    author: 'Ramanuj Mukherjee',
    date: 'Urban Musings',
    readTime: '4 min read',
    summary: 'The historic electric tram of Kolkata is not merely an antiquated novelty — it is an eco-friendly sanctuary, a mobile vantage point, and the poetic soul of the streets.',
    category: 'Architecture & City',
    imageUrl: '/images/tours/wm-chowringhee.jpg',
    content: [
      'There is no gentler way to watch Kolkata wake than from the open wooden window of a tram gliding down College Street or skirting the green expanse of the Maidan.',
      'Operating continuously since 1902, Kolkata holds the only surviving tram network in India. While modern urban planners often prioritize asphalt over heritage rails, citizen movements and heritage lovers have mobilized to safeguard these zero-emission beauties.',
      'On our walks, we celebrate this living mechanical heritage. Sitting on polished teak slat seats with overhead brass bell cords, time relaxes into its proper cadence.'
    ]
  }
];
