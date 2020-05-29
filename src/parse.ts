import {Message} from 'discord.js';
import {v4 as uuidv4} from 'uuid';
import * as commands from './commands';

export default async function parse(message: Message) {
	try {
		if (message.channel.type === 'text' && message.channel.topic.includes('neat-commands')) {
			const argv = message.content.split(' ');
			const cmd = argv[0];
			const argStrings = argv.slice(1);
			const args = {};
			for (const arg of argStrings) {
				if (arg.includes('=') && !arg.includes('_')) {
					const pair = arg.split('=');
					args[pair[0]] = pair[1];
				} else {
					await message.channel.send(`Sorry, ${message.author.tag}, your command's syntax is invalid.`);
					return;
				}
			}

			if (typeof commands[cmd] === 'function') {
				const result = await commands[cmd](args, message);
				await message.channel.send(result);
			} else {
				await message.channel.send(`Sorry, ${message.author.tag}, that command doesn't exist.`);
				return;
			}
		}
	} catch (error) {
		const errorID = uuidv4();
		await message.channel.send(`Sorry, ${message.author.tag}, your command failed with error ID ${errorID}.`);
		console.error(errorID);
		console.error(error);
	}
}