// Menu Burger Responsive
document.querySelector('.burger-menu').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('active');

});

 var name = prompt("Quel est votre nom ?");{
    document.write(name);

    var age = prompt("Quel est votre age ?"); 
    document.write("<br>Votre age est : " + age);
   }; 

// Slider Témoignages
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showSlide(n) {
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });
    currentSlide = (n + testimonials.length) % testimonials.length;
    testimonials[currentSlide].style.display = 'block';
}

showSlide(0);

setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Validation du Formulaire
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci pour votre message ! Nous vous contacterons bientôt.');

});