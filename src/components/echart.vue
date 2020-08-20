<template>
<div style="min-height: 300px" v-show="dataList!=null">
</div>
</template>

<script>
  import {Chart} from "@antv/g2"
  export default {
    name: "echart",
    props:[
      "dataList",
      "optionList",
      "type"
    ],
    data(){
      return {data:[],chart:null,count:0}
    },
    mounted(){
      this.dataInit();
      this.data =this.optionList;
       this.chart = new Chart( {
        container: this.$el,
        autoFit: true,
        height: 500,
      });

       this.chartReady();
    },
    methods:{
      dataInit(){
        this.optionList.map((e,index)=>{
          e.item=String.fromCharCode('A'.charCodeAt()+index);
          e.count=0;
          e.percent=0;
        });
        let count = this.dataList.reduce((a,b)=>b.selected+a,0);
        this.dataList.map(e=>{
          e.percent = e.selected/count;
        });
        this.optionList.map(e=>{
          this.dataList.map(x=>{
           if (x.optionId==e.id){
             e.percent=parseInt(x.percent*100)/100;
             e.cpunt =x.count;
           }
          });
        });
        this.count = count;
      },
      chartReady(){
        let chart = this.chart;
        let type = this.type;
        if (type==null) type="饼图";
        switch (type) {
          case "饼图":{
            chart.data(this.data);
            chart.coordinate('theta', {
              radius: 0.85
            });
            chart.scale('percent', {
              formatter: (val) => {
                val = val * 100 + '%';
                return val;
              },
            });
            chart.tooltip({
              showTitle: false,
              showMarkers: false,
            });
            chart.axis(false); // 关闭坐标轴
            const interval = chart
              .interval()
              .adjust('stack')
              .position('percent')
              .color('item')
              .label('percent', {
                offset: -40,
                style: {
                  textAlign: 'center',
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, .45)',
                  fill: '#fff',
                },
              })
              .tooltip('item*percent', (item, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: item,
                  value: percent,
                };
              })
              .style({
                lineWidth: 1,
                stroke: '#fff',
              });
            chart.interaction('element-single-selected');
            chart.render();

            // 默认选择
            interval.elements[0].setState('selected', true);
          } break;
          case "圆环图":{
            chart.data(this.data);
            chart.scale('percent', {
              formatter: (val) => {
                val = val * 100 + '%';
                return val;
              },
            });
            chart.coordinate('theta', {
              radius: 0.75,
              innerRadius: 0.6,
            });
            chart.tooltip({
              showTitle: false,
              showMarkers: false,
              itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
            });
// 辅助文本
            chart.annotation()
              .text({
                position: ['50%', '50%'],
                content: '总计',
                style: {
                  fontSize: 14,
                  fill: '#8c8c8c',
                  textAlign: 'center',
                },
                offsetY: -20,
              })
              .text({
                position: ['50%', '50%'],
                content: this.count,
                style: {
                  fontSize: 20,
                  fill: '#8c8c8c',
                  textAlign: 'center',
                },
                offsetX: -10,
                offsetY: 20,
              });
            chart
              .interval()
              .adjust('stack')
              .position('percent')
              .color('item')
              .label('percent', (percent) => {
                return {
                  content: (data) => {
                    return `${data.item}: ${percent * 100}%`;
                  },
                };
              })
              .tooltip('item*percent', (item, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: item,
                  value: percent,
                };
              });

            chart.interaction('element-active');

            chart.render();
          } break;
          case "柱形图":{
            chart.data(this.data);
            chart.scale('sales', {
              nice: true,
            });

            chart.tooltip({
              showMarkers: false
            });
            chart.interaction('active-region');

            chart.interval().position('item*percent');

            chart.render();
          } break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
