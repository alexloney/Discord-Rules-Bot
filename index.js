const Discord = require('discord.js');
let token = require('./token.json');
var botconfig = require('./botconfig.json');

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
    if (message.content === `${botconfig.prefix}${botconfig.acceptcommand}`)
    {
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
