import { Hono } from "hono"
import {clerkMiddleware,getAuth} from "@hono/clerk-auth"
import { db } from "@/db"
import { hero, highlight, imageGallery, insertHeroSchema, insertHighlightSchema, insertImageGallerySchema, insertVideoGallerySchema, insertWelcomeSchema, selectHeroSchema, selectHighlightSchema, selectImageGallerySchema, selectVideoGallerySchema, selectWelcomeSchema, videoGallery, welcome } from "@/db/schemas/home-content"
import { zValidator } from "@hono/zod-validator"
import { eq } from "drizzle-orm"

const app = new Hono()
    .get('/hero',
        clerkMiddleware(),
        async (c) => {
              const auth = getAuth(c)
                if (!auth?.userId) {
                    return c.json({
                    message: 'You are not logged in.',
                    },400)
                }
                const [heroData]=await db.select().from(hero).limit(1)
                return c.json(
                    {data:heroData},200
                )
    })
    .get('/welcome',
        clerkMiddleware(),
        async (c) => {
              const auth = getAuth(c)
                if (!auth?.userId) {
                    return c.json({
                    message: 'You are not logged in.',
                    },400)
                }
                const [welcomeData]=await db.select().from(welcome).limit(1)
                return c.json(
                    {data:welcomeData},200
                )
    })
    .get('/highlights',
        clerkMiddleware(),
        async (c) => {
              const auth = getAuth(c)
                if (!auth?.userId) {
                    return c.json({
                    message: 'You are not logged in.',
                    },400)
                }
                const data=await db.select().from(highlight).limit(3)
                return c.json(
                    {data:data},200
                )
    })
    .get('/video-gallery',
        clerkMiddleware(),
        async (c) => {
              const auth = getAuth(c)
                if (!auth?.userId) {
                    return c.json({
                    message: 'You are not logged in.',
                    },400)
                }
                const data=await db.select().from(videoGallery)
                console.log(data)
                return c.json(
                    {data:data},200
                )
    })
    .get('/image-gallery',
        clerkMiddleware(),
        async (c) => {
              const auth = getAuth(c)
                if (!auth?.userId) {
                    return c.json({
                    message: 'You are not logged in.',
                    },400)
                }
                const data=await db.select().from(imageGallery)
                return c.json(
                    {data:data},200
                )
    })
    .post('/hero',
        clerkMiddleware(),
        zValidator("json",insertHeroSchema),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(hero).values(values)
            return c.json({
                    message: 'Submitted successfully',
            },200)
            
        } catch (error) {
            console.log("HERO ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .post('/welcome',
        clerkMiddleware(),
        zValidator("json",insertWelcomeSchema),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(welcome).values(values)
            return c.json({
                    message: 'Submitted successfully',
            },200)
            
        } catch (error) {
            console.log("WELCOME ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .post('/highlight',
        clerkMiddleware(),
        zValidator("json",insertHighlightSchema),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(highlight).values(values)
            return c.json({
                    message: 'Submitted successfully',
            },200)
            
        } catch (error) {
            console.log("Highlight ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .post('/video-gallery',
        clerkMiddleware(),
        zValidator("json",insertVideoGallerySchema),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(videoGallery).values(values)
            return c.json({
                    message: 'Submitted successfully',
            },200)
            
        } catch (error) {
            console.log("VideoGallery ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .post('/image-gallery',
        clerkMiddleware(),
        zValidator("json",insertImageGallerySchema),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(imageGallery).values(values)
            return c.json({
                    message: 'Submitted successfully',
            },200)
            
        } catch (error) {
            console.log("VideoGallery ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .put('/hero',
        clerkMiddleware(),
        zValidator("json",selectHeroSchema),
        async (c) => {
        const values=c.req.valid("json")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id,...data}=values
        try {
            await db.update(hero).set(data).where(eq(hero.id,values.id))
            return c.json({
                    message: 'Updated successfully',
            },200)
            
        } catch (error) {
            console.log("HERO ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .put('/welcome',
        clerkMiddleware(),
        zValidator("json",selectWelcomeSchema),
        async (c) => {
        const values=c.req.valid("json")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id,...data}=values
        try {
            await db.update(welcome).set(data).where(eq(welcome.id,values.id))
            return c.json({
                    message: 'Updated successfully',
            },200)
            
        } catch (error) {
            console.log("WELCOME ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .put('/highlight',
        clerkMiddleware(),
        zValidator("json",selectHighlightSchema),
        async (c) => {
        const values=c.req.valid("json")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id,...data}=values
        try {
            await db.update(highlight).set(data).where(eq(highlight.id,values.id))
            return c.json({
                    message: 'Updated successfully',
            },200)
            
        } catch (error) {
            console.log("Highlight ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .put('/video-gallery',
        clerkMiddleware(),
        zValidator("json",selectVideoGallerySchema),
        async (c) => {
        const values=c.req.valid("json")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id,...data}=values
        try {
            await db.update(videoGallery).set(data).where(eq(videoGallery.id,values.id))
            return c.json({
                    message: 'Updated successfully',
            },200)
            
        } catch (error) {
            console.log("VideoGallery ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .put('/image-gallery',
        clerkMiddleware(),
        zValidator("json",selectImageGallerySchema),
        async (c) => {
        const values=c.req.valid("json")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id,...data}=values
        try {
            await db.update(imageGallery).set(data).where(eq(imageGallery.id,values.id))
            return c.json({
                    message: 'Updated successfully',
            },200)
            
        } catch (error) {
            console.log("ImageGallery ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    



export default app