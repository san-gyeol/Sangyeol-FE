import { WebviewWithBridge } from "@geongyu/react-native-bridge/native";
import { COLOR_PALETTE } from "@shared/constants/colors";
import useGetCurrentPosition from "@shared/hooks/common/useGetCurrentPosition";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/webview";
import * as Notifications from "expo-notifications";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, View } from "react-native";
import WebView from "react-native-webview";
import type {
  WebViewNavigation,
  WebViewSource,
} from "react-native-webview/lib/WebViewTypes";

import {
  DISABLED_OVERSCROLL_BOUNCE,
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  // INJECT_TOKEN,
  SET_VIEWPORT_RATE,
} from "./constants/scripts";
import useMiddleware from "./model/useMiddleware";
import useWebviewHistory from "./model/useWebViewHistory";

type OnMessage = (
  reqMessage: MessageEventRequestData,
) => MessageEventResponseData | void;

type PromiseOnMessage = ({
  method,
  name,
}: MessageEventRequestData<unknown>) => Promise<MessageEventResponseData | void>;

interface WebViewWithInjectedProps {
  ref?: React.RefObject<WebView | null>;
  source: WebViewSource;
  onMessage?: OnMessage | PromiseOnMessage;
  onReadyToMessage?: () => void;
  loadingBar?: boolean;
  onNavigate?: (arg: WebViewNavigation) => void;
}

const WebViewWithInjected = ({
  ref,
  source,
  onMessage,
  onReadyToMessage,
  loadingBar = false,
  onNavigate,
}: WebViewWithInjectedProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);
  const { webViewRef, onNavigationStateChange } = useWebviewHistory();
  const { middleware } = useMiddleware();
  const { location } = useGetCurrentPosition();

  // 응답이 필요한 공통 메시지를 처리한 뒤, 나머지는 화면별 onMessage로 위임한다
  const handleBridgeMessage = async (
    reqMessage: MessageEventRequestData,
  ): Promise<MessageEventResponseData | void> => {
    const { name, method } = reqMessage;

    if (name === "get-current-position" && method === "GET") {
      return {
        name: "get-current-position",
        status: "success",
        data: location,
      };
    }

    // GET: 현재 알림 권한 조회, POST: 알림 권한 요청
    if (name === "notification-permission") {
      const { granted } =
        method === "POST"
          ? await Notifications.requestPermissionsAsync()
          : await Notifications.getPermissionsAsync();

      return {
        name: "notification-permission",
        status: "success",
        data: { granted },
      };
    }

    return onMessage?.(reqMessage);
  };

  const INJECTED_JAVASCRIPT = useMemo(
    () =>
      `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${DISABLED_OVERSCROLL_BOUNCE}${SET_VIEWPORT_RATE}`,
    [],
  );

  useEffect(() => {
    if (ref) {
      ref.current = webViewRef.current;
    }
  }, [webViewRef.current, ref]);

  return (
    <View style={{ flex: 1 }}>
      {loadingBar && isLoading && (
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              height: 2,
              backgroundColor: COLOR_PALETTE.primary,
              zIndex: 9999,
              width: "100%",
              borderTopEndRadius: 1,
              borderBottomEndRadius: 1,
            },
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      )}

      <WebviewWithBridge<MessageEventRequestData, MessageEventResponseData>
        source={source}
        style={{ flex: 1 }}
        ref={webViewRef}
        // ref={ref}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onBridgeMessage={handleBridgeMessage}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadProgress={({ nativeEvent }) => {
          progressAnim.setValue(nativeEvent.progress);
        }}
        onLoadEnd={() => {
          progressAnim.setValue(0);
          setIsLoading(false);
        }}
        // cacheEnabled={false}
        // cacheMode="LOAD_NO_CACHE"
        allowsLinkPreview={false}
        middleware={middleware}
        onReadyToMessage={onReadyToMessage}
        strictMode={false}
        // 뒤로가기, 앞으로가기 기능
        onNavigationStateChange={(navState) =>
          onNavigationStateChange(navState, onNavigate)
        }
        webviewDebuggingEnabled={__DEV__}
        bounces={false}
        overScrollMode="never"
        scrollEnabled={true}
        decelerationRate={0.998}
        contentInsetAdjustmentBehavior="never"
      />
    </View>
  );
};

export default WebViewWithInjected;
