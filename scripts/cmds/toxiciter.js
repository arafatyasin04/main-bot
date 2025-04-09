module.exports = {
 config: {
	 name: "xenon",
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
 body: `😺 Meet my owner to learn the usage of bot`
        });
      }
   }
}
