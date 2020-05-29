import {Message} from 'discord.js';
import Sentiment from 'sentiment';
export async function filter(message: Message) {
	const sent = new Sentiment();
	const result = sent.analyze(message.content).comparative;
	console.log(result);
	if (result < 0) {
		await message.delete({reason: 'not wholesome'});
	}
}

