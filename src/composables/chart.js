import { ref } from 'vue';

const chartRef = ref(null);

export default function useChartRef() {
  function setChart(chart) {
    chartRef.value = chart.value;
  }

  function getChart() {
    return chartRef;
  }
  return { setChart, getChart };
}
