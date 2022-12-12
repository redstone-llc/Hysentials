import Settings from '../../utils/config';
/*
@Name("Remove Emojis")
Removes MVP++ emojis from displaying in chat.

@Author(s): @Sin_ender
*/

register("chat", (event) => {
    if (!Settings.emojiRemover) return;
    let message = ChatLib.getChatMessage(event, true);
    const emojis = ['&r&c❤&r', '&r&6✮&r', '&r&a✔&r', '&r&c✖&r', '&r&b☕&r', '&r&e➜&r', '&r&e¯\_(ツ)_/¯&r', 
    '&r&c(╯°□°）╯&r&f︵&r&7 ┻━┻&r', '&r&d( ﾟ◡ﾟ)/&r', '&r&a1&r&e2&r&c3&r', '&r&b☉&r&e_&r&b☉&r', '&r&e✎&r&6...&r', 
    '&r&a√&r&e&l(&r&aπ&r&a&l+x&r&e&l)&r&a&l=&r&c&lL&r', "&r&e@&r&a'&r&e-&r&a'&r", '&r&6(&r&a0&r&6.&r&ao&r&c?&r&6)&r', 
    '&r&b༼つ◕_◕༽つ&r', "&r&e(&r&b'&r&e-&r&b'&r&e)⊃&r&c━&r&d☆ﾟ.*･｡ﾟ&r", '&r&e⚔&r', '&r&a✌&r', '&r&c&lOOF&r', "&r&e&l<('O')>&r", 
    '&r&a^-^&r', '&r&eヽ(^◇^*)/&r', '&r&b☃&r', '&r&d<&r&eo&r&d/&r', '&r&aヽ (◕◡◕) ﾉ&r', '&r&6(ᵔᴥᵔ)&r', '&r&e= &r&b＾● ⋏ ●＾&r&e =&r', 
    '&r&6(&r&8・&r&6⊝&r&8・&r&6)&r', '&r&a^_^&r', '&r&e(&r&a✿&r&e◠‿◠)&r', '&r&9ヽ&r&5(&r&d⌐&r&c■&r&6_&r&e■&r&b)&r&3ノ&r&9♬&r']
    emojis.forEach(emoji => {
        if (message.includes(emoji)) {
            event.setCanceled(true);
            ChatLib.chat(message.replace(emoji, ''))
        }
    })
})