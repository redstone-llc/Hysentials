/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

//some of this code is taken from forks IRC module
import Settings from "../../utils/config";
import { isOnHypixel } from "../../utils/extra";
import { getSocket, getServerId } from "../../websocket/socket";

let isInGlobalChat = false
let command = register("command", ...args => {
    let command;
    let chats = ["all", "global", "party", "guild", "officer", "skyblock-coop"]
    let alias = ["a", "gl", "p", "g", "o", "coop"]
    if (!isOnHypixel()) {
        ChatLib.chat("&cYou are not in a Hypixel server!")
        return;
    }
    try {
        command = args[0].toLowerCase();
    } catch (e) {
        command = ['', 1]
    }
    if (command == "global" || command == "gl") {
        if (!isOnHypixel()) {
            ChatLib.chat("&cYou are not in a Hypixel server!")
            return;
        }
        if (isInGlobalChat) {
            ChatLib.chat("&cYou're already in this channel!")
        } else {
            isInGlobalChat = true
            ChatLib.chat("&aYou are now in the &6GLOBAL &achat!")
        }
    } else if (!chats.includes(command) && !alias.includes(command)) {
        ChatLib.chat("&cInvalid Channel! Valid channels: " + chats.join(", "))
    } else {
        if (isInGlobalChat) {
            ChatLib.chat("&aYou are now in the &6" + command.toUpperCase() + " &achat!")
        }
        ChatLib.command("chat " + command)
    }
})
command.setTabCompletions((args) => {
    if (args.length === 1) {
        return ["all", "global", "party", "guild", "officer", "skyblock-coop"]
    }
    return []
})
command.setName("chat")

register("chat", (event) => {
    let message = ChatLib.getChatMessage(event, true);
    if (isInGlobalChat) {
        if (message.equals("&cYou're already in this channel!&r")) {
            event.setCanceled(true);
            isInGlobalChat = false
            return;
        }
    }
})

register("messageSent", (message, event) => {
    if (message.startsWith("/")) return;
    if (isInGlobalChat) {
        let displayName = ChatLib.removeFormatting(Player.getDisplayName().getText())
        //remove anything after the player name in the display name
        displayName = displayName.substring(0, displayName.indexOf(Player.getName()) + Player.getName().length)
        displayName = Player.getDisplayName().getText().substring(0, 2) + displayName
        getSocket().send(JSON.stringify({ method: "chat", username: Player.getName(), displayName: displayName, server: false, message: message, key: getServerId() }))
        event.setCanceled(true)
    }
})

register("command", ...args => {
    if (!isOnHypixel()) {
        ChatLib.chat("&cYou are not in a Hypixel server!")
        return;
    }
    let message = args.join(" ")
    let displayName = ChatLib.removeFormatting(Player.getDisplayName().getText())
    //remove anything after the player name in the display name
    displayName = displayName.substring(0, displayName.indexOf(Player.getName()) + Player.getName().length)
    displayName = Player.getDisplayName().getText().substring(0, 2) + displayName
    getSocket().send(JSON.stringify({ method: "chat", username: Player.getName(), displayName: displayName, server: false, message: message, key: getServerId() }))
}).setName("globalchat").setAliases("glchat", "glc")