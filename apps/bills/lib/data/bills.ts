import { Bill } from '../bill.store';

const uuid = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

const randomNumber = function (max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomCurrency = function (max: number, min = 0.01) {
  return Math.random() * (max - min + 1) + min;
};

// const randomDate = (date1: Date, date2: Date) => {
//   function randomValueBetween(min, max) {
//     return Math.random() * (max - min) + min;
//   }
//   date1 = date1 || new Date('01-01-1970');
//   date2 = date2 || new Date();
//   const date1Date = date1.getTime();
//   const date2Date = date2.getTime();
//   if (date1 > date2) {
//     return new Date(randomValueBetween(date2Date, date1Date));
//   } else {
//     return new Date(randomValueBetween(date1Date, date2Date));
//   }
// };

export const bills = Array.from({ length: 10 }, (_, i) => {
  // const type = [BillType.MONTHLY, BillType.YEARLY][randomNumber(1)];
  // const isYearly = type === BillType.YEARLY;
  // const dateOptions: Intl.DateTimeFormatOptions = {
  //   day: 'numeric',
  //   month: 'numeric',
  // };
  // const year = new Date().getFullYear();
  // const dueDate = isYearly
  //   ? randomDate(
  //       new Date(year, 0, 1),
  //       new Date(year + 1, 11, 31)
  //     ).toLocaleString('en-US', dateOptions)
  //   : randomNumber(31, 1).toString();
  const dueDate = randomNumber(31, 1).toString();

  return {
    id: uuid(),
    // type,
    name: `Test Bill ${i + 1}`,
    amount: randomCurrency(2999.99),
    dueDate,
    autoPaid: [true, false][randomNumber(1)],
    balance: [null, randomCurrency(2999.99)][randomNumber(1)],
    // owner: [null, `Owner ${i + 1}`][randomNumber(1)],
    // website: [null, `https://test-bill-${i + 1}.example.com`][randomNumber(1)],
    // username: [
    //   null,
    //   `Username ${i + 1}`,
    //   `username@test-bill-${i + 1}.example.com`,
    // ][randomNumber(2)],
    // password: [null, `Password${i + 1}`][randomNumber(1)],
    // createdAt: new Date(),
  } as Bill;
});

export default bills;
