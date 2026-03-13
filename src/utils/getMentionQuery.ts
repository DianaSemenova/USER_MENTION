export const getMentionQuery = (text: string, cursorPosition: number) => {
  const allowedBeforeAt = ['', ' ', '.', ',', '!', '?', ';', ':', '\n'];

  const textBeforeCursor = text.slice(0, cursorPosition);
  const lastAtPos = textBeforeCursor.lastIndexOf('@');

  if (lastAtPos === -1 || textBeforeCursor.slice(lastAtPos).includes(' ')) {
    return { query: '', isMentioning: false, atIndex: -1 };
  }
  const charBeforeAt = lastAtPos > 0 ? textBeforeCursor[lastAtPos - 1] : '';

  if (allowedBeforeAt.includes(charBeforeAt)) {
    return {
      query: textBeforeCursor.slice(lastAtPos + 1),
      isMentioning: true,
      atIndex: lastAtPos,
    };
  }

  return { query: '', isMentioning: false, atIndex: -1 };
};
