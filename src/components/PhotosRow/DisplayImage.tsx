import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TrashBin } from '../../assets/icons';
import { Image as ImageProps } from 'react-native-image-crop-picker';
import { PhotoImages } from '../../assets/photos';
import FastImage from 'react-native-fast-image';
import { colors } from '../../styles';

type Props = {
  onDelete: () => void;
  onPress: () => void;
  image: ImageProps;
};

const DisplayImage: React.FunctionComponent<Props> = (props) => {
  const { onDelete, onPress, image } = props;

  const [showDelete, setShowDelete] = useState(false);

  return (
    <TouchableOpacity onLongPress={() => setShowDelete(true)} onPress={onPress}>
      {image.path ? (
        <>
          <PhotoImages.ImagePlaceholder />
          <FastImage
            style={styles.fastImage}
            source={{ uri: image.sourceURL }}
          />
        </>
      ) : (
        <Image style={styles.image} source={{ uri: image.sourceURL }} />
      )}

      {showDelete && (
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={onDelete}
          onPressOut={() => setShowDelete(false)}>
          <TrashBin />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 56,
    borderRadius: 4,
  },
  fastImage: {
    width: 64,
    height: 56,
    borderRadius: 4,
    position: 'absolute',
  },
  deleteBtn: {
    backgroundColor: colors.black,
    width: 64,
    height: 56,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default DisplayImage;
