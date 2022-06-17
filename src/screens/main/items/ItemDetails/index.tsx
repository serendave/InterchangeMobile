import React, { FC } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Config from 'react-native-config';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { DEFAULT_PHOTO } from '../../../../assets/img';
import { ItemStackParamList, ItemStackRouteName } from '../../../../types';
import { Apollo } from '../../../../apollo';
import { colors, typography } from '../../../../styles';

type ItemDetailsProps = NativeStackScreenProps<
  ItemStackParamList,
  ItemStackRouteName.ItemDetails
>;

const ItemDetails: FC<ItemDetailsProps> = ({ route }) => {
  const { id } = route.params;

  const { data: itemData } = useQuery(Apollo.queries.getItem, {
    variables: { id },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{itemData?.item.name}</Text>
      <Text style={styles.itemDescription}>{itemData?.item.description}</Text>
      {itemData?.item.photos.length ? (
        <View style={styles.itemImagesRow}>
          {itemData.item.photos.map((photo: string, i: number) => (
            <Image
              style={{
                ...styles.itemImage,
                marginRight: i < itemData.item.photos.length ? 20 : 0,
              }}
              source={{ uri: `${Config.IMAGES_URL}/${photo}` }}
            />
          ))}
        </View>
      ) : (
        <Text>There are no images for this item</Text>
      )}
      <View style={styles.itemCategoryBox}>
        <Text style={styles.categoryText}>Category:</Text>
        <Text style={styles.itemCategory}>{itemData?.item.category.name}</Text>
      </View>
      <View style={styles.dateCreatedBox}>
        <Text>Date created: </Text>
        <Text>{moment(itemData?.item.dateCreated).format('DD MMM YYYY')}</Text>
      </View>
      <View style={styles.authorBox}>
        <Text style={styles.authorTitle}>Author: </Text>
        <View style={styles.authorInfoBox}>
          <Image
            style={styles.authorPhoto}
            source={{
              uri: itemData?.item.user?.photo
                ? `${Config.IMAGES_URL}/${itemData?.item.user?.photo}`
                : DEFAULT_PHOTO,
            }}
          />
          <View>
            <Text>
              {itemData?.item?.user.firstName} {itemData?.item?.user.lastName}
            </Text>
            <Text>{itemData?.item?.user.email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemName: {
    fontSize: typography.h2,
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 14,
    color: colors.darkGray,
  },
  itemImagesRow: {
    borderColor: colors.darkGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemCategoryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 18,
    marginTop: 5,
  },
  itemCategory: {
    backgroundColor: '#1a88b3',
    color: colors.white,
    fontSize: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1a88b3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
    marginLeft: 5,
    marginTop: 10,
  },
  dateCreatedBox: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  authorBox: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorInfoBox: {
    flexDirection: 'row',
  },
  authorPhoto: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  authorTitle: {
    marginRight: 10,
  },
});

export default ItemDetails;
