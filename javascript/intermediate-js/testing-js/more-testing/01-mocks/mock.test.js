const axios = require('axios');
// Note: axios doesn't exist in this package 'cause the current folder has 
// not been initialized w npm init & thereby no package.json
const fetchData = async (id) => {
  const results = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
  console.log(results);
  return results.data;
}

// spyOn the mock value we ultimately want
// First param: always an object
// Second param: the method of the first param we want to spyOn

it('mock axios', async () => {
  jest.spyOn(axios, 'get').mockReturnValueOnce({
    data: {
      id: 1,
      todo: 'Finish Odin Project :p' 
    }
  });

  const result = await fetchData(1);
  expect(result.todo).toBe('Finish Odin Project :p');
})

// ----------------------------------------------
const forEach = (items, callback) => {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
}

it('mock callback', () => {
  const mockedCallback = jest.fn(x => 42 + x);
  
  forEach([1, 2], mockedCallback);
  
  expect(mockedCallback.mock.calls.length).toBe(2);
  // mock.calls returns an array of callback values 
  // [call1, call2]

  expect(mockedCallback.mock.calls[0][0]).toBe(1);

  expect(mockedCallback.mock.calls[1][0]).toBe(2);

  expect(mockedCallback.mock.results[0].value).toBe(43);
  expect(mockedCallback.mock.results[1].value).toBe(44);
});

it('mock return', () => {
  const mock = jest.fn();
  
  // mock.mockReturnValueOnce(true);
  mock.mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValueOnce("Hello");
  
  const results = mock();
  const results1 = mock();
  const results2 = mock();

  expect(results).toBe(true);
  expect(results1).toBe(false);
  expect(results2).toBe("Hello");

});
// ----------------------------------------------
