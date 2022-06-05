import React, { FC } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useQuery } from '@apollo/client';
import Config from 'react-native-config';
import { colors, typography } from '../../../../styles';
import { Apollo } from '../../../../apollo';
import { useAuthContext } from '../../../../context/auth.context';

const MyItems: FC = () => {
  const { userData } = useAuthContext();

  const { data: itemsData } = useQuery(Apollo.queries.items, {
    variables: {
      getItemsInput: {
        user: userData?.id,
      },
    },
  });

  return (
    <FlatList
      style={styles.container}
      data={itemsData?.items || []}
      ListHeaderComponent={<Text style={styles.itemsTitle}>My Items</Text>}
      renderItem={(item) => (
        <View style={styles.itemBox} key={item.item.id}>
          <View style={styles.itemInfo}>
            <View style={styles.itemTitle}>
              <Text style={styles.itemName}>{item.item.name}</Text>
              <Text style={styles.itemCategory}>{item.item.category.name}</Text>
            </View>
            <Text style={styles.itemDescription}>{item.item.description}</Text>
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
});

export default MyItems;
