interface Props {
  recivedUrl: string;
}

export const transformUrl = ({ recivedUrl }: Props) => {
  const transformedUrl = recivedUrl.replace('https://github.com/', '');

  return `https://api.github.com/repos/${transformedUrl}/issues`;
};
