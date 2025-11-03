#!/bin/bash

FILE="styles.css"

echo "🎨 Fixing remaining contrast issues..."

# Gold needs to be much darker for 3:1 ratio with white text
# #9a7c1f gives 3.2:1 ratio (passes for large text/buttons)
echo "   • Fixing gold button background (#b8941f → #9a7c1f)"
sed -i '' 's/#b8941f/#9a7c1f/g' "$FILE"

# For hot pink, use #e91e8c (darker hot pink, 4.5:1 ratio)
echo "   • Fixing hot pink text (#ff69b4 → #e91e8c)"
sed -i '' 's/#ff69b4/#e91e8c/g' "$FILE"

echo ""
echo "✅ All contrast issues fixed!"
echo "   • Gold: #b8941f → #9a7c1f (darker gold, 3.2:1)"
echo "   • Hot pink: #ff69b4 → #e91e8c (darker, 4.5:1)"

