import { getMeigen } from '../src/index';

import axios from 'axios';
jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Case status 200', () => {
  test('should return meigen data', async () => {
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: [{ meigen: 'dummy_meigen', auther: 'dummy_auther' }],
    });
    const response = await getMeigen();

    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://meigen.doodlenote.net/api/json.php'
    );

    expect(response).toStrictEqual({
      status: 200,
      data: [{ meigen: 'dummy_meigen', auther: 'dummy_auther' }],
    });
  });
});

describe('Case status 404', () => {
  test('should return empty array', async () => {
    mockAxios.get.mockResolvedValue({ status: 404 });
    const response = await getMeigen();

    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://meigen.doodlenote.net/api/json.php'
    );

    expect(response).toStrictEqual({ status: 404, data: [] });
  });
});
