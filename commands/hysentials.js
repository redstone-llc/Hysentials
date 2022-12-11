import Settings from '../utils/config';

let cen1 = ChatLib.getCenteredText("&6Hysentials Commands (1/1)")
let cem2 = ChatLib.getCenteredText('&7Basic Hysentials Commands')

let hysentialsCommand = register("command", ...args => {
    let command;
    try {
        command = args[0].toLowerCase();
    } catch (e) {
        command = ['help', 1]
    }
    if (command == "help") {
        let page = parseInt(args[1])
        if (isNaN(page)) page = 1;
        if (page == 1) {
            ChatLib.chat(`&6-----------------------------------------------------`);
            ChatLib.chat(cen1)
            ChatLib.chat(cen2)
            ChatLib.chat('')
            ChatLib.chat('&6/hysentials help <page> &fView all the Hysentials commands.')
            ChatLib.chat('&6/hysentials config &fOpen the Hysentials config.')
            ChatLib.chat('&6/settexture &fOpen a gui to select one of the textures available.')
            ChatLib.chat('')
            ChatLib.chat(`&6-----------------------------------------------------`);
        } else {
            ChatLib.chat("&cInvalid Page Number.");
        }
        return;
    }
    if (command == "config") {
        Settings.openGUI();
        return;
    }
    ChatLib.chat("&cInvalid Hysentials command. Type /hysentials help for a list of commands.");
})
hysentialsCommand.setName('hysentials');

hysentialsCommand.setTabCompletions((args) => {
	if (args.length === 1) return ['help'];
	return [];
})
