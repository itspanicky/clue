import { nanoid } from 'nanoid'

const localStorageKey = "player.client_id"

// generate and save player's id to local storage to be retrieved
export const playerId = () => {
  let id = localStorage.getItem(localStorageKey)
  if (id !== null) {
    return id
  } else {
    id = nanoid()
    localStorage.setItem(localStorageKey, id)
    return id
  }
}