import SvgIcon from "@/components/SvgIcon/index.vue";

const globalCom = {
  SvgIcon,
};

export default {
  install(App) {
    for (let name in globalCom) {
      App.component(name, globalCom[name]);
    }
  },
};
