<template>
  <div>
    <div class="m-padded-t m-padded-lr-large">
      <div class="ui action input">
        <input v-model="searchName" type="text" placeholder="输入应用的名称">
        <button class="ui button" @click="refreshTable">搜索</button>
      </div>
      <button class="ui blue right floated button" @click="saveApplication(null)">新增应用</button>
    </div>
    <div v-loading="loading">
      <table class="ui striped table">
        <thead>
          <tr class="center aligned">
            <th>名称</th>
            <th>描述</th>
            <th>用户ID</th>
            <th>是否共享</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="(application,i) in applicationList" :key="i">
          <tr class="center aligned">
            <td>{{ application.name }}</td>
            <td>{{ limitLength(application.description, 15) }}</td>
            <td>{{ application.userId }}</td>
            <td>
              <a v-if="application.share" class="ui green basic label">共享</a>
              <a v-else class="ui grey basic label">私有</a>
            </td>
            <td>{{ application.createTime }}</td>
            <td>{{ application.updateTime }}</td>
            <td>
              <button class="ui green basic button" @click="showApplicationDetail(application)">
                详情
              </button>
              <button class="ui blue basic button" @click="saveApplication(application)">
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
    <SaveApplicationModal ref="saveApplicationModal" @saveSuccess="refreshTable" />
    <ApplicationDetailModal ref="applicationDetailModal" />
  </div>
</template>

<script>
import PaginationMenu from '@/components/PaginationMenu'
import { getDefaultPageInformation } from '@/components/PaginationMenu/PaginationMenu'
import { showModal } from '@/components/Modal/Modal'
import SaveApplicationModal from '@/views/info-table/application-table/compoents/SaveApplicationModal'
import { searchApplication } from '@/api/dockerserve/applicationAPI'
import { limitLength } from '@/utils/publicUtils'
import ApplicationDetailModal from '@/views/info-table/application-table/compoents/ApplicationDetailModal'
import { loadingRequest } from '@/api'

export default {
  name: 'ApplicationTable',
  components: { ApplicationDetailModal, SaveApplicationModal, PaginationMenu },
  data() {
    return {
      pageInformation: getDefaultPageInformation(),
      applicationList: [],
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
      const { success, data } = await loadingRequest(searchApplication(this.searchName, page, pageSize), this)
      if (success) {
        this.pageInformation = data.pageInformation
        this.applicationList = data.list
      }
    },
    /**
     * 刷新表格数据
     */
    refreshTable() {
      this.updateCurrentPageData(this.pageInformation.currentPage, this.pageInformation.pageSize)
    },
    /**
     * 打开保存应用的弹出层
     * @param application 应用
     */
    saveApplication(application) {
      this.$refs.saveApplicationModal.init(application)
    },
    /**
     * 显示应用详情
     * @param application 应用
     */
    showApplicationDetail(application) {
      this.$refs.applicationDetailModal.init(application)
    }
  }
}
</script>

<style scoped>

</style>
