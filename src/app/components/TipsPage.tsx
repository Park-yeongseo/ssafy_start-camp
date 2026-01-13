import { ArrowLeft, ChevronRight, Recycle } from "lucide-react";
import { useState } from "react";

type Language = "ko" | "en" | "ja";

interface TipsPageProps {
  language: Language;
  onBack: () => void;
}

interface Tip {
  id: number;
  title: string;
  category: string;
  emoji: string;
  icon: string;
  color: string;
}

interface TipDetail {
  title: string;
  category: string;
  emoji: string;
  description: string;
  items: string[];
  methods: string[];
  warnings: string[];
  tips: string[];
  additionalInfo?: string[];
}

const translations = {
  ko: {
    title: "💡 분리수거 꿀팁",
    subtitle: "올바른 분리수거로 지구를 지켜요!",
    backToList: "목록으로",
    howToDispose: "배출 방법",
    importantNotes: "⚠️ 주의사항",
    proTips: "🌟 프로 팁",
    additionalInfo: "📌 추가 정보",
    tapToView: "자세히 보기"
  },
  en: {
    title: "💡 Recycling Tips",
    subtitle: "Save the Earth with proper waste sorting!",
    backToList: "Back to List",
    howToDispose: "How to Dispose",
    importantNotes: "⚠️ Important Notes",
    proTips: "🌟 Pro Tips",
    additionalInfo: "📌 Additional Info",
    tapToView: "Tap to View"
  },
  ja: {
    title: "💡 分別のコツ",
    subtitle: "正しい分別で地球を守ろう！",
    backToList: "リストに戻る",
    howToDispose: "排出方法",
    importantNotes: "⚠️ 注意事項",
    proTips: "🌟 プロのヒント",
    additionalInfo: "📌 追加情報",
    tapToView: "詳しく見る"
  }
};

const tipsData = {
  ko: [
    {
      id: 1,
      title: "종이류",
      category: "Paper",
      emoji: "📄",
      icon: "📰",
      color: "from-blue-400 to-blue-600",
      detail: {
        title: "종이류 분리배출 가이드",
        category: "일반 종이, 신문, 잡지, 박스, 종이컵",
        emoji: "📄",
        description: "종이는 재활용이 가능한 중요한 자원입니다! 올바른 분리배출로 나무를 지켜주세요 🌳",
        items: ["일반 종이", "신문지", "잡지", "골판지 박스", "종이컵", "종이팩", "책자"],
        methods: [
          "📰 일반 종이는 깨끗한 상태로만 분리수거합니다",
          "📑 신문과 잡지는 각각 따로 묶어서 배출합니다",
          "📦 박스는 테이프와 스티커를 완전히 제거한 후 접어서 배출합니다",
          "☕ 종이컵과 종이팩은 내용물을 비우고 물로 헹군 후 펼쳐서 배출합니다",
          "📚 책은 비닐 커버와 스프링을 제거한 후 배출합니다"
        ],
        warnings: [
          "기름이나 음식물이 묻은 종이는 일반쓰레기로 배출하세요",
          "코팅된 광고지나 금박/은박 종이는 재활용이 어렵습니다",
          "종이컵 안쪽에 코팅된 비닐은 따로 떼어낼 필요 없습니다 (전용 수거함 이용)",
          "젖은 종이나 물에 녹은 종이는 재활용 불가합니다"
        ],
        tips: [
          "박스에 붙은 택배 송장은 개인정보 보호를 위해 떼어내세요",
          "종이팩은 따로 모아두면 화장지로 교환해주는 마트가 많아요",
          "신문지는 습기 제거에도 좋으니 김치 냉장고나 신발장에 활용해보세요",
          "색깔 있는 종이도 재활용 가능하니 일반 종이와 함께 배출하세요"
        ]
      }
    },
    {
      id: 2,
      title: "플라스틱",
      category: "Plastic",
      emoji: "♻️",
      icon: "🧴",
      color: "from-green-400 to-green-600",
      detail: {
        title: "플라스틱 분리배출 가이드",
        category: "PET병, 플라스틱 용기, 비닐봉지",
        emoji: "♻️",
        description: "플라스틱은 분해되는데 수백 년이 걸립니다! 재활용으로 환경을 지켜요 🌊",
        items: ["투명 PET병", "플라스틱 용기", "비닐봉지", "스티로폼", "일회용 컵", "플라스틱 뚜껑"],
        methods: [
          "🍾 PET병은 라벨을 완전히 제거하고 뚜껑을 분리합니다",
          "🧼 용기 안쪽을 깨끗하게 물로 헹궈서 배출합니다",
          "🗜️ 압축하여 부피를 최대한 줄여서 배출합니다",
          "🎯 투명 PET병은 별도 전용 수거함에 배출하면 더 좋습니다",
          "🛍️ 비닐봉지는 이물질을 제거하고 따로 모아서 배출합니다",
          "📦 스티로폼은 테이프와 라벨을 떼고 깨끗하게 배출합니다"
        ],
        warnings: [
          "기름이나 음식물이 묻은 용기는 재활용 불가 - 일반쓰레기로!",
          "화장품이나 샴푸 용기는 완전히 비우고 씻어야 합니다",
          "PVC 재질이나 열에 약한 플라스틱은 분리 표시를 확인하세요",
          "여러 재질이 섞인 제품(펌프 등)은 분해 후 각각 배출하세요"
        ],
        tips: [
          "투명 페트병만 따로 모으면 재활용률이 95%까지 올라갑니다!",
          "라벨 제거가 어렵다면 따뜻한 물에 담가두면 쉽게 벗겨져요",
          "비닐봉지는 재사용이 최고! 장바구니를 꼭 챙기세요",
          "플라스틱 숫자 표시(1~7)를 확인하면 재질을 알 수 있어요"
        ]
      }
    },
    {
      id: 3,
      title: "유리",
      category: "Glass",
      emoji: "🍶",
      icon: "🍾",
      color: "from-purple-400 to-purple-600",
      detail: {
        title: "유리 분리배출 가이드",
        category: "음료수병, 유리병, 유리컵",
        emoji: "🍶",
        description: "유리는 100% 재활용이 가능한 최고의 친환경 소재입니다! ✨",
        items: ["음료수 유리병", "소주병", "맥주병", "잼병", "화장품 유리병", "유리컵"],
        methods: [
          "🧹 내용물을 완전히 비우고 물로 깨끗이 헹굽니다",
          "🏷️ 라벨과 뚜껑을 제거합니다 (금속/플라스틱 뚜껑은 따로)",
          "🔵 색깔별로 분류하면 더 좋습니다 (투명/갈색/녹색)",
          "📦 깨진 유리는 신문지나 박스에 싸서 '위험' 표시를 합니다",
          "♻️ 소주병·맥주병은 빈병 보증금 환급 대상입니다"
        ],
        warnings: [
          "깨진 유리 조각은 재활용 불가 - 신문지에 싸서 일반쓰레기로!",
          "거울, 전구, LED, 도자기는 유리가 아니에요",
          "내열 유리(파이렉스)는 일반 유리와 다른 재질입니다",
          "창문 유리는 대형폐기물로 별도 처리해야 합니다"
        ],
        tips: [
          "소주병은 슈퍼에 반납하면 개당 100원을 돌려받을 수 있어요",
          "유리병의 라벨은 따뜻한 물에 담그면 쉽게 제거됩니다",
          "유리는 몇 번을 재활용해도 품질이 떨어지지 않는 완벽한 소재예요",
          "예쁜 유리병은 재활용하지 말고 화병이나 소품으로 활용해보세요"
        ]
      }
    },
    {
      id: 4,
      title: "금속 캔",
      category: "Metal",
      emoji: "🥫",
      icon: "🔩",
      color: "from-orange-400 to-orange-600",
      detail: {
        title: "금속 캔 분리배출 가이드",
        category: "음료 캔, 통조림 캔, 부탄가스",
        emoji: "🥫",
        description: "금속은 무한 재활용이 가능한 귀중한 자원입니다! 🏭",
        items: ["음료수 캔", "맥주 캔", "참치캔", "통조림", "부탄가스", "알루미늄 호일"],
        methods: [
          "🧃 내용물을 완전히 비우고 물로 헹굽니다",
          "🗜️ 캔을 납작하게 눌러서 부피를 줄입니다",
          "🔪 참치캔 뚜껑은 날카로우니 캔 안쪽으로 눌러 넣습니다",
          "💨 부탄가스는 구멍을 뚫어 가스를 완전히 빼고 배출합니다",
          "📏 알루미늄 호일은 깨끗하게 접어서 배출합니다"
        ],
        warnings: [
          "부탄가스는 가스를 완전히 빼지 않으면 폭발 위험이 있습니다!",
          "페인트 캔, 살충제 캔은 유해물질이 있어 별도 배출해야 합니다",
          "기름이 많이 묻은 캔은 일반쓰레기로 배출하세요",
          "날카로운 캔 뚜껑에 다치지 않도록 주의하세요"
        ],
        tips: [
          "알루미늄 캔 100개를 재활용하면 전구 20시간을 켤 수 있는 에너지를 절약해요",
          "참치캔은 기름을 키친타올로 닦아내면 재활용하기 좋아요",
          "부탄가스 구멍 뚫기가 무섭다면 전용 천공기를 이용하세요",
          "캔은 자석에 붙으면 철, 안 붙으면 알루미늄이에요"
        ]
      }
    },
    {
      id: 5,
      title: "대형 폐기물",
      category: "Bulky Waste",
      emoji: "🛋️",
      icon: "🪑",
      color: "from-red-400 to-red-600",
      detail: {
        title: "대형 폐기물 배출 가이드",
        category: "가구, 가전제품, 매트리스",
        emoji: "🛋️",
        description: "대형 폐기물은 사전 예약이 필수! 올바른 절차로 배출하세요 📞",
        items: ["소파", "침대", "장롱", "냉장고", "세탁기", "TV", "에어컨", "매트리스"],
        methods: [
          "📱 지자체 콜센터나 앱으로 사전 예약합니다",
          "💳 수거 스티커를 구매하여 제품에 부착합니다",
          "📅 지정된 날짜와 장소에 배출합니다",
          "♻️ 가전제품은 무상방문수거 서비스를 이용할 수 있습니다",
          "🔧 가능하다면 분해하여 재활용 가능 부분을 분리합니다"
        ],
        warnings: [
          "예약 없이 무단 배출 시 과태료가 부과됩니다",
          "냉장고·에어컨은 반드시 냉매를 제거한 후 배출해야 합니다",
          "스티커 없이 배출하면 수거되지 않습니다",
          "아파트 단지 내 임의 방치는 절대 금지!"
        ],
        tips: [
          "폐가전 무상방문수거: ☎ 1599-0903 (전국 공통)",
          "서울시 '클린업'앱으로 간편하게 예약할 수 있어요",
          "상태가 좋은 가구는 중고거래나 나눔을 먼저 고려해보세요",
          "이사철에는 대형폐기물 수거 예약이 밀리니 미리 신청하세요"
        ],
        additionalInfo: [
          "📞 서울시 대형폐기물 수거 예약: 120 또는 클린업 앱",
          "📞 경기도: 각 시·군청 콜센터 (031-1234-5678 형식)",
          "💻 온라인 예약: 각 지자체 홈페이지 '폐기물 배출' 메뉴",
          "💰 수거 비용: 품목과 크기에 따라 5,000원~50,000원",
          "🏪 수거 스티커 구매처: 동주민센터, 편의점, 은행"
        ]
      }
    },
    {
      id: 6,
      title: "음식물 쓰레기",
      category: "Food Waste",
      emoji: "🥬",
      icon: "🍎",
      color: "from-yellow-400 to-yellow-600",
      detail: {
        title: "음식물 쓰레기 배출 가이드",
        category: "음식물 찌꺼기, 과일 껍질",
        emoji: "🥬",
        description: "음식물 쓰레기는 퇴비와 사료로 재활용됩니다! 올바른 배출이 중요해요 🌱",
        items: ["채소 껍질", "과일 껍질", "생선 가시", "달걀 껍데기", "밥·국", "커피 찌꺼기"],
        methods: [
          "💧 물기를 최대한 제거합니다 (20% 이상 제거 필수)",
          "🥢 이쑤시개, 비닐 등 이물질을 완전히 제거합니다",
          "🗑️ 음식물 전용 수거용기나 종량제 봉투에 담습니다",
          "📦 아파트는 음식물 처리기에, 단독주택은 지정일에 배출합니다",
          "🧊 냉동실에 보관했다가 배출하면 악취가 덜합니다"
        ],
        warnings: [
          "❌ 동물 뼈다귀 (돼지·소·닭뼈) → 일반쓰레기",
          "❌ 조개·소라·전복·게·가재 껍데기 → 일반쓰레기",
          "❌ 양파·마늘·생강·옥수수 껍질 → 일반쓰레기",
          "❌ 호두·밤·땅콩 껍데기 → 일반쓰레기",
          "❌ 복숭아·체리·망고 씨 → 일반쓰레기",
          "❌ 티백, 한약재 찌꺼기 → 일반쓰레기"
        ],
        tips: [
          "물기 제거 꿀팁: 신문지를 깔고 하루 정도 두면 수분이 흡수돼요",
          "냄새 제거: 커피 찌꺼기를 함께 넣으면 악취가 줄어듭니다",
          "과일 껍질은 오래 두면 초파리가 생기니 바로바로 배출하세요",
          "음식물 쓰레기 20% 줄이면 연간 약 5만원의 처리 비용이 절약됩니다!"
        ],
        additionalInfo: [
          "🐖 동물 사료로 재활용: 수분 제거가 잘된 음식물",
          "🌱 퇴비로 재활용: 과일 껍질, 채소 등",
          "⚡ 바이오가스로 생산: 음식물 쓰레기로 전기와 가스 생산",
          "💰 배출량에 따라 요금이 부과되니 줄이는 것이 중요해요"
        ]
      }
    }
  ],
  en: [
    {
      id: 1,
      title: "Paper",
      category: "Paper",
      emoji: "📄",
      icon: "📰",
      color: "from-blue-400 to-blue-600",
      detail: {
        title: "Paper Recycling Guide",
        category: "General paper, Newspaper, Magazines, Boxes",
        emoji: "📄",
        description: "Paper is a valuable recyclable resource! Save trees with proper sorting 🌳",
        items: ["General paper", "Newspapers", "Magazines", "Cardboard boxes", "Paper cups", "Paper cartons", "Books"],
        methods: [
          "📰 Recycle only clean paper",
          "📑 Bundle newspapers and magazines separately",
          "📦 Remove tape and stickers from boxes, then flatten them",
          "☕ Rinse paper cups and cartons, then flatten before disposal",
          "📚 Remove vinyl covers and springs from books"
        ],
        warnings: [
          "Oil or food-stained paper goes to general waste",
          "Coated advertising paper or gold/silver foil paper are hard to recycle",
          "Wet or water-damaged paper cannot be recycled",
          "Waxed paper and thermal receipts are not recyclable"
        ],
        tips: [
          "Remove shipping labels from boxes for privacy protection",
          "Collect paper cartons separately - many stores exchange them for tissue",
          "Newspapers are great for absorbing moisture in refrigerators",
          "Colored paper is also recyclable - dispose with regular paper"
        ]
      }
    },
    {
      id: 2,
      title: "Plastic",
      category: "Plastic",
      emoji: "♻️",
      icon: "🧴",
      color: "from-green-400 to-green-600",
      detail: {
        title: "Plastic Recycling Guide",
        category: "PET bottles, Plastic containers, Plastic bags",
        emoji: "♻️",
        description: "Plastic takes hundreds of years to decompose! Protect the environment through recycling 🌊",
        items: ["Transparent PET bottles", "Plastic containers", "Plastic bags", "Styrofoam", "Disposable cups", "Plastic caps"],
        methods: [
          "🍾 Remove labels completely and separate caps from PET bottles",
          "🧼 Rinse containers thoroughly with water",
          "🗜️ Compress to reduce volume as much as possible",
          "🎯 Transparent PET bottles go in dedicated collection bins if available",
          "🛍️ Remove foreign matter from plastic bags and collect separately",
          "📦 Remove tape and labels from styrofoam before disposal"
        ],
        warnings: [
          "Containers with oil or food residue cannot be recycled - general waste!",
          "Cosmetic or shampoo containers must be completely empty and rinsed",
          "Check the PVC material marking for heat-sensitive plastics",
          "Disassemble mixed-material products (pumps, etc.) before disposal"
        ],
        tips: [
          "Collecting transparent PET bottles separately increases recycling rate to 95%!",
          "Soak in warm water to easily remove stubborn labels",
          "Reusing plastic bags is best - always bring reusable shopping bags",
          "Check plastic number markings (1-7) to identify the material type"
        ]
      }
    },
    {
      id: 3,
      title: "Glass",
      category: "Glass",
      emoji: "🍶",
      icon: "🍾",
      color: "from-purple-400 to-purple-600",
      detail: {
        title: "Glass Recycling Guide",
        category: "Beverage bottles, Glass bottles, Glass cups",
        emoji: "🍶",
        description: "Glass is 100% recyclable - the ultimate eco-friendly material! ✨",
        items: ["Beverage glass bottles", "Soju bottles", "Beer bottles", "Jam jars", "Cosmetic glass bottles", "Glass cups"],
        methods: [
          "🧹 Empty contents completely and rinse with water",
          "🏷️ Remove labels and caps (metal/plastic caps go separately)",
          "🔵 Sorting by color is even better (clear/brown/green)",
          "📦 Wrap broken glass in newspaper or box and mark 'Danger'",
          "♻️ Soju/beer bottles are eligible for bottle deposit refunds"
        ],
        warnings: [
          "Broken glass pieces cannot be recycled - wrap in newspaper for general waste!",
          "Mirrors, light bulbs, LEDs, and ceramics are not glass",
          "Heat-resistant glass (Pyrex) is different from regular glass",
          "Window glass must be processed as bulky waste"
        ],
        tips: [
          "Return soju bottles to stores for ₩100 per bottle refund",
          "Soak in warm water to easily remove labels from glass bottles",
          "Glass can be recycled infinitely without quality degradation",
          "Keep pretty glass bottles and reuse as vases or decorations"
        ]
      }
    },
    {
      id: 4,
      title: "Metal Cans",
      category: "Metal",
      emoji: "🥫",
      icon: "🔩",
      color: "from-orange-400 to-orange-600",
      detail: {
        title: "Metal Can Recycling Guide",
        category: "Beverage cans, Tin cans, Butane gas",
        emoji: "🥫",
        description: "Metal is a precious resource that can be recycled infinitely! 🏭",
        items: ["Beverage cans", "Beer cans", "Tuna cans", "Tin cans", "Butane gas", "Aluminum foil"],
        methods: [
          "🧃 Empty contents completely and rinse with water",
          "🗜️ Flatten cans to reduce volume",
          "🔪 Press tuna can lids into the can (they're sharp)",
          "💨 Puncture butane gas cans to release gas completely",
          "📏 Fold aluminum foil neatly before disposal"
        ],
        warnings: [
          "Unpunctured butane gas cans pose explosion risk!",
          "Paint cans and insecticide cans contain hazardous materials - dispose separately",
          "Heavily oil-stained cans go to general waste",
          "Be careful of sharp can edges"
        ],
        tips: [
          "Recycling 100 aluminum cans saves energy to power a light bulb for 20 hours",
          "Wipe oil from tuna cans with paper towels before recycling",
          "Use a dedicated puncture tool if you're scared to puncture butane cans",
          "If a magnet sticks, it's steel; if not, it's aluminum"
        ]
      }
    },
    {
      id: 5,
      title: "Bulky Waste",
      category: "Bulky Waste",
      emoji: "🛋️",
      icon: "🪑",
      color: "from-red-400 to-red-600",
      detail: {
        title: "Bulky Waste Disposal Guide",
        category: "Furniture, Appliances, Mattresses",
        emoji: "🛋️",
        description: "Prior reservation is required for bulky waste! Follow proper procedures 📞",
        items: ["Sofas", "Beds", "Wardrobes", "Refrigerators", "Washing machines", "TVs", "Air conditioners", "Mattresses"],
        methods: [
          "📱 Make a reservation via local government call center or app",
          "💳 Purchase collection stickers and attach to items",
          "📅 Dispose on designated date and location",
          "♻️ Free collection service available for appliances",
          "🔧 Disassemble if possible to separate recyclable parts"
        ],
        warnings: [
          "Unauthorized disposal without reservation incurs fines",
          "Refrigerators and air conditioners must have coolant removed",
          "Items without stickers will not be collected",
          "Abandonment in apartment complexes is strictly prohibited!"
        ],
        tips: [
          "Free appliance collection: ☎ 1599-0903 (nationwide)",
          "Use Seoul's 'Clean-up' app for easy reservations",
          "Consider selling or donating furniture in good condition",
          "Make reservations early during moving season"
        ],
        additionalInfo: [
          "📞 Seoul bulky waste: 120 or Clean-up app",
          "💻 Online reservations: Local government website 'Waste Disposal' menu",
          "💰 Collection fees: ₩5,000~₩50,000 depending on item and size",
          "🏪 Sticker purchase: Community center, convenience store, bank"
        ]
      }
    },
    {
      id: 6,
      title: "Food Waste",
      category: "Food Waste",
      emoji: "🥬",
      icon: "🍎",
      color: "from-yellow-400 to-yellow-600",
      detail: {
        title: "Food Waste Disposal Guide",
        category: "Food scraps, Fruit peels",
        emoji: "🥬",
        description: "Food waste is recycled into compost and animal feed! Proper disposal is key 🌱",
        items: ["Vegetable peels", "Fruit peels", "Fish bones", "Eggshells", "Rice/soup", "Coffee grounds"],
        methods: [
          "💧 Remove excess moisture (minimum 20% removal required)",
          "🥢 Completely remove foreign objects like toothpicks and plastic",
          "🗑️ Use food waste container or volume-based bag",
          "📦 Apartments use food waste processor, houses dispose on designated days",
          "🧊 Freeze before disposal to reduce odor"
        ],
        warnings: [
          "❌ Animal bones (pork/beef/chicken) → general waste",
          "❌ Clam/conch/abalone/crab/lobster shells → general waste",
          "❌ Onion/garlic/ginger/corn husks → general waste",
          "❌ Walnut/chestnut/peanut shells → general waste",
          "❌ Peach/cherry/mango pits → general waste",
          "❌ Tea bags, herbal medicine residue → general waste"
        ],
        tips: [
          "Moisture removal tip: Place on newspaper for a day to absorb moisture",
          "Odor control: Add coffee grounds to reduce smell",
          "Dispose fruit peels immediately to prevent fruit flies",
          "Reducing food waste by 20% saves about ₩50,000 in annual processing costs!"
        ],
        additionalInfo: [
          "🐖 Recycled as animal feed: Well-drained food waste",
          "🌱 Recycled as compost: Fruit peels, vegetables",
          "⚡ Biogas production: Electricity and gas from food waste",
          "💰 Fees charged by volume - reducing waste is important"
        ]
      }
    }
  ],
  ja: [
    {
      id: 1,
      title: "紙類",
      category: "Paper",
      emoji: "📄",
      icon: "📰",
      color: "from-blue-400 to-blue-600",
      detail: {
        title: "紙類分別ガイド",
        category: "一般紙、新聞、雑誌、段ボール",
        emoji: "📄",
        description: "紙はリサイクル可能な大切な資源です！正しい分別で木を守りましょう 🌳",
        items: ["一般紙", "新聞紙", "雑誌", "段ボール箱", "紙コップ", "紙パック", "本"],
        methods: [
          "📰 きれいな紙のみ分別します",
          "📑 新聞と雑誌は別々に束ねて排出します",
          "📦 段ボールはテープとシールを完全に取り除いて折りたたみます",
          "☕ 紙コップと紙パックは中身を空にして水で洗い、開いて排出します",
          "📚 本はビニールカバーとスプリングを取り除いてから排出します"
        ],
        warnings: [
          "油や食べ物が付いた紙は一般ゴミへ",
          "コーティングされた広告や金箔・銀箔の紙はリサイクルが困難です",
          "濡れた紙や水に溶けた紙はリサイクル不可",
          "ワックスペーパーとサーマルレシートはリサイクルできません"
        ],
        tips: [
          "段ボールの配送ラベルは個人情報保護のため剥がしましょう",
          "紙パックを集めると、多くのスーパーでティッシュと交換できます",
          "新聞紙は冷蔵庫の湿気取りに最適です",
          "色付きの紙もリサイクル可能です - 一般紙と一緒に排出しましょう"
        ]
      }
    },
    {
      id: 2,
      title: "プラスチック",
      category: "Plastic",
      emoji: "♻️",
      icon: "🧴",
      color: "from-green-400 to-green-600",
      detail: {
        title: "プラスチック分別ガイド",
        category: "PETボトル、プラスチック容器、ビニール袋",
        emoji: "♻️",
        description: "プラスチックは分解に数百年かかります！リサイクルで環境を守りましょう 🌊",
        items: ["透明PETボトル", "プラスチック容器", "ビニール袋", "発泡スチロール", "使い捨てカップ", "プラスチックキャップ"],
        methods: [
          "🍾 PETボトルはラベルを完全に剥がし、キャップを分離します",
          "🧼 容器の中をきれいに水で洗います",
          "🗜️ 圧縮して体積を最大限減らします",
          "🎯 透明PETボトルは専用回収ボックスがあれば別途排出します",
          "🛍️ ビニール袋は異物を取り除いて別々に集めて排出します",
          "📦 発泡スチロールはテープとラベルを取り除いてから排出します"
        ],
        warnings: [
          "油や食べ物が付いた容器はリサイクル不可 - 一般ゴミへ！",
          "化粧品やシャンプーの容器は完全に空にして洗う必要があります",
          "PVC素材や熱に弱いプラスチックは分別表示を確認してください",
          "複数の素材が混ざった製品（ポンプなど）は分解して各々排出します"
        ],
        tips: [
          "透明ペットボトルだけ別に集めるとリサイクル率が95%まで上がります！",
          "ラベル除去が難しい場合は温かい水に浸すと簡単に剥がれます",
          "ビニール袋は再利用が最高！エコバッグを必ず持ち歩きましょう",
          "プラスチック番号表示（1~7）を確認すると素材がわかります"
        ]
      }
    },
    {
      id: 3,
      title: "ガラス",
      category: "Glass",
      emoji: "🍶",
      icon: "🍾",
      color: "from-purple-400 to-purple-600",
      detail: {
        title: "ガラス分別ガイド",
        category: "飲料瓶、ガラス瓶、ガラスコップ",
        emoji: "🍶",
        description: "ガラスは100%リサイクル可能な最高のエコ素材です！ ✨",
        items: ["飲料ガラス瓶", "焼酎瓶", "ビール瓶", "ジャム瓶", "化粧品ガラス瓶", "ガラスコップ"],
        methods: [
          "🧹 中身を完全に空にして水できれいに洗います",
          "🏷️ ラベルとキャップを取り除きます（金属/プラスチックキャップは別々に）",
          "🔵 色別に分類するとさらに良いです（透明/茶色/緑）",
          "📦 割れたガラスは新聞紙や箱に包んで「危険」表示をします",
          "♻️ 焼酎瓶・ビール瓶は空き瓶デポジット対象です"
        ],
        warnings: [
          "割れたガラス片はリサイクル不可 - 新聞紙に包んで一般ゴミへ！",
          "鏡、電球、LED、陶器はガラスではありません",
          "耐熱ガラス（パイレックス）は一般ガラスとは異なる素材です",
          "窓ガラスは大型廃棄物として別途処理が必要です"
        ],
        tips: [
          "焼酎瓶はスーパーに返却すると1本100ウォンの払い戻しがあります",
          "ガラス瓶のラベルは温かい水に浸すと簡単に取り除けます",
          "ガラスは何度リサイクルしても品質が落ちない完璧な素材です",
          "きれいなガラス瓶はリサイクルせずに花瓶や小物として活用しましょう"
        ]
      }
    },
    {
      id: 4,
      title: "金属缶",
      category: "Metal",
      emoji: "🥫",
      icon: "🔩",
      color: "from-orange-400 to-orange-600",
      detail: {
        title: "金属缶分別ガイド",
        category: "飲料缶、缶詰、ガスボンベ",
        emoji: "🥫",
        description: "金属は無限にリサイクル可能な貴重な資源です！ 🏭",
        items: ["飲料缶", "ビール缶", "ツナ缶", "缶詰", "ガスボンベ", "アルミホイル"],
        methods: [
          "🧃 中身を完全に空にして水で洗います",
          "🗜️ 缶を平らに潰して体積を減らします",
          "🔪 ツナ缶の蓋は鋭いので缶の中に押し込みます",
          "💨 ガスボンベは穴を開けてガスを完全に抜いて排出します",
          "📏 アルミホイルはきれいに折りたたんで排出します"
        ],
        warnings: [
          "ガスを抜いていないガスボンベは爆発の危険があります！",
          "ペンキ缶、殺虫剤缶は有害物質があるため別途排出が必要です",
          "油が多く付いた缶は一般ゴミとして排出してください",
          "鋭い缶の縁で怪我をしないよう注意してください"
        ],
        tips: [
          "アルミ缶100個をリサイクルすると電球20時間分のエネルギーを節約できます",
          "ツナ缶の油はキッチンペーパーで拭き取るとリサイクルしやすいです",
          "ガスボンベの穴開けが怖い場合は専用穴開け器を使用してください",
          "磁石にくっつけば鉄、くっつかなければアルミニウムです"
        ]
      }
    },
    {
      id: 5,
      title: "大型廃棄物",
      category: "Bulky Waste",
      emoji: "🛋️",
      icon: "🪑",
      color: "from-red-400 to-red-600",
      detail: {
        title: "大型廃棄物排出ガイド",
        category: "家具、家電製品、マットレス",
        emoji: "🛋️",
        description: "大型廃棄物は事前予約が必須！正しい手順で排出しましょう 📞",
        items: ["ソファ", "ベッド", "タンス", "冷蔵庫", "洗濯機", "テレビ", "エアコン", "マットレス"],
        methods: [
          "📱 自治体コールセンターやアプリで事前予約します",
          "💳 回収ステッカーを購入して製品に貼付します",
          "📅 指定された日時と場所に排出します",
          "♻️ 家電製品は無料訪問回収サービスを利用できます",
          "🔧 可能であれば分解してリサイクル可能な部分を分離します"
        ],
        warnings: [
          "予約なしの無断排出は過料が科されます",
          "冷蔵庫・エアコンは必ず冷媒を除去してから排出する必要があります",
          "ステッカーなしで排出しても回収されません",
          "マンション敷地内への無断放置は絶対禁止！"
        ],
        tips: [
          "廃家電無料訪問回収: ☎ 1599-0903（全国共通）",
          "ソウル市「クリーンアップ」アプリで簡単に予約できます",
          "状態の良い家具は中古取引や寄付を先に考えましょう",
          "引っ越しシーズンは大型廃棄物回収予約が混むので早めに申請してください"
        ],
        additionalInfo: [
          "📞 ソウル市大型廃棄物回収予約: 120またはクリーンアップアプリ",
          "💻 オンライン予約: 各自治体ホームページ「廃棄物排出」メニュー",
          "💰 回収費用: 品目とサイズに応じて5,000〜50,000ウォン",
          "🏪 ステッカー購入先: 住民センター、コンビニ、銀行"
        ]
      }
    },
    {
      id: 6,
      title: "生ゴミ",
      category: "Food Waste",
      emoji: "🥬",
      icon: "🍎",
      color: "from-yellow-400 to-yellow-600",
      detail: {
        title: "生ゴミ排出ガイド",
        category: "食べ物くず、果物の皮",
        emoji: "🥬",
        description: "生ゴミは堆肥と飼料にリサイクルされます！正しい排出が重要です 🌱",
        items: ["野菜の皮", "果物の皮", "魚の骨", "卵の殻", "ご飯・汁物", "コーヒーかす"],
        methods: [
          "💧 水気を最大限取り除きます（20%以上の除去必須）",
          "🥢 爪楊枝、ビニールなどの異物を完全に除去します",
          "🗑️ 生ゴミ専用回収容器または従量制袋に入れます",
          "📦 マンションは生ゴミ処理機、一戸建ては指定日に排出します",
          "🧊 冷凍庫に保管してから排出すると悪臭が減ります"
        ],
        warnings: [
          "❌ 動物の骨（豚・牛・鶏骨）→ 一般ゴミ",
          "❌ 貝・巻貝・アワビ・カニ・ザリガニの殻 → 一般ゴミ",
          "❌ 玉ねぎ・にんにく・生姜・とうもろこしの皮 → 一般ゴミ",
          "❌ クルミ・栗・ピーナッツの殻 → 一般ゴミ",
          "❌ 桃・さくらんぼ・マンゴーの種 → 一般ゴミ",
          "❌ ティーバッグ、漢方薬かす → 一般ゴミ"
        ],
        tips: [
          "水分除去のコツ: 新聞紙を敷いて一日ほど置くと水分が吸収されます",
          "臭い除去: コーヒーかすを一緒に入れると悪臭が減ります",
          "果物の皮は長く置くとショウジョウバエが発生するのですぐ排出しましょう",
          "生ゴミを20%減らすと年間約5万ウォンの処理費用が節約できます！"
        ],
        additionalInfo: [
          "🐖 動物飼料にリサイクル: 水分除去がよくできた生ゴミ",
          "🌱 堆肥にリサイクル: 果物の皮、野菜など",
          "⚡ バイオガス生産: 生ゴミから電気とガスを生産",
          "💰 排出量に応じて料金が課されるので減らすことが重要です"
        ]
      }
    }
  ]
};

export function TipsPage({ language, onBack }: TipsPageProps) {
  const [selectedTip, setSelectedTip] = useState<TipDetail | null>(null);
  const t = translations[language];
  const tips = tipsData[language];

  if (selectedTip) {
    return (
      <div className="flex-1 flex flex-col bg-background">
        {/* Header */}
        <div className={`bg-gradient-to-r ${tips.find(tip => tip.detail.title === selectedTip.title)?.color} text-white px-4 py-5 flex items-center gap-4 shadow-lg`}>
          <button
            onClick={() => setSelectedTip(null)}
            className="p-2.5 hover:bg-white/20 rounded-2xl transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <p className="text-sm opacity-90 mb-1">{t.backToList}</p>
            <h1 className="text-xl font-bold drop-shadow-md">{selectedTip.title}</h1>
          </div>
          <span className="text-4xl">{selectedTip.emoji}</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-2xl mx-auto p-6">
            {/* Category Badge */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-6 mb-6 border-2 border-primary/20">
              <p className="text-sm font-medium text-muted-foreground mb-2">{language === "ko" ? "분류 대상" : language === "en" ? "Category" : "分類対象"}</p>
              <p className="text-lg font-bold text-foreground">{selectedTip.category}</p>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 mb-6 border-2 border-green-200">
              <p className="text-base leading-relaxed font-medium text-gray-800">{selectedTip.description}</p>
            </div>

            {/* Items */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                {language === "ko" ? "포함 품목" : language === "en" ? "Included Items" : "含まれる品目"}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedTip.items.map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
                    <p className="text-sm font-medium text-gray-700">✓ {item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Methods */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-primary/20 p-6 mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Recycle className="w-6 h-6 text-primary" />
                {t.howToDispose}
              </h3>
              <div className="space-y-3">
                {selectedTip.methods.map((method, index) => (
                  <div key={index} className="flex gap-4 items-start bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-4 border border-primary/10">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                      {index + 1}
                    </div>
                    <p className="flex-1 font-medium text-gray-700 leading-relaxed">{method}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border-2 border-red-200 p-6 mb-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-700">
                ⚠️ {t.importantNotes}
              </h3>
              <div className="space-y-3">
                {selectedTip.warnings.map((warning, index) => (
                  <div key={index} className="flex gap-3 items-start bg-white rounded-2xl p-4 border-2 border-red-100">
                    <span className="text-2xl flex-shrink-0">🚨</span>
                    <p className="flex-1 font-medium text-gray-700 leading-relaxed">{warning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl border-2 border-amber-200 p-6 mb-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-800">
                🌟 {t.proTips}
              </h3>
              <div className="space-y-3">
                {selectedTip.tips.map((tip, index) => (
                  <div key={index} className="flex gap-3 items-start bg-white rounded-2xl p-4 border-2 border-amber-100">
                    <span className="text-2xl flex-shrink-0">💡</span>
                    <p className="flex-1 font-medium text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            {selectedTip.additionalInfo && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 p-6 mb-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-700">
                  📌 {t.additionalInfo}
                </h3>
                <div className="space-y-3">
                  {selectedTip.additionalInfo.map((info, index) => (
                    <div key={index} className="flex gap-3 items-start bg-white rounded-2xl p-4 border-2 border-blue-100">
                      <span className="text-xl flex-shrink-0">ℹ️</span>
                      <p className="flex-1 font-medium text-gray-700 leading-relaxed">{info}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
        <div className="flex-1">
          <h1 className="text-2xl font-bold drop-shadow-md">{t.title}</h1>
          <p className="text-sm opacity-90 mt-1">{t.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <button
                key={tip.id}
                onClick={() => setSelectedTip(tip.detail)}
                className="group relative bg-white rounded-3xl shadow-lg border-2 border-gray-200 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tip.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tip.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="text-3xl">{tip.emoji}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-foreground mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{t.tapToView}</span>
                    <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
