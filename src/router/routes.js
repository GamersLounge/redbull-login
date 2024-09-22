// Middlewares
import { isGuest } from "@/router/middlewares/guest.js";
import { isAuthenticated } from "@/router/middlewares/authentication.js";
import { isAuthorized } from "@/router/middlewares/authorization.js";

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import WebLayout from "@/layouts/WebLayout.vue";
import MembersLayout from "@/layouts/MembersLayout.vue";

// Views
import LoginView from "@views/LoginView.vue";
import RegisterView from "@views/RegisterView.vue";
import ForgotPasswordView from "@views/ForgotPasswordView.vue";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@views/ProfileView.vue";
import ActivationsView from "@views/ActivationsView.vue";
import QuestsView from "@views/QuestsView.vue";
import UserGamesView from "@/views/UserGamesView.vue";

import QueuesView from "@views/QueuesView.vue";
import TriviaView from "@views/TriviaView.vue";

import NotFoundView from "@views/NotFoundView.vue";

// Dashboard views
import UsersView from "@views/dashboard/UsersView.vue";
import GamesView from "@views/dashboard/GamesView.vue";
import LogsView from "@views/dashboard/LogsView.vue";
import ScoresView from "@views/dashboard/ScoresView.vue";

// Roles
import roles from "@/helpers/roles";

// Application routes
const routes = [
  {
    path: "/",
    name: "Web",
    component: WebLayout,
    children: [
      {
        // path: "",
        // name: "home",
        // component: HomeView,
        // meta: { middlewares: [isAuthenticated] },
        path: "",
        component: MembersLayout,
        name: "members",
        meta: { middlewares: [isAuthenticated] },
        children: [
          {
            path: "",
            name: "home",
            component: HomeView,
          },
          {
            path: "profile",
            name: "profile",
            component: ProfileView,
          },
          {
            path: "/activations",
            name: "activations",
            component: ActivationsView,
            meta: { middlewares: [isAuthorized(roles.User)] },
          },
          {
            path: "/quests",
            name: "quests",
            component: QuestsView,
            meta: { middlewares: [isAuthorized(roles.User)] },
          },
          {
            path: "/userGames",
            name: "userGames",
            component: UserGamesView,
            meta: { middlewares: [isAuthorized(roles.User)] },
          },
        ],
      },
      {
        path: "/login",
        name: "login",
        component: LoginView,
        meta: { middlewares: [isGuest] },
      },
      {
        path: "/register",
        name: "register",
        component: RegisterView,
        meta: { middlewares: [isGuest] },
      },
      {
        path: "/forgot-password",
        name: "forgotpassword",
        component: ForgotPasswordView,
        meta: { middlewares: [isGuest] },
      },
      {
        path: "/queues",
        name: "queues",
        component: QueuesView,
        meta: {
          middlewares: [isAuthenticated, isAuthorized(roles.GameAdmin, roles.TriviaAdmin)],
        },
      },
      {
        path: "/trivia",
        name: "trivia",
        component: TriviaView,
        meta: { middlewares: [isAuthenticated, isAuthorized(roles.TriviaAdmin)] },
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardLayout,
    redirect: { name: "dashboard.users" },
    meta: { middlewares: [isAuthenticated, isAuthorized(roles.Administrator)] },
    children: [
      {
        path: "users",
        name: "dashboard.users",
        component: UsersView,
      },
      {
        path: "games",
        name: "dashboard.games",
        component: GamesView,
      },
      {
        path: "scores",
        name: "dashboard.scores",
        component: ScoresView,
      },
      {
        path: "/trivia",
        name: "dashboard.trivia",
        component: TriviaView,
      },
      {
        path: "/logs",
        name: "dashboard.logs",
        component: LogsView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

export default routes;
