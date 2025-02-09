import { Hono } from 'hono'
import {cors} from 'hono/cors'
import { handle } from 'hono/vercel'
import enquiry from './enquiry'
import school from './school'
import home from './home'
import blogs from './blogs'
import fee from './fee'

//'nodejs'
 export const runtime = 'nodejs'

const app = new Hono().basePath('/api')
app.use('*', cors({
    origin:process.env.ORIGIN_URL!,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
}))
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes=app
    .route("/enquiry",enquiry)
    .route("/school",school)
    .route("/home",home)
    .route("/blogs",blogs)
    .route("/fees",fee)



export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const PUT = handle(app)

export type AppType = typeof routes