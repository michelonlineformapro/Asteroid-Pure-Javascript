$(document).ready(function (){
    rotateDiv();
    shoot();
});

//Rotation du player qui appel cartesianToPolar
function rotateDiv(event){
    let player = $('.hero');
    //offSet jquery = recup des coordonnées courantes de l'element selectionner (ici player)
    let coords = player.offset()

    let size = {
        width: player.width(),
        height: player.height()
    };

    let polar = cartesianToPolar(event.pageX, event.pageY, coords.left + (size.width / 2), coords.top + (size.height / 2));
    //Position de la souris avec jQuery
    //console.log(polar)

    $(".hero").css('transform', 'rotate('+ polar.angle + 'deg)');
}



//Shoot du player
function shoot(event){
    //Position de l'aire de jeu
    let gameArea;
    //Position du player
    let shooter;
    let offsets;
    let center;
    //angle + distance entre centre du player et le point cliké
    let vector;

    let target;
    let orientation;

    gameArea = $(".gameArea");
    shooter = $(".hero");

    offsets = {
        left: gameArea.offset().left,
        top: gameArea.offset().top
    }
    center = {
        left: shooter.offset().left - offsets.left + (shooter.width() / 2),
        top: shooter.offset().top - offsets.top + (shooter.height() / 2)
    }
    vector = cartesianToPolar(center.left, center.top, event.pageX - offsets.left, event.pageY - offsets.top);

    //console.log(offsets)
    //console.log(center)

    target = polarToCartesian(2500, (vector.angle + 90) * Math.PI / 180);


    orientation = {
        horizontal: (center.left + target.left) > center.left ? 1 : -1,
        vertical: (center.top + target.top) > center.top ? 1 : -1
    };
    //insatance d'une div a chaque click

    $('<div class="bullet"></div>').css(
        {
            left: center.left + "px",
            top: center.top + "px"
        }
    ).appendTo('.gameArea')
        .animate({
            left: (center.left + target.left) + "px",
            top: (center.top + target.top + "px")
        },{
            //Durée totale de animation (vitesse de bullet
            duration: 2500,
            //mode d'interpolation lineare
            easing: 'linear',
            //Supprime la bullet quand on sort de la zone de jeu
            complete: function (){
                $('.gameArea').find(this).remove()
            }
        });

}


