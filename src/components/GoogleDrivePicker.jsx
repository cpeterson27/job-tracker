import React, { useEffect, useState, useRef } from "react";
import { FaGoogleDrive } from "react-icons/fa";

const GoogleDrivePicker = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false); // New state for GIS
  const pickerRef = useRef();

  // Use a ref to store the auth client, if needed for future interactions
  const tokenClient = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load("client", () => { // Load 'client' library first
        window.gapi.load("picker", () => {
          setGapiLoaded(true);
          console.log("Google Picker API loaded.");
        });
      });
    };
    document.body.appendChild(script);

    // Load Google Identity Services (GIS) for modern auth
    const gisScript = document.createElement("script");
    gisScript.src = "https://accounts.google.com/gsi/client";
    gisScript.onload = () => {
      setGisLoaded(true);
      console.log("Google Identity Services loaded.");
    };
    document.body.appendChild(gisScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(gisScript);
    };
  }, []);

  useEffect(() => {
    // Initialize auth only when both gapi and gis are loaded
    if (gapiLoaded && gisLoaded) {
      const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
      const scope = "https://www.googleapis.com/auth/drive.readonly";

      // Initialize the new Google Identity Services client
      tokenClient.current = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scope,
        callback: (tokenResponse) => {
          if (tokenResponse.error) {
            console.error("Token client error:", tokenResponse.error);
            return;
          }
          // Store the access token for use with Picker
          // This is a more modern way to get the token than gapi.auth.authorize
          createPicker(tokenResponse.access_token, import.meta.env.VITE_APP_GOOGLE_APP_ID);
        },
      });
      console.log("Google Identity Services Token Client initialized.");
    }
  }, [gapiLoaded, gisLoaded]); // Re-run when gapiLoaded or gisLoaded changes

  const openPicker = () => {
    if (!gapiLoaded || !gisLoaded || !tokenClient.current) {
      console.warn("GAPI or GIS not loaded, or token client not initialized.");
      return;
    }

    // Request a new token using the initialized client
    tokenClient.current.requestAccessToken();
  };

  const createPicker = (token, appId) => {
    const view = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS)
      .setIncludeFolders(true)
      .setSelectFolderEnabled(false);

    const picker = new window.google.picker.PickerBuilder()
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .setAppId(appId)
      .setOAuthToken(token)
      .addView(view)
      .setCallback((data) => {
        if (data.action === window.google.picker.Action.PICKED) {
          onFilesSelected(data.docs);
        }
      })
      // IMPORTANT: Explicitly set the origin to avoid issues, and remove trailing slash
      .setOrigin(window.location.origin.replace(/\/$/, ""))
      .build();

    picker.setVisible(true);
  };

  // ... (rest of your component code for drag & drop and rendering)
  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const baseClasses =
    "w-full h-44 p-4 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer transition";
  const hoverClasses = "hover:bg-blue-50 hover:border-2 hover:border-blue-400";
  const dragClasses = "bg-blue-50 border-2 border-blue-400";

  return (
    <div
      ref={pickerRef}
      className={`${baseClasses} ${isDragging ? dragClasses : "bg-white border border-gray-200"} ${hoverClasses}`}
      onClick={openPicker}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <FaGoogleDrive className="text-blue-600 text-5xl mb-2" />
      <span className="font-semibold text-center mb-1">Upload from Google Drive</span>
      <span className="text-gray-400 text-sm text-center">Click or drag files here</span>
    </div>
  );
};

export default GoogleDrivePicker;














