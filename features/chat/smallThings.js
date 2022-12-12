import Settings from '../../utils/config';
register("chat", (event) => {
    let message = ChatLib.getChatMessage(event, true);
    //Hides messages from the Mystery Box
    if (Settings.hideMysteryBoxMessages && message.includes("&b✦") && message.includes("&r&7found a &r") && message.includes("&r&7!&r") && !message.includes(Player.getName())) {
        event.setCanceled(true);
        return;
    }
    if (Settings.hideMysteryBoxMessages && message.includes("&r&b✦") && message.includes(" &r&7found an") && message.includes("&r&7in a &r&aMystery Box&r&7!&r") && message.includes(Player.getName())) {
        event.setCanceled(true);
        return;
    }
    
    //Hides messages from the Soul Well
    if (Settings.soulWell && message.includes("&r&7has found") && message.includes("&r&7in the &r&bSoul Well&r&7!&r")) {
        event.setCanceled(true);
        return;
    }

    //Hides game announcements
    if (Settings.gameAnnouncements && message.includes("&r&6&lCLICK HERE&r&b to join!&r")) {
        event.setCanceled(true);
        return;
    }

    //Removes the prototype lobby hype limit reminder
    if (Settings.hypeLimitReminder && message.equals("&r  &r&f&l➤ &r&6You have reached your Hype limit! Add Hype to Prototype Lobby minigames by right-clicking with the Hype Diamond!&r")) {
        event.setCanceled(true);
        return;
    }

    //Removes the join and leave messages for friends and guilds
    //This is useless, there is commands for this already on hypixel #BlameMighty
    if (Settings.removeFriendGuildStatuses) {
        if (message.includes("&aFriend > &r") && message.includes("&r&eleft.&r")) {
            event.setCanceled(true);
            return;
        }
        if (message.includes("&2Guild > &r") && message.includes("&r&eleft.&r")) {
            event.setCanceled(true);
            return;
        }
        if (message.includes("&aFriend > &r") && message.includes("&r&ejoined.&r")) {
            event.setCanceled(true);
            return;
        }
        if (message.includes("&2Guild > &r") && message.includes("&r&ejoined.&r")) {
            event.setCanceled(true);
            return;
        }
    }

    //Makes the chat cleaner by making the guild, party, officer, and co-op chat shorter
    if (Settings.shortChannelNames) {
        if (message.includes("&r&2Guild > ") && message.includes("&f: ")) {
            event.setCanceled(true);
            ChatLib.chat(message.replace("&r&2Guild > ", "&2G > &r"))
            return;
        }
        if (message.includes("&r&9Party &8> ") && message.includes("&f: &r")) {
            event.setCanceled(true);
            ChatLib.chat(message.replace("&r&9Party &8> ", "&9P > &r"))
            return;
        }
        if (message.includes("&r&3Officer > ") && message.includes("&f: &r")) {
            event.setCanceled(true);
            ChatLib.chat(message.replace("&r&3Officer > ", "&r&3O > "))
            return;
        }
        if (message.includes("&r&bCo-op > ") && message.includes("&f: &r")) {
            event.setCanceled(true);
            ChatLib.chat(message.replace("&r&bCo-op > ", "&r&bC > "))
            return;
        }
    }

    //Makes nons chat messages white instead of gray
    if (Settings.whiteChat) {
        if (message.includes("&7&r&7: ")) {
            event.setCanceled(true);
            ChatLib.chat(message.replace("&7&r&7: ", "&f&r&f: "))
            return;
        }
    }

    //Makes private messages white instead of gray
    if (Settings.whitePrivateMessages) {
        if (message.includes("&dTo &r&7") && message.includes("&r&7: &r&7")) {
            event.setCanceled(true);
            ChatLib.chat(message.replace("&r&7: &r&7", "&r&f: &r&f"))
            return;
        }
    }
})
