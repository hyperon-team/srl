
export default class {
  constructor(server) {
    this.server = server
  }
  get config() {
    return {
      name: 'discord',
    }
  }
  get resolvers() {
    return {
      get: (filter) => {
        console.log('et')
      },
      set: (entryId, data) => {

      },
      add: (add) => {

      },
      del: (entryId) => {

      }
    }
  }
};

/*

/add/discord?serverid=1111&description


*/