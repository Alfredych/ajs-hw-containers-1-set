import { loadUser, saveUser } from '../user';
import { httpGet } from '../http';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should call loadUser once', () => {
  httpGet.mockReturnValue(JSON.stringify({}));

  const response = loadUser(1);
  expect(response).toEqual({});
  expect(httpGet).toHaveBeenCalledWith('http://server:8080/users/1');
});

// Тест для saveUser
describe('Тестирование функции saveUser', () => {

  test('Должен выбрасывать ошибку Unimplemented', () => {
    const user = {
      id: 1,
      name: 'Test User',
      health: 50
    };
  
    expect(() => saveUser(user))
      .toThrow('Unimplemented');
  });
});