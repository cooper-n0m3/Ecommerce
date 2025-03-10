import React from 'react';
import LineChartVisitor from '../../../components/common/charts/visitorPieChart';

const Visitor = () => {
    return (
        <>
            <div className="p-2 bg-gray-800 mt-3 border border-gray-500 rounded-md">
                <LineChartVisitor/>
            </div>
        </>
    );
}

export default Visitor;
