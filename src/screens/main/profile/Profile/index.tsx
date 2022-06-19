import React from 'react';
import { Link } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '../../../../components';
import { useAuthContext } from '../../../../context/auth.context';
import { colors } from '../../../../styles';
import { ProfileStackRouteName } from '../../../../types';
import { DEFAULT_PHOTO } from '../../../../assets/img';

const Profile = () => {
  const { userData, logOut } = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          style={styles.profilePhoto}
          source={{ uri: userData?.photo ?? DEFAULT_PHOTO }}
        />
        <View>
          <Text style={styles.initials}>
            {userData?.firstName} {userData?.lastName}
          </Text>
          <Text style={styles.email}>{userData?.email}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        <View style={{ ...styles.profileItem, borderTopWidth: 1 }}>
          <Link style={styles.link} to={`/${ProfileStackRouteName.UserInfo}`}>
            My Account
          </Link>
          <Icon name="right" size={15} />
        </View>
        <View style={styles.profileItem}>
          <Link style={styles.link} to={`/${ProfileStackRouteName.MyItems}`}>
            My Items
          </Link>
          <Icon name="right" size={15} />
        </View>
        <View style={styles.profileItem}>
          <Link style={styles.link} to={`/${ProfileStackRouteName.MyEvents}`}>
            My events
          </Link>
          <Icon name="right" size={15} />
        </View>
        <View style={styles.profileItem}>
          <Link
            style={styles.link}
            to={`/${ProfileStackRouteName.Invitations}`}>
            Invitations
          </Link>
          <Icon name="right" size={15} />
        </View>
      </ScrollView>
      <Button buttonStyles={styles.logout} label="Log out" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  initials: {
    fontSize: 18,
    marginBottom: 5,
  },
  email: {
    color: colors.gray,
  },
  profileItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.border,
    display: 'flex',
    flexDirection: 'row',
  },
  logout: {
    alignSelf: 'center',
  },
  optionsContainer: {
    flex: 1,
  },
  link: {
    marginRight: 'auto',
    color: '#2597c8',
  },
});

export default Profile;
