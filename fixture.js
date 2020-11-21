import { database } from "faker";

import faker from "faker";
const coffeeShops = (() => {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      image_url: faker.image.imageUrl,
      name: faker.company.companyName,
    });
  }
  return data;
})();
export default coffeeShops;
