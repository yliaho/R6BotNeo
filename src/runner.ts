import { TaskBase } from './tasks/taskBase'

export class Runner {
  constructor(
    public tasks: TaskBase<any>[],
    private intervalInMinutes: number
  ) {}

  start() {
    this.tasks.forEach(task => {
      task.init()
    })
    setInterval(() => {
      this.tasks.forEach(task => {
        task.run()
      })
    }, this.intervalInMinutes * 1000)
  }
}
