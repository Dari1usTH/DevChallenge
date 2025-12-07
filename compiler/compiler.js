class CompilerEngine {
    constructor() {
        this.pyodide = null;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        try {
            this.pyodide = await loadPyodide();
            await this.pyodide.loadPackage(['numpy']);
            this.initialized = true;
            console.log('Compiler engine initialized');
        } catch (error) {
            console.error('Failed to initialize compiler:', error);
        }
    }

    async runJavaScript(code) {
        try {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            const result = iframe.contentWindow.eval(`
                try {
                    ${code}
                } catch(error) {
                    throw error;
                }
            `);
            
            document.body.removeChild(iframe);
            return { success: true, output: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async runPython(code) {
        if (!this.pyodide || !this.initialized) {
            return { success: false, error: 'Python compiler not initialized' };
        }

        try {
            await this.pyodide.runPythonAsync(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);
            
            await this.pyodide.runPythonAsync(code);
            
            const output = this.pyodide.runPython("sys.stdout.getvalue()").trim();
            const error = this.pyodide.runPython("sys.stderr.getvalue()").trim();
            
            if (error) {
                return { success: false, error: error };
            }
            
            return { success: true, output: output };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async testSolution(code, language, testCases) {
        const results = [];
        
        for (const testCase of testCases) {
            let result;
            
            switch(language) {
                case 'javascript':
                    result = await this.testJavaScript(code, testCase);
                    break;
                case 'python':
                    result = await this.testPython(code, testCase);
                    break;
                default:
                    result = { passed: false, message: `Unsupported language: ${language}` };
            }
            
            results.push(result);
        }
        
        return results;
    }

    async testJavaScript(code, testCase) {
        try {
            const testCode = `
${code}
try {
    const result = ${testCase.call};
    result;
} catch(e) {
    throw new Error(e);
}
`;
            
            const response = await this.runJavaScript(testCode);
            
            if (!response.success) {
                return { 
                    passed: false, 
                    message: `Error: ${response.error}` 
                };
            }
            
            const output = String(response.output);
            const expected = String(testCase.expected);
            const passed = output === expected;
            
            return {
                passed,
                message: passed 
                    ? `✓ Test passed: ${testCase.call} → ${output}` 
                    : `✗ Test failed: expected "${expected}", got "${output}"`
            };
        } catch (error) {
            return { 
                passed: false, 
                message: `Runtime error: ${error.message}` 
            };
        }
    }

    async testPython(code, testCase) {
        try {
            const testCode = `
${code}

try:
    result = ${testCase.call}
    print(result)
except Exception as e:
    print(f"ERROR: {e}")
`;
            
            const response = await this.runPython(testCode);
            
            if (!response.success) {
                return { 
                    passed: false, 
                    message: `Python error: ${response.error}` 
                };
            }
            
            const output = response.output;
            const expected = String(testCase.expected);
            const passed = output === expected;
            
            return {
                passed,
                message: passed 
                    ? `✓ Test passed: ${testCase.call} → ${output}` 
                    : `✗ Test failed: expected "${expected}", got "${output}"`
            };
        } catch (error) {
            return { 
                passed: false, 
                message: `Python runtime error: ${error.message}` 
            };
        }
    }
}

const compiler = new CompilerEngine();
document.addEventListener('DOMContentLoaded', async () => {
    await compiler.init();
});