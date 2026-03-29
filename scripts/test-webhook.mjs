/**
 * Local webhook test server
 * Run: node scripts/test-webhook.mjs
 * Then trigger from another terminal or LemonSqueezy test button
 */

import http from "node:http";
import crypto from "node:crypto";

const SECRET = "3b348d6084b3f08b829f683a02531f75b9bb3ee6";
const PORT = 3333;

// Simulated customer token (replace with your real one)
const CUSTOMER_TOKEN = process.env.CUSTOMER_GITHUB_TOKEN || "ghp_YOUR_TOKEN_HERE";

const PRODUCT_MAP = {
  "React Bundle":    "@micrographics-js/react @micrographics-js/core",
  "Vue Bundle":      "@micrographics-js/vue @micrographics-js/core",
  "Svelte Bundle":   "@micrographics-js/svelte @micrographics-js/core",
  "Vanilla Bundle":  "@micrographics-js/vanilla @micrographics-js/core",
  "Full Library":    "@micrographics-js/react @micrographics-js/vue @micrographics-js/svelte @micrographics-js/vanilla @micrographics-js/core",
  "Lifetime":        "@micrographics-js/react @micrographics-js/vue @micrographics-js/svelte @micrographics-js/vanilla @micrographics-js/core",
  "Signals Pack":    "@micrographics-js/react @micrographics-js/core",
};

const server = http.createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/api/lemon-webhook") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  // Read body
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks).toString();

  // Verify signature
  const signature = req.headers["x-signature"];
  const expected = crypto.createHmac("sha256", SECRET).update(rawBody).digest("hex");

  console.log("\n━━━ WEBHOOK RECEIVED ━━━");
  console.log("Signature:", signature);
  console.log("Expected: ", expected);
  console.log("Match:", signature === expected ? "✅ VALID" : "❌ INVALID");

  if (signature !== expected) {
    res.writeHead(401);
    res.end("Invalid signature");
    return;
  }

  // Parse
  const payload = JSON.parse(rawBody);
  const event = payload.meta?.event_name;
  const data = payload.data?.attributes || {};
  const name = data.user_name || "Test User";
  const email = data.user_email || "test@example.com";
  const product = data.first_order_item?.product_name || "React Bundle";
  const orderId = payload.data?.id || "TEST-001";
  const packages = PRODUCT_MAP[product] || PRODUCT_MAP["React Bundle"];

  console.log("\n📦 Order Details:");
  console.log("  Event:", event);
  console.log("  Order ID:", orderId);
  console.log("  Customer:", name, `<${email}>`);
  console.log("  Product:", product);
  console.log("  Packages:", packages);

  console.log("\n📧 Email that would be sent:");
  console.log("━".repeat(50));
  console.log(`To: ${email}`);
  console.log(`Subject: Your Micrographics license is ready`);
  console.log(`━`.repeat(50));
  console.log(`Hi ${name},

Thank you for purchasing Micrographics (${product})!

STEP 1 — Create .npmrc in your project root:

  @micrographics-js:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${CUSTOMER_TOKEN}

STEP 2 — Add .npmrc to .gitignore

STEP 3 — Install:

  npm install ${packages}

Order ID: ${orderId}
— Micrographics`);
  console.log("━".repeat(50));

  res.writeHead(200);
  res.end("OK");
});

server.listen(PORT, () => {
  console.log(`\n🔧 Webhook test server running at http://localhost:${PORT}/api/lemon-webhook\n`);
  console.log("Send a test webhook with:\n");

  // Generate test payload and its signature
  const testPayload = JSON.stringify({
    meta: { event_name: "order_created" },
    data: {
      id: "TEST-42",
      attributes: {
        user_name: "Ergin Turk",
        user_email: "test@erginturk.com",
        first_order_item: {
          product_name: "React Bundle",
          variant_name: "React Bundle — All 84 Components"
        }
      }
    }
  });
  const testSig = crypto.createHmac("sha256", SECRET).update(testPayload).digest("hex");

  console.log(`curl -X POST http://localhost:${PORT}/api/lemon-webhook \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -H "X-Signature: ${testSig}" \\`);
  console.log(`  -d '${testPayload}'`);
  console.log("");
});
