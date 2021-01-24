const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        min: [5, 'Too short, min is 5 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    email: {
        type: String,
        min: [5, 'Too short, min is 5 characters'],
        max: [32, 'Too long, max is 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min: [5, 'Too short, min is 5 characters'],
        max: [32, 'Too long, max is 32 characters'],
        required: 'Password is required'
    },
});
userSchema.statics.EncryptPassword = async function (password) { const hash = await bcrypt.hash(password, 12); return hash; };

module.exports = mongoose.model('User', userSchema)