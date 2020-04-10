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