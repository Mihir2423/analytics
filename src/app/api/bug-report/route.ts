import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 403 },
      );
    }

    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required", success: false },
        { status: 400 },
      );
    }

    const bugReport = await prisma.bugReport.create({
      data: {
        title,
        description,
        ownerId: session.user.id,
      },
    });
    revalidatePath("/settings");

    return NextResponse.json(
      { bugReport, message: "Bug report created successfully", success: true },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating bug report:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false, error },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 403 },
      );
    }

    const bugReports = await prisma.bugReport.findMany({
      where: {
        ownerId: session.user.id,
        status: {
          not: "inReview",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        bugReports,
        message: "Bug reports fetched successfully",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching bug reports:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 },
    );
  }
}
