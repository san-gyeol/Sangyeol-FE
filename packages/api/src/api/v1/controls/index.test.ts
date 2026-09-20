import type { AxiosInstance } from "axios";
import { describe, expect, it, vi } from "vitest";

import {
  CONTROLS_API_PATH,
  getControlsApi,
  type GetControlsApiResponse,
} from ".";

const RESPONSE: GetControlsApiResponse = {
  controls: [
    {
      zone: "MUDEUNGSAN",
      zoneName: "무등산",
      status: "PARTIAL",
      statusName: "부분통제",
      referenceTime: "2026-08-16T12:00:00",
      source: "국립공원공단",
    },
    {
      zone: "MUDEUNGSAN_EAST",
      zoneName: "무등산동부",
      status: "NORMAL",
      statusName: "정상",
      referenceTime: "2026-08-16T12:32:00",
      source: "국립공원공단",
    },
  ],
};

const createInstance = () => {
  const instance = vi.fn().mockResolvedValue({ data: RESPONSE });
  return instance as unknown as AxiosInstance & typeof instance;
};

describe("CONTROLS_API_PATH", () => {
  it("명세서의 경로와 일치한다", () => {
    expect(CONTROLS_API_PATH).toBe("/api/v1/controls");
  });
});

describe("getControlsApi", () => {
  it("GET /api/v1/controls 를 파라미터 없이 호출한다", async () => {
    const instance = createInstance();

    await getControlsApi(instance);

    expect(instance).toHaveBeenCalledTimes(1);
    expect(instance).toHaveBeenCalledWith({
      method: "get",
      url: CONTROLS_API_PATH,
    });
  });

  it("응답 body(controls 배열)를 그대로 반환한다", async () => {
    const instance = createInstance();

    const result = await getControlsApi(instance);

    expect(result).toEqual(RESPONSE);
    expect(result.controls).toHaveLength(2);
    expect(result.controls[0].zone).toBe("MUDEUNGSAN");
  });
});
