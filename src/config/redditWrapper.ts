//@ts-ignore
import redditWrapper from '@/lib/redditWrapper/reddit-wrapper'
import Snoowrap from 'snoowrap'

export const r = redditWrapper({
  api_secret: process.env.R_CLIENT_SECRET as string,
  app_id: process.env.R_CLIENT_ID as string,
  user_agent: 'bot for r/Rainbow6 subreddit',
  username: process.env.R_USERNAME as string,
  password: process.env.R_PASSWORD as string
})

export const snoowrap = new Snoowrap({
  clientSecret: process.env.R_CLIENT_SECRET as string,
  clientId: process.env.R_CLIENT_ID as string,
  userAgent: 'bot for r/Rainbow6 subreddit',
  username: process.env.R_USERNAME as string,
  password: process.env.R_PASSWORD as string
})
