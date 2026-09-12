# 기존 V1에서 V2로 교체하는 방법

## 권장: 기존 파일 전체 교체
V2는 Jekyll 구조가 새로 추가되므로 일부 파일만 덮어쓰지 말고 저장소 루트 기준으로 V2 파일 전체를 올리는 것이 안전합니다.

1. GitHub `offitaamor.github.io` repository를 엽니다.
2. 기존 V1 파일을 백업하거나 삭제합니다.
3. 이 ZIP을 압축 해제합니다.
4. `offitaamor-site-v2` 폴더 자체가 아니라 **폴더 안의 파일과 폴더 전부**를 repository root에 업로드합니다.
5. `.pages.yml`처럼 점(`.`)으로 시작하는 파일도 반드시 포함합니다.
6. Commit changes.
7. Settings → Pages에서 배포 소스가 `main / (root)`인지 확인합니다.

## Pages CMS 연결
1. https://app.pagescms.org 접속
2. GitHub로 로그인
3. GitHub App 설치/권한 승인
4. `offitaamor.github.io` repository 선택
5. `.pages.yml`이 읽히면 왼쪽에 Music / Visual / Projects / Writing 메뉴가 표시됩니다.

## 이후 글 작성
Writing → New entry → 제목/분류/날짜/본문 입력 → Save

## 새 음악 등록
Music → New entry → 제목/연도/커버/소개/본문 → Save

## 사진 업로드
Cover Image 또는 본문 이미지 버튼으로 업로드하면 `assets/uploads/`에 저장됩니다.

## 참고
GitHub Pages에서 Jekyll 빌드가 완료되어야 새 내용이 실제 사이트에 나타납니다.
