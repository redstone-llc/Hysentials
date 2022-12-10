import Settings from '../../utils/config';
let switchedChannel
register("chat", (event) => {
    if (!Settings.chatSwapperEnabled) return
    let message = ChatLib.getChatMessage(event, true);
    if (Settings.hideSwapMessage && (message.equals("&cYou're already in this channel!&r") || message.equals("&aYou are now in the &r&6ALL&r&a channel&r")) && switchedChannel > new Date()) {
        event.setCanceled(true);
        switchedChannel = undefined;
    }
    if (message.equals("&eYou left the party.&r") || message.equals("&cThe party was disbanded because all invites expired and the party was empty.&r")) {
        switchedChannel = new Date().setTime(new Date().getTime() + 2000)
        ChatLib.command("chat " + Settings.chatSwapperChannel)
    }
})