import React, { createContext, useState, useContext } from 'react';

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('Bulandshahr');
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const availableCities = [
    { name: 'Bulandshahr', state: 'Uttar Pradesh', popularAreas: ['Civil Lines', 'Yamunapuram', 'DM Colony', 'Awas Vikas'] },
    { name: 'Noida', state: 'Uttar Pradesh', popularAreas: ['Sector 18', 'Sector 62', 'Sector 137'] },
    { name: 'Delhi NCR', state: 'Delhi', popularAreas: ['Connaught Place', 'Okhla', 'Lajpat Nagar'] },
    { name: 'Lucknow', state: 'Uttar Pradesh', popularAreas: ['Hazratganj', 'Gomti Nagar', 'Alambagh'] }
  ];

  const changeCity = (cityName) => {
    const found = availableCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (found) {
      setSelectedCity(found.name);
      setSelectedState(found.state);
    } else {
      setSelectedCity(cityName);
    }
    setIsCityModalOpen(false);
  };

  return (
    <CityContext.Provider value={{
      selectedCity,
      selectedState,
      availableCities,
      changeCity,
      isCityModalOpen,
      setIsCityModalOpen
    }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
