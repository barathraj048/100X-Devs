import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { authhandiler: string[] } }) => {
  console.log(params.authhandiler);

  return NextResponse.json({
    message: "hii",
  });
};
