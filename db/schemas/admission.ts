import { pgTable, serial, varchar, date, text, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Student registration schema
export const admission = pgTable('admission', {
  id: serial('id').primaryKey(),
  
  class: varchar('class', { length: 50 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }),
  gender: varchar('gender', { length: 20 }).notNull(),
  mobileNumber: varchar('mobile_number', { length: 20 }),
  email: varchar('email', { length: 100 }).notNull(),
  studentPhotoUrl: text('student_photo_url'),
  dateOfBirth: date('date_of_birth',{mode:'string'}).notNull(),
  
  fatherName: varchar('father_name', { length: 100 }),
  motherName: varchar('mother_name', { length: 100 }),
  
  guardianType: varchar('guardian_type', { length: 20 }).notNull(),
  guardianName: varchar('guardian_name', { length: 100 }).notNull(),
  guardianRelation: varchar('guardian_relation', { length: 50 }).notNull(),
  guardianEmail: varchar('guardian_email', { length: 100 }),
  guardianPhotoUrl: text('guardian_photo_url'),
  guardianPhone: varchar('guardian_phone', { length: 20 }),
  guardianOccupation: varchar('guardian_occupation', { length: 100 }),
  guardianAddress: text('guardian_address'),
  
  isGuardianAddressCurrent: boolean('is_guardian_address_current').default(false),
  currentAddress: text('current_address'),
  isPermanentAddressCurrent: boolean('is_permanent_address_current').default(false),
  permanentAddress: text('permanent_address'),
  
  nationalIdNumber: varchar('national_id_number', { length: 50 }),
  localIdNumber: varchar('local_id_number', { length: 50 }),
  previousSchoolDetails: text('previous_school_details'),
  
  documentsUrl: text('documents_url'),
  
  createdAt: date('created_at').defaultNow(),
  updatedAt: date('updated_at').defaultNow(),
});


export const insertAdmissionSchema = createInsertSchema(admission);
export const selectAdmissionSchema = createSelectSchema(admission);



