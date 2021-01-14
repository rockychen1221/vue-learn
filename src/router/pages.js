export default [
  {
    path: "/",
    component: () => import("views/layout/home"),
    redirect: {
      name: "elementui",
    },
    children: [
      {
        path: "/elementui",
        name: "elementui",
        component: () => import("views/elementui/dept")
      },
    ]
  }
];
