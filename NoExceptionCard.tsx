import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface ExceptionCardProps {
  count: number;
}

const ExceptionCard: React.FC<ExceptionCardProps> = ({ count }) => {
  return (
    <div className="bg-white rounded-lg p-4 relative w-64" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', marginTop: '-5px', marginLeft: '140px', height: 'fit-content', transform: 'scale(1.2)' }}>
      <div className="flex items-center">
        <FaCheck className="text-green-600 mr-2" style={{ fontSize: '24px' }} />
        <p className="text-xl font-semibold text-green-600">{count}</p>
      </div>
      <h2 className="text-xs font-semibold text-gray-800 mt-2">Ei poikkeuksia</h2>
      <div className="">
        <div className="absolute right-6 top-0 flex flex-col items-end w-6 h-6 bg-green-500" style={{ opacity: 1 }}></div>
        <div className="absolute right-0 top-6 flex flex-col items-end w-6 h-6 bg-green-500" style={{ opacity: 0.75 }}></div>
        <div className="absolute right-6 top-12 flex flex-col items-end w-6 h-6 bg-green-500" style={{ opacity: 0.5 }}></div>
      </div>
    </div>
  );
};

export default ExceptionCard;
