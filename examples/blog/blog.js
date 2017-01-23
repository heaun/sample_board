var blog = {
    bindData: function (data) {
        title.text(data.title);
        datetime.text(data.datetime);
        auther.text(data.name);
        type.text(data.type);
        description.text(data.description);
    },
    editData: function () {
        var editTitle = title.text();
        var editDescription = description.text();

        var inputTitle = '<input type="text" value="' + title.text() + '" class="form-control blog-title" id="editTitle"/>';
        var inputDescription = '<textarea class="form-control blog-post-description" id="editDescription">' + description.text() + '</textarea>';

        title.html(inputTitle);
        description.html(inputDescription);
    },
    saveData: function (param) {
        console.log(param);
        var editTitle = $('#editTitle');
        var editDescription = $('#editDescription');

        var bbs = new BoardDB();
        bbs.title = editTitle.val();
        bbs.name = auther.text();
        bbs.type = type.text();
        bbs.description = editDescription.val();
        bbs.datetime = new Date().toISOString();
        bbs.flag = true;

        db.update(param, bbs);
    }
}