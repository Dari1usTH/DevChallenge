document.addEventListener('DOMContentLoaded', async function() {
    await compiler.init();
    
    const problems = [
        {
            id: 1,
            title: "Hello World",
            description: "Write a function named 'hello' that returns the string 'Hello, World!'.\n\nExample:\nhello() -> 'Hello, World!'",
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
        {
            id: 2,
            title: "Find Maximum Number",
            description: "Write a function named 'findMax' that takes an array of numbers and returns the largest number.\n\nExample:\nfindMax([1, 5, 3, 9, 2]) -> 9\nfindMax([-10, -5, -8]) -> -5",
            tags: ["JavaScript", "Easy"],
            language: "javascript",
            template: "function findMax(numbers) {\n    // Write your code here\n    return 0;\n}",
            tests: [
                { 
                    call: "findMax([1, 5, 3, 9, 2])", 
                    expected: 9,
                    input: ""
                },
                { 
                    call: "findMax([-10, -5, -8])", 
                    expected: -5,
                    input: ""
                },
                { 
                    call: "findMax([100, 200, 150])", 
                    expected: 200,
                    input: ""
                },
                { 
                    call: "findMax([7])", 
                    expected: 7,
                    input: ""
                }
            ]
        },
        {
            id: 3,
            title: "Count Vowels",
            description: "Write a function named 'countVowels' that takes a string and returns the number of vowels (a, e, i, o, u) in it.\n\nExample:\ncountVowels('hello') -> 2\ncountVowels('javascript') -> 3\n\nNote: The function should work with both uppercase and lowercase letters.",
            tags: ["JavaScript", "Medium"],
            language: "javascript",
            template: "function countVowels(str) {\n    // Write your code here\n    return 0;\n}",
            tests: [
                { 
                    call: "countVowels('hello')", 
                    expected: 2,
                    input: ""
                },
                { 
                    call: "countVowels('javascript')", 
                    expected: 3,
                    input: ""
                },
                { 
                    call: "countVowels('AEIOU')", 
                    expected: 5,
                    input: ""
                },
                { 
                    call: "countVowels('bcd')", 
                    expected: 0,
                    input: ""
                },
                { 
                    call: "countVowels('')", 
                    expected: 0,
                    input: ""
                }
            ]
        },
        {
            id: 4,
            title: "Check Palindrome",
            description: "Write a function named 'isPalindrome' that checks if a given string is a palindrome. A palindrome is a word that reads the same forward and backward.\n\nExample:\nisPalindrome('racecar') -> true\nisPalindrome('hello') -> false\nisPalindrome('A man a plan a canal Panama') -> true",
            tags: ["JavaScript", "Medium"],
            language: "javascript",
            template: "function isPalindrome(str) {\n    // Write your code here\n    return false;\n}",
            tests: [
                { 
                    call: "isPalindrome('racecar')", 
                    expected: true,
                    input: ""
                },
                { 
                    call: "isPalindrome('hello')", 
                    expected: false,
                    input: ""
                },
                { 
                    call: "isPalindrome('A man a plan a canal Panama')", 
                    expected: true,
                    input: ""
                },
                { 
                    call: "isPalindrome('Madam')", 
                    expected: true,
                    input: ""
                },
                { 
                    call: "isPalindrome('')", 
                    expected: true,
                    input: ""
                }
            ]
        },
        {
            id: 5,
            title: "Sum of Array Elements",
            description: "Write a function named 'sumArray' that takes an array of numbers and returns their sum.\n\nExample:\nsumArray([1, 2, 3, 4, 5]) -> 15\nsumArray([10, -5, 3]) -> 8\n\nNote: Handle empty arrays by returning 0.",
            tags: ["JavaScript", "Medium"],
            language: "javascript",
            template: "function sumArray(numbers) {\n    // Write your code here\n    return 0;\n}",
            tests: [
                { 
                    call: "sumArray([1, 2, 3, 4, 5])", 
                    expected: 15,
                    input: ""
                },
                { 
                    call: "sumArray([10, -5, 3])", 
                    expected: 8,
                    input: ""
                },
                { 
                    call: "sumArray([])", 
                    expected: 0,
                    input: ""
                },
                { 
                    call: "sumArray([-1, -2, -3])", 
                    expected: -6,
                    input: ""
                }
            ]
        },
        {
            id: 6,
            title: "Find Duplicate Numbers",
            description: "Write a function named 'findDuplicates' that takes an array of numbers and returns an array containing only the numbers that appear more than once.\n\nExample:\nfindDuplicates([1, 2, 3, 2, 4, 5, 1]) -> [1, 2]\nfindDuplicates([5, 5, 5, 5]) -> [5]\nfindDuplicates([1, 2, 3]) -> []\n\nNote: The order of the result doesn't matter.",
            tags: ["JavaScript", "Hard"],
            language: "javascript",
            template: "function findDuplicates(numbers) {\n    // Write your code here\n    return [];\n}",
            tests: [
                { 
                    call: "JSON.stringify(findDuplicates([1, 2, 3, 2, 4, 5, 1]).sort())", 
                    expected: "[1,2]",
                    input: ""
                },
                { 
                    call: "JSON.stringify(findDuplicates([5, 5, 5, 5]).sort())", 
                    expected: "[5]",
                    input: ""
                },
                { 
                    call: "JSON.stringify(findDuplicates([1, 2, 3]).sort())", 
                    expected: "[]",
                    input: ""
                },
                { 
                    call: "JSON.stringify(findDuplicates([1, 2, 3, 4, 5, 1, 2, 6]).sort())", 
                    expected: "[1,2]",
                    input: ""
                }
            ]
        },
        {
            id: 7,
            title: "Fibonacci Sequence",
            description: "Write a function named 'fibonacci' that takes a number n and returns the nth number in the Fibonacci sequence.\n\nThe Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...\nEach number is the sum of the two preceding ones.\n\nExample:\nfibonacci(0) -> 0\nfibonacci(1) -> 1\nfibonacci(5) -> 5\nfibonacci(7) -> 13",
            tags: ["JavaScript", "Hard"],
            language: "javascript",
            template: "function fibonacci(n) {\n    // Write your code here\n    return 0;\n}",
            tests: [
                { 
                    call: "fibonacci(0)", 
                    expected: 0,
                    input: ""
                },
                { 
                    call: "fibonacci(1)", 
                    expected: 1,
                    input: ""
                },
                { 
                    call: "fibonacci(5)", 
                    expected: 5,
                    input: ""
                },
                { 
                    call: "fibonacci(7)", 
                    expected: 13,
                    input: ""
                },
                { 
                    call: "fibonacci(10)", 
                    expected: 55,
                    input: ""
                }
            ]
        },
        {
            id: 8,
            title: "Sum of Two Numbers",
            description: "Write a function named 'sum_numbers' that takes two numbers as arguments and returns their sum.\n\nExamples:\nsum_numbers(1, 2) -> 3\nsum_numbers(-5, 10) -> 5",
            tags: ["Python", "Easy"],
            language: "python",
            template: "def sum_numbers(a, b):\n    # Write your code here\n    return 0",
            tests: [
                { 
                    call: "sum_numbers(1, 2)", 
                    expected: "3",
                    input: "1, 2"
                },
                { 
                    call: "sum_numbers(-5, 10)", 
                    expected: "5",
                    input: "-5, 10"
                }
            ]
        },
        {
            id: 9,
            title: "Calculate Circle Area",
            description: "Write a function named 'circle_area' that takes the radius of a circle and returns its area.\n\nFormula: Area = pi × radius²\nUse pi = 3.14159\n\nExample:\ncircle_area(5) -> 78.53975\ncircle_area(10) -> 314.159",
            tags: ["Python", "Easy"],
            language: "python",
            template: "def circle_area(radius):\n    # Write your code here\n    return 0",
            tests: [
                { 
                    call: "circle_area(5)", 
                    expected: "78.53975",
                    input: ""
                },
                { 
                    call: "circle_area(10)", 
                    expected: "314.159",
                    input: ""
                },
                { 
                    call: "circle_area(1)", 
                    expected: "3.14159",
                    input: ""
                },
                { 
                    call: "circle_area(0)", 
                    expected: "0.0",
                    input: ""
                }
            ]
        },
        {
            id: 10,
            title: "Find Common Elements",
            description: "Write a function named 'find_common' that takes two lists and returns a list of elements that appear in both lists.\n\nExample:\nfind_common([1, 2, 3, 4], [3, 4, 5, 6]) -> [3, 4]\nfind_common(['a', 'b', 'c'], ['b', 'c', 'd']) -> ['b', 'c']\n\nNote: The order in the result doesn't matter, but avoid duplicates.",
            tags: ["Python", "Medium"],
            language: "python",
            template: "def find_common(list1, list2):\n    # Write your code here\n    return []",
            tests: [
                { 
                    call: "sorted(find_common([1, 2, 3, 4], [3, 4, 5, 6]))", 
                    expected: "[3, 4]",
                    input: ""
                },
                { 
                    call: "sorted(find_common(['a', 'b', 'c'], ['b', 'c', 'd']))", 
                    expected: "['b', 'c']",
                    input: ""
                },
                { 
                    call: "sorted(find_common([1, 2, 2, 3], [2, 2, 3, 4]))", 
                    expected: "[2, 3]",
                    input: ""
                },
                { 
                    call: "sorted(find_common([], [1, 2, 3]))", 
                    expected: "[]",
                    input: ""
                }
            ]
        },
        {
            id: 11,
            title: "Temperature Converter",
            description: "Write a function named 'convert_temperature' that converts between Celsius and Fahrenheit.\n\nThe function should take two parameters: temperature and scale ('C' for Celsius or 'F' for Fahrenheit).\n\nFormulas:\nCelsius to Fahrenheit: F = (C × 9/5) + 32\nFahrenheit to Celsius: C = (F - 32) × 5/9\n\nExample:\nconvert_temperature(0, 'C') -> 32.0\nconvert_temperature(100, 'C') -> 212.0\nconvert_temperature(32, 'F') -> 0.0",
            tags: ["Python", "Medium"],
            language: "python",
            template: "def convert_temperature(temp, scale):\n    # Write your code here\n    return 0",
            tests: [
                { 
                    call: "convert_temperature(0, 'C')", 
                    expected: "32.0",
                    input: ""
                },
                { 
                    call: "convert_temperature(100, 'C')", 
                    expected: "212.0",
                    input: ""
                },
                { 
                    call: "convert_temperature(32, 'F')", 
                    expected: "0.0",
                    input: ""
                },
                { 
                    call: "convert_temperature(212, 'F')", 
                    expected: "100.0",
                    input: ""
                },
                { 
                    call: "convert_temperature(-40, 'C')", 
                    expected: "-40.0",
                    input: ""
                }
            ]
        },
        {
            id: 12,
            title: "Count Character Occurrences",
            description: "Write a function named 'count_char' that takes a string and a character, and returns how many times that character appears in the string.\n\nExample:\ncount_char('hello world', 'l') -> 3\ncount_char('programming', 'm') -> 2\ncount_char('python', 'z') -> 0\n\nNote: The function should be case-sensitive.",
            tags: ["Python", "Medium"],
            language: "python",
            template: "def count_char(text, char):\n    # Write your code here\n    return 0",
            tests: [
                { 
                    call: "count_char('hello world', 'l')", 
                    expected: "3",
                    input: ""
                },
                { 
                    call: "count_char('programming', 'm')", 
                    expected: "2",
                    input: ""
                },
                { 
                    call: "count_char('python', 'z')", 
                    expected: "0",
                    input: ""
                },
                { 
                    call: "count_char('Hello World', 'h')", 
                    expected: "0",
                    input: ""
                },
                { 
                    call: "count_char('aaaaa', 'a')", 
                    expected: "5",
                    input: ""
                }
            ]
        },
        {
            id: 13,
            title: "List Statistics",
            description: "Write a function named 'list_stats' that takes a list of numbers and returns a dictionary with the following statistics:\n- 'sum': total sum of numbers\n- 'average': average of numbers\n- 'min': smallest number\n- 'max': largest number\n\nExample:\nlist_stats([1, 2, 3, 4, 5]) -> {'sum': 15, 'average': 3.0, 'min': 1, 'max': 5}\nlist_stats([10, -5, 3]) -> {'sum': 8, 'average': 2.67, 'min': -5, 'max': 10}\n\nNote: Round the average to 2 decimal places.",
            tags: ["Python", "Hard"],
            language: "python",
            template: "def list_stats(numbers):\n    # Write your code here\n    return {}",
            tests: [
                { 
                    call: "list_stats([1, 2, 3, 4, 5])", 
                    expected: "{'sum': 15, 'average': 3.0, 'min': 1, 'max': 5}",
                    input: ""
                },
                { 
                    call: "list_stats([10, -5, 3])", 
                    expected: "{'sum': 8, 'average': 2.67, 'min': -5, 'max': 10}",
                    input: ""
                },
                { 
                    call: "list_stats([5])", 
                    expected: "{'sum': 5, 'average': 5.0, 'min': 5, 'max': 5}",
                    input: ""
                },
                { 
                    call: "list_stats([2.5, 3.5, 4.5])", 
                    expected: "{'sum': 10.5, 'average': 3.5, 'min': 2.5, 'max': 4.5}",
                    input: ""
                }
            ]
        },
        {
            id: 14,
            title: "Password Validator",
            description: "Write a function named 'validate_password' that checks if a password meets the following criteria:\n1. At least 8 characters long\n2. Contains at least one uppercase letter\n3. Contains at least one lowercase letter\n4. Contains at least one digit\n5. Contains at least one special character (@, #, $, %, &, *)\n\nReturn True if the password is valid, False otherwise.\n\nExample:\nvalidate_password('Pass123!') -> True\nvalidate_password('password') -> False (no uppercase, digit, or special char)\nvalidate_password('PASS123!') -> False (no lowercase)\nvalidate_password('Pass!') -> False (too short)",
            tags: ["Python", "Hard"],
            language: "python",
            template: "def validate_password(password):\n    # Write your code here\n    return False",
            tests: [
                { 
                    call: "validate_password('Pass123!')", 
                    expected: "True",
                    input: ""
                },
                { 
                    call: "validate_password('password')", 
                    expected: "False",
                    input: ""
                },
                { 
                    call: "validate_password('PASS123!')", 
                    expected: "False",
                    input: ""
                },
                { 
                    call: "validate_password('Pass!')", 
                    expected: "False",
                    input: ""
                },
                { 
                    call: "validate_password('StrongPass#2024')", 
                    expected: "True",
                    input: ""
                },
                { 
                    call: "validate_password('Aa1@')", 
                    expected: "False",
                    input: ""
                }
            ]
        }
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
        problemDescription.innerHTML = problem.description.replace(/\n/g, '<br>');
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
            window.location.href = './index.html';
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
        window.location.href = './admin/admin.html';
    });
}