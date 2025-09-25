import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Copy,
  ExternalLink,
  Clock,
  TrendingUp,
  Send,
  MessageCircle,
  ThumbsUp,
  Share2,
  CheckCircle,
  Loader
} from 'lucide-react';
import {
  generateContent,
  GENERATE_NEW_POST_PROMPT,
  IMPROVE_POST_PROMPT
} from '../../utils/gemini';

export default function GeneratePage() {
  const [newsData, setNewsData] = useState(null);
  const [generatedPost, setGeneratedPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState('analyzing'); // analyzing, generating, done
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [generatedPost]);

  // Sample news data - in a real app, this would come from URL params or API
  const sampleNewsData = {
    id: 1,
    title: "OpenAI Launches New GPT-5 Model with Revolutionary Capabilities",
    summary: "The latest AI model demonstrates unprecedented performance in reasoning and creative tasks, setting new industry benchmarks.",
    source: "TechCrunch",
    engagement: "1.2K reactions",
    timeAgo: "2h ago",
    category: "AI",
    url: "https://techcrunch.com/example",
    fullContent: "OpenAI has just announced GPT-5, their most advanced language model yet. The new model shows remarkable improvements in reasoning, coding, and creative tasks. Early benchmarks suggest a 40% improvement in complex problem-solving compared to GPT-4. The model also demonstrates better factual accuracy and reduced hallucinations, marking a significant milestone in AI development. Industry experts are calling this a game-changing advancement that could reshape how we interact with AI systems."
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const newsId = urlParams.get("newsId");

    if (category) {
      setSelectedCategory(category);
    }

    // In a real app, you would fetch news data based on newsId
    // For now, we'll use sampleNewsData and simulate fetching
    setNewsData(sampleNewsData);
    startGeneration();
  }, []);

  const startGeneration = async () => {
    if (!sampleNewsData) return;
    setStep('generating');
    setLoading(true);

    const prompt = GENERATE_NEW_POST_PROMPT.replace('{articleUrl}', sampleNewsData.url);

    try {
      const post = await generateContent(prompt);
      setGeneratedPost(post);
    } catch (error) {
      console.error("Error generating post:", error);
      // Optionally, set an error state to display to the user
    }

    setStep('done');
    setLoading(false);
  };

  const handleRegenerationWithFeedback = async () => {
    setLoading(true);
    setStep('generating');

    const prompt = IMPROVE_POST_PROMPT.replace('{draftPost}', generatedPost).replace('{feedback}', feedback);

    try {
      const regeneratedPost = await generateContent(prompt);
      setGeneratedPost(regeneratedPost);
    } catch (error) {
      console.error("Error regenerating post:", error);
      // Optionally, set an error state
    }

    setStep('done');
    setLoading(false);
    setFeedback('');
  };

  const handleCopyPost = async () => {
    try {
      await navigator.clipboard.writeText(generatedPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy post:', err);
    }
  };

  const handleShareToLinkedIn = async () => {
    try {
      await navigator.clipboard.writeText(generatedPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy post for sharing:', err);
    }
    const articleUrl = newsData.url;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const quickFeedbackOptions = [
    'Make it more casual',
    'Add more statistics',
    'Make it shorter',
    'More engaging',
    'Add questions',
    'Include hashtags'
  ];

  if (!newsData) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader className="animate-spin" size={32} />
    </div>;
  }

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50">
        

        <div className="px-4 py-6">
          
          

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column - News Article
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                    {newsData.category}
                  </span>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock size={14} className="mr-1" />
                    {newsData.timeAgo}
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold text-slate-900 mb-4 leading-tight">
                  {newsData.title}
                </h2>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {newsData.summary}
                </p>
                
                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Full Article Preview</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {newsData.fullContent}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span className="font-medium">{newsData.source}</span>
                    <div className="flex items-center">
                      <TrendingUp size={14} className="mr-1" />
                      {newsData.engagement}
                    </div>
                  </div>
                  
                  <a
                    href={newsData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span className="text-sm font-medium">Read Full Article</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div> */}

            {/* Right Column - Post Generation */}
            {/* <div className="space-y-6"> */}
              {/* <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"> */}
                {/* <h2 className="text-2xl font-semibold text-slate-900 mb-6">Your LinkedIn Post</h2> */}
                <h1
                  className="text-4xl md:text-5xl font-normal text-slate-900 mb-4 text-center"
                  style={{ fontFamily: "Instrument Serif, serif" }}
                >
                  Your <em className="text-blue-600">LinkedIn</em> Post
                </h1>

                {/* Generation Status */}
                {loading && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Loader className="animate-spin text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">
                          {step === 'analyzing' ? 'Analyzing article' : 'Generating your post'}
                        </h3>
                        <p className="text-blue-700 text-sm">
                          {/* {step === 'analyzing' 
                            ? 'Reading the article and understanding key insights'
                            : 'Crafting an engaging LinkedIn post with AI magic'
                          } */}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Generated Post */}
                {generatedPost && !loading && (
                  <div className="space-y-6">
                    <textarea
                      ref={textareaRef}
                      value={generatedPost}
                      onChange={(e) => setGeneratedPost(e.target.value)}
                      className="w-full bg-white p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 text-sm leading-relaxed font-sans resize-none overflow-hidden"
                      rows="1"
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleCopyPost}
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                      >
                        {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                        <span>{copied ? 'Copied!' : 'Copy Post'}</span>
                      </button>
                      
                      <button
                        onClick={handleShareToLinkedIn}
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                      >
                        <Share2 size={20} />
                        <span>Share to LinkedIn</span>
                      </button>
                    </div>

                    {/* Feedback Section */}
                    <div className="border-t border-slate-200 pt-6">
                      {/* <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">Not quite right? Let's improve it</h3> */}
                      <h2
                        className="text-4xl md:text-5xl font-normal text-slate-900 mb-6 text-center"
                        style={{ fontFamily: "Instrument Serif, serif" }}
                      >
                        Not quite right? Let's <em>improve</em> it
                      </h2>
                      {/* Quick Feedback Options */}
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {quickFeedbackOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => setFeedback(option)}
                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${ 
                              feedback === option
                                ? 'bg-blue-100 border-blue-300 text-blue-700'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>

                      {/* Custom Feedback */}
                      <div className="space-y-3">
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Or describe specific changes you'd like..."
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-slate-900 placeholder:text-slate-500"
                          rows="3"
                        />
                        
                        <button
                          onClick={handleRegenerationWithFeedback}
                          disabled={!feedback.trim() || loading}
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl font-medium transition-colors"
                        >
                          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                          <span>Regenerate Post</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              {/* </div> */}

              {/* Tips Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 text-center">Pro Tips for Maximum Engagement</h3>
                <ul className="space-y-2 text-sm text-slate-700 text-center">
                  <li>     Post during peak LinkedIn hours</li>
                  <li>     Ask questions to encourage comments</li>
                  <li>     Use relevant hashtags (3-5 max)</li>
                  <li>     Share personal insights, not just news</li>
                  <li>     Respond to comments within the first hour</li>
                </ul>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
