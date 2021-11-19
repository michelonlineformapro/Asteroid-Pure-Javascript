
/*******************************VARIABLE GLOBALE*******************/
//Vague courante
let currentWave = 1;
//tableau des enemy
let enemies = [];
//Tableau des enemy en jeu
let enemiesInGame = [];


/********************************INITIALISATION DE LA PAGE*****************************/
$(document).ready(() =>{
   init();
});

function init(){
    //Rotation du player dans la zone de jeu à l'aide de la souris
    $('.gameArea').on('mousemove', rotateDiv);
    //Click + shoot du player (fonction shoot())
    $(document).on('click', shoot);
    //Eviter effet de bord (rendre le player non selectable (surbrillance))
    //$(document).attr("unselectable", "on").css("user-select", "none").css("MozUserSelect", "none").on("selectstart", "none");
    //Creation des vagues d'enemis
    createWave();
    //Afficher les vagues d'enemis
    renderWave();
}

//objet contenant 2 proprietées distance + angle
//x1 et y1 sont la distance + x2 et y2 sont l'angle
function cartesianToPolar(x1, y1, x2, y2){
    let x = x2 - x1;
    let y = y2 - y1;
    return{
        //Math.sqrt = renvoie la racine carrée d'un nombre (ici distance + angle)
        distance: Math.sqrt((x * x) + (y * y)),
        //Math.atan2 = renvoie l'arc tangente du quotient de ses arguments
        angle: -(Math.atan2(x,y) * 180 / Math.PI)
    }
}

//coordonnées des point situé sur la trajectoire entre a et z
function polarToCartesian(distance, angle){
    return {
        //Math.cos = retourne le cosinus d'un angle dont la valeur est exprimée en radians.
        /*
        La méthode Math.cos() renvoie une valeur numérique comprise entre -1 et 1.

         Cela représente la valeur du cosinus de l'angle correspondant à cette valeur.
         */
        left: distance * Math.cos(angle),
        //Math.sin = renvoie le sinus d'un nombre.
        /*
        La méthode sin() renvoie une valeur numérique comprise (au sens large) entre 1 et -1 et qui représente
        le sinus d'un angle donné en radians.
        en 1 et -1
         */
        top: distance * Math.sin(angle)
    }
}

//id unique a chaque enemis instancié
//0-9 A-F = valeur hexadecimal (base16)
//Plusieur groupe Aléatoire = soit : 8 4 4 4 12 separée par des tiret
//ex : ******** - **** - **** - **** - ***********
//
function guiID(){
    let group = function (groupeLength){
        return String(' ')
            .repeat(groupeLength)
            .split('')
            /*
            L'interface Crypto représente les fonctions cryptographiques de base dans notre contexte actuel. Elle permet d'accéder à de
            solides générateur de nombres aléatoires dédiés à la cryptographie ainsi qu'aux principales primitives cryptographiques.
             */
            .map(event => crypto.getRandomValues(new Uint8Array(1))[0] % 16)
            .map(event => event.toString(16).toUpperCase())
            .join('')
    };
    return group(8) + "-" + group(4) + "-" + group(4) + "-" + group(4) + "-" + group(12);
}

