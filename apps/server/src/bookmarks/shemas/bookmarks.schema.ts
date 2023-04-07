import * as mongoose from 'mongoose';

export const BookmarksSchema = new mongoose.Schema({
    url: String,
    name: String,
    description: String,
    tag: String,
    owner: String,
    created_at: String,
    updated_at: String,
});
