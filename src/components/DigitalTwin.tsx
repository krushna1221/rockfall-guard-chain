import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Box, RotateCcw, ZoomIn, Play } from "lucide-react";

export const DigitalTwin = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(20, 20, 20);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create mine slope terrain
    const slopeGeometry = new THREE.PlaneGeometry(20, 15, 20, 15);
    const slopeMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x8b7355,
      side: THREE.DoubleSide 
    });

    // Modify terrain vertices for slope effect
    const positions = slopeGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = Math.sin(x * 0.3) * Math.cos(y * 0.2) * 2 + (x * 0.2);
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
    slopeGeometry.computeVertexNormals();

    const slope = new THREE.Mesh(slopeGeometry, slopeMaterial);
    slope.rotation.x = -Math.PI / 2;
    slope.receiveShadow = true;
    scene.add(slope);

    // Add risk zones as colored overlays
    const riskZones = [
      { color: 0x22c55e, position: [-5, 0.1, -3], size: [3, 3], name: "Safe Zone" },
      { color: 0xf59e0b, position: [0, 0.1, 0], size: [3, 3], name: "Caution Zone" },
      { color: 0xef4444, position: [5, 0.1, 3], size: [3, 3], name: "High Risk Zone" }
    ];

    riskZones.forEach((zone) => {
      const geometry = new THREE.PlaneGeometry(zone.size[0], zone.size[1]);
      const material = new THREE.MeshBasicMaterial({ 
        color: zone.color, 
        transparent: true, 
        opacity: 0.7 
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(zone.position[0], zone.position[1], zone.position[2]);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);
    });

    // Add equipment/structures
    const equipmentGeometry = new THREE.BoxGeometry(1, 2, 1);
    const equipmentMaterial = new THREE.MeshLambertMaterial({ color: 0x4f46e5 });
    
    for (let i = 0; i < 5; i++) {
      const equipment = new THREE.Mesh(equipmentGeometry, equipmentMaterial);
      equipment.position.set(
        (Math.random() - 0.5) * 15,
        1,
        (Math.random() - 0.5) * 10
      );
      equipment.castShadow = true;
      scene.add(equipment);
    }

    // Animation loop
    const animate = () => {
      if (isAnimating) {
        camera.position.x = Math.cos(Date.now() * 0.0005) * 15;
        camera.position.z = Math.sin(Date.now() * 0.0005) * 15;
        camera.lookAt(0, 0, 0);
      }
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse controls
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
      setIsAnimating(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      camera.position.x += deltaX * 0.01;
      camera.position.y -= deltaY * 0.01;
      camera.lookAt(0, 0, 0);

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleWheel = (event: WheelEvent) => {
      const scale = event.deltaY > 0 ? 1.1 : 0.9;
      camera.position.multiplyScalar(scale);
      camera.lookAt(0, 0, 0);
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [isAnimating]);

  const resetCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(10, 10, 10);
      cameraRef.current.lookAt(0, 0, 0);
      setIsAnimating(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Box className="w-5 h-5 text-mining" />
          Digital Twin - Mine Slope Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-safe rounded"></div>
                <span className="text-sm">Safe Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-caution rounded"></div>
                <span className="text-sm">Caution Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-danger rounded"></div>
                <span className="text-sm">High Risk</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnimating(!isAnimating)}
              >
                <Play className="w-4 h-4" />
                {isAnimating ? 'Pause' : 'Play'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetCamera}
              >
                <RotateCcw className="w-4 h-4" />
                Reset View
              </Button>
            </div>
          </div>

          <div 
            ref={mountRef} 
            className="w-full h-96 rounded-lg border bg-muted overflow-hidden cursor-grab active:cursor-grabbing"
          />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Click and drag to rotate • Scroll to zoom</span>
            <Badge variant="outline" className="bg-safe/10 text-safe border-safe/20">
              Real-time Simulation Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};