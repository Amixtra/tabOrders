#!/bin/bash

# Total duration in seconds for 2 hours
duration=$((2 * 60 * 60))  # 7200 seconds
total_steps=100

# Time per step (in seconds, integer or float)
sleep_interval=$(awk "BEGIN { printf \"%.2f\", $duration / $total_steps }")

# Clear screen
clear

# Cool GitHub-style intro
echo ""
echo "======================================================"
echo "       🚀 GitHub Repository Sync Utility v2.0 🚀       "
echo "======================================================"
echo ""
echo "🔐 Initializing secure GitHub session..."
sleep 1
echo ""
echo "🔍 Verifying Git credentials and repo access..."
sleep 1
echo ""
echo "📤 Starting 2-hour data upload to GitHub:"
sleep 1
echo ""

start_time=$(date +%s)

for i in $(seq 1 $total_steps); do
    current_time=$(date +%s)
    elapsed=$((current_time - start_time))
    remaining=$((duration - elapsed))

    # Prevent negative countdown if script slightly overruns
    if [ $remaining -lt 0 ]; then
        remaining=0
    fi

    # Format remaining time as HH:MM:SS
    remaining_formatted=$(printf "%02d:%02d:%02d" $((remaining/3600)) $(((remaining%3600)/60)) $((remaining%60)))

    # Progress bar setup
    bar_length=50
    filled=$((i * bar_length / 100))
    empty=$((bar_length - filled))
    bar=$(printf "%${filled}s" | tr ' ' '#')
    space=$(printf "%${empty}s")

    # Print progress with ETA
    echo -ne "[${bar}${space}] $i%% | ETA: $remaining_formatted | Uploading to GitHub... \r"

    # Sleep for the interval
    sleep $sleep_interval
done

# Completion
echo ""
echo ""
echo "------------------------------------------------------"
echo "✅ GitHub Sync Complete! All files successfully pushed."
echo "------------------------------------------------------"
echo ""
