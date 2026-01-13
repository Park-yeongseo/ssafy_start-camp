import { ArrowLeft, Bell, Calendar, User, Eye } from "lucide-react";
import { useState } from "react";

type Language = "ko" | "en" | "ja";

interface NoticePageProps {
  language: Language;
  onBack: () => void;
}

interface Notice {
  id: number;
  title: string;
  date: string;
  author: string;
  views: number;
  category: string;
  content: string;
  fullContent?: string;
}

const translations = {
  ko: {
    title: "공지사항",
    noNotices: "등록된 공지사항이 없습니다",
    author: "작성자",
    views: "조회",
    backToList: "목록으로",
    general: "일반",
    regional: "지역별 가이드"
  },
  en: {
    title: "Notice",
    noNotices: "No notices available",
    author: "Author",
    views: "Views",
    backToList: "Back to List",
    general: "General",
    regional: "Regional Guide"
  },
  ja: {
    title: "お知らせ",
    noNotices: "お知らせはありません",
    author: "作成者",
    views: "閲覧",
    backToList: "一覧に戻る",
    general: "一般",
    regional: "地域別ガイド"
  }
};

const notices = {
  ko: [
    {
      id: 1,
      title: "🎉 배출의 민족 서비스 오픈!",
      date: "2026-01-12",
      author: "배추리",
      views: 1247,
      category: "일반",
      content: "분리배출을 쉽고 편리하게! 배출의 민족 서비스가 정식 오픈했습니다.",
      fullContent: `안녕하세요, 배추리입니다! 🌱

드디어 '배출의 민족' 서비스가 정식 오픈했습니다! 🎊

🔍 주요 기능
• AI 기반 쓰레기 자동 인식
• 실시간 분리배출 가이드
• 지역별 맞춤형 배출 정보
• 다국어 지원 (한국어, 영어, 일본어)

💚 왜 배출의 민족인가요?
매일 쏟아지는 쓰레기, 어떻게 버려야 할지 고민되셨죠?
페트병의 라벨은 떼야 하는지, 비닐은 어떻게 분리해야 하는지...
이제 사진만 찍으면 AI가 알아서 알려드립니다!

🌍 지구를 지키는 작은 실천
올바른 분리배출은 환경을 지키는 첫걸음입니다.
배출의 민족과 함께 지속 가능한 미래를 만들어가요!

📱 지금 바로 사용해보세요!
카메라로 쓰레기를 찍으면 바로 분리배출 방법을 확인할 수 있습니다.

감사합니다! 💚`
    },
    {
      id: 2,
      title: "📍 송파구 분리배출 완벽 가이드",
      date: "2026-01-11",
      author: "배추리",
      views: 892,
      category: "지역별 가이드",
      content: "송파구 주민 여러분을 위한 맞춤형 분리배출 가이드입니다.",
      fullContent: `송파구 분리배출 완벽 가이드 📦

안녕하세요, 송파구 주민 여러분! 배추리입니다.

🗓️ 송파구 배출 요일
• 일반쓰레기: 일요일 제외 매일
• 재활용: 화, 목요일
• 음식물: 매일 (일요일 오전만 가능)
• 대형폐기물: 사전 신고 후 배출

♻️ 송파구 특별 규정
1. 투명 페트병 별도 분리 의무화
   - 라벨 제거 필수
   - 전용 수거함 이용

2. 비닐류 배출 시간
   - 저녁 8시 ~ 자정까지
   - 아파트는 별도 규정 확인

3. 스티로폼 배출
   - 과일 받침대 제거
   - 테이프, 스티커 제거
   - 깨끗이 세척 후 배출

📍 송파구 재활용센터
• 위치: 송파구 오금동 123-45
• 운영시간: 평일 09:00-18:00
• 문의: 02-2147-XXXX

🌟 송파구만의 특별 서비스
• 재활용품 수거 앱 운영
• 노약자 대상 방문 수거 서비스
• 우수 배출 가구 인센티브 제공

깨끗한 송파구를 위해 함께해요! 💚`
    },
    {
      id: 3,
      title: "📍 광진구 분리배출 완벽 가이드",
      date: "2026-01-10",
      author: "배추리",
      views: 756,
      category: "지역별 가이드",
      content: "광진구 주민 여러분을 위한 맞춤형 분리배출 가이드입니다.",
      fullContent: `광진구 분리배출 완벽 가이드 🌿

안녕하세요, 광진구 주민 여러분! 배추리입니다.

🗓️ 광진구 배출 요일
• 일반쓰레기: 매일 (20:00~24:00)
• 재활용: 월, 수, 금요일
• 음식물: 매일 배출 가능
• 대형폐기물: 인터넷 신고 후 스티커 부착

♻️ 광진구 특별 규정
1. 재활용품 배출 시간 엄수
   - 배출 당일 오후 6시~자정
   - 시간 외 배출 시 과태료 부과

2. 음식물쓰레기 전용봉투 사용
   - 20L: 2,400원
   - 지정 판매점에서 구매
   - RFID 종량기 사용 가능

3. 의류 수거함 운영
   - 아파트 단지별 설치
   - 깨끗한 의류만 배출
   - 젖은 의류 배출 금지

📍 광진구 재활용센터
• 위치: 광진구 구의동 234-56
• 운영시간: 평일 09:00-18:00
• 토요일: 09:00-13:00
• 문의: 02-2147-YYYY

🌟 광진구 친환경 정책
• 나눔장터 정기 개최 (매월 둘째주 토요일)
• 폐가전 무료 수거 서비스
• 생활폐기물 줄이기 캠페인

함께 만드는 깨끗한 광진구! 💚`
    },
    {
      id: 4,
      title: "📍 금천구 분리배출 완벽 가이드",
      date: "2026-01-09",
      author: "배추리",
      views: 634,
      category: "지역별 가이드",
      content: "금천구 주민 여러분을 위한 맞춤형 분리배출 가이드입니다.",
      fullContent: `금천구 분리배출 완벽 가이드 🌱

안녕하세요, 금천구 주민 여러분! 배추리입니다.

🗓️ 금천구 배출 요일
• 일반쓰레기: 일, 화, 목, 토요일
• 재활용: 월, 수, 금요일
• 음식물: 매일 가능
• 대형폐기물: 전화/인터넷 신고 필수

♻️ 금천구 특별 규정
1. 비닐 분리배출 강화
   - 깨끗한 비닐만 배출
   - 오염된 비닐은 일반쓰레기
   - 에어캡은 비닐류로 분류

2. 종이류 배출 방법
   - 상자는 펼쳐서 배출
   - 택배 송장, 테이프 제거
   - 비닐코팅 종이는 일반쓰레기

3. 유리병 배출 주의사항
   - 소주병, 맥주병은 색상별 분리
   - 내용물 비우고 헹굼
   - 뚜껑은 금속류로 분리

📍 금천구 재활용센터
• 본관: 금천구 시흥동 345-67
• 분관: 금천구 독산동 456-78
• 운영시간: 평일 09:00-18:00
• 문의: 02-2147-ZZZZ

🌟 금천구 환경 프로그램
• 자원순환 교육 프로그램 운영
• 어린이 환경학교 (매월 셋째주)
• 재활용품 아트 공모전
• 우수배출 아파트 시상

깨끗한 금천구 만들기에 동참해주세요! 💚`
    },
    {
      id: 5,
      title: "📍 강남구 분리배출 완벽 가이드",
      date: "2026-01-08",
      author: "배추리",
      views: 1523,
      category: "지역별 가이드",
      content: "강남구 주민 여러분을 위한 맞춤형 분리배출 가이드입니다.",
      fullContent: `강남구 분리배출 완벽 가이드 ✨

안녕하세요, 강남구 주민 여러분! 배추리입니다.

🗓️ 강남구 배출 요일
• 일반쓰레기: 일요일 제외 매일
• 재활용: 월, 수, 금요일 (19:00~24:00)
• 음식물: 매일 (RFID 시스템)
• 대형폐기물: 모바일 앱 신고

♻️ 강남구 특별 규정
1. 스마트 분리배출 시스템
   - RFID 음식물 종량기 전면 시행
   - 재활용품 AI 인식 시스템 도입
   - 모바일 앱으로 배출 이력 확인

2. 1회용품 분리배출
   - 플라스틱 컵: 빨대, 뚜껑 분리
   - 종이컵: 이물질 제거 후 배출
   - 일회용 도시락: 플라스틱/종이 분리

3. 고급 재활용품 별도 수거
   - 명품 포장재: 별도 수거함
   - 고가 전자기기: 전문 업체 수거
   - 귀금속 포장: 재활용센터 직접 배출

📍 강남구 재활용센터
• 본관: 강남구 삼성동 567-89
• 역삼센터: 강남구 역삼동 678-90
• 논현센터: 강남구 논현동 789-01
• 운영시간: 평일 09:00-19:00, 토 09:00-14:00
• 문의: 02-2147-AAAA

🌟 강남구 프리미엄 서비스
• 프리미엄 가전제품 방문 수거
• VIP 대형폐기물 당일 처리
• 친환경 포인트 적립 (재활용품 배출 시)
• 포인트로 친환경 제품 구매 가능

🏆 강남구 환경 우수 정책
• 전국 최초 AI 분리배출 시스템
• 제로 웨이스트 샵 운영
• 친환경 마일리지 제도
• 분기별 우수 배출자 시상

격조 높은 강남, 환경도 프리미엄으로! 💚✨`
    },
    {
      id: 6,
      title: "🌐 새로운 언어 지원 추가 예정",
      date: "2026-01-07",
      author: "배추리",
      views: 445,
      category: "일반",
      content: "곧 중국어, 베트남어 등 다양한 언어를 지원할 예정입니다.",
      fullContent: `새로운 언어 지원 소식 🌐

안녕하세요, 배추리입니다!

배출의 민족이 더 많은 분들을 위해 언어 지원을 확대합니다!

📢 추가 예정 언어
• 🇨🇳 중국어 (간체, 번체)
• 🇻🇳 베트남어
• 🇹🇭 태국어
• 🇮🇩 인도네시아어
• 🇷🇺 러시아어

📅 업데이트 일정
• 1차: 2026년 2월 중국어 지원
• 2차: 2026년 3월 베트남어, 태국어
• 3차: 2026년 4월 인도네시아어, 러시아어

💡 왜 다국어 지원인가요?
한국에 거주하는 외국인 분들도 쉽게 분리배출을 배우고
올바르게 실천할 수 있도록 돕기 위함입니다.

🌏 글로벌 환경 보호
언어의 장벽 없이 모두가 함께 지구를 지킬 수 있도록
배출의 민족이 앞장서겠습니다!

많은 기대 부탁드립니다! 💚`
    },
    {
      id: 7,
      title: "📊 2026년 새해 분리배출 변경 사항",
      date: "2026-01-05",
      author: "배추리",
      views: 1089,
      category: "일반",
      content: "2026년부터 달라지는 분리배출 규정을 확인하세요.",
      fullContent: `2026년 새해 분리배출 변경 사항 📊

새해 복 많이 받으세요! 배추리입니다.

2026년부터 달라지는 분리배출 규정을 안내드립니다.

📌 주요 변경 사항

1. 투명 페트병 분리배출 전국 의무화
   • 기존: 일부 지역만 시행
   • 변경: 전국 모든 지역 의무화
   • 라벨 제거 + 압축 후 전용 수거함 배출

2. 종이팩 별도 분리 강화
   • 우유팩, 두유팩 등 종이팩 별도 수거
   • 일반 종이류와 분리 배출
   • 씻어서 펼쳐 말린 후 배출

3. 비닐 배출 기준 강화
   • 깨끗한 비닐만 재활용
   • 음식물이 묻은 비닐은 일반쓰레기
   • 에어캡(뽁뽁이)도 비닐류로 분류

4. 플라스틱 재질 표시 의무화
   • PP, PE, PET 등 재질 표시 확인
   • 재질별로 분리 배출
   • 복합재질은 일반쓰레기

5. 전자제품 무상 방문 수거 확대
   • 대형 가전제품 무료 수거
   • 소형 가전도 5개 이상 무료 수거
   • 사전 예약제 운영

⚠️ 과태료 안내
• 분리배출 미이행: 10만원
• 무단 투기: 100만원
• 불법 소각: 300만원

💚 올바른 분리배출로
아름다운 2026년을 만들어가요!

문의사항은 각 지역 구청으로 연락주세요.`
    }
  ],
  en: [
    {
      id: 1,
      title: "🎉 Disposal Nation Service Launch!",
      date: "2026-01-12",
      author: "Baechuri",
      views: 1247,
      category: "General",
      content: "Make waste disposal easy and convenient! Disposal Nation service is now officially open.",
      fullContent: `Hello, this is Baechuri! 🌱

Disposal Nation service is now officially open! 🎊

🔍 Key Features
• AI-based automatic waste recognition
• Real-time disposal guide
• Region-specific disposal information
• Multi-language support (Korean, English, Japanese)

💚 Why Disposal Nation?
Have you ever wondered how to dispose of daily waste?
Whether to remove PET bottle labels or how to separate vinyl...
Now just take a photo and AI will tell you everything!

🌍 Small Actions to Save Earth
Proper waste separation is the first step to protect the environment.
Let's create a sustainable future together with Disposal Nation!

📱 Try it now!
Take a photo of waste and get disposal instructions immediately.

Thank you! 💚`
    },
    {
      id: 2,
      title: "📍 Songpa-gu Complete Disposal Guide",
      date: "2026-01-11",
      author: "Baechuri",
      views: 892,
      category: "Regional Guide",
      content: "Customized disposal guide for Songpa-gu residents.",
      fullContent: `Songpa-gu Complete Disposal Guide 📦

Hello Songpa-gu residents! This is Baechuri.

🗓️ Songpa-gu Disposal Days
• General waste: Daily except Sunday
• Recyclables: Tuesday, Thursday
• Food waste: Daily (Sunday morning only)
• Large waste: Report before disposal

♻️ Songpa-gu Special Rules
1. Mandatory separate collection of transparent PET bottles
2. Vinyl disposal time: 8 PM - Midnight
3. Styrofoam disposal: Remove fruit trays and tape

📍 Songpa-gu Recycling Center
• Location: 123-45 Ogeum-dong, Songpa-gu
• Hours: Weekdays 09:00-18:00
• Contact: 02-2147-XXXX

Let's keep Songpa-gu clean together! 💚`
    },
    {
      id: 3,
      title: "📍 Gwangjin-gu Complete Disposal Guide",
      date: "2026-01-10",
      author: "Baechuri",
      views: 756,
      category: "Regional Guide",
      content: "Customized disposal guide for Gwangjin-gu residents.",
      fullContent: `Gwangjin-gu Complete Disposal Guide 🌿

Hello Gwangjin-gu residents! This is Baechuri.

🗓️ Gwangjin-gu Disposal Days
• General waste: Daily (20:00-24:00)
• Recyclables: Monday, Wednesday, Friday
• Food waste: Daily disposal available
• Large waste: Online report with sticker

♻️ Gwangjin-gu Special Rules
1. Strict disposal time enforcement
2. Food waste designated bags required
3. Clothing collection bins operated

Let's create a clean Gwangjin-gu together! 💚`
    },
    {
      id: 4,
      title: "📍 Geumcheon-gu Complete Disposal Guide",
      date: "2026-01-09",
      author: "Baechuri",
      views: 634,
      category: "Regional Guide",
      content: "Customized disposal guide for Geumcheon-gu residents.",
      fullContent: `Geumcheon-gu Complete Disposal Guide 🌱

Hello Geumcheon-gu residents! This is Baechuri.

🗓️ Geumcheon-gu Disposal Days
• General waste: Sun, Tue, Thu, Sat
• Recyclables: Mon, Wed, Fri
• Food waste: Daily
• Large waste: Phone/online report required

Please join us in keeping Geumcheon-gu clean! 💚`
    },
    {
      id: 5,
      title: "📍 Gangnam-gu Complete Disposal Guide",
      date: "2026-01-08",
      author: "Baechuri",
      views: 1523,
      category: "Regional Guide",
      content: "Customized disposal guide for Gangnam-gu residents.",
      fullContent: `Gangnam-gu Complete Disposal Guide ✨

Hello Gangnam-gu residents! This is Baechuri.

🗓️ Gangnam-gu Disposal Days
• General waste: Daily except Sunday
• Recyclables: Mon, Wed, Fri (19:00-24:00)
• Food waste: Daily (RFID system)
• Large waste: Mobile app report

Premium Gangnam, Premium Environment! 💚✨`
    },
    {
      id: 6,
      title: "🌐 New Language Support Coming Soon",
      date: "2026-01-07",
      author: "Baechuri",
      views: 445,
      category: "General",
      content: "We will soon support various languages including Chinese and Vietnamese.",
      fullContent: `New Language Support Announcement 🌐

Hello, this is Baechuri!

Disposal Nation will expand language support!

📢 Languages to be Added
• 🇨🇳 Chinese (Simplified, Traditional)
• 🇻🇳 Vietnamese
• 🇹🇭 Thai
• 🇮🇩 Indonesian
• 🇷🇺 Russian

Stay tuned! 💚`
    },
    {
      id: 7,
      title: "📊 2026 New Year Disposal Changes",
      date: "2026-01-05",
      author: "Baechuri",
      views: 1089,
      category: "General",
      content: "Check out the new disposal regulations for 2026.",
      fullContent: `2026 New Year Disposal Changes 📊

Happy New Year! This is Baechuri.

Here are the disposal regulation changes for 2026.

📌 Major Changes

1. Nationwide mandatory PET bottle separation
2. Enhanced paper pack separation
3. Stricter vinyl disposal standards
4. Mandatory plastic material labeling
5. Expanded free electronics pickup

💚 Let's make 2026 beautiful with proper waste separation!`
    }
  ],
  ja: [
    {
      id: 1,
      title: "🎉 排出の民族サービスオープン！",
      date: "2026-01-12",
      author: "ベチュリ",
      views: 1247,
      category: "一般",
      content: "ゴミ出しを簡単便利に！排出の民族サービスが正式オープンしました。",
      fullContent: `こんにちは、ベチュリです！🌱

排出の民族サービスが正式オープンしました！🎊

🔍 主な機能
• AIベースの自動ゴミ認識
• リアルタイム分別ガイド
• 地域別カスタム分別情報
• 多言語サポート（韓国語、英語、日本語）

💚 なぜ排出の民族？
毎日出るゴミ、どう捨てればいいか悩んだことありませんか？
ペットボトルのラベルは剥がすべきか、ビニールはどう分別するか...
今は写真を撮るだけでAIが全部教えてくれます！

🌍 地球を守る小さな実践
正しい分別は環境を守る第一歩です。
排出の民族と一緒に持続可能な未来を作りましょう！

📱 今すぐ使ってみてください！
ゴミの写真を撮るとすぐに分別方法が確認できます。

ありがとうございます！💚`
    },
    {
      id: 2,
      title: "📍 松坡区完全分別ガイド",
      date: "2026-01-11",
      author: "ベチュリ",
      views: 892,
      category: "地域別ガイド",
      content: "松坡区住民のためのカスタム分別ガイドです。",
      fullContent: `松坡区完全分別ガイド 📦

こんにちは、松坡区住民の皆さん！ベチュリです。

🗓️ 松坡区排出曜日
• 一般ゴミ: 日曜日以外毎日
• リサイクル: 火、木曜日
• 生ゴミ: 毎日（日曜午前のみ）
• 大型廃棄物: 事前申告後排出

きれいな松坡区のために一緒に頑張りましょう！💚`
    },
    {
      id: 3,
      title: "📍 広津区完全分別ガイド",
      date: "2026-01-10",
      author: "ベチュリ",
      views: 756,
      category: "地域別ガイド",
      content: "広津区住民のためのカスタム分別ガイドです。",
      fullContent: `広津区完全分別ガイド 🌿

こんにちは、広津区住民の皆さん！ベチュリです。

きれいな広津区を一緒に作りましょう！💚`
    },
    {
      id: 4,
      title: "📍 衿川区完全分別ガイド",
      date: "2026-01-09",
      author: "ベチュリ",
      views: 634,
      category: "地域別ガイド",
      content: "衿川区住民のためのカスタム分別ガイドです。",
      fullContent: `衿川区完全分別ガイド 🌱

こんにちは、衿川区住民の皆さん！ベチュリです。

きれいな衿川区作りに参加してください！💚`
    },
    {
      id: 5,
      title: "📍 江南区完全分別ガイド",
      date: "2026-01-08",
      author: "ベチュリ",
      views: 1523,
      category: "地域別ガイド",
      content: "江南区住民のためのカスタム分別ガイドです。",
      fullContent: `江南区完全分別ガイド ✨

こんにちは、江南区住民の皆さん！ベチュリです。

格調高い江南、環境もプレミアムに！💚✨`
    },
    {
      id: 6,
      title: "🌐 新しい言語サポート追加予定",
      date: "2026-01-07",
      author: "ベチュリ",
      views: 445,
      category: "一般",
      content: "まもなく中国語、ベトナム語など様々な言語をサポートする予定です。",
      fullContent: `新しい言語サポートのお知らせ 🌐

こんにちは、ベチュリです！

期待してください！💚`
    },
    {
      id: 7,
      title: "📊 2026年新年分別変更事項",
      date: "2026-01-05",
      author: "ベチュリ",
      views: 1089,
      category: "一般",
      content: "2026年から変わる分別規定を確認してください。",
      fullContent: `2026年新年分別変更事項 📊

新年明けましておめでとうございます！ベチュリです。

💚 正しい分別で美しい2026年を作りましょう！`
    }
  ]
};

export function NoticePage({ language, onBack }: NoticePageProps) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const t = translations[language];
  const noticeList = notices[language];

  if (selectedNotice) {
    return (
      <div className="flex-1 flex flex-col bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-4 py-4 flex items-center gap-4 shadow-md">
          <button
            onClick={() => setSelectedNotice(null)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t.backToList}</h1>
        </div>

        {/* Post Detail */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                selectedNotice.category.includes('가이드') || selectedNotice.category.includes('Guide') || selectedNotice.category.includes('ガイド')
                  ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
                  : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800'
              }`}>
                {selectedNotice.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 leading-tight">{selectedNotice.title}</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b-2 border-gray-200">
              <div className="flex items-center gap-3">
                {selectedNotice.author === "배추리" || selectedNotice.author === "Baechuri" || selectedNotice.author === "ベチュリ" ? (
                  <img
                    src="bachuri.png"
                    alt="배추리"
                    className="w-12 h-12 rounded-full border-2 border-primary shadow-md object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
                <span className="font-bold text-primary text-lg">{selectedNotice.author}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5" />
                <span>{selectedNotice.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-5 h-5" />
                <span>{selectedNotice.views.toLocaleString()}</span>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-primary/10 p-8 mb-6">
              <div className="prose prose-lg max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-gray-800">
                  {selectedNotice.fullContent || selectedNotice.content}
                </pre>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setSelectedNotice(null)}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl hover:shadow-xl transition-all font-bold text-lg"
            >
              ← {t.backToList}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-4 py-4 flex items-center gap-4 shadow-md">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">{t.title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-3xl mx-auto space-y-4">
          {noticeList.map((notice) => (
            <button
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="w-full bg-white rounded-2xl shadow-md border-2 border-primary/10 p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl flex-shrink-0 ${
                  notice.category.includes('가이드') || notice.category.includes('Guide') || notice.category.includes('ガイド')
                    ? 'bg-gradient-to-br from-blue-400 to-cyan-500'
                    : 'bg-gradient-to-br from-primary to-secondary'
                }`}>
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      notice.category.includes('가이드') || notice.category.includes('Guide') || notice.category.includes('ガイド')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {notice.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">{notice.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{notice.content}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="font-medium text-primary">{notice.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{notice.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{notice.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
