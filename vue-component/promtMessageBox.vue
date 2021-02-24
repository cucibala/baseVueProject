<template>
	<div id="promtMessageBox" :state="state">
		<p v-for="value in currentPromtMessage">{{value}}</p>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				state:"hide",
				promtList:[],
				currentPromtMessage:"",
				promtBoxActive:false,
			}
		},
		computed:{
			promtMessageSign(){
				return this.$store.state.promtMessageSign;
			}
		},
		watch:{
			promtMessageSign(){
				let message=this.$store.state.currentPromtMessage;
				if(message&&message.length!=0){
					this.promtList.push(message);
					this.reActive();
				}
			}
		},
		methods:{
			reActive(){
				let _this=this;
				if(!_this.promtBoxActive){
					_this.promtBoxActive=true;
					if(_this.promtList.length>0){
						_this.currentPromtMessage=_this.promtList.shift().split("\n");
						_this.state="show";
						setTimeout(()=>{
							_this.state="hide";
							if(_this.promtList.length>0){
								setTimeout(()=>{
									_this.promtBoxActive=false;
									_this.reActive();
								},200);
							}else{
								_this.promtBoxActive=false;
							}
						},1500);
					}
				}
			}
		}
	}
</script>
<style lang="less">
@min624:~"(min-width: 624px)";
@pcSize:~"(min-width: 1024px)";
@middleSize:~"(min-width: 624px) and (max-width: 1024px)";
@phoneSize:~"(max-width: 624px)";
#promtMessageBox{
	position: fixed;
	width: 100%;
	background-color: #000000;
	text-align: center;
	z-index: 10;
	left: 0px;
	transition: all 0.5s ease 0s;
	color: white;
	line-height: 0px;
	word-wrap: break-word;
	word-break: break-all;
	font-size: 18px;
	@media @min624{
		height: 100px;
		top: -100px;
	}
	@media @phoneSize{
		height: 80px;
		top: -80px;
	}
}
#promtMessageBox[state="show"]{
	opacity: 0.8;
	transform: translateY(150px);
	@media @min624{
		transform: translateY(300px);
	}
}
#promtMessageBox[state="hide"]{
	transform: translateY(0);
	opacity: 0;
}
</style>