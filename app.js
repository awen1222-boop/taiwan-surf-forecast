// 初始化 Chart.js 圖表
const ctx = document.getElementById('surfChart').getContext('2d');
let surfChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        datasets: [{
            label: '預估浪高 (m)',
            data: [1.1, 1.0, 1.2, 1.3, 1.2, 1.1, 1.4, 1.3], // 這裡之後可以帶入 API 數據
            borderColor: '#328cc1',
            backgroundColor: 'rgba(50, 140, 193, 0.1)',
            borderWidth: 2,
            tension: 0.4, // 讓線條變平滑波浪狀
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 3
            }
        }
    }
});

// 切換地區按鈕的邏輯
function switchRegion(e, regionId) {
    // 1. 切換按鈕 active 樣式
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // 修正：明確指定點擊的目標按鈕加上 active
    e.currentTarget.classList.add('active');

    // 2. 切換資料與更新大標題
    const title = document.getElementById('current-spot');
    
    if (regionId === 'north') {
        title.innerText = "金山 烏石港沙灘 (北部)";
        updateChartData([0.6, 0.5, 0.7, 0.8, 0.6, 0.5, 0.4, 0.3]);
    } else if (regionId === 'yilan') {
        title.innerText = "宜蘭 烏石港外澳";
        updateChartData([1.1, 1.0, 1.2, 1.3, 1.2, 1.1, 1.4, 1.3]);
    } else if (regionId === 'hualien') {
        title.innerText = "花蓮 磯崎海灘";
        updateChartData([1.8, 1.9, 2.2, 2.0, 1.7, 1.5, 1.6, 1.8]);
    }
}

// 動態更新圖表函數
function updateChartData(newData) {
    surfChart.data.datasets[0].data = newData;
    surfChart.update();
}