var $loadImage = '<img src="images/preloader.gif" id="loader">';
var $errorMessage = '<span> There is no data.</span>';

function Board() {
    var no, title, name, type, description, datetime, flag, key;

    this.no = no;
    this.title = title;
    this.name = name;
    this.type = type;
    this.description = description;
    this.datetime = datetime;
    this.flag = flag;
    this.key = key;
}

function BoardDB() {
    var title, name, type, description, datetime, flag;

    this.title = title;
    this.name = name;
    this.type = type;
    this.description = description;
    this.datetime = datetime;
    this.flag = flag;
}

var common = {
    urlParam: function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    }
}

var db = {
    key: '2s2GVNFmSENPgHzeEQZsf2D6edvedgOu',
    url: 'https://api.mlab.com/api/1',
    my_db: 'heb_board',
    collection: 'bbs',
    all: function () {
        $.ajax({
            url: db.url + '/databases/' + db.my_db + '/collections/' + db.collection,
            type: 'GET',
            data: {
                "apiKey": db.key
            },
            timeout: 30000,
            dataType: 'json',
            beforeSend: function () {
                var html = '<tr><td colspan="6" class="text-center">' + $loadImage + '</td></tr>';
                $("#dashboard_data").html(html);
            },
            success: function (data) {
                $('#dashboard').addClass('table-striped');
                console.log(data);
                parseJsonData(data);
            },
            error: function (xhr, status, error) {
                console.log('all error');
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    },
    get: function (_id) {
        var data = $.ajax({
            url: db.url + '/databases/' + db.my_db + '/collections/' + db.collection + '/' + _id + '?apiKey=' + db.key,
            type: "GET",
            contentType: "application/json",
            beforeSend: function () {
                var html = $loadImage;
                $('.blog-post').hide();
                $('#loader').show();
            },
            success: function (d) {
                $('#loader ').hide();
                $('.blog-post').show();
                console.log('get success');
                blog.bindData(d);
            },
            error: function (xhr, status, err) {
                console.log(status + ' : ' + err);
            },
            complete: function (data) {
                $('#edit').show();
                $('#save').hide();
                console.log(data);
                var d = data.responseJSON;
                var bbs = new BoardDB();
                bbs.title = d.title;
                bbs.name = d.name;
                bbs.type = d.type;
                bbs.description = d.description;
                bbs.datetime = d.datetime;
                bbs.flag = true;
                db.read(param, bbs);
            }
        });
    },
    write: function (datas) {
        console.log(JSON.stringify(datas));
        $.ajax({
            url: db.url + '/databases/' + db.my_db + '/collections/' + db.collection + '?apiKey=' + db.key,
            data: JSON.stringify(datas),
            type: "POST",
            contentType: "application/json",
            timeout: 30000,
            success: function (data) {
                $('#dashboard').addClass('table-striped');
                console.log('write success');
                BootstrapDialog.show({
                    title: 'Info',
                    message: 'Data was added!'
                });
            },
            error: function (xhr, status, error) {
                console.log('write error');
                console.log(status);
                console.log(xhr);
                console.log(error);
            },
            complete: function (data) {
                console.log('write complete');
                db.all();
            }
        });
    },
    remove: function (_id) {
        $.ajax({
            url: db.url + '/databases/' + db.my_db + '/collections/' + db.collection + '/' + _id + '?apiKey=' + db.key,
            type: "DELETE",
            async: true,
            timeout: 300000,
            success: function (data) {
                console.log('remove success');
                console.log(data);
            },
            error: function (xhr, status, err) {

                console.log(status + ' : ' + err);
            },
            complete: function () {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Info',
                    message: 'Data was deleted!'
                });
                setTimeout($(location).attr('href', '../dashboard/index.html'), 20000);
            }
        });
    },
    update: function (_id, datas) {
        $.ajax({
            url: db.url + '/databases/' + db.my_db + '/collections/' + db.collection + '/' + _id + '?apiKey=' + db.key,
            data: JSON.stringify(datas),
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                console.log('update success');
                console.log(data);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Info',
                    message: 'Data was updated!'
                });
            },
            error: function (xhr, status, err) {
                console.log(status + ' : ' + err);
            },
            complete: function () {
                db.get(_id);
            }
        });
    },
    read: function (_id, datas) {
        $.ajax({
            url: db.url + '/databases/' + db.my_db + '/collections/' + db.collection + '/' + _id + '?apiKey=' + db.key,
            data: JSON.stringify(datas),
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                console.log('read success');
                console.log(data);
            },
            error: function (xhr, status, err) {
                console.log(status + ' : ' + err);
            }
        });
    }
}