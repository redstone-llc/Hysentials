class Ranks {
    ranks = {
        admin: {
            prefix: "§c[ADMIN] ",
            char: "1"
        },
        mod: {
            prefix: "§2[MOD] ",
            char: "2"
        },
        creator: {
            prefix: "§3[§fCREATOR§3] ",
            char: "3"
        },
        default: {
            prefix: "§7",
            char: null
        }
    }
    constructor() {
        Object.keys(this.ranks).forEach((rank) => {
            this.ranks[rank].prefix = "§a◆ " + this.ranks[rank].prefix
        })
    }

    getTeam(rank) {
        return this.ranks[rank].team
    }

    getPrefix(rank) {
        return this.ranks[rank].prefix
    }

    getRank(rank) {
        return this.ranks[rank]
    }
}

//random string generator
function randomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let INSTANCE = new Ranks();

export function getInsance() {
    return INSTANCE;
}