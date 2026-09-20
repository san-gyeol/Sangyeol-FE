import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 무등산 날씨 조회 API 경로
 */
export const WEATHER_API_PATH = "/api/v1/weather";

/**
 * @public
 * @category Types
 * @interface GetWeatherApiResponse
 * @description 무등산 날씨 조회 응답 타입 (데이터 출처: OpenWeatherMap, 기준 지점: 무등산 주소지 좌표).
 * 숫자 필드에는 단위 문자열이 없으므로 °C·%·mm 표기는 화면에서 붙인다
 * @property {number} temperature - 현재 기온 (°C)
 * @property {number} feelsLike - 체감 기온 (°C)
 * @property {number} precipitationProbability - 강수 확률 (%)
 * @property {number | null} precipitationAmount - 강수량 (mm). `null`이면 강수 없음 → 화면 "-" 표시
 * @property {number} humidity - 습도 (%)
 * @property {string} sunrise - 일출 시각 ("HH:mm")
 * @property {string} sunset - 일몰 시각 ("HH:mm")
 * @property {string} source - 출처 표기 ("OpenWeather")
 * @property {string} updatedAt - 갱신 시각 (ISO-8601, KST)
 */
export interface GetWeatherApiResponse {
  temperature: number;
  feelsLike: number;
  precipitationProbability: number;
  precipitationAmount: number | null;
  humidity: number;
  sunrise: string;
  sunset: string;
  source: string;
  updatedAt: string;
}

/**
 * @public
 * @category Weather
 * @description 홈 화면 날씨 카드용 무등산 날씨를 조회합니다.
 * 백엔드 명세 기준 "예정(계약 초안)" 상태이므로 구현 시 응답 필드가 확정될 수 있습니다
 * @param instance - Axios 인스턴스
 * @returns 무등산 현재 날씨
 * @example
 * const weather = await getWeatherApi(axiosInstance);
 * console.log(`${weather.temperature}℃`);
 */
export const getWeatherApi = async (instance: AxiosInstance) => {
  const response = await instance<GetWeatherApiResponse>({
    method: "get",
    url: WEATHER_API_PATH,
  });

  return response.data;
};
