import db from '../../src/service/db'
import { RecordFactory } from '../../src/entity/record'

describe('data service测试', () => {
  const hp = RecordFactory()
  test('插入hp数据记录', () => {
    db.insert('hp', hp({ target: 1, val: 10}))
    db.insert('hp', hp({ target: 2, val: -10}))
    const r = db.query('hp', i => true)
    expect(r.length).toBe(2)
    expect(db.query('hp', i => i.val === -10).length).toBe(1)
  })
})