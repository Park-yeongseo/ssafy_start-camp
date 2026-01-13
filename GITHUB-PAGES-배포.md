# 🚀 GitHub Pages 배포 가이드

## 📋 배포 절차

### 1단계: GitHub 저장소 생성

1. https://github.com 접속 및 로그인
2. 우측 상단 "+" 버튼 클릭 → "New repository"
3. 저장소 정보 입력:
   - **Repository name**: `ssafy-disposal-nation` (원하는 이름)
   - **Description**: "배출의 민족 - AI 기반 분리수거 가이드"
   - **Public** 선택 (GitHub Pages 무료 사용)
4. "Create repository" 클릭

### 2단계: 로컬 저장소와 연결

터미널에서 다음 명령어 실행:

```bash
# GitHub에서 제공하는 저장소 URL로 변경
git remote add origin https://github.com/your-username/ssafy-disposal-nation.git

# 현재 브랜치 확인
git branch

# master가 아니면 master로 변경
git branch -M master
```

### 3단계: 코드 커밋 및 푸시

```bash
# 변경사항 커밋 (아직 안 했다면)
git add .
git commit -m "feat: Complete disposal nation app with all features"

# GitHub에 푸시
git push -u origin master
```

### 4단계: GitHub Pages 설정

1. GitHub 저장소 페이지에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** 섹션에서:
   - "GitHub Actions" 선택 (이미 자동 배포 설정 완료!)
4. 저장

### 5단계: 자동 배포 확인

1. GitHub 저장소에서 **Actions** 탭 클릭
2. "Deploy to GitHub Pages" 워크플로우 확인
3. 녹색 체크 표시가 나타나면 배포 완료!
4. 배포된 URL: `https://your-username.github.io/ssafy-disposal-nation/`

## ⚡ 자동 배포 시스템

이미 `.github/workflows/deploy.yml` 파일이 설정되어 있습니다!

**작동 방식**:
- `master` 브랜치에 푸시할 때마다 자동으로:
  1. 의존성 설치 (`npm install`)
  2. 프로젝트 빌드 (`npm run build`)
  3. GitHub Pages에 자동 배포

## 🔧 수동 배포 (대안 방법)

자동 배포가 작동하지 않으면 수동으로 배포할 수 있습니다:

### 방법 A: gh-pages 브랜치 사용

```bash
# gh-pages 패키지 설치
npm install -D gh-pages

# package.json에 deploy 스크립트 추가 후
npm run deploy
```

### 방법 B: dist 폴더 직접 푸시

```bash
# dist 폴더로 이동
cd dist

# 새 git 저장소 초기화
git init
git add -A
git commit -m "Deploy"

# gh-pages 브랜치로 푸시
git push -f https://github.com/your-username/ssafy-disposal-nation.git master:gh-pages

# 원래 폴더로 돌아가기
cd ..
```

그 다음 GitHub Settings → Pages에서 Source를 "Deploy from a branch"로 변경하고 `gh-pages` 브랜치 선택

## 📝 배포 후 확인사항

✅ **배포 URL**: `https://your-username.github.io/repository-name/`
✅ **상태 확인**: GitHub Actions 탭에서 초록색 체크
✅ **기능 테스트**:
   - 사진 촬영 기능
   - 언어 변경
   - 페이지 이동
   - 커뮤니티 채팅

## 🔄 업데이트 방법

코드를 수정한 후:

```bash
# 변경사항 확인
git status

# 변경사항 추가
git add .

# 커밋
git commit -m "Update: 설명"

# 푸시 (자동으로 재배포됨!)
git push
```

## 🌐 커스텀 도메인 (선택사항)

1. 도메인 구매 (예: Namecheap, GoDaddy)
2. GitHub Settings → Pages → Custom domain에 도메인 입력
3. DNS 설정:
   ```
   Type: CNAME
   Name: www
   Value: your-username.github.io
   ```

## ⚠️ 주의사항

1. **Public 저장소만 무료**: Private 저장소는 GitHub Pro 필요
2. **첫 배포는 5-10분 소요**: 이후 업데이트는 1-2분
3. **캐시 문제**: 변경사항이 안 보이면 Ctrl+Shift+R로 새로고침
4. **파일 크기 제한**: GitHub Pages는 1GB 제한

## 📞 문제 해결

### 404 에러가 나올 때
- Settings → Pages에서 올바른 브랜치/폴더 선택 확인
- URL이 정확한지 확인 (저장소 이름 포함)

### Actions 워크플로우가 실패할 때
- Actions 탭에서 에러 로그 확인
- Settings → Actions → General에서 권한 확인

### 페이지가 비어있을 때
- 브라우저 개발자 도구(F12) → Console에서 에러 확인
- base URL 설정이 필요할 수 있음

---

**제작**: SSAFY Start Camp Team
**배포 날짜**: 2026-01-13
