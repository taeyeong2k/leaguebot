const { CommandType } = require('commandkit');
 
module.exports = {
    data: {
        name: 'content',
        type: CommandType.Message,
    },
 
    run: ({ interaction, client, handler }) => {
        interaction.reply(`The message is: ${interaction.targetMessage.content}`);
    },
 
    options: {
        devOnly: true,
        guildOnly: true,
        userPermissions: ['Administrator', 'AddReactions'],
        botPermissions: ['Administrator', 'AddReactions'],
        deleted: false,
    },
};