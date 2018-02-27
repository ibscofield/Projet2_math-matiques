const formulaire = document.querySelector("form");

const bieres = [];
let profit = 0;

formulaire.addEventListener("submit", event => {
	event.preventDefault();
	
	const nombre_type = document.querySelector("#nombre_type").value;
	const stock_initial = document.querySelector("#stock_initial").value;
	const nombre_repetition = document.querySelector("#nombre_repetition").value;
	
	for(let i = 0; i < nombre_type; i++) {
		bieres.push({
			"stock": stock_initial,
			"prix": nombreAleatoire(nombre_type*stock_initial / 20,
									nombre_type*stock_initial / 5),
			"nb_selection": 0
		});
	}
	
	document.querySelector("#prix_bieres").textContent = getPrix().join(" ");
	document.querySelector("#probabilites_achat").textContent = getProba().join(" ");
	
	const ul = document.createElement("ul");
	for(let i = 0; i < nombre_repetition; i++) {
		const li = document.createElement("li");
		//console.log(getPrix());
		vendre(choisirBiere());
		
		li.textContent = getPrix().join(" ");
		ul.appendChild(li);
	}
	
	document.querySelector('#nombre_selection').textContent = getTabSelection().join(" ");
	
	document.querySelector("#prix_actuels_bieres").append(ul);
	document.querySelector("#profit").textContent = profit.toFixed(2);
});

function nombreAleatoire(min, max) {
	return (Math.random() * (max - min) + min).toFixed(2);
}

function getPrix() {
	const prix = [];
	
	bieres.forEach(biere => {
		prix.push(biere.prix);
	});
	
	return prix;
}

function getTabSelection() {
	const nb = [];
	
	bieres.forEach(biere => {
		nb.push(biere.nb_selection);
	});
	
	return nb;
}

function getProba() {
	const proba = [];
	
	const total = getPrix().reduce((a, c) => a*1 + c*1);
	
	bieres.forEach(b => {
		const p = (1 - b.prix*1/total).toFixed(3);
		b.proba = p;
		proba.push(p);
	});
	
	return proba;
}

function vendre(biere) {
	
	profit += biere.prix*1;
	
		
	const nvxStock = biere.stock*1 - 1;
	biere.stock = (nvxStock <= 0) ? 0 : nvxStock;
	
	//const nvxPrix = 1*biere.prix+5*(biere.stock-1);
	const nvxPrix = 1*biere.prix+5*biere.stock;
	biere.prix = (nvxPrix <= 0.00) ? 0.00 : nvxPrix.toFixed(2);
	
	biere.nb_selection++;
	
	// on baisse les autres prix de 5 centimes
	bieres.forEach((b, index, array) => {
		if(b !== biere) {
			const prixReduit = 1*b.prix - 0.05;
			
			b.prix = (prixReduit <= 0.00) ? 0.00 : prixReduit.toFixed(2); 
		}
	});
}


function choisirBiere() {
	let biere = bieres[0];
	
	bieres.forEach(b => {
		if(b.prix*1 < biere.prix*1) {
			biere = b;
		}
	});
	
	return biere;
}

