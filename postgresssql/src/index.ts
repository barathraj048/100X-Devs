import { Client } from "pg";
import  express  from "express";

const app=express()

// const client= new Client({
//    connectionString:'postgresql://test_owner:MI5F4dxsnGVi@ep-gentle-fog-a1muynp0.ap-southeast-1.aws.neon.tech/test?sslmode=require'
//    connectionString:'postgresql://username:password@127.0.0.1:5432/100x-Pract'   (localhost URI)
// })

// for localhost

const client = new Client({
   user: 'postgres',
  password: '123456',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
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
      await client.query(`
            CREATE TABLE IF NOT EXISTS Address (
            Id SERIAL PRIMARY KEY,
            UserId INT NOT NULL,
            city VARCHAR(80) UNIQUE NOT NULL,
            town VARCHAR(80),
            Time_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE);
         `)
      console.log("Table created successfully");
   } catch (error) {
      console.error("Error creating table:", error);
   } finally {
      client.end();
   }
};

// this method of insertion is not recomended due to its lead ti sql injuction
      const insert_data=async ()=> {
      try{
         await client.connect()
         await client.query(`INSERT INTO Users (Username, Email, Password) 
      VALUES ('barathraj', 'kuyt@gmail.com', 'kvgjhf58777');
            `)
            console.log(`sucesfully inseryed data`)
      }catch(err){
         console.log(`error on insertion:${err}`)
      }finally{
         client.end()
      }
      }

//always use this to avoid sqlinjection
const Safe_insert_data=async ()=> {
   try{
     await client.connect()
     await client.query(`
      INSERT INTO Users (Username, Email, Password) 
      VALUES ($1,$2,$3)`,['barathraj677', 'kuyt@gmkgail.com', 'kvgjhf58777']
   )
        console.log(`sucesfully inseryed data`)
   }catch(err){
     console.log(`error on insertion:${err}`)
   }finally{
     client.end()
   }
  }
//   Safe_insert_data();

  create_tbl()
  const Safe_Trantition_data=async ()=> {
   try{
     await client.connect()
     client.query('BEGIN')
     await client.query(`
      INSERT INTO Users (UserId, city) 
      VALUES ($1,$2,$3)`,['1', 'pollachi']
   )
   await client.query( `
      INSERT INTO Address()
      `)
   client.query('COMMIT')
        console.log(`sucesfully transferd data`)
   }catch(err){
     console.log(`error on transfer:${err}`)
   }finally{
     client.end()
   }
  }
//   Safe_Trantition_data()

//joins

const ReturnJoinedQuery=async ()=> {
   try{
      await client.connect()
      const joinData=await client.query(`
         SELECT User.id, User.Name ,Address.city ,Address.Pincode
         FROM User
         JOIN Address ON User.id=Address.User_id
         WHERE User.id='5'
         `)
      console.log('join table saved sucesfully')
   }catch(err){
      console.log(`error at fetching join:${err}`)
   }finally{
      client.end()
   }
}

app.listen(3000,()=> {
   console.log(`server is running on port 3000`)
})