<template>
  <el-card>
    <el-row>{{ taskDate }}</el-row>
    <el-row>
      <el-col :span="24">
        <el-input placeholder="Please enter your task" v-model="form.taskName"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="4">
        <el-button type="primary" style="width: 100%;" @click="insertTask" round>add</el-button>
      </el-col>
    </el-row>
    <el-table :data="taskList" :show-header="false" style="width: 100%;" :row-class-name="tableRowClassName">
      <el-table-column align="center" width="50px">
        <template slot-scope="record">
          <!-- <el-switch v-model="record.row.checked" active-color="#13ce66" inactive-color="#ff4949"></el-switch> -->
          <el-checkbox v-model="record.row.checked" v-on:change="updateChecked(record.row._id, record.row.checked)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="task" width="auto"></el-table-column>
      <el-table-column align="center" width="50px">
        <template slot-scope="record">
          <el-button type="default" icon="el-icon-edit" @click="showEditDialog(record.row._id)" size="mini" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" width="50px">
        <template slot-scope="record">
          <el-button type="danger" icon="el-icon-delete" @click="deleteTask(record.row._id)" size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Edit your task" :visible.sync="dialogEditFormVisible">
      <el-form :model="form">
        <el-form-item label="Date" :label-width="formLabelWidth">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Task name" :label-width="formLabelWidth">
          <el-input v-model="form.task" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertTask">Submit</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'task-card',
    props: ['mDate'],
    data () {
      return {
        taskDate: '',
        mTaskDate: this.mDate,
        taskList: [],
        form: {
          date: '',
          taskName: ''
        },
        formLabelWidth: '120px',
        dialogEditFormVisible: false
      }
    },
    mounted () {
      this.taskDate = moment(this.mTaskDate).format('YYYY-MM-DD')
      this.reloadTask()
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      tableRowClassName ({row, rowIndex}) {
        if (row.checked) {
          return 'disable-row'
        }
        return ''
      },
      insertTask () {
        // this.taskList.push({checked: false, task: this.form.taskName})
        this.$db.insert({date: moment(this.mTaskDate).toDate(), checked: false, task: this.form.taskName})
        this.form.taskName = ''
        this.dialogEditFormVisible = false
        this.reloadTask()
      },
      deleteTask (id) {
        this.$confirm('Are you sure to remove this task?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let self = this
          this.$db.remove({_id: id}, {}, function (err, num) {
            console.log(num)
            if (err === null) {
              self.$message({
                type: 'success',
                message: 'Delete completed.'
              })
            } else {
              self.$message.error('Error!')
            }
          })
          this.reloadTask()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled.'
          })
        })
      },
      reloadTask () {
        let self = this
        this.$db.find({}, function (err, docs) {
          self.taskList = docs
          console.log(err)
        })
      },
      updateChecked (id, checked) {
        this.$db.update({_id: id}, {$set: {checked: checked}}, {}, function (err, num) {
          console.log(err)
          console.log(num)
        })
        this.reloadTask()
      },
      showEditDialog (id) {
        let self = this
        this.$db.find({_id: id}, function (err, docs) {
          console.log(err)
          self.form.date = moment(docs[0].date).format('YYYY-MM-DD')
          self.form.task = docs[0].task
        })
        this.dialogEditFormVisible = true
        console.log(id)
      }
    }
  }
</script>

<style>
  .el-table .disable-row {
    background: lightgray;
    text-decoration: line-through;
  }
</style>