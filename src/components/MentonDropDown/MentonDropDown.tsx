import { useContext } from 'react';
import { MentionInputContext } from '../hooks/useMentionInput';
import styles from './MentonDropDown.module.scss';
import { DropDownItem } from './DropDownItem';

export const MentonDropDown = () => {
  const { coords, filteredUsers } = useContext(MentionInputContext);

  return (
    <ul
      className={styles.dropdown}
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
      }}
    >
      {filteredUsers.map((user) => (
        <DropDownItem key={user.id} user={user} />
      ))}
    </ul>
  );
};
