import { NextResponse } from "next/server";
import * as fs from "fs";
import { join } from "path";
import jwt from "jsonwebtoken";

const usersFilePath = join(process.cwd(), "app/api/auth/data.txt");
const token = "iiaueb&*%D5e65e7F^%EXTR$fvuiqb3278bfwe(*T*^F&OTXFW*^%*D^I&TC";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    console.log("Username:", email);

    // Read the contents of the users.txt file
    const usersData = fs.readFileSync(usersFilePath, "utf-8");

    // Split the contents into an array of lines
    const userLines = usersData.trim().split("\n");

    // Check if the username and password combination exists
    const userFound = userLines.some((line) => line === `${email}:${password}`);

    if (userFound) {
      const issueTime = new Date();
      const data = { email, issueTime };
      const jsonData = JSON.stringify(data);
      console.log("Data:", jsonData);

      // const data = email + currentTime;
      const token = jwt.sign(jsonData, "secret_key");
      // console.log("Token:", token);
      return NextResponse.json({ message: "Login successful", token: token });
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
