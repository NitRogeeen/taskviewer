<template>
  <el-card>
    <el-row>{{ setTaskDate }}</el-row>
    <el-row>
      <el-col :span="24">
        <el-input placeholder="Please enter your task" v-model="taskName"></el-input>
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
          <el-input v-model="form.taskName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editDialogSubmit">Submit</el-button>
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
        taskName: '',
        taskList: [],
        form: {
          id: '',
          date: '',
          taskName: ''
        },
        formLabelWidth: '120px',
        dialogEditFormVisible: false
      }
    },
    computed: {
      setTaskDate () {
        this.reloadTask()
        return moment(this.mDate).format('YYYY-MM-DD')
      }
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
        console.log('insertTask: ' + this.mDate)
        this.$db.insert({date: moment(this.mDate).toDate(), checked: false, task: this.taskName})
        this.taskName = ''
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
        console.log('reload')
        let self = this
        this.$db.find({date: moment(self.mDate).toDate()}, function (err, docs) {
          self.taskList = docs
          console.log(err)
        })
      },
      updateTask () {
        let self = this
        this.$db.update({_id: self.form.id}, {$set: {date: moment(self.form.date).toDate(), task: self.form.taskName}}, {}, function (err, num) {
          console.log(err)
          console.log(num)
        })
        console.log('updateTask')
        this.reloadTask()
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
          self.form.id = docs[0]._id
          self.form.date = moment(docs[0].date).format('YYYY-MM-DD')
          self.form.taskName = docs[0].task
        })
        this.dialogEditFormVisible = true
      },
      editDialogSubmit () {
        this.updateTask()
        this.dialogEditFormVisible = false
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