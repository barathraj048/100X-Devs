"use strict";
const sumOfAge = (user1, user2) => {
    return user1.age + user2.age;
};
const u1 = {
    name: 'barath',
    age: 19
};
const u2 = {
    name: 'barath',
    age: 19
};
console.log(sumOfAge(u1, u2));
