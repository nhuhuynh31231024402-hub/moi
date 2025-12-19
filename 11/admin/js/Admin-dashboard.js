// Đợi DOM load xong mới khởi tạo charts
    document.addEventListener('DOMContentLoaded', function() {
      
      // Chart 1: Booking theo thời gian (Line Chart)
      const ctx1 = document.getElementById('chart1');
      if (ctx1) {
        new Chart(ctx1, {
          type: 'line',
          data: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            datasets: [{
              label: 'Số lượt booking',
              data: [320, 385, 420, 398, 450, 520, 380],
              borderColor: '#D97706',
              backgroundColor: 'rgba(217, 119, 6, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#D97706',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  font: { family: 'Plus Jakarta Sans', size: 12 },
                  padding: 15
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
              },
              x: {
                grid: { display: false }
              }
            }
          }
        });
      }

      // Chart 2: Doanh thu theo dịch vụ (Bar Chart)
      const ctx2 = document.getElementById('chart2');
      if (ctx2) {
        new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: ['Spa', 'Thăm khám'],
            datasets: [{
              label: 'Doanh thu (triệu ₫)',
              data: [28.5, 15.2],
              backgroundColor: ['#D97706', '#059669'],
              borderRadius: 8,
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  font: { family: 'Plus Jakarta Sans', size: 12 },
                  padding: 15
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
              },
              x: {
                grid: { display: false }
              }
            }
          }
        });
      }

      // Chart 3: Trạng thái đơn (Doughnut Chart)
      const ctx3 = document.getElementById('chart3');
      if (ctx3) {
        new Chart(ctx3, {
          type: 'doughnut',
          data: {
            labels: ['Hoàn thành', 'Đang xử lý', 'Chờ xác nhận', 'Đã hủy'],
            datasets: [{
              data: [65, 20, 10, 5],
              backgroundColor: ['#059669', '#3B82F6', '#F59E0B', '#EF4444'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  font: { family: 'Plus Jakarta Sans', size: 12 },
                  padding: 15
                }
              }
            }
          }
        });
      }

      // Chart 4: Top 5 Shop (Horizontal Bar)
      const ctx4 = document.getElementById('chart4');
      if (ctx4) {
        new Chart(ctx4, {
          type: 'bar',
          data: {
            labels: ['Pet Wow', 'GẤU SPA THÚ CƯNG', '2VET', 'Tiệm nhà Sâu', 'Lumi Pet Shop'],
            datasets: [{
              label: 'Số đơn',
              data: [245, 167, 198, 289, 223],
              backgroundColor: '#D97706',
              borderRadius: 8,
              borderWidth: 0
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  font: { family: 'Plus Jakarta Sans', size: 12 },
                  padding: 15
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
              },
              y: {
                grid: { display: false }
              }
            }
          }
        });
      }

      // Chart 5: Khách hàng mới theo tháng (Line/Area Chart)
      const ctx5 = document.getElementById('chart5');
      if (ctx5) {
        new Chart(ctx5, {
          type: 'line',
          data: {
            labels: ['Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12', 'Tháng 1'],
            datasets: [{
              label: 'Khách hàng mới',
              data: [320, 380, 425, 468, 512, 567],
              borderColor: '#EC4899',
              backgroundColor: 'rgba(236, 72, 153, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: '#EC4899',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointHoverRadius: 7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  font: { family: 'Plus Jakarta Sans', size: 12 },
                  padding: 15
                }
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: { family: 'Plus Jakarta Sans', size: 14 },
                bodyFont: { family: 'Plus Jakarta Sans', size: 13 },
                borderColor: '#EC4899',
                borderWidth: 1
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: {
                  font: { family: 'Plus Jakarta Sans' }
                }
              },
              x: {
                grid: { display: false },
                ticks: {
                  font: { family: 'Plus Jakarta Sans' }
                }
              }
            }
          }
        });
      } 
    });