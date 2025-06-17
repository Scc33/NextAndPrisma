import { NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI();

export async function GET() {
  try {
    console.log("Making request to OpenAI");
    // const response = await fetch("https://api.openai.com/v1/responses", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4.1",
    //     input: "Hello, how are you?",
    //   }),
    // });
    const response = await client.responses.create({
      model: "gpt-4.1",
      input: "Write a one-sentence bedtime story about a unicorn.",
    });
    console.log(response.output_text);

    return NextResponse.json(response.output_text);
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
