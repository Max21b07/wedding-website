#!/bin/bash

# Script to convert all gallery images to <picture> with srcset and loading="lazy"

FILE="index.html"

echo "🔄 Converting gallery images to responsive WebP with lazy loading..."

# Function to replace gallery image
replace_gallery_image() {
    local photo=$1
    local alt=$2
    local is_pro=$3

    # Determine srcset based on photo type
    if [ "$is_pro" = "true" ]; then
        # Professional photos have 4 sizes
        srcset="photos/${photo}-400w.webp 400w,
                                    photos/${photo}-800w.webp 800w,
                                    photos/${photo}-1200w.webp 1200w,
                                    photos/${photo}-1600w.webp 1600w"
    else
        # Candid photos have 3 sizes
        srcset="photos/${photo}-400w.webp 400w,
                                    photos/${photo}-800w.webp 800w,
                                    photos/${photo}-1200w.webp 1200w"
    fi

    # Old pattern
    old="<img src=\"photos/${photo}.jpg\" alt=\"${alt}\">"

    # New pattern with picture + srcset + lazy loading
    new="<picture>
                    <source type=\"image/webp\"
                            srcset=\"${srcset}\"
                            sizes=\"(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px\">
                    <img src=\"photos/${photo}.jpg\"
                         alt=\"${alt}\"
                         loading=\"lazy\">
                </picture>"

    # Use perl for multiline replacement (more reliable than sed for this)
    perl -i -0pe "s|\\Q${old}\\E|${new}|g" "$FILE"
}

# Gallery images (in order from HTML)
replace_gallery_image "pro02" "Photo professionnelle du mariage - couple en tenue de cérémonie" "true"
replace_gallery_image "candid03" "Moment candide capturé lors du mariage de Phuong et Maxime" "false"
replace_gallery_image "pro07" "Portrait professionnel des mariés - séance photo officielle" "true"
replace_gallery_image "candid04" "Photo authentique du couple lors de leur journée spéciale" "false"
replace_gallery_image "pro08" "Phuong et Maxime en tenue de mariage - photo professionnelle" "true"
replace_gallery_image "candid05" "Moment spontané du couple lors de leur célébration" "false"
replace_gallery_image "pro09" "Portrait élégant des mariés - shooting photo professionnel" "true"
replace_gallery_image "pro11" "Photo professionnelle du couple - séance de mariage" "true"
replace_gallery_image "pro12" "Phuong et Maxime posant ensemble - photo de mariage officielle" "true"
replace_gallery_image "candid08" "Instant capturé lors du mariage - moment authentique et émouvant" "false"
replace_gallery_image "pro13" "Portrait professionnel des mariés dans leur plus belle tenue" "true"
replace_gallery_image "candid09" "Photo candide du couple - moment naturel de leur journée de mariage" "false"
replace_gallery_image "pro14" "Phuong et Maxime lors de leur shooting photo de mariage" "true"
replace_gallery_image "pro15" "Photo professionnelle élégante du couple marié" "true"
replace_gallery_image "pro03" "Portrait artistique de Phuong et Maxime - séance photo de mariage" "true"
replace_gallery_image "pro04" "Dernier portrait professionnel du couple lors de leur mariage" "true"

echo "✅ Gallery images converted successfully!"
echo "📊 All 16 gallery images now use:"
echo "   - WebP format with JPEG fallback"
echo "   - Responsive srcset (400w, 800w, 1200w, 1600w)"
echo "   - Appropriate sizes attribute"
echo "   - loading=\"lazy\" for off-screen images"
