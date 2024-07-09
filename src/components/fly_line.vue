<template>
    <div>
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  export default {
    name:"FlyPage",
    mounted() {
      var map = new BMap.Map('map', {
        minZoom: 5
      });
      map.centerAndZoom(new BMap.Point(112.03956, 26.063677), 6);
      map.enableScrollWheelZoom(true);
      map.setMapStyle({
        styleJson: styleJson
      });
  
      var data = [{
        from: {
          city: '广州',
          lnglat: [113.270793, 23.135308]
        },
        to: {
          city: '衡山',
          lnglat: [112.612787, 27.317599]
        }
      }, {
        from: {
          city: '广州',
          lnglat: [113.270793, 23.135308]
        },
        to: {
          city: '北京',
          lnglat: [116.413554, 39.911013]
        }
      }, {
        from: {
          city: '广州',
          lnglat: [113.270793, 23.135308]
        },
        to: {
          city: '三亚',
          lnglat: [109.518646, 18.258217]
        }
      }, {
        from: {
          city: '广州',
          lnglat: [113.270793, 23.135308]
        },
        to: {
          city: '上海',
          lnglat: [121.480237, 31.236305]
        }
      }, {
        from: {
          city: '广州',
          lnglat: [113.270793, 23.135308]
        },
        to: {
          city: '韶关',
          lnglat: [113.603757, 24.816174]
        }
      }];
  
      var moveLine = new MoveLine(map, {
        markerRadius: 2,
        markerColor: null,
        lineType: 'solid',
        lineWidth: 1,
        colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
        moveRadius: 2,
        fillColor: '#fff',
        shadowColor: '#fff',
        shadowBlur: 5,
        data: data
      });
  
      var options = {
        moveRadius: 2,
        fillColor: '#fff',
        shadowColor: '#fff',
        shadowBlur: 10,
      };
  
      function finished() {
        moveLine.update(options);
      }
  
      var gui = new dat.GUI({
        nameMap: {
          moveRadius: '移动点半径',
          fillColor: '移动点颜色',
          shadowColor: '移动点阴影颜色',
          shadowBlur: '移动点阴影大小',
        }
      });
  
      finished();
      gui.add(options, 'moveRadius', 1, 10).onFinishChange(finished);
      gui.addColor(options, 'fillColor').onChange(finished);
      gui.addColor(options, 'shadowColor').onChange(finished);
      gui.add(options, 'shadowBlur', 0, 20).onChange(finished);
    }
  };
  </script>
  

  
  <style scoped>
  /* Add your component's styles here */
  #map {
    background-color: #FFFFff
    ;
    color: #fff;
  }
  
  </style>
  