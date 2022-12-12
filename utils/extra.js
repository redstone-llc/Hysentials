//hypixel line separator
let separator = "-----------------------------------------------------";

let onHypixel = false;

register("worldLoad", (event) => {
    if (Server.getIP().includes("hypixel.net")) {
        onHypixel = true;
    }
})

register("serverDisconnect", (event) => {
    onHypixel = false
})

export function isOnHypixel() {
    return onHypixel;
}

export function getSeparator() {
    return separator;
}

export function delayChatMessage(message, delay) {
    setTimeout(() => {
        ChatLib.chat(message);
    }, delay);
}
