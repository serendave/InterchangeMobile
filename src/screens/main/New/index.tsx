import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import * as Yup from 'yup';
import { Apollo } from '../../../apollo';
import { Button, PhotosRow, TextInput } from '../../../components';
import { axios } from '../../../utils';
import { colors, typography } from '../../../styles';

import { MainStackParamList, MainStackRouteName } from '../../../types';

type NewProps = NativeStackScreenProps<
  MainStackParamList,
  MainStackRouteName.New
>;

const newItemSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  category: Yup.string().required('You should select a category'),
});

const New: FC<NewProps> = ({ navigation }) => {
  const [imagesArray, setImagesArray] = useState<Image[]>([]);

  const { data: categoriesData } = useQuery(Apollo.queries.categories);

  const [createItem] = useMutation(Apollo.mutations.createItem, {
    async onCompleted(data) {
      const formData = new FormData();
      formData.append('itemId', data.createItem.id);

      imagesArray.forEach((image) => {
        formData.append('files', {
          name: 'image.jpg',
          type: 'image/jpg',
          uri: Platform.OS === 'android' ? image.path : image.sourceURL,
        });
      });

      try {
        const response = await axios.post('/items/upload-images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if ((response.status = 201)) {
          Toast.show({
            type: 'success',
            text1: "You've successfully created an item!",
          });

          resetForm();
          navigation.navigate(MainStackRouteName.Profile);
        }
      } catch (e) {
        console.log(e);
      }
    },
    onError(data) {
      console.log(data);
    },
  });

  const {
    values: { category, name, description },
    errors,
    touched,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
    },
    validationSchema: newItemSchema,
    onSubmit: (values) => {
      if (imagesArray.length < 2) {
        Toast.show({
          type: 'error',
          text1: 'You should upload at least 2 photos for an item',
        });
      } else {
        createItem({
          variables: {
            createItemInput: {
              name: values.name,
              description: values.description,
              categoryId: values.category,
            },
          },
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.textBox}>
          <TextInput
            value={name}
            placeholder="Enter item name"
            keyboardAppearance="dark"
            onChangeText={handleChange('name')}
            error={errors.name}
            touched={touched.name}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            value={description}
            placeholder="Enter item description"
            keyboardAppearance="dark"
            onChangeText={handleChange('description')}
            error={errors.description}
            touched={touched.description}
          />
        </View>
        <View style={styles.textBox}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            labelField="label"
            valueField="value"
            value={category}
            onChange={(option) => {
              setFieldValue('category', option.value);
            }}
            placeholder="Select Category"
            data={
              categoriesData?.categories?.map((categoryOption: any) => ({
                label: categoryOption.name,
                value: categoryOption.id,
              })) || []
            }
          />
          {errors.category ? (
            <Text style={styles.dropdownError}>{errors.category}</Text>
          ) : null}
        </View>
        <View style={styles.photo}>
          <Text style={styles.photosText}>Add at least 2 photos</Text>
          <PhotosRow data={imagesArray} setData={setImagesArray} />
        </View>
      </View>
      <Button
        buttonStyles={styles.createBtn}
        label="Create item"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default New;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
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
    paddingHorizontal: 8,
    fontSize: typography.h3,
    marginBottom: 15,
  },
  createBtn: {
    alignSelf: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownError: {
    marginTop: 10,
    fontSize: 10,
    color: colors.error,
  },
  placeholderStyle: {
    fontSize: 14,
    paddingHorizontal: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingHorizontal: 16,
  },
});
