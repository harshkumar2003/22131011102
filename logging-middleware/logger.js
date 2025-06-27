// logging-middleware/logger.js
const axios = require("axios");

// ✅ Replace with your NEW token from the auth-service
const token = "EAANJAfZBnu2YBO4hP2jwIDsWQuTKtWO2i4tLpYEFXXTe3tJeLAqhXDgq4luHdM38MyMpbDgoAFUZBBwC2z3Evmvu07rhLBfxianzH4zLLEDLeS4dp0f0d01ZBAOmochZABKkYZB8AT1KTJPY2xZAWFseP0pAf5OA7QqNQ44EoSCyEYyYow22sEzSCiX6JgsSYOr8c8HHKsZAg4EiTnoH2aj67R3oDAWs9zZCqZC8G";

async function Log(stack, level, pkg, message) {
  try {
    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Log sent");
  } catch (error) {
    console.error("❌ Logging failed:", error.response?.data || error.message);
  }
}

module.exports = Log;
