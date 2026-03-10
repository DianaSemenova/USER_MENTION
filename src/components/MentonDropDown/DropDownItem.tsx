import { TUser } from 'src/types/types';
import styles from './MentonDropDown.module.scss';
import { useContext } from 'react';
import { MentionInputContext } from '../hooks/useMentionInput';

type TDropDownItemProps = { user: TUser };

export const DropDownItem = ({ user }: TDropDownItemProps) => {
  const { selectUser } = useContext(MentionInputContext);

  return (
    <li
      className={styles.dropdown__item}
      onMouseDown={(e) => {
        e.preventDefault();
        selectUser(user.username);
      }}
    >
      <span className={styles.dropdown__username}>@{user.username}</span>
      <span className={styles.dropdown__fullName}>{user.fullName}</span>
    </li>
  );
};
