<template>
    <div>
        <el-breadcrumb separator="/" class = "breadcrumb-fix">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                        <el-input placeholder="请输入内容">
                        <el-button slot="append">搜索</el-button>
                </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table
            :data = "usersInfoBeta">
                <el-table-column
                    label="#"
                    type = "index">
                </el-table-column>
                <el-table-column
                    label = "姓名"
                    prop = "username">
                </el-table-column>
                 <el-table-column
                    label = "邮箱"
                    prop = "email">
                </el-table-column>
                 <el-table-column
                    label = "电话"
                    prop = "mobile"> 
                </el-table-column>
                 <el-table-column
                    label = "角色"
                    prop = "rolename">
                </el-table-column>
                 <el-table-column
                    label = "状态">
                    <template
                        v-slot = "scope">
                        <el-switch v-model="scope.row.state"></el-switch>
                    </template>
                </el-table-column>
                 <el-table-column
                    label = "操作">
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>
<script>
export default {
    data() {
        return {
            queryParams: {
                query : '九头蛇万岁',
                pagenum : 1,
                pagesize : 2
            },
            usersInfo: [],
            usersInfoBeta: [
                {
                    username : 'zhang',
                    email : 'cuttheflower@126.com',
                    mobile : '121212121',
                    rolename : '管理员',
                    state: true
                }
            ],
            total: 0
        }
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            const query = new Promise((resolve, reject) => {
                const res = this.$http.get('users', {params: this.queryParams});
                resolve(res);
            });
            query.then(res => {
                const data = res.data;
                // console.log(data);
                if (data.meta.status !== 200) {
                    this.$message({
                        message: '用户列表获取失败',
                        type: 'error'
                    });
                    return;
                }
                this.usersInfo = data.data.users;
                this.total = data.data.total;
            })
        }
    }
}
</script>