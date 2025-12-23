// ۱. دیتابیس کوچک ما (آرایه گیاهان)
const plants = [
    { id: 1, name: "سانسوریا", price: "۱۸۰,۰۰۰", image: "image/1.jpg" },
    { id: 2, name: "حسن یوسف", price: "۵۵,۰۰۰", image: "image/2.jfif" },
    { id: 3, name: "شمعدانی", price: "۷۰,۰۰۰", image: "image/3.jpg" },
    { id: 4, name: "بامبو", price: "۳۲۰,۰۰۰", image: "image/4.jfif" },
    { id: 5, name: "کاکتوس", price: "۴۰,۰۰۰", image: "image/5.jpg" },
    { id: 6, name: "زاموفولیا", price: "۴۵۰,۰۰۰", image: "image/6.jfif" },
    { id: 7, name: "شفلرا", price: "۱۲۰,۰۰۰", image: "image/.jpg" },
    { id: 8, name: "بونسای", price: "۸۵۰,۰۰۰", image: "image/8.jpg" },
    { id: 9, name: "گل ارکیده", price: "۶۰۰,۰۰۰", image: "image/9.jpg" },
    { id: 10, name: "گل برگ انجیری", price: "۳۸۰,۰۰۰", image: "image/10.jpg" },
    { id: 11, name: "گل آنتوریوم", price: "۲۹۰,۰۰۰", image: "image/11.jpg" },
    { id: 12, name: "گل پیچک", price: "۹۵,۰۰۰", image: "image/12.jpg" }
];

// ۲. انتخاب ظرف محصولات از HTML
const productGrid = document.querySelector('.product-grid');

// ۳. متغیر برای ذخیره تعداد کالاهای سبد خرید
let cartCount = 0;

// ۴. تابع نمایش محصولات در صفحه
function displayProducts(productsToShow = plants) {
    productGrid.innerHTML = ""; // پاک کردن محتوای قبلی

    productsToShow.forEach(plant => {
        const card = `
            <div class="product-card">
                <img src="${plant.image}" alt="${plant.name}">
                <h3>${plant.name}</h3>
                <p>قیمت: ${plant.price} تومان</p>
                <button onclick="addToCart(${plant.id})">افزودن به سبد خرید</button>
            </div>
        `;
        productGrid.innerHTML += card;
    });
}
let cart = []; // لیست محصولات داخل سبد

// تابع باز و بسته کردن سبد خرید
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

// تابع اضافه کردن به سبد خرید
function addToCart(plantId) {
    // پیدا کردن گیاه از لیست اصلی بر اساس ID
    const selectedPlant = plants.find(p => p.id === plantId);
    
    // اضافه کردن به لیست سبد خرید
    cart.push(selectedPlant);
    
    // آپدیت کردن ظاهر سبد خرید
    updateCartUI();
    
    // باز کردن سبد خرید برای نشان دادن به کاربر
    toggleCart();
}

// تابع بروزرسانی لیست داخل سبد خرید
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (!cartItemsContainer || !totalAmountElement) return;

    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    // اضافه کردن index برای شناسایی هر آیتم جهت حذف
    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #eee;">
                <div style="flex-grow: 1;">
                    <span style="font-weight:bold;">${item.name}</span><br>
                    <small>${item.price} تومان</small>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:1.5rem; padding:0 10px;">&times;</button>
            </div>
        `;

        // محاسبه قیمت (تبدیل قیمت فارسی به عدد انگلیسی برای جمع زدن)
        let priceAsNumber = parseInt(
            item.price.replace(/,/g, '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        );
        total += priceAsNumber;
    });

    // نمایش جمع کل
    totalAmountElement.innerText = total.toLocaleString('fa-IR');
}

// تابع درگاه پرداخت خیالی
function goToPayment() {
    if (cart.length === 0) {
        alert("سبد خرید شما خالی است!");
        return;
    }
    alert("در حال انتقال به درگاه پرداخت بانک مرکزی...");
    window.location.href = "https://www.shaparak.ir"; // یا هر لینک دلخواه
}

// ۶. اجرای تابع اصلی برای چیدن محصولات موقع باز شدن سایت
displayProducts();
// ۱. پیدا کردن کادر جستجو
const searchInput = document.getElementById('searchInput');

// ۲. گوش دادن به تایپ کاربر (Event Listener)
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase(); // متن تایپ شده را می‌گیریم و کوچک می‌کنیم

    // ۳. فیلتر کردن لیست اصلی بر اساس متن
    const filteredPlants = plants.filter(plant => {
        return plant.name.toLowerCase().includes(searchText);
    });

    // ۴. نمایش لیست فیلتر شده در صفحه
    displayProducts(filteredPlants);
});
displayProducts(plants);
// تابع حذف از سبد خرید
window.removeFromCart = function(index) {
    // حذف یک آیتم از آرایه بر اساس شماره ردیف (index)
    cart.splice(index, 1);
    
    // آپدیت کردن ظاهر سبد خرید و محاسبه مجدد قیمت
    updateCartUI();
    
    // اگر سبد خرید خالی شد، می‌توانید اختیاری کاری کنید (مثلاً بستن سبد)
    if (cart.length === 0) {
        console.log("سبد خرید خالی شد");
    }

}
