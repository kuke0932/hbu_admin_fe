<template>
  <div class="hello">
    <div class="upload">
      <div class="upload_warp_text">
        {{dataTips}}
        <!--选中{{dataImgList.length}}张文件，共{{bytesToSize(this.size)}}-->
      </div>

      <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>

      <div class="upload_warp">
        <div class="upload_warp_left" @click="fileClick">
          <img src="./upload.png">
        </div>
        <!--<div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">-->
        <!--或者将文件拖到此处-->
        <!--</div>-->
      </div>

      <!--<div class="upload_warp_img" v-show="dataImgList.length!=0">-->

      <template v-if="isSkillPage">
        <div class="upload_warp_img_div" v-for="(item,index) in dataImgList"
             @mouseenter.prevent="divOnMouseOver(item,index)" @mouseleave.prevent="divOnMouseOut(item,index)">
          <div class="upload_warp_img_div_top">
            <div class="upload_warp_img_div_text">
              {{item.file && item.file.name || item.attachmentName}}
            </div>
            <img src="./del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
          </div>
          <!--设为版型 begin-->
          <div id="div_bottom"
               :class="{ upload_warp_img_div_bottom_show_checked: item.checked, upload_warp_img_div_bottom: !item.checked, upload_warp_img_div_bottom_show: item.mouseover }"
               @click="setCarModel(item, index)">
            <div class="upload_warp_img_div_text">
              设为版型
            </div>
          </div>
          <!--设为版型 end-->
          <img :src="item.file && item.file.src || item.attachmentUrl" v-if="item.file && item.file.src || item.isImage">
          <img src="/static/images/wenjian.png" v-else>
        </div>
      </template>
      <template v-else>
        <div class="upload_warp_img_div" v-for="(item,index) in dataImgList">
          <div class="upload_warp_img_div_top">
            <div class="upload_warp_img_div_text">
              {{item.file && item.file.name || item.attachmentName}}
            </div>
            <img src="./del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
          </div>
          <img :src="item.file && item.file.src || item.attachmentUrl" v-if="item.file && item.file.src || item.isImage">
          <img src="/static/images/wenjian.png" v-else>
        </div>
      </template>
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import { upload, remove } from '@/api/file'

  export default {
    props: {
      imgList: {
        type: Array,
        required: true,
        default: []
      },
      modelFileId: {
        type: Number,
        required: false,
        default: 0
      },
      isSkillPage: {
        type: Boolean,
        required: false,
        default: false
      },
      tips: {
        type: String
      },
      limitSize: {
        type: Number,
        // 5MB
        default: 5 * 1024 * 1024
      },
      limitExceed: {
        type: Number,
        default: 5
      }
    },
    watch: {
      imgList() {
        this.dataImgList = this.imgList.map(img => {
          if ((img.attachmentUrl.toLowerCase().indexOf('.jpg') !== -1) ||
            (img.attachmentUrl.toLowerCase().indexOf('.png') !== -1) ||
            (img.attachmentUrl.toLowerCase().indexOf('.jpeg') !== -1) ||
            (img.attachmentUrl.toLowerCase().indexOf('.bmp') !== -1) ||
            (img.attachmentUrl.toLowerCase().indexOf('.gif') !== -1) ||
            (img.attachmentUrl.toLowerCase().indexOf('.tif') !== -1) ||
            (img.attachmentUrl.toLowerCase().indexOf('.psd') !== -1)) {
            img.isImage = true
          }
          if (this.modelFileId && this.modelFileId === img.attachmentId) {
            img.checked = true
          }
          return img
        })
      }
    },
    data() {
      return {
        dataImgList: [],
        dataModelFileId: this.modelFileId
      }
    },
    computed: {
      dataTips: function() {
        if (this.tips) {
          return this.tips
        } else {
          return '温馨提示：最多传' + this.limitExceed + '张图片哦！！！'
        }
      }
    },
    methods: {
      fileClick() {
        document.getElementById('upload_file').click()
      },
      fileChange(el) {
        if (el.target.files[0] && !el.target.files[0].size) return
        if (el.target.files[0].size > this.limitSize) {
          alert('文件超上限大小')
          return
        }
        if (this.dataImgList.length >= this.limitExceed) {
          alert('最多上传' + this.limitExceed + '个文件！')
          return
        }
        // 这里写调接口
        upload(el.target.files[0]).then(resp => {
          const id = resp.data.data
          this.fileList(el.target, id)
          el.target.value = ''
        })
      },
      fileList(fileList, id) {
        const file = fileList.files[0]
        this.fileAdd(file, id)
      },
      fileAdd(file, id) {
        // 判断是否为图片文件
        if (file.type.indexOf('image') === -1) {
          file.src = '/static/images/wenjian.png'
          this.dataImgList.push({
            file,
            attachmentId: id
          })
          this.$emit('fileListChange', this.dataImgList)
        } else {
          const that = this
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function() {
            file.src = this.result
            that.dataImgList.push({
              file,
              attachmentId: id
            })
            that.$emit('fileListChange', that.dataImgList)
          }
        }
      },
      fileDel(index) {
        remove(this.dataImgList[index].attachmentId).then(resp => {
          this.dataImgList.splice(index, 1)
          this.$emit('fileListChange', this.dataImgList)
        })
      },
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B'
        const k = 1000 // or 1024
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
      },
      dragenter(el) {
        el.stopPropagation()
        el.preventDefault()
      },
      dragover(el) {
        el.stopPropagation()
        el.preventDefault()
      },
      drop(el) {
        el.stopPropagation()
        el.preventDefault()
        this.fileList(el.dataTransfer)
      },
      divOnMouseOver(item, index) {
        item.mouseover = true
        this.$set(this.dataImgList, index, item)
      },
      divOnMouseOut(item, index) {
        item.mouseover = false
        this.$set(this.dataImgList, index, item)
      },
      // 设为版型
      setCarModel(item, index) {
        if (item.checked) {
          this.$emit('update:modelFileId', 0)
          item.checked = !item.checked
          this.$set(this.dataImgList, index, item)
        } else {
          this.$emit('update:modelFileId', item.attachmentId)
          item.checked = !item.checked
          this.$set(this.dataImgList, index, item)
          for (let i = 0; i < this.dataImgList.length; i++) {
            if (i === index) {
              continue
            }
            const _item = this.dataImgList[i]
            if (_item.checked) {
              _item.checked = false
              this.$set(this.dataImgList, i, _item)
            }
          }
        }
      }
    }
  }
</script>

<style>
  .upload_warp_img_div_del {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
  }

  .upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }

  .upload_warp_img_div_bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
    text-align: center;
    display: none;
  }

  .upload_warp_img_div_bottom_show {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
    text-align: center;
    display: block;
  }

  .upload_warp_img_div_bottom_show_checked {
    background-color: #42b983;
    text-indent: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
    text-align: center;
    display: block;
  }

  .upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .upload_warp_img_div {
    position: relative;
    height: 100px;
    width: 120px;
    border: 1px solid #ccc;
    margin: 14px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
  }

  .upload_warp_img {
    border-top: 1px solid #D2D2D2;
    padding: 14px 0 0 14px;
    overflow: hidden
  }

  .upload_warp_text {
    text-align: left;
    margin-bottom: 10px;
    padding-top: 3px;
    text-indent: 14px;
    border: 1px solid #ccc;
    font-size: 14px;
    color: #ff0000;
  }

  .upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    line-height: 130px;
    color: #999;
  }

  .upload_warp_left img {
    margin-top: 18px;
  }

  .upload_warp_left {
    float: left;
    width: 100%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    cursor: pointer;
  }

  .upload_warp {
    width: 120px;
    height: 100px;
    margin: 14px;
    float: left;
  }

  .upload {
    background-color: #fff;
  }

  .hello {
    text-align: center;
  }
</style>
