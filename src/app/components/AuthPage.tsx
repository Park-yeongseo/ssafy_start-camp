import { useState } from "react";
import { Mail, Lock, User as UserIcon, ArrowLeft } from "lucide-react";

type Language = "ko" | "en" | "ja";

interface AuthPageProps {
  language: Language;
  onLogin: (userName: string) => void;
  onBack: () => void;
}

const translations = {
  ko: {
    login: "로그인",
    signup: "회원가입",
    email: "이메일",
    password: "비밀번호",
    name: "이름",
    emailPlaceholder: "example@email.com",
    passwordPlaceholder: "비밀번호를 입력하세요",
    namePlaceholder: "이름을 입력하세요",
    loginButton: "로그인하기",
    signupButton: "가입하기",
    switchToSignup: "계정이 없으신가요? 회원가입",
    switchToLogin: "이미 계정이 있으신가요? 로그인",
    welcome: "환영합니다! 🌱",
    subtitle: "지구를 지키는 첫걸음",
    loginSuccess: "로그인 성공! 🎉",
    signupSuccess: "가입 완료! 환영합니다! 🎉"
  },
  en: {
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    name: "Name",
    emailPlaceholder: "example@email.com",
    passwordPlaceholder: "Enter password",
    namePlaceholder: "Enter your name",
    loginButton: "Login",
    signupButton: "Sign Up",
    switchToSignup: "Don't have an account? Sign up",
    switchToLogin: "Already have an account? Login",
    welcome: "Welcome! 🌱",
    subtitle: "First step to save the Earth",
    loginSuccess: "Login successful! 🎉",
    signupSuccess: "Sign up complete! Welcome! 🎉"
  },
  ja: {
    login: "ログイン",
    signup: "会員登録",
    email: "メール",
    password: "パスワード",
    name: "名前",
    emailPlaceholder: "example@email.com",
    passwordPlaceholder: "パスワードを入力",
    namePlaceholder: "名前を入力",
    loginButton: "ログイン",
    signupButton: "登録",
    switchToSignup: "アカウントをお持ちでない方 会員登録",
    switchToLogin: "アカウントをお持ちの方 ログイン",
    welcome: "ようこそ! 🌱",
    subtitle: "地球を守る第一歩",
    loginSuccess: "ログイン成功! 🎉",
    signupSuccess: "登録完了！ようこそ! 🎉"
  }
};

export function AuthPage({ language, onLogin, onBack }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = isLogin ? email.split('@')[0] : name;
    alert(isLogin ? t.loginSuccess : t.signupSuccess);
    onLogin(userName);
  };

  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-primary via-primary to-accent">
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={onBack}
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 text-white">
            <h1 className="text-4xl mb-2">{t.welcome}</h1>
            <p className="text-white/80">{t.subtitle}</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl transition-all ${
                  isLogin
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.login}
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl transition-all ${
                  !isLogin
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.signup}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (signup only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm mb-2">{t.name}</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm mb-2">{t.email}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-2">{t.password}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors mt-6"
              >
                {isLogin ? t.loginButton : t.signupButton}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="text-center mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary hover:underline"
              >
                {isLogin ? t.switchToSignup : t.switchToLogin}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
