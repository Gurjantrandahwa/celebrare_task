window.onload = function () {
    let canvas = document.getElementById("canvas")
    let context = canvas.getContext('2d')

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    $("#file").change(function (e) {
        img = new Image;
        img.onload = function () {
            context.drawImage(img, 0, 0);
        }
        img.src = URL.createObjectURL(e.target.files[0]);
    })

    $(".image-container img").click(function (e) {

        let id = $(this).attr("id");

        $("#hidden").attr("src", "shapes/" + id + ".png");

        img1 = document.getElementById("hidden");

        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = 'source-in';
        context.drawImage(img1, 0, 0);
        context.drawImage(img, 0, 0);
        context.globalCompositeOperation = 'source-over'
    })
}