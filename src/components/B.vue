<template>
    <div class="b">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
import '@/assets/css/mixin.less';
export default {
    name: 'B',
    props: {
        msg: String,
    },
    created() {
        console.log(this.$attrs);
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.b {
    width: 300px;
    height: 300px;
    border: 1px solid;
}
h1 {
    // color: @blue;
    // .textColor(rgb(10 25 136));
}
</style>
