<!--scafflod
    하나의 템플릿(컴포넌트) 안에는 하나의 태그만 존재해야 한다
-->
<template>
    <div>
        <input type="text"  v-model="message"/>
        <button v-on:click="handleSubmit">전송</button>
        <p v-show="visible">변화된 URL : {{encodingUrl}}</p>
        <button v-on:click="changePage" v-show="visible">{{encodingUrl}}로 바로가기</button>
    </div>
</template>

<script>
export default {
    name : 'Home',
    data() {
        return {
            message: "https 부터 써주세요",
            output: {},
            encodingUrl: "",
            original: "",
            visible : false         
        }
    },
    methods : {
        handleSubmit : function () {
            const baseURI = 'http://127.0.0.1:3000';
            this.$http.get(`${baseURI}/shortner?inputUrl=${this.message}`)
                .then((result) => {
                    this.output = result.data;
                    this.encodingUrl = this.output.encodedUrl;
                    this.visible = true;
                    alert("변환되었습니다!!");
                });
        },
        changePage : function() {
            const baseURI = 'http://127.0.0.1:3000';
            console.log('encondigURI', this.encodingUrl);
            this.$http.get(`http://${this.encodingUrl}`)
                .then((result) => {
                    this.output = result.data;
                    this.original = this.output.originalUrl;                    
                    window.location.replace(`${this.original}`);
                });
            
        }
    }
}
</script>

<style>

</style>
