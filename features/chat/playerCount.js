import Settings from '../../utils/config';
register("chat", (event) => {
    let message = ChatLib.getChatMessage(event, true)
    if (message.includes("&6slid into the lobby!&r") && Settings.removeLobbyStatuses) {
        event.setCanceled(true);
        return
    }
    if (!Settings.playerCountChat) return;
    if (message.includes("&6slid into the lobby!&r") || message.includes("&r&e entered the world.&r")) {
        event.setCanceled(true);
        let playerNames = []
        World.getAllPlayers().forEach(p => {
            if (!p.getDisplayName().getText().equals("") && !p.getDisplayName().getText().equals(null) && !p.getDisplayName().getText().equals(" ")) {
                playerNames.push(p.getDisplayName().getText())
            }
        })
        ChatLib.chat(`&7[${playerNames.length}] &r${message}`)
    }

    if (Settings.leavePlayerCountChat && message.includes("&r&e left the world.&r")) {
        event.setCanceled(true);
        let playerNames = []
        World.getAllPlayers().forEach(p => {
            if (!p.getDisplayName().getText().equals("") && !p.getDisplayName().getText().equals(null) && !p.getDisplayName().getText().equals(" ")) {
                playerNames.push(p.getDisplayName().getText())
            }
        })
        ChatLib.chat(`&7[${playerNames.length}] &r${message}`)
    }
})