import { COURSE_WEATHER_API_PATH, getCourseWeatherApi } from "api";
import { useQuery } from "@tanstack/react-query";
import publicApi from "@shared/api/_instances/publicApi";

const useCourseWeatherQuery = (courseId: string) => {
  return useQuery({
    queryKey: [COURSE_WEATHER_API_PATH(courseId)],
    queryFn: () => getCourseWeatherApi(publicApi, courseId),
    enabled: Boolean(courseId),
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 30, // 30m
  });
};

export default useCourseWeatherQuery;
