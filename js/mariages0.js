//https://www.aliasdmc.fr/coursjavas/cours_javascript82.html
var leCentre 	= document.createElement('center');
var lePlateau 	= document.createElement('table');

var lesCases  = [];
var lesCartes = [];

var nbCartesVisibles =0;
var carteVue1 = null;
var carteVue2 = null;

// console.log('créer le plateau');
/*
	une case hérite de la balise td
	elle a un attribut numCase : son identifiant
*/
for (var i = 0; i < 4; i++) 
{
    var tr = document.createElement('tr');
    for (var j = 0; j < 7; j++)
	{
        var td = document.createElement('td');
		lesCases.push(td);
		td.setAttribute('numCase',7*i+j);
		tr.appendChild(td);
    }
    lePlateau.appendChild(tr);
}
leCentre.appendChild(lePlateau);
document.body.appendChild(leCentre);

//console.log('créer les cartes');
/*
 une carte a pour attributs:
	 un numéro	 : numCarte, son identifiant
	 deux images : recto et verso
	 un booléen  : estVisible 
	 un entier	 : numOriginal
*/
/*extraire 14 entiers dans l'ensemble [1..17]*/
var lesNuméros = [];
for (var i = 1; i <= 17; i++) 
{
	lesNuméros.push(i);
}
var lesNumérosRetenus = [];
while(lesNumérosRetenus.length <14)
{
	var unNuméroAléatoire = (Math.floor(Math.random() * (17))+1);
	var existe = 0;
	for (var i = 0; i < lesNumérosRetenus.length; i++) 
	{
		if(lesNumérosRetenus[i]==unNuméroAléatoire)existe = 1;
	}
	if(existe == 0)	lesNumérosRetenus.push(unNuméroAléatoire);
}
console.log(lesNuméros);
console.log(lesNumérosRetenus);
 
for (var i = 0; i < 14; i++) 
{
	var carte = new Object();
	carte.numCarte = i;
	
	var recto = document.createElement('img');
	var nomFichier = './images/bibi/'+(lesNumérosRetenus[i])+'.png';
	// var nomFichier = './images/'+((i%14)+1)+'.jpg';
	//console.log(nomFichier);
	recto.src = nomFichier;
	carte.recto = recto;
	
	var verso = document.createElement('img');
	var nomFichier = './images/verso.jpg';
	verso.src = nomFichier;
	carte.verso = verso;
	
	carte.estVisible = 0;
	carte.numOriginal = i%14;
	lesCartes.push(carte);
};
for (var i = 14; i < 28; i++) 
{
	var carte = new Object();
	carte.numCarte = i;
	
	var recto = document.createElement('img');
	var nomFichier = './images/bibi/'+(lesNumérosRetenus[i-14])+'.png';
	// var nomFichier = './images/'+((i%14)+1)+'.jpg';
	//console.log(nomFichier);
	recto.src = nomFichier;
	carte.recto = recto;
	
	var verso = document.createElement('img');
	var nomFichier = './images/verso.jpg';
	verso.src = nomFichier;
	carte.verso = verso;
	
	carte.estVisible = 0;
	carte.numOriginal = i%14;
	lesCartes.push(carte);
};


mélanger(lesCartes)


// console.log("poser les cartes");
for (var i = 0; i < 28; i++) 
{
	lesCases[i].appendChild(lesCartes[i].verso);
};
// console.log('fin poser les cartes');

// console.log('gestion des clics sur le plateau');
lePlateau.addEventListener
(	'click',
	function(e)
	{
		var td = e.target.parentNode;
		var numCaseCliquée = e.target.parentNode.getAttribute('numCase');
		carteCliquée = lesCartes[numCaseCliquée];
		console.log(carteCliquée)
		if(carteCliquée.estVisible == 1)
		{
			return;
		}
		if(nbCartesVisibles == 0)
		{
			carteVue1 = carteCliquée;
			montrer(carteVue1);
			nbCartesVisibles++;
			return;
		}
		if(nbCartesVisibles == 1)
		{
			carteVue2 = carteCliquée;
			montrer(carteVue2);
			nbCartesVisibles++;
			// si les originaux sont les mêmes
			if( carteVue1.numOriginal ==  carteVue2.numOriginal)
			{
				nbCartesVisibles = 0;
				return;
			}
			// si les originaux sont différents
			setTimeout
			(
				function()
				{
					cacher(carteVue1);
					cacher(carteVue2);
					nbCartesVisibles=0;
				}
				,1000
			);
			return;
		}
	}
)

function mélanger(a) // mélanger le tableau a
{
    for (let i = a.length - 1; i > 0; i--) 
	{
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function cacher(uneCarte) 
{
	var td =  uneCarte.recto.parentNode;
	td.replaceChild(uneCarte.verso,uneCarte.recto);
	uneCarte.estVisible = 0;
}
function montrer(uneCarte) 
{
	var td =  uneCarte.verso.parentNode;
	td.replaceChild(uneCarte.recto,uneCarte.verso);
	uneCarte.estVisible = 1;
}