import './config/index'
import { Reddit } from './service/reddit'
import { r } from './config/redditWrapper'
import { Twitch } from './service/twitch'
import { twitchInstance } from './config/twitch'
import { Task } from './tasks/streamNotifier'
import { Runner } from './runner'

const reddit = new Reddit(r.api)
const twitch = new Twitch(twitchInstance)

const run = async () => {
  try {
    // console.log(await twitch.getUser('relaxing234'))
    // console.log(await r.api.get('/r/Rainbow6/stylesheet'))
    const runner = new Runner([new Task({ reddit, twitch })], 60).start()
  } catch (err) {
    console.log(err.message)
  }
}

run()
