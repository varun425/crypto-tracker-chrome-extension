# Project Setup and Deployment Guide

## Installing Dependencies
Run the following command to install project dependencies:

```bash
npm i
```

To force installation despite potential issues, use:

```bash
npm i --force
```

## Running the Project Locally
To start the project on your local environment, execute:

```bash
npm start
```

This will host the application locally for testing and development.

## Building the Project
To create a production build, use:

```bash
npm run build
```

This will generate optimized files in the `build` directory.

### Chrome Extension Setup
To deploy this project as a Chrome extension, follow these steps:

1. Run the build command:
   ```bash
   npm run build
   ```
2. Locate the `background.js` and `content.js` files within the `build` folder. Copy or move them as needed to ensure they are included in the build.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" (toggle located at the top-right corner of the page).
5. Click "Load unpacked" and select the `build` directory of this project.
6. The extension should now be uploaded and ready for use.

## Notes
- Ensure all required scripts for the extension are appropriately referenced in the `manifest.json`.
- Test the extension thoroughly before publishing it to avoid user issues.
- For additional debugging, use Chrome's Developer Tools (`F12`) on the extensions page.

## Additional Commands
- To clean and remove temporary files:
  ```bash
  npm run clean
  ```

