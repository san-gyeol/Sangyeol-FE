export interface AndroidIntent {
  url: string;
  fallbackUrl?: string;
}

/**
 * 안드로이드 intent:// URL을 앱 스킴 URL과 폴백 URL로 변환합니다.
 * RN Linking은 intent:// 를 해석하지 못하므로 scheme을 꺼내 직접 열어야 합니다.
 * @see https://developer.chrome.com/docs/android/intents
 * @example
 * parseAndroidIntentUrl("intent://plusfriend/chat/_x#Intent;scheme=kakaoplus;package=com.kakao.talk;end");
 * // { url: "kakaoplus://plusfriend/chat/_x", fallbackUrl: "market://details?id=com.kakao.talk" }
 */
export const parseAndroidIntentUrl = (url: string): AndroidIntent | null => {
  const match = /^intent:\/\/([^#]*)#Intent;(.*)end$/.exec(url);
  if (!match) return null;

  const [, path, extras] = match;
  const params = Object.fromEntries(
    extras.split(";").map((param) => {
      const [key, ...value] = param.split("=");
      return [key, value.join("=")];
    }),
  );
  if (!params.scheme) return null;

  const browserFallbackUrl = params["S.browser_fallback_url"];
  const fallbackUrl = browserFallbackUrl
    ? decodeURIComponent(browserFallbackUrl)
    : params.package
      ? `market://details?id=${params.package}`
      : undefined;

  return { url: `${params.scheme}://${path}`, fallbackUrl };
};
