import { useContext } from "react";
import { UserContext } from "../containers/UserFetcher";

export default function Dashboard() {
    const { user } = useContext(UserContext);
    
    return (
      <>
          <h1>{`Welcome ${user.name}`}</h1>
      </>
    );
  }