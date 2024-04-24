export const transformUrl = (recivedUrl: string, type: 'issues' | 'repo') => {
  const transformedUrl = recivedUrl.replace('https://github.com/', '');

  return type === 'issues'
    ? `https://api.github.com/repos/${transformedUrl}/issues`
    : `https://api.github.com/repos/${transformedUrl}`;
};
