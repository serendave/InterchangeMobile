import React, { FC, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/AntDesign';
import { SwipeablePanel } from 'rn-swipeable-panel';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Slider from '@react-native-community/slider';
import { ItemStackParamList, ItemStackRouteName } from '../../../../types';
import { Apollo } from '../../../../apollo';
import { colors } from '../../../../styles';
import { Item, TextInput, Dropdown, Button } from '../../../../components';
import { useDebounce } from 'use-debounce';

type ItemsListProps = NativeStackScreenProps<
  ItemStackParamList,
  ItemStackRouteName.ItemsList
>;

const sortValues = ['Name', 'Date'];

const ItemsList: FC<ItemsListProps> = ({ navigation }) => {
  const { data: itemsData, refetch: getItems } = useQuery(Apollo.queries.items);
  const { data: categoriesData } = useQuery(Apollo.queries.categories);

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>();
  const [debouncedSearch] = useDebounce(search, 1000);

  const [sortValueIndex, setSortValueIndex] = useState<number>();
  const [category, setCategory] = useState<any>();
  const [rangeNumber, setRangeNumber] = useState<number>();

  const toggleFilters = () => {
    setFiltersOpen((_filters: boolean) => !_filters);
  };

  const getItemsWithFilters = () => {
    const getItemsInput: Record<string, any> = {};

    if (debouncedSearch) {
      getItemsInput.search = debouncedSearch;
    }

    if (category) {
      getItemsInput.category = category.id;
    }

    if (rangeNumber) {
      getItemsInput.range = rangeNumber;
    }

    if (sortValueIndex) {
      getItemsInput.sortBy = sortValueIndex === 0 ? 'name' : 'dateCreated';
    }

    setFiltersOpen(false);

    getItems({ getItemsInput });
  };

  useEffect(() => {
    getItemsWithFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <>
      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <View style={styles.headerBox}>
            <Text style={styles.headerTitle}>
              Search for items in your area
            </Text>
            <View style={styles.filtersBox}>
              <View style={styles.search}>
                <TextInput
                  keyboardAppearance="dark"
                  placeholder="Search for items"
                  autoCapitalize="none"
                  value={search}
                  onChangeText={setSearch}
                />
              </View>
              <TouchableOpacity
                style={styles.filtersBtn}
                activeOpacity={0.7}
                onPress={toggleFilters}>
                <Text style={styles.filtersText}>Filters</Text>
                <Icon
                  name={filtersOpen ? 'caretup' : 'caretdown'}
                  color={colors.black}
                  size={15}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        data={itemsData?.items ?? []}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ItemStackRouteName.ItemDetails, {
                id: item.id,
              });
            }}>
            <Item key={index} data={item} />
          </TouchableOpacity>
        )}
      />
      <SwipeablePanel
        fullWidth
        showCloseButton
        isActive={filtersOpen}
        openLarge
        style={styles.swipePanelStyle}
        onClose={() => setFiltersOpen(false)}>
        <View style={styles.filtersPanel}>
          <View style={styles.sorting}>
            <Text style={styles.sortingText}>Sort by</Text>
            <SegmentedControl
              values={sortValues}
              selectedIndex={sortValueIndex}
              onChange={(e) => {
                setSortValueIndex(e.nativeEvent.selectedSegmentIndex);
              }}
            />
          </View>
          <View style={styles.filterCategory}>
            <Text>Category:</Text>
            <Dropdown
              style={styles.dropdownCategory}
              placeholder="Select category"
              labelField="name"
              valueField="id"
              value={category?.id}
              onChange={(value) => setCategory(value)}
              data={
                categoriesData?.categories?.length
                  ? categoriesData.categories.concat({ name: 'All' })
                  : []
              }
            />
          </View>
          <View style={styles.searchRange}>
            <Text>Search items withing range (km):</Text>
            <Slider
              minimumValue={50}
              maximumValue={200}
              onValueChange={(value) => setRangeNumber(value)}
            />
            <View style={styles.rangeValues}>
              <Text>50</Text>
              <Text>200</Text>
            </View>
          </View>
          <Button
            buttonStyles={styles.applyFiltersBtn}
            label="Apply filters"
            onPress={getItemsWithFilters}
          />
        </View>
      </SwipeablePanel>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerBox: {
    display: 'flex',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemBox: {
    padding: 20,
    borderColor: colors.border,
    borderBottomWidth: 1,
  },
  filtersBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 15,
  },
  search: {
    flex: 1,
    marginRight: 10,
  },
  filtersBtn: {
    borderRadius: 8,
    paddingHorizontal: 10,
    minWidth: 75,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.border,
    borderWidth: 1,
  },
  filtersText: {
    marginRight: 5,
  },
  filtersPanel: {
    padding: 20,
  },
  swipePanelStyle: {
    maxHeight: '70%',
  },
  sorting: {
    paddingBottom: 10,
    marginBottom: 20,
    borderColor: colors.border,
    borderBottomWidth: 1,
  },
  sortingText: {
    marginBottom: 10,
  },
  filterCategory: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownCategory: {
    flex: 1,
    marginLeft: 20,
  },
  searchRange: {
    marginTop: 10,
  },
  applyFiltersBtn: {
    marginTop: 15,
    alignSelf: 'center',
  },
  rangeValues: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ItemsList;
