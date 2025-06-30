import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function POST() {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (existingUser) {
      return Response.json(existingUser);
    }

    // If not, create new user
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return Response.json(newUser, { status: 201 });
  } catch (err) {
    console.error("checkUser API error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
