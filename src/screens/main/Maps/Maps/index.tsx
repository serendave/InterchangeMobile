import { useQuery } from '@apollo/client';
import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SwipeablePanel } from 'rn-swipeable-panel';
import Icon from 'react-native-vector-icons/AntDesign';
import { Apollo } from '../../../../apollo';
import { Button, TextInput } from '../../../../components';
import { useAuthContext } from '../../../../context/auth.context';
import { colors, typography } from '../../../../styles';
import { MapsStackParamList, MapsStackRouteName } from '../../../../types';

let eventData: any;

type MapsProps = NativeStackScreenProps<
  MapsStackParamList,
  MapsStackRouteName.Maps
>;

const Maps: FC<MapsProps> = ({ navigation }) => {
  const { userData } = useAuthContext();
  const [, setRegion] = useState<Region>();
  const [panelOpen, setPanelOpen] = useState<boolean>(false);

  const { data: eventsData } = useQuery(Apollo.queries.events);

  return (
    <View style={styles.container}>
      {userData?.location ? (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: +userData?.location?.latitude,
              longitude: +userData?.location?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            minZoomLevel={12}
            onRegionChange={setRegion}>
            {eventsData?.events.map((event: any) => (
              <Marker
                key={event.id}
                title={event.name}
                description={event.description}
                coordinate={{
                  latitude: event.location.latitude,
                  longitude: event.location.longitude,
                }}
                onPress={() => {
                  eventData = { ...event };
                  setPanelOpen(true);
                }}
              />
            ))}
          </MapView>
          <View style={styles.searchBox}>
            <View style={styles.search}>
              <TextInput
                placeholder="Search events by name"
                autoCapitalize="none"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.addEvent}
            onPress={() => navigation.navigate(MapsStackRouteName.CreateEvent)}>
            <Icon name="plus" size={30} color={colors.darkGray} />
          </TouchableOpacity>
        </>
      ) : null}
      <SwipeablePanel
        fullWidth
        showCloseButton
        onlySmall
        isActive={panelOpen}
        onClose={() => setPanelOpen(false)}>
        <View style={styles.eventInfoBox}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{eventData?.name}</Text>
            <Text style={styles.eventAuthor}>
              Creator: {eventData?.creator?.firstName}{' '}
              {eventData?.creator?.lastName}
            </Text>
            <Text style={styles.eventDescription}>
              {eventData?.description.length > 200
                ? `${eventData.description.slice(0, 200)}...`
                : eventData?.description}
            </Text>
          </View>
        </View>
        <Button
          buttonStyles={styles.eventJoinBtn}
          label="Event details"
          onPress={() => {
            navigation.navigate(MapsStackRouteName.EventDetails, {
              id: eventData?.id,
            });

            setPanelOpen(false);
          }}
        />
      </SwipeablePanel>
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
  searchBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    position: 'absolute',
    top: 20,
  },
  search: {
    backgroundColor: colors.white,
    flex: 2,
    marginRight: 10,
  },
  eventInfoBox: {
    padding: 20,
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.gray,
  },
  eventAuthor: {
    fontSize: 14,
    marginBottom: 15,
  },
  eventJoinBtn: {
    alignSelf: 'center',
  },
  addEvent: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Maps;
