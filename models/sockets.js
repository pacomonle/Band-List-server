const BandList = require("./band-list");


class Sockets {

    constructor(io) {

        this.io = io;

        this.bandlist = new BandList()

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            console.log('cliente conectado');

            // emitir al cliente conectado el listado de bandas
            socket.emit('current-bands', this.bandlist.getBands());

            // Escuchar evento:
            // votar vpor la banda
            socket.on('votar-banda', (data) => {
                // console.log(data)
                this.bandlist.increaseVotes(data?.id)
                //  socket.emit('current-bands', this.bandlist.getBands()); solo al cliente que dispara el evento
                this.io.emit('current-bands', this.bandlist.getBands()) // a todos los clientes conectados
            })

            // borrar banda
            socket.on('borrar-banda', (data) => {
                // console.log(data)
                this.bandlist.removeBand(data?.id)
                //  socket.emit('current-bands', this.bandlist.getBands()); solo al cliente que dispara el evento
                this.io.emit('current-bands', this.bandlist.getBands()) // a todos los clientes conectados
            })

            // cambiar nombre banda
            socket.on('cambiar-nombre-banda', (data) => {
                // console.log(data)
                this.bandlist.changeName(data?.id, data?.newName)
                //  socket.emit('current-bands', this.bandlist.getBands()); solo al cliente que dispara el evento
                this.io.emit('current-bands', this.bandlist.getBands()) // a todos los clientes conectados
            })

            // crear banda
            socket.on('crear-banda', (data) => {
                // console.log(data)
                this.bandlist.addBand(data?.nombre)
                //  socket.emit('current-bands', this.bandlist.getBands()); solo al cliente que dispara el evento
                this.io.emit('current-bands', this.bandlist.getBands()) // a todos los clientes conectados
            })

        });
    }


}


module.exports = Sockets;