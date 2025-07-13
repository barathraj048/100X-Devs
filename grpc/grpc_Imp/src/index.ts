import path from 'path';
import * as grpc from '@grpc/grpc-js';
import  { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js"
import * as protoLoader from '@grpc/proto-loader';
import { get } from 'http';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../a.proto') );

const personProto = grpc.loadPackageDefinition(packageDefinition) as unknown as GrpcObject;
 
const PERSONS:any = [];
let logPersion=async()=> {
   function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

   while(true){
      console.log("Persons: ", PERSONS);
      await sleep(2000);
   }
}

//@ts-ignore
function addPerson(call, callback) {
  console.log(call)
    let person = {
      name: call.request.name,
      age: call.request.age
    }
    logPersion()
    PERSONS.push(person);
    callback(null, person)
}
// @ts-ignore
let getPersonByName =(call,callback)=> {
   let personName = call.request.name;
   let person = PERSONS.find((p:any) => p.name === personName);
   callback(null, person || { name: "Not Found", age: 0 });
}

const server = new grpc.Server();
//registering the service
server.addService((personProto.AddressBookService as ServiceClientConstructor).service, { 
   addPerson: addPerson ,
   GetPersonByName: getPersonByName
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});