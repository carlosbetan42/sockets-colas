const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  console.log("Usuario conectado");

  client.emit("enviarMensaje", {
    usuario: 'Administrador',
    mensaje: 'Bienvenido a esta aplicación'
  });

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  // Escuchar al cliente
  client.on("enviarMensaje", (data, callback) => {
    console.log(data);

    // Solo le envía la info al que hizo la petición
    client.emit("enviarMensaje", data);

    // Envía la info a todos
    client.broadcast.emit("enviarMensaje", data);
    /*if (mensaje.usuario) {
      callback({
        respuesta: 'TODO SALIÓ BIEN'
      });
    } else {
      callback({
        respuesta: 'TODO SALIÓ MAL!!!!!!!!!!!'
      });
    }*/
  });
});