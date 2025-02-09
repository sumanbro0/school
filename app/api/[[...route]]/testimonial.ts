// api/testimonial.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { clerkMiddleware } from '@hono/clerk-auth';
import { insertTestimonialSchema, selectTestimonialSchema, testimonial } from '@/db/schemas/testimonials';


const app = new Hono()
  .post('/',
    clerkMiddleware(),
    zValidator("json", insertTestimonialSchema),
    async (c) => {
      const values = c.req.valid("json");
      try {
        await db.insert(testimonial).values(values);
        return c.json({
          message: 'Testimonial submitted successfully',
        }, 200);
      } catch (error) {
        console.log("Testimonial ERROR", error);
        return c.json({
          message: 'An error occurred',
        }, 400);
      }
    })
  .put('/',
    clerkMiddleware(),
    zValidator("json", selectTestimonialSchema),
    async (c) => {
      const values = c.req.valid("json");
      const { id, ...data } = values;
      try {
        await db.update(testimonial).set(data).where(eq(testimonial.id, id));
        return c.json({
          message: 'Testimonial updated successfully',
        }, 200);
      } catch (error) {
        console.log("Testimonial ERROR", error);
        return c.json({
          message: 'An error occurred',
        }, 400);
      }
    })
  .get('/', async (c) => {
    try {
      const data = await db.select().from(testimonial);
      return c.json({ data }, 200);
    } catch (error) {
      console.log("Testimonial GET ERROR", error);
      return c.json({
        message: 'An error occurred while fetching testimonials',
      }, 500);
    }
  });

export default app;