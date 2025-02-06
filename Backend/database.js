import mongoose from 'mongoose';

const randomNumberGenerator = () => {
    return Math.round(Math.random()*10000);
}

const urlSchema = mongoose.Schema({
    url : {
        type: String
    },
    id: {
        type: String,
        default: randomNumberGenerator()
    }
});

export default mongoose.model('URLs', urlSchema);