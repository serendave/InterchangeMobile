import { useMutation } from '@apollo/client';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-image-crop-picker';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { Apollo } from '../../../../apollo';
import { Button, PhotosRow, TextInput } from '../../../../components';
import { colors, typography } from '../../../../styles';
import Config from 'react-native-config';
import {
  MainStackParamList,
  MainStackRouteName,
  MapsStackParamList,
  MapsStackRouteName,
  ProfileStackRouteName,
} from '../../../../types';
import axios from 'axios';

const newEventSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

type CreateEventProps = CompositeScreenProps<
  NativeStackScreenProps<MapsStackParamList, MapsStackRouteName.CreateEvent>,
  BottomTabScreenProps<MainStackParamList, MainStackRouteName.MapsNavigator>
>;

const sortValues = ['Public', 'Private'];

const CreateEvent: FC<CreateEventProps> = ({ navigation }) => {
  const [imagesArray, setImagesArray] = useState<Image[]>([]);
  const [publicValueIndex, setPublicValueIndex] = useState<number>(0);

  const [addressSuggestions, setAddressSuggestions] = useState<any[]>();
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const getAddressSuggestions = useCallback(async (query: string) => {
    setSuggestionsLoading(true);

    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        {
          params: {
            input: query,
            key: Config.GOOGLE_MAPS_API_KEY,
          },
        },
      );

      const suggestions = response.data?.predictions.map((prediction: any) => ({
        title: prediction.description,
        id: prediction.place_id,
      }));

      setAddressSuggestions(suggestions);
    } catch (e) {
      console.log(e);
    }

    setSuggestionsLoading(false);
  }, []);

  const [createEvent] = useMutation(Apollo.mutations.createEvent, {
    async onCompleted(data) {
      const formData = new FormData();
      formData.append('eventId', data.createEvent.id);

      imagesArray.forEach((image) => {
        formData.append('files', {
          name: 'image.jpg',
          type: 'image/jpg',
          uri: Platform.OS === 'android' ? image.path : image.sourceURL,
        });
      });

      try {
        const rawResponse = await fetch(
          `${Config.API_URL}/api/events/upload-images`,
          {
            method: 'POST',
            body: formData,
          },
        );

        const response = await rawResponse.json();

        if (response.status === 201) {
          Toast.show({
            type: 'success',
            text1: "You've successfulyl created an event",
          });
        }

        resetForm();
        navigation.navigate(MainStackRouteName.ProfileNavigator, {
          screen: ProfileStackRouteName.Profile,
        });
      } catch (e) {
        console.log(e);
      }
    },
    onError(data) {
      Toast.show({
        type: 'error',
        text1: JSON.stringify(data),
      });
    },
  });

  const { errors, touched, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: newEventSchema,
    onSubmit: async (values) => {
      if (imagesArray.length < 1) {
        Toast.show({
          type: 'error',
          text1: 'You should upload at least 1 photo for event',
        });
      } else {
        const createEventInput: Record<string, any> = {
          name: values.name,
          description: values.description,
          private: publicValueIndex === 1,
          address: selectedAddress.title,
        };

        const placeCoordinates = await axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json',
          {
            params: {
              place_id: selectedAddress.id,
              key: Config.GOOGLE_MAPS_API_KEY,
            },
          },
        );

        const location = placeCoordinates.data.results[0].geometry.location;

        createEventInput.location = {
          latitude: location.lat,
          longitude: location.lng,
        };

        createEvent({ variables: { createEventInput } });
      }
    },
  });

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Event</Text>
      <View style={styles.textBox}>
        <TextInput
          placeholder="Enter event name"
          keyboardAppearance="dark"
          onChangeText={handleChange('name')}
          error={errors.name}
          touched={touched.name}
        />
      </View>
      <View style={styles.textBox}>
        <TextInput
          placeholder="Enter event description"
          keyboardAppearance="dark"
          onChangeText={handleChange('description')}
          error={errors.description}
          touched={touched.description}
        />
      </View>
      <View style={styles.photo}>
        <Text style={styles.photosText}>Add event photos</Text>
        <PhotosRow data={imagesArray} setData={setImagesArray} />
      </View>
      <View style={styles.publicSwitch}>
        <SegmentedControl
          values={sortValues}
          selectedIndex={publicValueIndex}
          onChange={(e) => {
            setPublicValueIndex(e.nativeEvent.selectedSegmentIndex);
          }}
        />
        <Text style={styles.publicSwitchText}>
          Private events won't be visible on the map for other users. They are
          accessible only via invite.
        </Text>
      </View>
      <View style={styles.autocomplete}>
        <AutocompleteDropdown
          direction={Platform.select({ ios: 'up' })}
          debounce={1000}
          useFilter={false}
          dataSet={addressSuggestions}
          onChangeText={getAddressSuggestions}
          onSelectItem={(item) => setSelectedAddress(item)}
          loading={suggestionsLoading}
          textInputProps={{
            placeholder: 'Type address to search for',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              backgroundColor: '#eee',
              color: colors.darkGray,
              paddingLeft: 18,
            },
          }}
          renderItem={(item) => (
            <Text key={item.id} style={{ padding: 15 }}>
              {item.title}
            </Text>
          )}
          onClear={() => setAddressSuggestions([])}
          inputHeight={50}
          closeOnBlur={false}
          showChevron={false}
        />
      </View>
      <Button
        buttonStyles={styles.createEventBtn}
        label="Create event"
        onPress={handleSubmit}
      />
    </ScrollView>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: typography.h2,
    marginBottom: 20,
  },
  textBox: {
    marginBottom: 16,
    width: '100%',
  },
  photo: {
    marginTop: 10,
    marginBottom: 20,
  },
  photosText: {
    marginBottom: 10,
    fontSize: typography.h4,
  },
  publicSwitch: {
    marginTop: 10,
  },
  autocomplete: {
    marginTop: 20,
    flex: 1,
    zIndex: 1,
  },
  publicSwitchText: {
    marginTop: 10,
    fontSize: 12,
    color: colors.darkGray,
  },
  createEventBtn: {
    alignSelf: 'center',
  },
});
