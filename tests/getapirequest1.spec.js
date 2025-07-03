//
const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";
const { DateTime } = require("luxon");
var dynamicPostRequest = require("../test-data/dynamicrequestbody.json");
import { stringFormat } from "../utils/commons";

//first create data then get data.

test("Create GET api request in playwright", async ({
  request,
}) => {

  
  // const dynamicRequestBody=stringFormat(JSON.stringify(dynamicPostRequest), "testers talk cypress", "testers talk js", "banana")


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

  const bid=postAPIResponseBody.bookingid;

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

    console.log("=========post response==========")

    //get api call
    const getAPIResponse = await request.get(`/booking/${bid}`)

    console.log(await getAPIResponse.json())

    await expect(getAPIResponse.ok()).toBeTruthy();
    await expect(getAPIResponse.status()).toBe(200);

});