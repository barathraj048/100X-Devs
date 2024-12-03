import { Hono } from 'hono';

const app = new Hono();

// Middleware to check authentication token
const AuthMiddleware = async (c:any, next:any) => {
  const token = c.req.header('Authenticator');
  
  if (token === 'approve') {
    await next();
  } else {
    return c.json({ message: 'Failed to authenticate you' }, 401);
  }
};

app.get('/', AuthMiddleware, async (c) => {
  console.log('Query Param:', c.req.query('prams')); 
  console.log('Authenticator Header:', c.req.header('Authenticator'));
  
  return c.text('Hello Hono!');
});

export default app;
