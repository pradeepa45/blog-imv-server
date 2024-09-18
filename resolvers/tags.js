import client from "../prisma/client"
import { colorGenerator, slugGenerator } from "../utils/slugs"

export const tags = async (parent, args) => {
  await client.$connect()
  const tags = await client.tag.findMany()
  return tags
}

export const tag = async (parent, args) => {
  await client.$connect()
  const tag = await client.tag.findUnique({
    where: {
      id: args.id,
    }
  })
  return tag
}

export const createTag = async (parent, args) => {
  try {
    await client.$connect()
    const { name, blogs } = args
    const tag = await client.tag.create({
      data: {
        name,
        slug: slugGenerator(name),
        blogs: blogs?.length
          ? {
              connect: blogs.map(blog => ({ id: blog.id }))
            }
          : undefined
      }
    })
    return tag
  } catch (error) {
    console.error('Error creating tag:', error)
    throw new Error('Unable to create tag')
  } finally {
    await client.$disconnect()
  }
}

export const updateTag = async (parent, args) => {
  await client.$connect()
  const { id, name, blogs } = args
  const tag = await client.tag.update({
    where: {
      id: id,
    },
    data: {
      name,
      blogs: blogs?.length
          ? {
              connect: blogs.map(blog => ({ id: blog.id }))
            }
          : undefined
    }
  })
  return tag
}
  
export const deleteTag = async (parent, args) => {
  await client.$connect()
  const { id } = args
  const tag = await client.tag.delete({
    where: {
      id: id,
    }
  })
  return tag
}