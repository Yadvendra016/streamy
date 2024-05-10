import { db } from "./db";
import { getSelf } from "./auth-service";

// CHECK IF USR FOLLOWING OR NOT
export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });
    if (!otherUser) throw new Error("No user found");

    if (otherUser.id === self.id) {
      return true;
    }
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });
    return !!existingFollow;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Follow user
export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) throw new Error("User not found");

  if (otherUser.id === self.id) throw new Error("Cannot follow yourself");

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });
  // IF ALREADY FOLLOw
  if (existingFollow) throw new Error("Already following");

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return follow;
};

// Unfollow user
export const UnfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("User not found");

  if (otherUser.id === self.id) throw new Error("Cannot unfollow yourself");

  // check either we are following or not
  const exitingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!exitingFollow) {
    throw new Error("Not following");
  }

  const follow = await db.follow.delete({
    where: {
      id: exitingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};
