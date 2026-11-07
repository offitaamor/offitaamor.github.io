---
layout: daegu-exhibition
permalink: /daegu-onna/
title: "SCORCHED MODERN — 대구에서 바라본 것들"
category: "EXHIBITION / LOCAL / MUSIC & VISUAL"
year: "2026"
role: "Artist / Illustration / Music / Exhibition Archive"
medium: "Drawing / Music / Field Notes / Print"
client: "대굴대굴 대구온나 로컬벤처 3차 · 연암서당골"
summary: "대구의 음식과 인상을 인물로 그리고, 연암서당골에서 보낸 하루와 음악 작업을 함께 기록한 OFFITA의 체류 전시."
cover: "/assets/uploads/projects/daegu-onna/cover.webp"
featured: true
---
<section class="d-intro d-container" aria-label="전시 소개">
  <span class="d-index">EXHIBITION NOTE / 00</span>
  <div>
    <h2>내가 바라본<br>대구의 한 장면.</h2>
    <p>대상을 마주할 때 느낀 정서와 색은 무의식 속에 남는다. 작업실로 돌아와 그 기억을 꺼내 질문했다. <strong>대구의 음식이 사람이 된다면? 이 도시에서 만난 색은 무엇일까?</strong> 그 물음은 그림과 음악, 한 장의 기록으로 이어졌다.</p>
    <p>이 전시는 짧은 체류에서 출발한 작가 개인의 시선이다. 대구를 오래 살아온 사람들의 시선과 답을 기다리며, 완성한 작품과 아직 남은 질문을 함께 놓는다.</p>
  </div>
</section>

<section class="d-color" id="city" aria-labelledby="color-title">
  <div class="d-container">
    <div class="d-section-head"><span>01 / COLOR ARCHIVE</span><h2 id="color-title">빛바랜 표면,<br>그 안에 남은 온기.</h2></div>
    <div class="d-color__grid">
      <a class="d-color__image" href="{{ '/assets/uploads/projects/daegu-onna/color-archive.webp' | relative_url }}" target="_blank" rel="noopener" aria-label="대구 도시 색채 아카이브 전체 보기"><img src="{{ '/assets/uploads/projects/daegu-onna/color-archive.webp' | relative_url }}" alt="그을린 모던 대구 도시 색채 아카이브: 도시 상징과 겨자빛, 베이지, 낡은 회색, 먹빛, 검정의 다섯 색" loading="lazy" decoding="async"><span>색채 아카이브 전체 보기 ↗</span></a>
      <div class="d-color__story">
        <p class="d-small-label">SCORCHED MODERN / FIVE COLORS</p>
        <p>오래된 간판의 겨자빛, 볕에 바랜 벽의 베이지, 세월이 묻은 회색과 먹빛. 그 안에 남은 열기를 다섯 색으로 정리했다.</p>
        <div class="d-swatches" aria-label="대구의 다섯 색">
          <div><i style="background:#D4B252"></i><span>겨자빛<small>#D4B252</small></span></div>
          <div><i style="background:#E4D5BD"></i><span>베이지<small>#E4D5BD</small></span></div>
          <div><i style="background:#A9A293"></i><span>낡은 회색<small>#A9A293</small></span></div>
          <div><i style="background:#4E4A45"></i><span>먹빛<small>#4E4A45</small></span></div>
          <div><i style="background:#2B2B2B"></i><span>검정<small>#2B2B2B</small></span></div>
        </div>
        <p class="d-color__note">이미지 속 도시 상징은 OFFITA의 개인적인 시각 해석이며 대구광역시의 공식 상징이 아닙니다.</p>
      </div>
    </div>
  </div>
</section>

<section class="d-art d-container" id="artworks" aria-labelledby="art-title">
  <div class="d-section-head"><span>02 / SESSION 01 · CITY &amp; TASTE</span><h2 id="art-title">음식이 사람이 되고,<br>도시가 인물이 되다.</h2></div>
  <p class="d-section-intro">대구 음식 7점과 도시 인물 2점. 손그림의 선과 평면적인 색, 제목과 사투리를 하나의 시리즈로 묶었다. 작품을 누르면 크게 볼 수 있습니다.</p>
  <div class="d-art__grid">
    {% for work in site.data.daegu_onna.food %}
    <figure class="d-art__item"><a href="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" target="_blank" rel="noopener" aria-label="{{ work.title }} 크게 보기"><img src="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" alt="{{ work.title }} — OFFITA 대구 음식 의인화 작품" loading="lazy" decoding="async"></a><figcaption><span>{{ forloop.index | prepend: '0' | slice: -2, 2 }} / FOOD PORTRAIT</span><strong>{{ work.title }}</strong><p>{{ work.caption }}</p></figcaption></figure>
    {% endfor %}
  </div>
  <div class="d-art__people-head"><span>DAEGU CITY PORTRAITS</span><h3>내가 바라본 대구의 사람들</h3></div>
  <div class="d-art__grid d-art__grid--people">
    {% for work in site.data.daegu_onna.people %}
    <figure class="d-art__item"><a href="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" target="_blank" rel="noopener" aria-label="{{ work.title }} 크게 보기"><img src="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" alt="{{ work.title }} — OFFITA 도시 인물화" loading="lazy" decoding="async"></a><figcaption><span>0{{ forloop.index }} / CITY PORTRAIT</span><strong>{{ work.title }}</strong><p>{{ work.caption }}</p></figcaption></figure>
    {% endfor %}
  </div>
</section>

<section class="d-village" id="village" aria-labelledby="village-title"><div class="d-container">
  <div class="d-section-head"><span>03 / SESSION 02 · FIELD ARCHIVE</span><h2 id="village-title">연암서당골에서<br>보낸 하루.</h2></div>
  <p class="d-section-intro">밥을 만들고, 성경을 읽고, 할 일을 적고, 그림과 음악을 만들었다. 골목을 걷고 대구의 음식을 만났다. 매일 같지는 않았지만 체류 중 반복된 생활의 리듬이다.</p>
  <div class="d-field">
    <figure><img src="{{ '/assets/uploads/projects/daegu-onna/field-breakfast.webp' | relative_url }}" alt="연암서당골 숙소에서 직접 만든 아침 식사" loading="lazy"><figcaption><b>06:00</b> 직접 만든 아침 식사</figcaption></figure>
    <figure><img src="{{ '/assets/uploads/projects/daegu-onna/field-sketch.webp' | relative_url }}" alt="대구 인물화를 구상한 작업 노트의 초기 스케치" loading="lazy"><figcaption><b>08:00</b> 그림을 스케치하고 음악을 만들다</figcaption></figure>
    <figure><img src="{{ '/assets/uploads/projects/daegu-onna/field-yeonam.webp' | relative_url }}" alt="연암서당골에서 바라본 골목과 건물" loading="lazy"><figcaption><b>오후</b> 골목을 걸으며 관찰하다</figcaption></figure>
    <figure><img src="{{ '/assets/uploads/projects/daegu-onna/field-food.webp' | relative_url }}" alt="대구에서 먹은 야끼우동" loading="lazy"><figcaption><b>저녁</b> 음식에서 작품의 색을 찾다</figcaption></figure>
  </div>
  <p class="d-field__note">위 사진은 전시 설치 전경이 아니라 세션 02의 인쇄물에 수록된 체류·작업 기록입니다.</p>
  <blockquote>“당신이 느껴온 대구의 색깔은 어떤가요?”<span>전시장에서 관람객에게 건넨 질문</span></blockquote>
</div></section>

<section class="d-music d-container" id="music" aria-labelledby="music-title">
  <div class="d-section-head"><span>04 / SESSION 03 · RECORD ARCHIVE</span><h2 id="music-title">그림 곁에<br>노래를 놓다.</h2></div>
  <p class="d-section-intro">OFFITA가 만든 음악의 앨범 아트워크 여섯 점. 음악을 색·영감·소리로 풀어 쓴 카드와 함께, 한 작가의 두 창작 언어가 만나는 공간이다.</p>
  <div class="d-music__grid">
    {% for work in site.data.daegu_onna.music %}
    <figure><a href="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" target="_blank" rel="noopener" aria-label="{{ work.title }} 아트워크 크게 보기"><img src="{{ '/assets/uploads/projects/daegu-onna/' | append: work.image | append: '.webp' | relative_url }}" alt="{{ work.title }} 앨범 아트워크" loading="lazy" decoding="async"></a><figcaption>{{ work.title }}</figcaption></figure>
    {% endfor %}
  </div>
  <div class="d-notes">
    <div><span class="d-small-label">MUSIC &amp; FOOD TASTING NOTES</span><h3>한 장의 카드에<br>소리와 맛을 기록하다.</h3><p>음악의 장르·영감·소리와 대구 음식의 색·인상·맛을 정리한 카드 14종. 아래를 열어 전부 살펴볼 수 있습니다.</p></div>
    <div class="d-notes__samples"><img src="{{ '/assets/uploads/projects/daegu-onna/card-humming.webp' | relative_url }}" alt="Humming in the rain 음악 테이스팅 카드" loading="lazy"><img src="{{ '/assets/uploads/projects/daegu-onna/card-gizzard.webp' | relative_url }}" alt="대구 닭똥집튀김 음식 테이스팅 카드" loading="lazy"></div>
  </div>
  <details class="d-cards"><summary>테이스팅 카드 14종 모두 보기 <span aria-hidden="true">＋</span></summary><div class="d-cards__grid">
    {% for card in site.data.daegu_onna.cards %}
    <figure><a href="{{ '/assets/uploads/projects/daegu-onna/card-' | append: card.image | append: '.webp' | relative_url }}" target="_blank" rel="noopener" aria-label="{{ card.title }} 카드 크게 보기"><img src="{{ '/assets/uploads/projects/daegu-onna/card-' | append: card.image | append: '.webp' | relative_url }}" alt="{{ card.title }} 테이스팅 카드" loading="lazy" decoding="async"></a><figcaption>{{ card.title }}</figcaption></figure>
    {% endfor %}
  </div></details>
  <a class="d-music__link" href="{{ '/music/' | relative_url }}">음악과 발매 정보 더 보기 ↗</a>
</section>

<section class="d-outro" aria-labelledby="outro-title"><div class="d-container">
  <span class="d-small-label">05 / PROCESS &amp; WHAT REMAINS</span>
  <h2 id="outro-title">완성한 작업과<br>아직 남은 질문.</h2>
  <p>직접 그린 원화를 다듬고 인쇄물과 음악 카드로 확장했다. AI로 그림체를 구현하고 음식의 형태를 3D로 옮기는 실험에는 여전히 해결할 문제가 있다. 연암서당골의 노래와 골목의 소리, 주민과 함께 남길 기록은 다음 작업의 가능성으로 적어 두었다.</p>
  <div class="d-outro__line"><span>OBSERVE</span><span>DRAW &amp; SOUND</span><span>CONTINUE</span></div>
  <a href="{{ '/projects/' | relative_url }}">OFFITA의 다른 작업 보기 ↗</a>
</div></section>
