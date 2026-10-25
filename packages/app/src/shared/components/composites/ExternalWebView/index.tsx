import { COLOR_PALETTE } from "@shared/constants/colors";
import { AndroidIntent, parseAndroidIntentUrl } from "@shared/utils/intent";
import * as Linking from "expo-linking";
import { useRef, useState } from "react";
import { Animated, View } from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";

// intent:// 는 기본 화이트리스트 밖이라 onShouldStartLoadWithRequest까지 오지 않으므로 추가합니다.
const ORIGIN_WHITELIST = ["http://*", "https://*", "intent://*"];

interface ExternalWebViewProps {
  uri: string;
  loadingBar?: boolean;
}

/**
 * 외부 소스를 띄우는 아우터 웹뷰
 * 외부 페이지는 브릿지 핸드셰이크가 불가능하므로 브릿지 없이 순수 WebView를 사용합니다.
 */
const ExternalWebView = ({ uri, loadingBar = true }: ExternalWebViewProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);

  const handleShouldStartLoadWithRequest = ({ url }: WebViewNavigation) => {
    if (!url.startsWith("intent://")) return true;

    const intent = parseAndroidIntentUrl(url);
    if (intent) openAndroidIntent(intent);
    return false;
  };

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

      <WebView
        source={{ uri }}
        style={{ flex: 1 }}
        originWhitelist={ORIGIN_WHITELIST}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
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
        allowsLinkPreview={false}
        webviewDebuggingEnabled={__DEV__}
        overScrollMode="never"
        bounces={false}
        decelerationRate={0.998}
        contentInsetAdjustmentBehavior="never"
      />
    </View>
  );
};

/**
 * 앱 스킴으로 열고, 앱이 없으면 폴백 URL(스토어 등)로 이동합니다.
 */
const openAndroidIntent = async ({ url, fallbackUrl }: AndroidIntent) => {
  try {
    await Linking.openURL(url);
  } catch {
    if (!fallbackUrl) return;
    try {
      await Linking.openURL(fallbackUrl);
    } catch (error) {
      console.warn("[ExternalWebView] intent 폴백 열기 실패", error);
    }
  }
};

export default ExternalWebView;
