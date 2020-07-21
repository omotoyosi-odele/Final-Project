// d3.json("/api/v1.0/genre-count").then((genredata) => {
//     var genreNames = Object.keys(genredata);
//     var genreCount = Object.values(genredata);   

//     genreData = [{
//         x: genreNames,
//         y: genreCount,
//         type: "bar"
//     }];

//     genreLayout = {
//         title: {text: "Genre Count"},
//         xaxis: {
//             title: {text: "Genre"}
//         },
//         yaxis: {
//             title: {text: "Number of Times Genre Appears in Dataset"}
//         }
//     };

//     Plotly.newPlot("genre-bar", genreData, genreLayout);
// });

d3.json("/api/v1.0/genre-count").then((genredata) => {
    var ctx = document.getElementById('genreBar').getContext('2d');
    var genreNames = Object.keys(genredata);
    var genreCount = Object.values(genredata);
    console.log(genreCount); 
    console.log(genreNames);

    var data = {
        datasets: [{
            data: genreCount
        }],
        label: genreNames
        };

    var mychart = new Chart(ctx, {
            data: data,
            type: 'bar'
        });

});

d3.select(".genre-btn").on("click", function(){
    var plotString = d3.select( ".plot-input" ).node().value;
    var plotObject = {
        plot: plotString
    }
    d3.json('/api/v1.0/genre-json', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:  JSON.stringify(plotObject)
    }).then(function(response){
        console.log(response);

        d3.select('#alertZone').html(
        `<div class="alert alert-dismissible alert-secondary">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            ${response.response}
        </div>`
        )
    }).catch(function (err) {
        console.log(err, '<--error-->');

        d3.select('#alertZone').html(
        `<div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
           Please enter a plot value
        </div>`
        )
    });
}
);
