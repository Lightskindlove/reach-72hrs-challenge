'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('Alice', {
    // Specify Alice's interact interface here
    ready: Fun([], Null)
  });
  const B = API('Bob', {
    // Specify Bob's interact interface here
  });
  init();
  // The first one to publish deploys the contract
  A.only(() => {
    interact.ready();
  });
  A.publish();
  commit();
  // write your program here
  exit();
});
