# 🔑 GitHub Personal Access Token 설정 가이드

2FA 없이 GitHub에 푸시하는 방법

## 📝 Token 생성 방법

### 1단계: GitHub에서 Token 생성

1. GitHub 로그인 후 우측 상단 프로필 사진 클릭
2. **Settings** 클릭
3. 왼쪽 맨 아래 **Developer settings** 클릭
4. 왼쪽 메뉴에서 **Personal access tokens** → **Tokens (classic)** 클릭
5. **Generate new token** → **Generate new token (classic)** 클릭
6. 설정:
   - **Note**: `ssafy-disposal-nation` (토큰 이름)
   - **Expiration**: 90 days 또는 No expiration (만료 없음)
   - **Select scopes** (권한 선택):
     - ✅ `repo` (전체 체크)
     - ✅ `workflow`
7. 맨 아래 **Generate token** 클릭
8. **생성된 토큰을 복사** (다시 볼 수 없으니 주의!)
   - 형식: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2단계: Git에 Token 적용

#### 방법 A: HTTPS URL에 토큰 포함 (가장 간단)

```bash
# 기존 origin 제거
git remote remove origin

# 토큰을 포함한 URL로 다시 추가
git remote add origin https://ghp_YOUR_TOKEN_HERE@github.com/Park-yeongseo/ssafy_start-camp.git

# 푸시
git push -u origin master
```

**예시** (YOUR_TOKEN 부분을 실제 토큰으로 변경):
```bash
git remote add origin https://ghp_abcd1234efgh5678ijkl@github.com/Park-yeongseo/ssafy_start-camp.git
```

#### 방법 B: Git Credential Manager 사용 (권장)

```bash
# 푸시 시도
git push -u origin master

# Username 입력 프롬프트가 나오면:
# Username: Park-yeongseo
# Password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx (토큰 입력)
```

Windows에서는 자동으로 Credential Manager에 저장되어 다음부터는 입력 불필요합니다.

#### 방법 C: Git Config에 저장

```bash
# Credential helper 설정
git config --global credential.helper store

# 푸시 (한 번만 토큰 입력하면 저장됨)
git push -u origin master
```

## 🔒 보안 주의사항

1. **토큰은 비밀번호처럼 관리**: 절대 공유하지 마세요
2. **토큰을 코드에 포함하지 마세요**: .git/config 파일은 절대 커밋하지 마세요
3. **토큰 유출 시**: GitHub Settings → Developer settings에서 즉시 삭제
4. **만료 설정**: 장기 프로젝트가 아니면 90일 만료 권장

## 🚀 빠른 설정 (요약)

```bash
# 1. GitHub에서 토큰 생성 (위 단계 참고)

# 2. 기존 origin 제거
git remote remove origin

# 3. 토큰 포함 URL로 origin 재설정
git remote add origin https://ghp_YOUR_TOKEN@github.com/Park-yeongseo/ssafy_start-camp.git

# 4. 푸시
git push -u origin master
```

## 🔄 대안: SSH 키 사용 (추가 옵션)

SSH 키를 사용하면 토큰 없이도 푸시할 수 있습니다:

```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your-email@example.com"

# 공개키 복사
cat ~/.ssh/id_ed25519.pub

# GitHub Settings → SSH and GPG keys에 추가 후

# Remote URL을 SSH로 변경
git remote set-url origin git@github.com:Park-yeongseo/ssafy_start-camp.git
```

## ❓ 문제 해결

### "remote: Support for password authentication was removed" 에러
- 비밀번호 대신 Personal Access Token을 사용해야 합니다

### 토큰을 잊어버렸을 때
- GitHub에서 기존 토큰 삭제하고 새로 생성

### 계속 비밀번호를 물어볼 때
```bash
git config --global credential.helper store
```

---

**제작**: SSAFY Start Camp Team
