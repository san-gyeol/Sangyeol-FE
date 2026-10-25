const appConfig = {
  expo: {
    name: "산결",
    slug: "sangyeol",
    version: "0.0.2",
    orientation: "portrait",
    icon: "./assets/images/App_Icon.png",
    scheme: "sangyeol",
    userInterfaceStyle: "automatic",
    ios: {
      bundleIdentifier: "com.sansan.sangyeol",
      infoPlist: {
        NSMotionUsageDescription:
          "산행 중 위치 추적의 정확도를 높이기 위해 모션 데이터를 사용합니다.",
      },
    },
    android: {
      package: "com.sansan.sangyeol",
      versionCode: 2,
      adaptiveIcon: {
        foregroundImage: "./assets/images/App_Icon.png",
        backgroundColor: "#ffffff",
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-image",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#EAF2EE",
          image: "./assets/images/splash-logo.png",
          imageWidth: 130,
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission:
            "$(PRODUCT_NAME)이 위치 정보를 사용하도록 허용합니다.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    updates: {
      url: "https://u.expo.dev/771bd71e-9bd9-42bc-809c-d0207f8329d3",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      eas: {
        projectId: "771bd71e-9bd9-42bc-809c-d0207f8329d3",
      },
    },
    owner: "geongyu09",
  },
};

export default appConfig;
