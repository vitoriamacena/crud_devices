import request from "supertest";
import app from "../src/app";

describe("App", () => {
  it("should respond with 200 OK for GET /devices", async () => {
    const response = await request(app).get("/devices");
    expect(response.status).toBe(200);
  });
});
