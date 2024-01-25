import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 此login function 使用axios post 帶入req.body: this.user (上面得data中的物件object)
    // response 成功 回傳 token 與 expired過期時間 ，且設置到cookie中
    // 然後  window.location = 'products.html'; 導向product 頁面
    // response 失敗 會alert回傳錯誤訊息
    login() {
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      axios
        .post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`;
          window.location = "products.html";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
}).mount("#app");
