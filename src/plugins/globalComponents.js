import TextField from "@components/buttons/TextField.vue";
import Button from "@components/buttons/Button.vue";
import ErrorsInput from "@components/ErrorsInput.vue";

export default function registerGlobalComponents(app) {
  app.component("TextField", TextField);
  app.component("Button", Button);
  app.component("ErrorsInput", ErrorsInput);
}
