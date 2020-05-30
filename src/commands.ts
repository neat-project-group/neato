import {Language} from './language.model';
import {Message} from 'discord.js';
export async function help(_args: any, _message: Message) {
	return `\`\`\`
	---=== Neat Code Help ===---
	* help - Returns this message.
	* addLanguage - Adds a language, or updates it if it doesn't exist.
	* getLanguage - Returns a language.
	\`\`\``;
}

export async function addLanguage(args: any, message: Message): Promise<string> {
	if (message.member.hasPermission('MANAGE_CHANNELS')) {
		if (!args.name) {
			return 'Missing required argument name.';
		}

		let lang = await Language.findOne({canonicalName: args.name}).exec();
		if (!lang) {
			lang = new Language({
				canonicalName: args.name
			});
		}

		Object.assign(lang, args);

		await lang.save();
		return 'Done';
	}

	return 'Only server administrators can manage languages.';
}

export async function getLanguage(args: any, _message: Message): Promise<string> {
	if (!args.name) {
		return 'Missing required argument name.';
	}

	const lang = await Language.findOne({canonicalName: args.name});

	return lang ? JSON.stringify({
		canonicalName: lang.canonicalName,
		aliases: lang.aliases
	}) : 'None.';
}
