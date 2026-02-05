import TelegramBot from "node-telegram-bot-api";
import { Bot } from "../model/bot.model.js";
import { BotUser } from "../model/botUser.model.js";
import { Op, where } from "sequelize";
await Bot.sync({ force: false });
BotUser.sync({ force: false });
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const full_name = msg.from?.first_name;
    const foundedUser = await BotUser.findOne({ where: { chat_id: chatId } });
    if (msg.text === "/start") {
        if (!foundedUser?.dataValues) {
            await BotUser.create({ full_name, chat_id: chatId });
            bot.sendMessage(chatId, "Iltimos telefon raqamni ulashing", {
                reply_markup: {
                    keyboard: [
                        [{ text: "telefon raqam ulashish", request_contact: true }],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
        }
        else {
            if (foundedUser.dataValues && !foundedUser.dataValues.phone_number) {
                bot.sendMessage(chatId, "Iltimos telefon raqamni ulashing 11", {
                    reply_markup: {
                        keyboard: [
                            [{ text: "telefon raqam ulashish", request_contact: true }],
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                });
            }
            bot.sendMessage(chatId, "Botdan foydalanishigiz mumkin");
        }
    }
    else {
    }
});
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const foundedUser = await BotUser.findOne({ where: { chat_id: chatId } });
    if (msg.contact) {
        if (foundedUser) {
            await BotUser.update({ phone_number: msg.contact?.phone_number }, { where: { chat_id: foundedUser.dataValues.chat_id } });
        }
    }
    if (msg.text && msg.text !== "/start") {
        await Bot.create({ full_name: foundedUser?.dataValues.full_name, phone_number: foundedUser?.dataValues.phone_number,
            chat_id: foundedUser?.dataValues.chat_id, message: msg.text
        });
        bot.sendMessage(chatId, "Murojatingiz yetkazildi");
    }
});
export const getMessageFromToday = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const messages = await Bot.findAll({ where: { createdAt: { [Op.gte]: currentDate } } });
        const mesg = await Bot.findAll();
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const getMessageLastTenDay = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 10);
        const messages = await Bot.findAll({ where: { createdAt: { [Op.gte]: currentDate } } });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const updateMessageDate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { msg } = req.body;
        const messages = await Bot.update({ createdAt: msg }, { where: { id } });
        res.status(200).json({
            message: "Updated det"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
//# sourceMappingURL=bot.ctr.js.map