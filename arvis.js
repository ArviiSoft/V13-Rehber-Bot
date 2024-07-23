const { Client, Collection, MessageEmbed } = require('discord.js');
const axios = require('axios');

const { Modal, TextInputComponent, showModal } = require('discord-modals');
const fs = require('fs');

const client = new Client({ 
    intents: [
      'GUILDS',
      'GUILD_MESSAGES',
      'GUILD_MEMBERS'
    ] 
});


const discordModals = require('discord-modals');

discordModals(client);
client.evens = new Collection();
client.commands = new Collection();
client.config = require('./ayarlar.json');

fs.readdir('./commands/', async (err, files) => {
    if (err) throw new Error(err);
    files.forEach(async (file) => {
        var cmd = require(`./commands/${file}`);
        client.commands.set(cmd.name, cmd);
    });
});


const prefix = client.config.prefix;
client.on('messageCreate', async (message) => {
    client.events.get('messageCreate').execute(client, message, prefix)
});

client.on('ready', async () => 
  console.log(`[AKTİF] ${client.user.tag}`));

  fs.readdir('./event/', async (err, files) => {
    if (err) throw new Error(err);
    files.forEach(async (event) => {
      var event = require(`./events/${event}`);
      client.events.set(event.name, event);
    });
  });

client.on('interactionCreate', async (i) => {
  
  if (!i.isButton()) return;

  else if (i.customId == "destek") {

    i.message.guild.channels.create(i.user.username, {
      type: "GUILD_TEXT",
      parent: "990362728734556211",
      reason: "Talep Of Destek",
      permissionOverwrites: [
        {
          id: i.message.guild.id,
          deny: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"]
        },
        {
          id: i.user.id,
          allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"]
        }
      ]
    }).then(async (chan) => {
      chan.send(`Destek Talebini Oluşturan \n> (**${i.user.tag}**)`);
    });


}  else if (i.customId == "baslangicturu") {

    var kanal1 = ayarlar.kanal1
    var kanal2 = ayarlar.kanal2
    var kanal3 = ayarlar.kanal3
    var kanal4 = ayarlar.kanal4 
   i.reply({ephemeral: true, content: `<a:yukleniyor_arvis0011:1058007845364322354> Tur Başlıyor, 20 Saniyen Var` })
    i.guild.channels.cache.get(kanal1).send({ content: `**[arviis.]** <@${i.user.id}> Bu Kanal BlaBlaBla Kanalıdır, Burada BlaBlaBla Yapabilirsiniz`, ephemeral: true }).then((ozel)=> {
  setTimeout(function(){
    ozel.delete()
  }, 20000) // 2000 Milisaniye = 20 Saniye
}); 

 i.guild.channels.cache.get(kanal2).send({ content: `**[arviis.]** <@${i.user.id}> Bu Kanal BlaBlaBla Kanalıdır, Burada BlaBlaBla Yapabilirsiniz`, ephemeral: true }).then((ozel1)=> {
  setTimeout(function(){
    ozel1.delete()
  }, 20000) // 2000 Milisaniye = 20 Saniye
}); 

 i.guild.channels.cache.get(kanal3).send({ content: `**[arviis.]** <@${i.user.id}> Bu Kanal BlaBlaBla Kanalıdır, Burada BlaBlaBla Yapabilirsiniz`, ephemeral: true }).then((ozel2)=> {
  setTimeout(function(){
    ozel2.delete()
  }, 20000) // 2000 Milisaniye = 20 Saniye
}); 

i.guild.channels.cache.get(kanal4).send({ content: `**[arviis.]** <@${i.user.id}> Bu Kanal BlaBlaBla Kanalıdır, Burada BlaBlaBla Yapabilirsiniz`, ephemeral: true }).then((ozel2)=> {
  setTimeout(function(){
    ozel2.delete()
  }, 20000) // 2000 Milisaniye = 20 Saniye
}); 
  }
});


client.on('interactionCreate', async (interaction) => {

  if (interaction.customId == "istekoneri") {
    const modal = new Modal()
      .setCustomId('istekoneri-menü')
      .setTitle('İstek/Öneri Menüsü')
      .addComponents(
        new TextInputComponent()
        .setCustomId('istekonerike')
        .setLabel('Lütfen İsteğini Belirt')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Örnk: arviis. Banlansın')
        .setRequired(true),
      );
      showModal(modal, { client, interaction });
    }
  })
      

client.on('modalSubmit', async (modal) => {
  if(modal.customId === 'istekoneri-menü') {
    const firstResponse = modal.getTextInputValue('istekonerike'); 
    modal.reply({
      content: `İsteğin/Önerin Yetkililere İletildi`,
      ephemeral: true
    });

    const channel = modal.guild.channels.cache.get('1056154742306394162');

    const arvs = await channel.send({
      content: `Yeni Bir İstek/Öneri Var \n> (**${firstResponse}**) \n\n İstek/Öneri Sunan \n> (**${modal.user.tag}**)`
    });
    
    client.on('interactionCreate', async (akla) => client.use(modal, akla, channel.id, arvs.id));
  }  
});


client.login(client.config.token);
