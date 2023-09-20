/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

function afficherProposition (proposition) {
    let zoneProposition = document.querySelector('.zoneProposition')
    zoneProposition.innerText = proposition
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

//vérifie si le format du nom est valide
function validerNom (nom) {
    if(nom < 2){
        throw new Error("This name is too short")
    }
}

//vérifie si le foramt de l'email est valide
function validerEmail (email){
    let emailRegexRule = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if(!emailRegexRule.test(email)){
        throw new Error ("L'email n'est pas valide")
    }
}   

function afficherMessageErreur (message){

    let spanErreurMessage = document.getElementById("erreurMessage")
    
    if (!spanErreurMessage){
        let popup = document.querySelector(".popup")

        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"

        popup.appendChild(spanErreurMessage)
    }
    spanErreurMessage.innerText = message

    

}


// Fonction de gestion du formulaire
function gererFormulaire (scoreEmail){
    try{
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)

        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)

    } catch (erreur) {
        //gestion de l'erreur
        afficherMessageErreur(erreur.message)

    }
        

}


/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let nbMotsProposes = 0

    let validation = document.getElementById("btnValiderMot")
    let input = document.getElementById("inputEcriture")
    let i = 0
    let listeProposition = listeMots

    //Afficher les phrases ou mots à recopier
    afficherProposition(listeProposition[i])
    validation.addEventListener("click", () => {
        if(input.value === listeProposition[i]){
            score++
        }
        i++
        afficherResultat(score, i)
        console.log(input.value)
        input.value = ''

        if (listeProposition[i] === undefined) {
            afficherProposition("Game Over!!")
            validation.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }
    })
    //passer de l'affichage des phrases à celui des mots
    let listBtnRadio = document.querySelectorAll(".optionSource input")
    for(let index = 0; index < listBtnRadio.length; index++) {
        listBtnRadio[index].addEventListener("change", (event) => {
            console.log(event.target.value)
            if(event.target.value === "1") {
                listeProposition = listeMots
            } else {
                listeProposition = listePhrases
            }
            afficherProposition(listeProposition[i])
        })
    }
    // Gestion du partage de score
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score}/ ${i}`
        gererFormulaire(scoreEmail)

    })

    afficherResultat(score, i)
}