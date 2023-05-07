import request from "supertest";
import app from "../src/app";

describe("App", () => {
  it("should respond with a welcome message at the root path", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "welcome" });
  });

  it("should handle non-existent routes with a 404 status", async () => {
    const response = await request(app).get("/non-existent-route");

    expect(response.status).toBe(404);
  });

  it("should handle errors and respond with a 500 status and error message", async () => {
    const errorMessage = "Test error";

    const appWithError = app;
    appWithError.get("/error", (req, res, next) => {
      next(new Error(errorMessage));
    });

    const response = await request(appWithError).get("/error");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
  });
});
