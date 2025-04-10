import {config} from "dotenv"

config()

export const URI_DB = process.env.URI_DB ?? ""
export const PORT = process.env.PORT ?? 4000