import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLOBAL_HUBS } from '../data/companyData';
import { GlobalHub } from '../types';
import { MapPin, RotateCcw, Sparkles } from 'lucide-react';

interface Globe3DProps {
  onSelectHub?: (hub: GlobalHub) => void;
  activeHubId?: string;
  themeMode?: 'dark' | 'light';
}

export const Globe3D: React.FC<Globe3DProps> = ({ onSelectHub, activeHubId, themeMode = 'dark' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHub, setSelectedHub] = useState<GlobalHub>(GLOBAL_HUBS[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 80;

    // 1. Core Sphere Grid / Dots
    const dotCount = 1800;
    const dotPositions = new Float32Array(dotCount * 3);
    const dotColors = new Float32Array(dotCount * 3);

    const isDark = themeMode === 'dark';
    const baseColor = isDark ? new THREE.Color('#38bdf8') : new THREE.Color('#0284c7');
    const accentColor = isDark ? new THREE.Color('#38bdf8') : new THREE.Color('#1e40af');

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;

      dotColors[i * 3] = baseColor.r;
      dotColors[i * 3 + 1] = baseColor.g;
      dotColors[i * 3 + 2] = baseColor.b;
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
    });

    const dotCloud = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(dotCloud);

    // 2. Latitude / Longitude Wireframe Rings
    const ringGeo = new THREE.BufferGeometry();
    const ringMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x0284c7 : 0x0369a1,
      transparent: true,
      opacity: isDark ? 0.2 : 0.15,
    });

    for (let i = -60; i <= 60; i += 30) {
      const rad = (radius * Math.cos((i * Math.PI) / 180));
      const height = radius * Math.sin((i * Math.PI) / 180);

      const circlePoints = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        circlePoints.push(new THREE.Vector3(rad * Math.cos(theta), height, rad * Math.sin(theta)));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(circlePoints);
      const line = new THREE.Line(lineGeo, ringMat);
      globeGroup.add(line);
    }

    // 3. Atmosphere Glow Outer Sphere
    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.06, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0ea5e9 : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.08 : 0.04,
      wireframe: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphere);

    // Helper: Convert Lat/Lng to 3D Coordinates
    const latLngToVector = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);

      return new THREE.Vector3(x, y, z);
    };

    // 4. Global Hub Pins & Pulsing Rings
    const hubMarkersGroup = new THREE.Group();
    globeGroup.add(hubMarkersGroup);

    const hubPinPositions: { hub: GlobalHub; vec: THREE.Vector3; mesh: THREE.Mesh }[] = [];

    const hqHub = GLOBAL_HUBS.find((h) => h.id === 'mumbai-hq') || GLOBAL_HUBS[0];
    const hqVec = latLngToVector(hqHub.lat, hqHub.lng, radius * 1.02);

    GLOBAL_HUBS.forEach((hub) => {
      const vec = latLngToVector(hub.lat, hub.lng, radius * 1.02);

      const isHq = hub.id === 'mumbai-hq';
      const pinColor = isHq ? (isDark ? 0xf43f5e : 0xe11d48) : (isDark ? 0x38bdf8 : 0x0284c7);

      const pinGeo = new THREE.SphereGeometry(isHq ? 3.2 : 2.2, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: pinColor });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(vec);
      hubMarkersGroup.add(pinMesh);

      hubPinPositions.push({ hub, vec, mesh: pinMesh });

      // Create Curved Shipping Arc from Mumbai HQ to each node
      if (!isHq) {
        const midPoint = new THREE.Vector3().addVectors(hqVec, vec).multiplyScalar(0.5);
        const distance = hqVec.distanceTo(vec);
        midPoint.normalize().multiplyScalar(radius + distance * 0.35);

        const curve = new THREE.QuadraticBezierCurve3(hqVec, midPoint, vec);
        const arcPoints = curve.getPoints(40);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
        const arcMat = new THREE.LineDashedMaterial({
          color: isDark ? 0x38bdf8 : 0x0284c7,
          dashSize: 3,
          gapSize: 2,
          transparent: true,
          opacity: isDark ? 0.7 : 0.5,
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        arcLine.computeLineDistances();
        globeGroup.add(arcLine);
      }
    });

    // 5. Orbiting Marketplace Ring with Floating Logos
    const orbitGroup = new THREE.Group();
    globeGroup.add(orbitGroup);

    const orbitItems = [
      { text: 'Amazon Global', color: '#f59e0b' },
      { text: 'Flipkart', color: '#3b82f6' },
      { text: 'Dropshipping', color: '#ec4899' },
      { text: 'Cross-Border', color: '#10b981' },
      { text: 'AI Automation', color: '#8b5cf6' },
    ];

    orbitItems.forEach((item, index) => {
      const angle = (index / orbitItems.length) * Math.PI * 2;
      const dist = radius * 1.35;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      const nodeGeo = new THREE.SphereGeometry(2.5, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: item.color });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, 0, z);
      orbitGroup.add(nodeMesh);
    });

    // Mouse Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsAutoRotating(false);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvasElem = renderer.domElement;
    canvasElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (isAutoRotating && !isDragging) {
        globeGroup.rotation.y += 0.003;
      }

      orbitGroup.rotation.y = -elapsedTime * 0.15;
      orbitGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvasElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      dotGeometry.dispose();
      dotMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      renderer.dispose();
    };
  }, [themeMode, isAutoRotating]);

  return (
    <div className="relative w-full h-[420px] md:h-[540px] flex items-center justify-center">
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />

      {/* Control Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-xs text-slate-300">
        <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className="ml-1 p-1 hover:bg-slate-800 rounded-full transition-colors text-sky-400 flex items-center space-x-1"
          title="Toggle Auto Rotation"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
          <span className="text-[11px] font-medium">Rotation</span>
        </button>
      </div>

      {/* Interactive Hub Selection Tabs */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 max-w-[95%] overflow-x-auto flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-2xl">
        {GLOBAL_HUBS.map((hub) => {
          const isSelected = selectedHub.id === hub.id;
          return (
            <button
              key={hub.id}
              onClick={() => {
                setSelectedHub(hub);
                if (onSelectHub) onSelectHub(hub);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-sky-400'}`} />
              <span>{hub.city}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
