import type { ControlZoneMeta } from "../types";

/** 국립공원공단 통제정보 상세 페이지 URL (rstId: 공단 통제 구역 식별자) */
export const KNPS_CONTROL_DETAIL_PAGE_URL = (rstId: string) =>
  `https://www.knps.or.kr/front/portal/safe/acsCtrDtl.do?menuNo=8000340&rstId=${rstId}`;

/** 표시 순서 고정: 무등산 → 무등산동부 (API 응답 순서와 동일). name은 응답 전 폴백 표시용 */
export const CONTROL_ZONES: ControlZoneMeta[] = [
  { zone: "MUDEUNGSAN", name: "무등산", rstId: "0025" },
  { zone: "MUDEUNGSAN_EAST", name: "무등산동부", rstId: "0026" },
];
