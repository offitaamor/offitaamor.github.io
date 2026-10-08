# OFFITA — Official Portfolio Website

GitHub Pages + Jekyll + Pages CMS 기반 다중 페이지 포트폴리오입니다.

## 주소 전제
- GitHub username: `offitaamor`
- Repository: `offitaamor.github.io`
- Public URL: `https://offitaamor.github.io`

## 주요 주소
- `/` Home
- `/about/`
- `/music/`
- `/visual/`
- `/projects/`
- `/writing/`
- `/contact/`
- `/manage/` 관리자 진입 안내

## 콘텐츠 관리
Pages CMS: https://app.pagescms.org

Pages CMS는 `.pages.yml`을 읽어 다음 메뉴를 제공합니다.
- Site Settings
- About / Artist Statement / CV / Press
- Visual Intro / Music Practice & Philosophy
- Music (Release, Tracklist, Credits, Listening Links)
- Visual (Series / Gallery / Artwork Direct Anchors)
- Projects / Writing

저장하면 GitHub repository에 commit되고 GitHub Pages가 재빌드합니다.

## 디자인 · 타이포그래피
- `assets/css/style.css`: 기본 레이아웃 및 공통 디자인
- `assets/css/visual.css`, `assets/css/music.css`: 영역별 고유 레이아웃
- `assets/css/refinements.css`: 한글 행간·반응형 타이포그래피·접근성 보정
- 기존 영문 Cormorant Garamond / 한글 Noto Sans KR에 Noto Serif KR을 추가하여 선언문을 표현합니다.

## 콘텐츠 게시 기준
- 발매가 확정되지 않은 음악은 출시 완료로 표기하지 않습니다.
- CV에는 확인 가능한 참여 연도·실제 역할만 기록합니다.
- 완성되지 않은 글은 공개 템플릿 문장 대신 본문을 작성하거나 게시를 보류합니다.
- 모바일 레이아웃, 내부 링크, 외부 미디어 링크를 함께 검수합니다.

## SEO
- 페이지별 canonical / Open Graph / Twitter 미리보기 태그 포함
- `jekyll-sitemap`으로 사이트맵 생성, `robots.txt`에 위치 표시
- 한국어 콘텐츠를 기본 언어로 유지하며 다국어 전환 기능은 적용하지 않았습니다.
