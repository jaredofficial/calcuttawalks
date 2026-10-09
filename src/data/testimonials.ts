export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  locationOrRole: string;
  source: string;
  rating: number;
  tourSlug?: string;
  tourName?: string;
  date?: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-ben-grozier',
    author: 'Ben Grozier',
    locationOrRole: 'Sydney, Australia',
    quote: 'Honestly, one of the best three hours of my travelling life. I\'ve visited over 80 countries and as you can imagine had plenty of awesome experiences amongst them. This morning will remain as one of the best ever. Thank you Calcutta Walks. I will be recommending you far and wide!',
    source: 'TripAdvisor Review',
    rating: 5,
    tourSlug: 'in-the-footsteps-of-the-raj',
    tourName: 'In the footsteps of the Raj',
    date: 'Recent Walker'
  },
  {
    id: 't-dr-sarah-dietz',
    author: 'Dr. Sarah Dietz',
    locationOrRole: 'United Kingdom',
    quote: 'If you only have a few hours in Calcutta put yourself in the hands of an Explorer from Calcutta Walks and experience more of the city in a few hours than a month’s wandering would provide. I took three walks with Explorer Anirban, each more fascinating than the last, each a conversation of history, culture, politics and above all food. We drank delicious chai from terracotta cups, snacked on rum balls from the old Jewish bakery Nahoum... Calcutta Walks offer much more than a tour of the well-known monuments, but a behind-the-scenes look at an extraordinary city.',
    source: 'TripAdvisor Review',
    rating: 5,
    tourSlug: 'confluence-of-cultures',
    tourName: 'Confluence Of Cultures',
    date: 'Verified Review'
  },
  {
    id: 't-george-connie',
    author: 'George & Connie',
    locationOrRole: 'Quebec, Canada',
    quote: 'Passionate, knowledgeable, educated, engaging and unafraid to show you the true city, today; as it was; and what it might be. Call it "assisted exploration". You can\'t package this type of tour, it flows with the current of the city. If I could see Rome, New York, Buenos Aires, or anyplace in the world with this guide - I would go tomorrow. Truly an experience. This is the real deal.',
    source: 'TripAdvisor Review',
    rating: 5,
    tourSlug: 'the-star-still-shines',
    tourName: 'The Star Still Shines',
    date: 'Verified Review'
  },
  {
    id: 't-john-crawley',
    author: 'John Crawley',
    locationOrRole: 'Paris, France',
    quote: 'I have been to Kolkata four times and every time I do several walks with Calcutta Walks. I have done the Confluence of Cultures 4 times, Dalhousie Square and Kumartuli 3 times each. Why? Because they are amazing and they are different every time depending on the "Explorer" and the time of the year. They are not only interesting but they are loads of fun as well... and they make you fall in love with that astounding, strange, enormous city that is Kolkata.',
    source: 'TripAdvisor Review',
    rating: 5,
    tourSlug: 'bringing-the-goddess-to-earth',
    tourName: 'Bringing the Goddess To Earth',
    date: 'Verified Review'
  },
  {
    id: 't-genevieve-messmer',
    author: 'Geneviève Messmer',
    locationOrRole: 'Bangalore & France',
    quote: 'We are 9 French ladies living in Bangalore and we did 3 of the walks (Dalhousie - Confluence - Sovabazar). It was just SUPER - AMAZING - INTERESTING and also DIFFERENT, all this and even more thanks to Ritwick and Ifte. What else can I say: do not hesitate to sign in. I am sure we discovered lots of hidden places we would not even have noticed by our own. And we had lots of fun too.',
    source: 'Guest Book Entry',
    rating: 5,
    tourSlug: 'in-the-footsteps-of-the-raj',
    tourName: 'White Town Walk',
    date: 'Verified Review'
  },
  {
    id: 't-fareed-mostoufi',
    author: 'Fareed Mostoufi',
    locationOrRole: 'Washington DC, USA',
    quote: 'I love to engage directly with a people when I travel, but had been intimidated upon arrival in India by the sounds and crowds. This tour was just the introduction I needed. Seeing the city with Calcutta Walks was like being introduced to a new friend by someone you trust. Safe, special, informative, but also personal... And it was simply the icing on the cake that the tour concluded with every participant receiving Calcutta Walks\' extraordinary map of the city.',
    source: 'TripAdvisor Review',
    rating: 5,
    tourSlug: 'confluence-of-cultures',
    tourName: 'Melting Pot Walk',
    date: 'Verified Review'
  },
  {
    id: 't-aaron-edward',
    author: 'Aaron Edward',
    locationOrRole: 'United States',
    quote: 'Having scanned through a bunch of walking tour companies, I am very glad I chose Calcutta Walks! I did the Dalhousie Square Walk. I was in awe of the British influence and architecture throughout the city and the indepth knowledge provided by none other than the amazing Anirban. I left feeling more knowledgeable about Dalhousie Square, the British history in Calcutta, and just the city in general.',
    source: 'TripAdvisor Review',
    rating: 5,
    tourSlug: 'in-the-footsteps-of-the-raj',
    tourName: 'Dalhousie Square Walk',
    date: 'Verified Review'
  },
  {
    id: 't-emma-nathan',
    author: 'Emma & Nathan',
    locationOrRole: 'Auckland, New Zealand',
    quote: 'As part of the walk you will also receive a very helpful map of Kolkata – apparently there are none that are quite like it. Indeed some of the other locals we met confirmed this, and they were quite jealous of our acquisition. The map was subsequently an invaluable resource for navigating the teeming streets of the city.',
    source: 'TripAdvisor Review',
    rating: 5,
    tourSlug: 'sunrise-on-two-wheels',
    tourName: 'Bicycle Tour',
    date: 'Verified Review'
  },
  {
    id: 't-emilia-van-hauen',
    author: 'Emilia Van Hauen',
    locationOrRole: 'Copenhagen, Denmark (Børsen)',
    quote: 'A visit to Kolkata / Calcutta showed that one does not have to be at Elon Musk\'s level to make the difference many talk about. Iftekhar\'s philosophy, which is based on simple cultural exchange and practical sustainability, is something we can all copy. Reciprocity is the keyword.',
    source: 'Børsen National Danish Feature',
    rating: 5,
    date: 'Press & Thought Leadership'
  },
  {
    id: 't-desales-university',
    author: 'Sarah Jack Kuenzle',
    locationOrRole: 'DeSales University Group, Connecticut, USA',
    quote: 'Our tour guides – Ram, Ani, and Ritwick beamed passion for their beloved city, and were extremely knowledgeable of its rich history. Not once was I bored on one of their tours – and I learned so much about the culture of India which I would not have learned otherwise! Calcutta Walks really helped make my school\'s service trip memorable.',
    source: 'University Study Tour Review',
    rating: 5,
    tourSlug: 'in-the-footsteps-of-the-raj',
    tourName: 'Heritage Walking Tour',
    date: 'Verified Review'
  }
];

export interface PressMention {
  id: string;
  publication: string;
  headline: string;
  title?: string;
  excerpt: string;
  author?: string;
  date: string;
  link?: string;
  logoUrl?: string;
}

export const PRESS_DATA: PressMention[] = [
  {
    id: 'p-nyt',
    publication: 'The New York Times',
    headline: 'Finding the Soul of Calcutta on Foot',
    title: 'Finding the Soul of Calcutta on Foot',
    author: 'Sarah Khan',
    excerpt: 'Calcutta Walks leads visitors deep into Dalhousie Square, College Street, and the sculptors’ quarter of Kumartuli, peeling back three centuries of layered cosmopolitan history.',
    date: 'The New York Times Travel',
    link: 'https://calcuttawalks.com/media-coverage/'
  },
  {
    id: 'p-telegraph',
    publication: 'The Telegraph',
    headline: 'Explore Calcutta with Ifte: A City Rediscovered',
    title: 'Explore Calcutta with Ifte: A City Rediscovered',
    author: 'Sudeshna Banerjee',
    excerpt: 'Iftekhar Ahsan of Calcutta Walks took t2 to historic spots across the colonial and indigenous quarters, proving that the best way to understand Kolkata is to step out on the pavement.',
    date: 'The Telegraph City Feature',
    link: 'https://calcuttawalks.com/media-coverage/'
  },
  {
    id: 'p-lonely-planet',
    publication: 'Lonely Planet',
    headline: 'Authors’ Choice: Calcutta Walks',
    title: 'Authors’ Choice: Calcutta Walks',
    author: 'Lonely Planet Editorial',
    excerpt: 'The finest walking tours in eastern India. Intimate groups, extraordinary scholarship, and genuine warmth that connects travelers to living heritage.',
    date: 'Lonely Planet India Guide',
    link: 'https://calcuttawalks.com/media-coverage/'
  },
  {
    id: 'p-cntraveller',
    publication: 'Condé Nast Traveller India',
    headline: 'The Definitive Guide to Calcutta’s Historic Quarters',
    title: 'The Definitive Guide to Calcutta’s Historic Quarters',
    author: 'CNT Editorial Team',
    excerpt: 'Calcutta Walks doesn’t just show you buildings; they introduce you to old cabin proprietors, clay sculptors, and the soul of Bengal.',
    date: 'Condé Nast Traveller',
    link: 'https://calcuttawalks.com/media-coverage/'
  },
  {
    id: 'p-smh',
    publication: 'Sydney Morning Herald',
    headline: 'Streets of Memory: Walking Kolkata',
    title: 'Streets of Memory: Walking Kolkata',
    author: 'Brian Johnston',
    excerpt: 'Calcutta Walks is pioneering an intelligent, sensitive form of urban exploration that honours both the Raj architectural legacy and Bengal’s rich intellectual renaissance.',
    date: 'Sydney Morning Herald',
    link: 'https://calcuttawalks.com/media-coverage/'
  },
  {
    id: 'p-natgeo',
    publication: 'National Geographic Traveller India',
    headline: 'Unearthing the Living Heritage of the Hooghly',
    title: 'Unearthing the Living Heritage of the Hooghly',
    author: 'Nat Geo Expeditions',
    excerpt: 'From wrestling akharas to sacred river ghats and sunrise cycling, Calcutta Walks reveals the poetic pulse of India’s cultural capital.',
    date: 'National Geographic Traveller',
    link: 'https://calcuttawalks.com/media-coverage/'
  }
];
