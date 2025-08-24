module.exports = {
 config: {
	 name: "prefix",
	 version: "1.0",
	 author: "~ Aʀᴀғᴀᴛ 🐱🐾",//remodified by cliff
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "auto 🪐",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `
YOO, ᗰY ᑭᖇᗴᖴI᙭ IՏ [ - ]\n
Sᴏᴍᴇ Cᴏᴍᴍᴀɴᴅs Tʜᴀᴛ Mᴀʏ Hᴇʟᴘ Yᴏᴜ:
➥ Oᴡɴᴇʀ : 👀 ꪖ᥅ꪖᠻꪖꪻ 👻
➥ ✓-𝐜𝐚𝐥𝐥𝐚𝐝 [𝐦𝐞𝐬𝐬𝐚𝐠𝐞] -> 𝐫𝐞𝐩𝐨𝐫𝐭 𝐚𝐧𝐲 𝐩𝐫𝐨𝐛𝐥𝐞𝐦 𝐞𝐧𝐜𝐨𝐮𝐧𝐭𝐞𝐫𝐞𝐝
➥ ✓-𝐡𝐞𝐥𝐩 -> 𝐬𝐞𝐞 𝐭𝐡𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝'𝐬 𝐥𝐢𝐬𝐭 \n\n 𝙷𝚊𝚟𝚎 𝚏𝚞𝚗 𝚋𝚢 𝚞𝚜𝚒𝚗𝚐 𝚒𝚝, 𝚎𝚗𝚓𝚘𝚢!❤️\n`,
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/M4luPbE.gif")
 });
 }
 }
}
