import type { Control } from "api";

import { CONTROL_ZONES } from "../constants";
import type { ControlArea } from "../types";

/**
 * 고정 구역 목록에 서버 응답을 구역 코드(zone)로 매칭해 합친다.
 * 응답이 없으면(로딩/에러) 상태 없이 고정 목록만 반환해 레이아웃을 유지한다.
 */
export const mergeControlZones = (controls?: Control[]): ControlArea[] =>
  CONTROL_ZONES.map((zoneMeta) => {
    const control = controls?.find((item) => item.zone === zoneMeta.zone);

    return {
      ...zoneMeta,
      name: control?.zoneName ?? zoneMeta.name,
      status: control?.status,
      statusName: control?.statusName,
    };
  });
