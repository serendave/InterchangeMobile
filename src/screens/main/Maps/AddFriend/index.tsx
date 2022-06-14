import React, { FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useLazyQuery, useMutation } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { useDebounce } from 'use-debounce';
import Config from 'react-native-config';
import { Apollo } from '../../../../apollo';
import { MapsStackParamList, MapsStackRouteName } from '../../../../types';
import { Button, TextInput } from '../../../../components';
import { colors } from '../../../../styles';
import { DEFAULT_PHOTO } from '../../../../assets/img';

type AddFriendProps = NativeStackScreenProps<
  MapsStackParamList,
  MapsStackRouteName.AddFriend
>;

const AddFriend: FC<AddFriendProps> = ({ route }) => {
  const { id } = route.params;

  const [search, setSearch] = useState<string>();
  const [debouncedSearch] = useDebounce(search, 1000);

  const [users, setUsers] = useState<any[]>([]);

  const [getUsers, { loading }] = useLazyQuery(Apollo.queries.getUsers, {
    variables: {
      getUsersInput: {
        email: debouncedSearch,
        checkForInvite: true,
      },
    },
    onCompleted(data) {
      setUsers(data.users);
    },
    onError(error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  });

  const [sendInvite] = useMutation(Apollo.mutations.createInvite, {
    onCompleted(data) {
      if (data.createInvite) {
        Toast.show({
          type: 'success',
          text1: 'You have successfully send an invite',
        });
      }

      getUsers();
    },
    onError(error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  });

  useEffect(() => {
    if (debouncedSearch?.length) {
      getUsers();
    } else {
      setUsers([]);
    }
  }, [debouncedSearch, getUsers]);

  return loading ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <FlatList
      ListHeaderComponent={
        <View style={styles.searchInput}>
          <TextInput
            autoFocus
            value={search}
            keyboardAppearance="dark"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="Enter email of the person you would like to invite"
            onChangeText={setSearch}
            autoCapitalize="none"
          />
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.emptyComponent}>No users found</Text>
      }
      style={styles.container}
      data={users}
      renderItem={({ item }) => {
        const isAlreadyInvited = item.invitations?.some(
          (invitiation: any) => invitiation.event.id === id,
        );

        return (
          <View style={styles.userBox}>
            <Image
              style={styles.userImage}
              source={{
                uri: item.photo
                  ? `${Config.IMAGES_URL}/${item.photo}`
                  : DEFAULT_PHOTO,
              }}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            {isAlreadyInvited ? (
              <Button
                label="Invited"
                disabled={true}
                buttonStyles={styles.sendInvite}
                textStyles={styles.sendInviteText}
              />
            ) : (
              <Button
                label="Send invite"
                buttonStyles={styles.sendInvite}
                textStyles={styles.sendInviteText}
                onPress={() => {
                  sendInvite({
                    variables: {
                      createInviteInput: {
                        userId: item.id,
                        eventId: id,
                      },
                    },
                  });
                }}
              />
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  emptyComponent: {
    marginVertical: 10,
    fontSize: 16,
    color: colors.darkGray,
    alignSelf: 'center',
  },
  searchInput: {
    marginBottom: 10,
  },
  userBox: {
    padding: 15,
    borderColor: colors.border,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: colors.darkGray,
  },
  sendInvite: {
    width: 100,
    height: 30,
    fontSize: 12,
  },
  sendInviteText: {
    fontSize: 14,
  },
});

export default AddFriend;
