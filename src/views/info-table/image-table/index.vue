<template>
  <div>
    <div class="m-padded-t m-padded-lr-large">
      <div class="ui action input">
        <input v-model="searchName" type="text" placeholder="输入镜像的名称">
        <button class="ui button" @click="refreshTable">搜索</button>
      </div>
      <button class="ui blue right floated button" @click="saveImage(null)">新增镜像</button>
    </div>
    <div v-loading="loading">
      <table class="ui striped table">
        <thead>
          <tr class="center aligned">
            <th>名称</th>
            <th>版本</th>
            <th>描述</th>
            <th>是否共享</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="(image,i) in imageList" :key="i">
          <tr class="center aligned">
            <td>{{ image.name }}</td>
            <td>{{ image.version }}</td>
            <td>{{ limitLength(image.description, 15) }}</td>
            <td>
              <a v-if="image.share" class="ui green basic label">共享</a>
              <a v-else class="ui grey basic label">私有</a>
            </td>
            <td>{{ image.createTime }}</td>
            <td>
              <button class="ui green basic button" @click="showImageDetail(image)">
                详情
              </button>
              <button class="ui blue basic button" @click="saveImage(image)">
                修改
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="center aligned" colspan="8">
              <PaginationMenu :page-information="pageInformation" @currentChange="updateCurrentPageData" />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
    <SaveImageModal ref="saveImageModal" @saveSuccess="refreshTable" />
    <ImageDetailModal ref="imageDetailModal" />
  </div>
</template>

<script>
import PaginationMenu from '@/components/PaginationMenu'
import { getDefaultPageInformation } from '@/components/PaginationMenu/PaginationMenu'
import { showModal } from '@/components/Modal/Modal'
import { searchImage } from '@/api/dockerserve/imageAPI'
import { limitLength } from '@/utils/publicUtils'
import SaveImageModal from '@/views/info-table/image-table/compoents/SaveImageModal'
import ImageDetailModal from '@/views/info-table/image-table/compoents/ImageDetailModal'
import { loadingRequest } from '@/api'

export default {
  name: 'ImageTable',
  components: { ImageDetailModal, SaveImageModal, PaginationMenu },
  data() {
    return {
      pageInformation: getDefaultPageInformation(),
      imageList: [],
      loading: false,
      searchName: ''
    }
  },
  mounted() {
    this.refreshTable()
  },
  methods: {
    showModal,
    limitLength,
    /**
     * 更新当前分页数据
     * @param page 当前页
     * @param pageSize 每页大小
     */
    async updateCurrentPageData(page = 1, pageSize = 5) {
      const { success, data } = await loadingRequest(searchImage(this.searchName, page, pageSize), this)
      if (success) {
        this.pageInformation = data.pageInformation
        this.imageList = data.list
      }
    },
    /**
     * 刷新表格数据
     */
    refreshTable() {
      this.updateCurrentPageData(this.pageInformation.currentPage, this.pageInformation.pageSize)
    },
    /**
     * 打开保存镜像的弹出层
     * @param image 镜像
     */
    saveImage(image) {
      this.$refs.saveImageModal.init(image)
    },
    /**
     * 显示镜像详情
     * @param image 镜像
     */
    showImageDetail(image) {
      this.$refs.imageDetailModal.init(image)
    }
  }
}
</script>

<style scoped>

</style>
