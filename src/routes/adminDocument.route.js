import { Router } from "express";
import { validateDocumentsSchemas } from "../middlewares/validatorSchema.middleware.js";
import {addDocument} from "../schemas/fileDocument.schema.js";
import { actualizarDocument, AllDocuments, createDocument, eliminarDocumento, ObtenerDocumento, paginacionDocumentos, paginacionDocumentosBusqueda } from "../controllers/documents.controller.js";

const route = Router()

route.post('/document', validateDocumentsSchemas(addDocument), createDocument )
route.delete('/document/:id', eliminarDocumento)
route.patch('/document/:id',validateDocumentsSchemas(addDocument), actualizarDocument)
route.get('/document/:id', ObtenerDocumento)
route.get('/documents', AllDocuments)
route.get('/pageDocuments/:page' ,paginacionDocumentos)
route.get('/searchDocuments/:page' ,paginacionDocumentosBusqueda)


export default route