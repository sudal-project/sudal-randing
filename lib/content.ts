export const brand = {
  name: "수달공방",
  nameEn: "Otter Workshop",
  icon: "/assets/icon.png",
};

export const meta = {
  siteUrl: "https://chungs.store",
  title: "수달공방 - 공부 시간은 집으로, 완성한 집은 나만의 마을로",
  description:
    "공부를 시작하면 바탕화면 한쪽에서 수달이 같이 일해요. 공부한 시간만큼 수달이 집을 짓고, 집이 모이면 마을이 돼요. Windows·macOS 데스크톱 공부 타이머, 출시 준비 중.",
  ogDescription: "바탕화면에서 같이 일하는 수달과 공부하는 데스크톱 앱. 출시 알림을 신청해 주세요.",
  ogImage: "/assets/og.jpg?v=10261300",
  themeColor: "#fbe9d6",
  themeColorDark: "#1d1712",
};

export const header = {
  ctaLabel: "출시 알림 받기",
  ctaLabelReleased: "다운로드",
  ctaHref: "#signup",
};

export const hero = {
  tag: "Windows · macOS 데스크톱 공부 타이머 · 출시 준비 중",
  tagReleased: "Windows · macOS 데스크톱 공부 타이머",
  heading: ["공부 시간은 집으로,", "완성한 집은", "나만의 마을로."],
  lede: "공부를 시작하면 바탕화면 한쪽에서 수달이 같이 일해요. 내가 공부한 시간만큼 수달이 집을 짓고, 집이 모이면 마을이 돼요.",
  promise: ["출시하는 날, 이 메일로 가장 먼저 알려드려요", "알림 말고 다른 메일은 보내지 않아요"],
  promiseReleased: ["지금 바로 내려받아 시작할 수 있어요", "Windows · macOS 모두 지원해요"],
};

export const buildScene = {
  ariaLabel: "수달이 마을의 빈 땅에 집을 짓고 있는 장면",
  heading: "1번째 마을 · 2번째 집 짓는 중",
  timerLabel: "공부 중",
  chips: ["터 다지기", "뼈대", "벽", "지붕", "완성"],
  marks: [0, 20, 45, 70, 100],
  stageImages: [
    "/assets/house_0.png",
    "/assets/house_1.png",
    "/assets/house_2.png",
    "/assets/house_3_green.png",
    "/assets/house_4_green.png",
  ],
  doneHouse: "/assets/house_4_red.png",
  otter: {
    axe: "/assets/otter_axe.png",
    log: "/assets/otter_log.png",
    rest: "/assets/otter_full.png",
  },
};

export const together = {
  heading: ["말 걸지 않고,", "옆에만 있어 줘요"],
  lead: "친구랑 같이 공부하면 집중이 잘 되는 건 대화 때문이 아니라 누군가 옆에서 같이 하고 있어서예요. 수달공방은 그 자리를 수달이 채워요.",
  facts: [
    "공부 시작을 누르면 수달이 바탕화면 한쪽에 나와 나무를 나르고 망치질을 해요.",
    "인강, 유튜브, 코딩처럼 화면을 보며 공부해도 다른 창을 가리지 않아요.",
    "수달 크기와 처음 나올 자리는 설정에서 고르고, 더블클릭하면 작게 접혀요.",
  ],
  video: {
    title: "바탕화면",
    src: "/assets/overlay.mp4?v=10231120",
    poster: "/assets/overlay_poster.jpg?v=10231120",
    label: "수달공방 창 옆 바탕화면에서 수달이 망치질하고, 졸고, 잠들었다 깨는 모습",
  },
};

export const states = {
  heading: ["타이머를 안 눌러도", "수달이 알아서 알아채요"],
  lead: "키보드와 마우스를 쓰는지로 공부 중인지 판단해요. 자리를 비우면 감시하는 대신 수달이 꾸벅꾸벅 졸다가 잠들어요.",
  items: [
    {
      image: "/assets/otter_axe.png",
      alt: "망치질하는 수달",
      title: "작업",
      when: "공부 중",
      text: "나무를 나르고 망치질하며 집을 지어요. 공부 시간이 쌓여요.",
    },
    {
      image: "/assets/otter_drowsy.png",
      alt: "하품하는 수달",
      title: "졸림",
      when: "입력 없이 5분",
      text: "하품하며 꾸벅꾸벅 졸아요. 공부 시간은 계속 인정돼요.",
    },
    {
      image: "/assets/otter_sleep.png",
      alt: "웅크려 자는 수달",
      title: "휴식",
      when: "10분 또는 휴식 버튼",
      text: "웅크려 잠들고 집 짓기도 멈춰요. 휴식 시간은 따로 기록돼요.",
    },
    {
      image: "/assets/otter_surprise.png",
      alt: "깜짝 놀란 수달",
      title: "깜짝",
      when: "다시 입력하면",
      text: "화들짝 깨어나서 하던 일을 다시 시작해요.",
    },
  ],
};

export const stages = {
  heading: "30분 공부하면 집 한 채",
  lead: "목표를 정할 필요가 없어요. 공부한 만큼 집이 한 단계씩 올라가고, 남은 시간은 다음 집으로 넘어가요.",
  note: "지붕 색은 집마다 빨강, 초록으로 달라져요. 집 한 채에 걸리는 시간은 설정에서 바꿀 수 있어요.",
  runner: { run: "/assets/otter_run.png", sit: "/assets/otter_full.png" },
  items: [
    { image: "/assets/house_0.png", name: "터 다지기", pct: "0%" },
    { image: "/assets/house_1.png", name: "뼈대", pct: "20%" },
    { image: "/assets/house_2.png", name: "벽", pct: "45%" },
    { image: "/assets/house_3_red.png", name: "지붕", pct: "70%" },
    { image: "/assets/house_4_red.png", name: "완성", pct: "100%" },
  ],
};

export const village = {
  heading: "앱을 꺼도 마을은 남아요",
  lead: "완성한 집은 마을에 하나씩 모이고, 여섯 채가 차면 다음 마을이 열려요. 다 지은 마을은 지난 마을에 그대로 남고, 다시 켜면 짓던 집부터 이어서 지어요. 날마다 얼마나 공부했는지는 달력에 남아요.",
  shots: [
    {
      kind: "video",
      wide: true,
      title: "수달공방 · 마을",
      src: "/assets/village2.mp4?v=10231120",
      poster: "/assets/village2_poster.jpg?v=10231120",
      label: "공부 시간에 따라 마을에 빨간 지붕과 초록 지붕 집이 지어지는 화면",
      caption: "공부하는 동안 마을에 집이 하나씩 올라가요. 지붕은 빨강, 초록으로 번갈아 올라가요.",
    },
    {
      kind: "video",
      wide: false,
      title: "수달공방 · 지난 마을",
      src: "/assets/pastvillage.mp4?v=10231120",
      poster: "/assets/pastvillage_poster.jpg?v=10231120",
      label: "여섯 채를 채운 1번째 마을이 완성되고, 지난 마을에서 다시 볼 수 있는 화면",
      caption: "여섯 채를 채우면 마을이 완성돼요. 완성한 마을은 지난 마을에서 언제든 다시 볼 수 있어요.",
    },
    {
      kind: "image",
      wide: false,
      title: "수달공방 · 기록",
      src: "/assets/shot_record.webp?v=10231120",
      poster: "",
      label: "월별 공부 시간 달력 화면",
      caption: "공부 기록. 날짜를 누르면 그날 공부한 세션이 보여요.",
    },
  ],
} as const;

export const privacy = {
  image: "/assets/otter_peek.png",
  heading: "수달은 공부 내용을 보지 않아요",
  items: [
    {
      icon: "keyboard",
      title: "키보드와 마우스를 쓰고 있는지만 확인해요.",
      text: "무엇을 입력했는지는 보지 않아요.",
    },
    {
      icon: "clock",
      title: "영상을 보거나 종이책을 읽을 때는 휴식으로 바뀔 수 있어요.",
      text: "입력이 없기 때문이에요. 졸림과 휴식까지 걸리는 시간은 설정에서 늘릴 수 있어요.",
    },
    {
      icon: "home",
      title: "공부 기록은 내 컴퓨터에 저장돼요.",
      text: "계정도, 서버로 보내는 기록도 없어요.",
    },
  ],
} as const;

export const roadmap = {
  heading: "앞으로 지을 것들",
  lead: "마을은 계속 넓어져요. 첫 버전은 집 짓기와 공부 기록부터 시작해요.",
  note: "다음 기능의 순서는 신청해 주신 분들의 의견을 듣고 정해요.",
  runner: "/assets/otter_run.png",
  versions: [
    {
      v: "V1",
      badge: "첫 버전",
      title: "집 짓기와 공부 기록",
      items: ["바탕화면 수달과 자동 측정", "집 짓기와 마을", "월별 공부 기록 달력"],
    },
    { v: "V2", title: "마을 둘러보기", items: ["마을 확대·축소, 화면 이동", "집마다 공부 기록 연결", "주간·월간 리포트"] },
    { v: "V3", title: "기록 남기고 공유", items: ["마을과 공부 시간 인증 사진", "스토리·피드 비율로 저장", "과목과 메모 남기기"] },
    { v: "V4", title: "꾸미기와 상점", items: ["공부 시간으로 모으는 재화", "집과 수달 꾸미기 아이템"] },
    { v: "V5", title: "함께 공부", items: ["친구 수달과 같이 공부", "친구 마을 놀러 가기", "공부 시간을 모아 공동 건물 짓기"] },
  ],
};

export const launch = {
  peek: "/assets/otter_peek.png",
  sign: "출시 준비 중",
  heading: ["출시되면", "가장 먼저 알려드릴게요"],
  lead: "수달공방은 아직 출시 전인 Windows · macOS 데스크톱 앱이에요. 지금 신청하면 출시하는 날 메일로 알려드려요. 앱을 내려받거나 결제하는 절차는 없어요.",
};

export const downloadSection = {
  sign: "출시했어요",
  heading: ["수달공방을", "지금 만나보세요"],
  lead: "Windows · macOS에서 내려받아 바로 시작할 수 있어요.",
  ctaLabel: "다운로드",
};

export const signupForm = {
  emailLabel: "이메일",
  launchPlaceholder: "you@example.com",
  osLabel: "사용하는 OS",
  osOptions: [
    { value: "windows", label: "Windows" },
    { value: "macos", label: "macOS" },
  ],
  betaLabel: "출시 전 테스트에 참여하고 싶어요",
  betaFine: "(선택)",
  consentLabel: "(필수) 개인정보 수집·이용에 동의합니다",
  more: "자세히 보기",
  less: "접기",
  launchCta: "출시 알림 신청하기",
  pendingCta: "신청하는 중…",
  invalidEmail: "이메일 주소를 확인해 주세요.",
  needConsent: "알림을 받으려면 동의가 필요해요.",
  error: "신청하지 못했어요. 잠시 후 다시 시도해 주세요.",
  doneImage: "/assets/otter_smile.png",
  doneTitle: "신청됐어요",
  doneText: (email: string) => `출시하는 날 ${email}로 알려드릴게요.`,
  duplicateTitle: "이미 신청하셨어요",
  duplicateText: "출시하는 날 이 메일로 알려드릴게요.",
};

export const policy = {
  rows: [
    { term: "수집 항목", desc: "이메일, 사용하는 OS, 테스트 참여 희망 여부" },
    { term: "이용 목적", desc: "출시 알림, 테스트 참여 안내" },
    { term: "보관 기간", desc: "출시 알림을 보낸 뒤 바로 삭제해요" },
  ],
  note: "동의하지 않을 수 있지만, 그러면 출시 알림을 받을 수 없어요.",
};

export const footer = {
  copyright: "© 2026 수달공방 (Otter Workshop)",
  tagline: "Windows · macOS 데스크톱 앱 · 출시 준비 중",
  taglineReleased: "Windows · macOS 데스크톱 앱",
};

export const unsubscribedPage = {
  title: "수신 거부 완료",
  heading: "수신 거부가 완료됐어요",
  lead: "수달공방 출시 알림 메일을 더 이상 보내지 않을게요.",
  backHref: "/",
  backLabel: "다시 홈으로",
};
