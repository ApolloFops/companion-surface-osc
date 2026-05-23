## Generic OSC

This is a simple OSC module for using an OSC control surface like Open Stage Control to control
Companion.

#### OSC Protocol

I tried to mirror the native Companion OSC protocol for the most part for this.

**NOTE**: I haven't actually gotten page support working yet, so anywhere you see `<page>` here the
page you specify won't actually be used.

**Commands**:

- `/location/<page>/<row>/<column> <pressed>`<br>
  Presses or releases the button at `<page>/<row>/<column>` depending on the value of `<pressed>`.

- `/location/<page>/<row>/<column>/press`<br>
  Presses and releases the button at `<page>/<row>/<column>`.

**Feedback**:

- `/location/<page>/<row>/<column>/text <text>`<br>
  Returns the text on the button at `<page>/<row>/<column>`.

- `/location/<page>/<row>/<column>/color <color>`<br>
  Returns the color of the button at `<page>/<row>/<column>` as an RGB hex code, formatted as `#RRGGBB`.
