<template>
  <div class="loginBox">
    <div
      style="
        display: flex;
        width: 100%;
        height: 50px;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 700;
      "
    >
      {{ loginTitle }}
    </div>
    <el-form>
      <el-form-item>
        <el-input
          type="text"
          placeholder="用户名"
          v-model="loginFormData.username"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="密码"
          v-model="loginFormData.password"
        ></el-input>
      </el-form-item>
      <div
        class="btns"
        style="width: 100%; display: flex; justify-content: center"
      >
        <el-button
          @click="handleLogin"
          :type="loginTitle === '登录' ? 'primary' : 'default'"
          >登录</el-button
        >
        <el-button
          @click="handleRegister"
          :type="loginTitle === '注册' ? 'primary' : 'default'"
          >注册</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLogin } from "@/service/index";
import { login, register } from "@/service/apis/user";
import { ElMessage } from "element-plus";
const props = defineProps<{ close: () => void }>();

const { loginTitle, isLogin, logining } = useLogin();
const loginFormData = ref({
  username: "",
  password: "",
});
const handleLogin = async () => {
  if (loginTitle.value === "登录") {
    // 登录
    const {
      data: { code, data: token },
    } = await login({
      ...loginFormData.value,
    });
    if (code === 0) {
      isLogin.value = token;
      logining.value = false;
      localStorage.setItem("AI_DOC_EDITOR_TOKEN", token);
      props.close();
      ElMessage.success("已登录");
    }
  } else {
    // 转为登录
    loginTitle.value = "登录";
  }
};
const handleRegister = async () => {
  if (loginTitle.value === "注册") {
    // 注册
    const {
      data: { code, data: token },
    } = await register({
      ...loginFormData.value,
    });
    if (code === 0) {
      isLogin.value = token;
      logining.value = false;
      localStorage.setItem("AI_DOC_EDITOR_TOKEN", token);
      props.close();
      ElMessage.success("已登录");
    }
  } else {
    // 转为注册
    loginTitle.value = "注册";
  }
};
</script>

<style lang="less" scoped>
.loginBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
