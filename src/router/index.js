import Vue from "vue";
import VueRouter from "vue-router";
import pages from "./pages";

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const publicBasePath = process.env.VUE_APP_PUBLIC_PATH;
const createRouter = () =>
  new VueRouter({
    mode: "history", // 需要服务支持
    scrollBehavior: () => ({ y: 0 }),
    base: publicBasePath,
    routes: pages,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
