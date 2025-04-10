import express from "express"
import morgan from "morgan"
import cors from "cors"
import routeAdmin from "../routes/adminDocument.route.js"
import routeClient from "../routes/clientDocument.route.js"

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: '*',
    credentials: true
}))

app.use('/uct/api/admin', routeAdmin)
app.use('/uct/api/user', routeClient)

export default app