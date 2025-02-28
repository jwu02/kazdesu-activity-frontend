'use server'

const ACTIVITY_ENDPOINT = `${process.env.API_ENDPOINT}/all-activity`

export async function getPCStatus() {
  return true
}

export async function getAllActivityData() {
  const response = await fetch(ACTIVITY_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()

  // Parse the body manually if it's still a string
  const parsedBody = typeof result.body === "string" ? JSON.parse(result.body) : result.body;

  return parsedBody.data
}