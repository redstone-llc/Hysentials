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
register("worldload", () => {
    setTimeout(() => {
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
                        uuid: World.getPlayerByName(user).getUUID().toString(),
                    },
                    parseBody: true,
                }).then((rankResponse) => {
                    if (!rankResponse.data.success) return;
                    let rank = rankResponse.data.rank;
                    let prefix = indicator()
                    let char
                    let oldPrefix = target.getTeam().getPrefix()
                    let displayName = World.getPlayerByName(user).getDisplayName().getText()
                    let target = World.getPlayerByName(user);
                    switch (rank) {
                        case "admin": {
                            prefix += "§c[ADMIN] "
                            char = `1`
                            color = `§c`
                            break;
                        }
                        case "mod": {
                            prefix += "§2[MOD] "
                            char = `2`
                            color = `§2`
                            break;
                        }
                        case "creator": {
                            prefix += "§3[§fCREATOR§3] "
                            char = `3`
                            color = `§3`
                            break;
                        }
                        case "default": {
                            prefix += oldPrefix
                            char = target.getTeam().getName()
                            color = `§7`
                            break;
                        }
                    }
                    if (Number.isInteger(parseInt(ChatLib.removeFormatting(oldPrefix)))) {
                        prefix = indicator() + oldPrefix + color
                    }
                    if (oldPrefix.startsWith("§a") || oldPrefix.startsWith("§c") || oldPrefix.startsWith("§7§k")) {
                        prefix = indicator() + oldPrefix
                    }
                    if (target != null) {
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

function indicator () {
    return World.getPlayerByName(user).getDisplayName().getText().includes("§a◆") ? "" : "§a◆ "
}