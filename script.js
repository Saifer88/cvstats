const cityListUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json";


var totalCasesChart;
var incrementChart;
var percentageIncrementChart;


$( document ).ready(function() {
    
    function init()
    {
        totalCasesChart = createChart('#totalCasesChart', 'Casi Totali', 'rgb(255, 57, 57)');
        incrementChart = createChart('#incrementChart', 'Incrementi', 'rgb(50, 106, 236)');
        percentageIncrementChart = createChart('#percentageIncrementChart', 'Percentuale Incrementi', 'rgb(249, 141, 0)');

        $("#citySelect").change(function(){
            goTable($("#citySelect option:selected").text())
          });

        $.get(cityListUrl, function( data ) {
            $.each(JSON.parse(data), function(index, value){
                if(value.denominazione_provincia !== "In fase di definizione/aggiornamento")
                    $('#citySelect').append(
                        new Option(value.denominazione_provincia, value.denominazione_provincia));
            });
            sortOptions();
            $('#citySelect').val('Bergamo').change();
            $('#citySelect').focus();

          });
    }

    async function goTable(city)
    {
        state = await getCityState(); 
        regionsState = await getRegionState();
        aggregate = 0;
        previousRow = 0;
        percentage = 0
        increment = 0
        $("#tableBody").empty();
        $("#provincia").text(city);
        region = undefined;
        dateLabels = [];
        cases = [];
        increments = [];
        percentageIncrements = [];

        $.each(JSON.parse(state), function(index, value){
            if(value.denominazione_provincia === city && value.totale_casi != 0)
            {
                region = value.codice_regione;
                increment = value.totale_casi - previousRow;
                if (previousRow != 0)
                    percentage = (100*increment) / previousRow;
                aggregate++;
                previousRow = value.totale_casi;
                dateLabels.push(value.data.slice(5, -9));
                cases.push(value.totale_casi);
                increments.push(increment);
                percentageIncrements.push(adjustNumber(percentage));
                $("#tableBody")
                .append($('<tr>')
                .append($('<td>').append(aggregate))
                .append($('<td>').append(value.data.slice(0, -9)))
                .append($('<td>').append(value.totale_casi))
                .append($('<td>').append(increment))
                .append($('<td>').append(adjustNumber(percentage) + "%")));
            }
        });
        $.each(JSON.parse(regionCache), function(index, value){
            if (value.codice_regione === region)
            {
                $("#contagi").text(value.totale_casi);
                $("#guariti").text(value.dimessi_guariti);
                $("#decessi").text(value.deceduti);
                $("#tamponi").text(value.tamponi);
                $("#regione").text(value.denominazione_regione);
            }
        });
        updateChart(totalCasesChart, dateLabels, cases);
        updateChart(incrementChart, dateLabels, increments);
        updateChart(percentageIncrementChart, dateLabels, percentageIncrements);
    }

    init();
    });


    /* TODO
        Dati totali Italia
    */
