import React from 'react';
import './overwatch.scss';

const Loading = () => (
  <div>
    <div className="loader" style={{ top: '350px' }}>
      <ul className="hexagon-container">
        <li className="hexagon hex_1">
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="#ffffff" d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
          </svg>
        </li>
        <li className="hexagon hex_2" />
        <li className="hexagon hex_3" />
        <li className="hexagon hex_4">
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="#ffffff" d="M17.05,14.22L19.88,17.05L22,14.93V22H14.93L17.05,19.88L14.22,17.05L17.05,14.22M12.33,18H12C7.58,18 4,16.21 4,14V17C4,19.21 7.58,21 12,21C12.39,21 12.77,21 13.14,21L14.22,19.92L12.33,18M17.54,11.89L19.29,13.64C19.73,13.21 20,12.62 20,12V9C20,10.13 19.06,11.16 17.54,11.88V11.89M4,9V12C4,14.21 7.58,16 12,16H12.45L16,12.47C14.7,12.83 13.35,13 12,13C7.58,13 4,11.21 4,9M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3Z" />
          </svg>
        </li>
        <li className="hexagon hex_5" />
        <li className="hexagon hex_6" />
        <li className="hexagon hex_7" />
      </ul>
      <p className="advice">Wait a moment please...</p>
    </div>

  </div>

);

export default Loading;
