"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// const client= new Client({
//    connectionString:'postgresql://test_owner:MI5F4dxsnGVi@ep-gentle-fog-a1muynp0.ap-southeast-1.aws.neon.tech/test?sslmode=require'
//    connectionString:'postgresql://username:password@127.0.0.1:5432/100x-Pract'   (localhost URI)
// })
// for localhost
const client = new pg_1.Client({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
});
const create_tbl = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        yield client.query(`
         CREATE TABLE IF NOT EXISTS Users (
            Id SERIAL PRIMARY KEY,
            Username VARCHAR(20) UNIQUE NOT NULL,
            Email VARCHAR(80) UNIQUE NOT NULL,
            Password VARCHAR(80) NOT NULL,
            Time_created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
         );
      `);
        yield client.query(`
            CREATE TABLE IF NOT EXISTS Address (
            Id SERIAL PRIMARY KEY,
            UserId INT NOT NULL,
            city VARCHAR(80) UNIQUE NOT NULL,
            town VARCHAR(80),
            Time_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE);
         `);
        console.log("Table created successfully");
    }
    catch (error) {
        console.error("Error creating table:", error);
    }
    finally {
        client.end();
    }
});
// this method of insertion is not recomended due to its lead ti sql injuction
const insert_data = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        yield client.query(`INSERT INTO Users (Username, Email, Password) 
      VALUES ('barathraj', 'kuyt@gmail.com', 'kvgjhf58777');
            `);
        console.log(`sucesfully inseryed data`);
    }
    catch (err) {
        console.log(`error on insertion:${err}`);
    }
    finally {
        client.end();
    }
});
//always use this to avoid sqlinjection
const Safe_insert_data = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        yield client.query(`
      INSERT INTO Users (Username, Email, Password) 
      VALUES ($1,$2,$3)`, ['barathraj677', 'kuyt@gmkgail.com', 'kvgjhf58777']);
        console.log(`sucesfully inseryed data`);
    }
    catch (err) {
        console.log(`error on insertion:${err}`);
    }
    finally {
        client.end();
    }
});
//   Safe_insert_data();
create_tbl();
const Safe_Trantition_data = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        client.query('BEGIN');
        yield client.query(`
      INSERT INTO Users (UserId, city) 
      VALUES ($1,$2,$3)`, ['1', 'pollachi']);
        yield client.query(`
      INSERT INTO Address()
      `);
        client.query('COMMIT');
        console.log(`sucesfully transferd data`);
    }
    catch (err) {
        console.log(`error on transfer:${err}`);
    }
    finally {
        client.end();
    }
});
//   Safe_Trantition_data()
//joins
app.listen(3000, () => {
    console.log(`server is running on port 3000`);
});
