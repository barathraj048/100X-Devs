import express from "express"
import swaggerUi  from "swagger-ui-express"
import {openApiSpec} from "./openapispec"

const app = express()
const port = 3000

let users= [
   {id:1,name:"barath",age:19},
   {id:2,name:"karthik",age:20},
]

app.get('/user',(req,res)=> {
    let query =req.query.name as string

    let filteredUsers = query ? users.filter((u) => u.name === query) : users;
    res.json(filteredUsers)
})

app.use("/documentation",swaggerUi.serve,swaggerUi.setup(openApiSpec))

app.listen(port,()=> {
      console.log(`Server is running at http://localhost:${port}`)
})