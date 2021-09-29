import {App} from 'vue'
import rejectElement from './reject-element'
import registerProperties from './register-properties'

export function registerApp(app:App):void {
  rejectElement(app),
  registerProperties(app)
}
