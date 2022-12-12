import Settings from '../../utils/config';
/*
@Name("Remove Bedwars Advertisements")
Checks for keywords in chat and hides the message if it contains any of them.
This is useful for people who don't want to see Bedwars advertisements in chat.

@Author(s): @Sin_ender
*/
register("chat", (event) => {
    if (!Settings.bedwarsAdvertisements) return;
    let message = ChatLib.getChatMessage(event, true);
    const keywords = ["2v2", "3v3", "4v4", "/2", "/3", "/4", "/8", "1.4", "4s", "3s", "2s"]
    if (keywords.some(keyword => message.includes(keyword))) {
        event.setCanceled(true);
        return;
    }
});