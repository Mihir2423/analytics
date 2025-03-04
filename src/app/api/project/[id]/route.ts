import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { user: null, message: "Unauthorized", success: false },
        { status: 403 }
      );
    }

    const deletedProject = await prisma.project.deleteMany({
      where: { id, ownerId: session.user.id },
    });

    if (deletedProject.count === 0) {
      return NextResponse.json(
        { message: "Project not found or unauthorized", success: false },
        { status: 404 }
      );
    }

    revalidateTag("projects");
    revalidatePath("/projects");

    return NextResponse.json(
      { message: "Project deleted", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
