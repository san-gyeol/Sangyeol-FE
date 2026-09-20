import type { ControlStatus, ControlZone } from "api";

/** 화면에 고정으로 나열하는 통제 구역 정보. rstId는 국립공원공단 상세 페이지 식별자 */
export interface ControlZoneMeta {
  zone: ControlZone;
  name: string;
  rstId: string;
}

/** 고정 구역 정보에 서버 응답(라벨·상태 코드)을 합친 화면용 항목. 응답 전에는 status가 비어 있다 */
export interface ControlArea extends ControlZoneMeta {
  status?: ControlStatus;
  statusName?: string;
}
