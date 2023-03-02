import { faker } from '@faker-js/faker';

import { Bill, BillType } from '../bill.model';

export const bills = Array.from({ length: 10 }, () => {
  const type = faker.helpers.arrayElement<BillType>([
    BillType.MONTHLY,
    BillType.YEARLY,
  ]);
  const isYearly = type === BillType.YEARLY;
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
  };
  const year = new Date().getFullYear();
  const dueDate = isYearly
    ? faker.date
        .between(new Date(year, 0, 1), new Date(year + 1, 11, 31))
        .toLocaleString('en-US', dateOptions)
    : faker.datatype.number({ min: 1, max: 31 }).toString();

  return {
    id: faker.datatype.uuid(),
    type,
    name: faker.company.name(),
    amount: Number(faker.finance.amount(0.01, 2999.99, 2)),
    dueDate,
    autoPaid: faker.datatype.boolean(),
    balance: faker.helpers.arrayElement([
      null,
      Number(faker.finance.amount(0.01, 2999.99, 2)),
    ]),
    owner: faker.helpers.arrayElement([null, faker.name.firstName()]),
    website: faker.helpers.arrayElement([null, faker.internet.url()]),
    username: faker.helpers.arrayElement([
      null,
      faker.internet.userName(),
      faker.internet.email(),
    ]),
    password: faker.helpers.arrayElement([null, faker.internet.password()]),
    createdAt: faker.date.past(),
  } as Bill;
});

export default bills;
