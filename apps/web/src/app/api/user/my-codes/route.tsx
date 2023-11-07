import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { encode } from "encode-decode-utils";
const prismaClient = new PrismaClient();
export async function POST(req: NextRequest, { params }: any) {
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
  if (!userId) {
    return NextResponse.json(
      { success: "false", message: "Not Logged In!" },
      { status: 401 },
    );
  }
  const executionData = await prismaClient.execution.findMany({
    where: {
      user_id: userId,
    },
    include: {
      ExecutionResult: true,
    },
    orderBy: {
      createdAt: Prisma.SortOrder.desc,
    },
  });
  const supportedLanguages = await prismaClient.language.findMany();
  const languageMap = new Map();
  supportedLanguages.forEach((language) => {
    languageMap.set(language.id, language.name);
  });
  const execution = executionData.map((data) => {
    return {
      id: encode(data.id),
      input: data.input,
      lang: languageMap.get(data.lang_id),
      status: data.ExecutionResult[0].status,
      verdict: data.ExecutionResult[0].verdict,
      createdAt: data.ExecutionResult[0].createdAt,
    };
  });
  if (execution) {
    return NextResponse.json({ success: "true", data: execution });
  } else {
    return NextResponse.json({
      success: "false",
      message: "There was an error!",
    });
  }
}
