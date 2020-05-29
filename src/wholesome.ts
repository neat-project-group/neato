import {Message} from 'discord.js';
// Import Sentiment from 'sentiment';
import sentiment from 'wink-sentiment';
export async function filter(message: Message) {
	// Const sent = new Sentiment();
	// const result = sent.analyze(message.content).comparative;
	const result = sentiment(message.content).score;
	console.log(result);
	if (result < 0) {
		await message.delete({reason: 'not wholesome'});
	}
}

