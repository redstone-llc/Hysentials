import Settings from '../utils/config';
import axios from 'axios';
import FileUtilities from '../utils/fileUtils';
import { delayChatMessage } from '../utils/extra';

register("command", ...args => {
    let command;
    try {
        command = args[0].toLowerCase();
    } catch (e) {
        command = ['', 1]
    }
    if (command == "dev") {
        delayChatMessage(`${Settings.chatPrefix} &aChecking for updates...`, 500)
        delayChatMessage(`${Settings.chatPrefix} &aYou are currently on version &6${Settings.version}&a!`, 1000)
        checkForUpdate(true)
    }
}).setName("update")

Settings.registerListener("Developer Versions", (value) => {
    Client.currentGui.close()

    if (value) {
        ChatLib.chat(`${Settings.chatPrefix} &aDeveloper Versions Enabled!`)
        delayChatMessage(`${Settings.chatPrefix} &aChecking for updates...`, 500)
        delayChatMessage(`${Settings.chatPrefix} &aYou are currently on version &6${Settings.version}&a!`, 1000)
        checkForUpdate(true)
    } else {
        ChatLib.chat(`${Settings.chatPrefix} &cDeveloper Versions Disabled!`)
        delayChatMessage(`${Settings.chatPrefix} &aYou are currently on version &6${Settings.version}&a!`, 500)
        delayChatMessage(`${Settings.chatPrefix} &aRolling back to the latest stable version...`, 1000)
        checkForUpdate(false)
    }
})

function checkForUpdate(dev) {
    if (dev) {
        axios.get("https://api.github.com/repos/sinender/Hysentials/commits", {
            headers: { "User-Agent": "Mozilla/5.0 (ChatTriggers)" },
            parseBody: true,
        }).then(response => {
            let latestCommit = response.data[0].sha
            if (latestCommit != Settings.version) {
                delayChatMessage(`${Settings.chatPrefix} &aThere is an update available!`, 10)
                delayChatMessage(`${Settings.chatPrefix} &aCurrent Version: &6${Settings.version}`, 500)
                delayChatMessage(`${Settings.chatPrefix} &aLatest Version: &6${latestCommit}`, 500)
                delayChatMessage(`${Settings.chatPrefix} &aDownloading update...`, 1000)
                FileUtilities.urlToFile(
                    `https://github.com/sinender/Hysentials/archive/${latestCommit}.zip`,
                    `Hysentials-${latestCommit}.zip`,
                    10000,
                    10000
                ).then(file => {
                    if (file.exists()) {
                        delayChatMessage(`${Settings.chatPrefix} &aUpdate downloaded!`, 10)
                        delayChatMessage(`${Settings.chatPrefix} &aInstalling update...`, 500)
                        FileLib.unzip(file, "./config/ChatTriggers/modules")
                        FileLib.deleteDirectory("./config/ChatTriggers/modules/Hysentials")
                        FileUtilities.renameDirectory(`./config/ChatTriggers/modules/Hysentials-${latestCommit}`, "Hysentials")
                        delayChatMessage(`${Settings.chatPrefix} &aUpdate installed!`, 10)
                    }
                })
            }
        })
    }
}