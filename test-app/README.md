# Test App - Android Emulator Setup

## Prerequisites

- [Android SDK](https://developer.android.com/studio) installed (default: `~/Library/Android/sdk`)
- At least one AVD created (e.g. via Android Studio > Device Manager)

## Running Multiple Android Emulators

### List available AVDs

```bash
$HOME/Library/Android/sdk/emulator/emulator -list-avds
```

### Launch a single emulator

```bash
$HOME/Library/Android/sdk/emulator/emulator -avd <AVD_NAME> -no-snapshot
```

### Launch multiple emulators simultaneously

The key flags are:
- `-read-only` — allows multiple instances of the same AVD
- `-no-snapshot` — starts fresh each time
- `-port <PORT>` — assigns a unique port per instance (must be even numbers)

**Step 1: Launch the first emulator**

```bash
$HOME/Library/Android/sdk/emulator/emulator \
  -avd <AVD_NAME> -read-only -no-snapshot -port 5554 &
```

**Step 2: Clear lock files, then launch the second emulator**

```bash
rm -f ~/.android/avd/<AVD_DIR>.avd/*.lock
$HOME/Library/Android/sdk/emulator/emulator \
  -avd <AVD_NAME> -read-only -no-snapshot -port 5556 &
```

**Step 3: Clear lock files again, then launch the third emulator**

```bash
rm -f ~/.android/avd/<AVD_DIR>.avd/*.lock
$HOME/Library/Android/sdk/emulator/emulator \
  -avd <AVD_NAME> -read-only -no-snapshot -port 5558 &
```

> **Note:** Stagger launches by ~5 seconds between each to avoid lock conflicts.

### Quick launch script (3 emulators)

```bash
AVD_NAME="Medium_Phone_API_36.1"
AVD_DIR="Medium_Phone"
EMU="$HOME/Library/Android/sdk/emulator/emulator"
LOCK_DIR="$HOME/.android/avd/${AVD_DIR}.avd"

# Kill any existing emulators
pkill -f "qemu-system" 2>/dev/null
sleep 2
rm -f "$LOCK_DIR"/*.lock

# Launch emulator 1
$EMU -avd $AVD_NAME -read-only -no-snapshot -port 5554 &
sleep 5

# Launch emulator 2
rm -f "$LOCK_DIR"/*.lock
$EMU -avd $AVD_NAME -read-only -no-snapshot -port 5556 &
sleep 5

# Launch emulator 3
rm -f "$LOCK_DIR"/*.lock
$EMU -avd $AVD_NAME -read-only -no-snapshot -port 5558 &
```

### Verify running emulators

```bash
$HOME/Library/Android/sdk/platform-tools/adb devices
```

Expected output:

```
List of devices attached
emulator-5554   device
emulator-5556   device
emulator-5558   device
```

### Kill all emulators

```bash
pkill -f "qemu-system"
# or individually:
$HOME/Library/Android/sdk/platform-tools/adb -s emulator-5554 emu kill
```

## ADB Input Commands

Use `adb shell input` to send keyboard and touch events to emulators. Add `-s emulator-<PORT>` to target a specific instance.

```bash
# Target a specific emulator
ADB="$HOME/Library/Android/sdk/platform-tools/adb -s emulator-5554"
```

| Command | What it does |
|---------|-------------|
| `adb shell input text "hello%sworld"` | Type text (`%s` = space) |
| `adb shell input tap <x> <y>` | Tap at coordinates |
| `adb shell input keyevent KEYCODE_HOME` | Press Home button |
| `adb shell input keyevent KEYCODE_BACK` | Press Back button |
| `adb shell input keyevent KEYCODE_ENTER` | Press Enter |
| `adb shell input keyevent KEYCODE_DEL` | Backspace |
| `adb shell input swipe <x1> <y1> <x2> <y2>` | Swipe gesture |

### Examples

```bash
# Go to home screen
adb -s emulator-5554 shell input keyevent KEYCODE_HOME

# Open a URL in Chrome
adb -s emulator-5554 shell am start -a android.intent.action.VIEW -d "https://www.google.com" com.android.chrome

# Tap on a UI element at coordinates (x=540, y=500)
adb -s emulator-5554 shell input tap 540 500

# Type into a focused text field
adb -s emulator-5554 shell input text "hello%sfrom%sadb"

# Press Enter to submit
adb -s emulator-5554 shell input keyevent KEYCODE_ENTER

# Take a screenshot
adb -s emulator-5554 exec-out screencap -p > screenshot.png
```

## System Requirements for Multiple Emulators

| Emulators | RAM Needed | CPU Cores |
|-----------|-----------|-----------|
| 1         | ~2-4 GB   | 2         |
| 2         | ~4-8 GB   | 4         |
| 3         | ~6-12 GB  | 6         |

Recommended: 16+ GB RAM and 8+ CPU cores for running 3 emulators smoothly.
