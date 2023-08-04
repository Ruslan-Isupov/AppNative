import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{
          flex: 1,
        }}
        showUserLocation={true}
        initialRegion={{
          latitude: 50.450001,
          longitude: 30.5234,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        zoomEnabled={true}
      ></MapView>
      <Marker
        coordinate={{ latitude: 50.450001, longitude: 30.5234 }}
        title="I am here"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MapScreen;
