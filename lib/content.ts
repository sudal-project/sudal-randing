export const brand = {
  name: "수달공방",
  nameEn: "OTTER WORKSHOP",
};

export const header = {
  ctaLabel: "출시 알림 받기",
  ctaHref: "#join",
};

export const demoWindow = {
  titlebar: "인강 · 자료구조 3강",
  title: "스택과 큐",
  subtitle: "LIFO · FIFO 구조 비교",
};

export const hero = {
  eyebrow: "Windows · macOS 데스크톱 공부 타이머 · 출시 준비 중",
  heading: [
    { text: "공부 시간은 집으로,", mark: false },
    { text: "완성한 집은", mark: true },
    { text: "나만의 마을로.", mark: true },
  ],
  lede: "공부를 시작하면 바탕화면 한쪽에서 수달이 같이 일해요. 내가 공부한 시간만큼 수달이 집을 짓고, 집이 모이면 마을이 돼요.",
  ticks: ["출시하는 날, 이 메일로 가장 먼저 알려드려요", "알림 말고 다른 메일은 보내지 않아요"],
};

export const deskDemoHints = {
  work: "마우스와 키보드를 잠깐 멈춰 보세요. 5초면 수달이 졸기 시작해요.",
  sleepy: "졸고 있어요. 공부 시간은 아직 쌓이는 중이에요. 10초가 지나면 잠들어요. (실제 앱은 5분 · 10분)",
  sleep: "잠들었어요. 공부 시간이 멈췄어요. 마우스를 움직여 깨워 보세요. (실제 앱은 5분 · 10분)",
  surprise: "깼어요! 다시 집을 지으러 가요. (실제 앱은 5분 · 10분)",
} as const;

export const deskDemoStateText = {
  work: "공부 중",
  sleepy: "졸림 · 공부 중",
  sleep: "자동 휴식",
  surprise: "깨어나는 중",
} as const;

export type OtterStateId = "idle" | "work" | "sleepy" | "sleep" | "surprise";

export interface OtterState {
  id: OtterStateId;
  image: string;
  alt: string;
  label: string;
  chip: string;
  chipOn: boolean;
  description: string;
}

export const otterStatesSection = {
  eyebrow: "수달 상태",
  heading: "내가 공부하는 동안,\n수달도 옆에서 일해요",
  lead: "키보드와 마우스 입력이 멈추면 수달도 졸다가 잠들어요. 다시 손을 움직이면 깜짝 놀라 깨어나서 하던 일을 이어가요.",
};

export const otterStates: OtterState[] = [
  {
    id: "idle",
    image: "/assets/otter/idle.webp",
    alt: "가만히 앉아 있는 수달",
    label: "대기",
    chip: "공부 전",
    chipOn: false,
    description: "공부를 시작하기 전에는 마을에서 기다려요.",
  },
  {
    id: "work",
    image: "/assets/otter/work.webp",
    alt: "망치로 통나무를 다듬는 수달",
    label: "작업",
    chip: "공부 시간 쌓임",
    chipOn: true,
    description: "공부를 시작하면 바탕화면에 나와 집을 지어요.",
  },
  {
    id: "sleepy",
    image: "/assets/otter/sleepy.webp",
    alt: "하품하며 조는 수달",
    label: "졸림",
    chip: "무입력 5분",
    chipOn: true,
    description: "입력이 한동안 없으면 꾸벅꾸벅 졸아요. 공부 시간은 계속 쌓여요.",
  },
  {
    id: "sleep",
    image: "/assets/otter/sleep.webp",
    alt: "엎드려 자는 수달",
    label: "잠듦",
    chip: "무입력 10분 · 휴식",
    chipOn: false,
    description: "더 오래 멈추거나 휴식 버튼을 누르면 잠들고, 공부 시간도 멈춰요.",
  },
  {
    id: "surprise",
    image: "/assets/otter/surprise.webp",
    alt: "눈이 동그래진 수달",
    label: "깜짝 놀람",
    chip: "다시 입력하면",
    chipOn: true,
    description: "손을 움직이면 0.5초 동안 깜짝 놀라고, 다시 일하러 가요.",
  },
];

export type HouseStageId = "stage1" | "stage2" | "stage3" | "stage4" | "stage5";

export interface HouseStage {
  id: HouseStageId;
  image: string;
  alt: string;
  label: string;
  pct: number;
  chipOn: boolean;
  description: string;
}

export const houseStages: HouseStage[] = [
  {
    id: "stage1",
    image: "/assets/house/stage1.webp",
    alt: "통나무 몇 개",
    label: "터 다지기",
    pct: 0,
    chipOn: false,
    description: "통나무를 모아 자리를 잡아요.",
  },
  {
    id: "stage2",
    image: "/assets/house/stage2.webp",
    alt: "둥근 나무 뼈대",
    label: "뼈대",
    pct: 20,
    chipOn: false,
    description: "둥근 나무 뼈대를 세워요.",
  },
  {
    id: "stage3",
    image: "/assets/house/stage3.webp",
    alt: "나무 벽을 두른 집",
    label: "벽",
    pct: 45,
    chipOn: false,
    description: "나무 벽을 두르고 문을 내요.",
  },
  {
    id: "stage4",
    image: "/assets/house/stage4.webp",
    alt: "지붕을 올린 집",
    label: "지붕",
    pct: 70,
    chipOn: false,
    description: "기와 지붕과 굴뚝을 올려요.",
  },
  {
    id: "stage5",
    image: "/assets/house/stage5.webp",
    alt: "창문과 꽃으로 꾸민 완성된 집",
    label: "완성",
    pct: 100,
    chipOn: true,
    description: "창에 불이 켜지고 꽃이 피어요.",
  },
];

export const restScene = {
  ariaLabel: "수달 상태 자동 재생 장면",
  captions: [
    "공부를 시작하기 전에는 마을에서 기다려요.",
    "공부를 시작하면 수달이 바탕화면에 나와 집을 지어요. 공부 시간이 쌓여요.",
    "키보드·마우스 입력이 5분 동안 없으면 꾸벅꾸벅 졸아요. 공부 시간은 계속 쌓여요.",
    "10분이 지나면 잠들어요. 이때부터 공부 시간이 멈춰요.",
    "다시 손을 움직이면 깜짝 놀라 깨고, 하던 일을 이어가요.",
  ],
};

export const houseScene = {
  ariaLabel: "집 짓기 자동 재생 장면",
  captions: [
    "공부를 시작하면 터를 다지는 것부터 시작해요.",
    "공부 시간이 쌓이면 둥근 뼈대가 올라가요.",
    "벽을 두르고 문을 내요. 쉬는 동안에는 집 짓기도 멈춰요.",
    "지붕과 굴뚝을 올리면 거의 다 왔어요.",
    "30분을 채우면 집 한 채 완성! 남은 시간은 다음 집으로 이어져요.",
    "완성한 집은 마을에 하나씩 들어서고, 여섯 채가 모이면 마을이 완성돼요.",
  ],
  hudBuildingLabel: "1번째 집 짓는 중",
  hudDoneLabel: "1번째 집 완성",
  sparkleDoneCaption: "1번째 집 완성!",
  villageCard: {
    image: "/assets/screens/village.webp",
    alt: "집터 여섯 곳이 있는 마을",
    chip: "집 6채",
    label: "마을",
    description: "여섯 채가 모이면 마을이 완성돼요.",
  },
  village: {
    image: "/assets/screens/village.webp",
    doneCaption: "마을 완성! 다음 마을로 이어져요",
    // 영역 기준 % (집 아래쪽 기준), DESIGN.md 참고
    plots: [
      [20.6, 55.3],
      [41.9, 55.3],
      [63.3, 55.3],
      [20.3, 79.1],
      [41.4, 79.1],
      [63.0, 79.1],
    ] as Array<[number, number]>,
  },
};

export const howItWorks = {
  eyebrow: "이렇게 쌓여요",
  heading: "공부 시작 한 번이면,\n나머지는 수달이 지어요",
  stepStart: {
    num: "01",
    heading: "공부 시작을 누르면\n수달이 바탕화면에 나와요",
    body: "인강을 틀어 두든 문서를 쓰든, 어떤 창을 쓰고 있어도 화면 한쪽에서 수달이 같이 일해요. 마우스를 올리면 공부 시간과 빠른 버튼이 보여요.",
    facts: ["투명 영역은 클릭이 통과돼요", "드래그로 자리 옮기기"],
  },
  stepHouse: {
    num: "02",
    heading: "30분 공부하면 집 한 채,\n여섯 채면 마을 하나",
    body: "공부 시간이 쌓이는 만큼 집이 다섯 단계로 지어져요. 다 짓고 남은 시간은 다음 집으로 이어지고, 여섯 채가 모이면 마을이 완성돼요. 집 한 채에 필요한 시간은 5분부터 240분까지 바꿀 수 있어요.",
  },
  stepRecord: {
    num: "03",
    heading: "쌓인 시간은\n달력으로 돌아봐요",
    body: "공부를 끝내면 이번에 공부한 시간, 쉰 시간, 완성한 집 수를 정리해서 보여줘요. 날짜별, 월별 공부 시간은 달력에 남고, 완성한 마을은 언제든 다시 볼 수 있어요.",
    facts: ["지난 마을 다시 보기", "자동 저장 · 비정상 종료 복구"],
    image: {
      src: "/assets/screens/record.webp",
      alt: "날짜마다 공부 시간이 표시된 월별 공부 기록 달력",
      width: 900,
      height: 640,
    },
  },
};

export const privacyNote = {
  image: "/assets/otter/sleepy.webp",
  heading: "수달은 공부 내용을 보지 않아요",
  items: [
    "키보드와 마우스를 쓰고 있는지만 확인해요. 무엇을 입력했는지는 보지 않아요.",
    "영상을 보거나 종이책을 읽는 동안에는 입력이 없어서 휴식으로 바뀔 수 있어요. 졸림과 휴식까지 걸리는 시간은 설정에서 늘릴 수 있어요.",
    "공부 기록은 내 컴퓨터에 저장돼요.",
  ],
};

export const roadmapIntro = {
  eyebrow: "앞으로 지을 것들",
  heading: "마을은 계속 넓어져요",
  lead: "첫 버전은 집 짓기와 공부 기록부터 시작해요. 다음 기능의 순서는 신청해 주신 분들의 의견을 듣고 정해요.",
};

export const roadmapStages = [
  {
    version: "V2",
    title: "마을 둘러보기",
    items: ["마을 확대·축소, 화면 이동", "집마다 공부 기록 연결", "주간·월간 리포트"],
    highlight: true,
  },
  {
    version: "V3",
    title: "기록 남기고 공유",
    items: ["마을과 공부 시간 인증 사진", "스토리·피드 비율로 저장", "과목과 메모 남기기"],
    highlight: false,
  },
  {
    version: "V4",
    title: "꾸미기와 상점",
    items: ["공부 시간으로 모으는 재화", "집과 수달 꾸미기 아이템"],
    highlight: false,
  },
  {
    version: "V5",
    title: "함께 공부",
    items: ["친구 수달과 같이 공부", "친구 마을 놀러 가기", "공부 시간을 모아 공동 건물 짓기"],
    highlight: false,
  },
];

export const footer = {
  copyright: "© 2026 수달공방 (Otter Workshop)",
  tagline: "Windows · macOS 데스크톱 앱 · 출시 준비 중",
};

export const waitlistForm = {
  emailLabel: "이메일",
  emailPlaceholder: "name@example.com",
  osLegend: "사용하는 OS",
  osOptions: [
    { value: "windows", label: "Windows" },
    { value: "macos", label: "macOS" },
  ] as const,
  betaLabel: "출시 전 테스트에 참여하고 싶어요",
  betaFine: "(선택)",
  agreeLabel: "(필수) 개인정보 수집·이용에 동의합니다",
  heroCta: "출시 알림 받기",
  footerCta: "출시 알림 신청하기",
  pendingCta: "신청하는 중…",
  invalidEmail: "이메일 주소를 다시 확인해 주세요. 예: name@example.com",
  needAgree: "출시 알림을 보내려면 개인정보 수집·이용에 동의해 주세요.",
  messages: {
    ok: "신청했어요! 출시하는 날 이 메일로 알려드릴게요.",
    duplicate: "이미 신청하신 이메일이에요. 출시하는 날 알려드릴게요.",
    error: "신청을 저장하지 못했어요. 잠시 뒤 다시 눌러 주세요.",
  },
} as const;

export const consentDetails = {
  summary: "자세히 보기",
  rows: [
    { term: "수집 항목", desc: "이메일 주소, 사용하는 OS(선택), 테스트 참여 의향(선택)" },
    { term: "수집 목적", desc: "서비스 출시 알림 발송, 출시 전 테스트 안내" },
    { term: "보유 기간", desc: "출시 알림 발송 후 파기" },
    { term: "거부 권리", desc: "동의하지 않을 수 있으며, 동의하지 않으면 출시 알림을 받을 수 없어요." },
  ],
};

export const joinSection = {
  pill: "출시 준비 중",
  heading: "출시되면\n가장 먼저 알려드릴게요",
  lead: "수달공방은 아직 출시 전인 Windows · macOS 데스크톱 앱이에요. 지금 신청하면 출시하는 날 메일로 알려드려요. 앱을 내려받거나 결제하는 절차는 없어요.",
};

export const unsubscribedPage = {
  title: "수신 거부 완료",
  heading: "수신 거부가 완료됐어요",
  lead: "수달공방 출시 알림 메일을 더 이상 보내지 않을게요.",
  backHref: "/",
  backLabel: "다시 홈으로",
};
