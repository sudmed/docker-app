import pool from './mysqlPool.mjs'

const readRecords = () =>
  new Promise((resolve, reject) =>
    pool.getConnection((err, connection) => {
      if (err) return reject(err)
      connection.query(
        'SELECT * FROM `times` ORDER BY created_at DESC',
        (err, results) => {
          if (err) return reject(err)
          resolve(results)
        }
      )
      connection.release()
    })
  )

const insertRecord = (time) =>
  new Promise((resolve, reject) =>
    pool.getConnection((err, connection) => {
      if (err) return reject(err)
      connection.query(
        `INSERT INTO times (time) VALUES ('${time}')`,
        (err, result) => {
          if (err) return reject(err)
          console.log(`Time ${time} saved`)
          resolve(result)
        }
      )
      connection.release()
    })
  )

const deleteRecord = (id) =>
  new Promise((resolve, reject) =>
    pool.getConnection((err, connection) => {
      if (err) return reject(err)
      connection.query(`DELETE FROM times WHERE id=${id}`, (err, result) => {
        if (err) return reject(err)
        console.log(`Time id ${id} deleted`)
        resolve(result)
      })
      connection.release()
    })
  )

export { readRecords, insertRecord, deleteRecord }
