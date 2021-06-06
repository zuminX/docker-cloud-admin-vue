<template>
  <div class="container">
    <div class="information">
      <div class="about">
        <div class="about-title">服务器</div>
        <div class="about-avatar">
          <img src="../../../assets/images/resources/Docker.png" class="about-avatar-img">
        </div>
        <div class="about-influence">
          <div class="about-influence-item">
            <div class="about-influence-num color4">{{ version.dockerVersion }}</div>
            <div class="about-influece-label">docker版本</div>
          </div>
        </div>
        <div class="server-box">
          <div class="about-influence">
            <div class="about-influence-item">
              <div class="about-influence-num color1">{{ info.serverVersion }}</div>
              <div class="about-influece-label">server版本</div>
            </div>
          </div>
          <div class="about-influence">
            <div class="about-influence-item">
              <div class="about-influence-num color1">{{ version.operatingSystem }}</div>
              <div class="about-influece-label">操作系统</div>
            </div>
          </div>
          <div class="about-influence">
            <div class="about-influence-item">
              <div class="about-influence-num color1">{{ info.dockerRootDir }}</div>
              <div class="about-influece-label">DockerRootDir</div>
            </div>
          </div>
          <div class="about-influence">
            <div class="about-influence-item">
              <div class="about-influence-num color1">{{ info.cpus }}核</div>
              <div class="about-influece-label">cpu</div>
            </div>
            <div class="about-influence-item">
              <div class="about-influence-num color1">{{ formatMemory(info.memory) }}</div>
              <div class="about-influece-label">内存</div>
            </div>
          </div>
          <div class="about-influence">
            <div class="about-influence-item">
              <div class="about-influece-label">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
      <div class="about">
        <div class="about-title">容器</div>
        <div class="about-avatar">
          <img src="../../../assets/images/resources/container.png" class="about-avatar-img">
        </div>
        <div class="about-influence">
          <div class="about-influence-item">
            <div class="about-influence-num color1">{{ containerStats.runningTotal }}</div>
            <div class="about-influece-label">运行中</div>
          </div>
          <div class="about-influence-item">
            <div class="about-influence-num color2">{{ containerStats.exitedTotal }}</div>
            <div class="about-influece-label">已停止</div>
          </div>
          <div class="about-influence-item">
            <div class="about-influence-num color3">{{ containerStats.total }}</div>
            <div class="about-influece-label">总数</div>
          </div>
        </div>
        <el-tabs v-model="activeName" class="about-tabs">
          <el-tab-pane label="运行中" class="about-tabs-item" name="one">
            <div v-loading="containerLoading" class="about-container-box">
              <el-scrollbar style="height:100%">
                <ul class="about-list" style="overflow: auto;">
                  <li v-for="item of runningContainer" :key="item" class="about-list-item">
                    <el-tooltip effect="dark" placement="top-start">
                      <div slot="content">{{ item }}</div>
                      <span>{{ item }}</span>
                    </el-tooltip>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已停止" class="about-tabs-item" name="two">
            <div v-loading="containerLoading" class="about-container-box">
              <el-scrollbar style="height:100%">
                <ul class="about-list" style="overflow: auto;">
                  <li v-for="item of exitedContainer" :key="item" class="about-list-item">
                    <el-tooltip effect="dark" placement="top-start">
                      <div slot="content">{{ item }}</div>
                      <span>{{ item }}</span>
                    </el-tooltip>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </el-tab-pane>
          <el-tab-pane label="所有" class="about-tabs-item" name="three">
            <div v-loading="containerLoading" class="about-container-box">
              <el-scrollbar style="height:100%">
                <ul class="about-list" style="overflow: auto;">
                  <li v-for="item of allContainer" :key="item" class="about-list-item">
                    <el-tooltip effect="dark" placement="top-start">
                      <div slot="content">{{ item }}</div>
                      <span>{{ item }}</span>
                    </el-tooltip>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="about">
        <div class="about-title">镜像</div>
        <div class="about-avatar">
          <img src="../../../assets/images/resources/image.png" class="about-avatar-img">
        </div>
        <div class="about-influence">
          <div class="about-influence-item">
            <div class="about-influence-num color3">{{ imageList.length }}</div>
            <div class="about-influece-label">总数</div>
          </div>
        </div>
        <div v-loading="imageLoading" class="about-box">
          <el-scrollbar style="height:100%">
            <ul class="about-list" style="overflow: auto;">
              <li v-for="item of imageList" :key="item" class="about-list-item">
                <el-tooltip effect="dark" placement="top-start">
                  <div slot="content">{{ item }}</div>
                  <span>{{ item }}</span>
                </el-tooltip>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStats } from '@/api/dockeradmin/dashboardAPI'
import { getAllImage } from '@/api/dockeradmin/imageAPI'
import { getAllContainer } from '@/api/dockeradmin/containerAPI'
import { loadingRequest } from '@/api'

export default {
  name: 'ResourcesDashboard',
  data() {
    return {
      activeName: 'one',
      imageList: [],
      imageLoading: true,
      containerLoading: true,
      allContainer: [],
      runningContainer: [],
      exitedContainer: [],
      containerStats: {
        total: 0,
        createdTotal: 0,
        runningTotal: 0,
        pausedTotal: 0,
        restartingTotal: 0,
        exitedTotal: 0
      },
      imageStats: {
        total: 0,
        danglingTotal: 0
      },
      networkStats: {
        total: 0,
        buildInTotal: 0,
        customTotal: 0
      },
      volumeStats: {
        total: 0,
        warningTotal: 0
      },
      version: {
        dockerVersion: '',
        apiVersion: '',
        gitCommit: '',
        operatingSystem: ''
      },
      info: {
        name: '',
        storageDriver: '',
        kernelVersion: '',
        serverVersion: '',
        dockerRootDir: '',
        cpus: 0,
        memory: 0
      }
    }
  },
  mounted() {
    this.handleRefresh()
  },
  methods: {
    /**
     * 刷新数据
     */
    handleRefresh() {
      this.getStats()
      this.getImageList()
      this.getContainerList()
    },
    /**
     * 获取统计信息
     */
    async getStats() {
      const { data, success } = await getStats()
      if (success) {
        this.containerStats = data.containerStats
        this.imageStats = data.imageStats
        this.networkStats = data.networkStats
        this.volumeStats = data.volumeStats
        this.version = data.version
        this.info = data.info
      }
    },
    /**
     * 获取镜像列表
     */
    async getImageList() {
      const { data, success } = await loadingRequest(getAllImage(), this, 'imageLoading')
      if (success) {
        this.imageList = data.map(image => image.repoTags[0]).filter(tag => tag)
      }
    },
    /**
     * 获取容器列表
     */
    async getContainerList() {
      const { data, success } = await loadingRequest(getAllContainer(), this, 'containerLoading')
      if (success) {
        const containerList = data.filter(container => container.names.length > 0).map(function(container) {
          return {
            name: container.names[0].substring(1),
            state: container.state
          }
        })
        this.allContainer = containerList.map(container => container.name)
        this.runningContainer = containerList.filter(container => container.state === 'running').map(container => container.name)
        this.exitedContainer = containerList.filter(container => container.state === 'exited').map(container => container.name)
      }
    },
    /**
     * 格式化显示内存
     */
    formatMemory(memory) {
      const result = memory / 1000000000.0
      return result.toPrecision(4) + ' G'
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  height: 100%;

  .information {
    height: 100%;
    display: flex;

    .about {
      min-width: 0;
      width: 33%;
      height: 100%;
      margin: 25px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 14px 0 rgba(243, 243, 243, 1);
      border-radius: 10px;

      .server-box {
        height: 400px;
        width: 100%;
        margin-top: 50px;
      }

      .about-title {
        margin: 20px 0 10px 20px;
        height: 22px;
        line-height: 22px;
        font-weight: 500;
        color: #596C8E;
        font-size: 16px;
      }

      .about-avatar {
        width: 120px;
        height: 120px;
        margin: 0 auto 30px;

        .about-avatar-img {
          width: 120px;
          box-shadow: 0 0 30px 0 rgb(247, 247, 248);
        }
      }

      .about-influence {
        display: flex;
        justify-content: space-between;
        padding: 0 30px 30px;

        .about-influence-item {
          display: block;
          margin: auto;
          flex-direction: column;
          align-items: center;
          text-align: center;

          .about-influence-num {
            font-size: 30px;
            line-height: 34px;

            &.color1 {
              color: #00C292;
            }

            &.color2 {
              color: rgb(254, 8, 28);
            }

            &.color3 {
              color: #03A9F3;
            }

            &.color4 {
              color: rgb(241, 186, 35);
            }
          }

          .about-influece-label {
            font-size: 14px;
            font-weight: 400;
            color: #8C98AE;
            line-height: 17px;
            margin: auto;
          }
        }
      }

      .about-box {
        height: 450px;
        width: 100%;
        text-indent: 10px;

        .el-scrollbar {
          height: 100%;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;

          .about-list {
            margin: 0;
            padding: 0;
            overflow: hidden;

            .about-list-item {
              width: 100%;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              background: rgba(255, 255, 255, 1);
              padding: 0 0;
              color: #3963BC;
              overflow: hidden; /*超出部分隐藏*/
              white-space: nowrap; /*不换行*/
              text-overflow: ellipsis; /*超出部分文字以...显示*/
            }
          }
        }
      }

      .about-container-box {
        height: 377px;
        width: 100%;
        text-indent: 10px;

        .el-scrollbar {
          height: 100%;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;

          .about-list {
            margin: 0;
            padding: 0;
            overflow: hidden;

            .about-list-item {
              width: 100%;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              background: rgba(255, 255, 255, 1);
              padding: 0 0;
              color: #3963BC;
              overflow: hidden; /*超出部分隐藏*/
              white-space: nowrap; /*不换行*/
              text-overflow: ellipsis; /*超出部分文字以...显示*/
            }
          }
        }
      }

      .about-container-box /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .about-box /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .about-tabs {
        margin-bottom: 20px;
      }

      .about-tabs /deep/ .is-top {
        display: flex;
        flex: auto;
        justify-content: space-around;

        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          color: aliceblue;
        }
      }

      .about-tabs /deep/ .el-tabs__content {
        text-indent: 20px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .container {
    display: none;
  }
  .container {
    width: 100%;
  }
  .container {
    width: 32%;

    &:last-child {
      display: none;
    }
  }
  .container .information .about {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .container .lin-info .lin-info-left {
    width: 100%;
  }
}

.el-scrollbar__wrap.default-scrollbar__wrap {
  overflow-x: auto;
}
</style>
