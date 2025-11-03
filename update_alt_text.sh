#!/bin/bash

# Script pour mettre à jour les alt text dans index.html

FILE="index.html"

# Timeline Section 2
sed -i '' 's|alt="Photo de mariage - L'\''Engagement"|alt="Phuong et Maxime lors de leurs fiançailles - moment émouvant de leur engagement mutuel"|g' "$FILE"

# Timeline Section 3
sed -i '' 's|alt="Photo de mariage - Notre Mariage"|alt="Cérémonie de mariage officielle de Phuong et Maxime - célébration de leur union légale"|g' "$FILE"

# Timeline Section 4
sed -i '' 's|alt="Photo de mariage - Notre Avenir"|alt="Phuong et Maxime regardant vers l'\''avenir - symbole de leur vie commune à venir"|g' "$FILE"

# Gallery images
sed -i '' 's|alt="Photo de mariage - Galerie 1"|alt="Photo professionnelle du mariage - couple en tenue de cérémonie"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 2"|alt="Moment candide capturé lors du mariage de Phuong et Maxime"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 3"|alt="Portrait professionnel des mariés - séance photo officielle"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 4"|alt="Photo authentique du couple lors de leur journée spéciale"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 5"|alt="Phuong et Maxime en tenue de mariage - photo professionnelle"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 6"|alt="Moment spontané du couple lors de leur célébration"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 7"|alt="Portrait élégant des mariés - shooting photo professionnel"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 8"|alt="Photo professionnelle du couple - séance de mariage"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 9"|alt="Phuong et Maxime posant ensemble - photo de mariage officielle"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 12"|alt="Instant capturé lors du mariage - moment authentique et émouvant"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 13"|alt="Portrait professionnel des mariés dans leur plus belle tenue"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 14"|alt="Photo candide du couple - moment naturel de leur journée de mariage"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 15"|alt="Phuong et Maxime lors de leur shooting photo de mariage"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 16"|alt="Photo professionnelle élégante du couple marié"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 17"|alt="Portrait artistique de Phuong et Maxime - séance photo de mariage"|g' "$FILE"
sed -i '' 's|alt="Photo de mariage - Galerie 18"|alt="Dernier portrait professionnel du couple lors de leur mariage"|g' "$FILE"

echo "✓ Alt text mis à jour dans $FILE"
