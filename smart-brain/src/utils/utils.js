const fetchProfileData = (id, token) => {
  return fetch(`http://localhost:3001/profile/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
}

export { fetchProfileData }