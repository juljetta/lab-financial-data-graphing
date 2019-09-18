window.onload = async function() {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(response => {
      var data = response.data.bpi;

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
    })
    .catch(err => {
      console.log(err);
    });
};
