import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const accAlice =
  await stdlib.newTestAccount(startingBalance);
console.log('Hello, Alice and Bob!');

console.log('Launching...');
const ctcAlice = accAlice.contract(backend);

const users = [];
let counter = 1;

const startBobs = async () => {
  const newBob = async(who) => {
    console.log(`Creating new user Bob${counter}`);
    counter ++;
  const acc = await stdlib.newTestAccount(startingBalance);
  const ctc = acc.contract(backend, ctcAlice.getInfo());
  users.push(acc.getAddress());
};

await newBob('Bob1');
await newBob('Bob2');
await newBob('Bob3');

console.log(users);

};




console.log('Starting backends...');
await Promise.all([
  backend.Alice(ctcAlice, {
    ready: () => {
      console.log('Alice is ready');
      startBobs();
    }
    

    // implement Alice's interact object here
  }),
]);

console.log('Goodbye, Alice and Bob!');
