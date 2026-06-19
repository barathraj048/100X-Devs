// one class must have single responsibility or multiple similar responsibility.
//                               (or) 
// A class should have one, and only one, reason to change. It should do exactly one job.

// dont follow single responsibility
// class User {
//   saveToDatabase(data: any) { /* SQL logic */ }
//   generateAuthToken() { /* JWT logic */ }
//   sendWelcomeEmail() { /* SMTP logic */ }
// }


class SaveUser{
   saveDb(data:any){
      // logic hear
   }
}
class AuthTocken{
   Generate(refreshToken:any){

   }
}