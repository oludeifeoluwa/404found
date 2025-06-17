import { redirect } from "next/dist/server/api-utils";
import AgentRegistrationpage from "./(registration)/agent/page";
import CreateAccount from "./(registration)/user/page";
import Dashboard from "./dashboard/page";
export default function Home() {
  return (
    <>
    <Dashboard></Dashboard>
    </>
  );
}
