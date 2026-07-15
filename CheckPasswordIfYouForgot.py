import subprocess

# Get all saved WiFi profiles
profiles = subprocess.check_output(
    "netsh wlan show profiles",
    shell=True,
    text=True,
    encoding="utf-8",
    errors="ignore"
)

# Extract profile names
wifi_names = [
    line.split(":")[1].strip()
    for line in profiles.splitlines()
    if "All User Profile" in line
]

print(f"{'No.':<5} {'WiFi Name':<35} Password")
print("-" * 70)

for i, wifi in enumerate(wifi_names, start=1):
    try:
        result = subprocess.check_output(
            f'netsh wlan show profile "{wifi}" key=clear',
            shell=True,
            text=True,
            encoding="utf-8",
            errors="ignore"
        )

        password = "No Password / Not Available"

        for line in result.splitlines():
            if "Key Content" in line:
                password = line.split(":", 1)[1].strip()
                break

        print(f"{i:<5} {wifi:<35} {password}")

    except subprocess.CalledProcessError:
        print(f"{i:<5} {wifi:<35} Error reading profile")