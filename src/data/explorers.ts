export interface Explorer {
  id: string;
  name: string;
  moniker: string;
  role: string;
  bio: string;
  favoriteNeighborhood?: string;
  quote?: string;
  avatarUrl: string;
  phone?: string;
  email?: string;
}

export const EXPLORERS_DATA: Explorer[] = [
  {
    id: 'ifte',
    name: 'Iftekhar Ahsan',
    moniker: 'Ifte the Intrepid',
    role: 'Founder & Explorer',
    bio: 'Ifte the Intrepid is the one to be blamed for having started it all. His passion for trespassing is second only to his love for this city. Life is an adventure for this true romantic, for whom the predictable is abhorrent. His antennae tune in to all that’s ‘forbidden’. Fun, spirited, and brimming with questions – that’s our Ifte for you. Join him in an exploration of any part, theme, or perspective of the city, though he’s all for unearthing and understanding the various sub-cultures that shy away from the mainstream. Born and brought up (and hopelessly in love with) Calcutta, Iftekhar Ahsan hails from Rajasthani stock. A regular contributor to The Telegraph and other publications he has managed to build a reputation for himself as an explorer of the city and one of the best people to walk around town with. And when he’s not wandering the streets of the city then you can find him tracing his love to the Silk Road and the various countries that it passed through. If you ever need to plan a trip to any Silk Road country, including Iran, Uzbekistan, China, India, Turkey and the like just drop a hint and watch him animate in excitement.',
    avatarUrl: '/images/explorers/ifte.png',
    phone: '+919830184030',
    email: 'explore@calcuttawalks.com'
  },
  {
    id: 'ramanuj',
    name: 'Ramanuj Mukherjee',
    moniker: 'Explorer Ramanuj',
    role: 'Explorer',
    bio: 'Explorer Ramanuj, the new addition to the Calcutta Walks team possesses infinite enthusiasm for Calcutta and at the same time, his heart being in the right place, longs to be a social entrepreneur. His connection with both West Bengal and East Bengal gives him a unique view of the city of joy through the eyes of a person whose family was affected by Bengal’s partition. Explorer Ramanuj enjoys reading history, geopolitics, international relations as well as Bengali literature and incorporates these in his tours. A strong believer in multiculturalism Ramanuj delights in showing his guests the tolerant, secular and multi-dimensional spirit of our crazy city. His playful spirit is infectious and he can speak non-stop on all his favourite topics. So come on board to explore the city with him and get positively surprised.',
    avatarUrl: '/images/explorers/ramanuj.png'
  },
  {
    id: 'rahul',
    name: 'Rahul',
    moniker: 'Explorer Rahul',
    role: 'Explorer & Photo Walk Lead',
    bio: 'Rahul began his photography career assisting in the college darkroom in exchange for free film rolls to toy around with his camera. From a National Geographic on Expedition to assisting photo legend Steve McCurry at his studio in New York, he has done it all. Besides leading the Calcutta Photo Walks he is the technical director at Studio Pomegranate and handles all things geek for a studio that provides all photography related services. He has spoken at various forums about photography and continues to expand his skills and knowledge.',
    avatarUrl: '/images/explorers/rahul.png',
    phone: '+919903989919',
    email: 'rahul@calcuttawalks.com'
  },
  {
    id: 'tuhina',
    name: 'Tuhina Chatterjee',
    moniker: 'Explorer Tuhina',
    role: 'Explorer',
    bio: 'The youngest and most energetic of the mix, Tuhina has always hated the mundane and everyday routine. While pursuing her graduation she was often found trading off her uni classes with lone walks around the city collecting stories and soaking in all the warmth and love that Calcutta has to offer. One can always find a sketchbook tucked in her jhola in which she captures the city the way she sees her. Exploring with her is a joyride and one can’t help but feel enraptured by her free spirit. She will always have the most interesting stories to tell about this city with a soul; a city that will stay with you long after you have left it. Tuhina knows pretty well that connecting old, historical Calcutta with modern Calcutta is a challenging task. Yet this is what she loves doing with travelers from across the globe. While she has trekked in the Himalayas she is equally at home leading urban treks like no other. An animal lover and a gifted artist she is as infectious as this crazy city.',
    avatarUrl: '/images/explorers/tuhina.png',
    phone: '+918584033244'
  },
  {
    id: 'sukrit',
    name: 'Sukrit Sen',
    moniker: 'Explorer Sukrit',
    role: 'Explorer & Heritage Architect',
    bio: 'Explorer Sukrit is a Heritage and Disaster Manager during day and a Musician by night. He holds a bachelors in Architecture and a masters in Heritage Management. Given his background in Indian classical music and architecture, Sukrit is interested in the linkages between tangible and intangible heritage, exploring them to engage with communities and discuss heritage conservation and climate action. Born and brought up in Calcutta, the myriad of sounds that the city produces have always intrigued him be it the rickshaw pullers bell, or the tram rumbling, or the mixing of the Sandesh or the little kids practising music or dance on a sunday morning. Alongside the built heritage, with the river on one side and the wetlands on the other, the socio-geographic definition of Calcutta excites him. As a result he loves working with and showing the city around to young students to develop innovative and creative tools not just to make them look at the city differently but also advocate climate action. In short he is excited about everything Calcutta and will make sure whoever goes out with him agrees with him too.',
    avatarUrl: '/images/explorers/sukrit.png'
  }
];

export const PHILOSOPHY_CONTENT = {
  title: 'Our Philosophy',
  subtitle: 'Improving life in Calcutta using tourism as a tool.',
  storyIntro: 'We were your regular overworked and underpaid individuals, overcome by a sense of ennui. Then one day, we decided to take fate by the throat, and take a look at us now! We may still be overworked and underpaid. But there’s a new zest for what we do now.',
  teamDescription: 'Conceived of, founded, and designed by Iftekhar Ahsan – aka Ifte – an intrepid Explorer, Calcutta Walks is manned by individuals from various walks of life. As Explorers, researchers, and a resource team, we have on board theater veterans, historians, architects, lawyers, businesspeople, home-based professionals, corporate entities, and quasi-intellectuals whose sole job it is to keep us on our toes and at our best – for you!',
  noGuidesNote: 'For starters, our company has no ‘guides’. But if you’re looking to explore the city with us, we have trained Explorers to walk the city with you. A bunch of folks from diverse backgrounds, your Fellow Explorers are in love with the city and keep their fingers on its dynamic pulse. This is a challenging task in a city that is on the threshold of major and potentially explosive change! Our Fellow Explorers revel in discovering the extraordinary in what seems everyday. They are opinionated romantics, keen on sharing with you the way things were, are, and should be. Yet a convincing argument from you will get them to change their mind! Remember, our explorers are not historians, but perpetual students who thrive on the concept of shared discovery.',
  sections: [
    {
      heading: 'Pro Calcutta',
      content: 'CalWalks is dedicated to the notion of pro-Calcutta, eco-friendly tourism. To begin with, we walk the city, rather than tooling around in gas-guzzling, fume-belching vehicles. Our use of transportation – when it is absolutely needed – is limited. Walking serves a number of purposes: it burns calories, slims those thighs, and tones your glutes, exposes us to conditions faced by the masses, and brings us into closer touch with this vibrant city. No matter that some choose to go on guided tours in air-conditioned coaches… can they stop at will and order their guides to go on detours when something catches their eye? Well, with CalWalks, you can do all this – and skip those interminable waits at each traffic stop.'
    },
    {
      heading: 'The Calcutta to see',
      content: 'The Calcutta we seek to share with you is not the one patchily dotted with shopping malls for the well-heeled, nor the one with gleaming showcase office buildings for multinationals or those in IT. These landmarks, depressingly similar to those found in other states the world over, are not what give Calcutta its erstwhile sense of class, beauty, and cosmopolitanism. We choose instead to showcase heritage buildings and select localities, the character of which is being gradually eroded by neglect – or the march of “progress”, as signaled by the cash registers of developers.'
    },
    {
      heading: 'What do we hope to achieve as a result of these walks?',
      content: 'We seek to create an aesthetic awareness of and affection for these old buildings which once played a signal role in the workings of the former capital of the British Empire in India. It is our hope that people will see with us in these structures our link with a glorious past, and find for them a special place in the city we hope to develop. CalWalks, then, is working towards generating a greater interest in Calcutta’s history and heritage. We make it a point to patronize locally produced goods in the course of our walks. There are vendors that specialize in the sale of products indigenous to Bengal, and purveyors of fast-vanishing crafts in neighborhoods less-frequented since the onslaught of mass consumerism. Let us go in search of these products and their makers, whose first customers came from a more gracious and less-harried age. Let us show you our city in a whole new light, built on the theme of “Calcutta, we love you.” Let’s reclaim our heritage, people! And for our honored guests from abroad, do share what we learn with the world!'
    }
  ],
  stats: [
    { label: 'Tours conducted', value: '10000+', numeric: 10000 },
    { label: 'Walkers', value: '50000+', numeric: 50000 },
    { label: 'Kilometers walked', value: '110000+', numeric: 110000 },
    { label: 'Cups of cha consumed', value: '80000+', numeric: 80000 },
    { label: 'Books in our library', value: '1000+', numeric: 1000 },
    { label: 'Explorers in the team', value: '12', numeric: 12 }
  ]
};
