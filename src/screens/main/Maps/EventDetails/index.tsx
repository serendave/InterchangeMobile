import React, { FC } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQuery } from '@apollo/client';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { Apollo } from '../../../../apollo';
import { Button, PhotosRow } from '../../../../components';
import { colors, typography } from '../../../../styles';
import {
  MainStackParamList,
  MainStackRouteName,
  MapsStackParamList,
  MapsStackRouteName,
  ProfileStackRouteName,
} from '../../../../types';
import { useAuthContext } from '../../../../context/auth.context';
import { DEFAULT_PHOTO } from '../../../../assets/img';

type EventDetailsProps = NativeStackScreenProps<
  MapsStackParamList & MainStackParamList,
  MapsStackRouteName.EventDetails
>;

const EventDetails: FC<EventDetailsProps> = ({ route, navigation }) => {
  const { id } = route.params;

  const { userData } = useAuthContext();

  const { data: eventData } = useQuery(Apollo.queries.getEvent, {
    variables: { id },
  });

  const [joinEvent] = useMutation(Apollo.mutations.joinEvent, {
    onCompleted(data) {
      if (data?.joinEvent.id) {
        Toast.show({
          type: 'success',
          text1: "You've successfully joined the event",
        });

        setTimeout(() => {
          navigation.navigate(MainStackRouteName.ProfileNavigator, {
            screen: ProfileStackRouteName.Profile,
          });
        }, 1000);
      }
    },
    onError(error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  });

  const joinEventHandler = () => {
    joinEvent({
      variables: {
        joinEventInput: {
          userId: userData?.id,
          eventId: eventData?.event.id,
        },
      },
    });
  };

  return (
    <FlatList
      style={styles.container}
      data={eventData?.event.visitors}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>{eventData?.event.name}</Text>
          <Text style={styles.creator}>
            Creator: {eventData?.event.creator.firstName}{' '}
            {eventData?.event.creator.lastName}
          </Text>
          <PhotosRow data={[]} />
          <View style={styles.descriptionBox}>
            <Text style={styles.description}>
              {eventData?.event.description}
            </Text>
          </View>
          <Text style={styles.participantsTitle}>Participants:</Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.emptyComponent}>
          Currently there are no active visitors
        </Text>
      }
      ListFooterComponent={
        <View style={styles.joinEvent}>
          <Button label="Join event" onPress={joinEventHandler} />
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.visitorsBox}>
          <Image
            style={styles.visitorPhoto}
            source={{
              uri: item.photo
                ? `${Config.IMAGES_URL}/${item.photo}`
                : DEFAULT_PHOTO,
            }}
          />
          <View>
            <Text style={styles.visitorInfo}>{item.firstName}</Text>
            <Text style={styles.visitorInfo}>{item.lastName}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: typography.h1,
    marginBottom: 5,
  },
  creator: {
    fontSize: 18,
    color: colors.darkGray,
    marginBottom: 10,
    marginLeft: 2,
  },
  descriptionBox: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingVertical: 10,
  },
  description: {
    fontSize: 14,
    color: colors.darkGray,
  },
  participantsTitle: {
    fontSize: typography.h2,
    marginBottom: 5,
  },
  visitorsBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  visitorPhoto: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  visitorInfo: {
    fontSize: 16,
  },
  joinEvent: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  emptyComponent: {
    color: colors.gray,
    fontSize: 16,
    paddingVertical: 10,
    marginLeft: 5,
  },
});

export default EventDetails;
