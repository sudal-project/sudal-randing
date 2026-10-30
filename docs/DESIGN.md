# 디자인 기준

기준 시안: `docs/reference/prototype/index.html` (+ `questions.js`, `HANDOFF.md`). 이 파일의 CSS와 동작을 Next.js 컴포넌트로 옮겼다.
시안은 이미지를 `/assets/...`로 불러서 파일로 바로 열면 그림이 안 보인다. 실제 모습은 `npm run dev`로 확인한다.

## 방향
- 밝고 따뜻한 톤. 앱 마을 화면의 모래색 땅, 나무, 벽돌색 버튼, 빨강·초록 지붕에서 색을 가져왔다.
- 실제 앱 화면(영상·캡처)을 창 테두리(MacFrame) 안에 넣어 보여 준다.

## 토큰 (`app/globals.css`)
- 랜딩 토큰은 `.landing`(페이지 바깥 div) 범위에만 정의한다. 관리자·수신 거부 화면은 위쪽 기존 토큰을 그대로 쓴다.
- 다크는 `prefers-color-scheme: dark` 블록에서 같은 이름의 토큰을 덮는다.
- 글자색과 바탕색을 같은 토큰으로 쓰지 않는다. 다크에서 뒤집히기 때문이다.
  - 제목 글자 `--heading`, 진한 바탕(타이머·푸터·신청 상자 테두리) `--wood-dark`
  - 강조 버튼 위 글자 `--on-accent`, 입력창 바탕 `--field`, 선택된 칩 `--opt-on` / `--opt-on-ink`

| 토큰 | 라이트 | 다크 | 쓰임 |
|---|---|---|---|
| --sky | #fbe9d6 | #1d1712 | 페이지 바탕 |
| --paper | #fff8ec | #28201a | 카드, 밝은 섹션 바탕 |
| --ink / --ink-soft | #3a2414 / #6f5440 | #f3e7d6 / #bba792 | 본문 / 보조 글자 |
| --heading | #4b2b17 | #f6e2c4 | 제목 |
| --brick | #d0713a | #d9733a | 버튼, 진행 막대 |
| --roof-red / --roof-green | #c95b45 / #5f9e8c | #ec8a72 / #7cc2ae | 첫 화면 제목 2·3줄 |
| --wood / --wood-dark | #8a5532 / #4b2b17 | #3a281b / #140e0a | 보드·신청 영역 / 타이머·푸터 |
| --line | #e5cfb1 | #3d3128 | 테두리 |
| --river / --river-deep | #4f8fb3 / #2f6a8c | #7cc3d2 / #9ccfe6 | 포커스 링 / 링크·태그 글자 |

나머지(줄무늬, 실루엣, 창 테두리 등)는 `globals.css`의 `.landing` 블록에 이름별로 있다.

## 글꼴
- 제목: Jua (`public/assets/fonts/jua/jua.css`, 셀프 호스팅)
- 본문: Pretendard (jsDelivr CDN)
- 관리자·수신 거부 화면은 기존 next/font(Jua, IBM Plex Sans KR)를 쓴다.

## 섹션 순서 (`app/page.tsx`)
1. **Header** (sticky): 아이콘 + 수달공방 / "출시 알림 받기" → 첫 화면 신청 폼(`#signup`). 스크롤하면 그림자 (CSS 스크롤 타임라인, 지원 안 하는 브라우저는 그림자 없음)
2. **Hero**: 제목·소개 문구 / 오른쪽에 펼쳐 둔 나무 게시판 신청 상자(이메일, OS, 테스트 참여, 동의) / 아래 마을 장면(BuildScene)과 진행 보드
3. **Together**: 바탕화면 수달 영상 + 기능 문구(핵심은 형광펜 `==…==`) / 아래에 작업·졸림·휴식·깜짝 4가지 상태를 작은 카드 한 줄로
4. **Village**: "30분에 집 한 채"부터 지난 마을 영상, 기록 캡처 (마을이 지어지는 영상은 첫 화면과 겹쳐 뺌)
5. **Privacy**: "수달은 공부 내용을 보지 않아요"
6. **Roadmap**: V1(첫 버전 강조) ~ V5, 앞 버전은 실루엣
7. **Mobile**: V6 "컴퓨터를 꺼도, 수달은 계속 일해요" — 폰 예시 화면 + 두 줄 설명
8. **Launch** (`#launch`): 출시 후에만 보이는 다운로드 상자
9. **Footer**

`RELEASE_STAGE=released`이면 Header·Hero·Launch·Footer가 다운로드 안내로 바뀐다.

## 움직임 (클라이언트 컴포넌트, `components/scenes/`)
- **BuildScene**: 120ms마다 1%씩 집을 짓는다. 단계 경계 0/20/45/70/100%, 단계가 바뀌면 pop. 수달은 10%마다 도끼↔통나무, 완성이면 앉은 수달. 완성 뒤 잠깐 멈췄다 처음부터. 공부 시간은 1%에 18초씩 오른다.
- **LoopVideo**: 소리 없는 반복 영상 + 멈춤/재생 버튼.
- `prefers-reduced-motion`이면 모두 멈춘다: BuildScene은 45% 상태로 고정, 영상은 멈춘 채 시작.

## 수달 그림 규칙
- 수달·집은 `public/assets/`의 프로젝트 그림(`otter_*.png`, `house_*.png`)만 쓴다. 새로 그리지 않는다.

## 폼 (`components/waitlist/SignupForm.tsx`)
- 저장은 `app/actions.ts`의 `joinWaitlist`를 그대로 부른다.
- OS는 체크박스지만 DB에는 하나만 저장된다. 하나만 고르면 그 값, 둘 다 고르거나 안 고르면 비워 보낸다.
- 잘못된 이메일·동의 누락은 칸 아래 메시지. 완료되면 폼 자리에 완료 카드, 중복이면 "이미 신청하셨어요" 카드.
- "자세히 보기"를 펼치면 수집 항목·이용 목적·보관 기간.
- 숨은 칸(website)에 값이 있으면 저장하지 않고 성공처럼 보인다.
- 의견 남기기(5문항 설문)는 보류. `docs/PLAN.md` "나중에" 참고.

## 반응형
- 900px 이하: 로드맵 세로, 로드맵 달리는 수달 숨김
- 860px 이하: 히어로·Together·Village 1열, 상태 2열, 보드 1열
- 520px 이하: 한 줄 폼이 세로로, 글자 16px, 좌우 여백 16px
- 가로 스크롤 없음
