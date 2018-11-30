import { merge } from 'UTIL'

class Record {
  constructor({
    id,
    gmtCreate = Date.now(),
    gmtUpdate,
    deleted = false,
    ...rest,
  }) {
    this.id = id
    this.gmtCreate = gmtCreate
    this.gmtUpdate = gmtUpdate
    this.deleted = deleted
    merge(this, rest)
  }
}

export const GeneratorFactory = seed => {  
  const generator = (function* () {
    while(true) {
      yield generator.current++
    }
  })()
  generator.seed = seed
  generator.current = seed
  return generator
}

export const RecordFactory = (generator = GeneratorFactory(0)) => {
  
  return (conf) => {
    merge(conf, { id: generator.next().value })
    return new Record(conf)
  }
}

export default Record