import React, { useState, useMemo, useRef } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import {
  MapView,
  Camera,
  PointAnnotation,
  Callout,
} from "@maplibre/maplibre-react-native";
import { styles } from "./styles";
import { useLocation } from "../../hooks/useLocation";
import { POI_DATA } from "../../data/poi";
import { MaterialIcons } from "@expo/vector-icons";
import { WarmCommunityColors } from "../../utilities/theme";

import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import ServiceList from "../../components/ServiceList/ServiceList";
import MapButtons from "../../components/MapButtons/MapButtons";
import { CustomMarkerIcon } from "../../components/ServiceIcon/ServiceIcon";
import { OSM_RASTER_STYLE } from "../../utilities/mapStyle";

const Colors = WarmCommunityColors.light;

export default function MapScreen({ navigation, user }) {
  const { location, errorMsg, isLoading } = useLocation();
  const cameraRef = useRef(null);

  const [viewMode, setViewMode] = useState("map"); // 'map' or 'list'
  const [filter, setFilter] = useState("All");

  // memoized re-calculation of the list when the filter or data changes
  const filteredData = useMemo(() => {
    if (filter === "All") {
      return POI_DATA;
    }
    return POI_DATA.filter((poi) => poi.type === filter);
  }, [filter]);

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

      {/* conditionally render map or list */}
      {viewMode === "map" ? (
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

          {filteredData.map((poi) => (
            <PointAnnotation
              key={poi.id}
              id={poi.id}
              // !! object {lat, long} needs to be converted to Array [long, lat]
              coordinate={[poi.coordinates.longitude, poi.coordinates.latitude]}
            >
              <CustomMarkerIcon type={poi.type} />

              {/* bubble/tooltip that appears when clicked */}
              <Callout onPress={() => goToDetails(poi)}>
                <View style={styles.calloutBubble}>
                  <Text style={styles.calloutText}>{poi.name}</Text>
                  <Text style={styles.calloutSubText}>Tap for details</Text>
                </View>
              </Callout>
            </PointAnnotation>
          ))}
        </MapView>
      ) : (
        <ServiceList data={filteredData} onSelectItem={goToDetails} />
      )}

      <MapButtons
        onHelpPress={goToAbout}
        onLocationPress={centerOnUser}
        viewMode={viewMode}
      />
    </View>
  );
}
