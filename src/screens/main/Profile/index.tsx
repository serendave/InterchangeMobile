import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuthContext } from '../../../context/auth.context';
import { colors, typography } from '../../../styles';
import { Button } from '../../../components';

const Profile = () => {
  const { userData, logOut } = useAuthContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileInfo}>
        <Text style={styles.name}>
          {userData?.firstName} {userData?.lastName}
        </Text>
        <Text style={styles.email}>{userData?.email}</Text>
        <Text>Joined date: {userData?.dateJoined}</Text>
      </View>
      <Text style={styles.itemTitle}>Items</Text>
      <Button
        additionalStyles={styles.logoutButton}
        label="Log out"
        onPress={logOut}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  profileInfo: {
    marginVertical: 20,
  },
  name: {
    fontSize: typography.h3,
    color: colors.black,
    marginBottom: 10,
    fontWeight: '700',
  },
  email: {
    fontSize: typography.h4,
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: typography.h2,
    flex: 1,
  },
  logoutButton: {
    alignSelf: 'center',
    height: 'auto',
    textTransform: 'none',
    marginBottom: 20,
  },
});
