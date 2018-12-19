<template>
    <div class="photos">
        
        <img :src="'http://localhost:9999/'+url" alt="" width="200px" v-for="(url, index) in photo_url" :key="index">
    </div>
</template>
<script>
import request from "../request"
    export default {
        data() {
            return {
                photo_url:[]
            }
        },
        created() {
            let id = location.search.slice(4)
            this.getPhotos(id)
        },
        methods:{
            getPhotos(id) {
                request('get', `/api/albums?id=${id}`)
                    .then(res=>{
                        this.photo_url = res.data[0].urls
                    })
            }
        }
    }
</script>
<style lang="less" scoped>
    .photos{
        text-align: left;
        img{
            margin-right: 10px;
        }
    }
</style>
