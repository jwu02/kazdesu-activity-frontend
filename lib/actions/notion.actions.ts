"use server"

import { Client } from "@notionhq/client"
import { PageObjectResponse, MultiSelectPropertyItemObjectResponse, TitlePropertyItemObjectResponse, ParagraphBlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
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
    response.results.map(async (blogPage) => {
      if (!('properties' in blogPage) || !('created_time' in blogPage)) return null;
      
      // Fetch a preview: first block only
      const blocks = await notion.blocks.children.list({
        block_id: blogPage.id,
        page_size: 1, // Limit to 1 block for sneak peek
      });
  
      const preview = blocks.results[0]
        ? ((blocks.results[0] as ParagraphBlockObjectResponse).paragraph?.rich_text?.[0]?.plain_text || "").substring(0, 250) + "..."
        : "";
  
      const nameProperty = blogPage.properties.Name as unknown as TitlePropertyItemObjectResponse;
      const blogTitlePlainText = getPlainTextFromRichTextArray(nameProperty.title as unknown as RichTextItemResponse[])
      
      return {
        id: blogPage.id,
        title: blogTitlePlainText || "Untitled",
        createdAt: blogPage.created_time,
        tags: (blogPage.properties.Tags as MultiSelectPropertyItemObjectResponse).multi_select.map(tag => tag.name),
        preview: preview,
      };
    }).filter((preview): preview is NonNullable<typeof preview> => preview !== null)
  );

  return blogsPreview;
}

export async function getProjects() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_PROJECTS!,
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
    response.results.map(async (projectPage) => {
      if (!('properties' in projectPage) || !('created_time' in projectPage)) return null;
      
      const nameProperty = projectPage.properties.Name as unknown as TitlePropertyItemObjectResponse;
      
      return {
        id: projectPage.id,
        title: getPlainTextFromRichTextArray(nameProperty.title as unknown as RichTextItemResponse[]) || "Untitled",
        createdAt: projectPage.created_time,
        tags: (projectPage.properties.Tags as MultiSelectPropertyItemObjectResponse).multi_select.map(tag => tag.name),
        blocks: (await notion.blocks.children.list({ block_id: projectPage.id })).results,
      }
    }).filter((project): project is NonNullable<typeof project> => project !== null)
  )

  return projects
}

export async function getPageById(id: string) {
  const response = await notion.pages.retrieve({ page_id: id })
  const page = response as PageObjectResponse
  if (!page) return null

  const nameProperty = page.properties.Name as unknown as TitlePropertyItemObjectResponse;
  const titlePlainText = getPlainTextFromRichTextArray(nameProperty.title as unknown as RichTextItemResponse[])
  const blocks = await notion.blocks.children.list({ block_id: id })

  return {
    id: page.id,
    title: titlePlainText || "Untitled",
    createdAt: page.created_time,
    tags: (page.properties.Tags as MultiSelectPropertyItemObjectResponse).multi_select.map(tag => tag.name),
    blocks: blocks.results,
  }
}
