# 🍜 Delicious Restaurant - Website

A modern and responsive restaurant website with beautiful design, built with pure HTML, CSS, and JavaScript.

## ✨ Features

### 🎨 Design
- **Responsive Design**: Compatible with all devices (desktop, tablet, mobile)
- **Modern UI**: Modern interface with gradients and animations
- **Smooth Animations**: Smooth motion effects
- **Beautiful Typography**: Using Google Fonts (Playfair Display & Poppins)

### 🍽️ Main Features
- **Navigation**: Fixed navigation menu with smooth scrolling
- **Hero Section**: Welcome banner with call-to-action buttons
- **Menu Filter**: Filter dishes by category (Appetizers, Main Dishes, Desserts, Beverages)
- **About Section**: Restaurant information with key features
- **Contact Form**: Table booking form with validation
- **Footer**: Contact information and social links

### 📱 Mobile Features
- **Hamburger Menu**: Mobile-friendly menu
- **Touch-friendly**: Easy-to-tap buttons and links
- **Optimized Layout**: Layout optimized for small screens

### 🎯 Interactive Elements
- **Menu Filtering**: Click to filter dishes by category
- **Form Validation**: Input data validation
- **Notifications**: Success/error notifications
- **Hover Effects**: Hover effects for elements
- **Scroll Animations**: Animations on scroll

## 🚀 How to Use

### 1. Open the website
```bash
# Open index.html file in browser
open index.html
```

### 2. Or use Live Server (VS Code)
- Install "Live Server" extension
- Right-click on `index.html` file
- Select "Open with Live Server"

### 3. Or use Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser

## 📁 File Structure

```
Restaurant/
├── index.html          # Main HTML file
├── styles.css          # CSS styling file
├── script.js           # JavaScript functionality file
└── README.md           # Documentation file
```

## 🎨 Customization

### Change Colors
In the `styles.css` file, you can change the main color variables:

```css
/* Main colors */
--primary-color: #ff6b6b;
--secondary-color: #ee5a24;
--accent-color: #667eea;
```

### Add New Dishes
In the `index.html` file, add dishes to the menu section:

```html
<div class="menu-item" data-category="main">
    <div class="menu-item-image">
        <div class="menu-img-bg new-dish"></div>
    </div>
    <div class="menu-item-content">
        <h3>Dish Name</h3>
        <p>Dish description</p>
        <span class="price">$12.50</span>
    </div>
</div>
```

Then add background style in `styles.css`:

```css
.new-dish { background-image: linear-gradient(45deg, #your-color1, #your-color2); }
```

### Change Contact Information
Update information in the contact section:

```html
<div class="contact-item">
    <i class="fas fa-map-marker-alt"></i>
    <div>
        <h4>Address</h4>
        <p>Your new address</p>
    </div>
</div>
```

## 🔧 Advanced Features

### Add Real Images
Replace gradient backgrounds with real images:

```css
.menu-img-bg {
    background-image: url('path/to/your/image.jpg');
    background-size: cover;
    background-position: center;
}
```

### Connect Backend
To handle real table booking, replace the form processing in `script.js`:

```javascript
// Replace the simulate form submission
fetch('/api/book-table', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    showNotification('Booking successful!', 'success');
})
.catch(error => {
    showNotification('An error occurred!', 'error');
});
```

### Add Google Maps
Add Google Maps to the contact section:

```html
<div class="map-container">
    <iframe 
        src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_URL"
        width="100%" 
        height="300" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>
</div>
```

## 🌟 Optimization

### Performance
- Using CSS Grid and Flexbox for layout
- Lazy loading for images
- Minified CSS and JS for production

### SEO
- Complete meta tags
- Semantic HTML
- Alt text for images
- Structured data

### Accessibility
- ARIA labels
- Keyboard navigation
- High contrast colors
- Screen reader friendly

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11+ (với polyfills)

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa

## 🤝 Đóng góp

Nếu bạn muốn đóng góp vào dự án:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📞 Contact

If you have questions or suggestions, please contact:
- Email: info@delicious.com
- Website: www.delicious.com

---

**Wishing you a wonderful restaurant website! 🍜✨**
