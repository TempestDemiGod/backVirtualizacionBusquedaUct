import { Router } from "express";
import { validateDocumentsSchemas } from "../middlewares/validatorSchema.middleware.js";
import {addDocument} from "../schemas/fileDocument.schema.js";
import { actualizarDocument, AllDocuments, createDocument, eliminarDocumento, ObtenerDocumento, paginacionDocumentos, paginacionDocumentosBusqueda, paginacionDocumentosFolder } from "../controllers/documents.controller.js";
import fileUpload from "express-fileupload";


const route = Router()

route.post('/document',fileUpload(), validateDocumentsSchemas(addDocument), createDocument )
route.delete('/document/:id', eliminarDocumento)
route.patch('/document/:id',validateDocumentsSchemas(addDocument), actualizarDocument)
route.get('/document/:id', ObtenerDocumento)
route.get('/documents', AllDocuments)
route.get('/pageDocuments/:page' ,paginacionDocumentos)
route.get('/searchDocumentsFolder/:page/:folder' ,paginacionDocumentosFolder)
route.post('/searchDocuments/:page' ,paginacionDocumentosBusqueda)


export default route