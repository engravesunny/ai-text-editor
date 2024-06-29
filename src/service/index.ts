import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import { ref, h } from "vue";
import login from "../components/login.vue";

let token_key = "AI_DOC_EDITOR_TOKEN";
const isLogin = ref(localStorage.getItem(token_key));
const loginTitle = ref('登录');
const logining = ref(false);

export const useLogin = () => {
  const handleLogin = async () => {
    if (logining.value) return;
    logining.value = true;
    // 弹出登录弹窗
    ElMessageBox({
      message: () => h(login, { close: () => { ElMessageBox.close() } }),
      customStyle: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "350px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      showCancelButton: false,
      showConfirmButton: false,
      showClose: false,
      showInput: false,
      closeOnClickModal: false,
    });
  };
  const handleLogout = () => {
    // 登出确认弹窗
  };
  return { isLogin, handleLogin, handleLogout, loginTitle, logining };
};

const { handleLogin } = useLogin();
const http = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: '/api',
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  },
);

http.interceptors.response.use(
  (config) => {
    if (config.data?.code) {
      config.data?.msg && ElMessage(config.data?.msg);
      handleLogin();
    }
    return config;
  },
  (err: any) => {
    Promise.reject(err);
  },
);

export { http };
