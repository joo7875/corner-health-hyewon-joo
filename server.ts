require("dotenv").config({ path: ".env.local" });
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const {
  HEALTHIE_API_URL,
  HEALTHIE_API_KEY,
  INSURANCE_ELIGIBILITY_API,
  PORT = 4000,
} = process.env;
if (!HEALTHIE_API_URL || !HEALTHIE_API_KEY || !INSURANCE_ELIGIBILITY_API) {
  console.error("Missing request endpoints");
  process.exit(1);
}

// ——————————————
// 1) GraphQL proxy
// ——————————————
app.post("/api/graphql", async (req, res) => {
  try {
    const { query, variables } = req.body;
    const response = await axios.post(
      HEALTHIE_API_URL,
      { query, variables },
      {
        headers: {
          Authorization: `Basic ${HEALTHIE_API_KEY}`,
          AuthorizationSource: "API",
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("GraphQL proxy error:", err.message);
    res.status(500).json({ error: "Proxy failed" });
  }
});

// ——————————————
// 2) Eligibility proxy
// ——————————————
app.post("/api/eligibility", async (req, res) => {
  const { payer_id, member_id, date_of_birth } = req.body;
  try {
    const response = await axios.post(
      INSURANCE_ELIGIBILITY_API,
      { payer_id, member_id, date_of_birth },
      { headers: { "Content-Type": "application/json" } }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Eligibility proxy error:", err.message);
    res.status(500).json({ error: "Eligibility check failed" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
);
