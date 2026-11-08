
const foods = [

    // ===== SPÉCIALITÉS SÉNÉGALAISES =====

    {
        id: 1,
        name: "Thiéboudienne",
        category: "senegal",
        price: 3500,
        description: "Riz au poisson, légumes variés et sauce tomate traditionnelle.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQccFsZjVq6_Ca9KfZDN2-xY_9Dg1oqVHldvL9AkiKFkw&s=10"
    },

    {
        id: 2,
        name: "Yassa Poulet",
        category: "senegal",
        price: 3000,
        description: "Poulet mariné au citron, moutarde et oignons, accompagné de riz blanc.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpzaDvIVtT4sOD0CGTrBvZBRGHPs6btH5kHnJsuy5ZHA&s=10"
    },

    {
        id: 3,
        name: "Mafé Sénégalais",
        category: "senegal",
        price: 3500,
        description: "Viande mijotée dans une sauce onctueuse à base de pâte d'arachide.",
        image: "https://scontent.fdkr6-1.fna.fbcdn.net/v/t1.6435-9/69162671_1091912944341658_8494599074081669120_n.jpg?stp=dst-jpg_tt6&cstp=mx1511x2015&ctp=p526x296&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=oJF-9y8zmsYQ7kNvwGy_9-w&_nc_oc=AdpJ9yvWY-ebygzBsHE9QBlKSM9ycGuZsNywJZgVz8KgRiUNiApHqSFmGafVy42XFk8xuM2e6deJt5MkvBBL4X7d&_nc_zt=23&_nc_ht=scontent.fdkr6-1.fna&_nc_gid=-SLmeJHHhxe3l0FgnuiFug&_nc_ss=7b289&oh=00_AQTZy6K2AezQKlKt9ZO8L37E-VJ3hacGK6z6NDu3YxWEeg&oe=6B16D5B5"
    },

    {
        id: 4,
        name: "Dibi Sénégalais",
        category: "senegal",
        price: 4500,
        description: "Viande grillée à la braise, accompagnée d'oignons et de salade.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dibi_accompagn%C3%A9_de_salades_et_frites.jpg"
    },

    {
        id: 5,
        name: "Soupou Kandja",
        category: "senegal",
        price: 3000,
        description: "Sauce au gombo et à l'huile de palme, servie avec du riz.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQThaGOeXjVEtfIsErL7d9mpSQ4lhXfsXxiwvhaVpiGVQ&s=10"
    },

    {
        id: 6,
        name: "Thiéré",
        category: "senegal",
        price: 2500,
        description: "Couscous traditionnel de mil accompagné d'une sauce généreuse.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWzSa_BqfiJ8BSqZs4WV4fEZ4T2lEYrP2ZQLTKQeXerg&s=10"
    },


    // ===== AUTRES CUISINES AFRICAINES =====

    {
        id: 7,
        name: "Attiéké Poisson",
        category: "afrique",
        price: 3500,
        description: "Spécialité ivoirienne : semoule de manioc, poisson et condiments.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Atti%C3%A9k%C3%A9_au_Poisson.jpg"
    },

    {
        id: 8,
        name: "Jollof Rice",
        category: "afrique",
        price: 3000,
        description: "Riz cuisiné dans une sauce tomate épicée, célèbre en Afrique de l'Ouest.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/JOLLOF_RICE.JPG"
    },


    // ===== BOISSONS SÉNÉGALAISES =====

    {
        id: 9,
        name: "Trio de jus locaux",
        category: "boissons",
        price: 1500,
        description: "Découvrez le bissap, le bouye et le jus de gingembre.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST0nwXr4LtZ0sHaxluud7BfUfMpmN3ddeBVTahPQAiKA&s=10"
    }

];


// AFFICHER LES PLATS

const foodGrid = document.getElementById("foodGrid");

function displayFoods(category = "tous") {

    foodGrid.innerHTML = "";

    const filteredFoods = category === "tous"
        ? foods
        : foods.filter(food => food.category === category);

    filteredFoods.forEach(food => {

        const card = document.createElement("article");

        card.className = "food-card";

        card.innerHTML = `
            <img
                src="${food.image}"
                alt="${food.name}"
                loading="lazy"
            >

            <div class="food-info">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="food-bottom">

                    <span class="price">
                        ${food.price.toLocaleString("fr-FR")} FCFA
                    </span>

                    <button class="add-button"
                        onclick="addToCart(${food.id})">
                        + Ajouter
                    </button>

                </div>

            </div>
        `;

        foodGrid.appendChild(card);

    });

}


// FILTRES

const filters = document.querySelectorAll(".filter");

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        displayFoods(button.dataset.category);

    });

});


// PANIER

let cart = [];

function addToCart(id) {

    const food = foods.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }

    updateCart();
}


// SUPPRIMER UN PLAT

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

}


// ACTUALISER LE PANIER

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");

    let total = 0;

    let count = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Votre panier est vide.</p>';

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>${item.quantity} × ${item.price.toLocaleString("fr-FR")} FCFA</p>
            </div>

            <button onclick="removeFromCart(${item.id})">
                Supprimer
            </button>
        `;

        cartItems.appendChild(div);

    });

    cartCount.textContent = count;

    cartTotal.textContent = total.toLocaleString("fr-FR");

}


// OUVRIR / FERMER LE PANIER

function toggleCart() {

    document.getElementById("cartPanel").classList.toggle("show");

    document.getElementById("cartOverlay").classList.toggle("show");

}


// MENU MOBILE

function toggleMenu() {

    document.getElementById("navLinks").classList.toggle("open");

}


// COMMANDER SUR WHATSAPP

function checkout() {

    if (cart.length === 0) {

        alert("Votre panier est vide !");

        return;

    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    let message = "Bonjour KOORA AFRICA ! Je souhaite commander :\n\n";

    cart.forEach(item => {

        message += `${item.name} x ${item.quantity}\n`;

    });

    message += `\nTotal : ${total.toLocaleString("fr-FR")} FCFA`;

    // Remplacer par le vrai numéro WhatsApp

    const numeroWhatsApp = "221770000000";

    const url = "https://wa.me/" + numeroWhatsApp +
        "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");

}


// LANCEMENT

displayFoods();

updateCart();
