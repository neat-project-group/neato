import mongoose, {Schema, Document} from 'mongoose';
import {ILanguage} from './language.model';

const UtilitySchema = new Schema({
	name: {type: String, required: true, unique: true},
	language: {type: Schema.Types.ObjectId, required: true}
});

export interface IUtility extends Document {
	name: string;
	language: ILanguage['_id'];
}

export const Utility = mongoose.model<IUtility>('Utility', UtilitySchema);
