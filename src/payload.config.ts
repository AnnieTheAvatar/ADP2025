// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Students } from './collections/Students'
import { Degrees } from './collections/Degrees'
import { Briefs } from './collections/Briefs'
import { Projects } from './collections/Projects'
import { Sponsors } from './collections/Sponsors'
import { Faculty } from './collections/Faculty'
import { Studios } from './collections/Studios'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Students, Degrees, Briefs, Projects, Sponsors, Faculty, Studios],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '222c9977a2902b55671c01ab',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb+srv://annielacoba:ApxPisXdI2RIwJbg@adpgrad2025.psayv.mongodb.net/?retryWrites=true&w=majority&appName=ADPGrad2025' ,
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
})
