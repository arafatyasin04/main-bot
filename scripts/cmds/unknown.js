module.exports = {
 config: {
	 name: "unknown",
	 version: "1.0",
	 author: "👀arafat👻",//remodified by cliff
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "👀arafat👻",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "xenon") {
 return message.reply({
 body: `𝗛𝗲𝗿𝗲 𝗶𝘀 𝗺𝘆 𝗼𝘄𝗻𝗲𝗿'𝘀 𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗮𝗰𝗰𝗼𝘂𝗻𝘁 : facebook.com/xuzt.arafat`
        });
      }
   }
}
