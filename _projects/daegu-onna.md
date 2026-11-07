---
title: "SCORCHED MODERN — 대구에서 바라본 것들"
category: "EXHIBITION / LOCAL / MUSIC & VISUAL"
year: "2026"
role: "Artist / Illustration / Music / Exhibition Archive"
medium: "Drawing / Music / Field Notes / Print"
client: "대굴대굴 대구온나 로컬벤처 3차 · 연암서당골"
summary: "대구의 음식과 인상을 인물로 그리고, 연암서당골에서 보낸 하루와 음악 작업을 함께 기록한 OFFITA의 체류 전시."
description: "OFFITA의 대구 체류 전시 SCORCHED MODERN. 대구 음식 의인화 7점, 도시 인물화 2점, 음악 아트워크와 연암서당골 현장 기록을 감상하세요."
cover: "/assets/uploads/projects/daegu-onna/cover.webp"
featured: true
case_study: true
project_slug: "daegu-case"
highlights:
  - {label: "PLACE", value: "대구 북구 연암서당골"}
  - {label: "WORKS", value: "대구 아트워크 9점 · 음악 아트워크 6점"}
  - {label: "FORMAT", value: "그림 · 음악 · 현장 아카이브"}
---
<div class="case-study-intro daegu-intro">
  <p class="case-lead">빛은 바랬고,<br>소리는 남았다.</p>
  <p>OFFITA는 장소에서 마주친 색과 사람의 인상을 기억해 두었다가, 작업실로 돌아와 그림과 음악으로 다시 묻는다. 2026년 가을 대구에 머물며 먹고 걷고 작업한 경험을 <strong>SCORCHED MODERN — 그을린 모던</strong>이라는 이름으로 모았다. 이 페이지는 전시장에 놓인 원화와 인쇄물, 그리고 그 곁에 있던 현장 기록의 아카이브다.</p>
  <p class="daegu-disclaimer">짧은 체류 동안 바라본 대구의 한 장면이다. 이 도시를 오래 살아온 사람들의 시선과 답이 작품을 완성해 준다.</p>
</div>

<nav class="daegu-jump" aria-label="전시 아카이브 목차">
  <a href="#daegu-city">01 대구의 인상</a><a href="#daegu-village">02 연암서당골</a><a href="#daegu-music">03 음악과 카드</a><a href="#daegu-process">04 제작 기록</a>
</nav>

<section class="case-section" id="daegu-city">
  <div class="case-section-head"><p class="case-kicker">SESSION 01 / CITY & TASTE</p><h2>내가 바라본 대구</h2></div>
  <p>음식이 사람이 되고, 도시에서 받은 인상이 색과 옷차림이 되었다. 대구의 음식을 의인화한 일곱 점과 대구의 남녀를 바라본 두 점. 제목과 사투리, 먹빛·베이지·말린 장미의 색이 하나의 시리즈를 이룬다.</p>
  <div class="daegu-gallery daegu-gallery--food">
    {% for work in site.data.daegu_onna.food %}
    <figure><a href="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" target="_blank" rel="noopener" aria-label="{{ work.title }} 원화 크게 보기"><img src="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" alt="OFFITA의 대구 음식 의인화 작품: {{ work.title }}" loading="lazy" decoding="async"></a><figcaption><strong>{{ work.title }}</strong><span>{{ work.caption }}</span></figcaption></figure>
    {% endfor %}
  </div>
  <h3 class="daegu-subhead">도시를 인물로 그리다</h3>
  <div class="daegu-gallery daegu-gallery--people">
    {% for work in site.data.daegu_onna.people %}
    <figure><a href="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" target="_blank" rel="noopener" aria-label="{{ work.title }} 원화 크게 보기"><img src="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" alt="OFFITA의 대구 도시 인물화: {{ work.title }}" loading="lazy" decoding="async"></a><figcaption><strong>{{ work.title }}</strong><span>{{ work.caption }}</span></figcaption></figure>
    {% endfor %}
  </div>
</section>

<section class="case-section" id="daegu-village">
  <div class="case-section-head"><p class="case-kicker">SESSION 02 / FIELD ARCHIVE</p><h2>내가 지낸<br>연암서당골</h2></div>
  <p>전시의 두 번째 장에는 완성작 옆에 생활의 리듬을 놓았다. 아침에 직접 밥을 만들고 성경을 읽으며 하루를 시작했다. 할 일을 적고 움직인 뒤 그림과 음악을 만들었다. 오후에는 골목을 걷고 공간을 찾아가고, 저녁에는 대구의 음식을 경험했다. 매일 같은 일정이었다는 뜻이 아니라, 체류 중 반복된 하루의 흐름이다.</p>
  <div class="daegu-field-grid">
    <figure><img src="{{ '/assets/uploads/projects/daegu-onna/field-breakfast.webp' | relative_url }}" alt="연암서당골에서 직접 만든 아침 식사" loading="lazy" decoding="async"><figcaption>06:00 / 직접 만든 아침 식사</figcaption></figure>
    <figure><img src="{{ '/assets/uploads/projects/daegu-onna/field-sketch.webp' | relative_url }}" alt="대구 인물화를 구상하며 노트에 그린 초기 스케치" loading="lazy" decoding="async"><figcaption>08:00 / 작업 노트의 인물 스케치</figcaption></figure>
    <figure><img src="{{ '/assets/uploads/projects/daegu-onna/field-yeonam.webp' | relative_url }}" alt="연암서당골에서 바라본 골목과 건물" loading="lazy" decoding="async"><figcaption>오후 / 연암서당골 골목 답사</figcaption></figure>
    <figure><img src="{{ '/assets/uploads/projects/daegu-onna/field-food.webp' | relative_url }}" alt="대구에서 먹은 야끼우동" loading="lazy" decoding="async"><figcaption>저녁 / 음식에서 작품의 색을 찾다</figcaption></figure>
  </div>
  <p class="daegu-small-note">사진은 전시 설치 전경이 아니라 세션 02의 인쇄 아카이브에 수록된 체류·작업 기록입니다.</p>
  <div class="daegu-quote">“당신이 느껴온 대구의 색깔은 어떤가요?”<span>전시장에 남긴 OFFITA의 질문 중 하나</span></div>
</section>

<section class="case-section" id="daegu-music">
  <div class="case-section-head"><p class="case-kicker">SESSION 03 / RECORD ARCHIVE</p><h2>OFFITA —<br>Music & Art</h2></div>
  <p>그림을 그리는 사람과 노래를 만드는 사람이 같은 작가임을 보여주는 방. 기존 음악의 앨범 아트워크 여섯 점을 나란히 놓고, 음악을 색·영감·소리의 언어로 적은 테이스팅 카드를 함께 전시했다. 대구 음식 카드 역시 같은 형식으로 제작해 맛의 인상을 시각 언어로 옮겼다.</p>
  <div class="daegu-gallery daegu-gallery--music">
    {% for work in site.data.daegu_onna.music %}
    <figure><a href="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" target="_blank" rel="noopener" aria-label="{{ work.title }} 앨범 아트워크 크게 보기"><img src="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" alt="OFFITA 음악 아트워크: {{ work.title }}" loading="lazy" decoding="async"></a><figcaption><strong>{{ work.title }}</strong></figcaption></figure>
    {% endfor %}
  </div>
  <h3 class="daegu-subhead">작품을 읽는 또 하나의 방식 — Tasting Notes</h3>
  <p>인쇄용 A4 네 장에 나누어 배치한 14종의 카드. 음악의 장르·영감·소리, 음식의 색·인상·맛을 한 장의 노트로 정리했다. 카드를 눌러 원본 크기로 볼 수 있다.</p>
  <div class="daegu-card-grid">
    {% for card in site.data.daegu_onna.cards %}
    <figure><a href="{{ '/assets/uploads/projects/daegu-onna/card-' | append: card.image | append: '.webp' | relative_url }}" target="_blank" rel="noopener" aria-label="{{ card.title }} 테이스팅 카드 크게 보기"><img src="{{ '/assets/uploads/projects/daegu-onna/card-' | append: card.image | append: '.webp' | relative_url }}" alt="{{ card.title }} 테이스팅 카드" loading="lazy" decoding="async"></a><figcaption>{{ card.title }}</figcaption></figure>
    {% endfor %}
  </div>
  <p class="daegu-small-note">음악과 발매 정보는 <a href="{{ '/music/' | relative_url }}">MUSIC 아카이브</a>에서도 볼 수 있습니다.</p>
</section>

<section class="case-section case-section--closing" id="daegu-process">
  <div class="case-section-head"><p class="case-kicker">PROCESS / QUESTIONS</p><h2>완성한 것과<br>남겨 둔 것</h2></div>
  <p>초기의 방향은 크게 달라지지 않았다. 직접 그린 원화를 바탕으로 인물을 다듬고, 인쇄물과 음악 카드로 확장했다. 동시에 AI로 그림체를 구현하고 음식 형태를 3D로 옮기는 실험에는 아직 해결할 문제가 남았다. 전시는 완성한 작업과 다음에 이어 갈 질문을 함께 놓았다.</p>
  <div class="daegu-process-grid">
    <div><span>01 / OBSERVE</span><strong>걷고 먹고 기록하다</strong><p>연암서당골과 대구의 골목, 식당, 하루의 생활을 현장 노트로 남겼다.</p></div>
    <div><span>02 / DRAW & SOUND</span><strong>손그림과 음악으로 옮기다</strong><p>음식과 도시 인물을 그리며 기존의 음악 작업을 같은 전시 안에 배치했다.</p></div>
    <div><span>03 / CONTINUE</span><strong>남은 계획을 명시하다</strong><p>연암서당골 노래, 골목의 소리, 지역 주민과의 공동 기록 등 후속 작업의 가능성을 열어 두었다.</p></div>
  </div>
  <div class="daegu-ending"><p>OFFITA / SCORCHED MODERN</p><strong>한 도시를 다 안다고 말할 수 없기에,<br>다음 질문을 남긴다.</strong><a href="{{ '/projects/' | relative_url }}">다른 프로젝트 보기 ↗</a></div>
</section>
