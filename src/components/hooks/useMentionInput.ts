import {
  useState,
  useCallback,
  useRef,
  useEffect,
  createContext,
  useMemo,
} from 'react';
import getCaretCoordinates from 'textarea-caret';
import { TCoords } from 'src/types/types';
import {
  getFilteredUsers,
  getMentionQuery,
  getUpdatedTextWithMention,
} from 'src/utils';

export const useMentionInput = () => {
  const [text, setText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [coords, setCoords] = useState<TCoords>({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const filteredUsers = useMemo(() => getFilteredUsers(query), [query]);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [text, adjustHeight]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const selectionStart = e.target.selectionStart;
    const target = e.target;

    setText(value);

    const { query, isMentioning } = getMentionQuery(value, selectionStart);

    if (isMentioning) {
      setQuery(query);
      setIsOpen(true);

      // Получаем координаты относительно начала textarea
      const caret = getCaretCoordinates(target, selectionStart);

      setCoords({
        top: target.offsetTop + caret.top - target.scrollTop,
        left: target.offsetLeft + caret.left,
      });
    } else {
      setIsOpen(false);
    }
  };

  const selectUser = useCallback(
    (username: string) => {
      const selectionStart = textareaRef.current?.selectionStart || 0;
      const { atIndex } = getMentionQuery(text, selectionStart);

      const newText = getUpdatedTextWithMention(
        text,
        username,
        atIndex,
        selectionStart
      );

      setText(newText);
      setIsOpen(false);

      setTimeout(() => {
        textareaRef.current?.focus();
        adjustHeight();
      }, 0);
    },
    [text, adjustHeight]
  );

  const clearInput = useCallback(() => {
    setText('');
    setIsOpen(false);
    textareaRef.current?.focus();
  }, []);

  return {
    text,
    isOpen,

    query,
    coords,

    filteredUsers,

    containerRef,
    textareaRef,

    handleInput,
    selectUser,
    setIsOpen,
    clearInput,
  };
};

type TMentionInputContext = ReturnType<typeof useMentionInput>;

export const MentionInputContext = createContext<TMentionInputContext>(
  {} as TMentionInputContext
);
