const { default: axios } = require('axios');
const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');

app.commandLine.appendSwitch(
  'widevine-cdm-path',
  '/path/to/widevinecdmadapter.plugin',
);

app.commandLine.appendSwitch('widevine-cdm-version', '4.10.2391.0');

let tray = null;
let acessToken = null;

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, '/images/note.png'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '재생',
      click: async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/player/devices`,
          {
            headers: {
              Authorization: `Bearer ${acessToken}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const devicdId = response.data.devices[0].id;

        await axios.put(
          `https://api.spotify.com/v1/me/player`,
          {
            play: true,
            device_ids: [devicdId],
          },
          {
            headers: {
              Authorization: `Bearer ${acessToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
      },
    },
    {
      label: '정지',
      click: async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/player/devices`,
          {
            headers: {
              Authorization: `Bearer ${acessToken}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const devicdId = response.data.devices[0].id;

        await axios.put(
          `https://api.spotify.com/v1/me/player/pause?device_id=${devicdId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${acessToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
      },
    },
    {
      label: '랜덤',
      submenu: [
        {
          label: 'Happy',
          type: 'radio',
          click: async () => {
            const device = await axios.get(
              `https://api.spotify.com/v1/me/player/devices`,
              {
                headers: {
                  Authorization: `Bearer ${acessToken}`,
                  'Content-Type': 'application/json',
                },
              },
            );

            const devicdId = device.data.devices[0].id;

            const recommendation = await axios.get(
              `https://api.spotify.com/v1/recommendations?limit=1&market=KR&seed_genres=happy%2Cdance&min_valence=0.9`,
              {
                headers: {
                  Authorization: `Bearer ${acessToken}`,
                },
              },
            );

            const playTrackUri = recommendation.data.tracks[0].album.uri;

            await axios.put(
              `https://api.spotify.com/v1/me/player/play?device_id=${devicdId}`,
              {
                context_uri: playTrackUri,
                offset: {
                  position: 5,
                },
                position_ms: 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${acessToken}`,
                },
              },
            );
          },
        },
        {
          label: 'Sad',
          type: 'radio',
          click: async () => {
            const device = await axios.get(
              `https://api.spotify.com/v1/me/player/devices`,
              {
                headers: {
                  Authorization: `Bearer ${acessToken}`,
                  'Content-Type': 'application/json',
                },
              },
            );

            const devicdId = device.data.devices[0].id;

            const recommendation = await axios.get(
              `https://api.spotify.com/v1/recommendations?limit=1&market=KR&seed_genres=sad%2Cguitar&max_valence=0.2`,
              {
                headers: {
                  Authorization: `Bearer ${acessToken}`,
                },
              },
            );

            const playTrackUri = recommendation.data.tracks[0].album.uri;

            await axios.put(
              `https://api.spotify.com/v1/me/player/play?device_id=${devicdId}`,
              {
                context_uri: playTrackUri,
                offset: {
                  position: 5,
                },
                position_ms: 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${acessToken}`,
                },
              },
            );
          },
        },
        {
          label: 'Mood',
          type: 'radio',
          click: async () => {
            const device = await axios.get(
              `https://api.spotify.com/v1/me/player/devices`,
              {
                headers: {
                  Authorization: `Bearer ${acessToken}`,
                  'Content-Type': 'application/json',
                },
              },
            );

            const devicdId = device.data.devices[0].id;

            const recommendation = await axios.get(
              `https://api.spotify.com/v1/recommendations?limit=1&market=KR&seed_genres=groove&max_valence=0.7&min_valence=0.4`,
              {
                headers: {
                  Authorization: `Bearer ${acessToken}`,
                },
              },
            );

            const playTrackUri = recommendation.data.tracks[0].album.uri;

            await axios.put(
              `https://api.spotify.com/v1/me/player/play?device_id=${devicdId}`,
              {
                context_uri: playTrackUri,
                offset: {
                  position: 5,
                },
                position_ms: 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${acessToken}`,
                },
              },
            );
          },
        },
      ],
    },
    {
      label: '종료',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('Melory~♥︎');
  // tray.setPressedImage(path.join(__dirname, '/images/tray.png'));
  tray.setContextMenu(contextMenu);
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, '/iamges/icon.icns'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      plugins: true,
    },
    nodeIntegration: true,
  });

  mainWindow.webContents
    .executeJavaScript('localStorage.getItem("spotiAccesstoken");', true)
    .then((localStorage) => {
      acessToken = localStorage;
    });

  mainWindow.loadURL('https://gracious-euclid-c4ba43.netlify.app/');

  // if (process.env.mode === 'dev') {
  //   mainWindow.loadURL('http://localhost:3000');
  // } else {
  //   mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  //   mainWindow.loadFile(`${path.join(__dirname, '../build/index.html')}`);
  // }

  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on(
  'certificate-error',
  function (event, webContents, url, error, certificate, callback) {
    event.preventDefault();
    callback(true);
  },
);
