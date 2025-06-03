import { Schema, model } from 'mongoose';

const exampleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const ExampleModel = model('Example', exampleSchema);

export default ExampleModel;