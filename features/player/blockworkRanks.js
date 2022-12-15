import axios from "axios";
import { apiURL } from "../../index";
import Settings from "../../utils/config";
import { getInsance } from "../../utils/ranks";

/*
@Name("Blockworks Ranks")
Gives client side ranks to players who are in programs at blockworks.
This feature is still in beta and may not work properly.

@Author(s): @Sin_ender
*/

const UUID = Java.type("java.util.UUID");
<<<<<<< Updated upstream
register("worldload", () => {
    setTimeout(() => {
=======

let loadedUsers = new Set();
register("worldload", () => {
    setTimeout(() => {
        loadedUsers = new Set();
>>>>>>> Stashed changes
        loadRanks()
    }, 250);
})

register("step", () => {
    setTimeout(() => {
        loadRanks()
    }, 250);
}).setDelay(10)

function loadRanks() {
    let users = [];
    TabList.getUnformattedNames().forEach((name) => {
        users.push(name);
    });
    axios.get(apiURL + "online", { headers: { "User-Agent": "Mozilla/5.0 (ChatTriggers)" }, parseBody: true }).then((onlineResponse) => {
        if (!onlineResponse.data.success) return;
        for (let user of onlineResponse.data.online) {
            if (users.includes(user)) {
                axios.get(apiURL + "rank", {
                    headers: { "User-Agent": "Mozilla/5.0 (ChatTriggers)" },
                    query: {
                        username: user,
                    },
                    parseBody: true,
                }).then((rankResponse) => {
                    if (!rankResponse.data.success) return;
                    let rank = rankResponse.data.rank;
                    let prefix = World.getPlayerByName(user).getDisplayName().getText().includes("§a◆") ? "" : "§a◆ "
                    let char
                    switch (rank) {
                        case "admin": {
                            prefix += "§c[ADMIN] "
                            char = `1`
                            break;
                        }
                        case "mod": {
                            prefix += "§2[MOD] "
                            char = `2`
                            break;
                        }
                        case "creator": {
                            prefix += "§3[§fCREATOR§3] "
                            char = `3`
                            break;
                        }
                    }
                    let oldPrefix = World.getPlayerByName(user).getDisplayName().getText().match(/\[(.*?)\] ?/)
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
                        let team = Scoreboard.getScoreboard().func_96509_i(target.getName()) //get players team
                        let suffix = team.func_96663_f() //get players suffix
                        Scoreboard.getScoreboard().func_96524_g(target.getName()) //remove player from team
                        let newTeam = Scoreboard.getScoreboard().func_96527_f(char + UUID.randomUUID().toString().substring(0, 7)) //create new team
                        newTeam.func_96666_b(prefix) //set prefix
                        newTeam.func_96662_c(suffix) //set suffix
                        Scoreboard.getScoreboard().func_151392_a(target.getName(), newTeam.func_96661_b()) //add player to new team
                    }
                })
            }
        }
    })
}