// ============================================
// Единый скрипт для всех калькуляторов NutriFlow
// ============================================

// --- Вода ---
function calcWater() {
    const weightInput = document.getElementById('waterWeight');
    const trainingInput = document.getElementById('waterTraining');
    const heatSelect = document.getElementById('waterHeat');
    const pregnancySelect = document.getElementById('waterPregnancy');

    if (!weightInput) return;
    let weight = parseFloat(weightInput.value);
    let training = trainingInput ? parseFloat(trainingInput.value) : 0;
    let heat = heatSelect ? parseFloat(heatSelect.value) : 0;
    let pregnancy = pregnancySelect ? parseFloat(pregnancySelect.value) : 0;

    if (isNaN(weight) || weight <= 0) return;

    let base = weight * 0.035;
    let trainingWater = (training / 60) * 0.75;
    let extra = heat + pregnancy;
    let total = base + trainingWater + extra;

    const waterBaseEl = document.getElementById('waterBase');
    const waterTrainingResultEl = document.getElementById('waterTrainingResult');
    const waterExtraEl = document.getElementById('waterExtra');
    const waterTotalEl = document.getElementById('waterTotal');

    if (waterBaseEl) waterBaseEl.innerHTML = base.toFixed(1) + ' л';
    if (waterTrainingResultEl) waterTrainingResultEl.innerHTML = trainingWater.toFixed(1) + ' л';
    if (waterExtraEl) waterExtraEl.innerHTML = extra.toFixed(1) + ' л';
    if (waterTotalEl) waterTotalEl.innerHTML = total.toFixed(1) + ' л';
}

// --- 1 ПМ ---
function calc1RM() {
    const weightInput = document.getElementById('1rmWeight');
    const repsInput = document.getElementById('1rmReps');

    if (!weightInput || !repsInput) return;
    let weight = parseFloat(weightInput.value);
    let reps = parseFloat(repsInput.value);

    if (isNaN(weight) || weight <= 0 || isNaN(reps) || reps < 1 || reps >= 37) {
        const avgEl = document.getElementById('1rmAverage');
        if (avgEl) avgEl.innerHTML = '❌';
        return;
    }

    let brzycki = weight * (36 / (37 - reps));
    let epley = weight * (1 + reps / 30);
    let lander = (100 * weight) / (101.3 - 2.67123 * reps);
    let lombardi = weight * Math.pow(reps, 0.1);
    let avg = (brzycki + epley + lander + lombardi) / 4;

    const brzyckiEl = document.getElementById('1rmBrzycki');
    const epleyEl = document.getElementById('1rmEpley');
    const landerEl = document.getElementById('1rmLander');
    const lombardiEl = document.getElementById('1rmLombardi');
    const avgEl = document.getElementById('1rmAverage');

    if (brzyckiEl) brzyckiEl.innerHTML = Math.round(brzycki) + ' кг';
    if (epleyEl) epleyEl.innerHTML = Math.round(epley) + ' кг';
    if (landerEl) landerEl.innerHTML = Math.round(lander) + ' кг';
    if (lombardiEl) lombardiEl.innerHTML = Math.round(lombardi) + ' кг';
    if (avgEl) avgEl.innerHTML = Math.round(avg) + ' кг';
}

// --- Процент жира ---
function toggleHipField() {
    const genderSelect = document.getElementById('fatGender');
    const hipField = document.getElementById('fatHipField');
    if (genderSelect && hipField) {
        hipField.style.display = genderSelect.value === 'female' ? 'block' : 'none';
    }
}

function calcFat() {
    const genderSelect = document.getElementById('fatGender');
    const weightInput = document.getElementById('fatWeight');
    const waistInput = document.getElementById('fatWaist');
    const neckInput = document.getElementById('fatNeck');
    const hipInput = document.getElementById('fatHip');

    if (!genderSelect || !weightInput || !waistInput || !neckInput) return;

    let gender = genderSelect.value;
    let weight = parseFloat(weightInput.value);
    let waist = parseFloat(waistInput.value);
    let neck = parseFloat(neckInput.value);
    let hip = hipInput ? parseFloat(hipInput.value) : 0;

    if (isNaN(weight) || isNaN(waist) || isNaN(neck) || weight <= 0 || waist <= 0 || neck <= 0) {
        const fatValueEl = document.getElementById('fatValue');
        if (fatValueEl) fatValueEl.innerHTML = '❌';
        return;
    }

    let fatPercent;
    if (gender === 'male') {
        let difference = waist - neck;
        fatPercent = (difference * 0.5) + (weight * 0.1) - 8;
        fatPercent = Math.min(Math.max(fatPercent, 6), 35);
    } else {
        if (isNaN(hip) || hip <= 0) {
            const fatValueEl2 = document.getElementById('fatValue');
            if (fatValueEl2) fatValueEl2.innerHTML = '❌';
            return;
        }
        let sum = waist + hip - neck;
        fatPercent = (sum * 0.3) + (weight * 0.08) - 12;
        fatPercent = Math.min(Math.max(fatPercent, 12), 40);
    }

    fatPercent = Math.round(fatPercent);
    const fatValueEl = document.getElementById('fatValue');
    if (fatValueEl) fatValueEl.innerHTML = fatPercent + ' %';

    let category = '';
    let categoryClass = '';
    if (gender === 'male') {
        if (fatPercent < 6) { category = 'Соревновательная форма (очень мало жира)'; categoryClass = 'essential'; }
        else if (fatPercent < 14) { category = 'Спортивная форма (отлично)'; categoryClass = 'athlete'; }
        else if (fatPercent < 18) { category = 'Фитнес-форма (хорошо)'; categoryClass = 'fitness'; }
        else if (fatPercent < 25) { category = 'Приемлемый уровень (норма)'; categoryClass = 'acceptable'; }
        else { category = 'Избыточный жир (рекомендуется консультация)'; categoryClass = 'obese'; }
    } else {
        if (fatPercent < 14) { category = 'Соревновательная форма (очень мало жира)'; categoryClass = 'essential'; }
        else if (fatPercent < 21) { category = 'Спортивная форма (отлично)'; categoryClass = 'athlete'; }
        else if (fatPercent < 25) { category = 'Фитнес-форма (хорошо)'; categoryClass = 'fitness'; }
        else if (fatPercent < 32) { category = 'Приемлемый уровень (норма)'; categoryClass = 'acceptable'; }
        else { category = 'Избыточный жир (рекомендуется консультация)'; categoryClass = 'obese'; }
    }

    const fatCategoryEl = document.getElementById('fatCategory');
    if (fatCategoryEl) {
        fatCategoryEl.innerHTML = '<span class="fat-level ' + categoryClass + '" style="padding: 0.3rem 1rem;">' + category + '</span>';
    }

    const fatScaleEl = document.getElementById('fatScale');
    if (fatScaleEl) {
        fatScaleEl.innerHTML = '<strong>Шкала для ' + (gender === 'male' ? 'мужчин' : 'женщин') + ':</strong><br><br>' +
            '<span class="fat-level essential">' + (gender === 'male' ? '<6%' : '<14%') + '</span> → Очень мало<br>' +
            '<span class="fat-level athlete">' + (gender === 'male' ? '6-14%' : '14-21%') + '</span> → Спортсмен<br>' +
            '<span class="fat-level fitness">' + (gender === 'male' ? '14-18%' : '21-25%') + '</span> → Фитнес<br>' +
            '<span class="fat-level acceptable">' + (gender === 'male' ? '18-25%' : '25-32%') + '</span> → Норма<br>' +
            '<span class="fat-level obese">' + (gender === 'male' ? '>25%' : '>32%') + '</span> → Выше нормы';
    }
}

// --- Идеальный вес ---
function calcIdeal() {
    const genderSelect = document.getElementById('idealGender');
    const heightInput = document.getElementById('idealHeight');
    const ageInput = document.getElementById('idealAge');

    if (!genderSelect || !heightInput) return;
    let gender = genderSelect.value;
    let height = parseFloat(heightInput.value);
    let age = ageInput ? parseFloat(ageInput.value) : 30;

    if (isNaN(height) || height <= 0) return;

    let brock;
    if (height <= 170) brock = height - 100 - (gender === 'male' ? 0 : 5);
    else brock = height - 100 - (gender === 'male' ? 5 : 10);

    let lorenz = height - 100 - (height - 150) / (gender === 'male' ? 4 : 2);

    let devine;
    if (gender === 'male') devine = 50 + 0.905 * (height - 152.4);
    else devine = 45.5 + 0.905 * (height - 152.4);

    let creff;
    if (gender === 'male') creff = (height - 100 + age / 10) * 0.9;
    else creff = (height - 100 + age / 10) * 0.85;

    let bmiIdeal = 22 * Math.pow(height / 100, 2);

    const brockEl = document.getElementById('idealBrock');
    const lorenzEl = document.getElementById('idealLorenz');
    const devineEl = document.getElementById('idealDevine');
    const creffEl = document.getElementById('idealCreff');
    const bmiEl = document.getElementById('idealBMI');

    if (brockEl) brockEl.innerHTML = Math.round(brock) + ' кг';
    if (lorenzEl) lorenzEl.innerHTML = Math.round(lorenz) + ' кг';
    if (devineEl) devineEl.innerHTML = Math.round(devine) + ' кг';
    if (creffEl) creffEl.innerHTML = Math.round(creff) + ' кг';
    if (bmiEl) bmiEl.innerHTML = Math.round(bmiIdeal) + ' кг';
}

// --- Инициализация калькуляторов на странице ---
function initCalculators() {
    // Вода
    const waterWeight = document.getElementById('waterWeight');
    const waterTraining = document.getElementById('waterTraining');
    const waterHeat = document.getElementById('waterHeat');
    const waterPregnancy = document.getElementById('waterPregnancy');
    if (waterWeight) waterWeight.addEventListener('input', calcWater);
    if (waterTraining) waterTraining.addEventListener('input', calcWater);
    if (waterHeat) waterHeat.addEventListener('change', calcWater);
    if (waterPregnancy) waterPregnancy.addEventListener('change', calcWater);

    // 1 ПМ
    const rmWeight = document.getElementById('1rmWeight');
    const rmReps = document.getElementById('1rmReps');
    if (rmWeight) rmWeight.addEventListener('input', calc1RM);
    if (rmReps) rmReps.addEventListener('input', calc1RM);

    // Процент жира
    const fatGender = document.getElementById('fatGender');
    const fatWeight = document.getElementById('fatWeight');
    const fatWaist = document.getElementById('fatWaist');
    const fatNeck = document.getElementById('fatNeck');
    const fatHip = document.getElementById('fatHip');
    if (fatGender) {
        fatGender.addEventListener('change', function() {
            toggleHipField();
            calcFat();
        });
    }
    if (fatWeight) fatWeight.addEventListener('input', calcFat);
    if (fatWaist) fatWaist.addEventListener('input', calcFat);
    if (fatNeck) fatNeck.addEventListener('input', calcFat);
    if (fatHip) fatHip.addEventListener('input', calcFat);

    // Идеальный вес
    const idealGender = document.getElementById('idealGender');
    const idealHeight = document.getElementById('idealHeight');
    const idealAge = document.getElementById('idealAge');
    if (idealGender) idealGender.addEventListener('change', calcIdeal);
    if (idealHeight) idealHeight.addEventListener('input', calcIdeal);
    if (idealAge) idealAge.addEventListener('input', calcIdeal);

    // Запускаем все расчёты при загрузке
    calcWater();
    calc1RM();
    calcFat();
    calcIdeal();
}

// Экспортируем функции в глобальный объект для доступа из HTML
window.calcWater = calcWater;
window.calc1RM = calc1RM;
window.toggleHipField = toggleHipField;
window.calcFat = calcFat;
window.calcIdeal = calcIdeal;
window.initCalculators = initCalculators;