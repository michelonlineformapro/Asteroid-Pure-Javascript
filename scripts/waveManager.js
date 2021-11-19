//Creer les vague d'enemis
function createWave(){
    let currentLevel = 0;
    //nombre d'enemis a generer par vague
    let number = 10 + currentLevel;
    //Zone de jeu
    let gameArea = $('.gameArea');
    //Le player
    let target = $('.hero');
    //Les limites de la zone de jeu
    let offsets = {
        left: gameArea.offset().left,
        top: gameArea.offset().top
    }
    //les limites du player
    let size = {
        width: target.width(),
        height: target.height()
    }

    //dimension de la zone d'aparaition possible

    let coords = {
        left: target.offset().left + (size.width / 4) - offsets.left,
        top: target.offset().top + (size.height / 4) - offsets.top
    }
    //Boucle de creation des vagues d'enemis un a un
    for (let t = 0; t < number; t++){
        /*
        La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
        Math.random retourne une valeur en 0 et 100
         */
        //generation d'une distance au hasard en 400 et 500px
        let distance = 400 + parseInt((Math.random() * 100));
        //Nombre de point de vie random des enemeis
        let PV  = parseInt(Math.random() * 3) + 1;
        //Angle d'apparition random entre 0 et 360°
        let anglePos = parseInt(Math.random() * 359);
        //Recup du point d'apparition des enemis
        let targetCartesianCoords = polarToCartesian(distance, anglePos);
        //Orientation que doit prendre l'enemis de l'enemis avant de ce diriger vers le player
        let orientation = cartesianToPolar(coords.left, coords.top, coords.left + targetCartesianCoords.left, coords.top + targetCartesianCoords.top);

        //Ajoute au tableau des enemis
        enemies.push(
            {
                //Appel de id unique a chaque enemis a l'aide de la fonction guiID
                id: guiID(),
                //Nombre de PV pour la soliditer de l'enemis
                PV: PV,
                //Stock des points de vie de l'enemis
                life: PV,
                //stock de la valeur de l'angle random
                angle: anglePos,
                //Stock du point de depart de l'enemis
                coords:coords,
                //Stock de la variable du meme nom
                targetCartesianCoords: targetCartesianCoords,
                //Stock de la valeur du vecteur (distance et orientation) vers le player
                orientation: orientation
            });
    }
}

//Rendus des vagues d'enemis
function renderWave(){
    //variable enemis
    /*
    La méthode shift() permet de retirer le premier élément d'un tableau et
     de renvoyer cet élément. Cette méthode modifie la longueur du tableau.
     */
    //Stock de index 0 a l'aide shift()
    //grace a cette instruction le tableau ce reduit d'un element et ne contient que les enemis de la vague courante
    //et non celle encore en jeu
    let enemi = enemies.shift();
    //condition
    if(enemi){
        //Ajout du sprite enemi + id
        $('<img class="enemi" data-id="' + enemi.id +'" src="./images/enemi1.png" />')
            .css({
                left: (enemi.coords.left + enemi.targetCartesianCoords.left) + 'px',
                top: (enemi.coords.top + enemi.targetCartesianCoords.top) + 'px',
                //taille differente en fonction de pv
                transform: 'rotate(' + (enemi.orientation.angle) + 'deg)' + (enemi.PV === 1 ? 'scale(.75)' : enemi.PV === 3 ? 'scale(1.5)' : '')
            })
            //ajout a la zone de jeu
            .appendTo('.gameArea')
            .animate(
                {
                    left: enemi.coords.left + 'px',
                    top: enemi.coords.top + 'px'
                },
                {
                    //Si l'enemi est petit il va + plus vite
                    duration: 20000 - (enemi.PV === 1 ? 10000 : enemi.PV === 2 ? -10000 : 0),
                    easing: "linear"
                });
        enemi.htmlElement = $('.enemi[data-id="' + enemi.id + '"]');
        enemiesInGame.push(enemi);
        setTimeout(
            //Apparation des vagues d'enemis toutes les 2 secondes
            renderWave,
            2000
        )
    }
}