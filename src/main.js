import { createApp } from "vue"
import App from "./App.vue"
import "normalize.css"
import "virtual:svg-icons-register"
import "./styles/style.scss"
import './styles/common.scss'
import globalcomponent from "./plugins/globalcomponent"
import router from "./router"
import { pinia } from "./stores"
const app = createApp(App)
app.config.errorHandler = (error) => {
  console.log("error", error)
}
app.use(router).use(pinia).use(globalcomponent).mount("#app")
