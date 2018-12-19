<template>
	<div class="container">
		<div class="article" v-for="(article,index) in articles" :key="index">
			<h1>{{article.title}}</h1>
			<div class="tags">
				<el-tag v-for="(tag,index) in article.tags" :key="index">{{tag}}</el-tag>
			</div>
			<div class="ctrl">
				<a class="edit" :href="'/edit?id='+article._id">编辑</a>
				<a class="remove" href="javascript:;" @click="remove(article._id)">删除</a>
			</div>
			<div class="time">{{article.time}}</div>
			<div class="markdown" v-html="article.content"></div>
		</div>
	</div>
</template>
<script>
import request from "../request.js";
const EXPIRED = 1111
const marked = require("marked");
let hljs = require("highlight.js");
import "highlight.js/styles/atom-one-dark.css";
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});
export default {
  data() {
    return {
      articles: []
    };
  },
  created() {
    this.getArt();
  },
  methods: {
    getArt() {
      request("GET", `/api/article/${location.search}`).then(res => {
        console.log(res);
        if(res.code === EXPIRED){
            return this.msgBox(res.msg)
        }
        res.data.forEach(element => {
          element.content = marked(element.content || "", { sanitize: true });
        });
        this.articles = res.data;
      });
	},
	remove(id) {
		request('DELETE',`/api/del/${id}`)
			.then(res=>{
				this.msgBox(res.msg)
			})
	},
	 msgBox(msg) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定",
        callback: action => {
        	this.$router.push('/')
        }
      });
    }
  }
};
</script>
<style lang="less">
	.container{
		.article{
			a{
				text-decoration: none;
				color: #666;
			}
			.tags,.time{
				box-sizing: border-box;
				padding: 0 2em;
				text-align: left;
				margin: 10px 0;
			}
			.ctrl{
				display: flex;
				justify-content: flex-end;
				&>a{
					display: block;
					margin: 0 15px;
					cursor: pointer;
					&:hover{
						color:cornflowerblue;
					}
				}
			}
			.markdown{
				text-align: left;
				color:#666;
				pre{
					margin: 15px 0;
					padding: 5px 0;
					background:rgba(0, 0, 0, .1);
				}
				p{
					margin: 15px 0;
				}
			}
			
		}
	}
</style>
