import type { AxiosInstance } from "axios";
import { describe, expect, it, vi } from "vitest";

import { getWeatherApi, WEATHER_API_PATH, type GetWeatherApiResponse } from ".";

const RESPONSE: GetWeatherApiResponse = {
  temperature: 22.1,
  feelsLike: 25.4,
  precipitationProbability: 20,
  precipitationAmount: null,
  humidity: 100,
  sunrise: "05:30",
  sunset: "19:46",
  source: "OpenWeather",
  updatedAt: "2026-08-25T09:40:00",
};

const createInstance = () => {
  const instance = vi.fn().mockResolvedValue({ data: RESPONSE });
  return instance as unknown as AxiosInstance & typeof instance;
};

describe("WEATHER_API_PATH", () => {
  it("명세서의 경로와 일치한다", () => {
    expect(WEATHER_API_PATH).toBe("/api/v1/weather");
  });
});

describe("getWeatherApi", () => {
  it("GET /api/v1/weather 를 파라미터 없이 호출한다", async () => {
    const instance = createInstance();

    await getWeatherApi(instance);

    expect(instance).toHaveBeenCalledTimes(1);
    expect(instance).toHaveBeenCalledWith({
      method: "get",
      url: WEATHER_API_PATH,
    });
  });

  it("응답 body를 그대로 반환하고 precipitationAmount null을 유지한다", async () => {
    const instance = createInstance();

    const result = await getWeatherApi(instance);

    expect(result).toEqual(RESPONSE);
    expect(result.precipitationAmount).toBeNull();
  });
});
