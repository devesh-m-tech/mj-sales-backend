import axios from "axios";

export const sendSms = async (phone, message) => {
  const url = "https://www.draft4sms.com/api/send-sms";

  const payload = {
    apiKey: process.env.DRAFT_SMS_API_KEY,
    senderId: process.env.DRAFT_SMS_SENDER_ID,
    message,
    mobileNumbers: phone,
    templateId: process.env.DRAFT_SMS_TEMPLATE_ID,
  };

  await axios.post(url, payload);
};
