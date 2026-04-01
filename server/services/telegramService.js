import { Telegraf, Markup } from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const reasoningByEmailId = new Map();

function formatReasoning(reasoning) {
  if (!reasoning) {
    return "No reasoning was generated for this alert.";
  }

  if (typeof reasoning === "string") {
    return reasoning;
  }

  const explanation = reasoning.explanation || "No explanation provided.";
  const indicators = Array.isArray(reasoning.indicators)
    ? reasoning.indicators
    : [];
  const recommendedSteps = Array.isArray(reasoning.recommended_steps)
    ? reasoning.recommended_steps
    : [];

  const lines = [explanation];

  if (indicators.length > 0) {
    lines.push("", "Indicators:");
    for (const indicator of indicators) {
      lines.push(`- ${indicator}`);
    }
  }

  if (recommendedSteps.length > 0) {
    lines.push("", "Recommended steps:");
    for (const step of recommendedSteps) {
      lines.push(`- ${step}`);
    }
  }

  if (reasoning.note) {
    lines.push("", `Note: ${reasoning.note}`);
  }

  if (reasoning.raw) {
    lines.push("", "Raw output:", reasoning.raw);
  }

  return lines.join("\n");
}

// Start bot
bot.start((ctx) => {
  ctx.reply("CyberGuard Bot Activated!\nYou'll receive phishing alerts here.");
});

// 🧠 HANDLE BUTTON ACTIONS

// Mark as safe
bot.action(/SAFE_(.+)/, async (ctx) => {
  const emailId = ctx.match[1];

  await ctx.reply(` Marked email ${emailId} as safe.`);
});

// Block sender
bot.action(/BLOCK_(.+)/, async (ctx) => {
  const emailId = ctx.match[1];

  await ctx.reply(
    ` Sender blocked for email ${emailId}. (Implement Gmail block later)`,
  );
});

// Show reasoning
bot.action(/WHY_(.+)/, async (ctx) => {
  const emailId = ctx.match[1];
  const reasoning = reasoningByEmailId.get(emailId);

  await ctx.reply(
    `Reason for email ${emailId}:\n\n${formatReasoning(reasoning)}`,
  );
});

// Launch bot
export function launchBot() {
  bot.launch();
  console.log(" Telegram bot running...");
}

// 🔥 NEW FUNCTION (REPLACES YOUR OLD ONE)
export async function sendTelegramAlert(emailData, prediction, reasoning) {
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!chatId) {
    console.error("Missing TELEGRAM_CHAT_ID");
    return;
  }

  reasoningByEmailId.set(emailData.id, reasoning);

  await bot.telegram.sendMessage(
    chatId,
    `🚨 *Phishing Email Detected!*

📧 *From:* ${emailData.from}
📝 *Subject:* ${emailData.subject}
⚠️ *Confidence:* ${(prediction.confidence * 100).toFixed(2)}%`,
    {
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback("✅ Safe", `SAFE_${emailData.id}`),
          Markup.button.callback("🚫 Block", `BLOCK_${emailData.id}`),
        ],
        [Markup.button.callback("📖 Why?", `WHY_${emailData.id}`)],
      ]),
    },
  );
}
