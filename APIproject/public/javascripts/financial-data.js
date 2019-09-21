window.onload = async function() {
  function chartDisplay(data) {
    var xArray = Object.keys(data);
    var yArray = Object.values(data);

    const ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xArray,
        datasets: [
          {
            label: "Bitcoin Price",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            fill: false,
            lineTension: 0.4,
            pointStyle: "rect",
            pointRadius: 5,
            data: yArray
          }
        ]
      },
      options: {}
    });
  }
  function updateChart() {
    var startDateInput = startDate.value;
    var endDateInput = endDate.value;

    axios
      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDateInput}&end=${endDateInput}`
      )
      .then(response => {
        chartDisplay(response.data.bpi);
      })
      .catch(err => {
        console.log(err);
      });
  }

  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(response => {
      chartDisplay(response.data.bpi);
    })
    .catch(err => {
      console.log(err);
    });

  var startDate = document.getElementById("start-date");
  var endDate = document.getElementById("end-date");
  var currency = document.getElementById("currency");
  var currencyInput = currency.value;

  startDate.onchange = function() {
    updateChart();
  };
  endDate.onchange = function() {
    updateChart();
  };
};
