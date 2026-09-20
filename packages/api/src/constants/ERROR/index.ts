export const ERROR_CODES = {
  // Common
  COMMON400_001: { status: 400, message: "RequsetDTO 유효성 검사 미통과" },
  COMMON400_002: { status: 400, message: "Illegal argument exception 발생" },
  COMMON400_003: {
    status: 400,
    message: "경로 변수(PathVariable)가 누락됐습니다.",
  },
  COMMON400_004: { status: 400, message: "쿼리 스트링이 누락됐습니다." },
  COMMON404_001: { status: 404, message: "요청한 리소스를 찾을 수 없습니다." },
  COMMON500_001: { status: 500, message: "예기치 못한 예외가 발생했습니다." },

  // Auth
  AUTH400_001: { status: 400, message: "로그인 과정 중 에러가 발생했습니다" },
  AUTH400_002: { status: 400, message: "토큰이 필요한 요청입니다." },
  AUTH400_003: { status: 400, message: "이미 로그아웃된 상태입니다." },
  AUTH400_004: { status: 400, message: "인증번호가 일치하지 않습니다." },
  AUTH401_001: { status: 401, message: "유효하지 않은 서명입니다" },
  AUTH401_002: { status: 401, message: "만료된 토큰입니다" },
  AUTH401_003: { status: 401, message: "유효하지 않은 리프레시 토큰입니다." },
  AUTH401_004: { status: 401, message: "토큰의 헤더가 유효하지 않습니다." },
  AUTH404_001: { status: 404, message: "인증번호가 존재하지 않습니다." },
  AUTH500_001: {
    status: 500,
    message: "애플 identityToken헤더 파싱 중 에러가 발생했습니다",
  },
  AUTH500_002: {
    status: 500,
    message:
      "애플 identityToken의 서명(signature) 검증 중 매칭되는 공개키를 찾을 수 없습니다",
  },
  AUTH500_003: {
    status: 500,
    message:
      "애플 identityToken의 서명(signature) 검증에서 사용되는 공개키 생성 중 에러가 발생했습니다",
  },
  AUTH500_004: {
    status: 500,
    message: "애플 identityToken 검증 중 issuer가 애플이 아닙니다",
  },
  AUTH500_005: {
    status: 500,
    message: "애플 identityToken 검증 중 audience가 client_id가 아닙니다",
  },
  AUTH500_006: { status: 500, message: "SMS 발송에 실패했습니다." },

  // User
  USER400_001: { status: 400, message: "회원을 찾을 수 없습니다" },
  USER400_002: { status: 400, message: "이미 존재하는 전화번호입니다." },
  USER400_003: { status: 400, message: "이미 존재하는 이메일입니다." },
  USER400_004: { status: 400, message: "혈액형은 A, B, O, AB만 허용됩니다." },

  // Base
  BASE404_001: { status: 400, message: "거점을 찾을 수 없습니다." },

  // Mountain
  MOUNTAIN404_001: { status: 400, message: "산을 찾을 수 없습니다" },

  // Facility
  FACILITY404_001: { status: 400, message: "시설을 찾을 수 없습니다." },

  // Course & Bookmark
  COURSE400_001: { status: 404, message: "코스를 찾을 수 없습니다" },
  COURSE404_001: { status: 404, message: "해당 코스를 찾을 수 없어요." },
  BOOKMARK400_001: { status: 404, message: "코스 북마크를 찾을 수 없습니다" },

  // Pathway
  PATHWAY500_001: {
    status: 500,
    message: "(코스)경로의 위경도를 변환 중 에러가 발생하였습니다",
  },

  // Control
  CONTROL502_001: {
    status: 502,
    message: "통제정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
  },

  // Weather
  WEATHER502_001: {
    status: 502,
    message: "날씨 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
  },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;
