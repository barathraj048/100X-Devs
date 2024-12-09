import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

export default {
	async fetch(request: Request, env: any, ctx: any) {
	  const pool = new Pool({ connectionString: env.DATABASE_URL })
	  const adapter = new PrismaPg(pool)
	  const prisma = new PrismaClient({ adapter })
 
	  await prisma.user.create({
		 data: {
			email: 'test.user@example.com',
			name: 'Test User',
		 },
	  })
 
	  const users = await prisma.user.findMany()
	  const result = JSON.stringify(users)
	  return new Response(result)
	},
 }
 