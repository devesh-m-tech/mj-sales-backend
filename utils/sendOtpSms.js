import axios from "axios";

export const sendOtpSms = async (phone, otp) => {
  try {
    // ✅ Ensure India format
    const formattedPhone = phone.startsWith("91")
      ? phone
      : `91${phone}`;

    // ✅ Message MUST exactly match DLT template
    const message = `Hi, Welcome to Sales App Your login OTP is ${otp} - TARK INNOVATIONS`;

    // ✅ Draft4SMS API endpoint
    const url = "https://text.draft4sms.com/vb/apikey.php";

    // ✅ API params (NO encoding)
    const params = {
      apikey: process.env.DRAFT4SMS_API_KEY,        // 🔑 API Key
      senderid: "TARKIN",                           // 🔤 6-char Header
      number: formattedPhone,                      // 📱 91XXXXXXXXXX
      message: message,                            // 📝 Plain text
      templateid: process.env.DRAFT4SMS_TEMPLATE_ID, // 🧾 DLT Template ID
      format: "json",
    };

    const response = await axios.get(url, { params });

    console.log("📩 SMS API RESPONSE:", response.data);

    // ❌ Failure handling
    if (
      response.data?.status !== "Success" &&
      response.data?.code !== "011"
    ) {
      throw new Error(
        response.data?.description || "SMS sending failed"
      );
    }

    return response.data;
  } catch (error) {
    console.error(
      "❌ SMS ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
};
