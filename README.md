# Domain Switcher Chrome Extension

A Chrome extension that allows you to quickly switch between different domains while preserving the current path, query parameters, and hash.

## Features

- **Domain Switching**: Replace the domain of the current URL while keeping the same path and parameters
- **Save Domains**: Save frequently used domains for quick access 
- **Simple Interface**: Clean and intuitive user interface
- **Cross-device Sync**: Saved domains sync across devices where you're signed into Chrome

## How It Works

This extension makes it easy to navigate between different environments (development, testing, production) or simply switch between different domains while staying on the same page path.

For example, if you're on `https://www.example.com/products?id=123` and switch to `newdomain.com`, you'll be taken to `https://newdomain.com/products?id=123`. You can also switch to local development environments by entering domains with ports like `localhost:3000`.

## Installation

Since this extension is not published on the Chrome Web Store, you need to install it in developer mode. Follow these steps:

1. **Download/Clone the Repository**
   - Download this repository or clone it using Git
   - Extract the files if needed

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/` in the address bar
   - Or go to Menu (three dots) > More Tools > Extensions

3. **Enable Developer Mode**
   - Toggle on "Developer mode" in the top right corner of the extensions page

4. **Load the Extension**
   - Click "Load unpacked" button that appears after enabling developer mode
   - Browse to the folder containing the extension files (where manifest.json is located)
   - Select the folder and click "Open"

5. **Verify Installation**
   - The Domain Switcher extension should now appear in your extensions list
   - You should see the extension icon in your Chrome toolbar (if not, click the puzzle piece icon and pin the extension)

## Usage

1. **Basic Domain Switching**
   - Click on the extension icon in your toolbar
   - Enter the new domain in the input field (e.g., "example.com" or "localhost:3000")
   - Press Enter to switch to that domain while keeping the same path

2. **Saving Domains for Quick Access**
   - Enter a domain in the input field and click the save button (💾)
   - Or click the save button without entering a domain to save the current tab's domain
   - Your saved domains will appear in the list below

3. **Using Saved Domains**
   - Click on any domain in the saved list to switch to that domain
   - The current path and parameters will be preserved

4. **Removing Saved Domains**
   - Click the "✕" next to any saved domain to remove it from your list

## Contributing

Feel free to submit issues or pull requests to improve this extension.

## License

MIT License
