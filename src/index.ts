import 'module-alias/register'
import './r6bot'

process.once('SIGHUP', function() {
  console.clear()
})
