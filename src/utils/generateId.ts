export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5); // Adjust the length as needed
  const uniqueId = `${timestamp}-${randomStr}`;
  return uniqueId;
};
