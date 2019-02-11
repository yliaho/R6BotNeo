import { AxiosInstance } from 'axios'
import { twitchInstance } from '@/config/twitch'

export interface TwitchStreamData {
  id: string
  user_id: string
  game_id: string
  user_name: string
  community_ids: string
  type: 'live'
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tags_ids: string[]
}

export class Twitch {
  constructor(private connector: AxiosInstance) {}

  async getUser(username?: string) {
    const {
      data: { data }
    } = await this.connector.get('/users', {
      params: {
        login: username
      }
    })

    if (!data || data.length < 1) {
      return null
    }

    return data
  }

  async getStream(
    user_id: string,
    getThumbnail = true
  ): Promise<TwitchStreamData> {
    const {
      data: { data }
    } = await this.connector.get('/streams', {
      params: {
        user_id
      }
    })

    if (!data || data.length < 1) {
      return null
    }

    const [stream] = data

    return {
      ...stream,
      thumbnail_url: getThumbnail
        ? this.twitchImageHelper(stream.thumbnail_url, {
            width: 660,
            height: 360
          })
        : stream.thumbnail_url
    }
  }

  twitchImageHelper(url: string, size: { width: number; height: number }) {
    return url.replace(
      '{width}x{height}',
      `${size.width.toString()}x${size.height.toString()}`
    )
  }

  async getGame(id: string, getThumbnail = true) {
    const {
      data: { data }
    } = await this.connector.get('/games', {
      params: {
        id
      }
    })

    if (!data || data.length < 1) {
      return null
    }

    const [game] = data

    return {
      ...game,
      box_art_url: getThumbnail
        ? this.twitchImageHelper(game.box_art_url, { width: 285, height: 380 })
        : game.box_art_url
    }
  }
}
