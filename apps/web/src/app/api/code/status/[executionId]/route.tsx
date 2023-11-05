import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prismaClient = new PrismaClient();
export async function GET(req: NextRequest, { params }: any) {
  const { executionId } = params;
  const executionStatus = await prismaClient.executionResult.findUnique({
    where: {
      execution_id: parseInt(executionId),
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
