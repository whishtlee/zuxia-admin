<template>
	<div class="menu-wrapper">
		<el-submenu :index="s.title" v-for="s in routes" :key="s.id">
			<template slot="title">
				<router-link :to="'/account/class/' + s.id  + '/' + s.title">{{s.title}}</router-link>
			</template>
			<el-submenu :index="g.title" v-for="g in s.grade" :key="g.id">
				<template slot="title">
					<router-link :to="'/account/class/' + g.id + '/' + g.title">{{g.title}}</router-link>
				</template>

				<el-menu-item :index="c.title" v-for="c in g.cla" :key="c.id">
					<router-link :to="'/account/class/' + c.id  + '/' + c.title">
						{{c.title}}
					</router-link>

				</el-menu-item>
			</el-submenu>
		</el-submenu>
	</div>
</template>

<script>
import { college } from '@/api/account'
export default {
	data() {
		return {
			routes: []
		}
	},
	created() {
		this.fetchData()
	},
	name: 'SchoolClass',
	methods: {
		fetchData() {// 加载数据
			college().then(d => {
				this.routes = d.college
			})
		}
	}
	// props: {
	//   routes: {
	//     type: Array
	//   }
	// }
}
</script>
