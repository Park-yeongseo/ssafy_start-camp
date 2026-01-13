import { ArrowLeft, Trash2, Recycle, AlertCircle, MapPin, CheckCircle2, RotateCcw } from "lucide-react";
import { useState } from "react";

type Language = "ko" | "en" | "ja";

interface AnalysisResultProps {
  image: string;
  language: Language;
  userRegion: string;
  wasteType: string;
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
    tips: "💡 スマート排出ヒント",
    retake: "再撮影",
    complete: "排出完了",
    completeMessage: "排出完了！地球を守ってくれてありがとうございます 🌍💚",
    noRegion: "地域未設定"
  }
};

// Mock AI analysis data by waste type
const getAnalysisData = (wasteType: string, language: Language) => {
  const data = {
    'plastic-bottle': {
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
          "キャップを分離します（プラスチックキャップもプラスチックとして排出）",
          "圧縮して体積を減らします",
          "透明ペットボトル専用回収箱に排出します"
        ],
        tips: [
          "透明ペットボトルは一般プラスチックと別に排出するとリサイクル率が上がります",
          "ラベルが付いたまま排出するとリサイクルが難しくなります",
          "飲料が残っていると悪臭と汚染の原因になります"
        ]
      }
    },
    'food-waste': {
      ko: {
        item: "음식물 쓰레기",
        category: "음식물류",
        confidence: 92,
        steps: [
          "물기를 최대한 제거합니다",
          "딱딱한 뼈, 껍질, 씨앗 등은 제거합니다",
          "비닐봉지나 이물질을 완전히 제거합니다",
          "음식물 전용 수거용기에 담습니다",
          "지정된 음식물 쓰레기 배출구에 버립니다"
        ],
        tips: [
          "물기가 많으면 악취와 해충 발생의 원인이 됩니다",
          "호두, 밤 등의 딱딱한 껍질은 일반쓰레기로 배출하세요",
          "양파·마늘 껍질, 옥수수대 등 섬유질이 많은 것은 일반쓰레기입니다"
        ]
      },
      en: {
        item: "Food Waste",
        category: "Food",
        confidence: 92,
        steps: [
          "Remove excess moisture",
          "Remove hard bones, shells, and seeds",
          "Remove all plastic bags and foreign objects",
          "Place in designated food waste container",
          "Dispose at designated food waste collection point"
        ],
        tips: [
          "Excess moisture causes odor and pest problems",
          "Hard shells like walnuts and chestnuts go to general waste",
          "High-fiber items like onion peels and corn stalks are general waste"
        ]
      },
      ja: {
        item: "生ゴミ",
        category: "生ゴミ類",
        confidence: 92,
        steps: [
          "水気を最大限除去します",
          "硬い骨、殻、種などを取り除きます",
          "ビニール袋や異物を完全に除去します",
          "生ゴミ専用回収容器に入れます",
          "指定された生ゴミ排出口に捨てます"
        ],
        tips: [
          "水気が多いと悪臭と害虫発生の原因になります",
          "クルミ、栗などの硬い殻は一般ゴミとして排出してください",
          "玉ねぎ・にんにくの皮、とうもろこしの茎など繊維質が多いものは一般ゴミです"
        ]
      }
    },
    'general-waste': {
      ko: {
        item: "일반 쓰레기",
        category: "일반쓰레기",
        confidence: 88,
        steps: [
          "재활용이 불가능한 것인지 확인합니다",
          "날카로운 것은 신문지나 종이로 감쌉니다",
          "종량제 봉투에 담습니다",
          "지정된 배출 시간과 장소를 확인합니다",
          "종량제 봉투를 배출합니다"
        ],
        tips: [
          "재활용 가능한 것을 일반쓰레기로 버리면 환경오염이 심해집니다",
          "깨진 유리나 도자기는 신문지로 싸서 '위험' 표시를 해주세요",
          "비닐이나 플라스틱이 섞인 종이는 재활용이 안 되어 일반쓰레기입니다"
        ]
      },
      en: {
        item: "General Waste",
        category: "General",
        confidence: 88,
        steps: [
          "Confirm item is not recyclable",
          "Wrap sharp objects in newspaper or paper",
          "Place in designated waste bag",
          "Check designated disposal time and location",
          "Dispose waste bag"
        ],
        tips: [
          "Disposing recyclables as general waste increases environmental pollution",
          "Wrap broken glass or ceramics in newspaper and mark 'Danger'",
          "Paper mixed with vinyl or plastic cannot be recycled and is general waste"
        ]
      },
      ja: {
        item: "一般ゴミ",
        category: "一般ゴミ",
        confidence: 88,
        steps: [
          "リサイクル不可能なものか確認します",
          "鋭利なものは新聞紙や紙で包みます",
          "指定ゴミ袋に入れます",
          "指定された排出時間と場所を確認します",
          "ゴミ袋を排出します"
        ],
        tips: [
          "リサイクル可能なものを一般ゴミとして捨てると環境汚染が深刻化します",
          "割れたガラスや陶器は新聞紙で包んで「危険」表示をしてください",
          "ビニールやプラスチックが混ざった紙はリサイクルできず一般ゴミです"
        ]
      }
    }
  };

  return data[wasteType as keyof typeof data]?.[language] || data['plastic-bottle'][language];
};
export function AnalysisResult({ image, language, userRegion, wasteType, onBack, onComplete }: AnalysisResultProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const t = translations[language];
  const data = getAnalysisData(wasteType, language);

  // Initialize completedSteps array when component mounts
  if (completedSteps.length === 0) {
    setCompletedSteps(new Array(data.steps.length).fill(false));
  }

  const allStepsCompleted = completedSteps.every(step => step);

  const toggleStep = (index: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[index] = !newCompletedSteps[index];
    setCompletedSteps(newCompletedSteps);
  };

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

          {/* Baechuri Guide */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-lg border-2 border-primary/30 p-6 mb-6">
            <div className="flex items-center gap-4">
              <img
                src="bachuri.png"
                alt="배추리"
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-primary mb-1">
                  {language === "ko" ? "배추리의 분리배출 가이드" : language === "en" ? "Baechuri's Disposal Guide" : "ベチュリの分別ガイド"}
                </p>
                <p className="text-sm text-gray-700">
                  {language === "ko" ? "안녕하세요! 제가 단계별로 안내해드릴게요 🌱" : language === "en" ? "Hello! I'll guide you step by step 🌱" : "こんにちは！ステップごとにご案内します 🌱"}
                </p>
              </div>
            </div>
          </div>

          {/* How to Dispose */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-primary/20 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl shadow-lg">
                <Recycle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold">{t.howToDispose}</h3>
            </div>
            <div className="space-y-3">
              {data.steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => toggleStep(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 group ${
                    completedSteps[index]
                      ? "bg-gray-100 border-gray-300 hover:bg-gray-150"
                      : "bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 hover:border-primary/40 hover:shadow-md"
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-base font-bold shadow-md transition-all ${
                    completedSteps[index]
                      ? "bg-gray-400 text-white"
                      : "bg-gradient-to-br from-primary to-secondary text-white group-hover:scale-110"
                  }`}>
                    {completedSteps[index] ? "✓" : index + 1}
                  </div>
                  <p className={`flex-1 text-left font-medium transition-all ${
                    completedSteps[index]
                      ? "text-gray-400 line-through"
                      : "text-foreground"
                  }`}>
                    {step}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl border-3 border-amber-300 p-8 mb-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-200">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-2xl shadow-lg animate-pulse">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900">{t.tips}</h3>
            </div>
            <div className="space-y-4">
              {data.tips.map((tip, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-md border-2 border-amber-200 hover:shadow-lg hover:border-amber-300 transition-all">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-3xl">💡</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                          TIP {index + 1}
                        </span>
                      </div>
                      <p className="text-base font-medium text-gray-800 leading-relaxed">{tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              disabled={isCompleted || !allStepsCompleted}
              className={`flex-1 py-5 rounded-3xl transition-all flex items-center justify-center gap-3 font-bold text-lg border-2 ${
                isCompleted
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-500 shadow-xl"
                  : allStepsCompleted
                  ? "bg-gradient-to-r from-primary to-secondary text-white border-primary/30 hover:shadow-xl hover:-translate-y-1"
                  : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-50"
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