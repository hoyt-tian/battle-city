import Record, { RecordFactory } from '../../src/entity/record'

describe('RecordFactory测试', () => {
  const record = RecordFactory()
  const movement = RecordFactory()
  test('创建Record实例', () => {
    const r0 = record({
      x: 10,
      y: 5,
    })
    const r1 = record({
      x: 5,
      y: 10,
    })
    expect(r0.id).toBe(0)
    expect(r0.x).toBe(10)
    expect(r0.y).toBe(5)
    expect(r1.id).toBe(1)
    expect(r1.x).toBe(5)
    expect(r1.y).toBe(10)
  })

  test('创建Movement实例', () => {
    const r0 = movement({
      x: 10,
      y: 5,
    })
    const r1 = movement({
      x: 5,
      y: 10,
    })
    expect(r0.id).toBe(0)
    expect(r0.x).toBe(10)
    expect(r0.y).toBe(5)
    expect(r1.id).toBe(1)
    expect(r1.x).toBe(5)
    expect(r1.y).toBe(10)
  })

  test('再次创建Record实例', () => {
    const r0 = record({
      x: 10,
      y: 5,
    })
    const r1 = record({
      x: 5,
      y: 10,
    })
    expect(r0.id).toBe(2)
    expect(r0.x).toBe(10)
    expect(r0.y).toBe(5)
    expect(r1.id).toBe(3)
    expect(r1.x).toBe(5)
    expect(r1.y).toBe(10)
  })

})