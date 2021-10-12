const Band = require("./band");

class BandList {
    constructor() {
        this.bands = [
            new Band('Metallica'),
            new Band('Heroes del Silencio'),
            new Band('Bon Jovi'),
            new Band('Breaking Benjamin')
        ];
    }

    // Metodos
    addBand(name) {
        const newBand = new Band(name);
        this.bands.push(newBand);
        return this.bands;
    }

    removeBand(id) {
        this.bands = this.bands.filter(item => item.id !== id);
    }

    getBands() {
        return this.bands;
    }

    increaseVotes(id) {
        this.bands = this.bands.map(item => {
            if (item.id === id) {
                item.votes += 1;
            }
            return item;
        })
    }

    changeName(id, newName) {
        this.bands = this.bands.map(item => {
            if (item.id === id) {
                item.name = newName;
            }
            return item;
        })
    }



}


module.exports = BandList;