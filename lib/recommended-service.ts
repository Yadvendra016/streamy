import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    // for logged in user
    users = await db.user.findMany({
      where: {
        // exclude current user
        NOT: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    // for log out user
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
