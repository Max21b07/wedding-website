#!/bin/bash

# Source directories
PRO_DIR="/Users/luthiminhphuong/Documents/Photo favorites/40 photo for album"
CANDID_DIR="/Users/luthiminhphuong/Downloads/Photos-1-001"
DEST_DIR="photos_new"

mkdir -p "$DEST_DIR"

# Professional photos
cp "$PRO_DIR/LQD_1338 copy.JPG" "$DEST_DIR/pro01.jpg"
cp "$PRO_DIR/LQD_1505 copy.JPG" "$DEST_DIR/pro02.jpg"
cp "$PRO_DIR/LQD_1755 copy.JPG" "$DEST_DIR/pro03.jpg"
cp "$PRO_DIR/LQD_1907 copy.JPG" "$DEST_DIR/pro04.jpg"
cp "$PRO_DIR/LQD_2045 copy.JPG" "$DEST_DIR/pro05.jpg"
cp "$PRO_DIR/LQD_1366.JPG" "$DEST_DIR/pro06.jpg"
cp "$PRO_DIR/LQD_1429.JPG" "$DEST_DIR/pro07.jpg"
cp "$PRO_DIR/LQD_1557.JPG" "$DEST_DIR/pro08.jpg"
cp "$PRO_DIR/LQD_1607.JPG" "$DEST_DIR/pro09.jpg"
cp "$PRO_DIR/LQD_1690.JPG" "$DEST_DIR/pro10.jpg"
cp "$PRO_DIR/LQD_1772.JPG" "$DEST_DIR/pro11.jpg"
cp "$PRO_DIR/LQD_1798.JPG" "$DEST_DIR/pro12.jpg"
cp "$PRO_DIR/LQD_1960.JPG" "$DEST_DIR/pro13.jpg"
cp "$PRO_DIR/LQD_1997.JPG" "$DEST_DIR/pro14.jpg"
cp "$PRO_DIR/LQD_2078.JPG" "$DEST_DIR/pro15.jpg"

# Candid photos
cp "$CANDID_DIR/20250318100300.JPG" "$DEST_DIR/candid01.jpg"
cp "$CANDID_DIR/20250318100548.JPG" "$DEST_DIR/candid02.jpg"
cp "$CANDID_DIR/IMG_0390 Copy.JPG" "$DEST_DIR/candid03.jpg"
cp "$CANDID_DIR/P1180412.JPG" "$DEST_DIR/candid04.jpg"
cp "$CANDID_DIR/P1180426.JPG" "$DEST_DIR/candid05.jpg"
cp "$CANDID_DIR/P1180434.JPG" "$DEST_DIR/candid06.jpg"
cp "$CANDID_DIR/P1180458.JPG" "$DEST_DIR/candid07.jpg"
cp "$CANDID_DIR/P1180682.JPG" "$DEST_DIR/candid08.jpg"
cp "$CANDID_DIR/P1180707.JPG" "$DEST_DIR/candid09.jpg"

echo "✓ 24 photos copiées dans $DEST_DIR"
ls -lh "$DEST_DIR" | tail -n +2 | wc -l | xargs echo "Total:"
