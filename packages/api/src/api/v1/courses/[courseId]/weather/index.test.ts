import type { AxiosInstance } from "axios";
import { describe, expect, it, vi } from "vitest";

import {
  COURSE_WEATHER_API_PATH,
  getCourseWeatherApi,
  type GetCourseWeatherApiResponse,
} from ".";

const RESPONSE: GetCourseWeatherApiResponse = {
  temperature: 17.79,
  feelsLike: 17.77,
  precipitationProbability: 0,
  precipitationAmount: null,
  humidity: 82,
  sunrise: "06:18",
  sunset: "18:33",
  source: "OpenWeather",
  updatedAt: "2026-09-20T19:47:22",
};

const createInstance = () => {
  const instance = vi.fn().mockResolvedValue({ data: RESPONSE });
  return instance as unknown as AxiosInstance & typeof instance;
};

describe("COURSE_WEATHER_API_PATH", () => {
  it("명세서의 경로와 일치한다", () => {
    expect(COURSE_WEATHER_API_PATH("1")).toBe("/api/v1/courses/1/weather");
  });
});

describe("getCourseWeatherApi", () => {
  it("GET /api/v1/courses/{courseId}/weather 를 호출한다", async () => {
    const instance = createInstance();

    await getCourseWeatherApi(instance, "2");

    expect(instance).toHaveBeenCalledTimes(1);
    expect(instance).toHaveBeenCalledWith({
      method: "get",
      url: "/api/v1/courses/2/weather",
    });
  });

  it("응답 body를 그대로 반환하고 precipitationAmount null을 유지한다", async () => {
    const instance = createInstance();

    const result = await getCourseWeatherApi(instance, "1");

    expect(result).toEqual(RESPONSE);
    expect(result.precipitationAmount).toBeNull();
  });
});
