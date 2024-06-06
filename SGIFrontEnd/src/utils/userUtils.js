// userUtils.js
export function getUserFromSessionStorage() {
  const storedUserData = sessionStorage.getItem('user');
  if (storedUserData) {
    return JSON.parse(storedUserData);
  }
  return null;
}