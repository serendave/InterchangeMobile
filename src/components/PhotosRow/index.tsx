import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { PhotoImages } from '../../assets/photos';
import { selectImage } from '../../utils/cameraUtils';
import DisplayImage from './DisplayImage';
import { Image } from 'react-native-image-crop-picker';
// import { ItemStackRouteName } from '../../types/Navigators';

type Props = {
  data: Image[];
  setData?: (data: Image[]) => void;
};

const PhotosRow: React.FunctionComponent<Props> = (props) => {
  // const navigation = useNavigation();
  const { data, setData } = props;
  const [imagesArray, setImagesArray] = useState<Image[]>(data);

  // const openGallery = (position: number) => {
  //   navigation.navigate(ItemStackRouteName.Gallery, {
  //     position: position,
  //     images: imagesArray,
  //     updateImageArray: (arr) => setImagesArray([...arr]),
  //   });
  // };

  const ImageBox = ({ position }: { position: number }) => {
    if (position === 0 && !imagesArray[0]) {
      return (
        <TouchableOpacity onPress={onAddImagePress}>
          <PhotoImages.AddPhoto />
        </TouchableOpacity>
      );
    }
    if (imagesArray[position]) {
      return (
        <DisplayImage
          onDelete={() => deleteAlert(position)}
          onPress={() => {}}
          image={imagesArray[position]}
        />
      );
    }
    if (imagesArray[position - 1]) {
      return (
        <TouchableOpacity onPress={onAddImagePress}>
          <PhotoImages.AddPhoto />
        </TouchableOpacity>
      );
    } else {
      return <PhotoImages.ImagePlaceholder />;
    }
  };

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(imagesArray)) {
      setData?.([...imagesArray]);
    }
  }, [data, imagesArray, setData]);

  useEffect(() => {
    setImagesArray([...data]);
  }, [data]);

  const onAddImagePress = () => {
    selectImage({
      onSelectImage: onSelectImage,
      width: 1500,
      height: 1500,
    });
  };

  const onSelectImage = (value: Image) => {
    setImagesArray([...imagesArray, value]);
  };

  const deleteAlert = (id: number) =>
    Alert.alert('', 'Are you sure you want to delete this image? ', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => removeImageById(id) },
    ]);

  const removeImageById = (id: number) => {
    const tempArr = [...imagesArray];
    tempArr.splice(id, 1);
    setImagesArray([...tempArr]);
  };

  const renderImagesArray = () => {
    const arrayWithImages = [];
    for (let i = 0; i < 4; i++) {
      arrayWithImages.push(<ImageBox position={i} key={i} />);
    }
    return arrayWithImages;
  };

  return <View style={styles.row}>{renderImagesArray()}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PhotosRow;
