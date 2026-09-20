"use client";

import useWeatherQuery from "@shared/api/queries/useWeatherQuery";
import SunIcon from "@shared/components/primitives/ui/icons/SunIcon";
import SunriseIcon from "@shared/components/primitives/ui/icons/SunriseIcon";
import SunsetIcon from "@shared/components/primitives/ui/icons/SunsetIcon";
import { MUDEUNGSAN_KMA_DONG_CODE } from "@shared/constants/mountain/index";
import useRouteToExternalWebviewBridge from "@shared/hooks/domain/bridge/useRouteToExternalWebviewBridge";

const MUDEUNGSAN_WEATHER_URL = `https://www.weather.go.kr/w/index.do#dong/${MUDEUNGSAN_KMA_DONG_CODE}/35.124385849219784/127.00913112151761/%EC%A0%84%EB%82%A8%EA%B4%91%EC%A3%BC%ED%86%B5%ED%95%A9%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%B6%81%EA%B5%AC%20%EA%B8%88%EA%B3%A1%EB%8F%99/SCH/%EB%AC%B4%EB%93%B1%EC%82%B0`;

const MudeungsanWeatherNotice = () => {
  const { data: weatherData } = useWeatherQuery();

  const routeToExternalWebview = useRouteToExternalWebviewBridge();

  const handleClick = () => {
    routeToExternalWebview(MUDEUNGSAN_WEATHER_URL);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full cursor-pointer flex-col gap-4 rounded-2xl border border-gray-600 bg-main-white p-4 text-left shadow-md"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <SunIcon size={16} className="text-primary" />
          <h3 className="text-base font-semibold text-black-900">
            무등산 날씨
          </h3>
        </div>
        <p className="text-xs font-normal text-gray-900">
          OpenWeatherMap · 실시간
        </p>
      </div>

      <div className="flex items-end gap-3">
        <p className="text-3xl/normal font-bold tracking-tight text-black-900">
          {weatherData?.temperature?.toFixed(1) ?? "-"}℃
        </p>
        <span className="pb-1 text-sm font-medium text-gray-900">
          체감 ({weatherData?.feelsLike?.toFixed(1) ?? "-"}℃)
        </span>
      </div>

      <div className="flex w-full items-center rounded-xl bg-gray-300 p-3">
        <div className="flex flex-1 flex-col items-center gap-1">
          <p className="text-xs font-normal text-gray-900">강수확률</p>
          <p className="text-base font-semibold text-black-900">
            {weatherData?.precipitationProbability ?? "-"}%
          </p>
        </div>

        <div className="h-7 w-px shrink-0 bg-gray-600" />

        <div className="flex flex-1 flex-col items-center gap-1">
          <p className="text-xs font-normal text-gray-900">강수량(mm)</p>
          <p className="text-base font-semibold text-black-900">
            {weatherData?.precipitationAmount ?? "-"}
          </p>
        </div>

        <div className="h-7 w-px shrink-0 bg-gray-600" />

        <div className="flex flex-1 flex-col items-center gap-1">
          <p className="text-xs font-normal text-gray-900">습도</p>
          <p className="text-base font-semibold text-black-900">
            {weatherData?.humidity ?? "-"}%
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <SunriseIcon size={14} className="text-gray-900" />
          <span className="text-xs font-medium text-black-800">
            일출 {weatherData?.sunrise ?? "-"}
          </span>
        </div>
        <p className="text-xs font-medium text-gray-900">·</p>
        <div className="flex items-center gap-1">
          <SunsetIcon size={14} className="text-gray-900" />
          <span className="text-xs font-medium text-black-800">
            일몰 {weatherData?.sunset ?? "-"}
          </span>
        </div>
      </div>
    </button>
  );
};

export default MudeungsanWeatherNotice;
