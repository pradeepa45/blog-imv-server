import client from "../prisma/client";
import { slugGenerator } from "../utils/slugs";

export const blogs = async (parent, args) => {
  await client.$connect();
  const blogs = await client.blog.findMany({
    include: {
      tags: true,
    },
  });
  return blogs;
};

export const blogWithSlug = async (parent, args) => {
  await client.$connect();
  const {slug} = args
  const blog = await client.blog.findUnique({
    where: {
      slug,
    },
    include: {
      tags: true,
      },
  });
  return blog;
};

export const blogsWithCategory = async (parent, args) => {
  try {
    await client.$connect();
    const { slug } = args;
    await client.$connect();
    const blogs = await client.blog.findMany({
      where: {
        tags: {
          some: {
            slug,
          },
        },
      },
      include: {
        tags: true,
      },
    });
    return blogs;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Unable to create blog");
  } finally {
    await client.$disconnect();
  }
};

export const createBlog = async (parent, args) => {
  try {
    await client.$connect();
    const { title, excerpt, content, heroImage, tags } = args.input;
    const blog = await client.blog.create({
      data: {
        title,
        slug: slugGenerator(title),
        excerpt,
        content,
        heroImage,
        tags: {
          connectOrCreate:
            tags?.map((tagName) => ({
              where: {
                name: tagName,
              },
              create: {
                name: tagName,
                slug: slugGenerator(tagName),
              },
            })) || [],
        },
      },
      include: {
        tags: true,
      },
    });

    return blog;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Unable to create blog");
  } finally {
    await client.$disconnect();
  }
};

export const updateBlog = async (parent, args) => {
  await client.$connect();
  const { id, title, excerpt, content, heroImage, tags } = args;
  const blog = await client.blog.update({
    where: {
      id,
    },
    data: {
      title,
      excerpt,
      content,
      heroImage,
      tags,
    },
  });
  return blog;
};

export const deleteBlog = async (parent, args) => {
  await client.$connect();
  const { id } = args;
  const blog = await client.blog.delete({
    where: {
      id,
    },
  });
  return blog;
};
