# 수달공방 랜딩 프론트엔드 (교체용)

이 폴더는 화면(HTML·CSS·JS)과 이미지·영상·폰트만 들어 있어요. 백엔드 코드는 없어요.

## 들어 있는 것
- `index.html` — 랜딩 페이지 전체 (CSS·JS가 파일 안에 같이 있음)
- `questions.js` — 접었다 펴는 "의견 남기기" 5문항 정의
- `assets/` — 페이지가 쓰는 이미지·영상·아이콘·OG 이미지
- `assets/fonts/jua/` — 제목 폰트(Jua) 셀프호스팅 파일

## 백엔드와 연결되는 지점 (여기만 맞추면 됨)
페이지는 `index.html` 안의 `post()` 함수에서 **`POST /api/survey`** 로 JSON을 보내요.
응답이 2xx면 성공, 아니면 `{ "error": "메시지" }`의 메시지를 화면에 보여 줘요.

1) 출시 알림 신청 (첫 화면 폼, 하단 폼 두 곳)
```json
{ "kind": "signup", "email": "a@b.com", "os": ["Windows","macOS"], "beta": true,
  "consent": true, "ref": "insta", "from": "hero|launch", "website": "" }
```
2) 의견 남기기 (접었다 펴는 폼)
```json
{ "kind": "feedback", "answers": { "intent": 4, "likes": ["..."], "next": "...", "ads": "...", "comment": "..." },
  "ref": "insta", "website": "" }
```
- `website`는 봇 방지용 숨은 칸이에요. 값이 있으면 저장하지 말고 성공처럼 응답하면 돼요.
- `ref`는 링크 뒤 `?ref=xxx` 값(유입 경로)이에요.
