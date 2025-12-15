/**
 * Three.js 3D Scene Configuration
 * Creates an immersive 3D background with particles and geometric shapes
 */

class ThreeScene {
    constructor() {
        this.canvas = document.getElementById('canvas3d');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.geometries = [];
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        // Setup scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0e27, 1, 1000);
        
        // Setup camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;
        
        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create 3D elements
        this.createParticles();
        this.createGeometries();
        this.createLights();
        
        // Event listeners
        this.addEventListeners();
        
        // Start animation loop
        this.animate();
    }
    
    createParticles() {
        const particleCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 200;
            positions[i + 1] = (Math.random() - 0.5) * 200;
            positions[i + 2] = (Math.random() - 0.5) * 200;
            
            // Color gradient (purple to blue)
            const color = new THREE.Color();
            color.setHSL(0.65 + Math.random() * 0.1, 0.8, 0.5);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    createGeometries() {
        // Create floating geometric shapes
        const shapes = [
            { geometry: new THREE.TorusGeometry(10, 3, 16, 100), position: [-50, 30, -50] },
            { geometry: new THREE.OctahedronGeometry(8), position: [50, -30, -40] },
            { geometry: new THREE.IcosahedronGeometry(6), position: [-40, -40, -60] },
            { geometry: new THREE.TetrahedronGeometry(7), position: [60, 40, -70] }
        ];
        
        shapes.forEach(shape => {
            const material = new THREE.MeshPhongMaterial({
                color: 0x6366f1,
                wireframe: true,
                transparent: true,
                opacity: 0.3,
                emissive: 0x6366f1,
                emissiveIntensity: 0.3
            });
            
            const mesh = new THREE.Mesh(shape.geometry, material);
            mesh.position.set(...shape.position);
            
            // Store original position for animation
            mesh.userData.originalPosition = { ...mesh.position };
            mesh.userData.rotationSpeed = {
                x: Math.random() * 0.02 - 0.01,
                y: Math.random() * 0.02 - 0.01,
                z: Math.random() * 0.02 - 0.01
            };
            
            this.geometries.push(mesh);
            this.scene.add(mesh);
        });
    }
    
    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Point lights
        const pointLight1 = new THREE.PointLight(0x6366f1, 2, 100);
        pointLight1.position.set(50, 50, 50);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x8b5cf6, 2, 100);
        pointLight2.position.set(-50, -50, 50);
        this.scene.add(pointLight2);
    }
    
    addEventListeners() {
        // Mouse move
        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Theme change
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    this.updateTheme();
                }
            });
        });
        
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
    
    updateTheme() {
        const theme = document.body.getAttribute('data-theme');
        const fogColor = theme === 'dark' ? 0x0a0e27 : 0xf8fafc;
        this.scene.fog.color.setHex(fogColor);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Smooth mouse following
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;
        
        // Update camera position based on mouse
        this.camera.position.x = this.mouse.x * 10;
        this.camera.position.y = this.mouse.y * 10;
        this.camera.lookAt(this.scene.position);
        
        // Rotate particles
        if (this.particles) {
            this.particles.rotation.y += 0.0005;
            this.particles.rotation.x += 0.0003;
        }
        
        // Animate geometries
        this.geometries.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
            
            // Floating animation
            const time = Date.now() * 0.001;
            mesh.position.y = mesh.userData.originalPosition.y + Math.sin(time + mesh.position.x) * 5;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize Three.js scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const threeScene = new ThreeScene();
    
    // Expose to window for debugging
    window.threeScene = threeScene;
});