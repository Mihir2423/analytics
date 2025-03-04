import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    // Check if the user is authenticated and is an admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Unauthorized: Only admins can create logs",
          success: false,
        },
        { status: 403 }
      );
    }

    // Parse the request body
    const { message, level = "info" } = await req.json();

    // Validate the input
    if (!message) {
      return NextResponse.json(
        { message: "Message is required", success: false },
        { status: 400 }
      );
    }

    // Create the log
    const log = await prisma.log.create({
      data: {
        message,
        level,
      },
    });

    return NextResponse.json(
      { log, message: "Log created successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating log:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 403 }
      );
    }

    // Fetch all logs
    const logs = await prisma.log.findMany({
      orderBy: {
        createdAt: "desc", // Sort logs by creation date (newest first)
      },
    });

    return NextResponse.json(
      { logs, message: "Logs fetched successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
