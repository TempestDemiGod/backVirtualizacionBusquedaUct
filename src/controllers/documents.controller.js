import { response } from "express"
import { addDocument, allGetDocuments, deleteDocument, getOneDocument, pageDocuments, searchPageDocuments, updateDocument } from "../services/document.service.js"

export const createDocument = async( req , res ) => {
    try {
        
        const data = req.body
        const response = await addDocument(data)
        res.status(response.status).json(response.data)
    } catch (e) {
        console.log(e)
    }
}

export const actualizarDocument = async( req , res ) => {
    try {
        const {id} = req.params
        const data = req.body
        const response = await updateDocument(id, data)
        res.status(response.status).json(response.data)
    } catch (e) {
        console.log(e)
    }
}

export const AllDocuments = async( req , res ) => {
    try {
        const response = await allGetDocuments()
        res.status(response.status).json(response.data)
    } catch (e) {
        console.log(e)
    }
}

export const ObtenerDocumento = async( req , res ) => {
    try {
        const {id} = req.params
        const response = await getOneDocument(id)
        res.status(response.status).json(response.data)
    } catch (e) {
        console.log(e)
    }
}

export const paginacionDocumentos = async( req , res ) => {
    try {
        const {page} = req.params 
        const response = await pageDocuments(page)
        res.status(response.status).json(response.data)
    } catch (e) {
        console.log(e)
    }
}

export const paginacionDocumentosBusqueda = async( req , res ) => {
    try {
        const {page} = req.params
        const filtros = req.body 
        const response = await searchPageDocuments(page, filtros)
        res.status(response.status).json(response.data)
    } catch (e) {
        console.log(e)
    }
}

export const eliminarDocumento = async( req , res ) => {
    try {
        const {id} = req.params
        const response = await deleteDocument(id)
        res.status(response.status).json(response.data)
    } catch (e) {
        console.log(e)
    }
}