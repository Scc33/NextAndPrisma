import { prisma } from "@/lib/prisma";
import { User } from "../generated/prisma";

export default async function UsersPage() {
  const users: User[] = await prisma.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
