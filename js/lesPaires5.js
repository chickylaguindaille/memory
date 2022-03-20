let leCorps = document.body;
let lesCases 	= [];
let lesRectos 	= [];
let lesVersos 	= [];
let nbRectosVus = 0;
let numRectoVu1	= 0;
let numRectoVu2	= 0;
let nbClics		= 0;
let instDébut	= Date.now();
let nbTrouvées	= 0;

for ( var i = 0; i<28; i++)
{
	let uneCase = document.getElementById('td'+i);
	uneCase.setAttribute('numCase',i);
	lesCases.push(uneCase);
	
	let unRecto = document.getElementById('recto'+i);
	unRecto.setAttribute('numPhoto',i%14);
	lesRectos.push(unRecto);
	uneCase.removeChild(unRecto);
	
	let unVerso  = document.getElementById('verso'+i);
	unVerso.setAttribute('numVerso',i);
	unVerso.addEventListener
	(	
		'click',
		function(e)
		{
			// alert(e.target.parentNode.getAttribute('numCase'));
			gérer(e.target.parentNode.getAttribute('numCase'));
		}
	)
	lesVersos.push(unVerso);
}

 // mélanger les tableaux
for (let i = lesCases.length - 1; i > 0; i--) 
{
	const j = Math.floor(Math.random() * (i + 1));
	[lesRectos[i], lesRectos[j]] = [lesRectos[j], lesRectos[i]];
	[lesVersos[i], lesVersos[j]] = [lesVersos[j], lesVersos[i]];
}

// poser les cartes à l'envers sur les cases
for ( var i = 0; i<28; i++)
{
	lesCases[i].appendChild(lesVersos[i]);
}

function gérer(unNumCase)
{
	nbClics++;
	if(nbRectosVus == 0)
	{
		// unIndice = unNumCase - 1;
		lesCases[unNumCase].removeChild(lesVersos[unNumCase]);
		lesCases[unNumCase].appendChild(lesRectos[unNumCase]);
		numRectoVu1 = unNumCase;
		nbRectosVus++;
		return;
	}
	if(nbRectosVus == 1)
	{
		lesCases[unNumCase].removeChild(lesVersos[unNumCase]);
		lesCases[unNumCase].appendChild(lesRectos[unNumCase]);
		numRectoVu2 = unNumCase;
		nbRectosVus++;
		var numPhoto1 = lesRectos[numRectoVu1].getAttribute('numPhoto');
		var numPhoto2 = lesRectos[numRectoVu2].getAttribute('numPhoto');
		// les rectos ont la même photo
		if(numPhoto1 == numPhoto2)
		{
			nbRectosVus = 0;
			nbTrouvées+=2;
			if(nbTrouvées == 28)
			{
				let instFin	= Date.now();
				
				// let durée = Math.round((instFin - instDébut)/1000);
				let durée =(instFin - instDébut)/1000;
				durée = Math.round(durée);
				let message = "vous avez trouvé en "+nbClics+" clics, en "+durée+" secondes";
				alert(message);
			}
			return
		}
		
		// les rectos n'ont pas la même photo. Temporisation
		setTimeout
		(
			function()
			{
				// alert("numRectoVu1 : "+numRectoVu1+", numRectoVu2 : "+numRectoVu2);
				cacher(numRectoVu1);
				cacher(numRectoVu2);
				nbRectosVus = 0;
			}
			,1000
		);
		return;
	}
}
function cacher(unNumRecto) 
{
	var uneCase =  lesCases[unNumRecto];//alert(149);
	var unRecto =  lesRectos[unNumRecto];//alert(150);
	var unVerso =  lesVersos[unNumRecto];//alert(151);
	uneCase.replaceChild(unVerso,unRecto);//alert(153);
}
function afficherInfos() 
{
	const infos = new Date();
	var durée = Math.round( (Date.now()-instDébut)/1000);
	var texte = nbClics+" clics, "+ durée+" secondes";
	
	document.getElementById('info').innerHTML = texte;
}
window.onload = function()
{
	setInterval("afficherInfos()", 1000);
};
