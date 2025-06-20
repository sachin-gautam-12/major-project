   // DOM Elements
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const browseBtn = document.getElementById('browseBtn');
        const previewImage = document.getElementById('previewImage');
        const imagePreview = document.getElementById('imagePreview');
        const removeBtn = document.getElementById('removeBtn');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const resultsPopup = document.getElementById('resultsPopup');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const resultsContainer = document.getElementById('resultsContainer');
        const diseaseName = document.getElementById('diseaseName');
        const confidenceFill = document.getElementById('confidenceFill');
        const confidenceValue = document.getElementById('confidenceValue');
        const treatmentText = document.getElementById('treatmentText');
        const preventionList = document.getElementById('preventionList');
        const newAnalysisBtn = document.getElementById('newAnalysisBtn');
        const resultImage = document.getElementById('resultImage');
        const closePopup = document.getElementById('closePopup');

        // Enhanced disease database with more plants and diseases
        const diseaseDatabase = {
            'tomato': {
                'early_blight': {
                    name: 'Early Blight',
                    confidence: 85,
                    treatment: 'Apply copper-based fungicides every 7-10 days. Remove infected leaves and avoid overhead watering. For organic treatment, use neem oil or baking soda spray (1 tablespoon baking soda, 1 teaspoon vegetable oil, and a few drops of dish soap in 1 gallon of water).',
                    prevention: [
                        'Rotate crops yearly (avoid planting tomatoes in same spot)',
                        'Use disease-free certified seeds',
                        'Space plants properly (24-36 inches apart) for air circulation',
                        'Water at the base of plants (avoid wetting leaves)',
                        'Mulch around plants to prevent soil splashing',
                        'Remove and destroy infected plant debris'
                    ],
                    image: 'https://via.placeholder.com/400x300?text=Early+Blight+Tomato'
                },
                'late_blight': {
                    name: 'Late Blight',
                    confidence: 92,
                    treatment: 'Apply fungicides containing chlorothalonil or mancozeb at first sign of disease. Remove and destroy infected plants immediately. For organic options, use copper fungicides or Bacillus subtilis products. Avoid composting infected plants.',
                    prevention: [
                        'Plant resistant varieties when available',
                        'Avoid working with plants when they are wet',
                        'Disinfect tools regularly with 10% bleach solution',
                        'Destroy all crop debris after harvest',
                        'Ensure proper spacing for air circulation',
                        'Water early in the day so leaves dry quickly'
                    ],
                    image: 'https://via.placeholder.com/400x300?text=Late+Blight+Tomato'
                }
            },
            'potato': {
                'late_blight': {
                    name: 'Late Blight',
                    confidence: 88,
                    treatment: 'Apply fungicides at first sign of disease. Remove and destroy infected plants immediately. For organic control, use copper-based fungicides before symptoms appear. Harvest potatoes when vines are completely dead.',
                    prevention: [
                        'Use certified disease-free seed potatoes',
                        'Allow proper spacing between plants (12-15 inches)',
                        'Avoid overhead irrigation',
                        'Hill soil around plants to protect tubers',
                        'Destroy volunteer potato plants',
                        'Store harvested potatoes in cool, dry conditions'
                    ],
                    image: 'https://via.placeholder.com/400x300?text=Potato+Blight'
                }
            },
            'apple': {
                'scab': {
                    name: 'Apple Scab',
                    confidence: 90,
                    treatment: 'Apply fungicides containing myclobutanil or captan. For organic treatment, use sulfur or lime-sulfur sprays. Remove and destroy fallen leaves in autumn.',
                    prevention: [
                        'Plant resistant varieties (like Liberty or Freedom)',
                        'Prune trees to improve air circulation',
                        'Rake and destroy fallen leaves each autumn',
                        'Apply dormant oil spray in late winter',
                        'Avoid overhead watering'
                    ],
                    image: 'https://via.placeholder.com/400x300?text=Apple+Scab'
                }
            },
            'healthy': {
                'healthy': {
                    name: 'Healthy Plant',
                    confidence: 95,
                    treatment: 'No treatment needed. Your plant appears healthy! Continue with current care practices.',
                    prevention: [
                        'Continue good plant care practices',
                        'Monitor regularly for early signs of disease',
                        'Maintain proper watering schedule',
                        'Use balanced fertilization',
                        'Keep growing area clean and weed-free',
                        'Inspect new plants before introducing to garden'
                    ],
                    image: 'https://via.placeholder.com/400x300?text=Healthy+Plant'
                }
            }
        };

        // Event Listeners
        browseBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleFileSelect);
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        removeBtn.addEventListener('click', resetUpload);
        analyzeBtn.addEventListener('click', analyzePlant);
        newAnalysisBtn.addEventListener('click', resetAnalysis);
        closePopup.addEventListener('click', closeResultsPopup);

        // Functions
        function handleFileSelect(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                displayImage(file);
            }
        }

        function handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();
            uploadArea.style.borderColor = 'var(--primary-color)';
            uploadArea.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            uploadArea.classList.add('animate__animated', 'animate__pulse');
        }

        function handleDragLeave(e) {
            e.preventDefault();
            e.stopPropagation();
            uploadArea.style.borderColor = '#ccc';
            uploadArea.style.backgroundColor = 'transparent';
            uploadArea.classList.remove('animate__animated', 'animate__pulse');
        }

        function handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            handleDragLeave(e);
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                displayImage(file);
            }
        }

        function displayImage(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                imagePreview.style.display = 'block';
                uploadArea.style.display = 'none';
                analyzeBtn.disabled = false;
                
                // Add animation to the preview
                imagePreview.classList.add('animate__animated', 'animate__fadeIn');
            }
            reader.readAsDataURL(file);
        }

        function resetUpload() {
            previewImage.src = 'https://via.placeholder.com/400x300?text=Upload+Plant+Image';
            imagePreview.style.display = 'none';
            uploadArea.style.display = 'block';
            fileInput.value = '';
            analyzeBtn.disabled = true;
            
            // Add bounce animation to upload area
            uploadArea.classList.add('animate__animated', 'animate__bounceIn');
            setTimeout(() => {
                uploadArea.classList.remove('animate__animated', 'animate__bounceIn');
            }, 1000);
        }

        function analyzePlant() {
            // Show popup and loading state
            resultsPopup.classList.add('active');
            loadingIndicator.style.display = 'block';
            resultsContainer.style.display = 'none';
            
            // Add ripple effect to button
            analyzeBtn.classList.add('animate__animated', 'animate__pulse');
            
            // Simulate API call with shorter timeout (1.5 seconds)
            setTimeout(() => {
                // Remove button animation
                analyzeBtn.classList.remove('animate__animated', 'animate__pulse');
                
                // In a real app, this would be an actual API call to Google Cloud Vision or similar
                const detectedDisease = simulateDiseaseDetection(previewImage.src);
                
                // Display results
                displayResults(detectedDisease);
                
                // Hide loading, show results
                loadingIndicator.style.display = 'none';
                resultsContainer.style.display = 'block';
            }, 1500);
        }

        function simulateDiseaseDetection(imageSrc) {
            // This is a simulation - in a real app, you would:
            // 1. Upload the image to Google Cloud Vision API or similar
            // 2. Process the response to identify the disease
            
            // For demo purposes, we'll randomly pick a disease from our sample database
            const plantTypes = Object.keys(diseaseDatabase);
            const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];
            const diseases = Object.keys(diseaseDatabase[randomPlant]);
            const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
            
            return diseaseDatabase[randomPlant][randomDisease];
        }

        function displayResults(disease) {
            resultImage.src = disease.image || previewImage.src;
            diseaseName.textContent = disease.name;
            
            // Animate confidence bar faster (0.5s duration)
            let width = 0;
            const interval = setInterval(() => {
                if (width >= disease.confidence) {
                    clearInterval(interval);
                } else {
                    width++;
                    confidenceFill.style.width = width + '%';
                    confidenceValue.textContent = width + '%';
                }
            }, 5); // Faster animation
            
            treatmentText.textContent = disease.treatment;
            
            // Clear previous prevention tips
            preventionList.innerHTML = '';
            
            // Add new prevention tips with animation
            disease.prevention.forEach((tip, index) => {
                const li = document.createElement('li');
                li.textContent = tip;
                li.style.opacity = '0';
                li.style.transform = 'translateX(-20px)';
                li.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
                preventionList.appendChild(li);
                
                // Animate each tip in
                setTimeout(() => {
                    li.style.opacity = '1';
                    li.style.transform = 'translateX(0)';
                }, 100);
            });
        }

        function resetAnalysis() {
            closeResultsPopup();
            resetUpload();
            
            // Reset results display
            confidenceFill.style.width = '0%';
            confidenceValue.textContent = '0%';
            diseaseName.textContent = '--';
            treatmentText.textContent = '--';
            preventionList.innerHTML = '';
        }

        function closeResultsPopup() {
            resultsPopup.classList.remove('active');
        }

        // Initialize step animations on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.step').forEach(step => {
            observer.observe(step);
        });

        // Animate steps sequentially
        document.querySelectorAll('.step').forEach((step, index) => {
            step.style.transitionDelay = `${index * 0.1}s`;
        });
