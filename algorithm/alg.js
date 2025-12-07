document.addEventListener('DOMContentLoaded', function() {
    const algorithms = [
        {
            id: 1,
            title: "Binary Search",
            description: "Binary Search is a search algorithm that finds the position of a target value within a sorted array.",
            tags: ["Searching", "Array", "Divide & Conquer"],
            type: "searching",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            codeJS: `function binarySearch(arr, target) {
        let left = 0;
        let right = arr.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (arr[mid] === target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }`,
            codePython: `def binary_search(arr, target):
        left = 0
        right = len(arr) - 1
        
        while left <= right:
            mid = (left + right) // 2
            
            if arr[mid] == target:
                return mid
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        
        return -1`,
        },
        {
            id: 2,
            title: "Prime Number Check",
            description: "Check if a number is prime.",
            tags: ["Math", "Numbers", "Basic"],
            type: "math",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            codeJS: `function isPrime(n) {
            if (n <= 1) return false;
            for (let i = 2; i <= Math.sqrt(n); i++) {
                if (n % i === 0) return false;
            }
            return true;
        }`,
            codePython: `def is_prime(n):
            if n <= 1:
                return False
            for i in range(2, int(n ** 0.5) + 1):
                if n % i == 0:
                    return False
            return True`,
        },
        {
            id: 3,
            title: "Linear Search",
            description: "Find the position of a target value in an array by checking each element sequentially.",
            tags: ["Searching", "Array", "Basic"],
            type: "searching",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            codeJS: `function linearSearch(arr, target) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === target) {
                    return i;
                }
            }
            return -1;
        }`,
            codePython: `def linear_search(arr, target):
            for i in range(len(arr)):
                if arr[i] == target:
                    return i
            return -1`,
        },
        {
            id: 4,
            title: "Bubble Sort",
            description: "Sort an array by repeatedly swapping adjacent elements if they are in the wrong order.",
            tags: ["Sorting", "Array", "Basic"],
            type: "sorting",
            timeComplexity: "O(n*n)",
            spaceComplexity: "O(1)",
            codeJS: `function bubbleSort(arr) {
            const n = arr.length;
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    }
                }
            }
            return arr;
        }`,
            codePython: `def bubble_sort(arr):
            n = len(arr)
            for i in range(n - 1):
                for j in range(n - i - 1):
                    if arr[j] > arr[j + 1]:
                        arr[j], arr[j + 1] = arr[j + 1], arr[j]
            return arr`,
        },
        {
            id: 5,
            title: "Euclidean Algorithm",
            description: "Find the greatest common divisor of two numbers using Euclidean algorithm.",
            tags: ["Math", "Numbers", "Algorithm"],
            type: "math",
            timeComplexity: "O(log (a or b))",
            spaceComplexity: "O(1)",
            codeJS: `function gcd(a, b) {
            while (b !== 0) {
                [a, b] = [b, a % b];
            }
            return Math.abs(a);
        }`,
            codePython: `def gcd(a, b):
            while b != 0:
                a, b = b, a % b
            return abs(a)`,
        },
        {
            id: 6,
            title: "Palindrome Number Check",
            description: "Check if a number reads the same forwards and backwards.",
            tags: ["Numbers", "Math", "String"],
            type: "math",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            codeJS: `function isPalindromeNumber(num) {
            if (num < 0) return false;
            let original = num;
            let reversed = 0;
            
            while (num > 0) {
                reversed = reversed * 10 + (num % 10);
                num = Math.floor(num / 10);
            }
            
            return original === reversed;
        }`,
            codePython: `def is_palindrome_number(num):
            if num < 0:
                return False
            original = num
            reversed_num = 0
            
            while num > 0:
                reversed_num = reversed_num * 10 + (num % 10)
                num //= 10
            
            return original == reversed_num`,
        },
        {
            id: 7,
            title: "Count Divisors",
            description: "Count how many divisors a number has, including 1 and itself.",
            tags: ["Math", "Numbers", "Divisors"],
            type: "math",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            codeJS: `function countDivisors(n) {
            if (n <= 0) return 0;
            let count = 0;
            for (let i = 1; i <= Math.sqrt(n); i++) {
                if (n % i === 0) {
                    count += (i * i === n) ? 1 : 2;
                }
            }
            return count;
        }`,
            codePython: `def count_divisors(n):
            if n <= 0:
                return 0
            count = 0
            for i in range(1, int(n ** 0.5) + 1):
                if n % i == 0:
                    if i * i == n:
                        count += 1
                    else:
                        count += 2
            return count`,
        }
    ];

    const backBtn = document.getElementById('back-btn');
    const searchInput = document.getElementById('search-input');
    const algorithmsGrid = document.getElementById('algorithms-grid');
    const algorithmsSection = document.getElementById('algorithms-section');
    const algorithmDetailSection = document.getElementById('algorithm-detail-section');
    const algorithmTitle = document.getElementById('algorithm-title');
    const algorithmTags = document.getElementById('algorithm-tags');
    const algorithmDescription = document.getElementById('algorithm-description');
    const timeComplexity = document.getElementById('time-complexity');
    const spaceComplexity = document.getElementById('space-complexity');
    const languageSelect = document.getElementById('language-select');
    const algorithmCode = document.getElementById('algorithm-code');
    const copyBtn = document.getElementById('copy-btn');
    const tryCodeBtn = document.getElementById('try-code-btn');
    const searchFilterSection = document.getElementById('search-filter-section');

    let currentAlgorithm = null;
    let filteredAlgorithms = algorithms;

    function renderAlgorithms() {
        algorithmsGrid.innerHTML = '';
        filteredAlgorithms.forEach(algorithm => {
            const card = document.createElement('div');
            card.className = 'algorithm-card';
            card.dataset.id = algorithm.id;
            
            card.innerHTML = `
                <h3><i class="fas fa-cog"></i> ${algorithm.title}</h3>
                <div class="tags">
                    ${algorithm.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p class="description">${algorithm.description.substring(0, 150)}...</p>
                <div class="complexity">
                    <div class="complexity-item">
                        <span>Time</span>
                        <div class="value">${algorithm.timeComplexity}</div>
                    </div>
                    <div class="complexity-item">
                        <span>Space</span>
                        <div class="value">${algorithm.spaceComplexity}</div>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showAlgorithmDetail(algorithm));
            algorithmsGrid.appendChild(card);
        });
    }

    function showAlgorithmDetail(algorithm) {
        currentAlgorithm = algorithm;
        algorithmTitle.textContent = algorithm.title;
        algorithmTitle.innerHTML = `<i class="fas fa-cog"></i> ${algorithm.title}`;
        algorithmTags.innerHTML = algorithm.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        algorithmDescription.textContent = algorithm.description;
        timeComplexity.textContent = algorithm.timeComplexity;
        spaceComplexity.textContent = algorithm.spaceComplexity;

        updateAlgorithmCode();
        
        algorithmsSection.style.display = 'none';
        searchFilterSection.style.display = 'none';
        algorithmDetailSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateAlgorithmCode() {
        const language = languageSelect.value;
        if (currentAlgorithm) {
            algorithmCode.textContent = language === 'javascript' 
                ? currentAlgorithm.codeJS 
                : currentAlgorithm.codePython;
            
            highlightCode();
        }
    }

    function highlightCode() {
        const codeElement = algorithmCode;
        let code = codeElement.textContent;
        codeElement.innerHTML = code;
    }

    backBtn.addEventListener('click', function() {
        if (algorithmDetailSection.style.display === 'block') {
            algorithmDetailSection.style.display = 'none';
            algorithmsSection.style.display = 'block';
            searchFilterSection.style.display = 'flex';
            renderAlgorithms();
        } else {
            window.location.href = './index.html';
        }
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filteredAlgorithms = algorithms.filter(algorithm => 
            algorithm.title.toLowerCase().includes(searchTerm) ||
            algorithm.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            algorithm.type.toLowerCase().includes(searchTerm) ||
            algorithm.description.toLowerCase().includes(searchTerm)
        );
        renderAlgorithms();
    });

    languageSelect.addEventListener('change', function() {
        updateAlgorithmCode();
    });

    copyBtn.addEventListener('click', function() {
        const codeToCopy = currentAlgorithm ? 
            (languageSelect.value === 'javascript' ? currentAlgorithm.codeJS : currentAlgorithm.codePython) 
            : '';
        
        navigator.clipboard.writeText(codeToCopy).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code: ', err);
        });
    });

    tryCodeBtn.addEventListener('click', function() {
        if (currentAlgorithm) {
            const code = languageSelect.value === 'javascript' 
                ? currentAlgorithm.codeJS 
                : currentAlgorithm.codePython;
            
            localStorage.setItem('algorithmCode', code);
            localStorage.setItem('algorithmLanguage', languageSelect.value);
            window.location.href = './codedit/codedit.html';
        }
    });

    renderAlgorithms();
    const preloadCode = localStorage.getItem('preloadAlgorithmCode');
    const preloadLanguage = localStorage.getItem('preloadAlgorithmLanguage');
    
    if (preloadCode && preloadLanguage) {
        const algorithm = algorithms.find(algo => 
            (preloadLanguage === 'javascript' && algo.codeJS === preloadCode) ||
            (preloadLanguage === 'python' && algo.codePython === preloadCode)
        );
        
        if (algorithm) {
            showAlgorithmDetail(algorithm);
        }
        localStorage.removeItem('preloadAlgorithmCode');
        localStorage.removeItem('preloadAlgorithmLanguage');
    }
});