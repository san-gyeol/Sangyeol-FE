import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 실시간 통제정보 조회 API 경로
 */
export const CONTROLS_API_PATH = "/api/v1/controls";

/**
 * @public
 * @category Types
 * @description 통제 구역 코드 (`MUDEUNGSAN`: 무등산, `MUDEUNGSAN_EAST`: 무등산동부)
 */
export type ControlZone = "MUDEUNGSAN" | "MUDEUNGSAN_EAST";

/**
 * @public
 * @category Types
 * @description 통제 상태 코드 (`NORMAL`: 정상, `PARTIAL`: 부분통제, `FULL`: 전면통제). 배지 색 등 분기 로직은 이 코드로 판단한다
 */
export type ControlStatus = "NORMAL" | "PARTIAL" | "FULL";

/**
 * @public
 * @category Types
 * @interface Control
 * @description 구역별 실시간 통제 상태
 * @property {ControlZone} zone - 구역 코드 (분기용)
 * @property {string} zoneName - 구역 한글명 (화면에 그대로 표시)
 * @property {ControlStatus} status - 상태 코드 (배지 색 분기용)
 * @property {string} statusName - 상태 한글명 ("정상" | "부분통제" | "전면통제", 배지 문구로 그대로 표시)
 * @property {string} referenceTime - 공단이 밝힌 기준 시각 (ISO-8601, KST)
 * @property {string} source - 출처 표기 ("국립공원공단")
 */
export interface Control {
  zone: ControlZone;
  zoneName: string;
  status: ControlStatus;
  statusName: string;
  referenceTime: string;
  source: string;
}

/**
 * @public
 * @category Types
 * @interface GetControlsApiResponse
 * @description 실시간 통제정보 조회 응답 타입
 * @property {Control[]} controls - 구역별 통제 상태 목록 (항상 2건, 무등산 → 무등산동부 순서 고정)
 */
export interface GetControlsApiResponse {
  controls: Control[];
}

/**
 * @public
 * @category Controls
 * @description 무등산·무등산동부 구역의 실시간 통제 상태를 조회합니다 (데이터 출처: 국립공원공단).
 * 수집 실패 시 502 / `CONTROL502_001` 에러가 발생하며, 재시도는 본 API를 다시 호출합니다
 * @param instance - Axios 인스턴스
 * @returns 구역별 통제 상태 목록
 * @example
 * const { controls } = await getControlsApi(axiosInstance);
 * console.log(controls[0].statusName); // "부분통제"
 */
export const getControlsApi = async (instance: AxiosInstance) => {
  const response = await instance<GetControlsApiResponse>({
    method: "get",
    url: CONTROLS_API_PATH,
  });

  return response.data;
};
