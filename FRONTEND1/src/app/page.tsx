import { redirect } from "next/dist/server/api-utils";
import AgentRegistrationpage from "./(registration)/agent/page";
import CreateAccount from "./(registration)/user/page";
import Dashboard from "./dashboard/page";
import RegistrationPage from "./(registration)/user/page";
import LoanPage from "./machine_learning/loan_eligibility_predictor/page";
import Homely from "./load/page";
export default function Home() {
  return (
    <>
    <Homely></Homely>
    </>
  );
}
