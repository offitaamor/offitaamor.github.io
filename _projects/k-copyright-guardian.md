---
title: "K-COPYRIGHT GUARDIAN"
category: "PUBLIC CAMPAIGN / COPYRIGHT / CHARACTER NARRATIVE"
year: "2026"
role: "Concept / Storytelling / Character Design / Illustration / Music"
medium: "Campaign Content / Card News / Character Narrative / Sound"
client: "한국저작권보호원 (KCOPA)"
summary: "2026 K-저작권 지킴이 활동에서 저작권의 원칙과 애매한 판단 지점을 캐릭터·서사·행동 선택으로 번역한 연속형 캠페인 프로젝트. 매월 새로운 인물을 설계하면서도 하나의 COPYRIGHT GUARDIAN 세계관 안에서 정보성과 창작성을 함께 구축했다."
cover: ""
remote_cover: "https://drive.google.com/thumbnail?id=1gpxuMJGNu9oWt2obyDhTLO68SMjY-oIm&sz=w2000"
archive_cover: "/assets/uploads/projects/archive/k-copyright-guardian.webp"
archive_cover_alt: "검은 음반 앞에서 등을 맞댄 푸른색 저작권 수호자와 어두운 복장의 상대"
archive_order: 3
archive_role: "콘텐츠 기획 · 캐릭터 디자인 · 음악 제작"
archive_tags: ["공공캠페인", "캐릭터디자인", "스토리텔링"]
featured: true
case_study: true
stylesheet: "/assets/css/copyright-guardian.css"
external_url: "https://www.kcopa.or.kr/lay1/bbs/S1T12C49/A/12/view.do?article_seq=7535"
---

<div class="case-study-intro">
  <p class="case-lead">법률을 그대로 설명하는 대신, 저작권 판단이 일어나는 ‘순간’을 캐릭터와 이야기로 만들었다.</p>
  <p>2026 K-저작권 지킴이 개인 미션을 진행하며 OFFITA는 매달 다른 저작권 주제를 독립적인 카드뉴스로 끝내지 않고, <strong>COPYRIGHT GUARDIAN</strong>을 중심으로 이어지는 하나의 캠페인 세계관으로 설계했다. WARNING, LICENSE, SHARE, BYPASS, QUOTE, COPY, TRANSMIT 같은 인물들은 장식적인 마스코트가 아니라 각각 경고·허락·공유·우회·경계·복제·전송이라는 개념을 행동하는 캐릭터로 번역한 결과다.</p>
</div>


<section class="cg-archive" id="mission-archive" aria-labelledby="cg-archive-title">
  <header class="cg-archive-header">
    <div class="cg-archive-heading">
      <p class="cg-eyebrow">2026 / COPYRIGHT CAMPAIGN / SELECTED WORKS</p>
      <h2 id="cg-archive-title">Mission Works</h2>
      <p>각 표지는 하나의 독립된 미션입니다. 앨범아트를 고르듯 표지를 선택하면 카드뉴스 전체를 순서대로 감상할 수 있습니다.</p>
    </div>
    <p class="cg-archive-stats"><span>2026 · JUN—NOV</span><strong>08</strong><small>MISSIONS / 67 IMAGES</small></p>
  </header>
  <nav class="cg-cover-filters" aria-label="미션 발행 월 필터" data-cg-filters>
    <button type="button" class="cg-filter is-active" data-cg-filter="all" aria-pressed="true">ALL <span>08</span></button>
    {% for month in site.data.copyright_guardian.months %}
    {% assign month_missions = site.data.copyright_guardian.missions | where: 'month', month.number %}
    <button type="button" class="cg-filter" data-cg-filter="{{ month.number }}" aria-pressed="false">{{ month.number }} <span>{{ month_missions.size }}</span></button>
    {% endfor %}
  </nav>
  <p class="cg-filter-status" data-cg-filter-status role="status" aria-live="polite">전체 8개 미션</p>
  <div class="card-grid archive-grid cg-album-grid" data-cg-album-grid>
    {% for mission in site.data.copyright_guardian.missions %}
    <a class="content-card cg-album-card" href="{{ mission.url | relative_url }}" data-cg-cover-month="{{ mission.month }}" aria-label="2026년 {{ mission.month }}월 {{ mission.type_ko }} {{ mission.title }} 카드뉴스 감상">
      <div class="card-image cg-album-image">
        <img src="{{ mission.cover_thumb }}" alt="{{ mission.title }} 카드뉴스 표지" width="760" height="760" loading="lazy" decoding="async">
        <span class="cg-album-hover" aria-hidden="true">OPEN SERIES ↗</span>
      </div>
      <div class="card-meta cg-album-meta">
        <p>2026.{{ mission.month }} &nbsp;/&nbsp; {{ mission.type_ko }} &nbsp;/&nbsp; {{ mission.card_count }} IMAGES</p>
        <h3>{{ mission.title }}</h3>
        <p class="cg-album-subtitle">{{ mission.kicker }}</p>
      </div>
    </a>
    {% endfor %}
  </div>
  <p class="cg-archive-note">표지를 누르면 작품 감상 페이지로 이동합니다. 저작권 관련 실제 이용 가능 여부는 권리 관계와 라이선스 조건에 따라 달라질 수 있습니다.</p>
</section>
<script defer src="{{ '/assets/js/copyright-guardian.js' | relative_url }}"></script>

<details class="cg-case-study-details" id="project-case-study">
  <summary><span class="cg-case-label">PROJECT CASE STUDY</span><strong>프로젝트 기획 · 캐릭터 디자인 · 제작 과정</strong><span class="cg-case-indicator" aria-hidden="true">+</span></summary>
  <div class="cg-case-study-inner">
<section class="case-section">
  <div class="case-section-head">
    <p class="case-kicker">01 / CAMPAIGN SYSTEM</p>
    <h2>한 번 쓰고 끝나는 캐릭터가 아니라,<br>저작권 개념이 계속 확장되는 세계관</h2>
  </div>

  <p>월별 미션은 같은 메시지를 반복하지 않는다. 6월에는 <strong>‘나는 어떤 역할을 맡았는가’</strong>라는 정체성에서 출발하고, 7월에는 저작권을 지키는 행동을 세 가지 기능으로 나누며, 8월에는 실제 이용 상황에서 마주치는 유혹과 선택으로 이동한다. 9월에는 다시 한 단계 깊어져, 단순한 금지·허용보다 <strong>경계를 묻고 판단하는 능력</strong> 자체를 다룬다.</p>
  <p>10월에는 〈Humming in the rain〉의 제작 과정을 따라 음악이 탄생하는 과정을 기록하고, 11월에는 BLOCK × BYPASS와 CREDIT을 통해 우회·차단·출처 확인이라는 실천의 문제까지 확장한다. 표지 아카이브에서 각 미션의 카드뉴스를 처음부터 끝까지 감상할 수 있다.</p>

  <div class="case-gallery case-gallery--mosaic">
    <figure class="case-media--wide">
      <img src="https://drive.google.com/thumbnail?id=1gpxuMJGNu9oWt2obyDhTLO68SMjY-oIm&sz=w1800" alt="2026 K-저작권 지킴이 발대식을 COPYRIGHT GUARDIAN 위촉식으로 재해석한 카드뉴스 표지" loading="lazy" decoding="async">
      <figcaption>JUNE — 발대식을 단순 후기 대신 ‘COPYRIGHT GUARDIAN이 되는 순간’으로 재구성</figcaption>
    </figure>
    <figure>
      <img src="https://drive.google.com/thumbnail?id=11dVw7YZihFoE8Ntn8sfBElHABhHp16ko&sz=w1500" alt="WARNING LICENSE SHARE 세 캐릭터가 등장하는 저작권 삼주 카드뉴스" loading="lazy" decoding="async">
      <figcaption>JULY — WARNING · LICENSE · SHARE, 기능을 캐릭터로 만든 저작권 삼주</figcaption>
    </figure>
    <figure>
      <img src="{{ '/assets/uploads/visual/copyright/cover-01.webp' | relative_url }}" alt="BYPASS와 COPYRIGHT GUARDIAN을 대비한 8월 저작권 지킴이 카드뉴스" loading="lazy" decoding="async">
      <figcaption>AUGUST — ‘편한 우회’와 ‘권리의 길’을 선택의 문제로 전환한 BYPASS</figcaption>
    </figure>
  </div>

  <div class="case-output-grid">
    <div class="case-output-card">
      <span>JUNE</span>
      <h3>Role / Identity</h3>
      <p>공식 발대식의 경험을 히어로의 위촉 서사로 바꾸어 캠페인 전체의 주인공과 세계관을 설정했다.</p>
    </div>
    <div class="case-output-card">
      <span>JULY</span>
      <h3>Rule / Structure</h3>
      <p>‘멈추고, 확인하고, 올바르게 공유한다’를 세 캐릭터의 역할로 분리해 복잡한 정보를 기억 가능한 구조로 만들었다.</p>
    </div>
    <div class="case-output-card">
      <span>AUGUST</span>
      <h3>Choice / Behavior</h3>
      <p>BYPASS를 단순한 악당이 아니라 누구나 느낄 수 있는 편의와 우회의 유혹으로 설정해 행동 선택에 초점을 맞췄다.</p>
    </div>
  </div>
</section>

<section class="case-section">
  <div class="case-section-head">
    <p class="case-kicker">02 / CREATIVE APPROACH</p>
    <h2>추상적인 제도를 사람의 행동으로 번역하기</h2>
  </div>

  <p class="case-lead case-lead--small">이 프로젝트의 핵심 디자인 단위는 ‘캐릭터’가 아니라 <strong>질문과 행동</strong>이다. 먼저 저작권 개념에서 실제 이용자가 마주치는 갈등을 찾고, 그 갈등을 가장 명확하게 드러내는 인물과 상황을 설계한다.</p>

  <div class="case-role-grid">
    <div><span>01</span><strong>Concept Translation</strong><p>경고·라이선스·복제·전송처럼 보이지 않는 개념을 인물의 성격과 행동으로 변환한다.</p></div>
    <div><span>02</span><strong>Character as Function</strong><p>각 캐릭터에게 이름만 부여하지 않고, 무엇을 묻고 어떤 선택을 유도하는지까지 역할을 설계한다.</p></div>
    <div><span>03</span><strong>Narrative Continuity</strong><p>매월 새 캐릭터가 등장해도 COPYRIGHT GUARDIAN을 축으로 이전 미션의 논리가 다음 미션으로 이어지게 한다.</p></div>
    <div><span>04</span><strong>Behavior Design</strong><p>법 조항을 암기시키기보다 ‘멈춤 → 확인 → 구분 → 선택’처럼 실제로 실행 가능한 행동 기준을 남긴다.</p></div>
  </div>

  <p>이 방식은 공공 캠페인의 정보성을 유지하면서도 일방적인 계도 문법을 피한다. BYPASS는 처벌해야 할 절대악이 아니라 누구에게나 있는 ‘편한 길의 유혹’이고, COPY와 TRANSMIT 역시 복제와 전송이라는 기능 자체를 의인화한 인물이다. 따라서 문제의 초점은 사람을 악인으로 규정하는 데 있지 않고, <strong>권리를 확인하지 않은 채 행동이 이어지는 순간</strong>에 놓인다.</p>
</section>

<section class="case-section">
  <div class="case-section-head">
    <p class="case-kicker">03 / SEPTEMBER — NOVEMBER · EXTENDING THE QUESTION</p>
    <h2>경계를 묻는 질문에서, 창작과 기록의 실천으로</h2>
  </div>

  <div class="case-output-grid">
    <div class="case-output-card">
      <span>QUOTE</span>
      <h3>경계를 묻는 은퇴 탐정</h3>
      <p>폰트, 음악, 이미지·AI처럼 창작 과정에서 실제로 마주치는 애매한 사례를 ‘묻기 → 구분하기 → 확인하기’라는 사고법으로 다룬다. QUOTE는 정답을 대신 말하는 사람이 아니라 스스로 경계를 확인하게 만드는 멘토다.</p>
    </div>
    <div class="case-output-card">
      <span>COPY</span>
      <h3>복제를 의인화한 기능</h3>
      <p>저장·캡처·다운로드처럼 너무 익숙해서 쉽게 지나치는 ‘사본이 만들어지는 순간’을 한 명의 소년 캐릭터로 보여준다.</p>
    </div>
    <div class="case-output-card">
      <span>TRANSMIT</span>
      <h3>확산을 의인화한 기능</h3>
      <p>업로드·게시·재게시·공유를 좋아하는 인물로 설계해, 개인 기기 안의 파일이 공중에게 이동하는 순간의 차이를 드러낸다.</p>
    </div>
  </div>

  <p><strong>〈QUOTE — 경계를 묻는 은퇴 탐정〉</strong>에서는 저작권의 애매함 자체를 주제로 삼는다. “무료 폰트면 괜찮은가?”, “오래된 음악은 자유롭게 쓸 수 있는가?”, “AI가 중간에 들어가면 안전한가?” 같은 실제 창작자의 질문에서 시작해 허락의 범위, 서로 다른 권리, 아이디어와 표현의 차이를 구분하도록 설계했다.</p>

  <p><strong>〈COPY × TRANSMIT — 떠도는 사진, 사라지는 이름〉</strong>에서는 한 장의 지역 사진이 복제되고 전달되는 동안 원작자의 이름과 출처, 책임의 경계까지 흐려지는 과정을 따라간다. 마지막 질문은 “허락받았는가?”에서 끝나지 않고 <strong>“그 사람이 허락할 권리를 가진 사람이었는가?”</strong>까지 확장된다.</p>

  <p><strong>〈Humming in the rain — 이 노래 하나를 만들기까지〉</strong>는 허밍, 작곡, 가사, 편곡, 음향 작업과 앨범아트까지 이어지는 창작의 여정을 시각적인 기록으로 편집했다. 11월의 <strong>〈BLOCK × BYPASS〉</strong>와 <strong>〈CREDIT〉</strong>에서는 저작권 보호의 행동 선택과 올바른 출처·권리 확인을 서로 다른 서사로 연결한다.</p>

  <div class="case-role-shift">
    <span>CONCEPT EVOLUTION</span>
    <strong>IDENTITY → RULE → CHOICE → JUDGMENT → CREATION → RESPONSIBILITY</strong>
    <p>월별 미션이 진행될수록 메시지를 반복하기보다 저작권을 바라보는 사고의 깊이를 단계적으로 확장했다.</p>
  </div>
</section>

<section class="case-section">
  <div class="case-section-head">
    <p class="case-kicker">04 / OFFITA'S STRENGTHS IN THIS PROJECT</p>
    <h2>이 작업에서 확인되는 창작 방식과 역량</h2>
  </div>

  <div class="case-role-grid">
    <div><span>01</span><strong>세계관 구축</strong><p>개별 미션을 하나의 캠페인 IP처럼 연결하고, 새로운 주제가 생길 때마다 새 인물을 추가할 수 있는 확장 구조를 만들었다.</p></div>
    <div><span>02</span><strong>복잡한 정보의 시각화</strong><p>법률·제도 용어를 그대로 옮기지 않고 이용자가 실제로 마주치는 상황, 질문, 선택으로 다시 편집한다.</p></div>
    <div><span>03</span><strong>비도덕화된 설득</strong><p>이용자를 훈계하거나 캐릭터를 단순 악역으로 처리하지 않고, 누구나 겪는 망설임과 편의를 이야기 안에 넣어 판단의 주체를 독자에게 돌려준다.</p></div>
    <div><span>04</span><strong>창작자 관점의 현실성</strong><p>폰트·샘플링·이미지 참고·AI 활용처럼 OFFITA가 음악과 시각 작업에서 실제로 고민한 문제를 캠페인 사례로 전환한다.</p></div>
    <div><span>05</span><strong>시각 시스템의 일관성</strong><p>제한된 색조, 손으로 추적한 듯한 선, 종이 질감, 방패·©·브리핑 파일 같은 반복 모티프로 서로 다른 미션을 같은 세계에 묶는다.</p></div>
    <div><span>06</span><strong>Cross-media Authoring</strong><p>기획·캐릭터·일러스트에 그치지 않고 직접 만든 테마 음악까지 결합해 시각 캠페인을 하나의 복합 창작물로 확장한다.</p></div>
  </div>

  <p>결과적으로 이 프로젝트의 강점은 ‘저작권을 예쁘게 설명하는 카드뉴스’에 있지 않다. <strong>복잡한 공공 정보를 하나의 창작 언어로 해석하면서도, 실제 행동으로 이어질 수 있는 구조를 설계한다는 점</strong>에 있다. 정보와 작품성 중 하나를 포기하지 않고, 공공 캠페인 안에서도 OFFITA의 서사·캐릭터·시각 언어를 유지하는 방식이다.</p>
</section>

<section class="case-section case-section--closing">
  <div class="case-section-head">
    <p class="case-kicker">METHOD</p>
    <h2>From rule to choice.</h2>
  </div>

  <div class="case-timeline">
    <div><span>01</span><strong>QUESTION</strong><p>실제 이용자가 어디에서 헷갈리는가?</p></div>
    <div><span>02</span><strong>DISTILL</strong><p>그 상황의 핵심 권리와 행동을 분리한다.</p></div>
    <div><span>03</span><strong>PERSONIFY</strong><p>개념을 캐릭터의 역할과 성격으로 바꾼다.</p></div>
  </div>

  <div class="case-timeline">
    <div><span>04</span><strong>NARRATE</strong><p>갈등과 선택이 보이는 장면으로 구성한다.</p></div>
    <div><span>05</span><strong>PRACTICE</strong><p>독자가 바로 적용할 질문과 행동 기준을 남긴다.</p></div>
    <div><span>06</span><strong>CONNECT</strong><p>다음 미션의 캐릭터와 세계관으로 확장한다.</p></div>
  </div>

  <div class="case-links">
    <a href="/visual/k-copyright-guardian/"><span>VISUAL</span><strong>K-Copyright Guardian — Visual Archive</strong><em>→</em></a>
    <a href="https://www.kcopa.or.kr/lay1/bbs/S1T12C49/A/12/view.do?article_seq=7535" target="_blank" rel="noopener"><span>OFFICIAL</span><strong>2026 K-저작권 지킴이 공식 안내</strong><em>↗</em></a>
  </div>
</section>
  </div>
</details>
