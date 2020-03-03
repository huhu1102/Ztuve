<!--
<template>
   <div>
     <input style=""
            @input="handleInput"
     >
     </input>
   </div>
  <el-input>

  </el-input>
</template>
<script>
  export  default {
    name:'ZtInput',
    componentName: 'ZtInput',
    data() {
      return {
        textareaCalcStyle: {},
        isComposing: false,
      };

    },
    props: {
      value: [String, Number],
    },
    computed:{

    },
    watch:{

    },
    methods:{
    handleInput(event){

      // should not emit input during composition
      if (this.isComposing) return;

      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return;

      this.$emit('input', event.target.value);

      // ensure native input value is controlled
      this.$nextTick(this.setNativeInputValue);

    }

    }


  }
</script>
-->
