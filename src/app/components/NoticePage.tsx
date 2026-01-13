import { ArrowLeft, Bell, Calendar } from "lucide-react";

type Language = "ko" | "en" | "ja";

interface NoticePageProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  ko: {
    title: "공지사항",
    noNotices: "등록된 공지사항이 없습니다"
  },
  en: {
    title: "Notice",
    noNotices: "No notices available"
  },
  ja: {
    title: "お知らせ",
    noNotices: "お知らせはありません"
  }
};

const notices = {
  ko: [
    {
      id: 1,
      title: "배출의 민족 서비스 오픈!",
      date: "2026-01-12",
      content: "분리배출을 쉽고 편리하게! 배출의 민족 서비스가 정식 오픈했습니다. AI 기반 쓰레기 인식 기능으로 올바른 분리수거 방법을 안내받으세요."
    },
    {
      id: 2,
      title: "새로운 언어 지원 추가 예정",
      date: "2026-01-10",
      content: "곧 중국어, 베트남어 등 다양한 언어를 지원할 예정입니다. 더 많은 외국인 분들이 편리하게 사용하실 수 있도록 준비중입니다."
    },
    {
      id: 3,
      title: "지역별 분리수거 정보 업데이트",
      date: "2026-01-08",
      content: "서울시 25개 구의 최신 분리수거 정보를 반영했습니다. 마이페이지에서 지역을 설정하시면 더 정확한 정보를 받아보실 수 있습니다."
    }
  ],
  en: [
    {
      id: 1,
      title: "Disposal Nation Service Launch!",
      date: "2026-01-12",
      content: "Make waste disposal easy and convenient! Disposal Nation service is now officially open. Get guidance on proper recycling methods with AI-based waste recognition."
    },
    {
      id: 2,
      title: "New Language Support Coming Soon",
      date: "2026-01-10",
      content: "We will soon support various languages including Chinese and Vietnamese. We are preparing to make it more convenient for more foreigners."
    },
    {
      id: 3,
      title: "Regional Recycling Information Update",
      date: "2026-01-08",
      content: "Updated with the latest recycling information for 25 districts in Seoul. Set your region in My Page to receive more accurate information."
    }
  ],
  ja: [
    {
      id: 1,
      title: "排出の民族サービスオープン！",
      date: "2026-01-12",
      content: "ゴミ出しを簡単便利に！排出の民族サービスが正式オープンしました。AI ベースのゴミ認識機能で正しい分別方法をご案内します。"
    },
    {
      id: 2,
      title: "新しい言語サポート追加予定",
      date: "2026-01-10",
      content: "まもなく中国語、ベトナム語など様々な言語をサポートする予定です。より多くの外国人の方が便利にご利用いただけるよう準備中です。"
    },
    {
      id: 3,
      title: "地域別分別情報アップデート",
      date: "2026-01-08",
      content: "ソウル市25区の最新分別情報を反映しました。マイページで地域を設定するとより正確な情報を受け取ることができます。"
    }
  ]
};

export function NoticePage({ language, onBack }: NoticePageProps) {
  const t = translations[language];
  const noticeList = notices[language];

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
        <div className="max-w-2xl mx-auto space-y-4">
          {noticeList.map((notice) => (
            <div
              key={notice.id}
              className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">{notice.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{notice.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{notice.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
