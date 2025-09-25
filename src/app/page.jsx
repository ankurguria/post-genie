import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    // {
    //   icon: Sparkles,
    //   title: "AI-Powered Content",
    //   description:
    //     "Generate viral LinkedIn posts with intelligent algorithms that understand your audience and trending topics.",
    // },
    // {
    //   icon: TrendingUp,
    //   title: "Trending News Integration",
    //   description:
    //     "Stay ahead with real-time trending news and topics that resonate with your professional network.",
    // },
    // {
    //   icon: Users,
    //   title: "Audience Growth",
    //   description:
    //     "Build your professional brand and grow your LinkedIn following with content that drives engagement.",
    // },
    // {
    //   icon: Zap,
    //   title: "Instant Generation",
    //   description:
    //     "Create compelling posts in seconds with our advanced AI that understands professional tone and context.",
    // },
    // {
    //   icon: Target,
    //   title: "Smart Targeting",
    //   description:
    //     "Choose from curated categories or custom topics to ensure your content hits the right audience.",
    // },
    // {
    //   icon: BarChart3,
    //   title: "Growth Analytics",
    //   description:
    //     "Track your post performance and optimize your content strategy for maximum professional impact.",
    // },
  ];

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50">
        

        {/* Hero Section */}
        <section className="pt-12 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
              <Sparkles size={16} />
              AI-Powered LinkedIn Growth
            </div>

            <h1
              className="text-5xl md:text-6xl font-normal leading-tight text-slate-900 mb-6"
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              AI-powered LinkedIn post creator for{" "}
              <em className="text-blue-600">explosive growth</em>
            </h1>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform trending news into viral LinkedIn posts. Grow your
              professional audience with AI-generated content that drives
              engagement and builds your brand.
            </p>

            <div className="flex justify-center mb-16">
              <a
                href="/dashboard"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                Start Creating Posts
                <ArrowRight size={20} />
              </a>
            </div>

            {/* Demo Stats */}
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">10x</div>
                <div className="text-sm text-slate-600">Engagement Boost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <div className="text-sm text-slate-600">Content Ideas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-0">
              <h2
                className="text-4xl md:text-5xl font-normal text-slate-900 mb-6"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Everything you need to create <em>viral content</em>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Our AI-powered platform combines trending news, smart
                algorithms, and professional insights to help you dominate
                LinkedIn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-200 hover:shadow-lg group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                      <IconComponent size={24} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-4xl md:text-5xl font-normal text-slate-900 mb-6"
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              Create viral posts in <em>3 simple steps</em>
            </h2>
            <p className="text-xl text-slate-600 mb-16">
              From trending news to published post in under 2 minutes
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Choose Your Topic
                </h3>
                <p className="text-slate-600">
                  Select from trending categories or enter a custom topic that
                  matters to your audience.
                </p>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Pick Trending News
                </h3>
                <p className="text-slate-600 mb-4">
                  Browse curated trending news and select the story that
                  resonates with your message.
                </p>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Generate & Share
                </h3>
                <p className="text-slate-600">
                  Our AI creates compelling posts instantly. Edit, refine, and
                  share directly to LinkedIn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-4xl md:text-5xl font-normal text-white mb-6"
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              Ready to transform your <em>LinkedIn presence?</em>
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join thousands of professionals who are already growing their
              audience with AI-powered content.
            </p>

            <a
              href="/dashboard"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              Start Your Journey
              <ArrowRight size={20} />
            </a>
          </div>
        </section>

        
      </div>
    </>
  );
}