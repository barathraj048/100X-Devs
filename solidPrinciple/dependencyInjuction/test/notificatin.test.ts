import notification as NotificationService from "./index.ts"

describe("NotificationService", () => {
  test("calls the SMS client with the correct parameters", () => {
    const mockTwilioClient = {
      sendMessage: jest.fn() // Jest's built-in fake function
    } as unknown as TwilioAPI;

    const service = new NotificationService(mockTwilioClient);

    service.sendSMS("555-0199", "Your appointment is confirmed.");

    expect(mockTwilioClient.sendMessage).toHaveBeenCalledWith("555-0199", "Your appointment is confirmed.");
  });
});