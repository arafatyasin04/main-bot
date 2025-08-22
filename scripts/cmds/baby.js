const axios = require('axios');

// API URL লোড করা
const baseApiUrl = async () => {
  const base = await axios.get('https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json');
  return base.data.api;
};

module.exports.config = {
  name: "baby",
  aliases: ["baby", "bbe", "babe"],
  version: "7.0.0",
  author: "dipto",
  countDown: 0,
  role: 0,
  description: "Better than all SimSimi",
  category: "chat",
  guide: {
    en: "{pn} [anyMessage] OR\nteach [YourMessage] - [Reply1], [Reply2]... OR\nremove [YourMessage] OR\nmsg [YourMessage] OR\nlist"
  }
};

// মূল ফাংশন শুরু
module.exports.onStart = async ({ api, event, args, usersData }) => {
  const link = `${await baseApiUrl()}/baby`;
  const message = args.join(" ").toLowerCase();
  const uid = event.senderID;

  try {
    if (!args[0]) {
      const replies = ["Bolo baby", "Hum?", "Type help baby", "Type !baby hi"];
      return api.sendMessage(replies[Math.floor(Math.random() * replies.length)], event.threadID, event.messageID);
    }

    // Remove Message
    if (args[0] === 'remove') {
      const text = message.replace("remove ", "");
      const res = (await axios.get(`${link}?remove=${text}&senderID=${uid}`)).data.message;
      return api.sendMessage(res, event.threadID, event.messageID);
    }

    // Teach Message
    if (args[0] === 'teach') {
      const [command, reply] = message.replace("teach ", "").split(' - ');
      if (!reply) return api.sendMessage('❌ | Invalid format! Use teach [YourMessage] - [Reply]', event.threadID, event.messageID);
      
      const res = await axios.get(`${link}?teach=${command}&reply=${reply}&senderID=${uid}`);
      const teacher = (await usersData.get(res.data.teacher)).name;
      return api.sendMessage(`✅ Replies added: ${res.data.message}\nTeacher: ${teacher}\nTotal Teachs: ${res.data.teachs}`, event.threadID, event.messageID);
    }

    // List Messages
    if (args[0] === 'list') {
      const total = (await axios.get(`${link}?list=all`)).data.length;
      return api.sendMessage(`Total Teach Count = ${total}`, event.threadID, event.messageID);
    }

    // Get Message Reply
    const response = (await axios.get(`${link}?text=${message}&senderID=${uid}&font=1`)).data.reply;
    return api.sendMessage(response, event.threadID, event.messageID);
  
  } catch (error) {
    console.error(error);
    return api.sendMessage("⚠️ Error occurred! Check console for details.", event.threadID, event.messageID);
  }
};

// Reply System
module.exports.onReply = async ({ api, event, Reply }) => {
  try {
    const message = event.body?.toLowerCase();
    if (!message) return;

    const response = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(message)}&senderID=${event.senderID}&font=1`)).data.reply;
    return api.sendMessage(response, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage(`⚠️ Error: ${error.message}`, event.threadID, event.messageID);
  }
};

// Auto Chat System
module.exports.onChat = async ({ api, event }) => {
  try {
    const body = event.body?.toLowerCase();
    if (!body) return;

    if (["baby", "bby", "bot", "hii", "বট"].some(prefix => body.startsWith(prefix))) {
      const query = body.replace(/^\S+\s*/, "") || "empty";
      
      if (query === "empty") {
        const funnyReplies = [
          "~Kire bolod, amare koitechos naki? 🐸",
          "~ei new jush khaw, bot bolte bolte hapai gecho 🧃",
          "~Amake vhule jao 🥺",
          "~Ami shudhu Hasan er. Don't disturb me! 🤦",
          "~bujhchi tui je Single na hole amare dakti na ekhon ki bolbi bol! 🙂🤌",
          "~ei mon tumake dilam 🦆💨",
          "~bujhchi tur kew nai amar motoi single"
        ];
        return api.sendMessage(funnyReplies[Math.floor(Math.random() * funnyReplies.length)], event.threadID, event.messageID);
      }

      const response = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(query)}&senderID=${event.senderID}&font=1`)).data.reply;
      return api.sendMessage(response, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    return api.sendMessage(`⚠️ Error: ${error.message}`, event.threadID, event.messageID);
  }
};
