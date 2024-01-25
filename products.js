import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "godlike-vue",
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    // 檢查使用者是否登入
    // 如果有登入的話，會call getData 來獲取商品資料
    // 登入失敗的話，alert錯誤訊息，且網頁導回登入頁面
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    //  獲取商品數據
    // 若成功獲取，相商品資料存到 product []之中
    // 若失敗。alert錯誤訊息
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 將點擊的商品存入tempProdct object中
    openProduct(item) {
      this.tempProduct = item;
    },
  },
  mounted() {
    // 在渲染出product頁面時，先執行的動作
    // 取出 Token
    // 在所有axios的header中帶入從cookie中取得的token
    // 並且call checkAdmin function 檢查使用者是否登入
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
}).mount("#app");
