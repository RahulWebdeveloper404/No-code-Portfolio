document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('portfolioForm');
    const addProjectBtn = document.getElementById('addProject');
    const projectsContainer = document.getElementById('projectsContainer');
    const previewContainer = document.getElementById('portfolioPreview');
    const profileImageInput = document.getElementById('profileImage');
    const imagePreview = document.getElementById('imagePreview');
    
    let profileImageData = '';

    // Handle image upload and preview
    profileImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImageData = e.target.result;
                imagePreview.innerHTML = `<img src="${profileImageData}" alt="Profile Preview" style="max-width: 150px; border-radius: 50%;">`;
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    });

    // Add new project fields
    addProjectBtn.addEventListener('click', () => {
        const projectEntry = document.createElement('div');
        projectEntry.className = 'project-entry';
        projectEntry.innerHTML = `
            <input type="text" placeholder="Project Title" class="project-title" required>
            <input type="text" placeholder="Project Description" class="project-desc" required>
            <input type="url" placeholder="Project Link" class="project-link" required>
        `;
        projectsContainer.appendChild(projectEntry);
    });

    // Generate preview
    form.addEventListener('input', updatePreview);

    function updatePreview() {
        const fullName = document.getElementById('fullName').value;
        const bio = document.getElementById('bio').value;
        const skills = document.getElementById('skills').value;
        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;
        const instagram = document.getElementById('instagram').value;
        const youtube = document.getElementById('youtube').value;

        const projects = [];
        const projectEntries = document.querySelectorAll('.project-entry');
        projectEntries.forEach(entry => {
            const title = entry.querySelector('.project-title').value;
            const desc = entry.querySelector('.project-desc').value;
            const link = entry.querySelector('.project-link').value;
            if (title && desc && link) {
                projects.push({ title, desc, link });
            }
        });

        const previewHTML = `
            <div class="preview-profile">
                ${profileImageData ? `<img src="${profileImageData}" alt="${fullName}">` : ''}
                <h2>${fullName || 'Your Name'}</h2>
            </div>
            
            <div class="preview-section">
                <h3>About Me</h3>
                <p>${bio || 'Tell us about yourself...'}</p>
            </div>

            <div class="preview-section">
                <h3>Skills</h3>
                <div class="skills-list">
                    ${skills.split(',').map(skill => 
                        `<span class="skill-tag">${skill.trim()}</span>`
                    ).join('')}
                </div>
            </div>

            <div class="preview-section">
                <h3>Projects</h3>
                ${projects.map(project => `
                    <div class="project-card">
                        <h4>${project.title}</h4>
                        <p>${project.desc}</p>
                        <a href="${project.link}" target="_blank">View Project</a>
                    </div>
                `).join('')}
            </div>

            <div class="social-links">
                ${linkedin ? `<a href="${linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i>LinkedIn</a>` : ''}
                ${github ? `<a href="${github}" target="_blank" class="social-link"><i class="fab fa-github"></i>GitHub</a>` : ''}
                ${instagram ? `<a href="${instagram}" target="_blank" class="social-link"><i class="fab fa-instagram"></i>Instagram</a>` : ''}
                ${youtube ? `<a href="${youtube}" target="_blank" class="social-link"><i class="fab fa-youtube"></i>YouTube</a>` : ''}
            </div>
        `;

        previewContainer.innerHTML = previewHTML;
    }

    // Generate and download portfolio
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const portfolioHTML = generatePortfolioHTML();
        const portfolioCSS = generatePortfolioCSS();
        
        // Create ZIP file
        const zip = new JSZip();
        zip.file('index.html', portfolioHTML);
        zip.file('style.css', portfolioCSS);
        
        // Generate and download ZIP
        zip.generateAsync({ type: 'blob' })
            .then(content => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = 'portfolio.zip';
                link.click();
            });
    });

    function generatePortfolioHTML() {
        const fullName = document.getElementById('fullName').value;
        const bio = document.getElementById('bio').value;
        const skills = document.getElementById('skills').value;
        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;
        const instagram = document.getElementById('instagram').value;
        const youtube = document.getElementById('youtube').value;

        const projects = [];
        const projectEntries = document.querySelectorAll('.project-entry');
        projectEntries.forEach(entry => {
            const title = entry.querySelector('.project-title').value;
            const desc = entry.querySelector('.project-desc').value;
            const link = entry.querySelector('.project-link').value;
            if (title && desc && link) {
                projects.push({ title, desc, link });
            }
        });

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fullName} - Portfolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="portfolio-container glass">
        <div class="profile-section">
            ${profileImageData ? `<img src="${profileImageData}" alt="${fullName}" class="profile-image">` : ''}
            <h1>${fullName}</h1>
            <div class="bio">
                <p>${bio}</p>
            </div>
        </div>

        <div class="skills-section">
            <h2>Skills</h2>
            <div class="skills-list">
                ${skills.split(',').map(skill => 
                    `<span class="skill-tag">${skill.trim()}</span>`
                ).join('')}
            </div>
        </div>

        <div class="projects-section">
            <h2>Projects</h2>
            <div class="projects-grid">
                ${projects.map(project => `
                    <div class="project-card glass">
                        <h3>${project.title}</h3>
                        <p>${project.desc}</p>
                        <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="social-links">
            ${linkedin ? `<a href="${linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i>LinkedIn</a>` : ''}
            ${github ? `<a href="${github}" target="_blank" class="social-link"><i class="fab fa-github"></i>GitHub</a>` : ''}
            ${instagram ? `<a href="${instagram}" target="_blank" class="social-link"><i class="fab fa-instagram"></i>Instagram</a>` : ''}
            ${youtube ? `<a href="${youtube}" target="_blank" class="social-link"><i class="fab fa-youtube"></i>YouTube</a>` : ''}
        </div>
    </div>
</body>
</html>`;
    }

    function generatePortfolioCSS() {
        return `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    min-height: 100vh;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    padding: 20px;
    color: white;
}

.glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.portfolio-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
}

.profile-section {
    text-align: center;
    margin-bottom: 40px;
}

.profile-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 20px;
}

.bio {
    max-width: 800px;
    margin: 20px auto;
    line-height: 1.6;
}

h1, h2, h3 {
    margin-bottom: 20px;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.skills-section {
    margin-bottom: 40px;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.skill-tag {
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 0.9em;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.project-card {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.project-card h3 {
    margin-bottom: 10px;
}

.project-card p {
    margin-bottom: 15px;
    flex-grow: 1;
}

.project-link {
    display: inline-block;
    padding: 8px 20px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    text-decoration: none;
    border-radius: 20px;
    transition: background 0.3s;
}

.project-link:hover {
    background: rgba(255, 255, 255, 0.2);
}

.social-links {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.social-link {
    color: white;
    text-decoration: none;
    padding: 10px 25px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.3s;
}

.social-link:hover {
    background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
    .portfolio-container {
        padding: 20px;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }
}
`;
    }
});