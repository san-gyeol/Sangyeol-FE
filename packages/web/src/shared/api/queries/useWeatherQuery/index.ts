import { getWeatherApi, WEATHER_API_PATH } from "api";
import { useQuery } from "@tanstack/react-query";
import publicApi from "@shared/api/_instances/publicApi";

const useWeatherQuery = () => {
  return useQuery({
    queryKey: [WEATHER_API_PATH],
    queryFn: () => getWeatherApi(publicApi),
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 30, // 30m
  });
};

export default useWeatherQuery;
