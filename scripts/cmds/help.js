const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    aliases:["use", "cmdl"],
    version: "1.18",
    author: "👀ꪖ𝘳ꪖ​ᠻꪖ𝓽👻", 
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage",
    },
    longDescription: {
      en: "View command usage and list all commands or commands by category",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName\n{pn} -c <categoryName>",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `╔═══════════╗\n🔹 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 🔹\n╚═══════════╝\n`;

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭────────────⭓\n│『 ${category.toUpperCase()} 』`;

          const names = categories[category].commands.sort();
          names.forEach((item) => {
            msg += `\n│𖤍 ${item}`;
          });

          msg += `\n╰────────⭓`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n𝐂𝐮𝐫𝐫𝐞𝐧𝐭𝐥𝐲 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐡𝐚𝐬 ${totalCommands} 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐭𝐡𝐚𝐭𝐬 𝐜𝐚𝐧 𝐛𝐞 𝐮𝐬𝐞\n`;
      msg += `\n`;
      msg += `\n𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : ✨ ᥊​ ꫀ​ ꪀ​ ꪮ​ ꪀ 🍼`;
      msg += `\n𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 : 👀ꪖ𝘳ꪖ​ᠻꪖ𝓽👻`;
      msg += `\n`;
      msg += `\n`;
      msg += `\n`;

      await message.reply({
        body: msg,
      });
    } else if (args[0] === "-c") {
      if (!args[1]) {
        await message.reply("Please specify a category name.");
        return;
      }

      const categoryName = args[1].toLowerCase();
      const filteredCommands = Array.from(commands.values()).filter(
        (cmd) => cmd.config.category?.toLowerCase() === categoryName
      );

      if (filteredCommands.length === 0) {
        await message.reply(`No commands found in the category "${categoryName}".`);
        return;
      }

      let msg = `╔══════════╗\n${categoryName.toUpperCase()} COMMANDS \n╚══════════╝\n`;

      filteredCommands.forEach((cmd) => {
        msg += `\n☠︎︎ ${cmd.config.name} `;
      });

      await message.reply(msg);
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription
          ? configCommand.longDescription.en || "No description"
          : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `╭── COMMAND INFO ────⭓\n` +
          `│ ${configCommand.name}\n` +
          `├── INFO\n` +
          `│ DESCRIPTION : ${longDescription}\n` +
          `│ OTHER NAME : ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}\n` +
          `│ VERSION : ${configCommand.version || "1.0"}\n` +
          `│ ROLE: ${roleText}\n` +
          `│ COUNT DOUWN: ${configCommand.countDown || 1}s\n` +
          `│ AUTHOR: ${author}\n` +
          `├── USAGE\n` +
          `│ ${usage}\n` +
          `├── NOTES\n` +
          `│ THE CONTENT INSIDE CAN BE CHANGEED\n` +
          `│ BOT OWNER : 👀ꪖ𝘳ꪖ​ᠻꪖ𝓽👻\n` +
          `╰━━━━━━━❖`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
    }
