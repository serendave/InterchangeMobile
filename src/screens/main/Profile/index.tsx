import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { useAuthContext } from '../../../context/auth.context';
import { colors, typography } from '../../../styles';
import { Button } from '../../../components';
import { Apollo } from '../../../apollo';
import Config from 'react-native-config';

const Profile = () => {
  const { userData, logOut } = useAuthContext();
  const { data: itemsData } = useQuery(Apollo.queries.items, {
    variables: {
      getItemsInput: {
        user: userData?.id,
      },
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Text style={styles.name}>
          {userData?.firstName} {userData?.lastName}
        </Text>
        <Text style={styles.email}>{userData?.email}</Text>
        <Text>Joined date: {userData?.dateJoined}</Text>
      </View>
      <Text style={styles.itemsTitle}>Items</Text>
      <FlatList
        data={itemsData?.items || []}
        renderItem={(item) => (
          <View style={styles.itemBox} key={item.item.id}>
            <View style={styles.itemInfo}>
              <View style={styles.itemTitle}>
                <Text style={styles.itemName}>{item.item.name}</Text>
                <Text style={styles.itemCategory}>
                  {item.item.category.name}
                </Text>
              </View>
              <Text style={styles.itemDescription}>
                {item.item.description}
              </Text>
            </View>
            {item.item?.photos.map((photo: string, i: number) => (
              <Image
                style={{
                  ...styles.itemImage,
                  marginRight: i != item.item?.photos.length - 1 ? 10 : 0,
                }}
                source={{ uri: `${Config.IMAGES_URL}/${photo}` }}
              />
            ))}
          </View>
        )}
      />
      <Button
        additionalStyles={styles.logoutButton}
        label="Log out"
        onPress={logOut}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  profileInfo: {
    marginVertical: 20,
  },
  name: {
    fontSize: typography.h3,
    color: colors.black,
    marginBottom: 10,
    fontWeight: '700',
  },
  email: {
    fontSize: typography.h4,
    marginBottom: 5,
  },
  itemsTitle: {
    fontSize: typography.h2,
    marginBottom: 10,
  },
  itemBox: {
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 0.7,
    marginBottom: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  itemInfo: {
    marginRight: 'auto',
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 18,
    marginBottom: 5,
    marginRight: 10,
  },
  itemDescription: {
    fontSize: 12,
    color: '#2f2f2f',
  },
  itemCategory: {
    backgroundColor: '#1a88b3',
    color: colors.white,
    fontSize: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1a88b3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  logoutButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});
