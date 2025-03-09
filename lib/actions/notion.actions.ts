"use server"

import { Client } from "@notionhq/client"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { getPlainTextFromRichTextArray } from "../utils";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getBlogs() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_BLOG!,
    filter: {
        property: "Status",    // Filter from 'Status' property
        status: {
          equals: "Published", // Retrieve `Published` pages only
        },
      },
    sorts: [
      {
        timestamp: "created_time", // Sort pages by creation date
        direction: "descending",   // Newest first
      },
    ],
  });

  const blogsPreview = await Promise.all(
    response.results.map(async (blogPage: any) => {
      // Fetch a preview: first block only
      const blocks = await notion.blocks.children.list({
        block_id: blogPage.id,
        page_size: 1, // Limit to 1 block for sneak peek
      });
  
      const preview = blocks.results[0]
        ? blocks.results[0][blocks.results[0].type]?.rich_text?.[0]?.plain_text.substring(0, 250) + "..." || ""
        : "";
  
      const blogTitlePlainText = getPlainTextFromRichTextArray(blogPage.properties.Name.title)
      
      return {
        id: blogPage.id,
        title: blogTitlePlainText || "Untitled",
        createdAt: blogPage.created_time,
        tags: blogPage.properties.Tags.multi_select.map((tag: any) => tag.name),
        preview: preview,
      };
    })
  );

  return blogsPreview;
}

export async function getProjects() {
  "use server"
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_PROJECT!,
    filter: {
      property: "Status",
      status: {
        equals: "Done",
      },
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  })

  // iterate over each project page and fetch its contents
  const projects = await Promise.all(
    response.results.map(async (projectPage: any) => {
      return {
        id: projectPage.id,
        title: getPlainTextFromRichTextArray(projectPage.properties.Name.title) || "Untitled",
        createdAt: projectPage.created_time,
        tags: projectPage.properties.Tags.multi_select.map((tag: any) => tag.name),
        blocks: (await notion.blocks.children.list({ block_id: projectPage.id })).results,
      }
    })
  )

  return projects
}

export async function getPageById(id: string) {
  const response = await notion.pages.retrieve({ page_id: id })
  const page = response as PageObjectResponse
  if (!page) return null

  const titlePlainText = getPlainTextFromRichTextArray(page.properties.Name.title)
  const blocks = await notion.blocks.children.list({ block_id: id })

  return {
    id: page.id,
    title: titlePlainText || "Untitled",
    createdAt: page.created_time,
    tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
    blocks: blocks.results,
  }
}
