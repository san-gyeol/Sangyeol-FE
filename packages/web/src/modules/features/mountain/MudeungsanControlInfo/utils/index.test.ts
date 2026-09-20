import type { Control } from "api";
import { describe, expect, it } from "vitest";

import { CONTROL_ZONES } from "../constants";
import { mergeControlZones } from ".";

const CONTROLS: Control[] = [
  {
    zone: "MUDEUNGSAN",
    zoneName: "무등산(서버명)",
    status: "PARTIAL",
    statusName: "부분통제",
    referenceTime: "2026-08-16T12:00:00",
    source: "국립공원공단",
  },
  {
    zone: "MUDEUNGSAN_EAST",
    zoneName: "무등산동부(서버명)",
    status: "NORMAL",
    statusName: "정상",
    referenceTime: "2026-08-16T12:32:00",
    source: "국립공원공단",
  },
];

describe("mergeControlZones", () => {
  it("응답이 없으면 고정 구역 목록을 상태 없이 반환한다 (로딩/에러 시 레이아웃 유지)", () => {
    const result = mergeControlZones(undefined);

    expect(result).toEqual(
      CONTROL_ZONES.map((zone) => ({
        ...zone,
        status: undefined,
        statusName: undefined,
      })),
    );
  });

  it("응답이 있으면 구역 코드로 매칭해 서버 라벨(zoneName·statusName)과 상태 코드를 채운다", () => {
    const result = mergeControlZones(CONTROLS);

    expect(result).toEqual([
      {
        zone: "MUDEUNGSAN",
        name: "무등산(서버명)",
        rstId: "0025",
        status: "PARTIAL",
        statusName: "부분통제",
      },
      {
        zone: "MUDEUNGSAN_EAST",
        name: "무등산동부(서버명)",
        rstId: "0026",
        status: "NORMAL",
        statusName: "정상",
      },
    ]);
  });

  it("응답 순서와 무관하게 고정 순서(무등산 → 무등산동부)를 유지한다", () => {
    const result = mergeControlZones([CONTROLS[1], CONTROLS[0]]);

    expect(result.map((area) => area.zone)).toEqual([
      "MUDEUNGSAN",
      "MUDEUNGSAN_EAST",
    ]);
  });

  it("응답에 없는 구역은 고정 이름을 쓰고 상태를 비운다", () => {
    const result = mergeControlZones([CONTROLS[0]]);

    expect(result[1]).toEqual({
      zone: "MUDEUNGSAN_EAST",
      name: "무등산동부",
      rstId: "0026",
      status: undefined,
      statusName: undefined,
    });
  });
});
