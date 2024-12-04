"use client"
import { LocalStorageProvider } from "./LocalStorageContextProvider";
import LoginPage from "./login/LoginPage";

export default function Home() {
  // check localStorage to validate if user is logged-in or not
  return (
    
    <div>
      <LoginPage />
    </div>
  );
}
