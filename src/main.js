import { createApp } from "vue"
import App from "./App.vue"
import "normalize.css"
import "virtual:svg-icons-register"
import "./styles/style.scss"
import './styles/common.scss'
import globalcomponent from "./plugins/globalcomponent"
import directives  from "./directives"
import router from "./router"
import { pinia } from "./stores"
// import 'amfe-flexible'

const app = createApp(App)
app.config.errorHandler = (error) => {
  console.log("error", error)
}
app.use(router).use(pinia).use(globalcomponent).use(directives).mount("#app")
