import Settings from '../../utils/config';
register("chat", (event) => {
    if (!Settings.bedwarsAdvertisements) return;
    let message = ChatLib.getChatMessage(event, true);
    const keywords = ["2v2", "3v3", "4v4", "/2", "/3", "/4", "/8", "1.4", "4s", "3s", "2s"]
    if (keywords.some(keyword => message.includes(keyword))) {
        event.setCanceled(true);
        return;
    }
});