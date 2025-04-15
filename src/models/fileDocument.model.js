import { Schema , model } from "mongoose";

export const documentSchema =  new Schema({
    n_Documento: {
        type: String,
        required: true
    },
    name_Documento: {
        type: String,
        required: true
    },
    fecha_Documento: {
        type: String,
        required: true
    },
    type_Document: {
        type: String,
        required: true
    },
    img_Document: {
        type: String,
    },
},{
    timestamps: true,
    strict: false 
})

export default model('Document',documentSchema)