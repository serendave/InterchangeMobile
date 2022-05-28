import { ActionSheet } from 'react-native-cross-actionsheet/index';
import { Alert, Linking, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

type Props = {
  onSelectImage: (arg0: any) => void;
  height?: number;
  width?: number;
};

export const selectImage = (props: Props) => {
  const { onSelectImage, height, width } = props;
  ActionSheet.options({
    options: [
      {
        text: 'Open Camera',
        onPress: () =>
          takePhoto({ onSelectImage: onSelectImage, height, width }),
      },
      {
        text: 'Open Gallery',
        onPress: () =>
          pickPhoto({ onSelectImage: onSelectImage, height, width }),
      },
    ],
    cancel: { onPress: () => console.log('cancel') },
  });
};

export const takePhoto = (props: Props) => {
  const { onSelectImage, height = 1000, width = 1000 } = props;
  ImagePicker.openCamera({
    width: width,
    height: height,
    cropping: true,
    //hideBottomControls: true,
    includeBase64: true,
    mediaType: 'photo',
  })
    .then((image) => {
      onSelectImage(image);
    })
    .catch((error) => {
      console.log('error photos', { error });
      if (error.code === 'E_PICKER_NO_CAMERA_PERMISSION') {
        Alert.alert(
          'Cannot access camera',
          'Please allow access camera',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => Linking.openSettings() },
          ],
          { cancelable: false },
        );
      }
      if (Platform.OS === 'android') {
        if (error.code === 'E_PERMISSION_MISSING') {
          Alert.alert(
            'Cannot access camera',
            'Please allow access camera',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => Linking.openSettings() },
            ],
            { cancelable: false },
          );
        }
      }
    });
};

export const pickPhoto = (props: Props) => {
  const { onSelectImage, height = 1000, width = 1000 } = props;
  ImagePicker.openPicker({
    width: width,
    height: height,
    cropping: true,
    //hideBottomControls: true,
    includeBase64: true,
    mediaType: 'photo',
  })
    .then((image) => {
      onSelectImage(image);
    })
    .catch((error) => {
      console.log('error camera', { error });
      if (
        error.code === 'E_PERMISSION_MISSING' ||
        error.code === 'E_NO_LIBRARY_PERMISSION'
      ) {
        console.log('AAAAA');
        Alert.alert(
          'Cannot access images',
          'Please allow access photos',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => Linking.openSettings() },
          ],
          { cancelable: false },
        );
      }
    });
};
