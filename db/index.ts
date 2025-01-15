import { drizzle } from 'drizzle-orm/node-postgres';
import * as enqueryForm from './schemas/enquery-form';
export const db = drizzle(process.env.DATABASE_URL!,{
    schema:{...enqueryForm}
});


