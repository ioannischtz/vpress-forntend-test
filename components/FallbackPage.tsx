import React from 'react';

interface FallbackPageProps {}

const FallbackPage: React.FC<FallbackPageProps> = ({}) => {
  return (
    <div className="fallback-loader-body">
      <div className="fallback-loader-section">
        <span className="loader-114">Load&nbsp;ng </span>
      </div>
    </div>
  );
};

export default FallbackPage;
