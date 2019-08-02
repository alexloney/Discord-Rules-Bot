const Discord = require('discord.js');
let token = require('./token.json');
var botconfig = require('./botconfig.json');

let enableBot = true;

// Create an instance of a Discord client
const client = new Discord.Client();

// The ready event is vital, it means that only _after_ this will your bot
// start reacting to information received form Discord
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {

    // Do not respond to messages from bots (prevent a possible infinite loop)
    if (message.author.bot) return;

    // Do not respond to private messages
    if (message.channel.type === 'dm') return;

    // Only allow usage on the specific provided channel
    if (message.channel.name !== botconfig.channel) return;

    // Check the message sent to see if it's the command we're looking for
    if (message.content === `${botconfig.prefix}enable` ||
        message.content === `${botconfig.prefix}disable`)
    {
        // Search through the member list for this specific user to check permissions
        let member = message.guild.members
                        .get(message.author.id);
        if (!member)
        {
            console.log('Failed when attempting to look up user');
            return;
        }

        // If the user is an admin or tech support, let them enable/disable the bot.
        // otherwise prevent it with a message informing them that they do not have
        // permission to do this. A complete list of permissions may be found here:
        // https://discord.js.org/#/docs/main/stable/class/Permissions
        if (member.hasPermission('ADMINISTRATOR') ||
            member.roles.find(role => role.name === 'Tech Support'))
        {
            enableBot = true;
            if (message.content.includes('enable')) enableBot = true;
            else if (message.content.includes('disable')) enableBot = false;
        }
        else
        {
            message.author
                    .send(
                        'You do not have permission to execute that command.'
                    )
                    .catch(console.warn)
        }

        // In either case, delete the message that started this.
        message
            .delete()
            .catch(console.warn);
    }
    else if (message.content === `${botconfig.prefix}${botconfig.acceptcommand}`)
    {
        // If the bot is not enabled, simply return and don't do anything
        if (!enableBot) return;

        // Locate the role from the server that we'll be assigning (we need the ID)
        let acceptedRole = message.guild.roles.find(role => role.name === botconfig.role);
        if (acceptedRole === null)
        {
            console.log('Unable to locate role to assign (' + botconfig.role + ')');
            message.channel.send('Unable to locate role to assign (' + botconfig.role + ')');
            return;
        }

        // Fetch the ID of the role
        let roleId = acceptedRole.id;

        // Assign the user's role and remove the message they posted
        message.guild.members
            .get(message.author.id)
            .addRole(roleId)
            .then(() => message.delete().catch(console.warn))
            .catch(console.warn)
    }
    else
    {
        // If the bot is not enabled, simply return and don't do anything
        if (!enableBot) return;

        // Remove the users message and send them a private message to inform
        // them that they should not send anything else to this channel.
        message
            .delete()
            .catch(console.warn)
            .then(() => 
                message.author
                    .send(
                        'Please don\'t send unrelated messages in #' + botconfig.channel
                    )
                    .catch(console.warn)
                )
    }

});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token.token);
