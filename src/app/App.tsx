import { useState, useRef } from "react";
import { Menu, User, Globe, Camera, Clock, ChevronRight, MapPin } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { MyPage } from "./components/MyPage";
import { AnalysisResult } from "./components/AnalysisResult";
import { NoticePage } from "./components/NoticePage";
import { CommunityPage } from "./components/CommunityPage";
import { AuthPage } from "./components/AuthPage";

type Page = "main" | "mypage" | "notice" | "community" | "auth";
type Language = "ko" | "en" | "ja";

interface RecentItem {
  id: number;
  item: string;
  category: string;
  date: string;
  image: string;
}

const translations = {
  ko: {
    title: "🌈 배출의 민족",
    subtitle: "스마트한 분리수거 가이드",
    cameraGuide: "폐기물을 촬영하시면\nAI가 분리배출 방법을 안내해드립니다",
    takePhoto: "📷 사진 촬영하기",
    recentSearches: "🕐 최근 검색 내역",
    viewMore: "더보기 ➜",
    noRecentSearches: "아직 검색 내역이 없습니다\n카메라로 폐기물을 촬영해보세요 🌱",
    loginRequired: "로그인이 필요합니다",
    greeting: "환영합니다 👋",
    tagline: "지속 가능한 환경을 위한 첫걸음"
  },
  en: {
    title: "🌈 Disposal Nation",
    subtitle: "Smart Recycling Guide",
    cameraGuide: "Capture your waste item\nand AI will guide proper disposal",
    takePhoto: "📷 Take Photo",
    recentSearches: "🕐 Recent Searches",
    viewMore: "View More ➜",
    noRecentSearches: "No search history available\nStart by taking a photo of waste 🌱",
    loginRequired: "Login Required",
    greeting: "Welcome 👋",
    tagline: "First step to sustainable environment"
  },
  ja: {
    title: "🌈 排出の民族",
    subtitle: "スマートな分別ガイド",
    cameraGuide: "廃棄物を撮影すると\nAIが分別方法をご案内します",
    takePhoto: "📷 写真を撮る",
    recentSearches: "🕐 最近の検索履歴",
    viewMore: "もっと見る ➜",
    noRecentSearches: "検索履歴がありません\nカメラで廃棄物を撮影してください 🌱",
    loginRequired: "ログインが必要です",
    greeting: "ようこそ 👋",
    tagline: "持続可能な環境への第一歩"
  }
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("main");
  const [language, setLanguage] = useState<Language>("ko");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [analysisImage, setAnalysisImage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRegion, setUserRegion] = useState("강남구");
  const [recentSearches, setRecentSearches] = useState<RecentItem[]>([]);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setAnalysisImage(imageData);
        
        // Add to recent searches
        const newItem: RecentItem = {
          id: Date.now(),
          item: language === "ko" ? "플라스틱 페트병" : language === "en" ? "Plastic PET Bottle" : "プラスチックペットボトル",
          category: language === "ko" ? "플라스틱류" : language === "en" ? "Plastics" : "プラスチック類",
          date: new Date().toLocaleDateString(),
          image: imageData
        };
        setRecentSearches(prev => [newItem, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNavigate = (page: Page) => {
    if (page === "mypage" && !isLoggedIn) {
      setCurrentPage("auth");
      setIsSidebarOpen(false);
      return;
    }
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    setCurrentPage("main");
  };

  const handleAnalysisComplete = () => {
    setAnalysisImage(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "auth":
        return (
          <AuthPage
            language={language}
            onLogin={handleLogin}
            onBack={() => setCurrentPage("main")}
          />
        );
      case "mypage":
        return (
          <MyPage
            language={language}
            userName={userName}
            userRegion={userRegion}
            isLoggedIn={isLoggedIn}
            onBack={() => setCurrentPage("main")}
            onRegionChange={(region) => setUserRegion(region)}
            onLogout={() => {
              setIsLoggedIn(false);
              setUserName("");
              setCurrentPage("main");
            }}
          />
        );
      case "notice":
        return <NoticePage language={language} onBack={() => setCurrentPage("main")} />;
      case "community":
        return <CommunityPage language={language} onBack={() => setCurrentPage("main")} />;
      default:
        if (analysisImage) {
          return (
            <AnalysisResult
              image={analysisImage}
              language={language}
              userRegion={userRegion}
              onBack={() => setAnalysisImage(null)}
              onComplete={handleAnalysisComplete}
            />
          );
        }
        return (
          <div className="flex-1 flex flex-col overflow-auto">
            {/* Greeting Banner */}
            <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <div className="text-white text-[200px]">♻️</div>
              </div>
              <div className="max-w-2xl mx-auto relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/bachuri.png"
                      alt="배추리"
                      className="w-20 h-20 object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{t.greeting}</h2>
                      <p className="text-sm opacity-90">{t.tagline}</p>
                    </div>
                  </div>
                  {userRegion && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
                      <MapPin className="w-5 h-5" />
                      <span className="font-bold text-sm">{userRegion}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
              {/* Camera Button */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-[2rem] blur-xl opacity-30 animate-pulse"></div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-primary via-secondary to-accent rounded-[2rem] shadow-2xl flex flex-col items-center justify-center gap-6 hover:scale-105 transition-all duration-300 active:scale-95 border-4 border-white"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-8">
                    <Camera className="w-24 h-24 text-white drop-shadow-lg" />
                  </div>
                  <div className="bg-white/90 rounded-3xl px-8 py-4 backdrop-blur-sm">
                    <p className="text-center text-foreground whitespace-pre-line text-base font-medium">
                      {t.cameraGuide}
                    </p>
                  </div>
                  <div className="absolute -top-4 -right-4 text-6xl animate-bounce">
                    📸
                  </div>
                  <div className="absolute -bottom-4 -left-4 text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                    ♻️
                  </div>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* Recent Searches */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-accent to-primary rounded-2xl p-2 shadow-md">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold">{t.recentSearches}</h3>
                  </div>
                  {recentSearches.length > 3 && (
                    <button
                      onClick={() => setShowAllRecent(!showAllRecent)}
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition-colors bg-primary/10 px-4 py-2 rounded-full"
                    >
                      {t.viewMore}
                    </button>
                  )}
                </div>

                {recentSearches.length === 0 ? (
                  <div className="bg-gradient-to-br from-muted to-white rounded-3xl p-10 text-center border-2 border-dashed border-primary/30">
                    <div className="text-6xl mb-4">🌱</div>
                    <p className="text-muted-foreground whitespace-pre-line font-medium">{t.noRecentSearches}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(showAllRecent ? recentSearches : recentSearches.slice(0, 3)).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setAnalysisImage(item.image)}
                        className="w-full bg-white rounded-3xl shadow-lg border-2 border-primary/10 p-5 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 group"
                      >
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border-2 border-white shadow-md">
                          <img src={item.image} alt={item.item} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="text-base font-bold mb-1.5 text-foreground">{item.item}</h4>
                          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1 rounded-full">
                            <span className="text-xs font-medium text-primary">♻️ {item.category}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                            {item.date}
                          </div>
                          <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Language Selector - Bottom Fixed */}
            <div className="relative p-6 flex justify-center bg-gradient-to-t from-white to-background border-t-2 border-primary/10">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg font-bold"
              >
                <Globe className="w-6 h-6" />
                <span className="text-lg">🌍 {language.toUpperCase()}</span>
              </button>

              {showLanguageMenu && (
                <div className="absolute bottom-24 bg-white rounded-3xl shadow-2xl border-4 border-primary/20 overflow-hidden backdrop-blur-sm">
                  <button
                    onClick={() => {
                      setLanguage("ko");
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-8 py-4 text-left hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all font-medium text-base flex items-center gap-3 group"
                  >
                    <span className="text-3xl group-hover:scale-125 transition-transform">🇰🇷</span>
                    <span>한국어 (KO)</span>
                  </button>
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-8 py-4 text-left hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all font-medium text-base flex items-center gap-3 group"
                  >
                    <span className="text-3xl group-hover:scale-125 transition-transform">🇺🇸</span>
                    <span>English (EN)</span>
                  </button>
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  <button
                    onClick={() => {
                      setLanguage("ja");
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-8 py-4 text-left hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all font-medium text-base flex items-center gap-3 group"
                  >
                    <span className="text-3xl group-hover:scale-125 transition-transform">🇯🇵</span>
                    <span>日本語 (JA)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="size-full flex flex-col bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-4 py-5 flex items-center justify-between shadow-lg">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2.5 hover:bg-white/20 rounded-2xl transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold drop-shadow-md">{t.title}</h1>
        </div>
        <button
          onClick={() => handleNavigate("mypage")}
          className="p-2.5 hover:bg-white/20 rounded-2xl transition-all hover:scale-110 active:scale-95 backdrop-blur-sm relative"
        >
          <User className="w-6 h-6" />
          {isLoggedIn && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white animate-pulse"></div>
          )}
        </button>
      </header>

      {renderPage()}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
        language={language}
      />
    </div>
  );
}