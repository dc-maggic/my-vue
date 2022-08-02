<template>
    <div class="wrapper">
        <div class="style-editor" ref="editor">
            <component is="style">
                {{ currentText }}
            </component>
            <pre v-html="code"></pre>
        </div>
        <div class="heart-wrapper">
            <div class="heart"></div>
            <div class="heart bounce"></div>
        </div>
        <rose class="rose" v-show="show"/>
    </div>
</template>
<script>
import Prism from 'prismjs'
import Rose from './rose.vue'
export default {
    name: 'app',
    components: {
        Rose
    },
    data() {
        return {
            currentText: '',
            show: false
        }
    },
    // vue3 移除了 filters
    computed: {
        code({currentText}) {
            return Prism.highlight(currentText, Prism.languages.css)
        }
    },
    created() {
        const userAgent = navigator.userAgent,
            agents = /(Android)|(iPhone)|(iPad)/i,
            isMobile = agents.test(userAgent)
        this.text = `
/*
* Hi！
* 这么久了。还没和你说过我的工作呢！
* 我是个前端工程师。俗称程序员。网页相关。
* 如这个页面。就是个什么也没有的网页。
* 我的工作就是给这种空白的页面加点儿东西。
* 嗯。说起来手机和电脑还得区分一下。
* 你现在用的是。。。${isMobile ? '手机' : '电脑'}
*/
/* 首先给所有元素加上过渡效果 */
* {
-webkit-transition: all .5s;
transition: all .5s;
}
/* 白色背景太单调了。来点背景 */
body, html {
color: orange;
background-color: #fff8dc;
}
/* 文字太近了 */
.style-editor {
overflow: auto;
${ isMobile ? `width: 96vw;
height: 48vh;` : `width: 48vw;
height: 96vh;` }
border: 1px solid;
font-size: 14px;
line-height: 1.5;
padding: 10px;
}
/* 这些代码颜色都一样。加点儿高亮区别来 */
.token.selector{ color: rgb(133,153,0) }
.token.property{ color: rgb(187,137,0) }
.token.punctuation{ color: orange }
.token.function{ color: rgb(42,161,152) }
.token.comment{ color: rgb(177,177,177) }
/* 加个 3D 效果 */
html{
perspective: 1000px;
-webkit-perspective: 1000px;
}
.style-editor {
${ isMobile ? `transform: rotateX(-10deg) translateZ(-100px);
-webkit-transform: rotateX(-10deg) translateZ(-100px);
transform-origin: 50% 0% 0;
-webkit-transform-origin: 50% 0% 0;` : `transform: rotateY(10deg) translateZ(-100px) ;
-webkit-transform: rotateY(10deg) translateZ(-100px);` }
}
/*
* 今天教你写代码。
* 用代码画一个爱心。
*/
${
    isMobile ? '' :
`/* 给画板腾个位置*/ 
.wrapper {
    display: flex;
} `
    }
/* 首先，来一个画板 */
.heart-wrapper {
${ isMobile ? `width: 96vw;
height: 48vh;` : `width: 48vw;
height: 96vh;`}
position: relative;
border: 1px solid;
background-color: white;
${ isMobile ?
`transform: rotateX(10deg) translateZ(-100px);
-webkit-transform: rotateX(10deg) translateZ(-100px);`:
`transform: rotateY(-10deg) translateZ(-100px);
-webkit-transform: rotateY(-10deg) translateZ(-100px);` }${ isMobile ? `
transform-origin: 50% 0% 0;
-webkit-transform-origin: 50% 0% 0;`
: ''}
}
/* 画一个方块，当左心室和右心室 */
.heart {
width: 100px;
height: 100px;
position: absolute;
top: 50%;
left: 50%;
margin: -50px 0 0 -50px;
border-radius: 20px;
background: #FF4949;
transform: rotate(45deg);
}
/* 画上左心房 */
.heart::before {
content: '';
background: #FF4949;
border-radius: 50%;
width: 100px;
height: 100px;
position: absolute;
left: -38px;
top: 1px;
}
/* 再画上右心房 */
.heart::after {
content: '';
background: #FF4949;
border-radius: 50%;
width: 100px;
height: 100px;
position: absolute;
right: -1px;
top: -38px;
}
/* 太单调了，让心跳动起来 */
@keyframes throb {
0% {
transform: scale(1) rotate(45deg);
opacity: 1;
}
100% {
transform: scale(1.65) rotate(45deg);
opacity: 0
}
}
.bounce {
opacity: 0.2;
animation: throb 1s infinite linear;
}
/*
* 最后，送上一朵玫瑰，七夕快乐！
*/
`
    },
    mounted() {
        this.progressiveShowStyle()
    },
    methods: {
        timeout(i) {
            return new Promise((resolve) => {
                const char = this.text[i]
                if(!char) {
                    return
                }
                if(char === '\n' && this.$refs.editor) {
                    this.$refs.editor.scrollTop = 10000
                }
                this.currentText += char
                setTimeout(()=> {
                    resolve()
                }, 30)
            })
        },
        timeou2() {
            return new Promise((resolve) => {
                setTimeout(()=> {
                    resolve()
                }, 1000)
            })
        },
        async progressiveShowStyle() {
            try {
                const l = this.text.length
                let i = 0
                while(i<l){
                    await this.timeout(i)
                    i++
                }
                console.log('finished')
                this.show = true
            }catch(e){
                console.error(e)
            }
        }
    }
}
</script>
<style>
body {
    margin: 0;
    overflow: hidden;
}

</style>
<style scoped>
.wrapper {
    position: relative;
    height: 100vh;
    padding: 8px;
    box-sizing: border-box;
}
.rose {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.wrapper > div {
    box-sizing: border-box;
}
.style-editor {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}
</style>