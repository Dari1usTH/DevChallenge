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
            examples: `JavaScript Example:
    const arr = [1, 3, 5, 7, 9, 11, 13, 15];
    console.log(binarySearch(arr, 7));
    console.log(binarySearch(arr, 10));

    Python Example:
    arr = [1, 3, 5, 7, 9, 11, 13, 15]
    print(binary_search(arr, 7))
    print(binary_search(arr, 10))`
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
    const algorithmExamples = document.getElementById('algorithm-examples');
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
        algorithmExamples.textContent = algorithm.examples;

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
            window.location.href = '../index.html';
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
            window.location.href = '../codedit/codedit.html';
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