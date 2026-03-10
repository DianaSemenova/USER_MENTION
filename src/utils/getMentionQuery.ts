export const getMentionQuery = (text: string, cursorPosition: number) => {
  const textBeforeCursor = text.slice(0, cursorPosition);
  const lastAtPos = textBeforeCursor.lastIndexOf('@');

  if (lastAtPos !== -1 && !textBeforeCursor.slice(lastAtPos).includes(' ')) {
    return {
      query: textBeforeCursor.slice(lastAtPos + 1),
      isMentioning: true,
      atIndex: lastAtPos,
    };
  }

  return { query: '', isMentioning: false, atIndex: -1 };
};
