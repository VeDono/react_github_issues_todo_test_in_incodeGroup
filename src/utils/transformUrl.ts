export const transformUrl = (recivedUrl: string) => {
  const transformedUrl = recivedUrl.replace('https://github.com/', '');

  return `https://api.github.com/repos/${transformedUrl}/issues`;
};
