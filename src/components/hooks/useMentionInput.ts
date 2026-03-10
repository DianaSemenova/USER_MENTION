import { useState, useCallback, useRef } from 'react';
import { TCoords } from 'src/types/types';

export const useMentionInput = () => {
  const [text, setText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [coords, setCoords] = useState<TCoords>({ top: 0, left: 0 });
  const [cursorPos, setCursorPos] = useState<number>(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const selectionStart = e.target.selectionStart;

      setText(value);
      setCursorPos(selectionStart);

      const lastAtPos = value.lastIndexOf('@', selectionStart - 1);

      if (
        lastAtPos !== -1 &&
        !value.slice(lastAtPos, selectionStart).includes(' ')
      ) {
        const currentQuery = value.slice(lastAtPos + 1, selectionStart);
        setQuery(currentQuery);
        setIsOpen(true);

        const { offsetLeft, offsetTop } = e.target;
        console.log(' e.target', e.target);
        setCoords({ top: offsetTop + 20, left: offsetLeft + 10 });
      } else {
        setIsOpen(false);
      }
    },
    []
  );

  const selectUser = useCallback(
    (username: string) => {
      const beforeAt = text.slice(0, text.lastIndexOf('@', cursorPos - 1));
      const afterAt = text.slice(cursorPos);
      const newText = `${beforeAt}@${username} ${afterAt}`;

      setText(newText);
      setIsOpen(false);

      // Возвращаем фокус
      textareaRef.current?.focus();
    },
    [text, cursorPos]
  );

  return {
    text,
    isOpen,
    query,
    coords,
    textareaRef,
    handleInput,
    selectUser,
    setIsOpen,
  };
};
