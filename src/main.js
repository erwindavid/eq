import './app.css'
import './style/general.css'
import './style/logo.css'
import './style/menu.css'
import './style/score.css'
import './style/questions.css'
import './style/navigation.css'
import './style/progression.css'

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app
