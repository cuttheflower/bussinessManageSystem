<template>
    <el-container class="home_container">
        <el-header class="home_header">
            <div style="display: flex;
                            display: -webkit-flex;
                                flex-direction: row;
                                    align-items:center;">
                <img src="../assets/heima.png">
                <span style="margin-left: 10px;">电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logOut">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="menuCollapse">|||</div>
                 <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409eff"
                    :unique-opened = "true"
                    :collapse = "isCollapse"
                    :collapse-transition = "false"
                    router
                    :default-active="activePath">
                    <el-submenu :index="item.id + ''" v-for = "item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="[listForIcon[item.id], iconSTwo]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                       <el-menu-item :index="'/' + subitem.path" v-for = "subitem in item.children" :key = "subitem.id" @click="saveActiveState('/' + subitem.path)">
                           <template slot="title">
                             <i :class="[iconSOne, iconSTwo]"></i>
                             <span>{{subitem.authName}}</span>
                           </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>  
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            activePath: '',
            isCollapse: false,
            iconSOne:'iconfont iconmodular',
            iconSTwo: 'icon-fix',
            menuList: [],
            listForIcon: {}
        }
    },
    created() {
        this.getMenu();
        this.getActiveState();
    },
    methods: {
        //保存当前被激活的菜单项
        getActiveState() {
            this.activePath = sessionStorage.getItem('path');
        },
        saveActiveState(path) {
            window.sessionStorage.setItem('path', path);
            this.activePath = path;
        },
        menuCollapse() {
            //实现侧边栏的折叠
            this.isCollapse = !this.isCollapse;
        },
        logOut() {
            sessionStorage.clear();
            this.$router.push('/login');
        },
        getMenu() {
            const getMenu = new Promise((resolve, reject) => {
                const res = this.$http.get('menus');
                resolve(res);
            });
            getMenu.then(res => {
                const data = res.data;
                //console.log(data);
                if (data.meta.status !== 200) return this.$message({
                    message: data.meta.msg,
                    type: 'error'
                });
                this.menuList = data.data;
                this.listForIcon = this.getItemId(data.data)
            });
        },
        getItemId(menuList) {
            let iconList = {};
            let iconName = ['iconfont iconuser', 'iconfont iconlock', 'iconfont iconlayers', 'iconfont iconfile', 'iconfont iconsave'];
            menuList.forEach(function(elem, index, arr) {
                let key = elem.id;
                let value = iconName[index];
                iconList[key] = value;
            })
            return iconList
        }
    }
}
</script>
<style scoped>
.toggle-button {
    background-color: #373D41;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
.icon-fix {
    margin-right: 10px;
}
.el-header {
    background-color: #373d41;
}
.el-aside {
    background-color: #333744;
    
}
.el-aside .el-menu {
    border-right: none;
}
.el-main {
    background-color: #eaedf1;
}
.home_container {
    width: 100%;
    height: 100%;
}
.home_header {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 20px;
}
.el-button {
    height: 40px;
    width: 80px;
}
</style>