import { NextResponse } from "next/server";
import * as fs from "fs";
import { join } from "path";

const usersFilePath = join(process.cwd(), "app/api/auth/data.txt");

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Read the existing contents of the data.txt file
    let usersData = fs.existsSync(usersFilePath)
      ? fs.readFileSync(usersFilePath, "utf-8")
      : "";

    // Check if the username already exists
    const userLines = usersData.trim().split("\n");
    const userExists = userLines.some((line) => line.startsWith(`${email}:`));

    if (userExists) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Append the new user entry to the data.txt file
    const newUserEntry = `${email}:${password}`;
    usersData += `${usersData ? "\n" : ""}${newUserEntry}`;
    fs.writeFileSync(usersFilePath, usersData);

    return NextResponse.json({ message: "Sign-up successful" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Sign-up failed" }, { status: 500 });
  }
}
