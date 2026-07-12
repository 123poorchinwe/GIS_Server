<template>
  <div class="data-selection-panel">
    <h2>选择数据</h2>
    
    <!-- 点数据选择框 -->
    <div>
      <h3>点数据</h3>
      <div v-for="point in points" :key="point.id">
        <input type="checkbox" :id="point.id" v-model="selectedData.points" :value="point.id" @change="updateData" />
        <label :for="point.id">{{ point.name }}</label>
      </div>
    </div>

    <!-- 线数据选择框 -->
    <div>
      <h3>线数据</h3>
      <div v-for="line in lines" :key="line.id">
        <input type="checkbox" :id="line.id" v-model="selectedData.lines" :value="line.id" @change="updateData" />
        <label :for="line.id">{{ line.name }}</label>
      </div>
    </div>

    <!-- 面数据选择框 -->
    <div>
      <h3>面数据</h3>
      <div v-for="polygon in polygons" :key="polygon.id">
        <input type="checkbox" :id="polygon.id" v-model="selectedData.polygons" :value="polygon.id" @change="updateData" />
        <label :for="polygon.id">{{ polygon.name }}</label>
      </div>
    </div>

    <!-- 建筑数据选择框 -->
    <div>
      <h3>建筑数据</h3>
      <div>
        <input type="checkbox" id="buildings" v-model="selectedData.buildings" value="buildings" @change="updateData" />
        <label for="buildings">南京建筑</label>
      </div>
    </div>
    <div>
      <h3>空间分析</h3>
      <div>
        <input type="checkbox" id="Analysis" v-model="selectedData.Analysis" value="Analysis" @change="updateData" />
        <label for="Analysis">热点分析</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedData: {
        points: [],
        lines: [],
        polygons: [],
        buildings: false,
      },
      points: [
        { id: 'restaurant', name: '餐饮' },
        { id: 'mall', name: '超市商场' },
        // ... 其他点数据
      ],
      lines: [
        { id: 'highway', name: '高速' },
        { id: 'subway', name: '地铁轻轨' },
        // ... 其他线数据
      ],
      polygons: [
        { id: 'island', name: '岛' },
        { id: 'green_space', name: '绿地' },
        {id:'xianjie',name:'县界'}
        // ... 其他面数据
      ],
    };
  },
  methods: {
    updateData() {
      // 触发外部组件的 loadData 事件
      this.$emit('loadData', this.selectedData);
    },
  },
};
</script>

<style scoped>
h2, h3 {
  margin-bottom: 5px;
}
.data-selection-panel {
  position: absolute;
  top: 20px; /* 调整垂直位置，距离顶部的距离 */
  left: 20px; /* 调整水平位置，距离左侧的距离 */
  background-color: #fff; /* 设置背景透明 */
  border: ; /* 移除边框 */
  padding: 10px;
  margin: 0;
  z-index:999
}
</style>