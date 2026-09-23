document.addEventListener('DOMContentLoaded', function() {

    // === Создание мини-логотипов в хэдере и футере ===
    function createChessPattern(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const parent = container.parentElement;
        const parentWidth = parent.offsetWidth;
        const parentHeight = parent.offsetHeight;

        // Размеры элементов по порядку
        const sizes = [30, 40, 50, 40];
        const gap = 15; // Фиксированный отступ
        const startOffset = -50; // Начинаем выше видимой области

        let y = startOffset;
        let sizeIndex = 0;

        while (y < parentHeight + 50) { // +50 чтобы заполнить и ниже
            const currentSize = sizes[sizeIndex % sizes.length];
            const offsetX = (sizeIndex % 2 === 0) ? 0 : currentSize/2; // Шахматный порядок

            let x = -currentSize; // Начинаем левее

            while (x < parentWidth + currentSize) {
                const logo = document.createElement('img');
                logo.src = 'images/SO.png';
                logo.alt = '';
                logo.style.width = currentSize + 'px';
                logo.style.height = currentSize + 'px';
                logo.style.left = x + 'px';
                logo.style.top = y + 'px';
                logo.style.position = 'absolute';
                logo.style.opacity = '0.14';
                logo.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
                logo.style.transform = `rotate(${Math.random() * 15 - 7.5}deg)`; // Небольшой случайный поворот

                container.appendChild(logo);
                x += currentSize + gap;
            }

            y += currentSize + gap;
            sizeIndex++;
        }
    }

    // Строим шахматку после полной загрузки страницы
    window.addEventListener('load', () => {
        createChessPattern('.header-background-logos', 35, 45, 15);

    });


    // =================== ОСНОВНОЙ КОД ПРИЛОЖЕНИЯ ===================
    // DOM элементы
        const categoriesScreen = document.getElementById('categories-screen');
        const swipeScreen = document.getElementById('swipe-screen');
        const browseScreen = document.getElementById('browse-screen');
        const resultsScreen = document.getElementById('results-screen');
        const nextBtn = document.getElementById('next-btn');
        const errorMessage = document.getElementById('error-message');
        const cardDeck = document.getElementById('card-deck');
        const likeBtn = document.getElementById('like-btn');
        const dislikeBtn = document.getElementById('dislike-btn');
        const matchesGrid = document.getElementById('matches-grid');
        const browseGrid = document.getElementById('browse-grid');
        const exportBtn = document.getElementById('export-btn');
        const restartBtn = document.getElementById('restart-btn');
        const backToCategoriesBtn = document.getElementById('back-to-categories-btn');
        const modeToggle = document.getElementById('mode-toggle');
        const showRecommendationsBtn = document.getElementById('show-recommendations-btn');
        const recommendationsContainer = document.getElementById('recommendations-container');
        const recommendationsGrid = document.getElementById('recommendations-grid');

        // Данные о клубах
    const clubsData = {
        science: [
            {
                name: "Студенческое научное общество РГГМУ",
                description: "Объединение для тех, кто интересуется научной деятельностью. Проводим конференции, семинары и помогаем с публикациями.",
                link: "https://vk.com/rshusno",
                image: "images/science.jpg"
            },
            {
                name: "Интеллектуальный клуб «Порт» СНО РГГМУ",
                description: "Место для любителей интеллектуальных игр. Участвуем в турнирах по «Что? Где? Когда?» и другим играм.",
                link: "https://vk.com/club198616849",
                image: "images/intellect.jpg"
            }
        ],
        social: [
            {
                name: "Единый волонтёрский центр РГГМУ",
                description: "Координируем волонтерскую деятельность студентов в различных сферах.",
                link: "https://vk.com/evc_rshu",
                image: "images/volunteer.jpg"
            },
            {
                name: "Социальное добровольческое объединение «ЗОВ»",
                description: "Помогаем нуждающимся, организуем благотворительные акции, выезды и мероприятия.",
                link: "https://vk.com/dobrozov",
                image: "images/zov.jpg"
            },
            {
                name: "Экологический волонтёрский центр «ЗЕЛЁНЫЙ ВЕК»",
                description: "Занимаемся экологическим просвещением и организацией экологических акций.",
                link: "https://vk.com/greenrshu",
                image: "images/green.jpg"
            },
            {
                name: "Донорская ячейка «ЗОВ КРОВИ»",
                description: "Организуем День Донора в РГГМУ, а также лекции по донорству.",
                link: "https://vk.com/zovkrovi_rshu",
                image: "images/blood.jpg"
            },
            {
                name: "Волонтёры Победы РГГМУ",
                description: "Сохраняем историческую память, помогаем ветеранам, организуем патриотические мероприятия.",
                link: "https://vk.com/victoryvolunteersrshu",
                image: "images/victory.jpg"
            },
            {
                name: "Ячейка ассоциации «Покров» в РГГМУ",
                description: "Принимаем участие в гражданско-патриотических мероприятиях, помогаем в их организации.",
                link: "https://vk.com/rshupokrov",
                image: "images/pokrov.jpg"
            },
            {
                name: "Первичное отделение «Движение первых» РГГМУ",
                description: "Развиваем студенческие инициативы, реализуем социальные проекты и создаём возможности для самореализации.",
                link: "https://vk.com/rddm_rshu",
                image: "images/movement.jpg"
            }
        ],
        creative: [
            {
                name: "Культурно-досуговый клуб «Браво»",
                description: "Организуем культурные мероприятия, концерты и творческие вечера в университете.",
                link: "https://vk.com/kdkbravo",
                image: "images/bravo.jpg"
            },
            {
                name: "Студенческий театр «В одной лодке»",
                description: "Ставим спектакли, раскрываем творческий потенциал и объединяем любителей театрального искусства.",
                link: "https://vk.com/hydromettheatre",
                image: "images/theatre.jpg"
            },
            {
                name: "Хор «АТМОСФЕРА» РГГМУ",
                description: "Вокальный коллектив университета. Участвуем в концертах и конкурсах.",
                link: "https://vk.com/club215786557",
                image: "images/choir.jpg"
            },
            {
                name: "Коллектив народного вокала «Птичка певчая»",
                description: "Исполняем народные песни, участвуем в конкурсах и фестивалях.",
                link: "https://vk.com/im/convo/515820771?entrypoint=list_all&z=video-250783_456239156%2F9fae44af5d8dc06ca5",
                image: "images/vocal.jpg"
            },
            {
                name: "Коллектив современной хореографии «Preparation»",
                description: "Оттачиваем мастерство в современных направлениях и представляем университет на конкурсах.",
                link: "https://vk.com/preparationrshu",
                image: "images/dance.jpg"
            },
            {
                name: "Танцевальный коллектив «Княженика»",
                description: "Исполняем национальные танцы коренных народов Камчатки под живое вокальное сопровождение.",
                link: "https://vk.com/knyazhenikadance",
                image: "images/knyazhenika.jpg"
            },
            {
                name: "Этнический танцевальный ансамбль «Байн Цаг»",
                description: "Изучаем и исполняем традиционные танцы разных народов мира.",
                link: "https://vk.com/club149122480?from=search",
                image: "images/ethnic.jpg"
            },
        ],
        sport: [
            {
                name: "Студенческий спортивный клуб «Стихия»",
                description: "Объединяем спортсменов университета, проводим турниры и создаём атмосферу здорового соперничества.",
                link: "https://vk.com/sport.rshu",
                image: "images/sport.jpg"
            },
            {
                name: "Парусный спорт | ССК Стихия РГГМУ",
                description: "Обучаем яхтингу, проводим регаты и открываем мир водного спорта для студентов.",
                link: "https://vk.com/rshusailing",
                image: "images/sailing.jpg"
            },
            {
                name: "Фан-клуб «Зенит» РГГМУ",
                description: "Объединяем болельщиков «Зенит», вместе посещаем матчи и помогаем в организации мероприятий.",
                link: "https://vk.com/rshu_zenit_fans",
                image: "images/zenit.jpg"
            },
            {
                name: "Киберспортивный клуб «Циклон»",
                description: "Проводим турниры по киберспортивным дисциплинам среди студентов.",
                link: "https://vk.com/cyclone_rshu",
                image: "images/cyber.jpg"
            },
            {
                name: "Туристическо-спортивный клуб «Гидромет»",
                description: "Ходим в спортивные походы, участвуем в соревнованиях и обучаемся навыкам выживания.",
                link: "https://vk.com/tourismrshu",
                image: "images/tourism.jpg"
            },
            {
                name: "Команда по чирлидингу «Торнадо»",
                description: "Заряжаем энергией на университетских событиях, выступаем на турнирах и покоряем соревнования по чирлидингу.",
                link: "https://vk.com/tornado_rshu",
                image: "images/cheer.jpg"
            }
        ],
        squads: [

            {
                name: "Студенческий педагогический отряд «Море»",
                description: "Работаем в детских лагерях в качестве вожатых и организаторов.",
                link: "https://vk.com/spo_sea",
                image: "images/sea.jpg"
            },
            {
                name: "Студенческий строительный отряд «РОК»",
                description: "Участвуем в строительных проектах в летний период.",
                link: "https://vk.com/rokovoy_otryad",
                image: "images/rock.jpg"
            },
            {
                name: "Студенческий отряд проводников «Буревестник»",
                description: "Работаем проводниками на железной дороге в летний период.",
                link: "https://vk.com/burevestnik_rshu",
                image: "images/train.jpg"
            },
            {
                name: "Студенческий сельскохозяйственный отряд «ИРГА»",
                description: "Участвуем в трудовых вахтах и создаём летние приключения.",
                link: "https://vk.com/ssho_irga",
                image: "images/farm.jpg"
            },
            {
                name: "Студенческий экологический отряд «Полярная Звезда»",
                description: "Совмещаем полевые исследования с практической работой по сохранению заповедных территорий.",
                link: "https://vk.com/seo_pz",
                image: "images/star.jpg"
            },
            {
                name: "Трудовая Бригада «Метеор»",
                description: "Совмещаем метеонаблюдения с летними экспедициями и настоящей научной работой.",
                link: "https://vk.com/meteorrshu",
                image: "images/meteor.jpg"
            }
        ]
    };

    // State variables
    let selectedCategories = [];
    let clubsToShow = [];
    let currentCardIndex = 0;
    let matchedClubs = [];
    let startX, moveX;
    let isDragging = false;
    let isBrowseMode = false;

    // Event listeners
    nextBtn.addEventListener('click', proceedToNextScreen);
    likeBtn.addEventListener('click', () => handleSwipe('like'));
    dislikeBtn.addEventListener('click', () => handleSwipe('dislike'));
    exportBtn.addEventListener('click', exportToPDF);
    restartBtn.addEventListener('click', restartProcess);
    backToCategoriesBtn.addEventListener('click', restartProcess);
    modeToggle.addEventListener('change', toggleMode);
    showRecommendationsBtn.addEventListener('click', showRecommendations);

    // Initialize swipe cards touch events
    cardDeck.addEventListener('touchstart', handleTouchStart, { passive: false });
    cardDeck.addEventListener('touchmove', handleTouchMove, { passive: false });
    cardDeck.addEventListener('touchend', handleTouchEnd);

    // Functions
    function toggleMode() {
        isBrowseMode = modeToggle.checked;
    }

    function proceedToNextScreen() {
        const checkedBoxes = document.querySelectorAll('input[name="category"]:checked');

        if (checkedBoxes.length === 0) {
            errorMessage.classList.remove('hidden');
            return;
        }

        errorMessage.classList.add('hidden');
        selectedCategories = Array.from(checkedBoxes).map(box => box.value);

        // Prepare clubs to show based on selected categories
        clubsToShow = [];
        selectedCategories.forEach(category => {
            clubsToShow = clubsToShow.concat(clubsData[category]);
        });

        // Shuffle clubs to show
        clubsToShow = shuffleArray(clubsToShow);

        if (isBrowseMode) {
            showBrowseScreen();
        } else {
            showSwipeScreen();
        }
    }

    function showSwipeScreen() {
        // Show first card
        showNextCard();

        // Switch screens
        categoriesScreen.classList.remove('active');
        swipeScreen.classList.add('active');
    }

    function showBrowseScreen() {
        categoriesScreen.classList.remove('active');
        browseScreen.classList.add('active');

        // Clear previous content
        browseGrid.innerHTML = '';

        // Group clubs by category
        const categorizedClubs = {};
        selectedCategories.forEach(category => {
            categorizedClubs[category] = clubsData[category];
        });

        // Add clubs to browse grid
        for (const category in categorizedClubs) {
            const categoryClubs = categorizedClubs[category];
            const categoryTitle = getCategoryTitle(category);

            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';
            categorySection.innerHTML = `<h3 class="browse-category-title">${categoryTitle}</h3>`;

            const clubsContainer = document.createElement('div');
            clubsContainer.className = 'browse-clubs-container';

            categoryClubs.forEach(club => {
                const clubCard = createBrowseClubCard(club);
                clubsContainer.appendChild(clubCard);
            });

            categorySection.appendChild(clubsContainer);
            browseGrid.appendChild(categorySection);
        }
    }

    function getCategoryTitle(category) {
        const titles = {
            science: 'Научные объединения',
            social: 'Социальные объединения',
            creative: 'Культурно-творческие объединения',
            sport: 'Спортивные объединения',
            squads: 'Студенческие отряды'
        };
        return titles[category] || category;
    }

    function createBrowseClubCard(club) {
        const card = document.createElement('div');
        card.className = 'browse-club-card';

        card.innerHTML = `
            <img src="${club.image}" alt="${club.name}">
            <div class="browse-club-info">
                <h4>${club.name}</h4>
                <p>${club.description}</p>
                ${club.link ? `<a href="${club.link}" target="_blank" class="browse-link">Подробнее ВКонтакте</a>` : ''}
            </div>
        `;

        return card;
    }

    function showNextCard() {
        if (currentCardIndex >= clubsToShow.length) {
            // No more cards, show results
            showResults();
            return;
        }

        const club = clubsToShow[currentCardIndex];
        const card = createClubCard(club);

        // Clear previous cards
        cardDeck.innerHTML = '';
        cardDeck.appendChild(card);
    }

    function createClubCard(club) {
        const card = document.createElement('div');
        card.className = 'club-card';

        card.innerHTML = `
            <img src="${club.image}" alt="${club.name}">
            <h3>${club.name}</h3>
            <p>${club.description}</p>
            ${club.link ? `<a href="${club.link}" target="_blank">Подробнее ВКонтакте</a>` : ''}
        `;

        return card;
    }

    function handleSwipe(action) {
        const currentClub = clubsToShow[currentCardIndex];

        if (action === 'like') {
            matchedClubs.push(currentClub);
            animateCardSwipe('right');
        } else {
            animateCardSwipe('left');
        }

        currentCardIndex++;

        // Show next card after animation
        setTimeout(() => {
            showNextCard();
        }, 300);
    }

    function animateCardSwipe(direction) {
        const card = document.querySelector('.club-card');
        if (!card) return;

        const transformValue = direction === 'right' ? 'translateX(200%) rotate(30deg)' : 'translateX(-200%) rotate(-30deg)';
        card.style.transform = transformValue;
        card.style.opacity = '0';
        card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    }

    function showResults() {
        swipeScreen.classList.remove('active');
        resultsScreen.classList.add('active');

        matchesGrid.innerHTML = '';
        const noMatchesContainer = document.getElementById('no-matches-container');
        const buttonsContainer = document.getElementById('buttons-container');
        const resultsTitle = document.getElementById('results-title');
        const exportBtn = document.getElementById('export-btn');

        if (matchedClubs.length === 0) {
            noMatchesContainer.style.display = 'block';
            resultsTitle.style.display = 'none';
            exportBtn.style.display = 'none';
            recommendationsContainer.classList.add('hidden');
        } else {
            noMatchesContainer.style.display = 'none';
            resultsTitle.style.display = 'block';
            exportBtn.style.display = 'block';

            matchedClubs.forEach(club => {
                const matchCard = document.createElement('div');
                matchCard.className = 'match-card';
                matchCard.innerHTML = `
                <img src="${club.image}" alt="${club.name}">
                <h3>${club.name}</h3>
            `;

                matchCard.addEventListener('click', () => {
                    if (club.link) {
                        window.open(club.link, '_blank');
                    } else {
                        const modal = document.createElement('div');
                        modal.className = 'modal';
                        modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close-modal">&times;</span>
                            <img src="${club.image}" alt="${club.name}" class="modal-image">
                            <div class="modal-text">
                                <h3 class="modal-title">${club.name}</h3>
                                <p class="modal-description">${club.description}</p>
                            </div>
                        </div>
                    `;
                        document.body.appendChild(modal);

                        modal.querySelector('.close-modal').addEventListener('click', () => {
                            modal.remove();
                        });

                        modal.addEventListener('click', (e) => {
                            if (e.target === modal) {
                                modal.remove();
                            }
                        });
                    }
                });

                matchesGrid.appendChild(matchCard);
            });
        }
    }

    function showRecommendations() {
        recommendationsContainer.classList.remove('hidden');
        recommendationsGrid.innerHTML = '';

        // Получаем все категории, которые пользователь НЕ выбирал
        const allCategories = ['science', 'social', 'creative', 'sport', 'squads'];
        const unselectedCategories = allCategories.filter(category =>
            !selectedCategories.includes(category)
        );

        // Собираем все клубы из невыбранных категорий
        const allUnselectedClubs = [];
        unselectedCategories.forEach(category => {
            allUnselectedClubs.push(...clubsData[category]);
        });

        // Если нет невыбранных категорий (пользователь выбрал все), используем все клубы
        const sourceClubs = allUnselectedClubs.length > 0 ? allUnselectedClubs :
            Object.values(clubsData).flat();

        // Фильтруем клубы, которые уже были показаны (и лайкнуты/дизлайкнуты)
        const unmatchedClubs = sourceClubs.filter(club =>
            !matchedClubs.some(matched => matched.name === club.name) &&
            !clubsToShow.some(shown => shown.name === club.name)
        );

        // Шафлим и выбираем 4 случайных клуба
        const shuffled = shuffleArray([...unmatchedClubs]);
        const recommendedClubs = shuffled.slice(0, 4);

        // Показываем рекомендации
        recommendedClubs.forEach(club => {
            const recCard = document.createElement('div');
            recCard.className = 'recommendation-card';
            recCard.innerHTML = `
            <img src="${club.image}" alt="${club.name}">
            <h4>${club.name}</h4>
        `;

            recCard.addEventListener('click', () => {
                window.open(club.link, '_blank');
            });

            recommendationsGrid.appendChild(recCard);
        });

        // Скрываем кнопку показа рекомендаций
        showRecommendationsBtn.style.display = 'none';
    }

    function exportToPDF() {
        if (matchedClubs.length === 0) {
            alert('Нет выбранных объединений для экспорта');
            return;
        }

        const element = document.createElement('div');
        element.innerHTML = `
        <h1 style="text-align: center; color: #2c7873; margin-bottom: 20px;">Мои объединения</h1>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
            ${matchedClubs.map(club => `
                <div style="text-align: center; padding: 10px; border: 1px solid #eee; border-radius: 8px;">
                    <img src="${club.image}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 5px;" alt="${club.name}">
                    <h3 style="font-size: 14px; color: #2c7873; margin: 5px 0;">${club.name}</h3>
                </div>
            `).join('')}
        </div>
        `;

        const opt = {
            margin: 10,
            filename: 'студенческие_объединения.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                scrollY: 0
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            }
        };

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
                const blob = pdf.output('blob');
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = opt.filename;
                document.body.appendChild(a);
                a.click();

                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
            });
        } else {
            html2pdf().set(opt).from(element).save();
        }
    }

    function restartProcess() {
        // Reset state
        selectedCategories = [];
        clubsToShow = [];
        currentCardIndex = 0;
        matchedClubs = [];

        // Uncheck all checkboxes
        document.querySelectorAll('input[name="category"]').forEach(box => {
            box.checked = false;
        });

        // Reset mode toggle
        modeToggle.checked = false;
        isBrowseMode = false;

        // Reset recommendations
        recommendationsContainer.classList.add('hidden');
        showRecommendationsBtn.style.display = 'block';

        // Switch screens
        resultsScreen.classList.remove('active');
        browseScreen.classList.remove('active');
        swipeScreen.classList.remove('active');
        categoriesScreen.classList.add('active');
    }

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    function showBrowseScreen() {
        categoriesScreen.classList.remove('active');
        browseScreen.classList.add('active');

        // Прокручиваем страницу вверх
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Clear previous content
        browseGrid.innerHTML = '';

        // Group clubs by category
        const categorizedClubs = {};
        selectedCategories.forEach(category => {
            categorizedClubs[category] = clubsData[category];
        });

        // Add clubs to browse grid
        for (const category in categorizedClubs) {
            const categoryClubs = categorizedClubs[category];
            const categoryTitle = getCategoryTitle(category);

            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';
            categorySection.innerHTML = `<h3 class="browse-category-title">${categoryTitle}</h3>`;

            const clubsContainer = document.createElement('div');
            clubsContainer.className = 'browse-clubs-container';

            categoryClubs.forEach(club => {
                const clubCard = createBrowseClubCard(club);
                clubsContainer.appendChild(clubCard);
            });

            categorySection.appendChild(clubsContainer);
            browseGrid.appendChild(categorySection);
        }
    }
    // Touch event handlers for swipe
    function handleTouchStart(e) {
        const card = document.querySelector('.club-card');
        if (!card) return;

        startX = e.touches[0].clientX;
        card.style.transition = 'none';
        isDragging = true;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        const card = document.querySelector('.club-card');
        if (!card) return;

        moveX = e.touches[0].clientX - startX;
        const rotate = moveX / 20;

        card.style.transform = `translateX(${moveX}px) rotate(${rotate}deg)`;
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;

        const card = document.querySelector('.club-card');
        if (!card) return;

        card.style.transition = 'transform 0.3s ease';

        const threshold = 100;
        if (Math.abs(moveX) > threshold) {
            if (moveX > 0) {
                handleSwipe('like');
            } else {
                handleSwipe('dislike');
            }
        } else {
            card.style.transform = '';
        }
    }
});
