require('dotenv').config();
const axios = require('axios');

const testOpenAIKey = async () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("❌ OPENAI_API_KEY not found in your .env file");
    process.exit(1);
  }

  try {
    const response = await axios.get('https://api.openai.com/v1/models', {
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
      },
    });
    console.log("✅ OpenAI API Key is working! Models fetched:", response.data.data.map(m => m.id));
  } catch (error) {
    console.error("❌ OpenAI API Key failed:", error.response?.data?.error || error.message);
  }
};

testOpenAIKey();
