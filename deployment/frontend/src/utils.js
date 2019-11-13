export const postJson = async function (url, body) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}
Failed to POST ${url}`)
    }
    return response.json()
  } catch (err) {
    alert(err)
  }
}
