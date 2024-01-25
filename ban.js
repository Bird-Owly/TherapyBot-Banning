const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js'); //imports necessary functions from discord.js

module.exports = { //data that will be exported so it can be used in deploy-commands.js
	data: new SlashCommandBuilder()
		.setName('ban') //the name of the command
		.setDescription('Select a member and ban them.') //the description of the command
		.addUserOption(option => //adds a user option
			option
				.setName('target') //the name of the user option
				.setDescription('The member to ban') //the description of the user option
				.setRequired(true)) //makes this a required option
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
		.addIntegerOption(option =>
			option
				.setName('duration')
				.setDescription('Choose a duration for the user to be banned for')
				.addChoices(
					{ name: 'Permanent', value: 5.36e13 },
					{ name: 'Half a Day', value: 43200000 },
					{ name: 'One Day', value: 86400000 },
					{ name: 'Three Days', value: 259200000 },
					{ name: 'One Week', value: 604800000 },
					{ name: 'Two Weeks', value: 1209600000 },
					{ name: 'Three Weeks', value: 1814400000 },
					{ name: 'One Month', value: 2419200000 },
				))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'no reason provided';
		const milliDuration = interaction.options.getInteger('duration') ?? 'no duration provided';
		const modID = String(Math.floor(Math.random() * (10000000000 - 1000000000) + 1000000000));
		const channel = interaction.client.channels.cache.get('1165408598017462412');
		const exeDate = new Date();
		const exeMilli = exeDate.getTime();
		let convertDuration = 'Unknown Duration';
		const trueMilli = exeMilli + milliDuration;
		let dateOfUnban = Date(trueMilli);
		function unbanUser() {
			interaction.guild.members.unban(target);
		}
		if(milliDuration===5.36e13) {
			dateOfUnban = 'None, Permanent Ban';
			convertDuration = 'Permanent Ban';
		} else if(milliDuration===43200000) {
			convertDuration = 'Half a Day';
		} else if(milliDuration===86400000) {
			convertDuration = 'One Day';
		} else if(milliDuration===259200000) {
			convertDuration = 'Three Days';
		} else if(milliDuration===604800000) {
			convertDuration = 'One Week';
		} else if(milliDuration===1209600000) {
			convertDuration = 'Two Weeks';
		} else if(milliDuration===1814400000) {
			convertDuration = 'Three Weeks';
		} else if(milliDuration===2419200000) {
			convertDuration = 'One Month';
		} else {
			interaction.reply('INVALID CHOICE (DURATION) ERROR_150');
		}
		const banEmbed = new EmbedBuilder()
			.setTitle('TherapyBot Notification (Banning)')
			.setDescription('This is a TherapyBot notification being sent to you on behalf of the Thoughtful Therapy Discord server to notify you that you have been banned from the server. More information is listed below:')
			.setColor('#77dd77')
			.setThumbnail('https://cdn.discordapp.com/attachments/1150258402157678664/1154182022613450804/Thoughtful_Therapy_Logo.png')
			.addFields(
				{ name: 'Moderation Action:', value: `Ban`, inline: false },
				{ name: 'Duration:', value: `${convertDuration}`, inline: false },
				{ name: 'Reason:', value: `${reason}`, inline: false },
				{ name: 'Date of Unban:', value: `${dateOfUnban}`, inline: false },
				{ name: 'Additional Information:', value: `You have been banned from the Thoughtful Therapy Discord server. If you are a staff member, you can't represent Thoughtful Therapy until you are unbanned and rejoin the server. Upon rejoining, make a ticket or contact a Manager+ to restore your roles. To rejoin the server once you have been unbanned, use the invite link to rejoin (https://discord.gg/AXvBz2GkpB). If this ban appears to be false, please contact a Manager+.`, inline: false },
			);
		banEmbed.setFooter({
			iconURL: 'https://cdn.discordapp.com/attachments/1150258402157678664/1154182022613450804/Thoughtful_Therapy_Logo.png',
			text: 'TherapyBot v1.7 Alpha, Operated by Thoughtful Therapy',
		});
		const logEmbed = new EmbedBuilder()
			.setTitle('Moderation Log (Banning)')
			.setDescription('This is a moderation log used to notify that a user has been banned from this server. DO NOT DELETE THIS LOG')
			.setColor('#77dd77')
			.setThumbnail('https://cdn.discordapp.com/attachments/1150258402157678664/1154182022613450804/Thoughtful_Therapy_Logo.png')
			.addFields(
				{ name: 'Moderation Action:', value: `Ban`, inline: false },
				{ name: 'Log ID:', value: `${modID}`, inline: false },
				{ name: 'User Banned:', value: `${target}`, inline: false },
				{ name: 'Duration:', value: `${convertDuration}`, inline: false },
				{ name: 'Date of Unban:', value: `${dateOfUnban}`, inline: false },
				{ name: 'Reason:', value: `${reason}`, inline: false },
				{ name: 'Moderator:', value: `${interaction.member.displayName}`},
				{ name: 'Additional Information:', value: `If ${target} is an employee at Thoughtful Therapy, they can't attend any sessions until they have been unbanned and are in the server. Make sure to restore their roles once they rejoin. If this ban appears to be false, please contact a Rep+.`},
			);
		logEmbed.setFooter({
			iconURL: 'https://cdn.discordapp.com/attachments/1150258402157678664/1154182022613450804/Thoughtful_Therapy_Logo.png',
			text: 'TherapyBot v1.7 Alpha, Operated by Thoughtful Therapy',
		});

		await interaction.reply('Sucessfully Executed');
		await target.send({ embeds: [banEmbed] });
		await interaction.guild.members.ban(target);
		await channel.send({ embeds: [logEmbed] });
		setTimeout(unbanUser, milliDuration);

	},
};