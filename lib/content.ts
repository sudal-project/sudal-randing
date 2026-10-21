export const brand = {
  name: "수달공방",
  nameEn: "OTTER WORKSHOP",
};

export const header = {
  ctaLabel: "출시 알림 받기",
  ctaHref: "#join",
};

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

export const howItWorks = {
  eyebrow: "이렇게 쌓여요",
  heading: "공부 시작 한 번이면,\n나머지는 수달이 지어요",
  // 02(집 짓기 자동 재생 장면)는 HouseScene 클라이언트 컴포넌트와 함께 3단계에서 추가한다.
  steps: [
    {
      num: "01",
      heading: "공부 시작을 누르면\n수달이 바탕화면에 나와요",
      body: "인강을 틀어 두든 문서를 쓰든, 어떤 창을 쓰고 있어도 화면 한쪽에서 수달이 같이 일해요. 마우스를 올리면 공부 시간과 빠른 버튼이 보여요.",
      facts: ["투명 영역은 클릭이 통과돼요", "드래그로 자리 옮기기"],
    },
    {
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
  ],
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
