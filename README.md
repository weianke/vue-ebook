### Vue web 读书器

Vue web 读书器是一款以**Vue 全家桶**为主要的技术栈，媲美原生 App 的读书器。主要技术栈包括**Vue 全家桶、Vue-cli3.0、交互动画、LocalStorage+IndexedDB**等

### 1、初始化项目

#### 1.1、使用 Vue-cli3.0 搭建开发环境

已安装好 Vue-cli3.0 后直接创建项目

```python
 vue create my-project
```

#### 1.2、导入 Iconfont svg 图标

首先先去[Iconfont](https://www.iconfont.cn/)选好矢量图标并下载，再去[Icomoon](https://icomoon.io/app/#/select)将字体图标设置为 svg 格式并下载到本地。
具体步骤为： `New Empty Set` --> `Import to Set` -->`选择已下载的图标` -->`Generate Font` --> `Download`--> 解压后将`style.css`和`fonts` 复制至`assets/styles`

最后在`main.js`中引入图标

```python
// 引入字体图标
import './assets/styles/icon.css'
```

#### 1.3、引入字体

将提前准备好的字体引入`src/assets/fonts`
例如：

```python
// daysOne.css

@font-face {
    font-family: 'Days One';
    font-style: normal;
    font-weight: 400;
    src: url('daysOne.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

引入字体的方式有几种：

- 在`public/index.html`中引入
  ```python
  <link rel="stylesheet" href="<%= BASE_URL %>fonts/daysOne.css">
  ```
- 在`src/main.js`中引入
  ```python
  import './assets/fonts/daysOne.css'
  ```
  使用时则需注明`font-family`

```python
.text {
   font-family: "Days One";
   color: orange;
}
```

这里的`font-family`需和引入字体的`font-family`一致

#### 1.4、设置响应式 rem

**`rem`** 是指根元素（root element，html）的字体大小，在移动端中需要根据屏幕大小自动适应根源素大小从而响应其他`fong-size`
在`src/App.vue`页面下进行`rem`设置

```python
export default {};
// 设置rem
document.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector("html");
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > 50 ? 50 : fontSize;
    html.style.fontSize = fontSize + "px";
});
```

#### 1.5、安装 epub

`ePub` 是一种电子书的标准格式，该项目主要使用 `Vue` 和 `epub.js` 制作电子书阅读器
安装`epubjs`

```python
npm i --save epubjs
```

引入并使用`epubjs`

```python
import Epub from "epubjs";
global.Epub = Epub;
```

#### 1.6、安装 Nginx 作为代理服务器

安装[Nginx](http://nginx.org/en/download.html)作为代理服务器，具体配置以及跨域问题询问度娘

### 2、电子书解析与渲染

#### 2.1、动态路由

在`router.js`下重定向到`/ebook`,并在`views/ebook`下创建`index.vue`作为根页面，在`components/ebook/` 创建`EbookReader.vue`二级路由

```python

path: '/ebook',
component: () => import('./views/ebook/index.vue'),
children: [
    {
        path: ':fileName',   // 动态路由
        component: () => import('./components/ebook/EbookReader.vue')
    }
]
```

在`EbookReader.vue`组件中利用 **`$route.params.fileName`** 来获取`fileName`，然后利用`split、join`对`fileName`进行处理

#### 2.2、vuex 模块化管理

**`vuex`** 是 **`vue`** 用来集中管理状态的容器，用来管理全局的状态的，实现不同组件之间相互的数据访问。如果一个项目非常大的话状态就会非常的多，如果不进行分类处理，所有的状态都维护在一个`state`里面的话，状态管理就会变得非常的混乱，这样非常不利于项目的后期维护。这里需要使用到 **`vuex模块化管理`**。

在`store/modules/book.js` 模块下

- **`states`** 保存应用的状态值
  ```python
  state: {
      fileName: ''
  }
  ```
- **`mutations`** 定义对状态值的操作
  更改`Vuex` 的 `store` 中的状态的唯一方法是`提交 mutation`。`Vuex` 中的 `mutation` 非常类似于事件：每个 `mutation` 都有一个字符串的  **`事件类型 (type)`**  和 一个  **`回调函数 (handler)`**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 **`state`** 作为第一个参数。且这里要注意不要在 **`mutations`** 里面进行异步操作。
  ```python
  mutations: {
      'SET_FILENAME': (state, fileName) => {
           state.fileName = fileName
      }
  }
  ```
- **`actions`** 将 **`mutations`** 中定义的方法进行了一次封装

  **`actions`** 定义的方法只是将 **`mutations`** 中定义的方法进行了一次**封装**,就是去触发 **`mutations`** 中的方法。如果传递的参数需要**异步获取**的话，可以在这里等待异步返回成功，然后在触发 **`mutations`** 中的方法。

  **`actions`** 通过调用 **`store.commit`** 提交载荷(`fileName`这个对象)到名为`SET_FILENAME`的 `mutation` 中

  ```python
  actions: {
      setFileName: ({commit}, fileName) => {
          return commit('SET_FILENAME', fileName)
          // 需要return才能返回一个promise对象
      }
  }
  ```

  且在`components/ebook/EbookReader.vue`中，**`actions`** 通过调用  **`store.dispatch`**  方法提交载荷(`fileName`这个对象)触发 **`actions`** 中的`setFileName`

  ```python
  this.$store.dispatch("setFileName", fileName)
  ```

在`store/` 模块下

- **`getters`** 将 **`states`** 中定义的值暴露在 **`store.getters对象`** 中

  ```python
  const book = {
      fileName: state => state.book.fileName
  }

  export default book
  ```

  这里将 **`getters`** 提取出来作为多个模块之间共享的方法，故提取出来。
  在`components/ebook/EbookReader.vue`中， **`mapGetters 辅助函数`** 仅仅是将 store 中的 `getter`映射到局部计算属性,且使用对象展开运算符将 `getter` 混入`computed` 对象中

  ```python
  import { mapGetters } from "vuex";

  computed: {
      ...mapGetters(["fileName"])
  }
  ```

- **`index.js`** 入口文件

  ```python
  import Vue from 'vue'
  import Vuex from 'vuex'
  import book from './modules/book'
  import actions from './actions'
  import getters from './getters'

  Vue.use(Vuex)

  export default new Vuex.Store({
      modules: {
          book
      },
      getters,
      actions
  })
  ```

最后在`main.js`里引入`store`: `import store from './store'`

#### 2.3、**`mixins`** 混入

混入 **`mixins`** 是一种分发 `Vue`组件中可复用功能的非常灵活的方式。**混入对象**可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

全局注册一个**混入**，影响注册之后所有创建的每个 `Vue` 实例

**`mapActions`**

组件中使用`this.$store.dispatch('xxx')`  分发`action`，或者使用 **`mapActions`** 辅助函数将组件的`methods` 映射为  `store.dispatch`

- 在`src/store/actions.js`中定义`actions`

  ```python
  const actions = {
      setFileName: ({ commit }, fileName) => {
          return commit('SET_FILENAME', fileName)
          // 需要return才能返回一个promise对象
      },
      setMenuVisible: ({ commit }, menuVisible) => {
          return commit('SET_MENUVISIBLE', menuVisible)
      }
   }

   export default actions
  ```

- 在`src/store/getters.js`中定义 `getters.js`

  ```python
  const book = {
      fileName: state => state.book.fileName,
      menuVisible: state => state.book.menuVisible
  }

  export default book
  ```

- 在`src/utils/mixin.js`中创建`mixin.js`
  ```python
  import { mapGetters, mapActions } from 'vuex'
  export const ebookMixin = {
    computed:{
        ...mapGetters([
            "fileName",
            "menuVisible",
            // 这里是 getters 暴露 state中的对象
        ])
    },
    methods: {
        ...mapActions([
            "setMenuVisible",
            "setFileName",
            //  这里是定义 actions.js中分发 mutations 中的方法
        ])
    }
  }
  ```

最后在组件中引入`mixins`并使用`mixins`

```python
import { ebookMixin } from "../../utils/mixin";

// 使用mixins
 mixins: [ebookMixin]
```

使用`mixins`中定义的方法时，直接`this.+函数名`，如`this.setFileName()`

### 3、阅读器开发

#### 3.1、标题栏和菜单栏实现

> transition

在`src/components/ebook`下分别新建`EbookTitle.vue`、`EbookMenu.vue`作为顶部标题栏，底部菜单栏。为了使其过渡流程，需使用 **`transition`**

`<transition>`  元素作为单个元素/组件的过渡效果。`<transition>`  只会把过渡效果应用到其包裹的内容上，而不会额外渲染 `DOM` 元素，也不会出现在检测过的组件层级中。

`动态组件`

```python
<transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
 </transition>
```

`transition.css`

```python
.slide-down-enter, .slide-down-leave-to {
    transform: translate3d(0, -100%, 0)
 }
```

> 切换标题栏和菜单栏

如同电子阅读类 App 一样，通过手势来实现上/下页滑动、切换标题栏和菜单栏等。`Epub`集成了手势操作类方法。

```python
// 手势操作
this.rendition.on("touchstart", event => {
    this.touchStartX = event.changedTouches[0].clientX;
    this.touchStartTime = event.timeStamp;
});

this.rendition.on("touchend", event => {
    // 滑动x轴偏移量
    const offsetX = event.changedTouches[0].clientX - this.touchStartX;
    // 滑动时间差
    const time = event.timeStamp - this.touchStartTime;
    // console.log(offsetX, time);
    if (time < 500 && offsetX > 40) {
        this.prevPage();   // 上一页
    } else if (time < 500 && offsetX < -40) {
        this.nextPage();  // 下一页
    } else {
        this.toggleTitleAndMenu();  // 切换标题栏和菜单栏
    }
// 停止事件默认动作及传播
// event.preventDefault();
event.stopPropagation();});
```

算了，get 不到`Epub`使用方法，学习了解其手势操作的思想才是正道。这个项目最大的学习收获我觉得应该是 **`Vuex`**

> **`Vuex在项目中的具体使用`**

`Vuex` 的状态存储是响应式的。当 `Vue` 组件从 `store` 中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会相应地得到高效更新。所以说，这就十分有利于使用函数操作`store`里的变量。

在没有使用 **`mixins`** 时，使用`$store.dispatch`分发

```python
this.$store.dispatch("setMenuVisible", !this.menuVisible);
```

引入 **`mixins`** 后

```python
this.setMenuVisible(!this.menuVisible);
```

#### 3.2、WebStorageCache

在 HTML5 中，新加入了一个`localStorage`特性，这个特性主要是用来作为`本地存储`来使用的，解决了`cookie`存储空间不足的问题(cookie 中每条 cookie 的存储空间为`4k`)，`localStorage`中一般浏览器支持的是`5M`大小，这个在不同的浏览器中 localStorage 会有所不同。

**`WebStorageCache`**  对`HTML5 localStorage`和`sessionStorage`  进行了扩展，添加了超时时间，序列化方法。可以直接存储`json`对象，同时可以非常简单的进行超时时间的设置。

具体使用方法可查看[WebStorageCache](https://www.npmjs.com/package/web-storage-cache)

- 安装**WebStorageCache**
  ```python
  import Storage from "web-storage-cache"
  ```
- 在`src/utils` 下创建`localStorage.js`，并导入**WebStorageCache**
  ```python
  import Storage from "web-storage-cache";
  const localStorage = new Storage()
  ```

**`WebStorageCache API`**

- **set** 往缓存中插入数据

```python
export function setLocalStorage(key, value) {
    return localStorage.set(key, value)
 }
```

- **get** 根据`key`获取缓存中未超时数据。返回相应类型`String`、`Boolean`、`PlainObject`、`Array`的值。

```python
// 根据key获取缓存中未超时数据
export function getLocalStorage(key) {
    return localStorage.get(key)
 }
```

- **delete** 根据`key`删除缓存中的值

```python
// 根据key删除缓存中的值。
export function removeLocalStorage(key) {
    return localStorage.delete(key)
 }
```

- **clear** 清空缓存中全部的值

```python
// 清空缓存中全部的值
export function clearLocalStorage() {
    return localStorage.clear()
}
```

- **WebStorageCache** 在组件中的具体使用

```python
import {saveFontFamily,getFontFamily,getFontSize,saveFontSize} from "../../utils/localStorage";

直接调用localStorage中的函数就ok了


// 设置字体样式
initFontFamily() {
    let font = getFontFamily(this.fileName);
    if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
    } else {
        this.rendition.themes.font(font);
        this.setDefaultFontFamily(font);
    }
 }
```

#### 3.3、国际化——Vue-i18n 的使用

`vue-i18n`是一个`vue`插件，主要作用就是让项目支持国际化多语言。

- 安装 **`vue-i18n`**
  ```python
  // 安装vue-i18n
  npm install vue-i18n --save
  ```
- 引入 **`vue-i18n`**

  在`src/lang`下创建`index.js`作为根路径，引入`vue-i18n`

  ```python
  import Vue from 'vue'
  import VueI18N from 'vue-i18n'
  import en from './en'
  import cn from './cn'

  // 加载插件
  Vue.use(VueI18N)

  const messages = {
      en,  // 英文语言包
      cn  //  中文语言包
  }

  export default i18n
  ```

- 定义语言包

  ```python
  const messages = {
      home: {
          title: '书城',
          ......
      },
      category: {},
      .....
  }
  ```

- 在 **`main.js`** 中引入 **`lang`**

  ```python
  // 引入多语言
  import i18n from './lang'

  new Vue({
      router,
      store,
      i18n,
      render: h => h(App
  )}).$mount('#app')
  ```

#### 3.4、全局样式的改变

上次实现了标题栏和菜单栏样式的改变，但并没有涉及到全局样式的改变。这次实阅读器全局样式的改变。
采用链接的方式在 HTML 中导入 CSS，即使用 HTML 头部的  `<head>`标签引入外部的 CSS 文件

```python
<link rel="stylesheet" type="text/css" href="style.css">
```

1. 将外部 CSS 文件放入 Nginx 中，获取其链接
2. 在`src/utils/book.js`下使用 **`setAttribute`** 构建导入 CSS 文件的链接方式

   ```python
   export function addCss(href) {
       const link = document.createElement('link')
       link.setAttribute('rel', 'stylesheet')
       link.setAttribute('type', 'text/css')
       link.setAttribute('href', href)
       document.getElementsByTagName('head')[0].appendChild(link)
   }
   ```

3. 在`EbookReader.vue`组件中，当 Epub 加载好后调用 **`initGlobalStyle`** 方法

   ```python
   // 初始化字体样式、字体大小、主题、全局主题
   this.rendition.display().then(() ={
       this.initFontSize();
       this.initFontFamily();
       this.initTheme();
       this.initGlobalStyle();
    });
   ```

   **`initGlobalStyle()`**

   ```python
   initGlobalStyle() {
       removeAllCss()
       switch (this.defaultTheme) {
           case "Default":
               addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
               break;
           case "Eye":
               addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
               break;
           case "Gold":
               addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
               break;
           case "Night":
               addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
               break;
           default:
               addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
               break;
        }
    }
   ```

4. 但是，当多次点击切换样式时，header 中会逐个加载 CSS 样式，后面的覆盖前面的，影响渲染速度，故需要清楚

   ```python
   export function removeCss(href) {
       const links = document.getElementsByTagName('link')
       for (let i = links.length; i >= 0; i--) {
           const link = links[i]
           if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
               link.parentNode.removeChild(link)
           }
       }
    }
   ```

   ```python
   export function removeAllCss() {
           removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
           removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
           removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
           removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
    }
   ```

5. 由于 **`initGlobalStyle()`** 方法需要在`EbookReader.vue`组件和`EbookSettingTheme.vue` 组件中调用，为提高代码复用性，故将 **`initGlobalStyle()`** 放入`src/utils/mixin.js`中。

#### 3.5、进度条组件

在`src/components/ebook` 下新建`EbookSettingProgress.vue`作为进度条组件。
进度条组件主要用来滑动进度条切换阅读进度和查看进度的，核心部分由`input`完成。

```python
<div class="progress-wrapper">
    <div class="progress-icon-wrapper" @click="prevSection()">
        <span class="icon-back"></span>
    </div>
    <input
        class="progress"
        type="range"
        max="100"
        min="0"
        step="1"
        @change="onProgressChange($event.target.value)"
        @input="onProgressInput($event.target.value)"
        :value="progress"
        :disabled="!bookAvailable"
        ref="progress">
    <div class="progress-icon-wrapper" @click="nextSection()">
        <span class="icon-forward"></span>
    </div>
 </div>
```

真心觉得`CSS`还挺难的...

##### input type 与 step 属性

作为一个滑块组件，主要用到 **`input`** **type** 和 **step** 属性

| type | 返回滑块控件的表单元素类型                                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- |
| step | 设置或返回滑块控件的 step 属性值 ；step 属性规定输入字段的合法数字间隔；step 属性可以与 max 以及 min 属性配合使用，以创建合法值的范围 |

再调用函数监听 **`input`** 数据变化：

```python
 @change="onProgressChange($event.target.value)"
 @input="onProgressInput($event.target.value)"
```

##### ref

[Vue 官网上对 ref 详解](https://cn.vuejs.org/v2/api/#ref)：**`ref`** 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的  **`$refs`** 对象上。如果在普通的 **DOM** 元素上使用，引用指向的就是 **DOM**元素；如果用在子组件上，引用就指向组件实例：

```python
<!-- `vm.$refs.p` will be the DOM node -->
    <p ref="p">hello</p>

<!-- `vm.$refs.child` will be the child component instance -->
    <child-component ref="child"></child-component>
```

关于 **`ref`** 注册时间的重要说明：因为 **`ref`** 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！**`$refs`**  也不是响应式的，因此你不应该试图用它在模板中做数据绑定。

**`ref`** 有三种用法：

1. **`ref`** 放在普通的元素上，用 **`this.ref.name`** 获取的是 **DOM** 元素
2. **`ref`** 放在**子组件**上，用 **`this.ref.name`** 获取的是 **`组件实例，可以使用组件的所有方法`**
3. 利用**v-for** 和 **ref** 获取**一组数组**或者**DOM 节点**

