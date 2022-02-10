// 局部引入
import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElTabPane,
  ElTabs,
  ElForm,
  ElButton,
  ElInput,
  ElFormItem,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem
} from 'element-plus'
const components = [
  ElTabPane,
  ElTabs,
  ElForm,
  ElButton,
  ElInput,
  ElFormItem,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
