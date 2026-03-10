import { usersData } from 'src/mocks/usersData';

export const getFilteredUsers = (query: string) => {
  return usersData.filter(
    (user) =>
      user.fullName.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
  );
};
