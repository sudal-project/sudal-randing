interface LaunchMailInput {
  siteUrl: string;
  unsubscribeUrl: string;
}

export function buildLaunchMail({ siteUrl, unsubscribeUrl }: LaunchMailInput): {
  subject: string;
  html: string;
} {
  const subject = "수달공방이 출시됐어요";

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #222;">
      <p>안녕하세요, 수달공방이에요.</p>
      <p>기다려 주신 수달공방이 드디어 출시됐어요. 공부 시간은 집으로, 완성한 집은 나만의 마을로 남는 데스크톱 타이머예요.</p>
      <p style="margin: 24px 0;">
        <a href="${siteUrl}" style="display: inline-block; padding: 12px 20px; background: #222; color: #fff; text-decoration: none; border-radius: 8px;">
          수달공방 받으러 가기
        </a>
      </p>
      <p>출시 알림을 신청해 주셔서 고마워요.</p>
      <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #888;">
        수달공방 출시 알림을 신청하셔서 이 메일을 받았어요.<br />
        더 이상 받고 싶지 않으시면 <a href="${unsubscribeUrl}" style="color: #888;">수신 거부</a>를 눌러 주세요.
      </p>
    </div>
  `.trim();

  return { subject, html };
}
