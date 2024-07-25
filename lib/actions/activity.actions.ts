'use server'

const ACTIVITY_ENDPOINT = `${process.env.API_ENDPOINT}/activity`

export async function getPCStatus() {
  return true
}

export async function getKeyPresses() {
  const response = await fetch(`${ACTIVITY_ENDPOINT}/key-presses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()

  return result.data.map((item) => ({
    id: item.id,
    count: item.count,
    createdAt: new Date(item.createdAt),
  }));
}

export async function getLeftClicks() {
  const response = await fetch(`${ACTIVITY_ENDPOINT}/left-clicks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()

  return result.data.map((item) => ({
    id: item.id,
    count: item.count,
    createdAt: new Date(item.createdAt),
  }));
}

export async function getRightClicks() {
  const response = await fetch(`${ACTIVITY_ENDPOINT}/right-clicks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()

  return result.data.map((item) => ({
    id: item.id,
    count: item.count,
    createdAt: new Date(item.createdAt),
  }));
}

export async function getMouseMovements() {
  const response = await fetch(`${ACTIVITY_ENDPOINT}/mouse-movements`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()

  return result.data.map((item) => ({
    id: item.id,
    amount: item.amount,
    createdAt: new Date(item.createdAt),
  }));
}