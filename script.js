const cityListUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json";
const cityState = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json";
const regionState = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json";


var stateCache = 0;
var regionCache = 0;

$( document ).ready(function() {
    
    function init()
    {
        $("#submit").click(function(){
            goTable($("#citySelect option:selected").text())
          });

        $.get(cityListUrl, function( data ) {
            $.each(JSON.parse(data), function(index, value){
                if(value.denominazione_provincia !== "In fase di definizione/aggiornamento")
                    $('#citySelect').append(
                        new Option(value.denominazione_provincia, value.denominazione_provincia));
            });
            sortOptions();
          });
    }

    function getCityState()
    {
        if (stateCache != 0)
            return new Promise(resolve =>  resolve(stateCache));

        return $.get(cityState, function( data ) {
            stateCache = data;
            return stateCache;
        });
    }

    function getRegionState()
    {
        if (regionCache != 0)
            return new Promise(resolve =>  resolve(regionCache));

        return $.get(regionState, function( data ) {
            regionCache = data;
            return regionCache;
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
        $(".table").show();
        $("#provincia").text(city);
        region = undefined;
        console.log(regionsState);

        $.each(JSON.parse(state), function(index, value){
            if(value.denominazione_provincia === city && value.totale_casi != 0)
            {
                region = value.codice_regione;
                increment = value.totale_casi - previousRow;
                if (previousRow != 0)
                    percentage = (100*increment) / previousRow;
                aggregate++;
                previousRow = value.totale_casi;
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
                console.log(value);
                $("#contagi").text(value.totale_casi);
                $("#guariti").text(value.dimessi_guariti);
                $("#decessi").text(value.deceduti);
                $("#tamponi").text(value.tamponi);
                $("#regione").text(value.denominazione_regione);
            }
        })
    }


    
    init();
    });


    /* TODO
        Dati totali Italia
        Tabella a comparsa
        Grafici!
    */
