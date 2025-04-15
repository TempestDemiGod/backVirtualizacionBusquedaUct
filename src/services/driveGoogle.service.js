import { google } from 'googleapis'
import { Readable } from 'stream'
import { GOOGLE_CREDENTIALS_BASE64 } from '../config/config.js'


const credentialsJson = JSON.parse(Buffer.from(GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf-8'))

const auth = new google.auth.GoogleAuth({
    credentials: credentialsJson,
    scopes: ['https://www.googleapis.com/auth/drive.file']
})

const drive = google.drive({ version: 'v3', auth });

async function getOrCreateFolder(folderName) {
    try {
        const listRes = await drive.files.list({
            q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id, name)',
            spaces: 'drive'
        })
        if (listRes.data.files.length > 0) {
            // Carpeta ya existe
            return listRes.data.files[0].id;
        }
        // 2. Crear carpeta si no existe
        const createRes = await drive.files.create({
            resource: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            },
            fields: 'id',
        });

        return createRes.data.id;

    } catch (e) {
        console.log(e)
    }
}

export async function uploadPDFToFolder(folderName, file , nameDocument){
    try {
        const folderId = await getOrCreateFolder(folderName)

        const fileMetaData = {
            name: nameDocument,
            parents: [folderId]
        }

        const media = {
            mimeType : file.mimeType ,
            body : Readable.from(file.data)
        }

        const res = await drive.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id, webViewLink, webContentLink',
        })
        await drive.permissions.create({
            fileId: res.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        return {
            folderId,
            documentID : res.data.id ,
            linkPublic : res.data.webViewLink,
            downloadLink : res.data.webContentLink
        }
    } catch (e) {
        console.log(e.message)
    }
}

export async function deleteDocumentoDrive(id ){
    try {
        await drive.files.delete({
            fileId: id
        })
    } catch (e) {
        console.log(e)
    }
}

export async function carpetasyarchivosBusqueda (folderId = 'root'){
    try {
        const response = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: 'files(id, name, mimeType)',
        })

        const archivos = response.data.files
        const listItemsFolder = archivos.map(file=> {
            if( file.mimeType == 'application/vnd.google-apps.folder'){
                file.folder = true
            }else{
                file.folder = false
            }
        })
        return listItemsFolder 
    } catch (e) {
        console.log(e)
    }
}