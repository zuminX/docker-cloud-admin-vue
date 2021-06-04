import Vue from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Loading,
  Menu,
  MenuItem,
  Option,
  Pagination,
  Row,
  Scrollbar,
  Select,
  Submenu,
  TabPane,
  Tabs,
  Tooltip
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Scrollbar)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tooltip)

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
