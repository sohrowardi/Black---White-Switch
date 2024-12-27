// This file manages the preferences for the Grayscale Windows GNOME Shell extension.
// It provides a user interface for users to configure settings related to the grayscale functionality.

const { Gio, GObject, Gtk } = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

var PreferencesWidget = GObject.registerClass(
    class PreferencesWidget extends Gtk.Box {
        _init() {
            super._init({ orientation: Gtk.Orientation.VERTICAL, spacing: 10 });

            this._createSettingsUI();
        }

        _createSettingsUI() {
            const label = new Gtk.Label({
                label: "Grayscale Settings",
                use_markup: true,
            });
            this.append(label);

            const toggleIndividual = new Gtk.CheckButton({
                label: "Enable Grayscale for Individual Windows",
            });
            toggleIndividual.set_active(this._getSetting("individual_grayscale"));
            toggleIndividual.connect("toggled", () => {
                this._setSetting("individual_grayscale", toggleIndividual.get_active());
            });
            this.append(toggleIndividual);

            const toggleGlobal = new Gtk.CheckButton({
                label: "Enable Global Grayscale",
            });
            toggleGlobal.set_active(this._getSetting("global_grayscale"));
            toggleGlobal.connect("toggled", () => {
                this._setSetting("global_grayscale", toggleGlobal.get_active());
            });
            this.append(toggleGlobal);

            const intensityLabel = new Gtk.Label({
                label: "Grayscale Intensity",
                use_markup: true,
            });
            this.append(intensityLabel);

            const intensityScale = new Gtk.Scale({
                orientation: Gtk.Orientation.HORIZONTAL,
                adjustment: new Gtk.Adjustment({
                    lower: 0,
                    upper: 100,
                    step_increment: 1,
                }),
            });
            intensityScale.set_value(this._getSetting("grayscale_intensity"));
            intensityScale.connect("value-changed", () => {
                this._setSetting("grayscale_intensity", intensityScale.get_value());
            });
            this.append(intensityScale);
        }

        _getSetting(key) {
            const settings = new Gio.Settings({ schema_id: Me.metadata["settings-schema"] });
            return settings.get_boolean(key);
        }

        _setSetting(key, value) {
            const settings = new Gio.Settings({ schema_id: Me.metadata["settings-schema"] });
            settings.set_boolean(key, value);
        }
    }
);

function buildPrefsWidget() {
    return new PreferencesWidget();
}