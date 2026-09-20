import { CONTROLS_API_PATH, getControlsApi } from "api";
import { useQuery } from "@tanstack/react-query";
import publicApi from "@shared/api/_instances/publicApi";

const useControlsQuery = () => {
  return useQuery({
    queryKey: [CONTROLS_API_PATH],
    queryFn: () => getControlsApi(publicApi),
    staleTime: 1000 * 60 * 5, // 5m — 서버가 공단 데이터를 실시간 수집하므로 짧게 유지
    gcTime: 1000 * 60 * 30, // 30m
  });
};

export default useControlsQuery;
