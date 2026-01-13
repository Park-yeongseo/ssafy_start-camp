import { X, Bell, MessageCircle, Lightbulb } from "lucide-react";

type Language = "ko" | "en" | "ja";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: "main" | "mypage" | "notice" | "community" | "tips") => void;
  language: Language;
}

const translations = {
  ko: {
    menu: "메뉴",
    notice: "📢 공지사항",
    community: "💬 커뮤니티",
    tips: "💡 분리수거 꿀팁",
    version: "배출의 민족 v1.0",
    copyright: "© 2026 All rights reserved"
  },
  en: {
    menu: "Menu",
    notice: "📢 Notice",
    community: "💬 Community",
    tips: "💡 Recycling Tips",
    version: "Disposal Nation v1.0",
    copyright: "© 2026 All rights reserved"
  },
  ja: {
    menu: "メニュー",
    notice: "📢 お知らせ",
    community: "💬 コミュニティ",
    tips: "💡 分別のコツ",
    version: "排出の民族 v1.0",
    copyright: "© 2026 All rights reserved"
  }
};

export function Sidebar({ isOpen, onClose, onNavigate, language }: SidebarProps) {
  const t = translations[language];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-primary via-secondary to-accent text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20 bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🌈</span>
              </div>
              <h2 className="text-2xl font-bold">{t.menu}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-white/20 rounded-2xl transition-all hover:rotate-90 hover:scale-110 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-32 left-8 text-6xl opacity-20 animate-bounce">
            ♻️
          </div>
          <div className="absolute top-64 right-8 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '0.3s' }}>
            🌱
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-6 space-y-4 relative z-10">
            <button
              onClick={() => onNavigate("notice")}
              className="w-full flex items-center gap-4 p-5 rounded-3xl bg-white/10 hover:bg-white/25 transition-all hover:scale-105 hover:-translate-y-1 backdrop-blur-sm border border-white/20 shadow-lg group"
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold">{t.notice}</span>
            </button>
            <button
              onClick={() => onNavigate("community")}
              className="w-full flex items-center gap-4 p-5 rounded-3xl bg-white/10 hover:bg-white/25 transition-all hover:scale-105 hover:-translate-y-1 backdrop-blur-sm border border-white/20 shadow-lg group"
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold">{t.community}</span>
            </button>
            <button
              onClick={() => onNavigate("tips")}
              className="w-full flex items-center gap-4 p-5 rounded-3xl bg-white/10 hover:bg-white/25 transition-all hover:scale-105 hover:-translate-y-1 backdrop-blur-sm border border-white/20 shadow-lg group"
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold">{t.tips}</span>
            </button>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/20 text-sm bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌍</span>
              <p className="font-bold">{t.version}</p>
            </div>
            <p className="opacity-70">{t.copyright}</p>
          </div>
        </div>
      </div>
    </>
  );
}
