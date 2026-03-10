import { useContext } from 'react';
import { useFloating, offset, flip, shift } from '@floating-ui/react';
import { MentionInputContext } from '../hooks/useMentionInput';
import styles from './MentonDropDown.module.scss';
import { DropDownItem } from './DropDownItem';

export const MentonDropDown = () => {
  const { coords, filteredUsers, isOpen } = useContext(MentionInputContext);

  const {
    refs: { setFloating },
    floatingStyles,
  } = useFloating({
    open: isOpen,
    placement: 'bottom-start',
    middleware: [offset(5), flip(), shift()],
  });

  return (
    <ul
      ref={setFloating}
      className={styles.dropdown}
      style={{
        ...floatingStyles,
        position: 'absolute',
        top: `${coords.top + 20}px`,
        left: `${coords.left}px`,
      }}
    >
      {filteredUsers.map((user) => (
        <DropDownItem key={user.id} user={user} />
      ))}
    </ul>
  );
};
