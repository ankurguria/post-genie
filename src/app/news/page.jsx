import { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Clock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTopic, setSearchTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const fetchNews = async () => {
    setLoading(true);
    const query = searchTopic || selectedCategory;
    if (!query) {
      setLoading(false);
      return;
    }

    try {
      const formattedQuery = query.replace(/\s+/g, "+");
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${formattedQuery}&lang=en&token=eae60e62f351c6d8332a1db3632bf718`
      );
      const data = await response.json();
      const formattedNews = data.articles.map((article, index) => ({
        id: index,
        title: article.title,
        summary: article.description,
        source: article.source.name,
        url: article.url,
        image: article.image,
        publishedAt: article.publishedAt,
        category: selectedCategory,
        gradient: "from-gray-500 to-gray-600",
      }));
      setNews(formattedNews);
    } catch (error) {
      console.error("Error fetching news:", error);
      // Handle error state if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const search = urlParams.get("search");

    if (category) setSelectedCategory(category);
    if (search) setSearchTopic(search);
  }, []);

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, searchTopic]);

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

  const handleRefreshNews = () => {
    fetchNews();
  };

  const handleNewsSelect = (news) => {
    // Navigate to post generator, passing news title and category
    window.location.href = `/generate?title=${encodeURIComponent(
      news.title
    )}&category=${selectedCategory}`;
  };

  const getCategoryName = () => {
    if (searchTopic) {
      const capitalizedTopic = searchTopic
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return `${capitalizedTopic}`;
    }
    if (selectedCategory) {
      const category = categories.find((c) => c.id === selectedCategory);
      return category?.name;
    }
    return "";
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="px-4 py-6">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1
              className="text-4xl md:text-5xl font-normal text-slate-900 mb-4"
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              Trending on <em className="text-blue-600">{getCategoryName()}</em>
            </h1>
            <p className="text-slate-600">
              Select a story to create your viral LinkedIn post
            </p>
          </div>

          {/* Premium News Cards */}
          <div className="space-y-4">
            {news.map((newsItem) => (
              <div
                key={newsItem.id}
                onClick={() => handleNewsSelect(newsItem)}
                className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
              >
                {/* Gradient accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${newsItem.gradient}`}
                ></div>

                <div className="p-5">
                  {/* Header with time */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock size={12} className="mr-1" />
                      {timeAgo(newsItem.publishedAt)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-tight">
                    {newsItem.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {newsItem.summary}
                  </p>

                  {/* Footer with source */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-slate-700">
                        {newsItem.source}
                      </span>
                    </div>

                    <a
                      href={newsItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100 flex items-center justify-center"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {news.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No news found
              </h3>
              <p className="text-slate-600 text-sm">
                Try selecting a different category or search term.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add CSS for line clamp */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}