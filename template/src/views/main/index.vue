<template>
	<el-row class="container">
		<el-progress class="progress" v-show="loadProgress > 0 && loadProgress < 100" :percentage="loadProgress" :stroke-width="3" status="exception" :show-text="false"></el-progress>
		<!-- 头部信息-->
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<img src="../../assets/img/logo.png" @click="collapse">
				<a @click="collapse">\{{collapsed?'':sysName}}</a>
			</el-col>
			<el-col :span="10">
				<div class="tools" id="header-logo">
					<!-- <img src="../../assets/img/logo.jpg"> -->
				</div>
			</el-col>
			<!--用户登录信息-->
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> \{{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router :collapse="collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="item.children && !item.onlyPage">
							<template slot="title"><i :class="item.iconCls"></i> <span slot="title">\{{item.name}}</span></template>
							<el-menu-item v-for="child in item.children" :index="item.path + '/' + child.path" :key="child.path" v-if="!child.hidden">\{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-else-if="item.onlyPage" :index="item.path + '/' + item.children[0].path"><i :class="item.iconCls"></i><span slot="title">\{{item.name}}</span></el-menu-item>
						<el-menu-item v-else :index="item.path"><i :class="item.iconCls"></i><span slot="title">\{{item.name}}</span></el-menu-item>
					</template>
				</el-menu>

			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">\{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								\{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
export default {
	data () {
		return {
			sysName: this.$store.state.systemName,
			collapsed: false,
			sysUserName: '',
			sysUserAvatar: '',
			loadProgress: 0,
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			}
		};
	},
	beforeRouteUpdate (to, from, next) {
		console.log(22222222);
		this.startProgress();
		next();
	},
	methods: {
		startProgress() {
			if (this.loadProgress > 100) {
				this.loadProgress = 0;
				return;
			}
			setTimeout(() => {
				this.loadProgress += 3;
				this.startProgress();
			}, this.loadProgress / 3);
		},
		onSubmit() {
			console.log('submit!');
		},
		handleopen() {
			// console.log('handleopen');
		},
		handleclose() {
			// console.log('handleclose');
		},
		handleselect (a, b) {
		},
		// 退出登录
		logout () {
			var _this = this;
			this.$confirm('确认退出吗?', '提示', {
				// type: 'warning'
			}).then(() => {
				sessionStorage.removeItem('user');
				_this.$router.push('/login');
			}).catch(() => {
			});
		},
		// 折叠导航栏
		collapse () {
			this.collapsed = !this.collapsed;
		},
		showMenu (i, status) {
			this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
		}
	},
	mounted() {
		var user = sessionStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			this.sysUserName = user.name || '';
			this.sysUserAvatar = user.avatar || '';
		}
	}
};
</script>

<style scoped>
@import 'main.css';
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
	.progress {
		position: fixed;
		width: 100%;
		top: 0px;
	}
	.header {
		height: 60px;
		line-height: 60px;
		background: var(--color-primary);
		color:#fff;
		.userinfo {
			text-align: right;
			padding-right: 35px;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color:#fff;
				img {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.logo {
			//width:230px;
			height:60px;
			font-size: 22px;
			border-color: rgba(238,241,146,0.3);
			// border-right-width: 1px;
			// border-right-style: solid;
			img {
				cursor:pointer;
				width: 40px;
				float: left;
				margin: 15px 10px 10px 10px;
			}
			.txt {
				color:#fff;
			}
		}
		.logo-width{
			// width:230px;
		}
		.logo-collapse-width{
			border-right-width: 1px;
		  border-right-style: solid;
			width:64px;
			height:68px;
		}
		.tools{
			padding: 0px 23px;
			width:14px;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}
	.main {
		display: flex;
		// background: #324057;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
		.content-container {
			// background: #f1f2f7;
			flex:1;
			// position: absolute;
			// right: 0px;
			// top: 0px;
			// bottom: 0px;
			// left: 230px;
			overflow-y: scroll;
			padding: 20px;
			.breadcrumb-container {
				//margin-bottom: 15px;
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.content-wrapper {
				background-color: #fff;
				box-sizing: border-box;
			}
		}
	}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 230px;
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
