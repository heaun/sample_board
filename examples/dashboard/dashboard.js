var $loadImage = '<img src="../../images/preloader.gif">';
var $errorMessage = '<span> There is no data.</span>';
var $dashboardData = $("#dashboard_data");

var dashboard = {
    readFileData: function (e) {
        $.ajax({
            url: '/WebService.asmx/getBoardList',
            type: 'post',
            timeout: 30000,
            dataType: 'xml',
            beforeSend: function () {
                var html = '<tr><td colspan="6">' + $loadImage + '</td></tr>';
                $dashboardData.html(html);
            },
            success: function (xml) {
                $('#dashboard').addClass('table-striped');
                console.log('success');
                parseXMLData(xml);
            },
            error: function (xhr, status, error) {
                console.log('error');
                console.log(xhr);
                console.log(status);
                console.log(error);
                var html = '<tr><td colspan="6">' + $errorMessage + '</td></tr>';
                $dashboardData.html(html);
            },
            complete: function (data) {
                console.log('complete');
            }
        });
        return false;
    } 
}

function bindData(board) {
    var strong = $("<strong />");
    var $newRow = $("<tr />")
    if (!board.flag) $newRow.addClass('yet');
    $newRow.attr('id', board.key);
    $newRow.append($("<td />").addClass('col-sm-1').text(board.no));
    $newRow.append($("<td />").addClass('col-sm-3').text(board.title));
    $newRow.append($("<td />").addClass('col-sm-2').text(board.name));
    $newRow.append($("<td />").addClass('col-sm-3').text(board.datetime));
    $dashboardData.append($newRow);
}

function parseData() {
    console.log('parseData');

    var bbs = new BoardDB();
    bbs.title = $('#inputTitle').val();
    bbs.name = $('#inputName').val();
    bbs.type = $('#inputType').val();
    bbs.description = $('#inputDescription').val();
    bbs.datetime = new Date().toISOString();
    bbs.flag = false;
    console.log(bbs);
    return bbs;
}

function parseJsonData(datas) {
    $dashboardData.empty();
    for (var d in datas) {
        board = new Board();
        board.no = parseInt(d) + 1;
        board.title = datas[d].title;
        board.name = datas[d].name;
        board.type = datas[d].type;
        board.datetime = datas[d].datetime;
        board.key = datas[d]._id.$oid;
        board.flag = datas[d].flag;
        bindData(board);
    };
}

function parseXMLData(xml) {
    console.log('parseXMLData');
    var xmlData = $(xml).find("Board");

    $dashboardData.empty();
    xmlData.each(function (i, item) {

        board = new Board();
        board.no = $(item).find('no').text();
        board.title = $(item).find('title').text();
        board.name = $(item).find('name').text();
        board.type = $(item).find('type').text();
        board.datetime = $(item).find('dateTime').text();
        board.description = $(item).find('description').text();
        bindData(board);

    });
}