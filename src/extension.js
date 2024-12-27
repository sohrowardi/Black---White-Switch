// This file contains the main logic for the GNOME Shell extension.
// It initializes the extension, sets up the necessary event listeners,
// and implements the functionality to toggle grayscale for individual
// windows or the entire workspace.

const { St, Clutter } = imports.gi;
const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;

let globalGrayscale = false;
let activeWindowGrayscale = false;

function toggleGlobalGrayscale() {
    globalGrayscale = !globalGrayscale;
    applyGrayscaleToAllWindows(globalGrayscale);
}

function toggleActiveWindowGrayscale() {
    let activeWindow = global.display.get_active_window();
    if (activeWindow) {
        activeWindowGrayscale = !activeWindowGrayscale;
        applyGrayscaleToWindow(activeWindow, activeWindowGrayscale);
    }
}

function applyGrayscaleToAllWindows(enable) {
    let windows = global.get_window_actors();
    for (let window of windows) {
        applyGrayscaleToWindow(window.meta_window, enable);
    }
}

function applyGrayscaleToWindow(window, enable) {
    if (enable) {
        window.set_filter('grayscale', true);
    } else {
        window.set_filter('grayscale', false);
    }
}

function init() {
    // Initialization logic here
}

function enable() {
    Main.wm.addKeybinding('toggle-active-window-grayscale', 
        new Gio.Settings({ schema_id: 'org.gnome.shell.extensions.grayscale' }), 
        Meta.KeyBindingFlags.NONE, 
        Shell.ActionMode.NORMAL, 
        toggleActiveWindowGrayscale);
    
    Main.wm.addKeybinding('toggle-global-grayscale', 
        new Gio.Settings({ schema_id: 'org.gnome.shell.extensions.grayscale' }), 
        Meta.KeyBindingFlags.NONE, 
        Shell.ActionMode.NORMAL, 
        toggleGlobalGrayscale);
}

function disable() {
    Main.wm.removeKeybinding('toggle-active-window-grayscale');
    Main.wm.removeKeybinding('toggle-global-grayscale');
}