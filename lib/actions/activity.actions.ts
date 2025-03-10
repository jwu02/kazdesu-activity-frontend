'use server'

export async function getPCStatus() {
  return true
}

export async function getAllActivityData() {
  const response = await fetch(`${process.env.ACTIVITY_API_ENDPOINT}/all-activity`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()

  // Parse the body manually if it's still a string
  const parsedBody = typeof result.body === 'string' ? JSON.parse(result.body) : result.body;

  return parsedBody.data
}