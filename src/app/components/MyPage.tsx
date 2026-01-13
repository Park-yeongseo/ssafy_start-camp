import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Bell, LogOut } from "lucide-react";

type Language = "ko" | "en" | "ja";

interface MyPageProps {
  language: Language;
  userName: string;
  isLoggedIn: boolean;
  onBack: () => void;
  onLogout: () => void;
}

const translations = {
  ko: {
    title: "마이페이지",
    profile: "프로필",
    name: "이름",
    namePlaceholder: "이름을 입력하세요",
    region: "지역 설정",
    regionPlaceholder: "구를 선택하세요",
    notifications: "알림 설정",
    notificationTitle: "알림",
    recyclingReminder: "분리수거 알림",
    recyclingReminderDesc: "분리수거일을 알려드려요",
    newsNotification: "공지사항 알림",
    newsNotificationDesc: "새로운 소식을 받아보세요",
    communityNotification: "커뮤니티 알림",
    communityNotificationDesc: "커뮤니티 활동을 알려드려요",
    save: "💾 저장하기",
    logout: "로그아웃",
    changePhoto: "사진 변경",
    saveSuccess: "저장되었습니다! ✅"
  },
  en: {
    title: "My Page",
    profile: "Profile",
    name: "Name",
    namePlaceholder: "Enter your name",
    region: "Region Setting",
    regionPlaceholder: "Select district",
    notifications: "Notification Settings",
    notificationTitle: "Notifications",
    recyclingReminder: "Recycling Reminder",
    recyclingReminderDesc: "Get reminded of recycling days",
    newsNotification: "News Notification",
    newsNotificationDesc: "Receive updates",
    communityNotification: "Community Notification",
    communityNotificationDesc: "Get community activity updates",
    save: "💾 Save",
    logout: "Logout",
    changePhoto: "Change Photo",
    saveSuccess: "Saved! ✅"
  },
  ja: {
    title: "マイページ",
    profile: "プロフィール",
    name: "名前",
    namePlaceholder: "名前を入力してください",
    region: "地域設定",
    regionPlaceholder: "区を選択してください",
    notifications: "通知設定",
    notificationTitle: "通知",
    recyclingReminder: "分別リマインダー",
    recyclingReminderDesc: "分別日をお知らせします",
    newsNotification: "お知らせ通知",
    newsNotificationDesc: "最新情報を受け取る",
    communityNotification: "コミュニティ通知",
    communityNotificationDesc: "コミュニティ活動をお知らせ",
    save: "💾 保存",
    logout: "ログアウト",
    changePhoto: "写真を変更",
    saveSuccess: "保存しました！ ✅"
  }
};

const districts = [
  "강남구", "강동구", "강북구", "강서구", "관악구",
  "광진구", "구로구", "금천구", "노원구", "도봉구",
  "동대문구", "동작구", "마포구", "서대문구", "서초구",
  "성동구", "성북구", "송파구", "양천구", "영등포구",
  "용산구", "은평구", "종로구", "중구", "중랑구"
];

export function MyPage({ language, userName, isLoggedIn, onBack, onLogout }: MyPageProps) {
  const [name, setName] = useState(userName);
  const [region, setRegion] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [notifRecycling, setNotifRecycling] = useState(true);
  const [notifNews, setNotifNews] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(false);
  const t = translations[language];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert(t.saveSuccess);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center gap-4 shadow-md">
        <button
          onClick={onBack}
          className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">{t.title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          {/* Profile Section */}
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 mb-4">
            <h2 className="mb-6">{t.profile}</h2>
            
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl text-white">
                      {name ? name.charAt(0).toUpperCase() : "🌱"}
                    </span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t.changePhoto}</p>
            </div>

            {/* Name Input */}
            <div className="mb-6">
              <label className="block mb-2 text-sm">{t.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Region Select */}
            <div className="mb-6">
              <label className="block mb-2 text-sm">{t.region}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                >
                  <option value="">{t.regionPlaceholder}</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 mb-4">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2>{t.notifications}</h2>
            </div>
            
            {/* Recycling Reminder */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <div className="flex-1">
                <p className="mb-1">🗑️ {t.recyclingReminder}</p>
                <p className="text-sm text-muted-foreground">{t.recyclingReminderDesc}</p>
              </div>
              <button
                onClick={() => setNotifRecycling(!notifRecycling)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifRecycling ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifRecycling ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            {/* News Notification */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <div className="flex-1">
                <p className="mb-1">📢 {t.newsNotification}</p>
                <p className="text-sm text-muted-foreground">{t.newsNotificationDesc}</p>
              </div>
              <button
                onClick={() => setNotifNews(!notifNews)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifNews ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifNews ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            {/* Community Notification */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="mb-1">💬 {t.communityNotification}</p>
                <p className="text-sm text-muted-foreground">{t.communityNotificationDesc}</p>
              </div>
              <button
                onClick={() => setNotifCommunity(!notifCommunity)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifCommunity ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifCommunity ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl hover:bg-primary/90 transition-colors mb-3"
          >
            {t.save}
          </button>

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="w-full bg-red-50 text-red-600 py-4 rounded-2xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              {t.logout}
            </button>
          )}

          {/* Additional Info */}
          <div className="bg-accent/10 rounded-2xl p-4 text-sm mt-4">
            <p className="text-accent-foreground">
              {language === "ko" && "💡 지역을 설정하면 해당 지역의 분리수거 방법을 더 정확하게 안내받을 수 있습니다."}
              {language === "en" && "💡 Setting your region helps provide more accurate recycling information for your area."}
              {language === "ja" && "💡 地域を設定すると、その地域の分別方法をより正確にご案내できます。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}