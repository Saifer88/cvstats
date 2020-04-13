const cityState = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json";
const regionState = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json";


var stateCache = 0;
var regionCache = 0;


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