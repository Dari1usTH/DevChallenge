document.addEventListener('DOMContentLoaded', async function() {
    await compiler.init();
    
    const backBtn = document.getElementById('back-btn');
    const languageSelect = document.getElementById('language-select');
    const codeEditor = document.getElementById('code-editor');
    const outputDisplay = document.getElementById('output-display');
    const runBtn = document.getElementById('run-btn');
    const clearBtn = document.getElementById('clear-btn');
    
    function updateEditorPlaceholder() {
        const language = languageSelect.value;
        if (language === 'python') {
            codeEditor.placeholder = '# Write your Python code here...\nprint("Hello, Moonshot!")';
        } else if (language === 'javascript') {
            codeEditor.placeholder = '// Write your JavaScript code here...\nconsole.log("Hello, Moonshot!");';
        }
    }
    
    async function executeCode(code, language) {
        outputDisplay.textContent = 'Running...';
        outputDisplay.className = '';
        
        try {
            let result;
            
            switch(language) {
                case 'javascript':
                    result = await compiler.runJavaScript(code);
                    break;
                case 'python':
                    result = await compiler.runPython(code);
                    break;
                default:
                    result = { success: false, error: `Unsupported language: ${language}` };
            }
            
            if (result.success) {
                let output = result.output || 'No output';
                outputDisplay.textContent = output;
                outputDisplay.className = 'success';
            } else {
                outputDisplay.textContent = `Error: ${result.error}`;
                outputDisplay.className = 'error';
            }
        } catch (error) {
            outputDisplay.textContent = `Runtime error: ${error.message}`;
            outputDisplay.className = 'error';
        }
    }
    
    languageSelect.addEventListener('change', function() {
        updateEditorPlaceholder();
    });
    
    runBtn.addEventListener('click', async function() {
        const code = codeEditor.value.trim();
        const language = languageSelect.value;
        
        if (!code) {
            outputDisplay.textContent = 'Please write some code first.';
            outputDisplay.className = 'error';
            return;
        }
        
        runBtn.disabled = true;
        runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';
        
        await executeCode(code, language);
        
        runBtn.disabled = false;
        runBtn.innerHTML = '<i class="fas fa-play"></i> Run Code';
    });
    
    clearBtn.addEventListener('click', function() {
        codeEditor.value = '';
        outputDisplay.textContent = '';
        outputDisplay.className = '';
        codeEditor.focus();
    });
    
    backBtn.addEventListener('click', function() {
        window.location.href = './index.html';
    });
    
    updateEditorPlaceholder();
});