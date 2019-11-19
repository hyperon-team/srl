export default {
  genWebErr: (res,err) => {
    res.send('Error: ', err)
    throw err
  }
}