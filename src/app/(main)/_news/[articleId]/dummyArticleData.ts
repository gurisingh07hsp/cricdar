// Assuming these types are in or added to src/app/types/cricket.ts
import { NewsArticleProps } from '@/types/cricket'; // Existing type for preview

export interface ArticleContentBlock {
  type: 'paragraph' | 'heading' | 'image' | 'quote';
  text?: string;
  level?: 2 | 3 | 4; // For headings H2, H3, H4
  imageUrl?: string;
  alt?: string;
  caption?: string;
}

export interface FullNewsArticleData extends NewsArticleProps {
  author?: { name: string; bio?: string; avatarUrl?: string };
  contentBlocks: ArticleContentBlock[];
  relatedArticleIds?: string[]; // IDs of related articles
  tags?: string[];
}

// Extended Dummy Data (example for two articles)
const DUMMY_NEWS_IMAGE_URL = "/images/placeholder-news.jpg"; // Re-use this

const allFullNewsArticles: Record<string, FullNewsArticleData> = {
  "news1": {
    id: "news1",
    title: "Historic Win: Green Strikers Clinch T20 Championship",
    snippet: "In a nail-biting final, the Green Strikers chased down an improbable target...",
    imageUrl: DUMMY_NEWS_IMAGE_URL,
    date: "May 30, 2025",
    category: "Tournament Finals",
    link: "/news/news1",
    author: { name: "Jane Doe", bio: "Lead Cricket Correspondent" },
    contentBlocks: [
      { type: 'paragraph', text: "The atmosphere was electric at the Empire Stadium as the Green Strikers, needing 18 runs off the final over, pulled off a sensational victory against the Blue Blasters to lift the Global T20 Championship trophy. This match will undoubtedly be etched in cricketing folklore for its sheer drama and breathtaking performances." },
      { type: 'heading', text: "The Final Over Thriller", level: 2 },
      { type: 'paragraph', text: "With veteran pacer Mark Wood bowling the last over for the Blasters, young sensation Alex Lee (GS) was on strike. The equation was tough, but Lee, known for his calm demeanor, hit two consecutive sixes, bringing the crowd to its feet and the target within reach. A couple of quick singles later, it all came down to the last ball." },
      { type: 'image', imageUrl: "/images/placeholder-news-detail-1.jpg", alt: "Final over action", caption: "Alex Lee hitting the winning runs." },
      { type: 'quote', text: "This is what dreams are made of. I just wanted to stay calm and back my abilities. The team had faith in me." },
      { type: 'paragraph', text: "The victory marks the Green Strikers' first major T20 title, a culmination of years of hard work and strategic team building. Coach Miller was ecstatic, praising the team's resilience throughout the tournament." },
    ],
    tags: ["T20", "Finals", "GreenStrikers", "Thriller"],
    relatedArticleIds: ["news2", "news3"]
  },
  "news2": {
    id: "news2",
    title: "Captain Sharma Hits Record-Breaking Century in Test Series",
    snippet: "G. Sharma's phenomenal batting display, a majestic 187*, led his team...",
    imageUrl: DUMMY_NEWS_IMAGE_URL,
    date: "May 29, 2025",
    category: "Player Milestones",
    link: "/news/news2",
    author: { name: "John Smith", bio: "Senior Cricket Analyst" },
    contentBlocks: [
      { type: 'paragraph', text: "Captain G. Sharma once again proved why he's considered one of the modern greats with a scintillating unbeaten 187 on day two of the crucial Test match. His innings was a masterclass in concentration, technique, and controlled aggression, effectively batting the opposition out of the game." },
      { type: 'heading', text: "A Captain's Knock", level: 2 },
      { type: 'paragraph', text: "Walking in when his team was in a precarious position at 45/3, Sharma weathered the early storm from the opposition pacers. He then slowly but surely built partnerships, first with the middle order and then expertly farming the strike with the tail-enders. His knock included 22 boundaries and 3 towering sixes." },
      { type: 'quote', text: "It was important for me to lead from the front. The conditions were challenging, but I enjoyed the responsibility. Credit to the lower order for their support." },
      { type: 'paragraph', text: "This innings not only puts his team in a dominant position but also sees Sharma break several long-standing records, including the highest score by a visiting captain at this historic venue. The cricketing world has been quick to laud this monumental effort." },
    ],
    tags: ["TestCricket", "Records", "Captaincy", "BattingMasterclass"],
    relatedArticleIds: ["news1", "news4"]
  },
  // Add more full articles if needed
};

// We'll also need the preview data for "Related Articles" sidebar
const dummyNewsArticlePreviews: NewsArticleProps[] = [
  { id: "news1", title: "Historic Win: Green Strikers Clinch T20 Championship", snippet: "In a nail-biting final...", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 30, 2025", category: "Tournament Finals", link: "/news/news1" },
  { id: "news2", title: "Captain Sharma Hits Record-Breaking Century", snippet: "G. Sharma's phenomenal batting display...", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 29, 2025", category: "Player Milestones", link: "/news/news2" },
  { id: "news3", title: "Upcoming Ashes Series: Predictions & Key Players", snippet: "Experts weigh in on the upcoming Ashes...", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 28, 2025", category: "Series Previews", link: "/news/news3" },
  { id: "news4", title: "Youth Tournament Unearths Exciting New Talents", snippet: "The U-19 national tournament has brought...", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 27, 2025", category: "Development", link: "/news/news4" },
];