import { Activity } from "@/types/activity";

const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const dallasActivities: Activity[] = [
  {
    id: "1",
    title: "Dallas Arboretum and Botanical Garden",
    shortDescription: "66 acres of stunning gardens and seasonal displays",
    description: "Experience one of the nation's premier public gardens featuring seasonal festivals, concerts, and 19 artfully designed gardens. The Dallas Arboretum offers breathtaking views of White Rock Lake and showcases vibrant flowers year-round. Perfect for nature lovers, photographers, and families seeking a peaceful outdoor experience.",
    category: "Nature & Gardens",
    price: 18,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "9:00 AM - 5:00 PM",
    times: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    duration: "2-4 hours",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80&sat=-20"
    ],
    website: "https://www.dallasarboretum.org/",
    availableMonths: allMonths,
  },
  {
    id: "2",
    title: "Sixth Floor Museum at Dealey Plaza",
    shortDescription: "Historic site chronicling JFK's life and legacy",
    description: "Located in the historic Texas School Book Depository building, this museum presents the life, death, and legacy of President John F. Kennedy. Through films, photographs, and artifacts, visitors explore the early 1960s and the Kennedy presidency. A must-visit for history enthusiasts and those interested in American culture.",
    category: "Museums & History",
    price: 24,
    openDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "10:00 AM - 6:00 PM",
    times: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
    duration: "2-3 hours",
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=1200&q=80",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&q=80",
      "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=1200&q=80"
    ],
    website: "https://www.jfk.org/",
    availableMonths: allMonths,
  },
  {
    id: "3",
    title: "Reunion Tower GeO-Deck",
    shortDescription: "360-degree views from Dallas' iconic tower",
    description: "Soar 470 feet above downtown Dallas for breathtaking panoramic views from the GeO-Deck observation level. Interactive touch screens provide information about the city's landmarks. Visit at sunset for stunning photo opportunities or enjoy the city lights at night. The experience includes access to high-definition zoom cameras and telescopes.",
    category: "Landmarks & Views",
    price: 22,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "10:00 AM - 10:00 PM",
    times: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
    duration: "1-2 hours",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80"
    ],
    website: "https://reuniontower.com/",
    availableMonths: allMonths,
  },
  {
    id: "4",
    title: "Dallas Zoo",
    shortDescription: "Oldest and largest zoo in Texas",
    description: "Home to over 2,000 animals from around the world, the Dallas Zoo features exciting exhibits including Giants of the Savanna, Wilds of Africa, and the award-winning Koala Walkabout. Perfect for families, the zoo offers educational programs, animal encounters, and a safari adventure monorail ride through the African savanna.",
    category: "Family & Entertainment",
    price: 19,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "9:00 AM - 5:00 PM",
    times: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM"],
    duration: "3-5 hours",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200&q=80",
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&sat=-10"
    ],
    website: "https://www.dallaszoo.com/",
    availableMonths: allMonths,
  },
  {
    id: "5",
    title: "Perot Museum of Nature and Science",
    shortDescription: "Interactive science museum for all ages",
    description: "Five floors of interactive exhibits covering everything from dinosaurs to space exploration. The Perot Museum features a 3D theater, earthquake simulator, and hands-on learning experiences. Ideal for curious minds of all ages, with special programs and traveling exhibitions throughout the year.",
    category: "Museums & Science",
    price: 25,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "Mon-Sat 10:00 AM - 5:00 PM, Sun 11:00 AM - 5:00 PM",
    times: ["10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    duration: "3-4 hours",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80&sat=-20"
    ],
    website: "https://www.perotmuseum.org/",
    availableMonths: allMonths,
  },
  {
    id: "6",
    title: "Bishop Arts District",
    shortDescription: "Trendy neighborhood with unique shops and dining",
    description: "Explore this vibrant, walkable neighborhood featuring independent boutiques, art galleries, craft cocktail bars, and acclaimed restaurants. The Bishop Arts District offers a perfect blend of shopping, dining, and nightlife with a distinctly Dallas character. Street art and historic architecture add to the charm.",
    category: "Shopping & Dining",
    price: 0,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "Varies by venue",
    times: ["All day"],
    duration: "2-4 hours",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&q=80&sat=-10",
      "https://images.unsplash.com/photo-1515165562835-c3b8bd7c2f19?w=1200&q=80"
    ],
    website: "https://www.bishopartsdistrict.com/",
    availableMonths: allMonths,
  },
  {
    id: "7",
    title: "Dallas Cowboys Stadium Tour",
    shortDescription: "Behind-the-scenes tour of AT&T Stadium",
    description: "Get an exclusive look at one of the world's most spectacular sports venues. Tour includes access to the field, private suites, press box, and Cowboys locker room. See the massive HD video board and learn about the stadium's cutting-edge technology and architecture. A dream experience for sports fans.",
    category: "Sports & Entertainment",
    price: 32,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hours: "Tours: 10:00 AM - 4:00 PM",
    times: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
    duration: "1.5-2 hours",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508779802189-2686abda6a22?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1600&q=80&auto=format&fit=crop"
    ],
    website: "https://attstadium.com/stadium-tours/",
    availableMonths: allMonths,
  },
  {
    id: "8",
    title: "White Rock Lake Park",
    shortDescription: "Scenic urban lake perfect for outdoor activities",
    description: "This 1,015-acre park surrounding a 9.3-mile loop trail offers biking, jogging, kayaking, and birdwatching opportunities. The lake provides stunning views and peaceful nature escapes within the city. Popular for picnics, photography, and watching Dallas' beautiful sunsets. Free to visit with bike and kayak rentals available.",
    category: "Nature & Recreation",
    price: 0,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "5:00 AM - Midnight",
    times: ["All day"],
    duration: "1-4 hours",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80&sat=-20",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&q=80&sat=-5"
    ],
    website: "https://www.dallasparks.org/235/White-Rock-Lake",
    availableMonths: allMonths,
  },
  {
    id: "9",
    title: "Dallas Farmers Market",
    shortDescription: "Historic market with fresh produce and local vendors",
    description: "Since 1941, this open-air market has been a Dallas staple offering fresh produce, artisan foods, and handcrafted goods. Browse local vendors, enjoy food trucks, and experience the vibrant atmosphere. The market includes The Market restaurant and weekend special events. A great spot to taste local flavors and support small businesses.",
    category: "Food & Markets",
    price: 0,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "9:00 AM - 6:00 PM",
    times: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    duration: "1-2 hours",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200&q=80"
    ],
    website: "https://dallasfarmersmarket.org/",
    availableMonths: allMonths,
  },
  {
    id: "10",
    title: "Klyde Warren Park",
    shortDescription: "Urban park built over a freeway",
    description: "This innovative 5.2-acre park built over Woodall Rodgers Freeway connects uptown and downtown Dallas. Features include a children's park, dog park, performance pavilion, and various food trucks. Free programming includes yoga, concerts, and movie nights. A perfect spot for relaxation, people-watching, and experiencing Dallas' urban culture.",
    category: "Parks & Recreation",
    price: 0,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "6:00 AM - 11:00 PM",
    times: ["All day"],
    duration: "1-3 hours",
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
      "https://images.unsplash.com/photo-1461301214746-1e109215d6d3?w=1200&q=80"
    ],
    website: "https://klydewarrenpark.org/",
    availableMonths: allMonths,
  },
  {
    id: "11",
    title: "Deep Ellum Entertainment District",
    shortDescription: "Historic arts and music district",
    description: "Dallas' most eclectic neighborhood featuring live music venues, street art murals, breweries, and diverse dining options. Deep Ellum has been the birthplace of jazz and blues in Texas. Nightlife thrives with concerts, comedy shows, and creative cocktail bars. Perfect for evening exploration and experiencing Dallas' artistic side.",
    category: "Nightlife & Arts",
    price: 0,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "Varies by venue (most 5:00 PM - 2:00 AM)",
    times: ["Evening hours"],
    duration: "2-4 hours",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",
      "https://images.unsplash.com/photo-1499415479124-43c32433a620?w=1200&q=80",
      "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1200&q=80"
    ],
    website: "https://www.deepellumtexas.com/",
    availableMonths: allMonths,
  },
  {
    id: "12",
    title: "State Fair of Texas",
    shortDescription: "Iconic annual fair with rides, food, and entertainment",
    description: "Experience the largest state fair in the US, featuring Big Tex, thrilling rides, live music, livestock shows, and legendary fried foods. The fair celebrates Texas culture with daily parades, concerts, and the famous Red River Showdown football game. A quintessential Dallas experience available only in fall.",
    category: "Seasonal Events",
    price: 25,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hours: "10:00 AM - 10:00 PM (Late Sept - Mid Oct only)",
    times: ["10:00 AM", "2:00 PM", "6:00 PM"],
    duration: "4-8 hours",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200&q=80",
      "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b33?w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&sat=-5"
    ],
    website: "https://bigtex.com/",
    availableMonths: ["September", "October"],
  }
];

export const getActivitiesByMonths = (months: string[]): Activity[] => {
  if (!months || months.length === 0) return dallasActivities;

  const normalizedMonths = months.map(month => month.toLowerCase());

  return dallasActivities.filter(activity =>
    activity.availableMonths.some(month => normalizedMonths.includes(month.toLowerCase()))
  );
};
