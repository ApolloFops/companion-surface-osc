## Generic OSC

This is a simple OSC module for using an OSC control surface like Open Stage Control to control
Companion.

#### OSC Protocol

I tried to mirror the native Companion OSC protocol for the most part for this.

**Commands**:

- `/location/<row>/<column> <pressed>`<br>
  Presses or releases the button at `<row>/<column>` depending on the value of `<pressed>`.

- `/location/<row>/<column>/press`<br>
  Presses and releases the button at `<row>/<column>`.

**Feedback**:

- `/location/<row>/<column>/text <text>`<br>
  Returns the text on the button at `<row>/<column>`.

- `/location/<row>/<column>/color <color>`<br>
  Returns the color of the button at `<row>/<column>` as an RGB hex code, formatted as `#RRGGBB`.
