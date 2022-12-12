import Settings from '../../utils/config';
/*
@Name("Play Command")
Makes it so you dont have to do /lobby before doing /play
Also adds tab completions for /play

@Author(s): @Sin_ender
*/
if (Settings.playAutocomplete) {
    let playCommand = register("command", ...args => {
        if (inLimbo) {
            ChatLib.command("lobby")
            setTimeout(() => {
                ChatLib.command("play " + args.join(" "))
            }, 1000)
            return
        }
        ChatLib.command("play " + args.join(" "));
    })
    playCommand.setTabCompletions((args) => {
        let commands = ['sb', 'skyblock', 'warlords_ctf_mini', 'warlords_domination', 'warlords_team_deathmatch', 'mw_standard', 'mw_face_off', 'blitz_solo_normal', 'blitz_teams_normal', 'ranked_normal', 'solo_normal', 'solo_insane', 'doubles_normal', 'doubles_insane', 'solo_insane_tnt_madness', 'teams_insane_tnt_madness', 'solo_rush', 'doubles_rush', 'solo_slime', 'doubles_slime', 'solo_insane_lucky', 'teams_insane_lucky', 'solo_insane_hunter_vs_beasts', 'tnt_tntrun', 'tnt_pvprun', 'tnt_bowspleef', 'tnt_tntag', 'tnt_capture', 'bedwars_eight_one', 'bedwars_eight_two', 'bedwars_four_three', 'bedwars_four_four', 'bedwars_four_four_lucky', 'bedwars_eight_two_lucky', 'bedwars_capture', 'bedwars_eight_two_rush', 'bedwars_four_four_rush', 'bedwars_eight_two_ultimate', 'bedwars_four_four_ultimate', 'bedwars_castle', 'bedwars_two_four', 'bedwars_two_four', 'bedwars_four_four_voidless', 'bedwars_eight_two_voidless', 'bedwars_eight', 'bedwars_four_four_armed', 'arcade_hole_in_the_wall', 'arcade_soccer', 'arcade_bounty_hunters', 'arcade_pixel_painters', 'arcade_dragon_wars', 'arcade_ender_spleef', 'arcade_starwars', 'arcade_throw_out', 'arcade_creeper_attack', 'arcade_party_games_1', 'arcade_farm_hunt', 'arcade_zombies_dead_end', 'arcade_zombies_bad_blood', 'arcade_zombies_alien_arcadium', 'arcade_hide_and_seek_prop_hunt', 'arcade_hide_and_seek_party_pooper', 'arcade_simon_says', 'arcade_mini_walls', 'arcade_day_one', 'mcgo_normal', 'mcgo_deathmatch', 'mcgo_normal_party', 'mcgo_deathmatch_party', 'build_battle_solo_normal', 'build_battle_teams_normal', 'build_battle_solo_pro', 'build_battle_guess_the_build', 'uhc_solo', 'uhc_teams', 'uhc_events', 'vampirez', 'quake_solo', 'quake_teams', 'paintball', 'arena_1v1', 'arena_2v2', 'arena_4v4', 'walls', 'tkr', 'duels_classic_duel', 'duels_sw_duel', 'duels_sw_doubles', 'duels_bow_duel', 'duels_uhc_duel', 'duels_uhc_doubles', 'duels_uhc_four', 'duels_uhc_meetup', 'duels_potion_duel', 'duels_combo_duel', 'duels_potion_duel', 'duels_op_duel', 'duels_op_doubles', 'duels_mw_duel', 'duels_mw_doubles', 'duels_solo_sumo', 'duels_blitz_duel', 'duels_bowspleef_duel', 'duels_bridge_duel', 'duels_bridge_doubles', 'duels_bridge_four', 'duels_bridge_2v2v2v2', 'duels_bridge_3v3v3v3', 'speed_solo_normal', 'speed_team_normal', 'super_smash_solo_normal', 'super_smash_2v2_normal', 'super_smash_2v2v2_normal', 'super_smash_1v1_normal', 'super_smash_friends_normal', 'murder_classic', 'murder_double_up', 'murder_assassins', 'murder_infection', 'pit', 'prototype_pvp_ctw', 'prototype_koth_two_team', 'prototype_koth_four_team', 'prototype_towerwars_solo', 'prototype_towerwars_team_of_two']
        if (args.length === 1) return commands.filter(s => s.toLowerCase().includes(args[0]))
        return [];
    })
    playCommand.setName('play');
}
let inLimbo = false
register("renderTitle", (title, subtitle, e) => {
    if (!inLimbo && title.includes("You are AFK") && subtitle.includes("Move around to return to the lobby.")) {
        inLimbo = true
    }
});