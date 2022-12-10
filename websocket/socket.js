import WebSocket from "WebSocket"
import { isOnHypixel } from "../utils/extra"
import Settings from "../utils/config"
const ws = new WebSocket("ws://157.245.90.187:8080")

//Auth
const serverId = java.util.UUID.randomUUID().toString().replace("-", "")
Client.getMinecraft().func_152347_ac().joinServer(Client.getMinecraft().func_110432_I().func_148256_e(), Client.getMinecraft().func_110432_I().func_148254_d(), serverId)

ws.onOpen = () => ws.send(JSON.stringify({ method: "login", username: Player.getName(), key: serverId }))
let authenticated = false

function sendChatMessage(message, displayName) {
    if (!isOnHypixel()) return;
    ChatLib.chat(`${Settings.shortChannelNames ? "&6Gl >" : "&6Global >"} ${displayName}&f: ${message}`)
}

ws.onMessage = message => {
    const json = JSON.parse(message.toString())
    console.log(message.toString())

    if (json.success && json.authenticated) {
        ChatLib.chat(`§8${Settings.chatPrefix} §2Logged in successfully!`)
        authenticated = true
    }

    if (json.method == "heartbeat" && json.server) {
        if (json.status !== "still authenticated") {
            ChatLib.chat(`§8${Settings.chatPrefix} §cYou have been logged out of the server!`)
            ws.close()
            authenticated = false
            return;
        }
        ws.send(JSON.stringify({ method: "heartbeat", username: Player.getName(), server: false }))
    }

    if (json.method == "chat" && json.message) {
        sendChatMessage(json.message, json.displayName)
    }
}

ws.connect()

register("gameUnload", () => {
    ws.close()
})

export function getSocket() {
    return ws
}

export function isAuthenticated() {
    return authenticated
}

export function getServerId() {
    return serverId
}