"use client";

import SunIcon from "@icons/SunIcon";
import useWeatherQuery from "@shared/api/queries/useWeatherQuery";
import InfoTile from "@shared/components/primitives/ui/InfoTile";
import Image from "next/image";

export default function CourseWeatherClothesInfoSection() {
  const { data: weather } = useWeatherQuery();

  return (
    <div className="flex w-full gap-3">
      <InfoTile label="준비물" sub="등산화 권장">
        <Image
          src="/images/shoe-eider.webp"
          alt="등산화"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </InfoTile>

      <InfoTile
        label="날씨"
        sub={`체감 ${weather?.feelsLike?.toFixed(1) ?? "-"}℃`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center bg-green-500 text-primary">
          <SunIcon size={22} />
          <p className="text-base font-bold">
            {weather?.temperature?.toFixed(1) ?? "-"}℃
          </p>
        </div>
      </InfoTile>

      <InfoTile label="식당" sub="부곡정">
        <Image
          src="/images/thumb-food.webp"
          alt="음식"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </InfoTile>
    </div>
  );
}
