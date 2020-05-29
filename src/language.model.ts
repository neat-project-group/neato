import mongoose, {Schema, Document} from 'mongoose';

const LanguageSchema = new Schema({
	canonicalName: {type: String, required: true, unique: true},
	aliases: [String]
});

export interface ILanguage extends Document {
	canonicalName: string;
	aliases: string[];
}

export const Language = mongoose.model<ILanguage>('Language', LanguageSchema);
