import React, { FC } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { colors } from '../../styles';

type ItemProps = {
  data: any;
};

const Item: FC<ItemProps> = ({ data }) => {
  return (
    <View style={styles.itemBox} key={data.id}>
      <View style={styles.itemInfo}>
        <View style={styles.itemTitle}>
          <Text style={styles.itemName}>{data.name}</Text>
          <Text style={styles.itemCategory}>{data.category.name}</Text>
        </View>
        <Text style={styles.itemDescription}>{data.description}</Text>
      </View>
      {data?.photos.map((photo: string, i: number) => (
        <Image
          style={{
            ...styles.itemImage,
            marginRight: i != data?.photos.length - 1 ? 10 : 0,
          }}
          source={{ uri: `${Config.IMAGES_URL}/${photo}` }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Item;
