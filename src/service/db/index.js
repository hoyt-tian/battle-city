import Database from './database'

const db = new Database([
  'hp',
  'movement',
])

/**
 * movement
 * -id  int increamental
 * -gmtCreate timestamp
 * -gmtUpdate timestamp
 * -offsetX
 * -offsetY
 * -x
 * -y
 * -sourceType: tank, bullet
 * -sourceId
 * -deleteFlag
 */

 /**
  * hp
  * -id int increamental
  * -gmtCreate  timestamp
  * -gmtUpdate  timestamp
  * -changeValue  int
  * -value        int
  * -sourceId
  */

export default db