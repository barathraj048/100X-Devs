import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.query('prams'))
  console.log(c.req.header('Authenticator'))
  return c.text('Hello Hono!')
})

export default app