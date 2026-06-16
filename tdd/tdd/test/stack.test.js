class Stack {
  constructor() {
    this.top = -1;
    this.obj = {};
  }

  peek() {
    return this.obj[this.top];
  }

  push(val) {
    this.top += 1;
    this.obj[this.top] = val;
  }

   pop() {
   if (this.top === -1) return undefined;

   const value = this.obj[this.top];
   delete this.obj[this.top];
   this.top--;

   return value;
   }
}

describe("my Stack", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  test("is created empty", () => {
    expect(stack.top).toBe(-1);
    expect(stack.obj).toEqual({});
  });

  test("push to the top", () => {
    stack.push("item");

    expect(stack.top).toBe(0);
    expect(stack.peek()).toBe("item");
  });

   test("can pop off", () => {
   stack.push("item");

   const value = stack.pop();

   expect(value).toBe("item");
   expect(stack.top).toBe(-1);
   expect(stack.obj).toEqual({});
   });
});