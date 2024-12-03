import { Client } from "pg";
import  express  from "express";

const app=express()

// const client= new Client({
//    connectionString:'postgresql://test_owner:MI5F4dxsnGVi@ep-gentle-fog-a1muynp0.ap-southeast-1.aws.neon.tech/test?sslmode=require'
//    connectionString:'postgresql://username:password@127.0.0.1:5432/100x-Pract'   (localhost URI)
// })

// for localhost

const client = new Client({
   user: 'PostgreSQL',         // PostgreSQL username
   host: 'localhost',             // Hostname (usually 'localhost' if running locally)
   database: '100x-Pract',     // Database name
   password: '123456',     // PostgreSQL password
   port: 5432,
});


const create_tbl = async () => {
   try {
      await client.connect();
      await client.query(`
         CREATE TABLE IF NOT EXISTS Users (
            Id SERIAL PRIMARY KEY,
            Username VARCHAR(20) UNIQUE NOT NULL,
            Email VARCHAR(80) UNIQUE NOT NULL,
            Password VARCHAR(80) NOT NULL,
            Time_created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
         );
      `);
      console.log("Table created successfully");
   } catch (error) {
      console.error("Error creating table:", error);
   } finally {
      client.end();
   }
};

create_tbl();


app.listen(3000,()=> {
   console.log(`server is running on port 3000`)
})