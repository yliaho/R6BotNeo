import Axios from 'axios'
import { createWriteStream } from 'fs'

export async function downloadImage(url: string, path: string) {
  const writer = createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}
