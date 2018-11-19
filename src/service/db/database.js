import Table from './table';

const getTabel = (tab, tabs) => {
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

  find(table, callback) {
    const tab = getTabel(table, this.tables)
    return tab.find(callback)
  }
}

export default Database
