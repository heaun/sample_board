var $loadImage = '<img src="../../images/preloader.gif">';
var $errorMessage = '<span> There is no data.</span>';
var $dashboardData = $("#dashboard_data");

var dashboard = {
    bindData: function (board) {
        var strong = $("<strong />");
        var $newRow = $("<tr />")
        if (!board.flag) $newRow.addClass('yet');
        $newRow.attr('id', board.key);
        $newRow.append($("<td />").addClass('col-sm-1').text(board.no));
        $newRow.append($("<td />").addClass('col-sm-3').text(board.title));
        $newRow.append($("<td />").addClass('col-sm-2').text(board.name));
        $newRow.append($("<td />").addClass('col-sm-3').text(board.datetime));
        $dashboardData.append($newRow);
    },
    parseFormData: function () {
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
    },
    parseJsonData: function (datas) {
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
            dashboard.bindData(board);
        };
    }
}
