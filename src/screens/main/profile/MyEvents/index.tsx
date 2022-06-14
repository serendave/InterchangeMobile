import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Text, StyleSheet, FlatList, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Apollo } from '../../../../apollo';
import { colors, typography } from '../../../../styles';
import { useAuthContext } from '../../../../context/auth.context';
import {
  MainStackParamList,
  MainStackRouteName,
  MapsStackRouteName,
  ProfileStackParamList,
  ProfileStackRouteName,
} from '../../../../types';

type MyEventsProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, ProfileStackRouteName.MyEvents>,
  BottomTabScreenProps<MainStackParamList, MainStackRouteName.ProfileNavigator>
>;

const MyEvents: FC<MyEventsProps> = ({ navigation }) => {
  const { userData } = useAuthContext();

  const { data: eventsData } = useQuery(Apollo.queries.events, {
    variables: {
      getEventsInput: {
        visitorId: userData?.id,
      },
    },
  });

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={<Text style={styles.itemsTitle}>MyEvents</Text>}
      data={eventsData?.events || []}
      renderItem={({ item, index }) => (
        <View
          style={{ ...styles.eventsBox, borderTopWidth: index === 0 ? 1 : 0 }}
          key={item.id}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDescription}>
              {item.description.length > 40
                ? `${item.description.slice(0, 40)}...`
                : item.description}
            </Text>
          </View>
          <Button
            title="Details"
            onPress={() => {
              navigation.navigate(MainStackRouteName.MapsNavigator, {
                screen: MapsStackRouteName.EventDetails,
                params: { id: item.id ?? '' },
              });
            }}
          />
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
  itemsTitle: {
    fontSize: typography.h2,
    marginBottom: 10,
  },
  eventsBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderColor: colors.border,
    borderBottomWidth: 1,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 10,
    color: colors.darkGray,
  },
});

export default MyEvents;
