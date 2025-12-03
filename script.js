// public/script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- EFEK MENGETIK ---
    const typedTextElement = document.querySelector('.typed-text');
    const textToType = "Gesang Hemas Bayu Sekti"; // Ganti dengan nama Anda
    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100); // Kecepatan mengetik (ms)
        }
    }
    typeText(); // Mulai efek mengetik saat halaman dimuat

    // --- ANIMASI SAAT SCROLL ---
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px',
        threshold: 0.1 // Memicu animasi saat 10% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi dijalankan sekali
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- LOGIKA PROYEK (TIDAK BERUBAH) ---
    const projectsContainer = document.getElementById('projects-container');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) throw new Error('Gagal mengambil data proyek');
            const projects = await response.json();
            displayProjects(projects);
        } catch (error) {
            projectsContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
        }
    };

    const displayProjects = (projects) => {
        projectsContainer.innerHTML = '';
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <img src="${project.imageUrl}" alt="${project.title}">
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.githubUrl}" target="_blank">GitHub</a>
                        <a href="${project.liveUrl}" target="_blank">Lihat Demo</a>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    };

    // --- LOGIKA FORM KONTAK (TIDAK BERUBAH) ---
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.textContent = result.message;
                formStatus.style.color = 'var(--accent-color)';
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Terjadi kesalahan.');
            }
        } catch (error) {
            formStatus.textContent = error.message;
            formStatus.style.color = '#ff4458';
        }
    });

    // Panggil fungsi untuk mengambil proyek
    fetchProjects();
});