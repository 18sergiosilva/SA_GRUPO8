const mongoose = require('mongoose');

const host = '3.140.186.177';
const username = 'uayd21s';
const password = '1ps9sayd2lb';
const database = 'ayd2db'
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(`mongodb+srv://administrator:1234@cluster0.bmddi.mongodb.net/SAProjectG8?retryWrites=true&w=majority`);

 /*
  var dbInfo = {
    dbName: 'test',
    ipDb: 'cluster0.uaxir.mongodb.net',
    dbUser: 'carlos',
    dbPassword: ''
  }
  mongoose.connect(`mongodb+srv://${dbInfo.dbUser}:${dbInfo.dbPassword}@${dbInfo.ipDb}/${dbInfo.dbName}retryWrites=true&w=majority`);
 */
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
    console.log('DB-STATUS:: connected'); // si esta todo ok, imprime esto
});

module.exports = `mongodb+srv://administrator:1234@cluster0.bmddi.mongodb.net/SAProjectG8?retryWrites=true&w=majority`;

