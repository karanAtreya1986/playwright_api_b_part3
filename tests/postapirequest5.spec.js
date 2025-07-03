//
const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";
const { DateTime } = require("luxon");
var dynamicPostRequest = require("../test-data/dynamicrequestbody.json");
import { stringFormat } from "../utils/commons";

test("Create Post api request using dynamic JSON file in playwright", async ({
  request,
}) => {

  
  // const dynamicRequestBody=stringFormat(JSON.stringify(dynamicPostRequest), "testers talk cypress", "testers talk js", "banana")
  
  // // create test data
  // const firstName = faker.person.firstName();
  // const lastName = faker.person.lastName();
  // const totalPrice = faker.number.int(1000);
  // const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  // const checkOutDate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");

  //call the util function first.
  var updatedRequestBody = stringFormat(
    JSON.stringify(dynamicPostRequest),
    "testers talk cypress",
    "testers talk javascript",
    "apple"
  );

  // create post api request using playwright
  const postAPIResponse = await request.post("/booking", {
    //convert the string received to json object.
    //use json.parse and pass the string.
    data: JSON.parse(updatedRequestBody),
  });

  // validate status code
  console.log(await postAPIResponse.json());

  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);

  // validate api response json obj
  const postAPIResponseBody = await postAPIResponse.json();

  expect(postAPIResponseBody.booking).toHaveProperty("firstname", "testers talk cypress");
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", "testers talk javascript");

   // validate api response nested json obj
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
      "checkin",
      "2018-01-01"
    );
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
      "checkout",
      "2019-01-01"
    );
});