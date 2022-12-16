const File = Java.type('java.io.File');
import FileUtilities from "../../utils/fileUtils";

register("gameLoad", () => {
    if (FileLib.exists("./config/ChatTriggers/modules/HysentialsUpdater")) return
    ChatLib.chat("&aHysentialsUpdater is not installed, installing now...")
    new File("./config/ChatTriggers/modules/HysentialsUpdater").mkdirs();
    FileUtilities.urlToFile(
        "https://github.com/blockworks-studio/hysentials-updater/raw/main/Hysentials-Update-1.0.0.jar",
        "./config/ChatTriggers/modules/HysentialsUpdater/Hysentials-Update-1.0.0.jar",
        10000,
        10000
    )
    FileUtilities.urlToFile(
        "https://github.com/blockworks-studio/hysentials-updater/raw/main/index.js",
        "./config/ChatTriggers/modules/HysentialsUpdater/index.js",
        10000,
        10000
    )
    FileUtilities.urlToFile(
        "https://github.com/blockworks-studio/hysentials-updater/raw/main/metadata.json",
        "./config/ChatTriggers/modules/HysentialsUpdater/metadata.json",
        10000,
        10000
    )
    ChatLib.chat("&aHysentialsUpdater has been installed.")

    ChatLib.chat("&aCompleted first time checks. Restarting ChatTriggers...")
    com.chattriggers.ctjs.Reference.loadCT()
})