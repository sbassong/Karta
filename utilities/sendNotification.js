const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const sendNotification = async (eventData) => {
  try {
    const response = await fetch(`${BASE_URL}/trigger-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("Notification sent:", responseData);
    } else {
      console.error("Dispatch failed:", responseData.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export default sendNotification;
