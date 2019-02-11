import Bluebird, { method } from 'bluebird'
import { r, snoowrap } from '@/config/redditWrapper'
import { API as RedditAPI } from 'reddit-wrapper-v2'
import { createReadStream, readFile, readFileSync } from 'fs'
import path from 'path'
import request from 'request'

const { api } = r

export interface IWidgetData {
  styles: {
    headerColor: string
    backgroundColor: string
  }
  kind?: 'custom'
  imageData: any[]
  text: string
  styleSheetUrl?: string
  height: number
  textHtml?: string
  shortName: string
  id?: string
  css: string
}

interface IWidget {
  subreddit?: string
  id: string
}

export class Reddit {
  public defaultSubreddit: string = process.env.R_SUBREDDIT as string

  constructor(private connector: RedditAPI) {}

  async getWidgets(subreddit: string): Promise<{ [id: string]: IWidgetData }> {
    if (!subreddit) {
      subreddit = this.defaultSubreddit
    }
    const [statusCode, body] = await this.connector.get(
      `/r/${subreddit}/api/widgets`
    )

    return body.items
  }

  async getWidget({ subreddit, id }: IWidget): Promise<IWidgetData> {
    if (!subreddit) {
      subreddit = this.defaultSubreddit
    }

    return this.getWidgets(subreddit).then(widgets => widgets[id])
  }

  async addCustomWidget(
    widgetData: IWidgetData,
    subreddit: string
  ): Promise<IWidgetData> {
    console.log('add')
    if (!subreddit) {
      subreddit = this.defaultSubreddit
    }

    const [statusCode, body] = await this.connector.post(
      `/r/${subreddit}/api/widget`,
      { ...widgetData, kind: 'custom' }
    )

    console.log(body)

    return body
  }

  async updateWidget(
    widgetData: { [key in keyof IWidgetData]?: any },
    { subreddit, id }: IWidget
  ): Promise<IWidgetData> {
    if (!subreddit) {
      subreddit = this.defaultSubreddit
    }

    const widget = await this.getWidget({ subreddit, id })

    const [statusCode, body] = await this.connector.put(
      `/r/${subreddit}/api/widget/${id}`,
      { ...widget, ...widgetData }
    )

    console.log(body)

    return body
  }

  async deleteWidget({ subreddit, id }: IWidget): Promise<IWidgetData> {
    if (!subreddit) {
      subreddit = this.defaultSubreddit
    }

    const widget = await this.getWidget({ id })

    const [statusCode] = await this.connector.del(
      `/r/${subreddit}/api/widget/${widget.id}`
    )

    return widget
  }

  async deleteWidgetsByShortName(shortname: string, subreddit?: string) {
    console.log('fuck?')
    if (!subreddit) {
      subreddit = this.defaultSubreddit
    }
    const widgets = await this.getWidgets('Rainbow6')
    const widgetsToRemove = Object.values(widgets).filter(
      widget => widget.shortName === shortname
    )

    widgetsToRemove.forEach(async ({ id }) => {
      console.log(await this.deleteWidget({ id }))
    })
  }

  uploadImage(filebase: any, name: string = 'stream-thumbnail') {
    return snoowrap.getSubreddit(this.defaultSubreddit).uploadStylesheetImage({
      file: path.resolve(process.cwd(), filebase),
      imageType: 'jpg',
      name: 'stream-thumbnail'
    })
  }

  async s3_bucket() {
    // return this.connector.post(
    //   '/r/Rainbow6/api/widget_image_upload_s3?raw_json=1&gilding_detail=1',
    //   {
    //     filepath: 'pl-r6 haha',
    //     mimetype: 'fucker yes'
    //   }
    // )
    const { s3UploadLease } = await snoowrap.oauthRequest({
      uri: 'r/Rainbow6/api/widget_image_upload_s3',
      method: 'post',
      formData: {
        filepath: 'woah.jpg',
        mimetype: 'image/jpg'
      }
    })

    const { action, fields } = s3UploadLease
    let formData = {}
    fields.forEach(({ name, value }) => {
      formData[name] = value
    })
    formData['file'] = readFileSync(path.resolve(process.cwd(), 'woah.jpg'))

    return new Promise((resolve, reject) => {
      request
        .post(`https:${action}`, {
          headers: {
            'Content-Type': 'application/xml'
          },
          formData
        })
        .on('response', resp => {
          resolve(decodeURIComponent(resp.headers.location))
        })
        .on('error', err => reject(err))
    })

    // return snoowrap.oauthRequest({
    //   url: `https:`,
    //   uri: `${action}`,
    //   headers: {
    //     'Content-Type': 'application/xml'
    //   },
    //   formData
    // })
  }
}
