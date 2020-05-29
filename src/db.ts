import mongoose from 'mongoose';

export async function init() {
	await new Promise(resolve => setTimeout(resolve, 3000));
	await mongoose.connect(process.env.MONGO_URL || 'mongodb://db:27017/neat');
}
