const { Server } = require('socket.io');

let io = new Server();

let users = [];
const addUser = (info, socketId) => {
  const checkUser = users.some((user) => user.info.id === info.id);

  if (!checkUser) {
    users.push({ info, socketId });
  }
};
const userRemove = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const findFriendBySoket = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};

const findFrienddById = (userId) => {
  return users.find((user) => user.info.id === userId);
};

const userLogout = (userId) => {
  users = users.filter((user) => user.userId !== userId);
};

module.exports = {
  init: function (server, options) {
    io = new Server(server, options);
    io.on('connection', (socket) => {
      socket.emit('connected');

      socket.on('setup', ({ info }) => {
        const filterdUsers = users.map((user) => user.info);

        socket.emit('online_user', { type: 'connect', info: filterdUsers });

        addUser(info, socket.id);
        users.forEach((user) => {
          if (user.info.id == info.id) return;
          socket.to(user.socketId).emit('online_user', { type: 'add', info });
        });
      });

      socket.on('notification', ({ notification }) => {
        if (!notification?.recipient)
          return console.log('chat.users not defined');
        const onlineUser = findFrienddById(notification.recipient);
        if (onlineUser)
          socket
            .to(onlineUser.socketId)
            .emit('new_notification', { notification });
      });

      socket.on('disconnect', () => {
        const d_user = findFriendBySoket(socket.id);

        users.forEach((user) => {
          socket
            .to(user.socketId)
            .emit('online_user', { type: 'remove', info: d_user?.info });
        });
        userRemove(socket.id);
      });
    });
    return io;
  },
  getIO: function () {
    if (!io) {
      throw new Error("Can't get io instance before calling .init()");
    }
    return io;
  },
};
