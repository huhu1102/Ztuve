<template>
  <div class="el-step is-horizontal is-center" :style="style">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "SubSteps",
    data() {
      return {};
    },
    computed: {
      space() {
        const { isSimple, $parent: { space } } = this;
        return isSimple ? "" : space;
      },
      style: function() {
        const style = {};
        const parent = this.$parent;
        const len = parent.steps.length;

        const space =
          typeof this.space === "number"
            ? this.space + "px"
            : this.space
            ? this.space
            : 100 / (len - (this.isCenter ? 0 : 1)) + "%";
        style.flexBasis = space;
        if (this.isVertical) return style;
        if (this.isLast) {
          style.maxWidth = 100 / this.stepsCount + "%";
        } else {
          style.marginRight = -this.$parent.stepOffset + "px";
        }
        return style;
      }
    }
  };
</script>

<style scoped>
  .box-container-body {
    padding: 24px;
    background: #fff;
  }
  .is-center {
    text-align: center;
    font-size: 12px;
    white-space: normal;
  }
</style>
