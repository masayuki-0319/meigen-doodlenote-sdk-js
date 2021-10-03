import axios from 'axios';

const ENDPOINT = 'https://meigen.doodlenote.net/api/json.php';

type MeigenRequestParams = {
  c: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};

export type Meigen = {
  meigen: string;
  auther: string;
};

type MeigenApiResponse = Meigen[];

const getMeigen = async (params?: MeigenRequestParams) => {
  const response = await axios.get<MeigenApiResponse>(ENDPOINT, {
    params: params,
  });

  return {
    status: response.status,
    data: response.status == 404 ? [] : response.data,
  };
};

export { getMeigen };
