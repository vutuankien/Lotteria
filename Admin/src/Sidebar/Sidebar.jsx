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
          to="/orders"
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: activeLink === '/orders' ? 'rgb(233, 179, 179)' : 'white'
          }}
          onClick={() => handleLinkClick('/orders')}
        >
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '30px',
              height: '30px'
            }}>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path clip-rule="evenodd" d="M1.82047 1C1.36734 1 1 1.35728 1 1.79801V2.39948C1 2.84021 1.36734 3.19749 1.82047 3.19749H3.72716C4.03867 3.19749 4.3233 3.36906 4.46192 3.64038L5.4947 5.93251C5.53326 6.00798 5.56364 6.09443 5.62081 6.15194L10.057 16.4429C10.0129 16.4634 9.97056 16.4883 9.93075 16.5176C8.70163 17.4226 7.87009 18.5878 7.87001 19.7604C7.86996 20.4429 8.16289 21.0807 8.75002 21.5212C9.30752 21.9394 10.0364 22.1118 10.8189 22.1118H10.8446C10.336 22.6308 10.0238 23.3336 10.0238 24.1072C10.0238 25.7049 11.3554 27 12.998 27C14.6406 27 15.9722 25.7049 15.9722 24.1072C15.9722 23.3336 15.66 22.6308 15.1513 22.1118H19.0494C18.5408 22.6308 18.2285 23.3336 18.2285 24.1072C18.2285 25.7049 19.5601 27 21.2027 27C22.8454 27 24.177 25.7049 24.177 24.1072C24.177 23.3336 23.8647 22.6308 23.3561 22.1118H23.9718C24.425 22.1118 24.7923 21.7545 24.7923 21.3138V20.9148C24.7923 20.474 24.425 20.1167 23.9718 20.1167H10.8189C10.3192 20.1167 10.0864 20.0041 10.0028 19.9414C9.94878 19.9009 9.92119 19.8618 9.9212 19.7606C9.92122 19.4917 10.1711 18.8708 11.069 18.1827C11.1084 18.1524 11.1453 18.1194 11.1792 18.084C11.2692 18.1089 11.3635 18.1221 11.4601 18.1221H23.9235C24.4248 18.1221 24.8527 17.7696 24.9351 17.2885L26.9858 5.31837C27.09 4.71036 26.6079 4.1569 25.9742 4.1569H7.35431C7.1981 4.1569 7.05618 4.06597 6.9909 3.92405L5.84968 1.44289C5.71106 1.17157 5.42642 1 5.11492 1H1.82047ZM8.47667 6.15194C8.18952 6.15194 7.99591 6.44552 8.10899 6.70946L12.04 15.8846C12.103 16.0317 12.2476 16.1271 12.4076 16.1271H22.7173C22.9122 16.1271 23.0787 15.9867 23.1116 15.7946L24.6834 6.61948C24.7253 6.37513 24.5371 6.15194 24.2892 6.15194H8.47667ZM11.8698 24.1072C11.8698 23.5012 12.3749 23.0099 12.998 23.0099C13.621 23.0099 14.1261 23.5012 14.1261 24.1072C14.1261 24.7132 13.621 25.2045 12.998 25.2045C12.3749 25.2045 11.8698 24.7132 11.8698 24.1072ZM21.2027 23.0099C20.5797 23.0099 20.0746 23.5012 20.0746 24.1072C20.0746 24.7132 20.5797 25.2045 21.2027 25.2045C21.8258 25.2045 22.3309 24.7132 22.3309 24.1072C22.3309 23.5012 21.8258 23.0099 21.2027 23.0099Z" fill="#000000" fill-rule="evenodd"></path></g></svg>
          <span className="d-block">Orders</span>
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
          className={`chat border border-gray-300 rounded-left px-3 py-2 mb-2 no-border-right`}
          to="/chat"
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: activeLink === '/chat' ? 'rgb(233, 179, 179)' : 'white'
          }}
          onClick={() => handleLinkClick('/chat')}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '30px',
              height: '30px'
            }}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
                stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
              <path d="M8 12H8.009M11.991 12H12M15.991 12H16"
                stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>

          <span className="d-block">Chat</span>
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
