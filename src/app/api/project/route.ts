/* eslint-disable @typescript-eslint/no-explicit-any */

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { user: null, message: "Unauthorized", success: false },
        { status: 403 }
      );
    }
    const project = await prisma.project.create({
      data: {
        domain: values.domain,
        name: values.name,
        description: values.description,
        owner: { connect: { id: session.user.id } },
      },
    });
    if (!project) {
      return NextResponse.json(
        { message: "Project not created", success: false },
        { status: 400 }
      );
    }
    revalidatePath("/projects");
    return NextResponse.json(
      { project, message: "Project created", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
