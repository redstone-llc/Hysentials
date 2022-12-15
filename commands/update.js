import Settings from '../utils/config';
import { version } from '../utils/config';
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
        delayChatMessage(`${Settings.chatPrefix} &aYou are currently on version &6${Settings.hyVersion}&a!`, 1000)
        checkForUpdate(true)
        return;
    }
}).setName("update")

Settings.registerListener("Developer Versions", (value) => {
    Client.currentGui.close()
    if (value) {
        ChatLib.chat(`${Settings.chatPrefix} &aDeveloper Versions Enabled!`)
        delayChatMessage(`${Settings.chatPrefix} &aChecking for updates...`, 500)
        checkForUpdate(true)
    } else {
        ChatLib.chat(`${Settings.chatPrefix} &cDeveloper Versions Disabled!`)
        delayChatMessage(`${Settings.chatPrefix} &aYou are currently on version &6${Settings.hyVersion}&a!`, 500)
        delayChatMessage(`${Settings.chatPrefix} &aRolling back to the latest stable version...`, 1000)
        checkForUpdate(false)
    }
})

function checkForUpdate(dev) {
    if (dev) {
        axios.get("https://api.github.com/repos/blockworks-studio/Hysentials/commits", {
            headers: { "User-Agent": "Mozilla/5.0 (ChatTriggers)" },
            parseBody: true,
        }).then(response => {
            let latestCommit = response.data[0].sha.substring(0, 7)
            let newVersion = "dev-" + latestCommit
            if (newVersion != Settings.hyVersion) {
                delayChatMessage(`${Settings.chatPrefix} &aThere is an update available!`, 1000)
                delayChatMessage(`${Settings.chatPrefix} &aCurrent Version: &6${Settings.hyVersion}`, 1500)
                delayChatMessage(`${Settings.chatPrefix} &aLatest Version: &6${newVersion}`, 1500)
                delayChatMessage(`${Settings.chatPrefix} &aDownloading update...`, 1500)
                FileUtilities.urlToFile(
                    `https://github.com/blockworks-studio/Hysentials/archive/${latestCommit}.zip`,
                    `Hysentials.zip`,
                    10000,
                    10000
                ).then(file => {
                    if (file.exists()) {
                        delayChatMessage(`${Settings.chatPrefix} &aUpdate downloaded!`, 1500)
                        delayChatMessage(`${Settings.chatPrefix} &aInstalling update...`, 1500)
                        FileLib.deleteDirectory(`./config/ChatTriggers/modules/Hysentials`)
                        FileLib.unzip(file, "./config/ChatTriggers/modules")
                        
                        FileUtilities.copyDirectory(`./config/ChatTriggers/modules/Hysentials-${latestCommit}`, `./config/ChatTriggers/modules/Hysentials`)
                        FileLib.deleteDirectory(`./config/ChatTriggers/modules/Hysentials-${latestCommit}`)
                        setTimeout(() => {
                            com.chattriggers.ctjs.Reference.loadCT()
                            delayChatMessage(`${Settings.chatPrefix} &aUpdate installed!`, 1000)
                            Settings.hyVersion = newVersion
                        }, 4000)

                    }
                })
            } else {
                delayChatMessage(`${Settings.chatPrefix} &aYou are up to date!`, 1000)
            }
        })
    }
}