// config.js
import { @Vigilant @SliderProperty @SwitchProperty @NumberProperty @TextProperty @ButtonProperty @SliderProperty @CheckboxProperty } from 'Vigilance';

@Vigilant("Hysentials", `Hysentials 1.5-beta`, {
	getCategoryComparator: () => (a, b) => {
		const categories = ["General", "Guild", "QOL"];

		return categories.indexOf(a.name) - categories.indexOf(b.name);
	}
})
class Settings {

	// General

	@TextProperty({
		name: "Chat Prefix",
		description: "The prefix of most Hysentials related messages, so you know the message is a result of Hysentials and not other mods.",
		category: "General",
		subcategory: "General",
	})
	chatPrefix = "&b[HYSENTIALS]";

	@SwitchProperty({
		name: "Global Chat Enabled",
		description: "",
		category: "General",
		subcategory: "General",
	})
	globalChatEnabled = true;

	// Chat

	@SwitchProperty({
		name: "Player Count Chat",
		description: "Put the player count before the player name in game join/leave messages. For best results, make sure to have player visibility enabled. Results may not be exact.",
		category: "Chat",
		subcategory: "Player Count Chat",
	})
	playerCountChat = false;
	
	@SwitchProperty({
		name: "Leave Player Count Chat",
		description: "Put the player count before the player name in game leave messages. For best results, make sure to have player visibility enabled. Results may not be exact.",
		category: "Chat",
		subcategory: "Player Count Chat",
	})
	leavePlayerCountChat = true;

	@SwitchProperty({
		name: "Bedwars Advertisements",
		description: "Remove player messages asking to join BedWars parties.",
		category: "Chat",
		subcategory: "Misc",
	})
	bedwarsAdvertisements = false;

	@SwitchProperty({
		name: "MVP++ Emoji Remover",
		description: "Remove MVP++ emojis from chat messages.",
		category: "Chat",
		subcategory: "Misc",
	})
	emojiRemover = false;

	@SwitchProperty({
		name: "Short Channel Names",
		description: "Abbreviate channel names.",
		category: "Chat",
		subcategory: "Misc",
	})
	shortChannelNames = false;

	@SwitchProperty({
		name: "White Chat",
		description: "Make nons chat messages appear as the normal chat message color.",
		category: "Chat",
		subcategory: "Misc",
	})
	whiteChat = false;

	@SwitchProperty({
		name: "White Private Messages",
		description: "Make private messages appear as the normal chat message color.",
		category: "Chat",
		subcategory: "Misc",
	})
	whitePrivateMessages = false;

	@SwitchProperty({
		name: "Remove Lobby Statuses",
		description: "Remove lobby join messages from chat.",
		category: "Chat",
		subcategory: "Statuses",
	})
	removeLobbyStatuses = false;

	@SwitchProperty({
		name: "Remove Friend/guild Statuses",
		description: "Remove join/quit messages from friend/guild members.",
		category: "Chat",
		subcategory: "Statuses",
	})
	removeFriendGuildStatuses = false;

	@SwitchProperty({
		name: "Hide Mystery Box Messages",
		description: "Hides mystery box messages from chat that are not yours.",
		category: "Chat",
		subcategory: "Announcements",
	})
	hideMysteryBoxMessages = false;

	@SwitchProperty({
		name: "Game Announcements",
		description: "Hides game announcements from chat.",
		category: "Chat",
		subcategory: "Announcements",
	})
	gameAnnouncements = false;

	@SwitchProperty({
		name: "Hype Limit Reminder",
		description: "Hides the hype limit reminder from chat.",
		category: "Chat",
		subcategory: "Announcements",
	})
	hypeLimitReminder = false;

	@SwitchProperty({
		name: "Soul Well",
		description: "Hides soul well messages from chat.",
		category: "Chat",
		subcategory: "Announcements",
	})
	soulWell = false;




	// Guild

	@SwitchProperty({
		name: "Guild Welcome Message",
		description: 'Send a friendly welcome message when a player joins your guild.',
		category: "Guild",
		subcategory: "Guild",
	})
	guildWelcomeMessage = false;

	// QOL

	@SwitchProperty({
		name: "Autocomplete play Commands",
		description: "Allows tab completion of /play commands",
		category: "QOL",
		subcategory: "QOL",
	})
	playAutocomplete = true;


	@SwitchProperty({
		name: "Chat Swapper Enabled",
		description: "Automatically change back to a selected channel when leaving a party.",
		category: "QOL",
		subcategory: "Chat Swapper",
	})
	chatSwapperEnabled = true;
	

	@TextProperty({
		name: "Chat Swapper Channel",
		description: "The channel to switch to when leaving a party.",
		category: "QOL",
		subcategory: "Chat Swapper",
	})
	chatSwapperChannel = "all";


	@SwitchProperty({
		name: "Hide Swap Message",
		description: "Hide the message that shows when you auto-switch channels.",
		category: "QOL",
		subcategory: "Chat Swapper",
	})
	hideSwapMessage = true;
	
	
	constructor() {
		this.initialize(this);
		this.setCategoryDescription("General", "&aGeneral settings for Hysentials")
		this.setCategoryDescription("Chat", "&aChat related settings for Hysentials")
		this.setCategoryDescription("Guild", "&aCommands for guild related stuff")
		this.setCategoryDescription("QOL", "&aQuality of life features")
		this.setSubcategoryDescription("QOL", "Chat Swapper", "&aAutomatically change back to a selected channel when leaving a party.")
	}
}

export default new Settings();
