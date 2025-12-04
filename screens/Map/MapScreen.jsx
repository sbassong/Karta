import { useState, useMemo, useRef, useCallback } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import {
  MapView,
  Camera,
  PointAnnotation,
  UserLocation,
} from "@maplibre/maplibre-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";
import { useLocation } from "../../hooks/useLocation";
import { MaterialIcons } from "@expo/vector-icons";
import { WarmCommunityColors } from "../../utilities/theme";

import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import ServiceList from "../../components/ServiceList/ServiceList";
import MapButtons from "../../components/MapButtons/MapButtons";
import { CustomMarkerIcon } from "../../components/ServiceIcon/ServiceIcon";
import { OSM_RASTER_STYLE } from "../../utilities/mapStyle";

const Colors = WarmCommunityColors.light;

export default function MapScreen({ navigation }) {
  const { location, errorMsg, isLoading } = useLocation();
  const cameraRef = useRef(null);

  const [viewMode, setViewMode] = useState("map"); // 'map' or 'list'
  const [filter, setFilter] = useState("All");
  const [allPois, setAllPois] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);

  // memoized re-calculation of the list when the filter or data changes
  const filteredPois = useMemo(() => {
    if (filter === "All") {
      return allPois;
    }
    return allPois.filter((poi) => poi.type === filter);
  }, [filter, allPois]);

  const goToDetails = (poi) => {
    navigation.navigate("Details", { item: poi });
  };

  const goToAbout = () => {
    navigation.navigate("About");
  };

  const centerOnUser = () => {
    if (location && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [location.longitude, location.latitude],
        zoomLevel: 14,
        animationDuration: 1000,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchPois = async () => {
        try {
          console.log(" ")
          console.log("=> Fetching POIs from DB...");
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_BASE_URL_ANDROID}/api/pois`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) throw new Error("Server error");

          const data = await response.json();
          console.log(`=> Loaded ${data.length} POIs`);

          setAllPois(data);
        } catch (error) {
          console.error("Fetch failed:", error);
        }
      };

      fetchPois();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* dropdown and view mode icon */}
      <View style={styles.topBar}>
        <FilterDropdown filter={filter} onValueChange={setFilter} />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setViewMode(viewMode === "map" ? "list" : "map")}
        >
          {viewMode === "map" ? (
            <MaterialIcons name="list" size={30} color={Colors.icon} />
          ) : (
            <MaterialIcons name="map" size={30} color={Colors.icon} />
          )}
        </TouchableOpacity>
      </View>

      {viewMode === "map" ? (
        <>
          <MapView
            style={styles.map}
            mapStyle={JSON.stringify(OSM_RASTER_STYLE)}
            logoEnabled={false}
            attributionEnabled={true}
          >
            {/* handles the view region */}
            <Camera
              ref={cameraRef}
              defaultSettings={{
                centerCoordinate: [10.922643, 3.596563], // lng first
                zoomLevel: 12,
              }}
            />
            <UserLocation
              visible={true}
              // showsUserHeadingIndicator={true}
            />

            {filteredPois?.length > 0 &&
              filteredPois?.map((poi) => (
                <PointAnnotation
                  key={poi._id}
                  id={poi._id}
                  // !! object {lat, long} needs to be converted to Array [long, lat]
                  coordinate={[
                    poi.coordinates.longitude,
                    poi.coordinates.latitude,
                  ]}
                  onSelected={() => setSelectedPoi(poi)}
                  onDeselected={() => setSelectedPoi(null)}
                >
                  <CustomMarkerIcon type={poi.type} />
                </PointAnnotation>
              ))}
          </MapView>
          {selectedPoi && (
            <View style={styles.bottomCardContainer}>
              <View style={styles.bottomCard}>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{selectedPoi.name}</Text>
                  <Text style={styles.cardSubtitle}>{selectedPoi.type}</Text>
                </View>

                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => goToDetails(selectedPoi)}
                >
                  <Text style={styles.buttonText}>Details</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      ) : (
        <ServiceList data={filteredPois} onSelectItem={goToDetails} />
      )}

      <MapButtons
        onHelpPress={goToAbout}
        onLocationPress={centerOnUser}
        viewMode={viewMode}
      />
    </View>
  );
}
