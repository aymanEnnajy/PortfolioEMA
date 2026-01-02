/**
 * Three.js 3D Scene Configuration
 * Creates an immersive 3D background with particles and custom tech icons
 */

class ThreeScene {
    constructor() {
        this.canvas = document.getElementById('canvas3d');
        if (!this.canvas) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.geometries = [];
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };

        // Configuration des icônes
        this.iconConfig = [
            { icon: '\uf108', color: '#6366f1', name: 'desktop', position: [50, -30, -40] }, // Desktop
            { icon: '\uf121', color: '#a855f7', name: 'code', position: [-40, -40, -60] },  // Code
            { icon: '\uf109', color: '#ec4899', name: 'laptop', position: [60, 40, -70] }   // Laptop
        ];

        this.shapes = [];

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
        this.camera.position.z = 60;

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
        this.createParticles();
        this.createGeometries();
        this.createGeometricShapes();
        this.createLights();

        // Event listeners
        this.addEventListeners();

        // Start animation loop
        this.animate();
    }

    // Génère une texture à partir d'une icône FontAwesome
    createIconTexture(char, color) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Fond transparent
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Style de l'icône
        const fontSize = 380;
        ctx.font = `900 ${fontSize}px "Font Awesome 6 Free", "Font Awesome 6 Brands"`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Ajout d'un éclat (glow)
        ctx.shadowColor = color;
        ctx.shadowBlur = 30;

        // Dessiner l'icône
        ctx.fillText(char, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    createParticles() {
        const particleCount = 400;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 250;
            positions[i + 1] = (Math.random() - 0.5) * 250;
            positions[i + 2] = (Math.random() - 0.5) * 250;

            const color = new THREE.Color();
            color.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.5);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createGeometries() {
        // Attendre que FontAwesome soit chargé pour garantir le rendu des icônes
        document.fonts.ready.then(() => {
            this.iconConfig.forEach(config => {
                const texture = this.createIconTexture(config.icon, config.color);
                const material = new THREE.MeshPhongMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide,
                    emissive: new THREE.Color(config.color),
                    emissiveIntensity: 0.5,
                    shininess: 100
                });

                const geometry = new THREE.PlaneGeometry(15, 15);
                const mesh = new THREE.Mesh(geometry, material);

                mesh.position.set(...config.position);

                // Données pour l'animation
                mesh.userData.originalPosition = { ...mesh.position };
                mesh.userData.rotationSpeed = {
                    x: Math.random() * 0.01,
                    y: Math.random() * 0.02,
                    z: Math.random() * 0.005
                };
                mesh.userData.floatOffset = Math.random() * Math.PI * 2;

                this.geometries.push(mesh);
                this.scene.add(mesh);
            });
        });
    }

    createGeometricShapes() {
        const shapesConfig = [
            { type: 'Icosahedron', color: '#61dafb', position: [-50, 30, -50] }, // Replace React position
            { type: 'Octahedron', color: '#ffcc00', position: [-70, 0, -80] },
            { type: 'Tetrahedron', color: '#ff6b6b', position: [30, 60, -90] }
        ];

        shapesConfig.forEach(config => {
            let geometry;
            switch (config.type) {
                case 'Icosahedron':
                    geometry = new THREE.IcosahedronGeometry(10, 0);
                    break;
                case 'Octahedron':
                    geometry = new THREE.OctahedronGeometry(8, 0);
                    break;
                case 'Tetrahedron':
                    geometry = new THREE.TetrahedronGeometry(8, 0);
                    break;
            }

            const material = new THREE.MeshPhongMaterial({
                color: config.color,
                wireframe: true,
                transparent: true,
                opacity: 0.6,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...config.position);

            mesh.userData.originalPosition = { ...mesh.position };
            mesh.userData.rotationSpeed = {
                x: Math.random() * 0.02,
                y: Math.random() * 0.03,
                z: Math.random() * 0.01
            };
            mesh.userData.floatOffset = Math.random() * Math.PI * 2;

            this.shapes.push(mesh);
            this.scene.add(mesh);
        });
    }

    createLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x6366f1, 2, 150);
        pointLight1.position.set(50, 50, 50);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xa855f7, 2, 150);
        pointLight2.position.set(-50, -50, 50);
        this.scene.add(pointLight2);
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => {
            if (!this.camera || !this.renderer) return;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Mouse follow lag for smoothness
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // Camera movement based on mouse
        if (this.camera) {
            this.camera.position.x += (this.mouse.x * 20 - this.camera.position.x) * 0.05;
            this.camera.position.y += (this.mouse.y * 20 - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);
        }

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.y += 0.0003;
        }

        // Animate icons
        const time = Date.now() * 0.001;
        this.geometries.forEach(mesh => {
            mesh.rotation.y += mesh.userData.rotationSpeed.y;

            // Complex floating movement
            mesh.position.y = mesh.userData.originalPosition.y + Math.sin(time + mesh.userData.floatOffset) * 4;
            mesh.position.x = mesh.userData.originalPosition.x + Math.cos(time * 0.5 + mesh.userData.floatOffset) * 2;
        });

        // Animate shapes
        this.shapes.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;

            // Float movement
            mesh.position.y = mesh.userData.originalPosition.y + Math.sin(time + mesh.userData.floatOffset) * 5;
            mesh.position.x = mesh.userData.originalPosition.x + Math.cos(time * 0.7 + mesh.userData.floatOffset) * 3;
        });

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.threeScene = new ThreeScene();
});