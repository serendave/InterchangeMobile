import React, { FC } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthContext } from '../../../../context/auth.context';
import { typography, colors } from '../../../../styles';
import {
  ProfileStackParamList,
  ProfileStackRouteName,
  MainStackParamList,
  MainStackRouteName,
  MapsStackRouteName,
} from '../../../../types';
import { useQuery } from '@apollo/client';
import { Apollo } from '../../../../apollo';

type InvitationsProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, ProfileStackRouteName.MyEvents>,
  BottomTabScreenProps<MainStackParamList, MainStackRouteName.ProfileNavigator>
>;

const Invitations: FC<InvitationsProps> = ({ navigation }) => {
  const { userData } = useAuthContext();

  const { data: invitesData } = useQuery(Apollo.queries.invites, {
    variables: {
      getInvitesInput: {
        userId: userData?.id,
      },
    },
  });

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={<Text style={styles.title}>Invitations</Text>}
      ListEmptyComponent={<Text>You have no upcoming events</Text>}
      data={invitesData?.invites || []}
      renderItem={({ item, index }) => (
        <View
          style={{ ...styles.invitesBox, borderTopWidth: index === 0 ? 1 : 0 }}
          key={item.id}>
          <View style={styles.inviteInfo}>
            <Text style={styles.inviteName}>{item.event.name}</Text>
            <Text style={styles.inviteDescription}>
              {item.event.description.length > 40
                ? `${item.event.description.slice(0, 40)}...`
                : item.event.description}
            </Text>
          </View>
          <Button
            title="Details"
            onPress={() => {
              navigation.navigate(MainStackRouteName.MapsNavigator, {
                screen: MapsStackRouteName.EventDetails,
                params: { id: item.event.id ?? '' },
              });
            }}
          />
        </View>
      )}
    />
  );
};

export default Invitations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: typography.h2,
    marginBottom: 10,
  },
  invitesBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderColor: colors.border,
    borderBottomWidth: 1,
  },
  inviteInfo: {
    flex: 1,
  },
  inviteName: {
    fontSize: 18,
    marginBottom: 5,
  },
  inviteDescription: {
    fontSize: 10,
    color: colors.darkGray,
  },
});
