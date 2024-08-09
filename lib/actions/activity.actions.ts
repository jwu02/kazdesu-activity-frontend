'use server'

const ACTIVITY_ENDPOINT = `${process.env.API_ENDPOINT}/activity`

export async function getPCStatus() {
  return true
}

export async function getAllActivityData() {
  const response = await fetch(`${ACTIVITY_ENDPOINT}/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()

  return result.data
}
