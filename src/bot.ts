import { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard, HearsContext, CommandContext, Context } from "grammy";
import { load } from 'ts-dotenv';
import { MyContext, QuestionObj, QuestionOptions } from './types';
import { getRandomQuestion, getCorrectAnswer } from './utils';

const env = load({
  BOT_API_KEY: String
});

const bot = new Bot<MyContext>(env.BOT_API_KEY);

bot.command("start", async (ctx:CommandContext<Context>) => {
  const startKeyboard = new Keyboard()
    .text('HTML')
    .text('CSS')
    .row()
    .text('JavaScript')
    .text('React')
    .row()
    .text('Случайный вопрос')
    .resized();
  await ctx.reply(
    'Привет! Я - Frontend Interview Prep Bot 🤖 \nЯ помогу тебе подготовиться к собеседованию по Frontend',
  );
  await ctx.reply('С чего начнем? Выбери тему вопроса в меню 👇', {
    reply_markup: startKeyboard,
  });
});

bot.hears(['HTML', 'CSS', 'JavaScript', 'React', 'Случайный вопрос'], async (ctx:HearsContext<MyContext>) => {
  const topic = ctx.message?.text?.toLowerCase();
  const question: QuestionObj = getRandomQuestion(<string>topic).question;
  const questionTopic = getRandomQuestion(<string>topic).questionTopic;

  let inlineKeyboard;

  if (question.hasOptions) {
    const buttonOptions = question.options?.map((option: QuestionOptions) => [
      InlineKeyboard.text(
        option.text,
        JSON.stringify({
          type: `${questionTopic}-option`,
          isCorrect: option.isCorrect,
          questionId: question.id,
        }),
      ),
      ]);
    // @ts-ignore
    inlineKeyboard = InlineKeyboard.from(buttonOptions);
  } else {
    inlineKeyboard = new InlineKeyboard().text(
      'Узнать ответ',
      JSON.stringify({
        type: questionTopic,
        questionId: question.id,
      })
    );
  }

  await ctx.reply(question.text, {
    reply_markup: inlineKeyboard,
  });
});

bot.on('callback_query:data', async (ctx) => {
  const callbackData = JSON.parse(ctx.callbackQuery.data);

  if (!callbackData.type.includes('option')) {
    const answer = getCorrectAnswer(callbackData.type, callbackData.questionId);
    if (answer != null) {
      await ctx.reply(answer, {
        parse_mode: 'HTML',
      });
    }
    await ctx.answerCallbackQuery();
    return;
  }

  if (callbackData.isCorrect) {
    await ctx.reply('Верно ✅');
    await ctx.answerCallbackQuery();
    return;
  }

  const answer = getCorrectAnswer(callbackData.type.split('-')[0], callbackData.questionId);
  await ctx.reply(`Не верно ❌ Правильный ответ: ${answer}`);
  await ctx.answerCallbackQuery();
})

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();