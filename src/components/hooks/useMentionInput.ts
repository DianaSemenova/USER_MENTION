import { useState, useCallback, useRef, useEffect } from 'react';
import { TCoords } from 'src/types/types';
import { getMentionQuery, getUpdatedTextWithMention } from 'src/utils';

export const useMentionInput = () => {
  const [text, setText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [coords, setCoords] = useState<TCoords>({ top: 0, left: 0 }); // не работает
  const [cursorPos, setCursorPos] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const selectionStart = e.target.selectionStart;

      setText(value);
      setCursorPos(selectionStart);

      const { query, isMentioning } = getMentionQuery(value, selectionStart);

      if (isMentioning) {
        setQuery(query);
        setIsOpen(true);

        const { offsetLeft, offsetTop } = e.target;
        setCoords({ top: offsetTop + 20, left: offsetLeft + 10 });
      } else {
        setIsOpen(false);
      }
    },
    []
  );

  const selectUser = useCallback(
    (username: string) => {
      const { atIndex } = getMentionQuery(text, cursorPos);

      const newText = getUpdatedTextWithMention(
        text,
        username,
        atIndex,
        cursorPos
      );

      setText(newText);
      setIsOpen(false);

      setTimeout(() => textareaRef.current?.focus(), 0);
    },
    [text, cursorPos]
  );

  return {
    text,
    isOpen,
    query,
    coords,
    containerRef,
    textareaRef,
    handleInput,
    selectUser,
    setIsOpen,
  };
};
