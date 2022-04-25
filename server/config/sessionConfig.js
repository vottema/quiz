const session = require('express-session')
const FileStore = require('session-file-store')(session)
 
const sessionConfig = {
 store: new FileStore(),
 name: 'user_sid',
 secret: process.env.SESSION_SECRET ?? 'secret',
 resave: false,
 saveUnitialized: false,
 cookie: {
   maxAge: 1000 * 60 * 60,  // 1 hour
   httpOnly: true
 }
}
 
module.exports = sessionConfig
