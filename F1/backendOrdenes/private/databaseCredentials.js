
const mongoose = require('mongoose');

var dbInfo = {
  dbName: 'ayd2db',
  ipDb: '3.140.186.177:27017',
  dbUser: 'uayd21s',
  dbPassword: '1ps9sayd2lb'
}

module.exports = `mongodb+srv://administrator:1234@cluster0.bmddi.mongodb.net/SAProjectG8?retryWrites=true&w=majority`;


/*
  var dbInfo = {
    dbName: 'test',
    ipDb: 'cluster0.uaxir.mongodb.net',
    dbUser: 'carlos',
    dbPassword: 'C4rl05.87'
  }
module.exports = `mongodb+srv://${dbInfo.dbUser}:${dbInfo.dbPassword}@${dbInfo.ipDb}/${dbInfo.dbName}retryWrites=true&w=majority`;*/
