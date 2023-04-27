// TODO: Importing the function to be tested and assigns it to a variable called reverse
const reverse = require('../utils/for_testing').reverse

/*
  Individual test cases are defined with the test function.
  The first parameter of the function is the test description as a string.
  The second parameter is a function, that defines the functionality for the test case.
*/

test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
  const result = reverse('releveler')
  expect(result).toBe('releveler')
})

test('reverse of chip', () => {
  const result = reverse('chip')
  expect(result).toBe('pihc')
})
