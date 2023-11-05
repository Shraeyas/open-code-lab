import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@code-ide/db";
import { executionSchema } from "@code-ide/types";
import { sendMessage } from "@code-ide/rabbitmq-utils";
const prismaClient = new PrismaClient();
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  let userId;
  if (session?.user) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: session.user.email || undefined,
      },
    });
    userId = user?.id;
  }
  const executionData = executionSchema.safeParse(await req.json());
  if (!executionData.success) {
    let errors = executionData.error.issues.map((issue) => {
      return issue.message;
    });
    return NextResponse.json(
      { success: false, message: "Invalid Values", errors },
      { status: 400 },
    );
  }
  const { src, input, lang } = executionData.data;
  const language = await prismaClient.language.findUnique({
    where: {
      name: lang,
    },
  });
  if (!language) {
    return NextResponse.json(
      { success: false, message: "Invalid Language Code" },
      { status: 400 },
    );
  }
  const execution = await prismaClient.execution.create({
    data: {
      src: src,
      input: input,
      lang_id: language.id,
      user_id: userId,
    },
  });
  if (execution) {
    await sendMessage({ src, input, lang, executionId: execution.id });
    return NextResponse.json({
      success: "true",
      message: "Queued for execution!",
      data: {
        url: `http://${req.headers.get("host")}/api/code/status/${
          execution.id
        }`,
        executionId: execution.id,
      },
    });
  } else {
    return NextResponse.json({
      success: "false",
      message: "There was an error!",
    });
  }
}
