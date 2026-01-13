import { useState } from "react";
import { ArrowLeft, Send, User, Search, Plus, Users, MessageCircle } from "lucide-react";

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
    cancel: "취소"
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
    cancel: "Cancel"
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
    cancel: "キャンセル"
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
    { id: 1, user: "김지민", text: "안녕하세요! 분리수거 처음 해보는데 너무 유용하네요", time: "10:23", isOwn: false },
    { id: 2, user: "John", text: "This app is amazing! Very helpful for foreigners", time: "10:25", isOwn: false },
    { id: 3, user: "박서준", text: "페트병 라벨 제거하는 거 몰랐는데 덕분에 알게 됐어요!", time: "10:30", isOwn: false }
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
  const t = translations[language];

  const filteredRooms = chatRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinRoom = (room: ChatRoom) => {
    setSelectedRoom(room);
    setMessages(initialMessages[room.id] || []);
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
        <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center gap-4 shadow-md">
          <button
            onClick={onBack}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl flex-1">{t.title}</h1>
          <button
            onClick={() => setView("create")}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
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
            <h2 className="mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              {t.roomList}
            </h2>
            <div className="space-y-3">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl shadow-sm border border-border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{room.emoji}</div>
                    <div className="flex-1">
                      <h3 className="mb-1">{room.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {room.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {room.members} {t.members}
                          </span>
                          <span>• {room.lastTime}</span>
                        </div>
                        <button
                          onClick={() => handleJoinRoom(room)}
                          className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors text-sm"
                        >
                          {t.join}
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        "{room.lastMessage}"
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
        <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center gap-4 shadow-md">
          <button
            onClick={() => setView("list")}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">{t.createRoom}</h1>
        </div>

        {/* Create Form */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <div className="mb-6">
                <label className="block mb-2 text-sm">{t.roomName}</label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder={t.roomName}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm">{t.roomDesc}</label>
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
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleCreateRoom}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-colors"
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
      <div className="bg-primary text-primary-foreground px-4 py-4 shadow-md">
        <button
          onClick={() => setView("list")}
          className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors mb-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{selectedRoom?.emoji}</span>
          <div className="flex-1">
            <h1 className="text-xl">{selectedRoom?.name}</h1>
            <p className="text-sm text-primary-foreground/80 flex items-center gap-1">
              <Users className="w-4 h-4" />
              {selectedRoom?.members} {t.members}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full ${
                  message.isOwn ? "bg-primary" : "bg-gray-300"
                } flex items-center justify-center`}
              >
                <User
                  className={`w-5 h-5 ${
                    message.isOwn ? "text-white" : "text-gray-600"
                  }`}
                />
              </div>
              <div
                className={`flex flex-col ${
                  message.isOwn ? "items-end" : "items-start"
                } max-w-[70%]`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-muted-foreground">
                    {message.user}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {message.time}
                  </span>
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? "bg-primary text-white"
                      : "bg-white border border-border"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.messagePlaceholder}
            className="flex-1 px-4 py-3 rounded-full border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
