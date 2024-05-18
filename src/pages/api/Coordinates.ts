import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI();

export default async function handler(req: any, res: any) {
  try {
    //Create a new chat completion request to GPT-4.
    const gpt4Completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        //Define the role of the system message and its content.
        {
          role: "system",
          content:
            "You only return in JSON a coordinates key with a value in this format [43.6426, -79.3871], then a title of the location with a title key",
        },
        //7. Capture user's request from req.body.
        { role: "user", content: req.body.value },
      ],
    });
    //Extract content from the chat completion response.
    const responseText = gpt4Completion.choices[0]?.message?.content;
    //Check if the content is valid JSON.
    if (responseText && responseText[0] === "{") {
      //Parse the content to JSON.
      const json = JSON.parse(responseText);
      //Respond with a 200 status and parsed JSON.
      res.status(200).json(json);
      //Log the JSON to console.
      console.log(json);
    } else {
      //Respond with a 200 status and a tryAgain flag if the content is not valid JSON.
      res.status(200).json({ tryAgain: true });
    }
  } catch (error) {
    //Handle any errors by responding with a 500 status and the error.
    res.status(500).json({ error });
  }
}
