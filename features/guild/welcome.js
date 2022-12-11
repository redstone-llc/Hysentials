import Settings from '../../utils/config';
register("chat", (event) => {
    let message = ChatLib.getChatMessage(event, false);
    if (message.includes("joined the guild!")) {
        if (Settings.guildWelcomeMessage) {
            ChatLib.command(`gchat Welcome to the guild, ${message.split(" ")[0]}! :D`); // Notice: This will likely block you from ChatTriggers as this is sort of a macro.
        }
    }
})
