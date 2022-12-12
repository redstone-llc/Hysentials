import axios from "axios";
import { apiURL } from "../../index";
import Settings from "../../utils/config";

/*
@Name("Blockworks Ranks")
Gives client side ranks to players who are in programs at blockworks.
This feature is still in beta and may not work properly.

@Author(s): @Sin_ender
*/

register("worldload", () => {
    setTimeout(() => {
        let users = [];
        TabList.getUnformattedNames().forEach((name) => {
            users.push(name);
        });
        axios.get(apiURL + "ranks", {
            headers: { "User-Agent": "Mozilla/5.0 (ChatTriggers)" },
            parseBody: true,
        })
            .then((response) => {
                if (!response.data.success) return;
                response.data.ranks.forEach((rank) => {
                    rank.users.forEach((user) => {
                        if (!users.includes(user)) return;
                        let prefix
                        switch (rank.name) {
                            case "admin": {
                                prefix = "§c[ADMIN] "
                                break;
                            }
                            case "mod": {
                                prefix = "§2[MOD] "
                                break;
                            }
                            case "creator": {
                                prefix = "§3[§fCREATOR§3]"
                                break;
                            }
                        }
                        let oldPrefix = World.getPlayerByName(user).getDisplayName().getText().match(/\[(.*?)\]/)
                        let displayName = World.getPlayerByName(user).getDisplayName().getText()
                        let newdisplayname = ""
                        if (displayName.startsWith("§7")) {
                            oldPrefix = `§7`
                        } else if (oldPrefix.length > 0) {
                            oldPrefix = oldPrefix[0]
                            console.log(oldPrefix)
                            if (oldPrefix == "[ADMIN]" || oldPrefix == "[MOD]" || oldPrefix == "[§fCREATOR§3]") return
                        } else {
                            oldPrefix = ""
                        }
                        if (oldPrefix == "") {
                            newdisplayname = prefix + displayName
                        } else {
                            newdisplayname = World.getPlayerByName(user).getDisplayName().getText().replace(oldPrefix, prefix);
                        }
                        let target = World.getPlayerByName(user);
                        if (target != null) {
                            target.setTabDisplayName(new TextComponent(newdisplayname));
                            target.setNametagName(new TextComponent(newdisplayname));
                        }
                    })
                });
            });
    }, 250);
})