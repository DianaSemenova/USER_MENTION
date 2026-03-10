import { Trash } from 'react-bootstrap-icons';
import cn from 'classnames';
import { MentionInputContext, useMentionInput } from '../hooks/useMentionInput';
import styles from './MentionInput.module.scss';
import { MentonDropDown } from '../MentonDropDown/MentonDropDown';

export const MentionInput = () => {
  const mentionInputValue = useMentionInput();
  const {
    text,
    isOpen,
    filteredUsers,
    containerRef,
    textareaRef,
    handleInput,
    setIsOpen,
    clearInput,
  } = mentionInputValue;

  return (
    <MentionInputContext.Provider value={mentionInputValue}>
      <div className={styles.blockMention} ref={containerRef}>
        <div className={cn(styles.field, text && styles.field_active)}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={text}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsOpen(false);
            }}
            placeholder="Введите текст, используйте @ для упоминания"
            rows={1}
          />

          {text && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearInput}
              aria-label="Очистить"
            >
              <Trash size={18} className={styles.clearIcon} />
            </button>
          )}
        </div>

        {isOpen && Boolean(filteredUsers.length) && <MentonDropDown />}
      </div>
    </MentionInputContext.Provider>
  );
};
