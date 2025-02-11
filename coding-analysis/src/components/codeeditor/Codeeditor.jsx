// src/Codeeditor.js
import React, { useState } from 'react';
import './Codeeditor.css';

function Codeeditor() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const compileCode = async () => {
        try {
            const response = await fetch('http://localhost:3300/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, language }),
            });

            const data = await response.json();
            if (response.ok) {
                setOutput(data.output);
                setError('');
            } else {
                setError(data.message);
                setOutput('');
            }
        } catch (err) {
            setError('Network error or server not responding');
        }
    };

    return (
        <div className="code-editor-container">
            <h1 className='online-compiler'>Online Compiler</h1>
            <button className="button-pratice"onClick={compileCode}>Compile</button>
            <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
            </select>
            <textarea
                value={code}
                className='textarea-codeeditor'
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here..."
                rows={10}
                cols={50}
                spellCheck="false"
            />
            <h3 className='label-output'>Output:</h3>
            {error ? (
                <pre className="error">{error}</pre>
            ) : (
                <pre className="output">{output}</pre>
            )}
        </div>
    );
}

export default Codeeditor;
