const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		aliases: ["info","arafat","Arafat","admin"],
		author: "👀 ꪖ᥅ꪖᠻꪖꪻ 🍼",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "👀 ꪖ᥅ꪖᠻꪖꪻ 👻",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: 'ᴀʀᴀғᴀᴛ ʏᴀsɪɴ',
				class: 'ssᴄ - 2028 ʙᴀᴛᴄʜ',
				group: 'ɴᴜʟʟ',
				gender: 'ᴍᴀʟᴇ',
				Birthday: '09 ᴀᴜɢᴜsᴛ, 2010',
				religion: 'ɪsʟᴀᴍ',
				hobby: 'ᴛᴏ ʙᴇ ᴀ sᴏғᴛᴡᴀʀᴇ ᴇɴɢɪɴᴇᴇʀ',
				Fb: 'https://www.facebook.com/xuzt.arafat',
				Relationship: 'sɪɴɢᴇʟ',
				Height: '5"2''
			};

			const bold = '';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, '');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
 ~ 𝕆𝕎ℕ𝔼ℝ 𝕀ℕ𝔽𝕆 ~ \n
 𝗡𝗮𝗺𝗲 : ${ownerInfo.name}
 𝗦𝘁𝘂𝗱𝘆 : ${ownerInfo.class}
 𝗚𝗿𝗼𝘂𝗽 : ${ownerInfo.group}
 𝗚𝗲𝗻𝗱𝗲𝗿 : ${ownerInfo.gender}
 𝗗𝗮𝘁𝗲 𝗼𝗳 𝗯𝗶𝗿𝘁𝗵 : ${ownerInfo.Birthday}
 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻 : ${ownerInfo.religion}
 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝘀𝘁𝗮𝘁𝘂𝘀 : ${ownerInfo.Relationship}
 𝗛𝗼𝗯𝗯𝘆 : ${ownerInfo.hobby}
 𝗛𝗲𝗶𝗴𝗵𝘁 : ${ownerInfo.Height}
 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 : ${ownerInfo.Fb}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(videoPath);

			api.setMessageReaction('🍼', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage(' ~ 𝕆𝕎ℕ𝔼ℝ 𝕀ℕ𝔽𝕆 ~ \n
 𝗡𝗮𝗺𝗲 : ${ownerInfo.name}
 𝗦𝘁𝘂𝗱𝘆 : ${ownerInfo.class}
 𝗚𝗿𝗼𝘂𝗽 : ${ownerInfo.group}
 𝗚𝗲𝗻𝗱𝗲𝗿 : ${ownerInfo.gender}
 𝗗𝗮𝘁𝗲 𝗼𝗳 𝗯𝗶𝗿𝘁𝗵 : ${ownerInfo.Birthday}
 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻 : ${ownerInfo.religion}
 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝘀𝘁𝗮𝘁𝘂𝘀 : ${ownerInfo.Relationship}
 𝗛𝗼𝗯𝗯𝘆 : ${ownerInfo.hobby}
 𝗛𝗲𝗶𝗴𝗵𝘁 : ${ownerInfo.Height}
 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 : ${ownerInfo.Fb} ', event.threadID);
		}
	}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
