import { getFilteredUsers } from 'src/utils/getFilteredUsers';
import { useMentionInput } from '../hooks/useMentionInput';
import styles from './MentionInput.module.scss';

const PLACEHOLDER = 'Введите текст, используйте @ для упоминания';

export const MentionInput = () => {
  const {
    text,
    isOpen,
    query,
    coords,
    textareaRef,
    handleInput,
    selectUser,
    setIsOpen,
  } = useMentionInput();

  const filteredUsers = getFilteredUsers(query);

  return (
    <div className={styles.blockMention}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={text}
        onChange={handleInput}
        onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
        placeholder={PLACEHOLDER}
      />
      {isOpen && Boolean(filteredUsers.length) && (
        <ul
          className={styles.dropdown}
          style={{ top: coords.top, left: coords.left }}
        >
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => selectUser(user.username)}
              className={styles.item}
            >
              <strong>{user.username}</strong> — {user.fullName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
