<template>
	<div id="mainContainer">
		<h1>{{msg}}</h1>
		<router-view></router-view>
		<v-promtbox></v-promtbox>
		<s-button @mdEvent="handleClick">
			click
		</s-button>
	</div>
</template>
<script>
	import vPromtbox from './vue-component/promtMessageBox.vue'
	import sButton from './vue-component/sButton.vue'
	export default{
		components:{
			vPromtbox,
			sButton,
		},
		methods:{
			handleClick(e){
				this.$store.commit('addPromtMessage',"Hello wrold");
			},
		},
		computed:{

		},
		watch:{

		},
		data(){
			return {
				msg:"hello world",
			}
		},
		mounted(){

		}
	}
</script>
<style lang="less">
	html{
		text-align: center;
	}
</style>