document.addEventListener('DOMContentLoaded', async function() {
    await compiler.init();
    
    const problems = [
        {
            id: 1,
            title: "Hello World",
            description: "Write a function named 'hello' that returns the string 'Hello, World!'.\n\nExample:\nhello() → 'Hello, World!'",
            tags: ["JavaScript", "Easy"],
            language: "javascript",
            template: "function hello() {\n    // Write your code here\n    return '';\n}",
            tests: [
                { 
                    call: "hello()", 
                    expected: "Hello, World!",
                    input: ""
                }
            ]
        },
        
    ];

    const backBtn = document.getElementById('back-btn');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const problemsGrid = document.getElementById('problems-grid');
    const problemsSection = document.getElementById('problems-section');
    const problemDetailSection = document.getElementById('problem-detail-section');
    const problemTitle = document.getElementById('problem-title');
    const problemTags = document.getElementById('problem-tags');
    const problemDescription = document.getElementById('problem-description');
    const languageSelect = document.getElementById('language-select');
    const codeTemplate = document.getElementById('code-template');
    const codeInput = document.getElementById('code-input');
    const runBtn = document.getElementById('run-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resultOutput = document.getElementById('result-output');
    const searchFilterSection = document.getElementById('search-filter-section');

    let currentProblem = null;
    let filteredProblems = problems;

    function renderProblems() {
        problemsGrid.innerHTML = '';
        filteredProblems.forEach(problem => {
            const card = document.createElement('div');
            card.className = 'problem-card';
            card.dataset.id = problem.id;
            
            const solvedStatus = localStorage.getItem(`problem-${problem.id}`);
            if (solvedStatus === 'solved') {
                card.classList.add('solved');
            } else if (solvedStatus === 'failed') {
                card.classList.add('failed');
            }
            
            card.innerHTML = `
                <h3>${problem.title}</h3>
                <div class="tags">
                    ${problem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p>Click to solve this ${problem.language} problem</p>
                ${solvedStatus === 'solved' ? '<div class="success-status">✓ Solved</div>' : ''}
                ${solvedStatus === 'failed' ? '<div class="error-status">✗ Try Again</div>' : ''}
            `;
            card.addEventListener('click', () => showProblemDetail(problem));
            problemsGrid.appendChild(card);
        });
    }

    function showProblemDetail(problem) {
        currentProblem = problem;
        problemTitle.textContent = problem.title;
        problemTags.innerHTML = problem.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        problemDescription.textContent = problem.description;
        languageSelect.value = problem.language;
        const languageDisplay = document.getElementById('language-display');
        languageDisplay.textContent = problem.language.toUpperCase();
        codeTemplate.textContent = problem.template;
        codeInput.value = problem.template;
        resultOutput.textContent = '';
        problemsSection.style.display = 'none';
        searchFilterSection.style.display = 'none'; 
        problemDetailSection.style.display = 'block';
        updateCodeEditor();
    }

    function updateCodeEditor() {
        const language = currentProblem ? currentProblem.language : languageSelect.value;
        const textarea = codeInput;
        
        if (language === 'python') {
            textarea.placeholder = '# Write your Python solution here...';
        } else if (language === 'javascript') {
            textarea.placeholder = '// Write your JavaScript solution here...';
        } else if (language === 'c++') {
            textarea.placeholder = '// Write your C++ solution here...';
        }
    }

    backBtn.addEventListener('click', function() {
        if (problemDetailSection.style.display === 'block') {
            problemDetailSection.style.display = 'none';
            problemsSection.style.display = 'block';
            searchFilterSection.style.display = 'flex'; 
            renderProblems();
        } else {
            window.location.href = '../index.html';
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const lang = this.getAttribute('data-lang');
            if (lang === 'all') {
                filteredProblems = problems;
            } else {
                filteredProblems = problems.filter(problem => 
                    problem.language === lang || 
                    problem.tags.some(tag => tag.toLowerCase() === lang)
                );
            }
            renderProblems();
        });
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filteredProblems = problems.filter(problem => 
            problem.title.toLowerCase().includes(searchTerm) ||
            problem.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            problem.language.toLowerCase().includes(searchTerm)
        );
        renderProblems();
    });

    runBtn.addEventListener('click', async function() {
        if (!currentProblem) return;
        
        this.disabled = true;
        this.textContent = 'Testing...';
        
        const userCode = codeInput.value;
        const results = await compiler.testSolution(
            userCode, 
            currentProblem.language, 
            currentProblem.tests
        );
        
        resultOutput.innerHTML = '';
        let allPassed = true;
        
        results.forEach(result => {
            const p = document.createElement('p');
            p.textContent = result.message;
            p.style.color = result.passed ? 'green' : 'red';
            p.style.fontWeight = result.passed ? 'normal' : 'bold';
            resultOutput.appendChild(p);
            
            if (!result.passed) allPassed = false;
        });
        
        if (allPassed) {
            const successMsg = document.createElement('p');
            successMsg.textContent = '✓ All tests passed! You can now submit your solution.';
            successMsg.style.color = 'green';
            successMsg.style.fontWeight = 'bold';
            resultOutput.appendChild(successMsg);
        }
        
        this.disabled = false;
        this.textContent = 'Test Code';
    });

    submitBtn.addEventListener('click', async function() {
        if (!currentProblem) return;
        
        this.disabled = true;
        this.textContent = 'Submitting...';
        
        const userCode = codeInput.value;
        const results = await compiler.testSolution(
            userCode, 
            currentProblem.language, 
            currentProblem.tests
        );
        
        const allPassed = results.every(r => r.passed);
        
        if (allPassed) {
            this.classList.remove('error');
            this.classList.add('success');
            this.textContent = '✓ Solved!';
            resultOutput.innerHTML = '<p style="color: green; font-weight: bold;">🎉 Congratulations! All tests passed! 🎉</p>';
            localStorage.setItem(`problem-${currentProblem.id}`, 'solved');
            setTimeout(() => {
                problemDetailSection.style.display = 'none';
                problemsSection.style.display = 'block';
                renderProblems();
                this.classList.remove('success');
                this.textContent = 'Submit Solution';
                this.disabled = false;
            }, 2000);
        } else {
            this.classList.remove('success');
            this.classList.add('error');
            this.textContent = '✗ Try Harder!';
            resultOutput.innerHTML = '<p style="color: red; font-weight: bold;">❌ Some tests failed. Review your code and try again!</p>';
            localStorage.setItem(`problem-${currentProblem.id}`, 'failed');
            setTimeout(() => {
                this.classList.remove('error');
                this.textContent = 'Submit Solution';
                this.disabled = false;
            }, 2000);
        }
    });
    renderProblems();
});

const adminBtn = document.getElementById('admin-btn');
const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';

if (isAdmin) {
    adminBtn.innerHTML = '<i class="fas fa-user-shield"></i> Admin ✓';
    adminBtn.classList.add('logged-in');
    adminBtn.title = 'Logged in as Admin';
    
    adminBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('user');
        location.reload();
    });
} else {
    adminBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../admin/admin.html';
    });
}