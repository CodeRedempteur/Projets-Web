/////////////////////////////////////////////////////////////////////
/// Merci d'utiliser mon code :D,                                ///               
/// en retour je peux te demander de me suivre sur youtube (:   ///
/// Auteur : Code_Redempteur                                   ///
/// Youtube : https://www.youtube.com/@CodeRedempteur         ///
////////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded',function () {

const cartLink = document.getElementById('cart-link');
const cartOverlay = document.getElementById('cart-overlay');

function openCart(event){
    event.preventDefault();
    cartOverlay.style.display = 'block';
    setTimeout(() => cartOverlay.classList.add('show'),10);
}
function closeCart(event){
    if (event.target === cartOverlay) {
        cartOverlay.classList.remove('show');
        
        setTimeout(() => cartOverlay.style.display='none',300);
    }
}
cartLink.addEventListener('click',openCart);
cartOverlay.addEventListener('click',closeCart);




});






