const cityListUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json";
const cityState = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json";

$( document ).ready(function() {



    console.log("partito")
    
    function init()
    {
        $("#submit").click(function(){
            goTable($("#citySelect option:selected").text())
          });



        $.get(cityListUrl, function( data ) {
    
            
            $.each(JSON.parse(data), function(index, value){
                if(value.denominazione_provincia !== "In fase di definizione/aggiornamento")
                $('#citySelect').append(
                    new Option(value.denominazione_provincia, value.denominazione_provincia));});
          });
    }

    function goTable(city)
    {

        $.get(cityState, function( data ) {
            aggregate = 0;
            previousRow = 0;
            percentage = 0
            increment = 0
            $("#tableBody").empty();

            $.each(JSON.parse(data), function(index, value){
                if(value.denominazione_provincia === city && value.totale_casi != 0)
                {
                    increment = value.totale_casi - previousRow;
                    if (previousRow != 0)
                        percentage = (100*increment) / previousRow;
                    aggregate++;
                    previousRow = value.totale_casi;
                    $("#tableBody")
                    .append($('<tr>')
                    .append($('<th>').append(aggregate))
                    .append($('<td>').append(city))
                    .append($('<td>').append(value.data))
                    .append($('<td>').append(value.totale_casi))
                    .append($('<td>').append(increment))
                    .append($('<td>').append(percentage.toFixed(2) + "%")));
                }
                
            });
          });
    }
    
    
    
    init();
    });


$("#tableID").find('tbody')
    .append($('<tr>')
        .append($('<td>')
            .append($('<img>')
                .attr('src', 'img.png')
                .text('Image cell')
            )
        )
    );