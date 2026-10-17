import { useBridge } from "@geongyu/react-native-bridge/web";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/bridge";
import { useEffect, useState } from "react";

/**
 * 기기의 알림 권한 상태를 조회하고, 알림 권한을 요청하는 브릿지 훅
 */
const useNotificationPermissionBridge = () => {
  const { request, isReady } = useBridge<
    MessageEventRequestData<null>,
    MessageEventResponseData<{ granted: boolean }>
  >();
  const [isGranted, setIsGranted] = useState(false);

  const sendPermissionMessage = (method: "GET" | "POST") => {
    request({
      requestMessage: { name: "notification-permission", method },
      responseCallback: ({ data }) => {
        if (!data) return;
        setIsGranted(data.granted);
      },
    });
  };

  useEffect(() => {
    if (!isReady) return;
    sendPermissionMessage("GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps -- request가 매 렌더 새로 생성되므로 핸드셰이크 완료 시 1회만 조회
  }, [isReady]);

  return {
    isGranted,
    requestPermission: () => sendPermissionMessage("POST"),
  };
};

export default useNotificationPermissionBridge;
