export const isGitHubLink = (url: string) => {
  const pattern = /^https:\/\/github\.com\/[^/]+\/[^/]+$/;

  return pattern.test(url);
};
