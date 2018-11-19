<template>
	<div class="over-view">
		<div class="article" v-for="(article,index) in articles" :key="index">
			<a href="/detail"><h1>{{article.title}}</h1></a>
			<div class="tags">
				<el-tag v-for="(tag,index) in article.tags" :key="index">{{tag}}</el-tag>
			</div>
			<div class="time">{{article.time}}</div>
			<div class="markdown" v-html="article.content"></div>
		</div>
	</div>
</template>
<script>
import request from "../request.js";
const marked = require('marked')
let hljs = require('highlight.js');
import 'highlight.js/styles/atom-one-dark.css';
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang) {
          if (lang && hljs.getLanguage(lang)) {    
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
      }
})
export default {
  data() {
    return {
		articles:[]
	};
  },
  created() {
    this.getArt();
  },
  computed:{
	  compiledMarkdown(){
		  return 
	  }
  },
  methods: {
    getArt() {
      request("GET", "/fluttering/articles").then(res => {
		  res.data.forEach(element => {
			  element.content = marked(element.content || '',{sanitize: true})
		  });
		  this.articles = res.data
		  

      });
    }
  }
};
</script>
<style lang="less">
	.over-view{
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
			.markdown{
				text-align: left;
				// text-indent: 2em;
				color:#666;
				pre{
					margin: 15px 0;
					background:rgba(0, 0, 0, .1);
				}
				p{
					margin: 15px 0;
				}
			}
			
		}
	}
</style>
