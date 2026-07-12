<template>
  <div>
      <nav class="navbar">
    <!-- 导航栏 -->
    <div class="logo">
          <h1 class="webgis-title" >金陵女子大学WebGIS</h1>
        </div>
        <ul class="nav-links">
            <li>
              <div class="location-option">
                    <router-link to='/feedback' >地址变迁</router-link>
              </div>
          </li>
            <li>  <router-link to='/complex' >建制变迁</router-link></li>
            <li><router-link to='/history'>校史文化标注</router-link></li>
            <li><router-link to='/schoolmate'>知名校友</router-link></li>
            <li> <router-link to='/feedback' >用户反馈</router-link></li>                         
          </ul>
        <div class="login-wrapper">
          <button class="login-button" @mouseenter="showOptions = true" @mouseleave="hideOptions">
<span>登录</span>
<span class="circle"></span>
<span class="arrow-icon" :class="{ 'up': showOptions }"></span>
</button>

<ul class="user-options" :style="{ display: showOptions ? 'block' : 'none' }"
@mouseenter="showOptions = true" @mouseleave="showOptions = false">
<li @click="redirectToPage('/normaluser')"   >普通用户</li>
<li @click="redirectToPage('/superuser')"  @mouseleave="showOptions = false" >管理员</li>
</ul>
</div>
    </nav>
    <div class="parent">
<div class="timeline">
  
<section id="timeline" class="timeline-outer">
   <h3 class="header">校址变迁</h3 >
  <div class="container" id="content">
        <div class="row">
      <div class="col s12 m12 l12">
        <h2 class="blue-text lighten-1 header"></h2>
        <ul class="timeline">
          <li v-for="time in timelineItems" :key="time" @click="selectTime(time)">
  {{ time }}
</li>
          <li class="event" data-date="1913-1923">
            <h3>城南绣花巷</h3>
            <p>
              19世纪末20世纪初。英美各教会在中国办的学校激增。1913年，美国浸礼会、监理会、长老会等教会开始在南京筹建第一所女子大学——金陵女子大学，成立了校董事会，由曾经在湖南长沙教会中学任教的德本康夫人担任校长。校址选在南京城南绣花巷的李鸿章故居，内有100多间厢房可做学生宿舍、教室、礼堂及办公室等。此外还有球场、菜地和大花园，小桥流水、鸟语花香，景色十分优美。</p>
          </li>
          <li class="event" data-date="1923-1937">
            <h3>南京随园</h3>
            <p>
              随着金女大学生人数的激增和教学现代化的要求，校董事会及校务委员会选择南京随园作为永久性校址，并募集资金建成了九栋呈“H”型的中国宫殿式建筑，其中三幢教学楼、四栋宿舍楼、一幢音乐楼及一座图书馆，楼与楼之间以长廊相连。1923年7月金女大从绣花巷搬入随园。</p>

          </li>
          <li class="event" data-date="1938-1946">
            <h3>成都</h3>
            <p>1938年，日军侵入南京地区，金陵女子文理学院师生分三路西迁至成都，与山东齐鲁大学、北京的燕京大学、南京的金陵大学、华西医科大学会和于成都华西坝。高校云集，人才辈出，如此氛围中，金陵女子文理学院得到意想不到的发展。</p>
          </li>
          <li class="event" data-date="1946-1951">
            <h3>南京随园</h3>
            <p>日本投降后，1946年金陵女子文理学院学生陆续迁回南京。1947年学校发展相对繁荣，在校生达到440人，是历年来人数最多的；学校管理及师资力量雄厚，对外交流活跃，与许多海内外知名学府结为友好学校，教学与科研并驾齐驱。1951年，金陵女子文理学院与金陵大学合并成为公立金陵大学。</p>
          </li>
          <li class="event" data-date="如今">
            <h3>南京仙林、南京随园</h3>
            <p>原金陵女子文理学院校址1952年改为南京师范学院（1984年改名南京师范大学）校址。
1980年代，吴贻芳推动金陵女子学院复校；1987年3月，依托南京师范大学正式成立金陵女子学院。</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
</div>
<br/> 
<div class="map" id="map">
    <!-- 在这里插入地图组件 -->
  </div>
  <button @click="toggleFlightLine">迁移</button>
</div> 
  <!-- 底部版权信息 -->
  <footer class="footer">
        <p>copyright@2024
            <a href="https://www.nnu.edu.cn/">南京师范大学</a>
            版权所有</p>
            <h> 地址：江苏省南京市栖霞区文苑路一号 邮箱：chinwezhu@outlook.com</h>         
    </footer>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationData from '../assets/location_change/location_change.json';

export default {
  name: 'LocationPage',
  data() {
    return {
     
      timelineItems: [], // 时间轴上的时间项
    selectedTime: null, // 当前选中的时间
    showFlightLine: false, // 是否显示轨迹线
    locations: locationData,
    };
  },
  methods: {
     initTimeline() {
    const timelineItems = new Set();
    this.locations.forEach(location => {
      timelineItems.add(location.time);
    });
    this.timelineItems = Array.from(timelineItems).sort();
  },
      redirectToPage(path) {
    this.showOptions = false; // 隐藏下拉框
    this.$router.push(path); // 使用路由跳转到指定路径
  },
  showFlight(location) {
  this.selectedLocation = location;
} ,
// 更新选中的时间
selectTime(time) {
    this.selectedTime = time;
    this.showOptions = false;
    this.updateMarkers();
  },
  
  },
  mounted() {
    const map = L.map('map').setView([20.8617, 110.1954], 5);

// 添加 Tianditu 地图底图服务（影像图）
const tiandituLayerImg = L.tileLayer(
  'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk={key}',
  {
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    attribution:
      '&copy; <a href="http://www.tianditu.com/" target="_blank">Tianditu</a>',
    key: '1550db5db74061f21422c8e6c265f371',
  }
).addTo(map);

const tiandituLayerVec = L.tileLayer(
  'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk={key}',
  {
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    attribution:
      '&copy; <a href="http://www.tianditu.com/" target="_blank">Tianditu</a>',
    key: '1550db5db74061f21422c8e6c265f371',
  }
);

// 添加 Tianditu 注记图层服务（影像注记）
const tiandituLayerImgAnno = L.tileLayer(
  'https://t{s}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk={key}',
  {
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    attribution:
      '&copy; <a href="http://www.tianditu.com/" target="_blank">Tianditu</a>',
    key: '1550db5db74061f21422c8e6c265f371',
  }
);

// 添加 Tianditu 注记图层服务（矢量注记）
const tiandituLayerVecAnno = L.tileLayer(
  'https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk={key}',
  {
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    attribution:
      '&copy; <a href="http://www.tianditu.com/" target="_blank">Tianditu</a>',
    key: '1550db5db74061f21422c8e6c265f371',
  }
);

// 创建图层切换器，添加底图和注记图层作为选项
const baseMaps = {
  '矢量图': tiandituLayerVec,
  '影像图': tiandituLayerImg,
 
};

const overlayMaps = {
  '影像注记': tiandituLayerImgAnno,
  '矢量注记': tiandituLayerVecAnno,
};
const myIcon = L.icon({
iconUrl: 'https://s1.ax1x.com/2023/06/15/pCK15y8.png',
iconSize: [32, 32],
iconAnchor: [16, 32],
popupAnchor: [0, -32]
});
L.control.layers(baseMaps, overlayMaps).addTo(map);
// 遍历 locations 数组并在地图上添加标记和弹出窗口
this.locations.forEach(location => {
  const latLng = L.latLng(location.coordinates[1], location.coordinates[0]);
  const marker = L.marker((latLng),{icon: myIcon}).addTo(map);
  const popupContent = `<b>${location.name}</b><br>${location.time}<br>${location.address}`;
  const popupOptions = {
    maxWidth: 200
  }
  marker.bindPopup(popupContent, popupOptions);
});
// 轨迹线
  // 初始化时间轴
  const timeline = document.querySelector('.timeline');
  const timelineItems = timeline.querySelectorAll('li');

  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
     
    });
  });
}
};
</script>


<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 
}
.webgis-title {
font-family: "LiSu", "SimSun", serif;
font-size:50px;
}

/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  background-color: #227700;
  color: #ffffff;
  margin-top:-60px;
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

.location-option {
background-color: rgba(255, 255, 255, 0.5);
border-radius: 4px;
padding: 6px;
margin-top:-5px
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
color:#000000
}

.user-options li:hover {
background-color: #f5f5f5;
}

body {
font-family: helvetica;
}
/*——————————————
TimeLine CSS
———————————————*/
/* Base */

#content {
margin-top: 50px;
text-align: center;

}

section.timeline-outer {
width: 200%;
margin: 0 auto;
margin-left:110px;
}

h1.header {
font-size: 50px;
line-height: 70px;

}
.header {
font-size: 50px;
line-height: 70px;
margin-left:80px;
margin-bottom: -100px; /* 调整标题位置的值 */
}
/* Timeline */

.timeline {
float:left;
width: 40%;

border-left: 8px solid #42A5F5;
border-bottom-right-radius: 2px;
border-top-right-radius: 2px;
box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
color: #333;
margin: 50px auto;
letter-spacing: 0.5px;
position: relative;
line-height: 1.4em;
padding: 20px;
list-style: none;
text-align: left;

}
#map {
width: 60%;
height: 1050px;
margin: 50px;
border: 1px solid #ccc;
float:right;
/* 其他样式属性 */
}

.parent {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
}
.timeline h1,
.timeline h2,
.timeline h3 {
font-size: 1.4em;
}

.timeline .event {
border-bottom: 1px solid rgba(160, 160, 160, 0.2);
padding-bottom: 15px;
margin-bottom: 20px;
position: relative;
}

.timeline .event:last-of-type {
padding-bottom: 0;
margin-bottom: 0;
border: none;
}

.timeline .event:before,
.timeline .event:after {
position: absolute;
display: block;
top: 0;
}

.timeline .event:before {
left: -177.5px;
color: #212121;
content: attr(data-date);
text-align: right;
/*  font-weight: 100;*/

font-size: 16px;
min-width: 120px;
}

.timeline .event:after {
box-shadow: 0 0 0 8px #42A5F5;
left: -30px;
background: #212121;
border-radius: 50%;
height: 11px;
width: 11px;
content: "";
top: 5px;
}
/**/
/*——————————————
Responsive Stuff
———————————————*/

@media (max-width: 945px) {
.timeline .event::before {
  left: 0.5px;
  top: 20px;
  min-width: 0;
  font-size: 13px;
}
.timeline h3 {
  font-size: 16px;
}
.timeline p {
  padding-top: 20px;
}
section.lab h3.card-title {
  padding: 5px;
  font-size: 16px
}
}

@media (max-width: 768px) {
.timeline .event::before {
  left: 0.5px;
  top: 20px;
  min-width: 0;
  font-size: 13px;
}
.timeline .event:nth-child(1)::before,
.timeline .event:nth-child(3)::before,
.timeline .event:nth-child(5)::before {
  top: 38px;
}
.timeline h3 {
  font-size: 16px;
}
.timeline p {
  padding-top: 20px;
}
}
/*——————————————
others
———————————————*/

a.portfolio-link {
margin: 0 auto;
display: block;
text-align: center;
}
.map {
flex: 1;
/* 在这里设置地图的样式 */
}
/* 底部样式 */
.footer {
background-color: #f2f2f2;
;
padding: 1rem;
text-align: center;
z-index: 999; /* 设置一个较高的 z-index 值 */
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
