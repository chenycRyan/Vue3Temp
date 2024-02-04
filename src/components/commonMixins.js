import { apiFun } from '@/api/apiFun'
export default {
  data() {
    return {
      pageOptions: {
        size: 10,
        page: 0,
        sort: 'createdTime,DESC'
      }
    }
  },
  mounted() {
    this.getList()
  },
  computed: {
    api() {
      return apiFun(this.apiUrl)
    },
    formData() {
      let templist = []
      const tempColumn = this.tableColumn.filter(item => item.type != null || item.type !== undefined)
      if (this.dialogForm.rowClass === 'column') {
        templist.push(tempColumn)
      } else if (this.dialogForm.rowClass === 'two-column') {
        templist = this.generateRow(tempColumn, 2)
      } else {
        templist = this.generateRow(tempColumn, 3)
      }
      return templist
    }
  },
  methods: {
    generateRow(data, len) {
      const tempRow = []
      let index = 0
      while (index < data.length) {
        tempRow.push(data.slice(index, (index += len)))
      }
      return tempRow
    },
    searchFun(obj) {
      if (obj) {
        this.pageOptions = { ...this.pageOptions, ...obj }
      }
      this.getList()
    },
    getList() {
      this.tableParams.loading = true
      const parama = {
        ...this.queryForm
      }
      /*  parama.pageNumber = this.pageOptions.size
            parama.pageSize = this.pageOptions.page */
      parama.page = this.pageOptions.page
      parama.size = this.pageOptions.size
      this.api
        .getByPage(parama)
        .then(res => {
          if (res) {
            this.tableData = res.content
            this.tableParams.total = res.totalElements
          }
        })
        .finally(() => {
          this.tableParams.loading = false
        })
    },
    handleAdd() {
      this.dialogForm.show = true
      this.dialogForm.title = '新增' + this.dialogForm.staticTitle
    },
    handleDelete(row) {
      this.api
        .deleteById(row.id)
        .then(() => {
          this.$message.success('删除成功!')
          this.getList()
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    handleEdit(data) {
      this.editRow(data)
    },
    handleClick() {
      this.pageOptions.page = 0
      this.getList()
    },
    handleClose() {
      this.getList()
      this.dialogForm.show = false
    },
    handleSubmit(data) {
      this.dialogForm.btnLoading = true
      const submitApi = this.dialogForm.title.includes('新增') ? this.api.addData(data) : this.api.editData(data)

      submitApi
        .then(() => {
          this.$refs['editableDialogRef'].resetForm()
          this.handleClose()
          this.$message.success(`${this.dialogForm.title}成功`)
        }) //新增捕获错误
        .catch(error => {
          this.$message.error(error)
        }) //新增
        .finally(() => {
          this.dialogForm.btnLoading = false
        })
    }
  }
}
