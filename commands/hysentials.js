import Settings from '../utils/config';

let cen1 = ChatLib.getCenteredText("&6Hysentials Commands (1/1)")
let cen2 = ChatLib.getCenteredText('&7Basic Hysentials Commands')

let hysentialsCommand = register("command", ...args => {
    let command;
    try {
        command = args[0].toLowerCase();
    } catch (e) {
        args = ['help', 1]
        command = 'help'
    }
    if (command == "help") {
        let page = parseInt(args[1])
        if (isNaN(page)) page = 1;
        if (page == 1) {
            ChatLib.chat(`&9&m-----------------------------------------------------`);
            ChatLib.chat(cen1)
            ChatLib.chat(cen2)
            ChatLib.chat('')
            ChatLib.chat('&6/hysentials help <page> &7- &fView all the Hysentials commands.')
            ChatLib.chat('&6/hysentials config &7- &fOpen the Hysentials config.')
            ChatLib.chat('&6/settexture &7- &fOpen a gui to select one of the textures available.')
            ChatLib.chat('')
            ChatLib.chat(`&9&m-----------------------------------------------------`);
        } else {
            ChatLib.chat("&cInvalid Page Number.");
        }
        return;
    }
    if (command == "config") {
        Settings.openGUI();
        return;
    }
})
hysentialsCommand.setName('hysentials');

hysentialsCommand.setTabCompletions((args) => {
    if (args.length === 1) return ['help'];
    return [];
})
