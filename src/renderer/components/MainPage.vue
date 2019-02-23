<template>
  <el-container>
    <el-aside width="70px">
      <el-menu default-active="1" style="height: 100vh;" :collapse="true">
        <el-menu-item index="1" @click="">
          <i class="el-icon-date"></i>
          <span slot="title">Calendar</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="daterange-picker">
          <el-date-picker
            v-model="value7"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date">
          </el-date-picker>
        </div>
      </el-header>
      <el-main>
        <task-card v-bind="mDate"></task-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import TaskCard from './TaskCard'
  import moment from 'moment'
  export default {
    name: 'main-page',
    components: { TaskCard },
    data () {
      return {
        taskList: [],
        mDate: {},
        value7: ''
      }
    },
    mounted () {
      this.setDate(moment())
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      setDate (mDate) {
        console.log(mDate.format('YYYYMMDD'))
        this.mDate = mDate
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 10px;
  }
  .el-menu {
    position: fixed;
    z-index: 999;
  }
  .el-date-editor .el-range-separator {
    width: auto;
  }
  .daterange-picker {
    margin-top: 20px;
  }
</style>
