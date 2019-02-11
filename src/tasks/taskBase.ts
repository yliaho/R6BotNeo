import { Reddit } from '@/service/reddit'
import { Twitch } from '@/service/twitch'

export interface TaskServices {
  reddit?: Reddit
  twitch?: Twitch
}

export abstract class TaskBase<T> {
  abstract state: T
  constructor(public services: TaskServices) {}

  abstract run(): any
  abstract init(): any
}
