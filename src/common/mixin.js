import BackTop from "components/content/backTop/BackTop.vue"
import { BACK_POSITION } from "common/const.js"
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > BACK_POSITION
    }
  }
}
