module.exports = {
  expo: {
    name: "karta",
    slug: "karta",
    version: "1.0.0",
    android: {
      package: "com.karta",
      googleServicesFile: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES,
    },
    ios: {
      bundleIdentifier: "com.karta.ios",
      googleServicesFile: process.env.EXPO_PUBLIC_IOS_GOOGLE_SERVICES,
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/messaging",
      "@maplibre/maplibre-react-native",
      [
        "expo-build-properties",
        {
          android: {
            useAndroidX: true,
            useTextureView: true,
          },
        },
      ],
    ],
  },
};