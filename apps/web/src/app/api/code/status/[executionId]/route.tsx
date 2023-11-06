import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "encode-decode-utils";
const prismaClient = new PrismaClient();
export async function GET(req: NextRequest, { params }: any) {
  const { executionId } = params;
  const executionIdDecoded = decode(executionId)?.toString();
  if(!executionIdDecoded) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid Execution ID",
      },
      {
        status: 400,
      },
    );
  }
  const executionStatus = await prismaClient.executionResult.findUnique({
    where: {
      execution_id: parseInt(executionIdDecoded),
    },
  });
  if (executionStatus) {
    return NextResponse.json({
      success: true,
      data: {
        status: executionStatus.status,
        verdict: executionStatus.verdict,
        output: executionStatus.output,
      },
    });
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid Execution ID",
      },
      {
        status: 400,
      },
    );
  }
}
