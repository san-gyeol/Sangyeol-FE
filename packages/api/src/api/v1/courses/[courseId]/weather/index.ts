import { AxiosInstance } from "axios";

import type { GetWeatherApiResponse } from "@api/v1/weather";

/**
 * @public
 * @category Constants
 * @description 코스 날씨 조회 API 경로를 생성하는 함수
 * @param courseId - 코스 ID (1: 당산나무, 2: 새인봉-입석대, 3: 늦재-옛길, 4: 시무지기폭포)
 * @returns API 경로 문자열
 */
export const COURSE_WEATHER_API_PATH = (courseId: string) =>
  `/api/v1/courses/${courseId}/weather`;

/**
 * @public
 * @category Types
 * @description 코스 날씨 조회 응답 타입. 기준 좌표만 다를 뿐 응답 형태는 무등산 날씨(`GetWeatherApiResponse`)와 동일하다
 */
export type GetCourseWeatherApiResponse = GetWeatherApiResponse;

/**
 * @public
 * @category Weather
 * @description 지도 바텀시트 날씨 카드용 코스 날씨를 조회합니다.
 * 해당 코스의 거점 중 가장 높은 고도의 좌표를 기준으로 조회합니다 (데이터 출처: OpenWeather).
 * 등록되지 않은 코스 ID는 404 / `COURSE404_001`, 숫자가 아닌 ID는 400 / `COMMON400_001`,
 * OpenWeather 호출 실패는 502 / `WEATHER502_001` 에러가 발생합니다
 * @param instance - Axios 인스턴스
 * @param courseId - 코스 ID
 * @returns 코스 기준 지점의 현재 날씨
 * @example
 * const weather = await getCourseWeatherApi(axiosInstance, "1");
 * console.log(`${weather.feelsLike}℃`);
 */
export const getCourseWeatherApi = async (
  instance: AxiosInstance,
  courseId: string,
) => {
  const response = await instance<GetCourseWeatherApiResponse>({
    method: "get",
    url: COURSE_WEATHER_API_PATH(courseId),
  });

  return response.data;
};
