import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Store.css';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const defaultCenter = {
  lat: 21.028511,
  lng: 105.804817,
};

function Store() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [showMapAndList, setShowMapAndList] = useState(false);

  useEffect(() => {
    fetch('../server/db.json')
      .then((response) => response.json())
      .then((data) => {
        setStores(data.stores);
        setFilteredStores(data.stores);
      })
      .catch((error) => console.error('Error loading stores:', error));
  }, []);

  useEffect(() => {
    const filtered = stores.filter((store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredStores(filtered);
    setShowMapAndList(searchQuery.length > 0);
  }, [searchQuery, stores]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStoreClick = (store) => {
    setMapCenter(store.location);
  };

  return (
    <LoadScript url="https://www.bing.com/maps/traffic?setlang=vi-vn&FORM=ntptra&cp=20.960959%7E105.75182&lvl=13.0&cvid=a28b8fb8665c4e35b82a5c8432813768&ocid=widgetonlockscreen&ei=10">
      <div className="store-search-container">
        <div className="search-input-container">
          <label htmlFor="store-search">Địa chỉ</label>
          <input
            id="store-search"
            type="text"
            placeholder="Nhập số nhà, đường"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {showMapAndList && (
          <div className="store-map">
            <div className="results-info">
              {filteredStores.length > 0 ? (
                <p>
                  Tìm thấy <strong>{filteredStores.length}</strong> cửa hàng gần nơi bạn ở:
                </p>
              ) : (
                <p>Không tìm thấy cửa hàng nào.</p>
              )}
            </div>

            <div className="map-and-list">
              <div className="map-container">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapCenter}
                  zoom={14}
                >
                  {filteredStores.map((store) => (
                    <Marker
                      key={store.name}
                      position={store.location}
                      title={store.name}
                    />
                  ))}
                </GoogleMap>
              </div>

              <div className="list-container">
                <ul className="store-list">
                  {filteredStores.map((store, index) => (
                    <li key={index} className="store-item">
                      <div className="store-info">
                        <strong className="store-name">{store.name}</strong>
                        <div className="store-hours">
                          Giờ mở cửa: {store.openingHours} - Giờ đóng cửa: {store.closingHours}
                        </div>
                        <div className="store-address">{store.address}</div>
                      </div>
                      <button className="see-more" onClick={() => handleStoreClick(store)}>
                        Xem thêm
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
}

export default Store;