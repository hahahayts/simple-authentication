import type { User } from "../../types";

const HomePage = ({ user }: { user: User | null }) => {
  return (
    <div>
      <p>Welcome to the protected routes, {user?.username}</p>
    </div>
  );
};

export default HomePage;
