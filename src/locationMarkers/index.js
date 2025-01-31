import * as THREE from 'three';
import * as TWEEN from 'tween.js';

import {
  latLongToVector3,
} from '../utilities';

const GLOBE_RADIUS = 150;

export function drawPoint(lat, lng, r, i) {
  const position = latLongToVector3(lat, lng, GLOBE_RADIUS);

  const pointGeometry = new THREE.SphereGeometry(r, 32, 32);
  const pointMaterial = new THREE.MeshBasicMaterial({
    color: '#ef0018',
    opacity: 1,
    // side: THREE.DoubleSide,
    // transparent: true,
  });

  const point = new THREE.Mesh(pointGeometry, pointMaterial);
  point.position.set(position.x, position.y, position.z);
  point.scale.set(0.01, 0.01, 0.01);
  point.lookAt(new THREE.Vector3(0, 0, 0));

  new TWEEN.Tween(point.scale)
    .to(
      {
        x: 1,
        y: 1,
        z: 1,
      },
      1000,
    )
    .delay(i * 350 + 1500)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();

  return point;
}

export function drawRing(lat, lng, r, i) {
  const position = latLongToVector3(lat, lng, GLOBE_RADIUS);
  const pointRingGeometry = new THREE.RingGeometry(r + 0.5, r + 1.5, 32);
  const pointRingMaterial = new THREE.MeshBasicMaterial({
    color: '#ef0018',
    opacity: 0.5,
    side: THREE.DoubleSide,
    transparent: true,
  });

  const pointRing = new THREE.Mesh(pointRingGeometry, pointRingMaterial);
  pointRing.position.set(position.x, position.y, position.z);
  pointRing.scale.set(0.01, 0.01, 0.01);
  pointRing.lookAt(new THREE.Vector3(0, 0, 0));

  new TWEEN.Tween(pointRing.scale)
    .to(
      {
        x: 1,
        y: 1,
        z: 1,
      },
      1500,
    )
    .delay(i * 350 + 1500)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();

  return pointRing;
}

export function collectPoints(locationData) {
  const points = [];
  const rings = [];
  for (let i = 0; i < locationData.features.length; i += 1) {
    const lng = locationData.features[i].geometry.coordinates[0];
    const lat = locationData.features[i].geometry.coordinates[1];
    const locationMarker = drawPoint(lat, lng, 1, i);
    const markerRing = drawRing(lat, lng, 1, i);
    points.push(locationMarker);
    rings.push(markerRing);
  }
  return [points, rings];
}
