document.addEventListener('DOMContentLoaded', function() {
const products = document.querySelectorAll('.product');
const storage = document.getElementById('storage');
const productCount = document.getElementById('product-count');

const storageItems = {};

products.forEach(product => {
product.addEventListener('dragstart', dragStart);
product.addEventListener('dragend', dragEnd);

});

storage.addEventListener('dragover', dragOver)
storage.addEventListener('dragenter', dragEnter);
storage.addEventListener('dragleave',dragLeave);
storage.addEventListener('drop',drop);


    function dragStart() {
     this.classList.add('dragging');
     event.dataTransfer.setData('text/plain', JSON.stringify({
        id: this.dataset.id,
        name: this.dataset.name,
        img: this.querySelector('img').src
     }))
    }
    
    // Définit ce qui se passe quand on termine de faire glisser un produit
    function dragEnd() {
        this.classList.remove('dragging');
    }
    
    // Définit ce qui se passe quand un produit est au-dessus de la zone de stockage pendant le glissement
    function dragOver(e) {
e.preventDefault();
    }
    
    // Définit ce qui se passe quand un produit entre dans la zone de stockage pendant le glissement
    function dragEnter(e) {
        e.preventDefault();
this.classList.add('highlight');
    }
    
    // Définit ce qui se passe quand un produit quitte la zone de stockage pendant le glissement
    function dragLeave() {
        this.classList.remove('highlight');

    }
    
    // Définit ce qui se passe quand on dépose un produit dans la zone de stockage
    function drop(e) {
        e.preventDefault();
        this.classList.remove('highlight');
    const productData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const productId = productData.id;

    if(storageItems[productId]){
        storageItems[productId].quantity++;
        const quantityElement = document.querySelector(`.storage-item[data-id="${productId}"] .quantity`);
        quantityElement.textContent = storageItems[productId].quantity;
    }else{
        storageItems[productId]= {
            id: productId,
            name: productData.name,
            img: productData.img,
            quantity : 1
         };

         const storageItem = document.createElement('div');
         storageItem.classList.add('storage-item');
         storageItem.dataset.id = productId;

         storageItem.innerHTML= `
         <div class="remove">x</div>
         <img src="${productData.img}" alt="${productData.name}">
         <div class="product-name">${productData.name}</div>
         <div class="quantity">1</div>            
         `;

         storage.appendChild(storageItem);

         const removeButton = storageItem.querySelector('.remove');
         removeButton.addEventListener('click',function(){
            removeStorageItem(productId);
         });


    }
    updateProductCount();
}
    
    // Définit ce qui se passe quand on veut supprimer un produit du stockage
    function removeStorageItem(productId) {
        if(storageItems[productId]){
            storageItems[productId].quantity--;

            if(storageItems[productId].quantity === 0){
                const itemToRemove = document.querySelector(`.storage-item[data-id="${productId}"]`);
                storage.removeChild(itemToRemove);
                delete storageItems[productId];
            }
            else{
                const quantityElement = document.querySelector(`.storage-item[data-id="${productId}"] .quantity`);
                quantityElement.textContent = storageItems[productId].quantity;

            }
            updateProductCount();
        }
    }
    
    // Définit comment mettre à jour le compteur total de produits
    function updateProductCount() {
            let totalItems = 0;
            Object.values(storageItems).forEach(item =>{
                totalItems += item.quantity;
            });
            productCount.textContent = totalItems;
    }
});