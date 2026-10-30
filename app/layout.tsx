import type { Metadata } from "next";
import { Jua, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jua",
});

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans-kr",
});

export const metadata: Metadata = {
  title: "수달공방 - 출시 알림 신청",
  description:
    "공부 시간은 집으로, 완성한 집은 나만의 마을로. 바탕화면에서 수달과 함께 공부하는 데스크톱 타이머, 수달공방의 출시 알림을 신청해요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${jua.variable} ${ibmPlexSansKr.variable}`}>
      <head>
        {/* 랜딩 시안 글꼴: 제목 Jua(셀프 호스팅), 본문 Pretendard */}
        <link rel="stylesheet" href="/assets/fonts/jua/jua.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      {/* 브라우저 확장(Grammarly 등)이 body에 속성을 붙여도 hydration 경고를 내지 않게 한다 */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
