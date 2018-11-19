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

  find(callback) {
    return this.rows.find(callback)
  }
}

export default Table