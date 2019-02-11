import { readFile, writeFile } from 'fs'
import { promisify } from 'util'
import path from 'path'
import { TaskBase } from './taskBase'
import { IWidgetData } from '@/service/reddit'
import { TwitchStreamData } from '@/service/twitch'
import { format } from '@/utils/format'
import Axios from 'axios'
import { downloadImage } from '@/utils/downloadImage'

const readFileAsync = promisify(readFile)

interface StreamNotifierState {
  stream: TwitchStreamData
  widget: IWidgetData
}

export class Task extends TaskBase<StreamNotifierState> {
  state: StreamNotifierState = {
    stream: null,
    widget: null
  }

  constructor(services) {
    super(services)
  }

  async generateMarkdown({ user_name, viewer_count, title }) {
    const markdown = await this.getFileAsString('streamWidget.md')

    return format(markdown, [user_name, title, viewer_count])
  }

  getFileAsString(filename: string): Promise<string> {
    return readFileAsync(path.resolve(process.cwd(), filename), {
      encoding: 'utf8'
    })
  }

  async removeWidget() {
    await this.services.reddit.deleteWidgetsByShortName('R6.StreamNotifier')
    this.state.widget = null
  }

  async prepareThumbnail(thumbnail_url) {
    await downloadImage(thumbnail_url, path.resolve(process.cwd(), 'woah.jpg'))

    //@ts-ignore
    await this.services.reddit.uploadImage('woah.jpg')
  }

  async updateWidget() {
    const { viewer_count, title, thumbnail_url, user_name } = this.state.stream
    const widgetData = {
      css: await this.getFileAsString('streamWidget.css'),
      text: await this.generateMarkdown({ user_name, title, viewer_count }),
      imageData: [],
      height: 343,
      shortName: 'R6.StreamNotifier',
      styles: {
        backgroundColor: '',
        headerColor: ''
      }
    }
    if (!this.state.widget) {
      this.state.widget = await this.services.reddit.addCustomWidget(
        widgetData,
        'Rainbow6'
      )
    } else {
      this.state.widget = await this.services.reddit.updateWidget(widgetData, {
        subreddit: 'Rainbow6',
        id: this.state.widget.id
      })
    }
  }

  async init() {
    this.services.reddit.deleteWidgetsByShortName('R6.StreamNotifier')
  }

  async run() {
    this.state.stream = await this.services.twitch.getStream('65171890')

    if (this.state.stream) {
      console.log('user is streaming')
      this.updateWidget()
    } else {
      if (!this.state.widget) {
        console.log('user is not streaming')
        return
      }
      console.log('user stopped streaming, removing')
      this.removeWidget()
    }
  }
}
