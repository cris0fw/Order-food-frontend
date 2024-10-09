export const dbTimeForHuman = (str: string) => {
  return str.replace("T", " ").substring(0, 16);
};
