import type { NextApiRequest, NextApiResponse } from "next";

interface RecaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { recaptchaValue } = req.body;

    if (!recaptchaValue) {
      return res
        .status(400)
        .json({ success: false, error: "reCAPTCHA value is missing" });
    }

    const secretKey = "6LeyWSMUAAAAAH6F2DozJL5PF8B7_2F25GvOCDOn";

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${secretKey}&response=${recaptchaValue}`,
        }
      );

      const data: RecaptchaResponse = await response.json();

      if (data.success) {
        return res.status(200).json({ success: true });
      } else {
        return res
          .status(400)
          .json({ success: false, error: data["error-codes"] });
      }
    } catch (error) {
      console.error("Error validating reCAPTCHA:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
