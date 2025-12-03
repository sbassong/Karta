import "dotenv/config";
import fs from "fs";
import path from "path";


if (process.env.EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES) {
  try {
    fs.writeFileSync(
      path.resolve(__dirname, "google-services.json"),
      process.env.EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES
    );
  } catch (error) {
    console.error("Error writing google-services.json:", error);
  }
}

if (process.env.EXPO_PUBLIC_IOS_GOOGLE_SERVICES) {
  try {
    fs.writeFileSync(
      path.resolve(__dirname, "GoogleService-Info.plist"),
      process.env.EXPO_PUBLIC_IOS_GOOGLE_SERVICES
    );
  } catch (error) {
    console.error("Error writing GoogleService-Info.plist:", error);
  }
}

export default ({config}) => {
  
    return {
      ...config,
      name: "karta",
      slug: "karta",
      version: "1.1.0",
      android: {
        package: "com.karta",
        googleServicesFile: "./google-services.json",
      },
      ios: {
        bundleIdentifier: "com.karta.ios",
        googleServicesFile: "./GoogleService-Info.plist",
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
    };
  
};
