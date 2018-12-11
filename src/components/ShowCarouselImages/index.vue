<template>
  <el-dialog
    title="查看图片"
    :visible.sync="_visible"
    width="484px"
    height="600px"
    @close="close"
    >
    <div class="block">
      <el-carousel props="urls" trigger="click" :autoplay=false height="450">
        <el-carousel-item v-for="(item, index) in this.imgList" :key="item + index">
          <img :src="item" style="width: 445px; height: 300px">
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
        default: false
      },
      imgList: {
        type: Array,
        required: true,
        default: []
      }
    },
    data() {
      return {
      }
    },
    computed: {
      _visible: {
        get: function() {
          return this.visible
        },
        set: function(val) {
        }
      }
    },
    methods: {
      close() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style>
</style>
