import WebSocket from "WebSocket"
import { isOnHypixel } from "../utils/extra"
import Settings from "../utils/config"
import { websocket } from "../index"
let socket = null
let serverId = null
let closed = false
function createSocket(timedOut) {
    let ws = new WebSocket(websocket)
    //Authenticates the user to minecraft authentication servers that
    //we can check later with https://sessionserver.mojang.com/session/minecraft/hasJoined
    serverId = java.util.UUID.randomUUID().toString().replace("-", "")
    Client.getMinecraft().func_152347_ac().joinServer(Client.getMinecraft().func_110432_I().func_148256_e(), Client.getMinecraft().func_110432_I().func_148254_d(), serverId)

    //Sends a login request to the websocket server
    //The server will then check if the user is authenticated with minecraft
    //If the user is authenticated, the server will send a success message
    ws.onOpen = () => ws.send(JSON.stringify({ method: "login", username: Player.getName(), key: serverId }))

    //I should probably not make this a function but whatever
    function sendChatMessage(message, displayName) {
        if (!isOnHypixel()) return;
        ChatLib.chat(`${Settings.shortChannelNames ? "&6Gl >" : "&6Global >"} ${displayName}&f: ${message}`)
    }

    ws.onMessage = message => {
        if (closed) return;
        const json = JSON.parse(message.toString()) //Converts the message to a JSON object

        if (json.success && json.authenticated) { //The server sends a success message if the user is authenticated
            ChatLib.chat(`§8${Settings.chatPrefix} §2Logged in successfully!`)
            timedOut = false
        }

        //This is necessary for the server to know that the user is still connected
        if (json.method == "heartbeat" && json.server) { 
            if (json.status !== "still authenticated") {
                ws.close()
                return;
            }
            ws.send(JSON.stringify({ method: "heartbeat", username: Player.getName(), server: false }))
        }

        //Global chat messages
        if (json.method == "chat" && json.message) {
            sendChatMessage(json.message, json.displayName)
        }
    }

    ws.onClose = () => {
        if (closed) {
            closed = false
            ws = null
            return;
         } //If the user leaves the game or reloads the script, don't try to reconnect
        if (timedOut) { //If the user is already trying to reconnect, don't spam the chat and don't try to reconnect again
            ChatLib.chat(`${Settings.chatPrefix} §cFailed to reconnect to the server. Some features may not work.`)
            return
        }
        ChatLib.chat(`§8${Settings.chatPrefix} §cYou have been logged out of the server! Trying to reconnect in 5 seconds! (Connection closed)`)
        timedOut = true
        setTimeout(() => {
            socket = createSocket(true)
        }, 5000)
    }
    ws.connect()
    return ws
}

//Creates the websocket connection when the user starts the game
socket = createSocket(false)

//Closes the websocket connection when the user leaves the game or reloads the script
register("gameUnload", () => {
    socket.close()
    socket = null
    closed = true
})

export function getSocket() {
    return socket
}

export function getServerId() {
    return serverId
}
