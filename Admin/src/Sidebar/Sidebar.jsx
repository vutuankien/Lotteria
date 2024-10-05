import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // State để lưu thẻ được chọn
  const [activeLink, setActiveLink] = useState(null);
  // Hàm xử lý khi click vào Link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="col-5 col-sm-5 col-md-3 col-lg-2 border-right pr-0">
      <div className="d-flex flex-column align-items-start pt-4 pl-4 pb-4 pr-0">
        <Link
          className={`add border border-gray-300 rounded-left px-3 py-2 mb-2`}
          to="/admin"
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: activeLink === '/admin' ? 'rgb(233, 179, 179)' : 'white'
          }}
          onClick={() => handleLinkClick('/admin')}
        >
          <svg fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" style={{
            width: '30px',
            height: '30px'
          }}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M833.935 1063.327c28.913 170.315 64.038 348.198 83.464 384.79 27.557 51.84 92.047 71.944 144 44.387 51.84-27.558 71.717-92.273 44.16-144.113-19.426-36.593-146.937-165.46-271.624-285.064Zm-43.821-196.405c61.553 56.923 370.899 344.81 415.285 428.612 56.696 106.842 15.811 239.887-91.144 296.697-32.64 17.28-67.765 25.411-102.325 25.411-78.72 0-154.955-42.353-194.371-116.555-44.386-83.802-109.102-501.346-121.638-584.245-3.501-23.717 8.245-47.21 29.365-58.277 21.346-11.294 47.096-8.02 64.828 8.357ZM960.045 281.99c529.355 0 960 430.757 960 960 0 77.139-8.922 153.148-26.654 225.882l-10.39 43.144h-524.386v-112.942h434.258c9.487-50.71 14.231-103.115 14.231-156.084 0-467.125-380.047-847.06-847.059-847.06-467.125 0-847.059 379.935-847.059 847.06 0 52.97 4.744 105.374 14.118 156.084h487.454v112.942H36.977l-10.39-43.144C8.966 1395.137.044 1319.128.044 1241.99c0-529.243 430.645-960 960-960Zm542.547 390.686 79.85 79.85-112.716 112.715-79.85-79.85 112.716-112.715Zm-1085.184 0L530.123 785.39l-79.85 79.85L337.56 752.524l79.849-79.85Zm599.063-201.363v159.473H903.529V471.312h112.942Z" fill-rule="evenodd"></path> </g></svg>
          <span className="d-block">Dashboard</span>
        </Link>
        <Link
          className={`add border border-gray-300 rounded-left px-3 py-2 mb-2`}
          to="/add"
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: activeLink === '/add' ? 'rgb(233, 179, 179)' : 'white'
          }}
          onClick={() => handleLinkClick('/add')}
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI5SURBVHgBtZZbS5RRFIZfzaKgIDrQUAbaiamgA3S6ncv6DXXRrwjGoAuDsh/RTXZRPyAJSu/0QlEQL2QuxtHxjEcURhTB93WtTx3Rz/3N4YVnDvvb31p7r31YqwFhaiYZ0kpaSMrbl0me5MhfMo8qdZ/8csPbZJz8Iz+d/6RAtsgG+e3vJNZ58pmskWnSQR6S00f0bfJnX8kiWfd3LyBQCl8/bEZt5BLCpYFmyQrpdVsnOtOaTJKnqFwvYOEfQ4xTja7POz5C9XpMimQEx4RXcVconqN2UpS23XaZtLO02FnUXlm3nT7YqO28AAtriFLYP4sn6RSZch+7ugo7Qx0IVxf5k6D/N9hyNTfy4zXsLP1IYOAsOZegfyds42Tk8C5syjnUT6Puo1UOb8POyybqp0330aJQXiSzMZ21Ob6jPIRP/LvnQFuJvCdzx9iRj1Sj/2lA9Qqy0eQjuhXTRyN7c6gtmlkG4VKkipqhYqs8dwb1k2xrUvnI4Q1UmMcCpVvmOsnJocKjvPcugYGSE6q3sJ3aFTXo2lGivRxo4JoTIl1tS7DKYU+asmb5CbVXm9tOH36gFKJU8gy100uyStqPeqhMMUBmUF22j6QEXCBDiMlCN2ElxgR5hcqlARfdVlBdMwgLxUfYoodKu/4DbGmGEeAskkKguGuxVfp9QXyZ+MD7FP2ddoQn8zJpZ+nIlHzUBVgh3Onoty4OFcKr3jcdZzD00r4Cu0/vkTuwDKN3dc/m3Wk3rLyM1Q7IrnrJFjF9QAAAAABJRU5ErkJggg=="
            alt="Add"
          />
          <span className="d-block">Add Items</span>
        </Link>

        <Link
          className="border border-gray-300 rounded-left px-3 py-2 mb-2"
          to="/list"
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: activeLink === '/list' ? 'rgb(233, 179, 179)' : 'white'
          }}
          onClick={() => handleLinkClick('/list')}
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEPSURBVHgB1ZaNDYIwEIWfhgEYoW7gCk7gCo7gBnQDR3AFnQA3kA3ACXADvJMDmyjaUo7EL3mQ8HMfR5umQIuh5JSa0kwYrneU+lg4Ij7fKQWmw0gqygZi5q/IoEMm9XPujFvljlbQgx1YUlK0bWrCQ5MuMSOJnNdox04LwwceswYz0XV2oeygx4myTpwLN+jBsx2zTpC/le0ph18PPZcSxGGlTjlwP5f70TLriAwiZKkkRuQtK78Usp4ib1k2UNDCX+Qt+yS0CBMFyVxhPUIULHOFoaJRMmY7QtTLksCXzoiAlytekQ10MeLp/6eFDlbqH7t94xXtSlF0XzARXJO3HBVk3wi8NqqNQnLoD9M7D/ctiPZPx1n1AAAAAElFTkSuQmCC"
            alt="List"
          />
          <span className="d-block">List Items</span>
        </Link>

        <Link
          className="border border-gray-300 rounded-left px-3 py-2 mb-2"
          to="/bills"
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: activeLink === '/bills' ? 'rgb(233, 179, 179)' : 'white'
          }}
          onClick={() => handleLinkClick('/bills')}
        >
          <svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 513.164 513.164" xml:space="preserve"
          style={{
            width: '30px',
            height: '30px'
          }}>
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> <g> <g> <circle cx="118.083" cy="244.945" r="11.636"></circle> </g> </g> <g> <g> 
            <path d="M472.992,1.745c-3.491-2.327-8.146-2.327-11.636,0l-29.091,19.782L404.337,2.909c-3.491-2.327-9.309-2.327-12.8,0 l-29.091,18.618L334.519,2.909c-3.491-2.327-9.309-2.327-12.8,0l-29.091,18.618L264.701,2.909c-3.491-2.327-9.309-2.327-12.8,0 L222.81,21.527L194.883,2.909c-3.491-2.327-9.309-2.327-12.8,0l-29.091,18.618L125.064,2.909c-3.491-2.327-9.309-2.327-12.8,0 L83.174,21.527L55.246,2.909c-3.491-2.327-8.145-2.327-11.636,0c-4.655,1.164-6.982,4.655-6.982,9.309v488.727 c0,4.655,2.327,8.145,5.818,10.473c3.491,2.327,8.145,2.327,11.636,0l29.091-19.782l27.927,18.618c3.491,2.327,9.309,2.327,12.8,0 l27.927-18.618l27.927,18.618c3.491,2.327,9.309,2.327,12.8,0l27.927-18.618l27.927,18.618c3.491,2.327,9.309,2.327,12.8,0 l27.927-18.618l27.927,18.618c3.491,2.327,9.309,2.327,12.8,0l27.927-18.618l27.927,18.618c3.491,2.327,9.309,2.327,12.8,0 l27.927-18.618l27.927,18.618c2.327,1.164,4.655,2.327,6.982,2.327c2.327,0,3.491,0,5.818-1.164 c3.491-2.327,5.818-5.818,5.818-10.473V12.218C478.81,7.564,476.483,4.073,472.992,1.745z M439.246,467.2 c-3.491-2.327-9.309-2.327-12.8,0l-29.091,19.782l-27.927-18.618c-2.327-1.164-4.655-2.327-6.982-2.327s-4.655,1.164-6.982,2.327 l-27.927,18.618l-27.927-18.618c-3.491-2.327-9.309-2.327-12.8,0l-29.091,18.618l-27.927-18.618c-3.491-2.327-9.309-2.327-12.8,0 l-29.091,18.618l-27.927-18.618c-3.491-2.327-9.309-2.327-12.8,0l-29.091,18.618l-27.927-18.618c-3.491-2.327-9.309-2.327-12.8,0 L61.064,480V34.327l16.291,11.636c3.491,2.327,9.309,2.327,12.8,0l27.927-19.782L146.01,44.8c3.491,2.327,9.309,2.327,12.8,0 l29.091-18.618L215.828,44.8c3.491,2.327,9.309,2.327,12.8,0l29.091-18.618L285.646,44.8c3.491,2.327,9.309,2.327,12.8,0 l29.091-18.618L355.464,44.8c3.491,2.327,9.309,2.327,12.8,0l29.091-18.618L425.283,44.8c3.491,2.327,9.309,2.327,12.8,0 l16.291-11.636v444.842L439.246,467.2z"></path> </g> </g> <g> <g> <path d="M374.083,303.127H350.81c-6.982,0-11.636-4.655-11.636-11.636s4.655-11.636,11.636-11.636h34.909 c6.982,0,11.636-4.655,11.636-11.636s-4.655-11.636-11.636-11.636h-11.636v-11.636c0-6.982-4.655-11.636-11.636-11.636 s-11.636,4.655-11.636,11.636v11.636c-19.782,0-34.909,15.127-34.909,34.909c0,19.782,15.127,34.909,34.909,34.909h23.273 c6.982,0,11.636,4.655,11.636,11.636c0,6.982-4.655,11.636-11.636,11.636h-34.909c-6.982,0-11.636,4.655-11.636,11.636 s4.655,11.636,11.636,11.636h11.636v11.636c0,6.982,4.655,11.636,11.636,11.636s11.636-4.655,11.636-11.636v-11.636 c19.782,0,34.909-15.127,34.909-34.909C408.992,318.255,393.864,303.127,374.083,303.127z"></path> </g> </g> <g> <g> <path d="M350.81,105.309H164.628c-6.982,0-11.636,4.655-11.636,11.636s4.655,11.636,11.636,11.636H350.81 c6.982,0,11.636-4.655,11.636-11.636S357.792,105.309,350.81,105.309z"></path> </g> </g> <g> <g> <path d="M304.264,151.855h-93.091c-6.982,0-11.636,4.655-11.636,11.636c0,6.982,4.655,11.636,11.636,11.636h93.091 c6.982,0,11.636-4.655,11.636-11.636C315.901,156.509,311.246,151.855,304.264,151.855z"></path> </g> </g> <g> <g> <path d="M222.81,233.309h-58.182c-6.982,0-11.636,4.655-11.636,11.636s4.655,11.636,11.636,11.636h58.182 c6.982,0,11.636-4.655,11.636-11.636S229.792,233.309,222.81,233.309z"></path> </g> </g> <g> <g> <circle cx="118.083" cy="291.491" r="11.636"></circle> </g> </g> <g> <g> <path d="M234.446,279.855h-69.818c-6.982,0-11.636,4.655-11.636,11.636s4.655,11.636,11.636,11.636h69.818 c6.982,0,11.636-4.655,11.636-11.636S241.428,279.855,234.446,279.855z"></path> </g> </g> <g> <g> <circle cx="118.083" cy="338.036" r="11.636"></circle> </g> </g> <g> <g> <path d="M211.174,326.4h-46.545c-6.982,0-11.636,4.655-11.636,11.636c0,6.982,4.655,11.636,11.636,11.636h46.545 c6.982,0,11.636-4.655,11.636-11.636C222.81,331.055,218.155,326.4,211.174,326.4z"></path> </g> </g> <g> <g> <circle cx="118.083" cy="384.582" r="11.636"></circle> </g> </g> <g> <g> <path d="M257.719,372.945h-93.091c-6.982,0-11.636,4.655-11.636,11.636s4.655,11.636,11.636,11.636h93.091 c6.982,0,11.636-4.655,11.636-11.636S264.701,372.945,257.719,372.945z"></path> </g> </g> </g></svg>
          <span className="d-block">Bills</span>
        </Link>

        <Link
          className={`customers border border-gray-300 rounded-left px-3 py-2 mb-2 no-border-right`}
          to="/customers"
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: activeLink === '/customers' ? 'rgb(233, 179, 179)' : 'white'
          }}
          onClick={() => handleLinkClick('/customers')}
        >
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#000000" fill="none"
            style={{
              width: '30px',
              height: '30px'
            }}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <circle cx="31.89" cy="22.71" r="5.57"></circle>
              <path d="M43.16,43.74A11.28,11.28,0,0,0,31.89,32.47h0A11.27,11.27,0,0,0,20.62,43.74Z"></path>
              <circle cx="48.46" cy="22.71" r="5.57"></circle>
              <path d="M46.87,43.74H59.73A11.27,11.27,0,0,0,48.46,32.47h0a11.24,11.24,0,0,0-5.29,1.32"></path>
              <circle cx="15.54" cy="22.71" r="5.57"></circle>
              <path d="M17.13,43.74H4.27A11.27,11.27,0,0,1,15.54,32.47h0a11.24,11.24,0,0,1,5.29,1.32"></path>
            </g>
          </svg>

          <span className="d-block">Customers</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
