// Don't force a class to implement an interface it doesn't need. Keep your interfaces small and specific.
interface IWorker {
  work(): void;
  eat(): void;
}

class HumanWorker implements IWorker {
  work() { console.log("Working..."); }
  eat() { console.log("Eating lunch..."); }
}

class RobotWorker implements IWorker {
  work() { console.log("Working..."); }
  eat() { 
    throw new Error("Robots don't eat!"); // Violates ISP!
  }
}

// fix 
interface IWorkable { work(): void; }
interface IFeedable { eat(): void; }

