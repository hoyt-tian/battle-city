class Table {
  constructor(name) {
    this.name = name
    this.rows = []
  }

  empty() {
    this.rows = []
  }

  insert(r) {
    this.rows.push(r)
  }

  query(callback) {
    return this.rows.filter(callback)
  }
}

export default Table