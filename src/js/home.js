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

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.$form.addEventListener("submit", this.onFormSubmit);
    }

    addEvents() {
        this.onfoodItemClick = this.onfoodItemClick.bind(this);
        for(let i = 0; i < this.$foodItemElements.length; i++)
        {
            this.$foodItemElements[i].addEventListener("click", this.onfoodItemClick);
            this.$foodItemElements[i].setAttribute("id", i);
        }
    }

    onfoodItemClick(event) {
        //managing highlighting
        const otherHighlightElements = document.getElementsByClassName('highlight');
        for(let i = 0; i < otherHighlightElements.length; i++)
        {
            otherHighlightElements[i].classList.remove('highlight');
        }
        event.target.classList.add('highlight');

        //setting some instance variables
        this.$selectedFoodItem = event.target;
        this.indexOfSelectedFoodItem = this.$selectedFoodItem.id;
        console.log(this.searchData[this.indexOfSelectedFoodItem]);

        //actually displaying detailed nutrition info

    }

    createNutritionDetails() {
       
    }

    onFormSubmit(event) {
        event.preventDefault();
        const searchTerm = this.$searchBar.value;

        //get request
        fetch(`${SERVER_URL}parser?ingr=${searchTerm}&app_key=${EDAMAM_KEY}&app_id=${APP_ID}`) //location info
        .then(response => response.json())
        .then(data => {
            const primaryResult = data.parsed[0].food;
            const secondaryResults = data.hints;

            this.updateSearchResults(primaryResult, secondaryResults);

            this.$foodItemElements = document.getElementsByClassName("food-item");
            this.addEvents();

            let foodId = this.searchData[this.indexOfSelectedFoodItem].food.foodId;

            // const requestOptions = {
            //     method: 'POST',
            //     mode: 'cors',
            //     url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/nutrients',
            //     headers: {
            //       'content-type': 'application/json',
            //       'X-RapidAPI-Key': '80dd5c583fmsh195bc454691a775p1d8046jsnaab7848e906c',
            //       'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
            //     },
            //     data: {
            //       ingredients: [
            //         {
            //           quantity: 1, //might want to add user input for this 
            //           measureURI: 'http://www.edamam.com/ontologies/edamam.owl#Measure_cup',
            //           qualifiers: [],
            //           foodId: foodId
            //         }
            //       ]
            //     }
            //   };
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    ingredients: [
                    {
                        quantity: 1, //might want to add user input for this 
                        measureURI: 'http://www.edamam.com/ontologies/edamam.owl#Measure_cup',
                        qualifiers: [],
                        foodId: foodId
                    }
                    ]
                }
              };
            fetch(`${SERVER_URL}nutrients?`, requestOptions)
            .then(request => {
                console.log(request);
              })
            .catch(error => {
                console.log(error)
                alert("something went wrong searching nutrient information")
            })
            
        })
        .catch(error => {
              console.log(error)
              alert("something went wrong searching the food item")
            })
    }

    updateSearchResults(topResult, similarResults) {
        //updating top results
        let newTopResult = this.createFoodItem(topResult.label, topResult.nutrients.ENERC_KCAL, topResult.nutrients.PROCNT, topResult.nutrients.FAT, topResult.nutrients.FIBTG, topResult.nutrients.CHOCDF);
        this.$topResult.innerHTML = newTopResult;

        //updating similar results
        let newSimilarResults = ``;
        let startIndex = 0;
        let endIndex = 4;
        if (similarResults[0].food.label == topResult.label)
            {
                startIndex = 1;
                endIndex += 1;
                this.searchData.push(similarResults[0]);
                console.log("condition 1");
            }
        else
        {
            this.searchData.push(topResult);
        }
            
        for (let i = startIndex; i < endIndex; i++)
        {
            let thisFood = similarResults[i].food;
            let result = this.createFoodItem(thisFood.label, thisFood.nutrients.ENERC_KCAL, thisFood.nutrients.PROCNT, thisFood.nutrients.FAT, thisFood.nutrients.FIBTG, thisFood.nutrients.CHOCDF);
            newSimilarResults += result;
            this.searchData.push(similarResults[i]);
        }
        this.$similarResults.innerHTML = newSimilarResults;
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