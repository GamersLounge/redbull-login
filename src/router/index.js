import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import routes from "@/router/routes.js";
import { useAuthStore } from "@stores/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * Global middleware to always attempt authentication if it's the first visit.
 */
router.beforeEach((to, from, next) => {
  if (from === START_LOCATION) {
    const authStore = useAuthStore();

    authStore.authenticate().then(() => next());
  } else {
    next();
  }
});

/**
 * Global router to run all individual middlewares if they exist.
 */
router.beforeEach(async (to, from) => {
  if (to.meta.middlewares) {
    const middlewares = Array.isArray(to.meta.middlewares)
      ? to.meta.middlewares
      : [to.meta.middlewares];

    for (const middleware of middlewares) {
      const result = await middleware(to, from);
      if (result !== undefined && result !== true) return result;
    }
  }
});

/**
 * Global router to run all individual middlewares if they exist.
 */
// router.beforeEach((to, from, next) => {
//
//     if (to.matched.some(record => record.meta.middlewares)) {
//
//         const middleware = Array.isArray(to.meta.middlewares) ? to.meta.middlewares : [to.meta.middlewares];
//
//         const context = { from, next, router, to };
//         const nextMiddleware = nextFactory(context, middleware, 1);
//
//         return middleware[0]({ ...context, next: nextMiddleware });
//     }
//
//     return next();
// });

/**
 * Run the default 'next()' callback and triggers the subsequent middleware function.
 *
 * @param context
 * @param middleware
 * @param index
 * @returns {*|(function(...[*]): void)}
 */
// function nextFactory(context, middleware, index) {
//
//     const subsequentMiddleware = middleware[index];
//
//     // If no subsequent Middleware exists, the default `next()` callback is returned
//     if (!subsequentMiddleware) return context.next;
//
//     return (...parameters) => {
//
//         // Run the default Vue Router 'next()' callback first
//         context.next(...parameters);
//
//         // Run the subsequent Middleware with a new 'nextMiddleware()' callback
//         const nextMiddleware = nextFactory(context, middleware, index + 1);
//         subsequentMiddleware({ ...context, next: nextMiddleware });
//     };
// }

export default router;
