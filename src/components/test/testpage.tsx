// testpage.tsx

import React from 'react';

interface TestPageProps {
    pagenumber: number;
}

const TestPage = ({ pagenumber }: TestPageProps) => {
    return (
        <div>
            <h1>Test Page {pagenumber}</h1>
        </div>
    );
}

export default TestPage;