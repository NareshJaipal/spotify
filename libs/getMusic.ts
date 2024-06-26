export const getMusic = async (query: string): Promise<any> => {
  const response = await fetch(`/api/fetch-songs?query=${query}`);

  return response.json();
};
