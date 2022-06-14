import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthContext } from '../../../../context/auth.context';
import { colors, typography } from '../../../../styles';
import { Button } from '../../../../components';

const UserInfo = () => {
  const { userData, logOut } = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Text style={styles.name}>
          {userData?.firstName} {userData?.lastName}
        </Text>
        <Text style={styles.email}>{userData?.email}</Text>
        <Text>Joined date: {userData?.dateJoined}</Text>
      </View>
      <Button
        buttonStyles={styles.logoutButton}
        label="Log out"
        onPress={logOut}
      />
    </View>
  );
};

export default UserInfo;

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
  logoutButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});
