import React, {useState, useMemo} from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, {
  Marker,
  Callout,
  PROVIDER_OPENSTREETMAP,
} from "react-native-maps";
import { styles } from "./styles";
import { useLocation } from "../../hooks/useLocation";
import { POI_DATA } from "../../data/poi";

import FilterDropdown from "../../components/FilterDropdown/FilterDropdown"
import ServiceList from "../../components/ServiceList/ServiceList";

export default function MapScreen({ navigation }) {
  const { location, errorMsg, isLoading } = useLocation();
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

  // Set the initial map region to the user's location, if any
  const initialRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }
    : {
        // default coords (will specify later)
        latitude: 4.0502,
        longitude: 9.7676,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

  return (
    <View style={styles.container}>
      {/* <FilterDropdown filter={filter} onValueChange={setFilter} /> */}
      {/* <ServiceList data={filteredData} onSelectItem={goToDetails} /> */}
      <MapView
        style={styles.map}
        provider={PROVIDER_OPENSTREETMAP}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {filteredData.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={poi.coordinates}
            title={poi.name}
            description={poi.type}
            // calloutAnchor={{ x: 0.5, y: 0.1 }}
          >
            <Callout onPress={() => goToDetails(poi)}></Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
