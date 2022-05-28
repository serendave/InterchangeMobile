export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateJoined: string;
  location: {
    latitude: string;
    longitude: string;
  };
};
