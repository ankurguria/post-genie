"use client";
import { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Clock,
  Tag,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTopic, setSearchTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = [
    {
      id: "tech",
      name: "Technology",
      icon: "💻",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "startups",
      name: "Startups",
      icon: "🚀",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "ai",
      name: "Artificial Intelligence",
      icon: "🤖",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: "📈",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "business",
      name: "Business",
      icon: "💼",
      color: "from-slate-500 to-slate-600",
    },
    {
      id: "finance",
      name: "Finance",
      icon: "💰",
      color: "from-green-500 to-green-600",
    },
  ];

  const trendingNews = [
    {
      id: 1,
      title: "OpenAI Launches New GPT-5 Model with Revolutionary Capabilities",
      summary:
        "The latest AI model demonstrates unprecedented performance in reasoning and creative tasks, setting new industry benchmarks.",
      source: "TechCrunch",
      engagement: "1.2K reactions",
      timeAgo: "2h ago",
      category: "AI",
      url: "https://techcrunch.com/example",
    },
    {
      id: 2,
      title: "Y Combinator's Latest Batch: 15 Startups Reshaping Remote Work",
      summary:
        "From AI-powered collaboration tools to virtual office spaces, these startups are defining the future of distributed teams.",
      source: "Hacker News",
      engagement: "856 reactions",
      timeAgo: "4h ago",
      category: "Startups",
      url: "https://news.ycombinator.com/example",
    },
    {
      id: 3,
      title: "LinkedIn's Algorithm Update: What Content Creators Need to Know",
      summary:
        "Major changes to the LinkedIn feed algorithm favor authentic personal stories and industry insights over promotional content.",
      source: "Social Media Today",
      engagement: "2.1K reactions",
      timeAgo: "6h ago",
      category: "Marketing",
      url: "https://socialmediatoday.com/example",
    },
    {
      id: 4,
      title: "Stripe Raises $6B in Series H Round, Valuation Hits $95B",
      summary:
        "The fintech giant's latest funding round signals strong investor confidence in the digital payments infrastructure space.",
      source: "Bloomberg",
      engagement: "945 reactions",
      timeAgo: "8h ago",
      category: "Finance",
      url: "https://bloomberg.com/example",
    },
    {
      id: 5,
      title: "Microsoft's New AI Productivity Suite Transforms Knowledge Work",
      summary:
        "Integration of advanced AI models into Office 365 promises to revolutionize how professionals create and collaborate.",
      source: "Microsoft Blog",
      engagement: "1.8K reactions",
      timeAgo: "12h ago",
      category: "Technology",
      url: "https://microsoft.com/example",
    },
    {
      id: 6,
      title: "The Rise of AI-First Companies: New Business Model Emerges",
      summary:
        "Venture capitalists identify key characteristics of successful AI-native startups and their unique go-to-market strategies.",
      source: "Andreessen Horowitz",
      engagement: "723 reactions",
      timeAgo: "1d ago",
      category: "Business",
      url: "https://a16z.com/example",
    },
  ];

  const handleCategorySelect = (categoryId) => {
    if (isMobile) {
      // Redirect to news page on mobile
      window.location.href = `/news?category=${categoryId}`;
    } else {
      // Keep existing desktop behavior
      setSelectedCategory(categoryId);
      setSearchTopic("");
    }
  };

  const handleSearchSubmit = () => {
    if (searchTopic.trim() && isMobile) {
      // Redirect to news page on mobile
      window.location.href = `/news?search=${encodeURIComponent(searchTopic)}`;
    }
  };

  const handleRefreshNews = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  const handleNewsSelect = (news) => {
    setSelectedNews(news);
    // Navigate to post generator
    window.location.href = `/generate?newsId=${news.id}`;
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50">
        

        <div className="px-4 py-6">
          <div className="flex justify-center">
            
          </div>
          {/* Page Header */}
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl font-normal text-slate-900 mb-4"
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              What's your <em className="text-blue-600">topic</em> today?
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Choose a category or search for a custom topic to find trending
              news that resonates with your audience.
            </p>
          </div>

          {/* Topic Selection */}
          <div className="mb-12">
            {/* Categories */}
            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 group ${
                      selectedCategory === category.id
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`text-3xl mb-2 group-hover:scale-110 transition-transform duration-200`}
                    >
                      {category.icon}
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        selectedCategory === category.id
                          ? "text-blue-700"
                          : "text-slate-700"
                      }`}
                    >
                      {category.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Or search for a custom topic..."
                  value={searchTopic}
                  onChange={(e) => {
                    setSearchTopic(e.target.value);
                    if (!isMobile) {
                      setSelectedCategory("");
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit();
                    }
                  }}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-slate-900 placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Trending News Section - Only show on desktop */}
          {(selectedCategory || searchTopic) && !isMobile && (
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                    Trending News
                    {selectedCategory && (
                      <span className="text-blue-600">
                        {" "}
                        •{" "}
                        {
                          categories.find((c) => c.id === selectedCategory)
                            ?.name
                        }
                      </span>
                    )}
                  </h2>
                  <p className="text-slate-600">
                    Select a story to create your viral LinkedIn post
                  </p>
                </div>

                <button
                  onClick={handleRefreshNews}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors duration-200 disabled:opacity-50"
                >
                  <RefreshCw
                    size={16}
                    className={loading ? "animate-spin" : ""}
                  />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="grid gap-6">
                {trendingNews.map((news) => (
                  <div
                    key={news.id}
                    onClick={() => handleNewsSelect(news)}
                    className="p-6 border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full font-medium">
                            {news.category}
                          </span>
                          <div className="flex items-center text-sm text-slate-500">
                            <Clock size={14} className="mr-1" />
                            {news.timeAgo}
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {news.title}
                        </h3>

                        <p className="text-slate-600 mb-4 leading-relaxed">
                          {news.summary}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span className="font-medium">{news.source}</span>
                            <div className="flex items-center">
                              <TrendingUp size={14} className="mr-1" />
                              {news.engagement}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <a
                              href={news.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        size={20}
                        className="text-slate-400 group-hover:text-blue-500 transition-colors mt-2"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {trendingNews.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No news found
                  </h3>
                  <p className="text-slate-600">
                    Try selecting a different category or search term.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Getting Started Message - Only show when no selection on desktop, or always on mobile */}
          {/* {((!selectedCategory && !searchTopic) || isMobile) && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Ready to create viral content?
              </h3>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                Select a category above or search for a custom topic to discover
                trending news and start creating engaging LinkedIn posts.
              </p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
