function adjustNumber(number)
{
    if (number % 1 != 0)
    {
        number = number.toFixed(1);
        if (number % 1 == 0)
            number = number.slice(0,-2);
    }
    return number;
}

function sortOptions() 
{
    var options = $("#citySelect option");                    // Collect options         
    options.detach().sort(
        function(a,b) {               // Detach from select, then Sort
            var at = $(a).text();
            var bt = $(b).text();         
            return (at > bt)?1:((at < bt)?-1:0);            // Tell the sort function how to order
    });
    options.appendTo("#citySelect");   
}

function createChart(element, name, color)
{
    return new Chart($(element), 
    {
        type: 'line',
        data: {
            datasets: [{
                label: name,
                backgroundColor: color,
                borderColor: 'rgb(0, 0, 0)',
            }]
        }
    });
}

function updateChart(element, labels, dataset)
{
    element.data.datasets[0].data = dataset;
    element.data.labels = labels;
    element.update();
}