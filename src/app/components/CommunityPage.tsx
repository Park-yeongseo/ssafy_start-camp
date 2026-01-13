import { useState } from "react";
import { ArrowLeft, Send, User, Search, Plus, Users, MessageCircle, Languages } from "lucide-react";

type Language = "ko" | "en" | "ja";

interface CommunityPageProps {
  language: Language;
  onBack: () => void;
}

interface ChatRoom {
  id: number;
  name: string;
  description: string;
  members: number;
  lastMessage: string;
  lastTime: string;
  emoji: string;
}

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  isOwn: boolean;
  originalLang?: "ko" | "en" | "ja";
  translations?: {
    ko: string;
    en: string;
    ja: string;
  };
}

const translations = {
  ko: {
    title: "커뮤니티",
    searchPlaceholder: "채팅방 검색...",
    createRoom: "채팅방 만들기",
    roomList: "오픈 채팅방 목록",
    members: "명",
    join: "참여하기",
    back: "목록으로",
    messagePlaceholder: "메시지를 입력하세요...",
    send: "전송",
    roomName: "채팅방 이름",
    roomDesc: "채팅방 설명",
    create: "만들기",
    cancel: "취소",
    translate: "번역",
    translated: "[번역됨]"
  },
  en: {
    title: "Community",
    searchPlaceholder: "Search chat rooms...",
    createRoom: "Create Room",
    roomList: "Open Chat Rooms",
    members: "members",
    join: "Join",
    back: "Back to List",
    messagePlaceholder: "Type a message...",
    send: "Send",
    roomName: "Room Name",
    roomDesc: "Room Description",
    create: "Create",
    cancel: "Cancel",
    translate: "Translate",
    translated: "[Translated]"
  },
  ja: {
    title: "コミュニティ",
    searchPlaceholder: "チャットルーム検索...",
    createRoom: "ルーム作成",
    roomList: "オープンチャットルーム",
    members: "人",
    join: "参加",
    back: "一覧に戻る",
    messagePlaceholder: "メッセージを入力...",
    send: "送信",
    roomName: "ルーム名",
    roomDesc: "ルーム説明",
    create: "作成",
    cancel: "キャンセル",
    translate: "翻訳",
    translated: "[翻訳済み]"
  }
};

const initialRooms: ChatRoom[] = [
  {
    id: 1,
    name: "초보자 분리수거 Q&A",
    description: "분리수거가 처음이신 분들을 위한 질문방",
    members: 127,
    lastMessage: "페트병 라벨은 어떻게 제거하나요?",
    lastTime: "2분 전",
    emoji: "🌱"
  },
  {
    id: 2,
    name: "외국인 분리수거 커뮤니티",
    description: "Foreigners helping each other with recycling",
    members: 89,
    lastMessage: "Thank you for the help!",
    lastTime: "10분 전",
    emoji: "🌏"
  },
  {
    id: 3,
    name: "강남구 분리수거 정보",
    description: "강남구 주민들의 분리수거 정보 공유",
    members: 234,
    lastMessage: "이번주 재활용 수거일이 언제죠?",
    lastTime: "30분 전",
    emoji: "🏘️"
  },
  {
    id: 4,
    name: "제로웨이스트 실천",
    description: "환경을 생각하는 제로웨이스트 실천 모임",
    members: 156,
    lastMessage: "오늘도 텀블러 챙겼어요!",
    lastTime: "1시간 전",
    emoji: "♻️"
  },
  {
    id: 5,
    name: "재활용 꿀팁 공유방",
    description: "재활용 관련 꿀팁과 정보를 나눠요",
    members: 312,
    lastMessage: "우유팩은 종이류로 버리면 안돼요",
    lastTime: "2시간 전",
    emoji: "💡"
  }
];

const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      user: "김지민",
      text: "안녕하세요! 분리수거 처음 해보는데 너무 유용하네요",
      time: "10:23",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 2,
      user: "John",
      text: "This app is amazing! Very helpful for foreigners",
      time: "10:25",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "이 앱 정말 대단해요! 외국인들에게 너무 유용해요",
        en: "This app is amazing! Very helpful for foreigners",
        ja: "このアプリは素晴らしい！外国人にとても役立ちます"
      }
    },
    {
      id: 3,
      user: "박서준",
      text: "페트병 라벨 제거하는 거 몰랐는데 덕분에 알게 됐어요!",
      time: "10:30",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 4,
      user: "Sara",
      text: "Can someone explain how to separate plastic bags?",
      time: "10:35",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "비닐봉지를 어떻게 분리하는지 설명해주실 수 있나요?",
        en: "Can someone explain how to separate plastic bags?",
        ja: "ビニール袋の分別方法を教えていただけますか？"
      }
    },
    {
      id: 5,
      user: "이수진",
      text: "비닐은 깨끗하게 씻어서 말린 다음 투명 비닐봉투에 넣어서 배출하면 됩니다!",
      time: "10:37",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 6,
      user: "Sara",
      text: "Thank you so much! That's very clear 😊",
      time: "10:38",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "정말 감사합니다! 너무 명확해요 😊",
        en: "Thank you so much! That's very clear 😊",
        ja: "本当にありがとうございます！とても分かりやすいです 😊"
      }
    },
    {
      id: 7,
      user: "최민호",
      text: "저도 궁금한 게 있는데, 스티로폼은 어떻게 버려야 하나요?",
      time: "10:42",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 8,
      user: "田中さくら",
      text: "スチロールは綺麗に洗って乾かしてから出してください",
      time: "10:44",
      isOwn: false,
      originalLang: "ja",
      translations: {
        ko: "스티로폼은 깨끗이 씻어서 말린 후 배출해주세요",
        en: "Please wash and dry the styrofoam before disposal",
        ja: "スチロールは綺麗に洗って乾かしてから出してください"
      }
    }
  ],
  2: [
    {
      id: 1,
      user: "Michael",
      text: "Hello everyone! I'm new to Korea and confused about recycling",
      time: "09:15",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "안녕하세요 여러분! 한국에 처음 와서 재활용이 헷갈려요",
        en: "Hello everyone! I'm new to Korea and confused about recycling",
        ja: "皆さんこんにちは！韓国に来たばかりでリサイクルが分かりません"
      }
    },
    {
      id: 2,
      user: "Emma",
      text: "Don't worry! This community is here to help. What do you need?",
      time: "09:17",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "걱정 마세요! 이 커뮤니티가 도와드릴게요. 무엇이 필요하신가요?",
        en: "Don't worry! This community is here to help. What do you need?",
        ja: "心配しないで！このコミュニティが助けます。何が必要ですか？"
      }
    },
    {
      id: 3,
      user: "Michael",
      text: "I have pizza boxes and soda bottles. How should I dispose them?",
      time: "09:20",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "피자 박스와 소다 병이 있어요. 어떻게 버려야 하나요?",
        en: "I have pizza boxes and soda bottles. How should I dispose them?",
        ja: "ピザの箱とソーダのボトルがあります。どう処分すればいいですか？"
      }
    },
    {
      id: 4,
      user: "김민지",
      text: "피자박스는 기름기 없으면 종이류, 있으면 일반쓰레기예요. 페트병은 라벨 제거하고 압축해서 배출하세요!",
      time: "09:22",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 5,
      user: "田中健",
      text: "ペットボトルのキャップも分けて捨ててくださいね",
      time: "09:25",
      isOwn: false,
      originalLang: "ja",
      translations: {
        ko: "페트병 뚜껑도 따로 분리해서 버려주세요",
        en: "Please also separate the plastic bottle caps",
        ja: "ペットボトルのキャップも分けて捨ててくださいね"
      }
    },
    {
      id: 6,
      user: "Michael",
      text: "Wow, this is very detailed! Thank you everyone! 🙏",
      time: "09:27",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "와, 정말 자세하네요! 모두 감사합니다! 🙏",
        en: "Wow, this is very detailed! Thank you everyone! 🙏",
        ja: "すごく詳しいですね！皆さんありがとうございます！🙏"
      }
    }
  ],
  3: [
    {
      id: 1,
      user: "강남주민A",
      text: "이번주 수요일 재활용 수거 맞죠?",
      time: "14:20",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 2,
      user: "이지은",
      text: "네 맞아요! 수요일 저녁 7시~자정 사이 배출하시면 됩니다",
      time: "14:22",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 3,
      user: "박정수",
      text: "강남구는 RFID 음식물 종량기 쓰시는 분들 많으신가요?",
      time: "14:25",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 4,
      user: "김소현",
      text: "저희 아파트는 전부 RFID로 바꼈어요. 처음엔 불편했는데 이제 익숙해졌네요",
      time: "14:27",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 5,
      user: "David",
      text: "The RFID system in Gangnam is really convenient!",
      time: "14:30",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "강남의 RFID 시스템 정말 편리해요!",
        en: "The RFID system in Gangnam is really convenient!",
        ja: "江南のRFIDシステムは本当に便利です！"
      }
    },
    {
      id: 6,
      user: "윤서아",
      text: "대형폐기물은 어플로 신고하면 되는 거 알고 계시죠?",
      time: "14:33",
      isOwn: false,
      originalLang: "ko"
    }
  ],
  4: [
    {
      id: 1,
      user: "에코지민",
      text: "오늘도 장 볼 때 장바구니 챙겼어요! 💚",
      time: "11:30",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 2,
      user: "그린수현",
      text: "저는 텀블러 2개 가지고 다녀요. 하나는 뜨거운 음료용, 하나는 차가운 음료용!",
      time: "11:35",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 3,
      user: "Lisa",
      text: "I've been using reusable straws for 6 months now! No more plastic ✨",
      time: "11:40",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "6개월째 재사용 빨대 쓰고 있어요! 플라스틱은 이제 안녕 ✨",
        en: "I've been using reusable straws for 6 months now! No more plastic ✨",
        ja: "6ヶ月間再利用できるストローを使っています！プラスチックはもう使いません ✨"
      }
    },
    {
      id: 4,
      user: "제로웨이스터",
      text: "요즘 제로웨이스트 샵이 많이 생겨서 좋아요. 세제도 리필해서 쓰고 있어요",
      time: "11:45",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 5,
      user: "山田花子",
      text: "私も固形シャンプー使ってます！プラスチックボトル減らせます",
      time: "11:50",
      isOwn: false,
      originalLang: "ja",
      translations: {
        ko: "저도 고체 샴푸 쓰고 있어요! 플라스틱 병을 줄일 수 있어요",
        en: "I'm using solid shampoo too! It reduces plastic bottles",
        ja: "私も固形シャンプー使ってます！プラスチックボトル減らせます"
      }
    },
    {
      id: 6,
      user: "에코민준",
      text: "다들 대단하시네요! 저도 더 열심히 실천해야겠어요 💪",
      time: "11:55",
      isOwn: false,
      originalLang: "ko"
    }
  ],
  5: [
    {
      id: 1,
      user: "꿀팁왕",
      text: "우유팩은 일반 종이랑 따로 모아서 배출해야 한다는 거 알고 계셨나요?",
      time: "16:10",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 2,
      user: "재활용마스터",
      text: "우유팩은 펄프 품질이 좋아서 화장지로 재활용된대요!",
      time: "16:12",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 3,
      user: "Anna",
      text: "Really? I didn't know milk cartons are that valuable!",
      time: "16:15",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "정말요? 우유팩이 그렇게 가치 있는 줄 몰랐어요!",
        en: "Really? I didn't know milk cartons are that valuable!",
        ja: "本当？牛乳パックがそんなに価値があるなんて知りませんでした！"
      }
    },
    {
      id: 4,
      user: "정보통",
      text: "계란판도 재활용 가능한 거 아시나요? 플라스틱 계란판은 플라스틱류, 종이 계란판은 종이류로!",
      time: "16:18",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 5,
      user: "佐藤太郎",
      text: "アルミ缶とスチール缶も分けて捨てた方がいいですよ",
      time: "16:22",
      isOwn: false,
      originalLang: "ja",
      translations: {
        ko: "알루미늄 캔과 철 캔도 분리해서 버리는 게 좋아요",
        en: "It's better to separate aluminum cans and steel cans",
        ja: "アルミ缶とスチール缶も分けて捨てた方がいいですよ"
      }
    },
    {
      id: 6,
      user: "분리수거Pro",
      text: "캔은 자석으로 붙으면 철, 안 붙으면 알루미늄이에요. 꿀팁!",
      time: "16:25",
      isOwn: false,
      originalLang: "ko"
    },
    {
      id: 7,
      user: "Tom",
      text: "That's a brilliant tip! Thanks for sharing 👍",
      time: "16:27",
      isOwn: false,
      originalLang: "en",
      translations: {
        ko: "정말 훌륭한 팁이네요! 공유해주셔서 감사합니다 👍",
        en: "That's a brilliant tip! Thanks for sharing 👍",
        ja: "素晴らしいヒントですね！共有してくれてありがとう 👍"
      }
    }
  ]
};

export function CommunityPage({ language, onBack }: CommunityPageProps) {
  const [view, setView] = useState<"list" | "chat" | "create">("list");
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDesc, setNewRoomDesc] = useState("");
  const [translatedMessages, setTranslatedMessages] = useState<Set<number>>(new Set());
  const t = translations[language];

  const filteredRooms = chatRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinRoom = (room: ChatRoom) => {
    setSelectedRoom(room);
    setMessages(initialMessages[room.id] || []);
    setTranslatedMessages(new Set());
    setView("chat");
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      user: language === "ko" ? "나" : language === "en" ? "Me" : "私",
      text: inputMessage,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      isOwn: true,
      originalLang: language,
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleCreateRoom = () => {
    if (!newRoomName.trim()) return;

    const newRoom: ChatRoom = {
      id: chatRooms.length + 1,
      name: newRoomName,
      description: newRoomDesc,
      members: 1,
      lastMessage: language === "ko" ? "채팅방이 생성되었습니다" : language === "en" ? "Room created" : "ルームが作成されました",
      lastTime: language === "ko" ? "방금" : language === "en" ? "Just now" : "たった今",
      emoji: "🎉"
    };

    setChatRooms([newRoom, ...chatRooms]);
    setNewRoomName("");
    setNewRoomDesc("");
    setView("list");
    alert(language === "ko" ? "채팅방이 생성되었습니다! 🎉" : language === "en" ? "Room created! 🎉" : "ルームが作成されました！ 🎉");
  };

  const handleTranslate = (messageId: number) => {
    const newTranslated = new Set(translatedMessages);
    if (newTranslated.has(messageId)) {
      newTranslated.delete(messageId);
    } else {
      newTranslated.add(messageId);
    }
    setTranslatedMessages(newTranslated);
  };

  const getDisplayText = (message: Message): string => {
    if (translatedMessages.has(message.id) && message.translations) {
      return message.translations[language];
    }
    return message.text;
  };

  const needsTranslation = (message: Message): boolean => {
    return message.originalLang !== undefined && message.originalLang !== language && message.translations !== undefined;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Room List View
  if (view === "list") {
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
          <h1 className="text-xl flex-1 font-bold">{t.title}</h1>
          <button
            onClick={() => setView("create")}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-white border-b border-border">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-lg">
              <MessageCircle className="w-5 h-5 text-primary" />
              {t.roomList}
            </h2>
            <div className="space-y-3">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl shadow-md border-2 border-primary/10 p-5 hover:shadow-xl hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{room.emoji}</div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-bold text-lg">{room.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {room.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 font-medium">
                            <Users className="w-4 h-4" />
                            {room.members} {t.members}
                          </span>
                          <span>• {room.lastTime}</span>
                        </div>
                        <button
                          onClick={() => handleJoinRoom(room)}
                          className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full hover:shadow-lg transition-all text-sm font-bold"
                        >
                          {t.join}
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 italic bg-primary/5 p-3 rounded-xl">
                        💬 "{room.lastMessage}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create Room View
  if (view === "create") {
    return (
      <div className="flex-1 flex flex-col bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-4 py-4 flex items-center gap-4 shadow-md">
          <button
            onClick={() => setView("list")}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t.createRoom}</h1>
        </div>

        {/* Create Form */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-primary/10 p-6">
              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold">{t.roomName}</label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder={t.roomName}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold">{t.roomDesc}</label>
                <textarea
                  value={newRoomDesc}
                  onChange={(e) => setNewRoomDesc(e.target.value)}
                  placeholder={t.roomDesc}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setView("list")}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors font-bold"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleCreateRoom}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl hover:shadow-lg transition-all font-bold"
                >
                  ✨ {t.create}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat Room View
  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-4 py-4 shadow-md">
        <button
          onClick={() => setView("list")}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors mb-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{selectedRoom?.emoji}</span>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{selectedRoom?.name}</h1>
            <p className="text-sm text-white/80 flex items-center gap-1">
              <Users className="w-4 h-4" />
              {selectedRoom?.members} {t.members}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full ${
                  message.isOwn ? "bg-gradient-to-br from-primary to-secondary" : "bg-gradient-to-br from-gray-300 to-gray-400"
                } flex items-center justify-center shadow-md`}
              >
                <User
                  className={`w-5 h-5 text-white`}
                />
              </div>
              <div
                className={`flex flex-col ${
                  message.isOwn ? "items-end" : "items-start"
                } max-w-[70%]`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-foreground">
                    {message.user}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {message.time}
                  </span>
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-md ${
                    message.isOwn
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "bg-white border-2 border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">
                    {translatedMessages.has(message.id) && (
                      <span className="text-xs opacity-70 mr-1">{t.translated}</span>
                    )}
                    {getDisplayText(message)}
                  </p>
                </div>
                {needsTranslation(message) && (
                  <button
                    onClick={() => handleTranslate(message.id)}
                    className="mt-1 flex items-center gap-1 text-xs text-primary hover:text-secondary transition-colors px-2 py-1 rounded-full hover:bg-primary/10"
                  >
                    <Languages className="w-3 h-3" />
                    <span className="font-medium">{t.translate}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t-2 border-primary/10 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.messagePlaceholder}
            className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-full hover:shadow-lg transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
