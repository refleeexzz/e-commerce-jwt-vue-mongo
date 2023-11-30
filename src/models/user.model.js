const mongoose = require ('mongoose')
const bycript = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, maxlenght: 50, required: true},
    email: {type: String, maxlenght: 30, required: true},
    passsword: {type: String, required: true},
    tokens: [
        {
            token: {type: String, require: True}
        }
    ]

}, {
    timestamps: true,
    collection: 'users'
});

userSchema.pre('save', async function(next){
    const user = this;
    if (user.isDirectModified('passsword')){
        user.passsword = await bcrypt.hash(user.password, 8)
    }
    next();
})
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id: user._id, name: user.name, useremail}, 'secret');
    const tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email});
    console.log(user);
    if(!user){
        throw new Error({ error: 'invalid login'});
    }
    const isPassworldMatch = await bcrypt.compare(password, user.password);

    if (!isPassworldMatch){
        throw new Error ({ error: 'invalid login'});

    }
    return user; 
};

const User = mongoose.model('User', userSchema)

module.exports = User;