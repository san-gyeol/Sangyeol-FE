/* eslint-disable react/jsx-key */
"use client";

// import useGetCourseDetails from "@shared/hooks/domain/course/useGetCourseDetails";
import BottomSheet from "@shared/components/composites/BottomSheet";
import Carousel from "@shared/components/composites/Carousel";
// import BaseSelector from "@modules/widgets/map/BaseSelector";
import CourseImageInfoSection from "@modules/widgets/map/CourseImageInfoSection";
import CourseWeatherClothesInfoSection from "@modules/widgets/map/CourseWeatherClothesInfoSection";
import Spacing from "@shared/components/primitives/layout/Spacing";
import CourseMetaDataUi from "@shared/components/primitives/ui/CourseMetaDataUi";
import useOpenNaverMapRouteBridge from "@shared/hooks/domain/bridge/useOpenNaverMapRouteBridge";
import NavigationIcon from "@shared/components/primitives/ui/icons/NavigationIcon";
// import ROUTE from "@shared/constants/route";
import { useParams } from "next/navigation";
// import { useStackLinkRouter } from "stack-link";
import { getCourseById } from "@/shared/api/proto";
import Button from "@/shared/components/primitives/ui/Button";

export default function CourseDetailBottomSheetSection() {
  const { courseId } = useParams<{
    courseId: string;
  }>();
  const openNaverMapRoute = useOpenNaverMapRouteBridge();
  // const { navigate } = useStackLinkRouter({
  //   prefetchHref: courseId ? ROUTE.V1_COURSE_DESCRIPTION(courseId) : null,
  // });

  if (!courseId) {
    return null;
  }

  const { difficulty, durationMinutes, distanceKm, startPoint, name } =
    getCourseById(courseId);

  const handleFindRouteClick = () => {
    openNaverMapRoute({
      dlat: startPoint.latitude,
      dlng: startPoint.longitude,
      dname: startPoint.name,
    });
  };

  // const handleCourseDescriptionClick = () => {
  //   if (!courseId) return;
  //   if (courseId !== "1") return; // 현재는 당산나무 코스만 상세페이지가 존재
  //   navigate({ href: ROUTE.V1_COURSE_DESCRIPTION(courseId) });
  // };

  return (
    <section>
      <BottomSheet>
        <Spacing size={4} />

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            {/* 어떤 정보를 뜻하는지 확인 필요 */}
            <p className="text-sm text-gray-800">무등산국립공원</p>
          </div>
          <Button
            className="flex h-11 items-center justify-center gap-2 rounded-[10px] px-3.5 py-0 text-sm"
            onClick={handleFindRouteClick}
          >
            <NavigationIcon size={16} />
            길찾기
          </Button>
        </div>
        <Spacing size={4} />
        <CourseMetaDataUi
          difficulty={difficulty}
          distance={distanceKm}
          time={durationMinutes}
        />
        <Spacing size={4} />

        <Carousel
          items={[
            <CourseImageInfoSection />,
            <CourseWeatherClothesInfoSection
              key="weather"
              courseId={courseId}
            />,
          ]}
        />
        <Spacing size={4} />
        {/* <Button fullWidth onClick={handleCourseDescriptionClick}>
          코스 상세보기
        </Button>
        <Spacing size={4} /> */}
      </BottomSheet>
    </section>
  );
}
