import { ArrowLeft, Trash2, Recycle, AlertCircle, MapPin, CheckCircle2, RotateCcw } from "lucide-react";
import { useState } from "react";

type Language = "ko" | "en" | "ja";

interface AnalysisResultProps {
  image: string;
  language: Language;
  userRegion: string;
  onBack: () => void;
  onComplete: () => void;
}

const translations = {
  ko: {
    title: "🎯 AI 분석 결과",
    analyzing: "🔍 AI가 분석 중입니다...",
    detected: "감지된 폐기물",
    confidence: "AI 정확도",
    category: "분류 카테고리",
    yourRegion: "📍 설정된 지역",
    howToDispose: "♻️ 분리배출 가이드",
    tips: "💡 똑똑한 배출 팁",
    retake: "다시 촬영",
    complete: "배출 완료",
    completeMessage: "배출 완료! 지구를 지켜주셔서 감사합니다 🌍💚",
    noRegion: "지역 미설정"
  },
  en: {
    title: "🎯 AI Analysis Result",
    analyzing: "🔍 AI is analyzing...",
    detected: "Detected Waste",
    confidence: "AI Confidence",
    category: "Category",
    yourRegion: "📍 Your Region",
    howToDispose: "♻️ Disposal Guide",
    tips: "💡 Smart Disposal Tips",
    retake: "Retake Photo",
    complete: "Complete",
    completeMessage: "Disposal complete! Thank you for saving the Earth 🌍💚",
    noRegion: "No region set"
  },
  ja: {
    title: "🎯 AI分析結果",
    analyzing: "🔍 AIが分析中です...",
    detected: "検出された廃棄物",
    confidence: "AI精度",
    category: "分類カテゴリー",
    yourRegion: "📍 設定地域",
    howToDispose: "♻️ 分別ガイド",
    tips: "💡 スマート排出のコツ",
    retake: "再撮影",
    complete: "完了",
    completeMessage: "排出完了！地球を守ってくれてありがとうございます 🌍💚",
    noRegion: "地域未設定"
  }
};

// Mock AI analysis data
const analysisData = {
  ko: {
    item: "플라스틱 페트병",
    category: "플라스틱류",
    confidence: 95,
    steps: [
      "내용물을 완전히 비웁니다",
      "라벨을 제거합니다 (비닐류로 따로 배출)",
      "물로 헹구어 이물질을 제거합니다",
      "뚜껑을 분리합니다 (플라스틱 뚜껑도 플라스틱으로 배출)",
      "압축하여 부피를 줄입니다",
      "투명 페트병 전용 수거함에 배출합니다"
    ],
    tips: [
      "투명 페트병은 일반 플라스틱과 별도로 배출해야 재활용률이 높아집니다",
      "라벨이 붙은 채로 배출하면 재활용이 어렵습니다",
      "음료가 남아있으면 악취와 오염의 원인이 됩니다"
    ]
  },
  en: {
    item: "Plastic PET Bottle",
    category: "Plastics",
    confidence: 95,
    steps: [
      "Empty all contents completely",
      "Remove the label (dispose separately as vinyl)",
      "Rinse with water to remove residue",
      "Separate the cap (recycle as plastic)",
      "Compress to reduce volume",
      "Dispose in transparent PET bottle bin"
    ],
    tips: [
      "Transparent PET bottles should be separated from regular plastics for better recycling",
      "Labels make recycling difficult if not removed",
      "Remaining liquid causes odor and contamination"
    ]
  },
  ja: {
    item: "プラスチックペットボトル",
    category: "プラスチック類",
    confidence: 95,
    steps: [
      "中身を完全に空にします",
      "ラベルを剥がします（ビニール類として別途排出）",
      "水で洗って異物を除去します",
      "キャップを分리します（プラスチックキャップもプラスチックとして排出）",
      "圧縮して体積を減らします",
      "透明ペットボトル専用回収箱に排出します"
    ],
    tips: [
      "透明ペットボトルは一般プラスチックと別に排出するとリサイクル率が上がります",
      "ラベルが付いたまま排出するとリサイクルが難しくなります",
      "飲料が残っていると悪臭と汚染の原因になります"
    ]
  }
};

export function AnalysisResult({ image, language, userRegion, onBack, onComplete }: AnalysisResultProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const t = translations[language];
  const data = analysisData[language];

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      alert(t.completeMessage);
      onComplete();
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-4 py-5 flex items-center gap-4 shadow-lg">
        <button
          onClick={onBack}
          className="p-2.5 hover:bg-white/20 rounded-2xl transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold drop-shadow-md">{t.title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-6">
          {/* Image Preview */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-[2rem] blur-xl opacity-20"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src={image} alt="Analyzed waste" className="w-full h-auto" />
            </div>
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-accent to-primary text-white rounded-full p-4 shadow-xl animate-bounce">
              <span className="text-3xl">✨</span>
            </div>
          </div>

          {/* Detected Item with Confidence */}
          <div className="bg-gradient-to-br from-white to-primary/5 rounded-3xl shadow-xl border-2 border-primary/20 p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-3xl shadow-lg">
                <Trash2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1">{t.detected}</p>
                <h2 className="text-2xl font-bold text-foreground">{data.item}</h2>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-muted-foreground">{t.confidence}</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{data.confidence}%</span>
                  <span className="text-xl">🎯</span>
                </div>
              </div>
              <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${data.confidence}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 bg-gradient-to-r from-primary/10 to-secondary/10 px-5 py-3 rounded-2xl flex items-center justify-center gap-2 border-2 border-primary/20">
                <span className="text-2xl">♻️</span>
                <span className="font-bold text-sm">{data.category}</span>
              </div>
            </div>
          </div>

          {/* Region Info */}
          {userRegion && (
            <div className="bg-gradient-to-r from-secondary/20 to-accent/20 border-2 border-secondary/30 rounded-3xl p-5 mb-6 flex items-center gap-4 shadow-lg">
              <div className="bg-gradient-to-br from-secondary to-accent p-3 rounded-2xl shadow-md">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-secondary mb-1">{t.yourRegion}</p>
                <p className="font-bold text-lg text-foreground">{userRegion}</p>
              </div>
            </div>
          )}

          {/* How to Dispose */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-primary/20 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl shadow-lg">
                <Recycle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold">{t.howToDispose}</h3>
            </div>
            <div className="space-y-4">
              {data.steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary text-white rounded-2xl flex items-center justify-center text-base font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <p className="flex-1 pt-2 font-medium text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-3xl border-2 border-accent/30 p-8 mb-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-accent to-primary p-3 rounded-2xl shadow-lg">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-accent-foreground">{t.tips}</h3>
            </div>
            <ul className="space-y-4">
              {data.tips.map((tip, index) => (
                <li key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💡</span>
                  </div>
                  <span className="flex-1 text-base font-medium pt-2">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 py-5 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 font-bold text-lg border-2 border-gray-300"
            >
              <RotateCcw className="w-6 h-6" />
              <span>🔄 {t.retake}</span>
            </button>
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={`flex-1 py-5 rounded-3xl transition-all flex items-center justify-center gap-3 font-bold text-lg border-2 ${
                isCompleted
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-500 shadow-xl"
                  : "bg-gradient-to-r from-primary to-secondary text-white border-primary/30 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <CheckCircle2 className="w-6 h-6" />
              <span>{isCompleted ? "✅ " : ""}✓ {t.complete}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}