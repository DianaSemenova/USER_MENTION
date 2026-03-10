export const getUpdatedTextWithMention = (
  text: string,
  username: string,
  atIndex: number,
  cursorPosition: number
) => {
  const beforeAt = text.slice(0, atIndex);
  const afterAt = text.slice(cursorPosition);

  return `${beforeAt}@${username} ${afterAt}`;
};
