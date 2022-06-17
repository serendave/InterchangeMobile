import React, { FC } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { typography } from '../../../../styles';
import { Apollo } from '../../../../apollo';
import { useAuthContext } from '../../../../context/auth.context';
import { Item } from '../../../../components';

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
      ListEmptyComponent={<Text>You have no upcoming events</Text>}
      renderItem={({ item, index }) => <Item key={index} data={item} />}
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
});

export default MyItems;
