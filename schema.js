import { gql } from 'apollo-server'

const schema = gql`
  type Tag {
    id: ID!
    name: String!
    slug: String
    blogs: [Blog]
  }

  type Blog {
    id: ID!
    title: String!
    excerpt: String!
    content: String!
    slug: String
    heroImage: String!
    tags: [Tag]
    published: String
  }

  input BlogId {
    id: ID!
  }

  input CreateBlogInput {
    title: String!
    excerpt: String!
    content: String!
    heroImage: String!
    tags: [ID!]!
  }

  input UpdateBlogInput {
    title: String
    excerpt: String
    content: String
    heroImage: String
    tags: [ID!]
  }

  type Query {
    tags: [Tag]
    blog(id: ID!): Blog
    blogs: [Blog]
    tag(id: ID!): [Blog]
    blogsWithCategory(slug: String!): [Blog]
    blogWithSlug(slug: String!): Blog
  }

  type Mutation {
    createTag(
      name: String!,
      blogs: [BlogId]
    ): Tag

    updateTag(
      id: ID!,
      name: String,
      blogs: [BlogId]
    ): Tag

    deleteTag(
      id: ID!
    ): Tag

    createBlog(
      input: CreateBlogInput!
    ): Blog

    updateBlog(
      id: ID!,
      input: UpdateBlogInput!
    ): Blog

    deleteBlog(
      id: ID!
    ): Blog
  }
`

export default schema
