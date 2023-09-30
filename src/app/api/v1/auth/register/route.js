import bcrypt from "bcrypt";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 13);
    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
