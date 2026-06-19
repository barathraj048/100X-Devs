// If you replace a Parent class with its Child class, the program should still work perfectly without breaking.
class Bird {
  fly() { console.log("I am flying!"); }
}

class Eagle extends Bird {} // Works fine

class Penguin extends Bird {
  fly() { 
    throw new Error("I can't fly!"); // Breaks Liskov!
  }
}

// fix
class FlyingBird{
   fly(){
      // Precess
   }
}
class SwimmingBird{
   swim(){
      //Process
   }
}