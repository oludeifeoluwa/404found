import { redirect } from "next/dist/server/api-utils";
import Login from "./(root)/login/page";
export default function Home() {
  return (
    <>
      <Login></Login>
    </>
  );
}
