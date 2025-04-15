import documentModel from "../models/fileDocument.model.js"
import { deleteDocumentoDrive, uploadPDFToFolder } from "./driveGoogle.service.js"

const retInf = (status, data)=> {
    return {
        status: status,
        data: data
    }
}

export const addDocument = async (data , pdf) => {
    try {
        if(!pdf) return retInf(400, 'el documento es obligatorio')
        const documents = await documentModel.find()
        if(documents >= 40) return retInf(201,'alcanzado limite documentos') 
        const newPDF = await uploadPDFToFolder(data.folder_name , pdf , data.file_name )
        const dataDocument = {
            ...data,
            ...newPDF,
            folder_name: data.folder_name
        }
        const newDocument = new documentModel(dataDocument)
        await newDocument.save()
        return retInf(201,'documento creado con exito')
    } catch (e) {
        return retInf(500, e.message)
    }
}

export const updateDocument = async (id, data) => {
    try {
        const updateDocument = await documentModel.findByIdAndUpdate(id, data, {
            new: true
        })
        if(!updateDocument) return retInf(404,'el documento no existe')
        return retInf(200, updateDocument)
    } catch (e) {
        return retInf(500,e.message)
    }
} 

export const allGetDocuments = async() => {
    try {
        const allDocuments = await documentModel.find().select('-img_Document')
        return retInf(200,allDocuments)
    } catch (e) {
        return retInf(500,e.message)
    }
}

export const getOneDocument = async(id) => {
    try {
        const documentFound = await documentModel.findById(id)
        if(!documentFound) return retInf(404,'el documento no existe')
        return retInf(200,documentFound)
    } catch (e) {
        return retInf(500,e.message)
    }
}

export const pageDocuments = async(page) => {
    try {
        const limit = 10
        const skip = (page -1) * limit
        const documents = await documentModel.find().skip(skip).limit(limit)
        const tpages = await Tpages(limit)
        let InfoPage = {}
        if(page < tpages){
            InfoPage.hasNextPage = true
            InfoPage.nextPage = page + 1
        }else{
            InfoPage.hasNextPage = false
            InfoPage.nextPage = null
        }

        if(page == 1){
            InfoPage.hasPrevPag = false
            InfoPage.prevPage = null
        }else{
            InfoPage.hasPrevPag = true
            InfoPage.prevPage = page - 1
        }
        const reponse = {
            docs : documents,
            totalPage: tpages,
            limit,
            page,
            ...InfoPage
        }
        return retInf(200, reponse)
    } catch (e) {
        return retInf(500,e.message)
    }
}

const Tpages = async( limit, filtros = {} ) => {
    const documents = await documentModel.countDocuments(filtros)
    const tPages = Math.ceil(documents / limit)
    return tPages
}
export const searchPageDocumentsFolder = async(page= 1,folder) => {
    try {
        const limit = 10
        const skip = (page -1) * limit
        let filtros  = folder
        const documents = await documentModel.find(filtros).skip(skip).limit(limit)
        const tpages = await Tpages(limit , filtros)
        let InfoPage = {}
        if(page < tpages){
            InfoPage.hasNextPage = true
            InfoPage.nextPage = page + 1
        }else{
            InfoPage.hasNextPage = false
            InfoPage.nextPage = null
        }

        if(page == 1){
            InfoPage.hasPrevPag = false
            InfoPage.prevPage = null
        }else{
            InfoPage.hasPrevPag = true
            InfoPage.prevPage = page - 1
        }
        const reponse = {
            docs : documents,
            totalPage: tpages,
            limit,
            page,
            ...InfoPage
        }
        return retInf(200, reponse)
    } catch (e) {
        return retInf(500,e.message)
    }
}
export const searchPageDocuments = async(page = 1 , datosFiltro) => {
    try {
        const limit = 10
        const skip = (page -1) * limit
        let filtros  = {
            ...datosFiltro?.filtros
        }
        if(datosFiltro?.name_Documento) filtros.name_Documento = { $regex: datosFiltro.name_Documento, $options: 'i' }
        const documents = await documentModel.find(filtros).skip(skip).limit(limit)
        const tpages = await Tpages(limit , filtros)
        let InfoPage = {}
        if(page < tpages){
            InfoPage.hasNextPage = true
            InfoPage.nextPage = page + 1
        }else{
            InfoPage.hasNextPage = false
            InfoPage.nextPage = null
        }

        if(page == 1){
            InfoPage.hasPrevPag = false
            InfoPage.prevPage = null
        }else{
            InfoPage.hasPrevPag = true
            InfoPage.prevPage = page - 1
        }
        const reponse = {
            docs : documents,
            totalPage: tpages,
            limit,
            page,
            ...InfoPage
        }
        return retInf(200, reponse)
    } catch (e) {
        return retInf(500,e.message)
    }
}

export const deleteDocument = async(id) => {
    try {

        const documentFound = await documentModel.findOneAndDelete(id)
        await deleteDocumentoDrive(documentFound.documentID)
        if(!documentFound) return retInf(404, 'el documento no existe')
        return retInf(200, 'documento eleminado con exito')
    } catch (e) {
        return retInf(500,e.message)
    }
}