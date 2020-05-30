import Discord from 'discord.js';
import fs from 'fs';
import {Spinner} from 'cli-spinner';
import * as db from './db';
import parse from './parse';

const client = new Discord.Client();
const ready = new Promise(resolve => client.once('ready', resolve));

(async () => {
	const spinner = new Spinner();
	spinner.setSpinnerString(3);
	spinner.setSpinnerTitle('%s Loading secret...');
	spinner.start();
	const secret = fs.readFileSync('./discord-token', 'utf8').trim();
	spinner.setSpinnerString(10);
	spinner.setSpinnerTitle('%s Connecting to database...');
	await db.init();
	spinner.setSpinnerString(14);
	spinner.setSpinnerTitle('%s Logging in...');
	await client.login(secret);
	await ready;
	spinner.stop(true);
	console.log('Done!');
	client.on('message', async message => {
		console.log(`${message.author.tag}: ${message.content}`);
		if (!message.author.bot) {
			await parse(message);
		}
	});
})().catch(error => {
	throw error;
});

process.on('SIGINT', () => {
	process.exit();
});
