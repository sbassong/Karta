export const addImageToPoi = async (poiId, imageUrl) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL_ANDROID}/api/pois/${poiId}/images`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      }
    );

    if (!response.ok) throw new Error("Failed to update POI");

    const updatedPoi = await response.json();
    return updatedPoi;
  } catch (error) {
    console.error("Database Update Failed:", error);
  }
};
