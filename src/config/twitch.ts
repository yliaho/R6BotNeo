import axios from 'axios'

export const twitchInstance = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  timeout: 5000,
  headers: {
    'Client-ID': process.env.T_CLIENT_ID
  }
})
