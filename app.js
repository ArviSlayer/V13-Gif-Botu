const fs = require('fs');
const { Client } = require('discord.js');
const client = new Client({ intents: 983 });
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");

const {token} = require("./ayarlar.json")
global.client = client;
client.commands = (global.commands = []);

//#region KOMUTLAR LOAD KISMI
fs.readdir("./komutlar/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./komutlar/${file}`);

        client.commands.push({
            name: props.name.toLowerCase(),
            description: props.description,
            options: props.options,
            type: props.type,
        })
        console.log(`Slash Komutu Yüklendi: ${props.name}`);
    });
});

//#endregion
//#region EVENTS LOAD KISMI
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        console.log(`Event Yüklendi: ${eventName}`);
        client.on(eventName, (...args) => {
            event(client, ...args);
        });
    });
});

//#endregion
//#region KOMUTLAR SET KISMI
client.on("ready", async () => {

    console.log("Gifty Bot Kullanıma Hazır!");
    client.user.setActivity("Gifty Gif", { type: "PLAYING" });
    const rest = new REST({ version: "10" }).setToken(token);
    try {
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: commands,
        });

    } catch (error) {
        console.error(error);
    }
});

//#endregion
client.login(token);