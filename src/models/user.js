const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', async function (next) {
   const user = this;
   if (!user.isModified('password'))
       return next();

   user.password = await bcrypt.hash(user.password, 10);
   return next();

});

module.exports = mongoose.model('User', UserSchema);