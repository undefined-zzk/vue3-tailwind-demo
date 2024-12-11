import { lazy } from "./lazy"
import { loading} from './loading'

const direcObj = {
    lazy,
    loading
}

const directives = {
    install(app) {
        for (let key in direcObj) {
            app.directive(key,direcObj[key])
       }
  }
}

export default directives