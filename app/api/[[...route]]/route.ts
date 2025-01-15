import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import enquiry from './enquiry'

//'nodejs'
 export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes=app
    .route("/enquiry",enquiry)



export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const PUT = handle(app)

export type AppType = typeof routes