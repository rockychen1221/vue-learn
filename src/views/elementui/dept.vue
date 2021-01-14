
<template>
  <div>
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24" style="min-width: 260px">
        <el-row>
          <el-col :span="18" style="margin-bottom: -10px">
            <el-input
              v-model="deptName"
              placeholder="请输入部门名称"
              clearable
              size="small"
              prefix-icon="el-icon-search"
              style="margin-bottom: 20px"
            ></el-input>
          </el-col>
          <el-col :span="6" class="dd-text-right">
            <el-button type="primary" size="small" @click="addBt"
              >添加</el-button
            >
          </el-col>
        </el-row>
        <div class="dept-tip">拖拽可对其组织架构排序</div>
        <div>
          <el-tree
            :data="deptTree"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            highlight-current
            node-key="id"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
            @node-drop="handleDrop"
            draggable
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <el-tooltip
                class="item"
                effect="dark"
                :content="node.label"
                placement="top-start"
              >
                <span>{{ node.label | ellipsis(8) }}</span>
              </el-tooltip>
              <div>
                <el-button type="text" size="mini" @click="() => editBt(data)"
                  >编辑</el-button
                >
                <el-button type="text" size="mini" @click="() => deleteBt(data)"
                  >删除</el-button
                >
              </div>
            </span>
          </el-tree>
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-row :gutter="10" class="mb8">
          <el-card
            shadow="never"
            v-loading="loading"
            :body-style="{ padding: '0px' }"
          >
            <div slot="header" class="clearfix">
              <span>部门用户</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="editUserBt"
                >新增</el-button
              >
            </div>
            <div
              class="block"
              v-for="(user, index) in deptUserData.userList"
              :key="index"
            >
              <el-card shadow="hover">
                <el-avatar
                  shape="square"
                  :src="getUserAvatar(user.avatar)"
                ></el-avatar>
                <div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="user.userName"
                    placement="bottom-start"
                  >
                    <span>{{ user.userName | ellipsis(4) }}</span>
                  </el-tooltip>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <!--编辑弹窗-->
    <el-dialog
      v-if="dialogFormVisible"
      custom-class="dd-dialog-normal"
      width="30%"
      title="编辑"
      :visible.sync="dialogFormVisible"
    >
      <!--编辑表单-->
       
            部门编辑
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Dept",
  data() {
    return {
      deptName: undefined,
      // 查询表单数据
      formData: {},
      // 弹出框是否显示
      dialogFormVisible: false,
      dialogUserFormVisible: false,
      // 部门树选项
      deptTree: [
        {
          id: "1",
          pid: "",
          label: "A集团总部",
          children: [
            {
              id: "3",
              pid: "1",
              label: "C测试",
              children: [
                {
                  id: "4",
                  pid: "3",
                  label: "B-投资一队",
                },
              ],
            },
            {
              id: "5",
              pid: "1",
              label: "投资管理部投资管理部投资管理部7",
              children: [
                {
                  id: "6",
                  pid: "5",
                  label: "B-投资二队",
                },
              ],
            },
          ],
        },
        {
          id: "2",
          pid: "",
          label: "B集团总部",
          children: [
            {
              id: "7",
              pid: "2",
              label: "666",
            },
            {
              id: "8",
              pid: "2",
              label: "4测试",
            },
            {
              id: "9",
              pid: "2",
              label: "A-职能部门",
            },
          ],
        },
      ],
      checkedSet: [],
      /** tree默认参数配置 */
      defaultProps: {
        children: "children",
        label: "label",
      },
      loading: false,
      // 部门用户数据
      deptUserData: {},
      queryParams: {
        deptId: "",
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
    // 默认点击Tree第一个节点
    deptTree(val) {
      if (val) {
        this.$nextTick(() => {
          document.querySelector(".el-tree-node__content").click();
        });
      }
    },
  },
  mounted() {
    // 获取部门树数据
    this.getTreeDept();
  },
  methods: {
    /** 关闭编辑弹出框 */
    closeEditDialog() {
      this.dialogFormVisible = false;
      this.formData = "";
    },
    closeUserEditDialog() {
      this.dialogUserFormVisible = false;
      this.formData = "";
    },
    /** 查询部门下拉树结构 */
    getTreeDept() {},
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.getDeptUser();
    },
    // 拖拽事件
    handleDrop: async function (draggingNode, dropNode, dropType) {
      if (!dropType) {
        return false;
      }
      var paramData = [];
      // 当拖拽类型不为inner,说明只是同级或者跨级排序，只需要寻找目标节点的父ID，获取其对象以及所有的子节点，并为子节点设置当前对象的ID为父ID即可
      // 当拖拽类型为inner，说明拖拽节点成为了目标节点的子节点，只需要获取目标节点对象即可
      var data = dropType != "inner" ? dropNode.parent.data : dropNode.data;
      var nodeData =
        dropNode.level == 1 && dropType != "inner" ? data : data.children;
      // 设置父ID,当level为1说明在第一级，pid为空
      nodeData.forEach((element) => {
        element.pid = dropNode.level == 1 ? "" : data.id;
      });
      nodeData.forEach((element, i) => {
        var dept = {
          deptId: element.id,
          parentDeptId: element.pid,
          order: i,
        };
        paramData.push(dept);
      });
      // 得到这次操作需要变更的数据范围
      this.loading = true;
      // 请求后台批量处理即可...

      this.$message({
        message: `排序后的部门数据请前往浏览器console控制台查看`,
        type: "success",
      });
      console.log(JSON.stringify(paramData));
    },
    /** 获取部门下的用户 */
    getDeptUser() {
      this.$message({
        message: `获取部门所有用户[${this.queryParams.deptId}]`,
        type: "success",
      });
    },
    /** 添加部门 */
    addBt() {
      this.dialogFormVisible = true;
      this.formData = "";
    },
    /** 编辑部门用户 */
    editUserBt() {
      if (Object.keys(this.deptUserData).length == 0) {
        return;
      }
      this.dialogUserFormVisible = true;
      this.formData = this.deptUserData;
    },
    /** 修改部门 */
    editBt(row) {
      this.dialogFormVisible = true;
      this.formData = row.id;
    },
    /** 删除部门 */
    deleteBt(data) {
      console.log(data.id);
      this.$message({
        message: `当前删除的部门ID为[${data.id}]`,
        type: "success",
      });
    },
  },
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.block {
  padding: 15px 15px;
  text-align: center;
  font-size: 12px;
  display: inline-block;
  width: 135px;
}
.dept-tip {
  color: #8492a6;
  font-size: 13px;
  margin-bottom: 5px;
}
</style>

