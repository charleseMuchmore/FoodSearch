import './general';

class FoodSearch {
    constructor()
    {
        this.$form = document.getElementById("searchForm");
        this.$searchBar = document.getElementById("searchBar");
        this.$submit = document.getElementById("searchSubmit");
        this.$searchResults = document.getElementById("searchResults");
        this.$topResult = document.getElementById("topResult");
        this.$similarResults = document.getElementById("otherResults");

        this.$foodItemElements = [];
        this.$selectedFoodItem;
        this.searchData = [];
        this.indexOfSelectedFoodItem = 0;
        this.examplePostResponse = {
            "uri": "http://www.edamam.com/ontologies/edamam.owl#c93c4f07-ba4e-4fc4-ad92-ca22b90bd566",
            "calories": 68,
            "glycemicIndex": 27.000000000000004,
            "totalWeight": 17,
            "dietLabels": [],
            "healthLabels": [
              "KIDNEY_FRIENDLY",
              "KETO_FRIENDLY",
              "VEGETARIAN",
              "PESCATARIAN",
              "SPECIFIC_CARBS",
              "GLUTEN_FREE",
              "WHEAT_FREE",
              "EGG_FREE",
              "PEANUT_FREE",
              "TREE_NUT_FREE",
              "SOY_FREE",
              "FISH_FREE",
              "SHELLFISH_FREE",
              "PORK_FREE",
              "RED_MEAT_FREE",
              "CRUSTACEAN_FREE",
              "CELERY_FREE",
              "MUSTARD_FREE",
              "SESAME_FREE",
              "LUPINE_FREE",
              "MOLLUSK_FREE",
              "ALCOHOL_FREE",
              "NO_OIL_ADDED",
              "NO_SUGAR_ADDED",
              "FODMAP_FREE",
              "KOSHER"
            ],
            "cautions": [
              "SULFITES"
            ],
            "totalNutrients": {
              "ENERC_KCAL": {
                "label": "Energy",
                "quantity": 68.51,
                "unit": "kcal"
              },
              "FAT": {
                "label": "Total lipid (fat)",
                "quantity": 5.661,
                "unit": "g"
              },
              "FASAT": {
                "label": "Fatty acids, total saturated",
                "quantity": 3.213,
                "unit": "g"
              },
              "FAMS": {
                "label": "Fatty acids, total monounsaturated",
                "quantity": 1.5963000000000003,
                "unit": "g"
              },
              "FAPU": {
                "label": "Fatty acids, total polyunsaturated",
                "quantity": 0.16014,
                "unit": "g"
              },
              "CHOCDF": {
                "label": "Carbohydrate, by difference",
                "quantity": 0.5729000000000001,
                "unit": "g"
              },
              "CHOCDF.net": {
                "label": "Carbohydrates (net)",
                "quantity": 0.5729000000000001,
                "unit": "g"
              },
              "FIBTG": {
                "label": "Fiber, total dietary",
                "quantity": 0,
                "unit": "g"
              },
              "SUGAR": {
                "label": "Sugars, total including NLEA",
                "quantity": 0.0816,
                "unit": "g"
              },
              "PROCNT": {
                "label": "Protein",
                "quantity": 3.8930000000000002,
                "unit": "g"
              },
              "CHOLE": {
                "label": "Cholesterol",
                "quantity": 16.830000000000002,
                "unit": "mg"
              },
              "NA": {
                "label": "Sodium, Na",
                "quantity": 111.01,
                "unit": "mg"
              },
              "CA": {
                "label": "Calcium, Ca",
                "quantity": 120.7,
                "unit": "mg"
              },
              "MG": {
                "label": "Magnesium, Mg",
                "quantity": 4.590000000000001,
                "unit": "mg"
              },
              "K": {
                "label": "Potassium, K",
                "quantity": 12.920000000000002,
                "unit": "mg"
              },
              "FE": {
                "label": "Iron, Fe",
                "quantity": 0.023800000000000005,
                "unit": "mg"
              },
              "ZN": {
                "label": "Zinc, Zn",
                "quantity": 0.6188,
                "unit": "mg"
              },
              "P": {
                "label": "Phosphorus, P",
                "quantity": 77.35000000000001,
                "unit": "mg"
              },
              "VITA_RAE": {
                "label": "Vitamin A, RAE",
                "quantity": 57.290000000000006,
                "unit": "µg"
              },
              "VITC": {
                "label": "Vitamin C, total ascorbic acid",
                "quantity": 0,
                "unit": "mg"
              },
              "THIA": {
                "label": "Thiamin",
                "quantity": 0.00493,
                "unit": "mg"
              },
              "RIBF": {
                "label": "Riboflavin",
                "quantity": 0.07276,
                "unit": "mg"
              },
              "NIA": {
                "label": "Niacin",
                "quantity": 0.01003,
                "unit": "mg"
              },
              "VITB6A": {
                "label": "Vitamin B-6",
                "quantity": 0.01122,
                "unit": "mg"
              },
              "FOLDFE": {
                "label": "Folate, DFE",
                "quantity": 4.590000000000001,
                "unit": "µg"
              },
              "FOLFD": {
                "label": "Folate, food",
                "quantity": 4.590000000000001,
                "unit": "µg"
              },
              "FOLAC": {
                "label": "Folic acid",
                "quantity": 0,
                "unit": "µg"
              },
              "VITB12": {
                "label": "Vitamin B-12",
                "quantity": 0.18700000000000003,
                "unit": "µg"
              },
              "VITD": {
                "label": "Vitamin D (D2 + D3)",
                "quantity": 0.10200000000000001,
                "unit": "µg"
              },
              "TOCPHA": {
                "label": "Vitamin E (alpha-tocopherol)",
                "quantity": 0.1207,
                "unit": "mg"
              },
              "VITK1": {
                "label": "Vitamin K (phylloquinone)",
                "quantity": 0.40800000000000003,
                "unit": "µg"
              },
              "WATER": {
                "label": "Water",
                "quantity": 6.256,
                "unit": "g"
              }
            },
            "totalDaily": {
              "ENERC_KCAL": {
                "label": "Energy",
                "quantity": 3.4255000000000004,
                "unit": "%"
              },
              "FAT": {
                "label": "Fat",
                "quantity": 8.709230769230768,
                "unit": "%"
              },
              "FASAT": {
                "label": "Saturated",
                "quantity": 16.065,
                "unit": "%"
              },
              "CHOCDF": {
                "label": "Carbs",
                "quantity": 0.1909666666666667,
                "unit": "%"
              },
              "FIBTG": {
                "label": "Fiber",
                "quantity": 0,
                "unit": "%"
              },
              "PROCNT": {
                "label": "Protein",
                "quantity": 7.7860000000000005,
                "unit": "%"
              },
              "CHOLE": {
                "label": "Cholesterol",
                "quantity": 5.61,
                "unit": "%"
              },
              "NA": {
                "label": "Sodium",
                "quantity": 4.625416666666666,
                "unit": "%"
              },
              "CA": {
                "label": "Calcium",
                "quantity": 12.07,
                "unit": "%"
              },
              "MG": {
                "label": "Magnesium",
                "quantity": 1.092857142857143,
                "unit": "%"
              },
              "K": {
                "label": "Potassium",
                "quantity": 0.2748936170212766,
                "unit": "%"
              },
              "FE": {
                "label": "Iron",
                "quantity": 0.13222222222222224,
                "unit": "%"
              },
              "ZN": {
                "label": "Zinc",
                "quantity": 5.625454545454546,
                "unit": "%"
              },
              "P": {
                "label": "Phosphorus",
                "quantity": 11.05,
                "unit": "%"
              },
              "VITA_RAE": {
                "label": "Vitamin A",
                "quantity": 6.365555555555557,
                "unit": "%"
              },
              "VITC": {
                "label": "Vitamin C",
                "quantity": 0,
                "unit": "%"
              },
              "THIA": {
                "label": "Thiamin (B1)",
                "quantity": 0.4108333333333334,
                "unit": "%"
              },
              "RIBF": {
                "label": "Riboflavin (B2)",
                "quantity": 5.596923076923077,
                "unit": "%"
              },
              "NIA": {
                "label": "Niacin (B3)",
                "quantity": 0.06268750000000001,
                "unit": "%"
              },
              "VITB6A": {
                "label": "Vitamin B6",
                "quantity": 0.8630769230769232,
                "unit": "%"
              },
              "FOLDFE": {
                "label": "Folate equivalent (total)",
                "quantity": 1.1475000000000002,
                "unit": "%"
              },
              "VITB12": {
                "label": "Vitamin B12",
                "quantity": 7.791666666666668,
                "unit": "%"
              },
              "VITD": {
                "label": "Vitamin D",
                "quantity": 0.68,
                "unit": "%"
              },
              "TOCPHA": {
                "label": "Vitamin E",
                "quantity": 0.8046666666666666,
                "unit": "%"
              },
              "VITK1": {
                "label": "Vitamin K",
                "quantity": 0.34,
                "unit": "%"
              }
            },
            "ingredients": [
              {
                "parsed": [
                  {
                    "quantity": 1,
                    "measure": "cubic inch",
                    "food": "cheddar cheese",
                    "foodId": "food_bhppgmha1u27voagb8eptbp9g376",
                    "foodURI": "http://www.edamam.com/ontologies/edamam.owl#Food_cheddar_cheese",
                    "weight": 17,
                    "retainedWeight": 17,
                    "servingsPerContainer": 7.071428571428571,
                    "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_cubic_inch",
                    "status": "OK"
                  }
                ]
              }
            ]
          };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.$form.addEventListener("submit", this.onFormSubmit);
        }

    addEventListeners() {
        this.onFoodItemClick = this.onFoodItemClick.bind(this);
        for(let i = 0; i < this.$foodItemElements.length; i++)
        {
            this.$foodItemElements[i].addEventListener("click", this.onFoodItemClick);
            this.$foodItemElements[i].setAttribute("id", i);
        }
    }

    onFoodItemClick(event) {
        //managing highlighting
        const otherHighlightElements = document.getElementsByClassName('highlight');
        for(let i = 0; i < otherHighlightElements.length; i++)
        {
            otherHighlightElements[i].classList.remove('highlight');
        }
        event.target.classList.add('highlight');

        //setting class instance variables
        this.$selectedFoodItem = event.target;
        this.indexOfSelectedFoodItem = this.$selectedFoodItem.id;

        //actually displaying detailed nutrition info section
        const generalInfo = this.examplePostResponse.ingredients[0].parsed[0];
        const nutritionInfo = this.examplePostResponse.totalNutrients;

        let label = this.searchData[this.indexOfSelectedFoodItem].food.label;
        let servingSize = `${generalInfo.quantity} ${generalInfo.measure}`;
        let calories = `${nutritionInfo.ENERC_KCAL.quantity}`;

        let arrayOfNutrients = 
        [`${Math.round(nutritionInfo.FAT.quantity * 100) / 100} ${nutritionInfo.FAT.unit}`,
        `${Math.round(nutritionInfo.FASAT.quantity * 100) / 100} ${nutritionInfo.FASAT.unit}`,
        `${Math.round(nutritionInfo.FAMS.quantity * 100) / 100} ${nutritionInfo.FAMS.unit}`,
        `${Math.round(nutritionInfo.FAPU.quantity * 100) / 100} ${nutritionInfo.FAPU.unit}`,
        `${Math.round(nutritionInfo.CHOCDF.quantity * 100) / 100} ${nutritionInfo.CHOCDF.unit}`,
        `${Math.round(nutritionInfo.FIBTG.quantity * 100) / 100} ${nutritionInfo.FIBTG.unit}`,
        `${Math.round(nutritionInfo.SUGAR.quantity * 100) / 100} ${nutritionInfo.SUGAR.unit}`,
        `${Math.round(nutritionInfo.PROCNT.quantity * 100) / 100} ${nutritionInfo.PROCNT.unit}`,
        `${Math.round(nutritionInfo.CHOLE.quantity * 100) / 100} ${nutritionInfo.CHOLE.unit}`,
        `${Math.round(nutritionInfo.NA.quantity * 100) / 100} ${nutritionInfo.NA.unit}`,
        `${Math.round(nutritionInfo.CA.quantity * 100) / 100} ${nutritionInfo.CA.unit}`,
        `${Math.round(nutritionInfo.MG.quantity * 100) / 100} ${nutritionInfo.MG.unit}`,
        `${Math.round(nutritionInfo.K.quantity * 100) / 100} ${nutritionInfo.K.unit}`,
        `${Math.round(nutritionInfo.FE.quantity * 100) / 100} ${nutritionInfo.FE.unit}`,
        `${Math.round(nutritionInfo.ZN.quantity * 100) / 100} ${nutritionInfo.ZN.unit}`
        ]

        let nutritionDetails = this.createNutritionDetails(label, servingSize, calories, arrayOfNutrients);
        let detailsContainer = document.getElementById("details-container");
        detailsContainer.innerHTML = nutritionDetails;

    }

    createNutritionDetails(foodTitle, servingSize, calories, arrayOfOtherNutrients) {
       return `<div class="detail-info">
       <h1 class="food-title">${foodTitle}</h1>
       <div class="thick-line">
         <b>Serving size<b id="serving-size">${servingSize}</b></b>
       </div>
       <b>Amount per serving</b>
       <div class="medium-line">
         <h2><b>Calories</b><b id="calories">${calories}</b></h2>
       </div>
       <h6>Fat: ${arrayOfOtherNutrients[0]}</h6>
       <h6>Saturated Fat: ${arrayOfOtherNutrients[1]}</h6>
       <h6>Monounsaturated Fat: ${arrayOfOtherNutrients[2]}</h6>
       <h6>Polyunsaturated Fat: ${arrayOfOtherNutrients[3]}</h6>
       <h6>Carbohydrates: ${arrayOfOtherNutrients[4]}</h6>
       <h6>Fiber: ${arrayOfOtherNutrients[5]}</h6>
       <h6>Sugar: ${arrayOfOtherNutrients[6]}</h6>
       <h6>Protein: ${arrayOfOtherNutrients[7]}</h6>
       <h6>Cholesterol: ${arrayOfOtherNutrients[8]}</h6>
       <h6>Sodium: ${arrayOfOtherNutrients[9]}</h6>
       <h6>Calcium: ${arrayOfOtherNutrients[10]}</h6>
       <h6>Magnesium: ${arrayOfOtherNutrients[11]}</h6>
       <h6>Potassium: ${arrayOfOtherNutrients[12]}</h6>
       <h6>Iron: ${arrayOfOtherNutrients[13]}</h6>
       <h6>Zinc: ${arrayOfOtherNutrients[14]}</h6>
     </div>`;
    }

    onFormSubmit(event) {
        event.preventDefault();
        const searchTerm = this.$searchBar.value;

        fetch(`${SERVER_URL}parser?ingr=${searchTerm}&app_key=${EDAMAM_KEY}&app_id=${APP_ID}`) 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const primaryResult = data.hints[0].food;
            const secondaryResults = data.hints;
            this.updateSearchResults(primaryResult, secondaryResults);
            this.addEventListeners();
        })
        .catch(error => {
              console.log(error)
              alert("something went wrong searching the food item")
            })
    }

    updateSearchResults(topResult, similarResults) {
        //updating top results
        let newTopResult = this.createFoodItem(topResult.label, Math.round(topResult.nutrients.ENERC_KCAL * 100) / 100, Math.round(topResult.nutrients.PROCNT * 100) / 100, Math.round(topResult.nutrients.FAT * 100) / 100, Math.round(topResult.nutrients.FIBTG * 100) / 100, Math.round(topResult.nutrients.CHOCDF * 100) / 100);
        this.$topResult.innerHTML = newTopResult;

        //updating similar results
        let newSimilarResults = ``;
        let startIndex = 0;
        let endIndex = 4;
        this.searchData = [];
        if (similarResults[0].food.label == topResult.label)
            {
                startIndex = 1;
                endIndex += 1;
                this.searchData.push(similarResults[0]);
            }
        else
        {
            this.searchData.push(topResult);
        }
            
        for (let i = startIndex; i < endIndex; i++)
        {
            let thisFood = similarResults[i].food;
            let result = this.createFoodItem(thisFood.label, Math.round(thisFood.nutrients.ENERC_KCAL * 100) / 100, Math.round(thisFood.nutrients.PROCNT * 100) / 100, Math.round(thisFood.nutrients.FAT * 100) / 100, Math.round(thisFood.nutrients.FIBTG * 100) / 100, Math.round(thisFood.nutrients.CHOCDF * 100) / 100);
            newSimilarResults += result;
            this.searchData.push(similarResults[i]);
        }
        this.$similarResults.innerHTML = newSimilarResults;
        this.$foodItemElements = document.getElementsByClassName("food-item");
    }

    createFoodItem(foodTitle, calories, protein, fat, fiber, carbs) {
        return `<div class="food-item">
            <div class="food-title">${foodTitle}</div>
            <div class="food-info">Calories: ${calories}</div>
            <div class="food-info">Protein: ${protein}</div>
            <div class="food-info">Fat: ${fat}</div>
            <div class="food-info">Fiber: ${fiber}</div>
            <div class="food-info">Carbs: ${carbs}</div>
        </div><div class="col-sm-12"></div>
      `;
    }
}

window.onload = () => {new FoodSearch();}