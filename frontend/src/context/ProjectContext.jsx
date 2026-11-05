import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [activeRoomImage, setActiveRoomImage] = useState('/assets/rooms/living_room.jpg');
  const [activeRoomType, setActiveRoomType] = useState('Living Room');
  const [activeTheme, setActiveTheme] = useState('Traditional Diwali');
  const [projectName, setProjectName] = useState('My Festive Living Room');
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [activePresetDecorations, setActivePresetDecorations] = useState(null);

  // Before & After comparison state
  const [beforeAfterData, setBeforeAfterData] = useState({
    originalImage: '/assets/rooms/living_room.jpg',
    transformedImage: '/assets/rooms/living_room.jpg',
    theme: 'Traditional Diwali',
    title: 'Modern Indian Living Room',
    decorationsCount: 4,
  });

  const selectRoom = (imageUrl, roomType = 'Living Room', name = '') => {
    setActiveRoomImage(imageUrl);
    setActiveRoomType(roomType);
    if (name) {
      setProjectName(`Diwali ${name}`);
    } else {
      setProjectName(`Diwali ${roomType}`);
    }
  };

  const applyTheme = (themeName, presetDecorations = null) => {
    setActiveTheme(themeName);
    if (presetDecorations) {
      setActivePresetDecorations(presetDecorations);
    }
  };

  const setComparisonResult = (data) => {
    setBeforeAfterData({
      originalImage: data.originalImage || activeRoomImage,
      transformedImage: data.transformedImage || activeRoomImage,
      theme: data.theme || activeTheme,
      title: data.title || projectName,
      decorationsCount: data.decorationsCount || 0,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        activeRoomImage,
        activeRoomType,
        activeTheme,
        projectName,
        currentProjectId,
        activePresetDecorations,
        beforeAfterData,
        selectRoom,
        applyTheme,
        setProjectName,
        setCurrentProjectId,
        setActivePresetDecorations,
        setComparisonResult,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
