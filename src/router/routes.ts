import { RouteRecordRaw } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Home from "@/views/Home/index.vue";
import { useLogin } from "@/service/index";
import { ElMessage } from "element-plus";

const { isLogin, handleLogin } = useLogin();
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "/home",
        component: Home,
        name: "home",
        beforeEnter: () => {
          if (!isLogin.value) {
            handleLogin();
          } else {
            ElMessage.success('已登录');
          }
        }
      },
      {
        path: "/login",
        component: Login,
        name: "login",
      },
    ],
  },
];

export default routes;
