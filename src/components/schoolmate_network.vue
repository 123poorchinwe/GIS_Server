<template>
  <div>
    <header class="navbar">
      <div class="logo">
        <h1 class="webgis-title">金陵女子大学WebGIS</h1>
      </div>
      <nav class="nav-links">
        <ul>
          <li><router-link to="/location">地址变迁</router-link></li>
          <li><router-link to="/complex">建制变迁</router-link></li>
          <li><router-link to="/history">校史文化标注</router-link></li>
          <li>
            <dev class="schoolmate-option">
              <router-link to="/schoolmate">知名校友</router-link>
            </dev>
          </li>

          <li><router-link to="/feedback">用户反馈</router-link></li>
        </ul>
      </nav>
      <div class="login-wrapper">
        <button class="login-button" @click="toggleOptions">
          <span>登录</span>
          <span class="circle"></span>
          <span class="arrow-icon" :class="{ up: showOptions }"></span>
        </button>

        <ul
          class="user-options"
          :style="{ display: showOptions ? 'block' : 'none' }"
          @mouseenter="showOptions = true"
          @mouseleave="showOptions = false"
        >
          <li @click="redirectToPage('/normaluser')">普通用户</li>
          <li @click="redirectToPage('/superuser')" @mouseleave="showOptions = false">管理员</li>
        </ul>
      </div>
    </header>

    <main class="content">
      <aside class="sidebar">
        <h2>校友查询</h2>
        <div class="search-bar">
          <input type="text" v-model="searchText" placeholder="请输入校友姓名" />
          <button @click="searchAlumni">搜索</button>
        </div>
        <ul class="alumni-list">
          <li v-for="result in searchResults" :key="result.name" @click="selectAlumni(result)">
            <h3>{{ result.name }}</h3>
            <img :src="result.image" alt="校友照片" style="width: 200px; height: 250px" />
            <p>称呼头衔: {{ result.title }}</p>
            <p>出生年份: {{ result.birth_year }}</p>
            <p>逝世年份: {{ result.death_year }}</p>
            <p>毕业年份: {{ result.graduate_year }}</p>
            <p>所学专业: {{ result.major }}</p>
            <p>个人成就:{{ result.achievements }}</p>
          </li>
        </ul>
      </aside>

      <section class="map">
        <h2>校友关系展示</h2>
        <button @click="toggleGraphType">
          {{ graphType === 'wordCloud' ? '显示人物关系图' : '显示词云图' }}
        </button>
        <div id="map-container">
          <div id="container"></div>
          <button @click="downloadWordCloud">下载词云图</button>
        </div>
        <div>
          <div class="word-cloud" ref="wordCloud"></div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p
        >copyright@2024
        <a href="https://www.nnu.edu.cn/">南京师范大学</a>
        版权所有</p
      >
      <h> 地址：江苏省南京市栖霞区文苑路一号 邮箱：chinwezhu@outlook.com</h>
    </footer>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import cloud from 'd3-cloud'
  import schoolmateData from '../assets/school_mate/schoolmate_date.json'

  export default {
    name: 'AlumniPage',
    data() {
      return {
        selectedAlumni: null,
        showOptions: false,
        searchText: '',
        searchResults: [],
        alumniData: schoolmateData.data,
        graphType: 'wordCloud',
        wordFrequencies: {},
        words: [],
        background: '#ffffff',
        font: 'Impact',
      }
    },
    mounted() {
      this.drawMap()
    },
    methods: {
      searchAlumni() {
        this.searchResults = this.alumniData.filter((alumni) => alumni.name.includes(this.searchText))
      },
      selectAlumni(alumni) {
        this.selectedAlumni = alumni
      },
      toggleGraphType() {
        this.graphType = this.graphType === 'wordCloud' ? 'relationGraph' : 'wordCloud'
        if (this.graphType === 'wordCloud') {
          this.drawWordCloud()
        } else {
          this.drawRelationGraph()
        }
      },
      drawRelationGraph() {
        const links = [] // 存储关系连线的数组
        const nodes = this.alumniData.map((alumni, index) => ({
          id: index,
          name: alumni.name,
          x: Math.random() * 800, // 随机生成节点的初始位置
          y: Math.random() * 400,
        }))

        // 根据人物之间的关系数据构建连线数组
        this.alumniData.forEach((alumni) => {
          if (alumni.relations && alumni.relations.length > 0) {
            alumni.relations.forEach((relation) => {
              const sourceNode = nodes.find((node) => node.name === alumni.name)
              const targetNode = nodes.find((node) => node.name === relation)
              if (sourceNode && targetNode) {
                links.push({ source: sourceNode.id, target: targetNode.id })
              }
            })
          }
        })

        const svg = d3.select('#container').select('svg')

        // 清空之前的绘图内容
        svg.selectAll('*').remove()

        // 创建力导向图模拟器
        const simulation = d3
          .forceSimulation(nodes)
          .force(
            'link',
            d3.forceLink(links).id((d) => d.id),
          )
          .force('charge', d3.forceManyBody().strength(-100))
          .force('center', d3.forceCenter(500, 225))
          .on('tick', ticked)

        // 绘制连线
        const link = svg
          .append('g')
          .attr('class', 'links')
          .selectAll('line')
          .data(links)
          .enter()
          .append('line')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .attr('stroke-width', 1)

        // 绘制节点
        const node = svg
          .append('g')
          .attr('class', 'nodes')
          .selectAll('circle')
          .data(nodes)
          .enter()
          .append('circle')
          .attr('r', 10)
          .attr('fill', '#227700')
          .call(drag(simulation)) // 添加拖动交互

        // 添加节点名称标签
        const label = svg
          .append('g')
          .attr('class', 'labels')
          .selectAll('text')
          .data(nodes)
          .enter()
          .append('text')
          .text((d) => d.name)
          .attr('font-size', 12)
          .attr('dx', 12)
          .attr('dy', 4)

        // 定义拖动交互的行为
        function drag(simulation) {
          function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          }

          function dragged(event, d) {
            d.fx = event.x
            d.fy = event.y
          }

          function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          }

          return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
        }

        // 力导向图模拟器的每一帧更新时执行的函数
        function ticked() {
          link
            .attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => d.target.x)
            .attr('y2', (d) => d.target.y)

          node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

          label.attr('x', (d) => d.x).attr('y', (d) => d.y)
        }
      },
      drawWordCloud() {
        const wordFrequencies = {}
        this.alumniData.forEach((alumni) => {
          const words = [alumni.title, alumni.major, alumni.achievements.toString()]
          words.forEach((word) => {
            if (word.length <= 5) {
              // 过滤掉长度超过5个字的词语
              wordFrequencies[word] = (wordFrequencies[word] || 0) + 1
            }
          })
        })

        const words = Object.keys(wordFrequencies).map((word) => ({
          text: word,
          size: Math.min(50, 10 + wordFrequencies[word] * 3), // 限制最大字号为30
        }))

        const layout = cloud()
          .size([1000, 450])
          .words(words)
          .padding(5) // 调整词语之间的间距
          .rotate(() => ~~(Math.random() * 2) * 60)
          .fontSize((d) => d.size)
          .on('end', (words) => {
            d3.select('#container').html('') // 清空container中的内容

            d3.select('#container')
              .append('svg')
              .attr('width', layout.size()[0])
              .attr('height', layout.size()[1])
              .attr('viewBox', `10 10 650 350`)
              .attr('style', 'border: 1px solid black')
              .attr('preserveAspectRatio', 'xMaxYMax meet')
              .attr('class', 'wordcloud')
              .append('g')
              .attr('transform', 'translate(200,100)')
              .selectAll('text')
              .data(words)
              .enter()
              .append('text')
              .style('font-size', (d) => `${d.size}px`)
              .style('fill', (d, i) => d3.schemeCategory10[i % 10])
              .attr('transform', (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
              .text((d) => d.text)
          })

        layout.start()
      },
      downloadWordCloud() {
        const svg = document.querySelector('.wordcloud')
        const svgData = new XMLSerializer().serializeToString(svg)

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const img = new Image()
        img.onload = function () {
          ctx.drawImage(img, 0, 0)
          const link = document.createElement('a')
          link.download = 'wordcloud.png'
          link.href = canvas.toDataURL()
          link.click()
        }

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
      },
      redirectToPage(page) {
        this.$router.push(page)
      },
      toggleOptions() {
        this.showOptions = !this.showOptions
      },
      hideOptions() {
        this.showOptions = false
      },
      drawMap() {
        // 绘制地图
        // 这里是绘制地图的代码逻辑
      },
    },
  }
</script>

<style scoped>
  /* 全局样式 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .webgis-title {
    font-family: 'LiSu', 'SimSun', serif;
    font-size: 50px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20px;
    background-color: #227700;
    color: #ffffff;
    margin-top: -60px;
  }
  .navbar ul {
    display: flex;
    list-style: none;
  }
  .navbar li {
    margin-right: 20px;
  }
  .navbar li a {
    color: #ffffff;
    text-decoration: none;
  }
  .schoolmate-option {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    padding: 6px;
    margin-top: -5px;
  }
  .location-option {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    padding: 6px;
    margin-top: -5px;
  }

  .location-option:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  .login-wrapper {
    position: relative;
  }

  .login-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 24px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }

  .login-button span:first-child {
    margin-right: 8px;
  }

  .circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ccc;
  }

  .arrow-icon {
    position: absolute;
    top: calc(50% - 3px);
    right: 16px;
    width: 0;
    height: 0;
    border: solid #999;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transition: transform 0.3s ease-in-out;
  }

  .arrow-icon.up {
    transform: rotate(-135deg);
  }

  .user-options {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 120px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    border: none;
    list-style: none;
    padding: 8px;
  }

  .user-options li {
    cursor: pointer;
    text-align: center;
    margin: 8px 0;
    color: #000000;
  }

  .user-options li:hover {
    background-color: #f5f5f5;
  }

  .content {
    flex: 1;
    display: flex;
  }

  .sidebar {
    flex: 1;
    padding: 1rem;
    background-color: #f2f2f2;
  }

  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .search-bar input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .search-bar button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    margin-left: 0.5rem;
    cursor: pointer;
  }

  .alumni-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .alumni-list li {
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .map {
    flex: 2;
    padding: 1rem;
  }

  .map h2 {
    margin-top: 0;
  }
  #container {
    width: 1000px;
    height: 450px;
    border: 1px solid black;
  }
  .wordcloud {
    max-width: 100%;
    height: auto;
  }
  .map button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .footer {
    background-color: #f2f2f2;
    padding: 1rem;
    text-align: center;
  }

  .footer a {
    color: #000000;
    text-decoration: none;
  }

  .footer p {
    margin: 0;
    padding: 0;
    color: #666666;
  }
</style>
