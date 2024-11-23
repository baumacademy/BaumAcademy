"use client"
import LoginPage from "./login/LoginPage";

export default function Home() {
  // check localStorage to validate if user is logged-in or not
  return (
    <div>
      <LoginPage />
    </div>
  );
}
