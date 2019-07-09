$(document).ready(function () {
    marketList = $("#markets-list");

    $.get("/api/markets", function (marketData) {

        marketData.forEach(element => {
            marketInfo = `${element.address}, ${element.schedule}`;
            marketList.append(
                `<a class="dropdown-item individual-market" href="/client-markets/${element.id}" id="${element.id}">
                <p style="font-size:12px;">${marketInfo}</p><br><p style="font-size:10px;">${element.products}</p></a>`);
        });

    });

});


