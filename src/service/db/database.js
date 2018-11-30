import Table from './table';

const getTabel = (table, tabs) => {
  const tab = tabs[table]
  if (tab) {
    return tab
  }
  throw new Error(`找不到${table}`)
}

class Database {
  constructor(tables = []) {
    this.tables = {}
    tables.forEach(t => {
      this.tables[t] = new Table(t)
    })
  }
  
  insert(table, row) {
    const tab = getTabel(table, this.tables)
    return tab.insert(row)
  }

  query(table, callback) {
    const tab = getTabel(table, this.tables)
    return tab.query(callback)
  }
}

export default Database
