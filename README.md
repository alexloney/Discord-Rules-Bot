# Discord-Rules-Bot

# Setup
In order to set up this Discord bot, you must first create a file named "token.json" and insert yor bot token into it in a structure similar to the following:

```
{
    "token": "<your token here>"
}
```

Next, you'll want to modify "botconfig.json" to properly reflect the configuration for your server including the command that will be used to accept and the role that will be applied once accepted.

Finally, you'll want to set up and run the bot utilizing the following commands:

```
npm install
node index.js
```

As an alternative, the following is a decent command to run it on Linux inside of a screen (adjusting paths as needed).

```
screen -S DiscordRulesBot -m /usr/bin/nodejs /u01/Discord-Rules-Bot/index.js
```

Note that, if you're using Linux, you may have to follow the "Installing Node.js from the NodeSource repository" instructions here: https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/

And if all went well, the bot should be up and running!

# Permissions
Because this bot will delete messages to keep the rules channel clean, and automatically apply roles, you should make sure that you add it to a role with at lesat the following permissions:

* Manage Roles
* Manage Messages

Also, make sure that the role is higher than the "Accepted Rules" role that you will be having it manage.

# Development/Debugging
Debugging is surprisingly easy, but I want to record it here just in case it's needed in the future.

1. Open the project in Visual Studio Code
2. Go to File -> Preferences -> Settings
3. Search for "node debug"
4. Make sure "Debug > Node: Auto Attach" is set to "on"
5. Run the command "node --inspect index.js"
6. Set breakpoints
