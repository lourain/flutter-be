<template>
	<div class="home-default">
		<div class="article" v-for="(article,index) in articles" :key="index">
			<h1>{{article.title}}</h1>
			<div class="tags">
				<el-tag v-for="(tag,index) in article.tags" :key="index">{{tag}}</el-tag>
			</div>
			<div class="time">{{article.time}}</div>
			<div class="content" v-html="article.content"></div>
		</div>
	</div>
</template>
<script>
import request from "../request.js";
const marked = require('marked')
let hljs = require('highlight.js');
import 'highlight.js/styles/default.css';
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
<style lang="less" scoped>
</style>
