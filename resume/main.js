        // State management
        let resumeData = {
            personalInfo: {},
            experience: [],
            education: [],
            skills: [],
            languages: [],
            projects: [],
            template: 'modern'
        };

        let history = [];
        let savedResumes = JSON.parse(localStorage.getItem('savedResumes')) || [];
        let currentTemplate = 'modern';

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            initializeSortable();
            loadFromLocalStorage();
            updatePreview();
            loadSavedResumes();
        });

        // Sortable sections
        function initializeSortable() {
            new Sortable(document.getElementById('sortableSections'), {
                animation: 150,
                ghostClass: 'dragging',
                handle: '.section-header',
                onEnd: function() {
                    updatePreview();
                    saveToHistory();
                }
            });
        }


        // Photo upload
        function handlePhotoUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    resumeData.personalInfo.photo = e.target.result;
                    document.getElementById('photoPreview').src = e.target.result;
                    document.getElementById('photoPreview').style.display = 'block';
                    document.getElementById('photoPlaceholder').style.display = 'none';
                    updatePreview();
                };
                reader.readAsDataURL(file);
            }
        }

        // Update preview
        function updatePreview() {
            // Update personal info
            resumeData.personalInfo = {
                fullName: document.getElementById('fullName').value,
                jobTitle: document.getElementById('jobTitle').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                linkedin: document.getElementById('linkedin').value,
                github: document.getElementById('github').value,
                summary: document.getElementById('summary').value,
                photo: resumeData.personalInfo.photo
            };

            generatePreview();
        }

        // Generate preview based on template
        function generatePreview() {
            const preview = document.getElementById('resume-preview');
            const { personalInfo } = resumeData;

            let html = '';

            // Header section that spans full width
            if (currentTemplate === 'modern') {
                html = `
                    <div class="header-section-full-width">
                        ${personalInfo.photo ? `<img src="${personalInfo.photo}" class="photo" alt="Photo" style="width: 100px; height: 100px; border-radius: 50%; float: right; margin-left: 1rem;">` : ''}
                        <h1 style="margin: 0 0 0.5rem 0;">${personalInfo.fullName || 'Ваше имя'}</h1>
                        <div class="title" style="font-size: 1.2rem; color: var(--primary); margin-bottom: 1rem;">${personalInfo.jobTitle || 'Должность'}</div>
                        <div style="font-size: 0.9rem; clear: both;">
                            ${personalInfo.email ? `📧 ${personalInfo.email} ` : ''}
                            ${personalInfo.phone ? `📱 ${personalInfo.phone} ` : ''}
                            ${personalInfo.address ? `📍 ${personalInfo.address}` : ''}
                        </div>
                        <div style="font-size: 0.9rem; margin-top: 0.5rem;">
                            ${personalInfo.linkedin ? `🔗 LinkedIn ` : ''}
                            ${personalInfo.github ? `💻 GitHub` : ''}
                        </div>
                    </div>
                    <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #e5e7eb;">
                `;
            } else {
                html = `
                    <div style="text-align: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid var(--primary);">
                        ${personalInfo.photo ? `<img src="${personalInfo.photo}" style="width: 120px; height: 120px; border-radius: 50%; margin-bottom: 1rem; display: block; margin-left: auto; margin-right: auto;" alt="Photo">` : ''}
                        <h1 style="margin-bottom: 0.5rem;">${personalInfo.fullName || 'Ваше имя'}</h1>
                        <div style="font-size: 1.1rem; color: var(--primary); margin-bottom: 1rem;">${personalInfo.jobTitle || 'Должность'}</div>
                        <div style="font-size: 0.9rem;">
                            ${personalInfo.email || ''} ${personalInfo.email && personalInfo.phone ? '|' : ''} ${personalInfo.phone || ''}
                            ${(personalInfo.email || personalInfo.phone) && personalInfo.address ? '|' : ''} ${personalInfo.address || ''}
                        </div>
                    </div>
                `;
            }

            // Two-column layout for the rest of the content
            html += `<div style="display: flex; gap: 2rem;">`;

            // Left column: Summary, Skills, Languages
            html += `<div style="flex: 1;">`;

            // Summary
            if (personalInfo.summary) {
                html += `
                    <div class="resume-section" style="margin-bottom: 1.5rem;">
                        <h2 style="font-size: 1.1rem; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 0.25rem; margin-bottom: 0.75rem;">О себе</h2>
                        <p style="line-height: 1.6;">${personalInfo.summary}</p>
                    </div>
                `;
            }

            // Skills
            if (resumeData.skills.length > 0) {
                html += `<div class="resume-section" style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.1rem; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 0.25rem; margin-bottom: 0.75rem;">Навыки</h2>`;
                resumeData.skills.forEach(skill => {
                    html += `
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="font-weight: 500;">${skill.name}</span>
                                <span style="color: #6b7280;">${skill.level}%</span>
                            </div>
                            <div style="height: 8px; background: #e5e7eb; border-radius: 1rem; overflow: hidden;">
                                <div style="height: 100%; width: ${skill.level}%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: 1rem;"></div>
                            </div>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            // Languages
            if (resumeData.languages.length > 0) {
                html += `<div class="resume-section" style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.1rem; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 0.25rem; margin-bottom: 0.75rem;">Языки</h2>`;
                resumeData.languages.forEach(lang => {
                    html += `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                            <span style="font-weight: 500;">${lang.name}</span>
                            <span style="color: var(--primary);">${lang.level}</span>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            html += `</div>`; // End left column

            // Right column: Experience, Education, Projects
            html += `<div style="flex: 1;">`;

            // Experience
            if (resumeData.experience.length > 0) {
                html += `<div class="resume-section" style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.1rem; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 0.25rem; margin-bottom: 0.75rem;">Опыт работы</h2>`;
                resumeData.experience.forEach(exp => {
                    html += `
                        <div style="margin-bottom: 1.5rem;">
                            <div style="font-weight: 600; font-size: 1.1rem;">${exp.position}</div>
                            <div style="color: var(--primary); margin: 0.25rem 0;">${exp.company}</div>
                            <div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 0.5rem;">${exp.start} - ${exp.end}</div>
                            <p style="line-height: 1.6;">${exp.description}</p>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            // Education
            if (resumeData.education.length > 0) {
                html += `<div class="resume-section" style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.1rem; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 0.25rem; margin-bottom: 0.75rem;">Образование</h2>`;
                resumeData.education.forEach(edu => {
                    html += `
                        <div style="margin-bottom: 1.5rem;">
                            <div style="font-weight: 600; font-size: 1.1rem;">${edu.school}</div>
                            <div style="color: var(--primary); margin: 0.25rem 0;">${edu.degree}</div>
                            <div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 0.5rem;">${edu.start} - ${edu.end}</div>
                            ${edu.description ? `<p style="line-height: 1.6;">${edu.description}</p>` : ''}
                        </div>
                    `;
                });
                html += `</div>`;
            }

            // Projects
            if (resumeData.projects.length > 0) {
                html += `<div class="resume-section" style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.1rem; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 0.25rem; margin-bottom: 0.75rem;">Проекты</h2>`;
                resumeData.projects.forEach(project => {
                    html += `
                        <div style="margin-bottom: 1.5rem;">
                            <div style="font-weight: 600; font-size: 1.1rem;">${project.name}</div>
                            ${project.url ? `<div style="color: var(--primary); margin: 0.25rem 0; font-size: 0.9rem;">${project.url}</div>` : ''}
                            <p style="line-height: 1.6; margin-top: 0.5rem;">${project.description}</p>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            html += `</div>`; // End right column
            html += `</div>`; // End two-column layout

            preview.innerHTML = html;
        }

        // Add experience
        function addExperience() {
            const position = document.getElementById('expPosition').value;
            const company = document.getElementById('expCompany').value;
            const start = document.getElementById('expStart').value;
            const end = document.getElementById('expCurrent').checked ? 'Настоящее время' : document.getElementById('expEnd').value;
            const description = document.getElementById('expDescription').value;

            if (!position || !company || !start) {
                showNotification('Заполните все обязательные поля', 'error');
                return;
            }

            resumeData.experience.push({ position, company, start, end, description });
            updateExperienceList();
            closeModal('experienceModal');
            clearForm('experienceModal');
            updatePreview();
            saveToHistory();
            showNotification('Опыт работы добавлен');
        }

        function updateExperienceList() {
            const list = document.getElementById('experienceList');
            list.innerHTML = '';
            resumeData.experience.forEach((exp, index) => {
                list.innerHTML += `
                    <div class="item-card">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${exp.position}</div>
                                <div class="item-subtitle">${exp.company}</div>
                                <div class="item-date">${exp.start} - ${exp.end}</div>
                            </div>
                            <button class="icon-btn" onclick="removeItem('experience', ${index})">🗑️</button>
                        </div>
                        <div class="item-description">${exp.description}</div>
                    </div>
                `;
            });
        }

        function toggleExpEnd() {
            const checkbox = document.getElementById('expCurrent');
            const endInput = document.getElementById('expEnd');
            endInput.disabled = checkbox.checked;
            if (checkbox.checked) endInput.value = '';
        }

        // Add education
        function addEducation() {
            const school = document.getElementById('eduSchool').value;
            const degree = document.getElementById('eduDegree').value;
            const start = document.getElementById('eduStart').value;
            const end = document.getElementById('eduEnd').value;
            const description = document.getElementById('eduDescription').value;

            if (!school || !degree || !start || !end) {
                showNotification('Заполните все обязательные поля', 'error');
                return;
            }

            resumeData.education.push({ school, degree, start, end, description });
            updateEducationList();
            closeModal('educationModal');
            clearForm('educationModal');
            updatePreview();
            saveToHistory();
            showNotification('Образование добавлено');
        }

        function updateEducationList() {
            const list = document.getElementById('educationList');
            list.innerHTML = '';
            resumeData.education.forEach((edu, index) => {
                list.innerHTML += `
                    <div class="item-card">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${edu.school}</div>
                                <div class="item-subtitle">${edu.degree}</div>
                                <div class="item-date">${edu.start} - ${edu.end}</div>
                            </div>
                            <button class="icon-btn" onclick="removeItem('education', ${index})">🗑️</button>
                        </div>
                        ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
                    </div>
                `;
            });
        }

        // Add skill
        function addSkill() {
            const name = document.getElementById('skillName').value;
            const level = document.getElementById('skillLevel').value;

            if (!name) {
                showNotification('Введите название навыка', 'error');
                return;
            }

            resumeData.skills.push({ name, level });
            updateSkillsList();
            closeModal('skillModal');
            clearForm('skillModal');
            updatePreview();
            saveToHistory();
            showNotification('Навык добавлен');
        }

        function updateSkillsList() {
            const list = document.getElementById('skillsList');
            list.innerHTML = '';
            resumeData.skills.forEach((skill, index) => {
                list.innerHTML += `
                    <div class="skill-bar">
                        <div class="skill-name">
                            <span>${skill.name}</span>
                            <span>${skill.level}% <button class="icon-btn" onclick="removeItem('skills', ${index})" style="padding: 0.25rem;">🗑️</button></span>
                        </div>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="width: ${skill.level}%"></div>
                        </div>
                    </div>
                `;
            });
        }

        // Add language
        function addLanguage() {
            const name = document.getElementById('langName').value;
            const level = document.getElementById('langLevel').value;

            if (!name) {
                showNotification('Введите название языка', 'error');
                return;
            }

            resumeData.languages.push({ name, level });
            updateLanguagesList();
            closeModal('languageModal');
            clearForm('languageModal');
            updatePreview();
            saveToHistory();
            showNotification('Язык добавлен');
        }

        function updateLanguagesList() {
            const list = document.getElementById('languagesList');
            list.innerHTML = '';
            resumeData.languages.forEach((lang, index) => {
                list.innerHTML += `
                    <div class="item-card">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${lang.name}</div>
                                <div class="item-subtitle">${lang.level}</div>
                            </div>
                            <button class="icon-btn" onclick="removeItem('languages', ${index})">🗑️</button>
                        </div>
                    </div>
                `;
            });
        }

        // Add project
        function addProject() {
            const name = document.getElementById('projectName').value;
            const url = document.getElementById('projectUrl').value;
            const description = document.getElementById('projectDescription').value;

            if (!name || !description) {
                showNotification('Заполните название и описание проекта', 'error');
                return;
            }

            resumeData.projects.push({ name, url, description });
            updateProjectsList();
            closeModal('projectModal');
            clearForm('projectModal');
            updatePreview();
            saveToHistory();
            showNotification('Проект добавлен');
        }

        function updateProjectsList() {
            const list = document.getElementById('projectsList');
            list.innerHTML = '';
            resumeData.projects.forEach((project, index) => {
                list.innerHTML += `
                    <div class="item-card">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${project.name}</div>
                                ${project.url ? `<div class="item-subtitle">${project.url}</div>` : ''}
                            </div>
                            <button class="icon-btn" onclick="removeItem('projects', ${index})">🗑️</button>
                        </div>
                        <div class="item-description">${project.description}</div>
                    </div>
                `;
            });
        }

        // Remove item
        function removeItem(section, index) {
            resumeData[section].splice(index, 1);
            switch(section) {
                case 'experience': updateExperienceList(); break;
                case 'education': updateEducationList(); break;
                case 'skills': updateSkillsList(); break;
                case 'languages': updateLanguagesList(); break;
                case 'projects': updateProjectsList(); break;
            }
            updatePreview();
            saveToHistory();
            showNotification('Элемент удален');
        }

        // Change template
        function changeTemplate(template) {
            currentTemplate = template;
            resumeData.template = template;

            // Update active state
            document.querySelectorAll('.template-option').forEach(opt => {
                opt.classList.remove('active');
            });
            document.querySelector(`[data-template="${template}"]`).classList.add('active');

            // Update preview class
            const preview = document.getElementById('resume-preview');
            preview.className = `resume-${template}`;

            updatePreview();
            saveToHistory();
        }

        // Export to PDF
        function exportToPDF() {
            const orientation = document.getElementById('pdfOrientation').value;
            const filename = resumeData.personalInfo.fullName || 'resume';

            // Create a temporary element for PDF generation with optimized styles
            const tempElement = document.createElement('div');
            tempElement.id = 'temp-pdf-content';
            tempElement.style.width = orientation === 'landscape' ? '297mm' : '210mm'; // A4 dimensions
            tempElement.style.padding = '15mm';
            tempElement.style.boxSizing = 'border-box';
            tempElement.style.fontFamily = '"Times New Roman", serif';
            tempElement.style.fontSize = '10pt';
            tempElement.style.lineHeight = '1.2';
            tempElement.style.backgroundColor = 'white';
            tempElement.style.color = 'black';
            tempElement.style.overflow = 'hidden';
            
            // Generate content for PDF based on selected template
            const { personalInfo } = resumeData;
            
            let html = '';

            // Header section that spans full width - matching the preview templates
            if (currentTemplate === 'modern') {
                html = `
                    <div style="margin-bottom: 8mm; padding-bottom: 5mm; border-bottom: 1px solid #ccc;">
                        ${personalInfo.photo ? `<img src="${personalInfo.photo}" style="width: 35mm; height: 35mm; border-radius: 50%; float: right; margin-left: 5mm; border: 1px solid #ccc;" alt="Photo">` : ''}
                        <h1 style="margin: 0 0 3mm 0; font-size: 18pt; color: #333; padding-bottom: 2mm; border-bottom: 2px solid #6366f1;">${personalInfo.fullName || 'Ваше имя'}</h1>
                        <div style="font-size: 12pt; color: #6366f1; margin: 2mm 0 3mm 0;">${personalInfo.jobTitle || 'Должность'}</div>
                        
                        <div style="font-size: 9pt; clear: both;">
                            ${personalInfo.email ? `📧 ${personalInfo.email} ` : ''}
                            ${personalInfo.phone ? `📱 ${personalInfo.phone} ` : ''}
                            ${personalInfo.address ? `📍 ${personalInfo.address}` : ''}
                        </div>
                        <div style="font-size: 9pt; margin-top: 2mm;">
                            ${personalInfo.linkedin ? `🔗 LinkedIn ` : ''}
                            ${personalInfo.github ? `💻 GitHub` : ''}
                        </div>
                    </div>
                `;
            } else { // classic template
                html = `
                    <div style="text-align: center; margin-bottom: 8mm; padding-bottom: 5mm; border-bottom: 2px solid #6366f1;">
                        ${personalInfo.photo ? `<img src="${personalInfo.photo}" style="width: 35mm; height: 35mm; border-radius: 50%; margin-bottom: 3mm; display: block; margin-left: auto; margin-right: auto; border: 1px solid #ccc;" alt="Photo">` : ''}
                        <h1 style="margin-bottom: 2mm; font-size: 18pt;">${personalInfo.fullName || 'Ваше имя'}</h1>
                        <div style="font-size: 12pt; color: #6366f1; margin-bottom: 3mm;">${personalInfo.jobTitle || 'Должность'}</div>
                        <div style="font-size: 9pt;">
                            ${personalInfo.email || ''} ${personalInfo.email && personalInfo.phone ? ' | ' : ''} ${personalInfo.phone || ''}
                            ${(personalInfo.email || personalInfo.phone) && personalInfo.address ? ' | ' : ''} ${personalInfo.address || ''}
                        </div>
                    </div>
                `;
            }

            // Two-column layout for the rest of the content - matching the preview layout
            html += `<div style="display: flex; gap: 10mm;">`;

            // Left column: Summary, Skills, Languages
            html += `<div style="flex: 1;">`;

            // Summary
            if (personalInfo.summary) {
                html += `
                    <div style="margin-bottom: 8mm;">
                        <h2 style="font-size: 12pt; color: #6366f1; border-bottom: 1px solid #ccc; padding-bottom: 1mm; margin: 0 0 3mm 0;">О себе</h2>
                        <p style="margin: 0; font-size: 9pt; line-height: 1.4;">${personalInfo.summary}</p>
                    </div>
                `;
            }

            // Skills
            if (resumeData.skills.length > 0) {
                html += `<div style="margin-bottom: 8mm;"><h2 style="font-size: 12pt; color: #6366f1; border-bottom: 1px solid #ccc; padding-bottom: 1mm; margin: 0 0 3mm 0;">Навыки</h2>`;
                resumeData.skills.forEach(skill => {
                    html += `
                        <div style="margin-bottom: 3mm;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1mm;">
                                <span style="font-weight: 500; font-size: 9pt;">${skill.name}</span>
                                <span style="color: #6b7280; font-size: 9pt;">${skill.level}%</span>
                            </div>
                            <div style="height: 3mm; background: #e5e7eb; border-radius: 1.5mm; overflow: hidden;">
                                <div style="height: 100%; width: ${skill.level}%; background: linear-gradient(90deg, #6366f1, #8b5cf6); border-radius: 1.5mm;"></div>
                            </div>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            // Languages
            if (resumeData.languages.length > 0) {
                html += `<div style="margin-bottom: 8mm;"><h2 style="font-size: 12pt; color: #6366f1; border-bottom: 1px solid #ccc; padding-bottom: 1mm; margin: 0 0 3mm 0;">Языки</h2>`;
                resumeData.languages.forEach(lang => {
                    html += `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 2mm;">
                            <span style="font-weight: 500; font-size: 9pt;">${lang.name}</span>
                            <span style="color: #6366f1; font-size: 9pt;">${lang.level}</span>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            html += `</div>`; // End left column

            // Right column: Experience, Education, Projects
            html += `<div style="flex: 1;">`;

            // Experience
            if (resumeData.experience.length > 0) {
                html += `<div style="margin-bottom: 8mm;"><h2 style="font-size: 12pt; color: #6366f1; border-bottom: 1px solid #ccc; padding-bottom: 1mm; margin: 0 0 3mm 0;">Опыт работы</h2>`;
                resumeData.experience.forEach(exp => {
                    html += `
                        <div style="margin-bottom: 4mm;">
                            <div style="font-weight: bold; font-size: 10pt;">${exp.position}</div>
                            <div style="color: #6366f1; margin: 1mm 0; font-size: 9pt;">${exp.company}</div>
                            <div style="font-size: 8pt; color: #666; margin-bottom: 2mm;">${exp.start} - ${exp.end}</div>
                            <p style="margin: 0; font-size: 9pt; line-height: 1.4;">${exp.description}</p>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            // Education
            if (resumeData.education.length > 0) {
                html += `<div style="margin-bottom: 8mm;"><h2 style="font-size: 12pt; color: #6366f1; border-bottom: 1px solid #ccc; padding-bottom: 1mm; margin: 0 0 3mm 0;">Образование</h2>`;
                resumeData.education.forEach(edu => {
                    html += `
                        <div style="margin-bottom: 4mm;">
                            <div style="font-weight: bold; font-size: 10pt;">${edu.school}</div>
                            <div style="color: #6366f1; margin: 1mm 0; font-size: 9pt;">${edu.degree}</div>
                            <div style="font-size: 8pt; color: #666; margin-bottom: 2mm;">${edu.start} - ${edu.end}</div>
                            ${edu.description ? `<p style="margin: 0; font-size: 9pt; line-height: 1.4;">${edu.description}</p>` : ''}
                        </div>
                    `;
                });
                html += `</div>`;
            }

            // Projects
            if (resumeData.projects.length > 0) {
                html += `<div style="margin-bottom: 8mm;"><h2 style="font-size: 12pt; color: #6366f1; border-bottom: 1px solid #ccc; padding-bottom: 1mm; margin: 0 0 3mm 0;">Проекты</h2>`;
                resumeData.projects.forEach(project => {
                    html += `
                        <div style="margin-bottom: 4mm;">
                            <div style="font-weight: bold; font-size: 10pt;">${project.name}</div>
                            ${project.url ? `<div style="color: #6366f1; margin: 1mm 0; font-size: 9pt;">${project.url}</div>` : ''}
                            <p style="margin: 1mm 0 0 0; font-size: 9pt; line-height: 1.4;">${project.description}</p>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            html += `</div>`; // End right column
            html += `</div>`; // End two-column layout

            tempElement.innerHTML = html;
            document.body.appendChild(tempElement);

            const opt = {
                margin: 0,
                filename: `${filename}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    scrollX: 0,
                    scrollY: 0,
                    width: orientation === 'landscape' ? 297 * 3.78 : 210 * 3.78 // Convert mm to pixels (approx)
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: orientation,
                    compress: true
                }
            };

            // Generate PDF
            html2pdf()
                .set(opt)
                .from(tempElement)
                .save()
                .finally(() => {
                    // Remove temporary element
                    document.body.removeChild(tempElement);
                });

            showNotification('PDF готовится к скачиванию');
        }

        // Save resume
        function saveResume() {
            const name = prompt('Введите название резюме:', resumeData.personalInfo.fullName || 'Новое резюме');
            if (!name) return;

            const resume = {
                id: Date.now(),
                name: name,
                date: new Date().toLocaleString('ru-RU'),
                data: JSON.parse(JSON.stringify(resumeData))
            };

            savedResumes.push(resume);
            localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
            showNotification('Резюме сохранено');
            loadSavedResumes();
        }

        // Load saved resumes
        function loadSavedResumes() {
            const list = document.getElementById('savedResumesList');
            if (!list) return;

            if (savedResumes.length === 0) {
                list.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">Нет сохраненных резюме</p>';
                return;
            }

            list.innerHTML = '';
            savedResumes.forEach((resume, index) => {
                list.innerHTML += `
                    <div class="saved-resume-item" onclick="loadResume(${index})">
                        <div style="font-weight: 600; margin-bottom: 0.25rem;">${resume.name}</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">${resume.date}</div>
                        <button class="icon-btn" onclick="event.stopPropagation(); deleteResume(${index})" >🗑️</button>
                    </div>
                `;
            });
        }

        // Load resume
        function loadResume(index) {
            const resume = savedResumes[index];
            resumeData = JSON.parse(JSON.stringify(resume.data));
            
            // Update form fields
            document.getElementById('fullName').value = resumeData.personalInfo.fullName || '';
            document.getElementById('jobTitle').value = resumeData.personalInfo.jobTitle || '';
            document.getElementById('email').value = resumeData.personalInfo.email || '';
            document.getElementById('phone').value = resumeData.personalInfo.phone || '';
            document.getElementById('address').value = resumeData.personalInfo.address || '';
            document.getElementById('linkedin').value = resumeData.personalInfo.linkedin || '';
            document.getElementById('github').value = resumeData.personalInfo.github || '';
            document.getElementById('summary').value = resumeData.personalInfo.summary || '';
            
            // Update photo
            if (resumeData.personalInfo.photo) {
                document.getElementById('photoPreview').src = resumeData.personalInfo.photo;
                document.getElementById('photoPreview').style.display = 'block';
                document.getElementById('photoPlaceholder').style.display = 'none';
            }
            
            // Update lists
            updateExperienceList();
            updateEducationList();
            updateSkillsList();
            updateLanguagesList();
            updateProjectsList();
            
            // Update template
            if (resumeData.template) {
                changeTemplate(resumeData.template);
            }
            
            updatePreview();
            closeModal('savedResumesModal');
            showNotification('Резюме загружено');
        }

        // Delete resume
        function deleteResume(index) {
            if (confirm('Удалить это резюме?')) {
                savedResumes.splice(index, 1);
                localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
                loadSavedResumes();
                showNotification('Резюме удалено');
            }
        }

        // History management
        function saveToHistory() {
            const snapshot = {
                timestamp: new Date().toLocaleString('ru-RU'),
                data: JSON.parse(JSON.stringify(resumeData))
            };
            
            history.unshift(snapshot);
            if (history.length > 20) history.pop(); // Keep last 20 versions
            
            updateHistoryList();
        }

        function updateHistoryList() {
            const list = document.getElementById('historyList');
            if (!list) return;

            if (history.length === 0) {
                list.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">История пуста</p>';
                return;
            }

            list.innerHTML = '';
            history.forEach((version, index) => {
                list.innerHTML += `
                    <div class="version-item" onclick="restoreVersion(${index})">
                        <div style="font-weight: 500;">Версия ${history.length - index}</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">${version.timestamp}</div>
                    </div>
                `;
            });
        }

        function restoreVersion(index) {
            if (confirm('Восстановить эту версию?')) {
                resumeData = JSON.parse(JSON.stringify(history[index].data));
                updatePreview();
                closeModal('historyModal');
                showNotification('Версия восстановлена');
            }
        }

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        function clearForm(modalId) {
            const modal = document.getElementById(modalId);
            modal.querySelectorAll('input, textarea, select').forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else if (input.type === 'range') {
                    input.value = 50;
                    const valueDisplay = document.getElementById('skillLevelValue');
                    if (valueDisplay) valueDisplay.textContent = '50';
                } else {
                    input.value = '';
                }
            });
        }

        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });
        });

        // Notification
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification show ${type}`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // LocalStorage
        function saveToLocalStorage() {
            localStorage.setItem('currentResume', JSON.stringify(resumeData));
        }

        function loadFromLocalStorage() {
            const saved = localStorage.getItem('currentResume');
            if (saved) {
                resumeData = JSON.parse(saved);
                // Restore form fields and lists
                if (resumeData.personalInfo) {
                    Object.keys(resumeData.personalInfo).forEach(key => {
                        const element = document.getElementById(key);
                        if (element && key !== 'photo') {
                            element.value = resumeData.personalInfo[key] || '';
                        }
                    });
                    
                    if (resumeData.personalInfo.photo) {
                        document.getElementById('photoPreview').src = resumeData.personalInfo.photo;
                        document.getElementById('photoPreview').style.display = 'block';
                        document.getElementById('photoPlaceholder').style.display = 'none';
                    }
                }
                
                updateExperienceList();
                updateEducationList();
                updateSkillsList();
                updateLanguagesList();
                updateProjectsList();
                
                if (resumeData.template) {
                    changeTemplate(resumeData.template);
                }
            }
        }

        // Toggle mobile menu
        function toggleMobileMenu(event) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburgerLines = document.querySelectorAll('.hamburger-line');
            navMenu.classList.toggle('mobile-menu-open');
            
            // Toggle hamburger to cross and vice versa
            hamburgerLines.forEach(line => {
                line.classList.toggle('hamburger-active');
            });
            
            // Stop event propagation to prevent accidental clicks
            event.stopPropagation();
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburgerMenu = document.querySelector('.hamburger-menu');
            
            // Check if menu is open and clicked element is not inside menu or hamburger
            if (navMenu.classList.contains('mobile-menu-open') && 
                !navMenu.contains(event.target) && 
                !hamburgerMenu.contains(event.target)) {
                
                navMenu.classList.remove('mobile-menu-open');
                
                // Remove cross icon from hamburger
                const hamburgerLines = document.querySelectorAll('.hamburger-line');
                hamburgerLines.forEach(line => {
                    line.classList.remove('hamburger-active');
                });
            }
        });

        // Auto-save
        setInterval(() => {
            saveToLocalStorage();
        }, 30000); // Save every 30 seconds

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            saveToLocalStorage();
        });