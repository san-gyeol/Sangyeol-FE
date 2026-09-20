"use client";

import { Fragment } from "react";

import useControlsQuery from "@shared/api/queries/useControlsQuery";
import TriangleAlertIcon from "@shared/components/primitives/ui/icons/TriangleAlertIcon";
import useRouteToExternalWebviewBridge from "@shared/hooks/domain/bridge/useRouteToExternalWebviewBridge";

import ControlAreaItem from "./components/ControlAreaItem";
import { KNPS_CONTROL_DETAIL_PAGE_URL } from "./constants";
import { mergeControlZones } from "./utils";

const MudeungsanControlInfo = () => {
  const { data } = useControlsQuery();
  const routeToExternalWebview = useRouteToExternalWebviewBridge();

  const controlAreas = mergeControlZones(data?.controls);

  const handleAreaClick = (rstId: string) => {
    routeToExternalWebview(KNPS_CONTROL_DETAIL_PAGE_URL(rstId));
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-gray-600 bg-main-white p-4 shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <TriangleAlertIcon size={16} className="text-error" />
          <h3 className="text-base font-semibold text-black-900">
            실시간 통제정보
          </h3>
        </div>
        <p className="text-xs font-normal text-gray-900">
          국립공원공단 · 실시간
        </p>
      </div>

      <div className="flex w-full flex-col rounded-xl bg-gray-300">
        {controlAreas.map((area, index) => (
          <Fragment key={area.zone}>
            {index > 0 && <div className="h-px w-full bg-gray-600" />}
            <ControlAreaItem
              name={area.name}
              status={area.status}
              statusName={area.statusName}
              onClick={() => handleAreaClick(area.rstId)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MudeungsanControlInfo;
