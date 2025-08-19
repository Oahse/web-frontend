// src/GoogleDrive.js
import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '759233275334-uv15njtarc659456f98d0ip3v9mdia13.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAHQS4C4_ynLv1gX1GI4EVL7k-t8IlIQIg';
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

export default function GoogleDrive() {
  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISCOVERY_DOC],
          scope: SCOPES,
        })
        .then(() => {
          console.log("GAPI client initialized.");
        });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      listDriveFiles();
    });
  };

  const listDriveFiles = () => {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: 'files(id, name, mimeType)',
      })
      .then((response) => {
        console.log('Drive Files:', response.result.files);
      });
  };

  return (
    <div>
      <h2>Google Drive API</h2>
      <button onClick={handleSignIn}>Sign In & List Files</button>
    </div>
  );
}
