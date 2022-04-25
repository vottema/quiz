const config = require("./config/config");
const express = require("express");

const session = require('express-session');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


const registrationRouter = require("./routes/registrationRouter.route");
const loginRouter = require("./routes/loginRouter.route");
const themesRouter = require("./routes/themesRouter.route");
const questionsRouter = require("./routes/questionsRouter.route");
const sessionRouter = require("./routes/sessionRouter.route");

const PORT = process.env.PORT ?? 3000;

config(app);

app.use("/registration", registrationRouter);
app.use("/login", loginRouter);
app.use("/themes", themesRouter);
app.use("/questions", questionsRouter);
app.use("/session", sessionRouter);


const sessionMiddleware = session({ secret: 'secret', cookie: { maxAge: 60000 }});
// register middleware in Express
app.use(sessionMiddleware);
// register middleware in Socket.IO
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
  // sessionMiddleware(socket.request, socket.request.res, next); will not work with websocket-only
  // connections, as 'socket.request.res' will be undefined in that case
});

io.on('connection', (socket) => {
  console.log(socket);
  const session = socket.request.session;
  
  console.log(session);
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log('server listening on port ' + port));
