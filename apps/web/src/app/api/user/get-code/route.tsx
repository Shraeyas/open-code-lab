import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { encode, decode } from "encode-decode-utils";
const prismaClient = new PrismaClient();
export async function POST(req: NextRequest, { params }: any) {
  const body = await req.json();
  if (!body.id) {
    return NextResponse.json(
      { success: "false", message: "There was an error!" },
      { status: 400 },
    );
  }
  let decodedId = decode(body.id);
  let executionData;
  if (decodedId) {
    executionData = await prismaClient.execution.findUnique({
      where: {
        id: decodedId,
      },
      include: {
        ExecutionResult: true,
      },
    });
  }
  if (!executionData) {
    return NextResponse.json(
      { success: "false", message: "There was an error!" },
      { status: 400 },
    );
  }
  const supportedLanguages = await prismaClient.language.findMany();
  const languageMap = new Map();
  supportedLanguages.forEach((language) => {
    languageMap.set(language.id, language.name);
  });
  const execution = {
    id: encode(executionData.id),
    input: executionData.input,
    lang: languageMap.get(executionData.lang_id),
    src: executionData.src,
    status: executionData.ExecutionResult[0].status,
    verdict: executionData.ExecutionResult[0].verdict,
    output: executionData.ExecutionResult[0].output,
  };
  if (execution) {
    return NextResponse.json({ success: "true", data: execution });
  } else {
    return NextResponse.json({
      success: "false",
      message: "There was an error!",
    });
  }
}
