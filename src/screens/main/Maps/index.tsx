import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useAuthContext } from '../../../context/auth.context';

const DEFAULT_LOCATION = {
  latitude: 37.87825,
  longitude: -122.4324,
};

const Maps: FC = () => {
  const { userData } = useAuthContext();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: +(
            userData?.location?.latitude || DEFAULT_LOCATION.latitude
          ),
          longitude: +(
            userData?.location.longitude || DEFAULT_LOCATION.longitude
          ),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
