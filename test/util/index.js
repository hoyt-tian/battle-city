import { parseQueryString } from '../../src/util'
describe('parse Query String', () => {

  const cases = {
    normal: `?abc=xyz&a=123&b=${encodeURIComponent('http://www.xyz')}`,
    invalid: '?abcd'
  }

  const expects = {
    normal: {
      abc: 'xyz',
      a: '123',
      b: 'http://www.xyz'
    }
  }

  test('parse normal Query', () => {
    const query = parseQueryString(cases.normal)
    expect(query).toMatchObject(expects.normal)
  })

  test('parse normal Query without ?', () => {
    const query = parseQueryString(cases.normal.slice(1))
    expect(query).toMatchObject(expects.normal)
  })

  test('parse illegal string', () => {
    const query = parseQueryString(cases.invalid)
    expect(query).toMatchObject({})
  })

  test('parse illegal type', () => {
    expect(() => parseQueryString({})).toThrow()
  })

})