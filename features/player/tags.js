import axios from "axios";
import { apiURL } from "../../index";
/*
@Name("Online Icons")
Gives a green icon to players who are using the hysentials module.
This feature is still in beta and may not work properly.

@Author(s): @Sin_ender
*/
register('worldload', () => {
    setTimeout(() => {
        let users = []
        TabList.getUnformattedNames().forEach((name) => {
            users.push(name)
        })
        axios.get(apiURL + "online", { headers: { "User-Agent": "Mozilla/5.0 (ChatTriggers)" }, parseBody: true }).then((response) => {
            if (response.data.success == true) {
                response.data.online.forEach(user => {
                    if (users.includes(user)) {
                        let icon = "§a◆ "
                        target = World.getPlayerByName(user)
                        let displayName = target.getDisplayName().getText()
                        let newdisplayname = ""
                        if (displayName.startsWith("§a◆ ")) {
                            newdisplayname = displayName
                        } else {
                            newdisplayname = icon + displayName
                        }
                        if (target != null) {
                            target.setTabDisplayName(new TextComponent(newdisplayname))
                            target.setNametagName(new TextComponent(newdisplayname))
                        }
                    }
                })
            }
        })
    }, 250)
})