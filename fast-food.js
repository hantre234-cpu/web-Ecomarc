// بيانات القائمة
const menuItems = [
    { id: 1, name: "Classic Cheeseburger", price: 8.99, category: "burgers", description: "Beef patty with cheese, lettuce, tomato, and special sauce", rating: 4.5, icon: "fas fa-hamburger" },
    { id: 2, name: "BBQ Bacon Burger", price: 10.99, category: "burgers", description: "Grilled patty with bacon, BBQ sauce, and crispy onions", rating: 4.8, icon: "fas fa-bacon" },
    { id: 3, name: "Pepperoni Pizza", price: 14.99, category: "pizza", description: "Classic pizza with pepperoni and mozzarella cheese", rating: 4.7, icon: "fas fa-pizza-slice" },
    { id: 4, name: "Margherita Pizza", price: 12.99, category: "pizza", description: "Simple pizza with fresh tomatoes, basil, and mozzarella", rating: 4.6, icon: "fas fa-pizza-slice" },
    { id: 5, name: "Coca-Cola", price: 2.99, category: "drinks", description: "Refreshing classic cola", rating: 4.3, icon: "fas fa-wine-bottle" },
    { id: 6, name: "Orange Juice", price: 3.49, category: "drinks", description: "Freshly squeezed orange juice", rating: 4.4, icon: "fas fa-glass-whiskey" },
    { id: 7, name: "Chocolate Sundae", price: 5.99, category: "desserts", description: "Vanilla ice cream with chocolate sauce and nuts", rating: 4.9, icon: "fas fa-ice-cream" },
    { id: 8, name: "Apple Pie", price: 4.99, category: "desserts", description: "Warm apple pie with cinnamon", rating: 4.7, icon: "fas fa-pie" },
    { id: 9, name: "Veggie Burger", price: 9.99, category: "burgers", description: "Plant-based patty with fresh vegetables", rating: 4.4, icon: "fas fa-leaf" },
    { id: 10, name: "Chicken Burger", price: 9.49, category: "burgers", description: "Crispy chicken fillet with lettuce and mayo", rating: 4.6, icon: "fas fa-drumstick-bite" },
    { id: 11, name: "French Fries", price: 3.99, category: "sides", description: "Crispy golden fries with ketchup", rating: 4.5, icon: "fas fa-potato" },
    { id: 12, name: "Onion Rings", price: 4.49, category: "sides", description: "Crispy battered onion rings", rating: 4.3, icon: "fas fa-ring" }
];

// المتغيرات العامة
let currentCategory = "all";
let displayedItems = 6;
const cart = [];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // عرض عناصر القائمة
    displayMenuItems();
    
    // إعداد مستمعي الأحداث
    setupEventListeners();
    
    // إضافة تأثيرات تفاعلية
    addInteractiveEffects();
    
    // تفعيل التمرير السلس
    initSmoothScroll();
});

// عرض عناصر القائمة
function displayMenuItems() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    // تصفية العناصر حسب الفئة
    let filteredItems = menuItems;
    if (currentCategory !== "all") {
        filteredItems = menuItems.filter(item => item.category === currentCategory);
    }
    
    // عرض العناصر المحدودة
    const itemsToShow = filteredItems.slice(0, displayedItems);
    
    if (itemsToShow.length === 0) {
        menuGrid.innerHTML = '<p class="no-items">No items found in this category.</p>';
        return;
    }
    
    itemsToShow.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.setAttribute('data-category', item.category);
        
        // إنشاء تقييم النجوم
        const stars = generateStars(item.rating);
        
        menuItem.innerHTML = `
            <div class="menu-item-img">
                <i class="${item.icon}"></i>
            </div>
            <div class="menu-item-content">
                <div class="menu-item-title">
                    <span>${item.name}</span>
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-item-desc">${item.description}</p>
                <div class="menu-item-rating">
                    ${stars}
                    <span>(${item.rating})</span>
                </div>
                <div class="menu-item-actions">
                    <button class="add-to-cart" data-id="${item.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="view-details" data-id="${item.id}">
                        <i class="fas fa-eye"></i> Details
                    </button>
                </div>
            </div>
        `;
        
        menuGrid.appendChild(menuItem);
    });
    
    // تحديث حالة زر "تحميل المزيد"
    const loadMoreBtn = document.getElementById('loadMore');
    if (displayedItems >= filteredItems.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

// توليد تقييم النجوم
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تبديل القائمة على الأجهزة الصغيرة
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
            
            // تحديث الروابط النشطة
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // تبديل السمة (فاتح/داكن)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // تحميل السمة المحفوظة
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }
    
    // تصفية القائمة حسب الفئة
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // تحديث الأزرار النشطة
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // تحديث الفئة الحالية وإعادة عرض العناصر
            currentCategory = this.getAttribute('data-category');
            displayedItems = 6;
            displayMenuItems();
            
            // التمرير السلس إلى القسم
            document.getElementById('menu').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // زر "تحميل المزيد"
    const loadMoreBtn = document.getElementById('loadMore');
    loadMoreBtn.addEventListener('click', function() {
        displayedItems += 3;
        displayMenuItems();
    });
    
    // زر العودة للأعلى
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // إضافة عناصر إلى عربة التسوق
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            const itemId = parseInt(e.target.closest('.add-to-cart').getAttribute('data-id'));
            const item = menuItems.find(menuItem => menuItem.id === itemId);
            addToCart(item);
        }
        
        if (e.target.closest('.view-details')) {
            const itemId = parseInt(e.target.closest('.view-details').getAttribute('data-id'));
            viewItemDetails(itemId);
        }
    });
    
    // إرسال نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // في التطبيق الحقيقي، هنا سيتم إرسال البيانات إلى الخادم
        const formData = new FormData(this);
        const name = formData.get('name') || 'User';
        
        showNotification(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`, 'success');
        this.reset();
    });
    
    // زر الاشتراك في النشرة الإخبارية
    const newsletterBtn = document.querySelector('.newsletter-form button');
    const newsletterInput = document.querySelector('.newsletter-form input');
    
    newsletterBtn.addEventListener('click', function() {
        if (newsletterInput.value && validateEmail(newsletterInput.value)) {
            newsletterInput.value = '';
            showNotification('Thank you for subscribing to our newsletter!', 'success');
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
    
    // إدخال النشرة الإخبارية مع زر Enter
    newsletterInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            newsletterBtn.click();
        }
    });
    
    // أزرار الطلب
    const orderBtns = document.querySelectorAll('.order-option .btn');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const option = this.closest('.order-option').querySelector('h3').textContent;
            showNotification(`Redirecting to ${option}...`, 'info');
        });
    });
}

// إضافة تأثيرات تفاعلية
function addInteractiveEffects() {
    // تأثيرات التمرير للبطاقات
    const cards = document.querySelectorAll('.feature-card, .menu-item, .order-option');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // تأثير عند تحميل الصفحة
    const heroTitle = document.querySelector('.hero-title');
    heroTitle.style.opacity = 0;
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        heroTitle.style.opacity = 1;
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
}

// تهيئة التمرير السلس
function initSmoothScroll() {
    // هذا يعمل تلقائياً مع الروابط التي تحتوي على #
    // لكننا نضيف مستمعين إضافيين للروابط في القائمة
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// إضافة عنصر إلى عربة التسوق
function addToCart(item) {
    cart.push(item);
    console.log(`Added to cart: ${item.name} - $${item.price}`);
    
    // تأثير مرئي
    const button = event.target.closest('.add-to-cart');
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.backgroundColor = '#27ae60';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.backgroundColor = '';
    }, 2000);
    
    // إشعار للمستخدم
    showNotification(`${item.name} added to cart!`, 'success');
    
    // في تطبيق حقيقي، هنا يمكنك تحديث عداد عربة التسوق
    updateCartCounter();
}

// عرض تفاصيل العنصر
function viewItemDetails(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    
    // إنشاء نافذة منبثقة لعرض التفاصيل
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <div class="modal-image">
                    <i class="${item.icon}"></i>
                </div>
                <div class="modal-details">
                    <h2>${item.name}</h2>
                    <div class="modal-price">$${item.price.toFixed(2)}</div>
                    <div class="modal-rating">${generateStars(item.rating)} (${item.rating})</div>
                    <p class="modal-description">${item.description}</p>
                    <div class="modal-actions">
                        <button class="btn primary-btn add-to-cart-modal" data-id="${item.id}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn outline-btn close-modal-btn">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // إضافة CSS للنافذة المنبثقة
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        }
        
        .modal-content {
            background-color: white;
            border-radius: 15px;
            width: 100%;
            max-width: 600px;
            position: relative;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-theme .modal-content {
            background-color: #2a2a2a;
            color: white;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
        }
        
        .close-modal:hover {
            color: var(--primary-color);
        }
        
        .modal-body {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .modal-image {
            width: 100%;
            height: 200px;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 5rem;
            color: var(--primary-color);
        }
        
        body.dark-theme .modal-image {
            background-color: #333;
        }
        
        .modal-details h2 {
            margin-bottom: 10px;
        }
        
        .modal-price {
            font-size: 1.8rem;
            color: var(--primary-color);
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .modal-rating {
            margin-bottom: 15px;
        }
        
        .modal-description {
            margin-bottom: 25px;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
        }
        
        @media (max-width: 768px) {
            .modal-body {
                flex-direction: column;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // إضافة مستمعي الأحداث للنافذة المنبثقة
    const closeModal = modal.querySelector('.close-modal');
    const closeModalBtn = modal.querySelector('.close-modal-btn');
    const addToCartModalBtn = modal.querySelector('.add-to-cart-modal');
    
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    closeModalBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    addToCartModalBtn.addEventListener('click', () => {
        addToCart(item);
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
}

// تحديث عداد عربة التسوق
function updateCartCounter() {
    // في تطبيق حقيقي، هنا يمكنك تحديث عداد عربة التسوق في واجهة المستخدم
    console.log(`Cart now has ${cart.length} items`);
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // إضافة CSS للإشعار
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            color: white;
            font-weight: 500;
            max-width: 350px;
        }
        
        .notification.success {
            background-color: #27ae60;
        }
        
        .notification.error {
            background-color: #e74c3c;
        }
        
        .notification.info {
            background-color: #3498db;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // إخفاء الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        
        // إزالة الإشعار بعد انتهاء الرسوم المتحركة
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
                document.head.removeChild(style);
            }
        }, 300);
    }, 3000);
}

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}