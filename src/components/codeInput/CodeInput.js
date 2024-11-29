import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeInput = ({ code }) => {
    return (
        <div className="codeInput">
            <SyntaxHighlighter
                language="javascript"
                wrapLines={true}
                style={oneDark}
                wrapLongLines={true} // Оборачиваем длинные строки
                codeTagProps={{ style: { fontSize: '14px', whiteSpace: 'pre-wrap' } }} // Сохраняем пробелы
            >
                {code || '// Ваш код появится здесь...'}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeInput;
