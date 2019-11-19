import { MySql } from 'discore.js';

const db = new MySql().addModel('guilds', {
  id: { type: MySql.Types.VarChar(30), default: undefined },
  invite: { type: MySql.Types.VarChar(50), default: undefined },
  description: { type: MySql.Types.Text(3000), default: '' },
});

export default db;
