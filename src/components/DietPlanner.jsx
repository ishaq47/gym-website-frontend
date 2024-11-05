import React, { useState } from 'react';

const DietPlanner = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    goal: 'lose',
    activityLevel: 'sedentary',
    age: '',
    gender: 'male',
    allergies: ''
  });
  const [showPlan, setShowPlan] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = formData.height / 100;
    return (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const calculateCalories = () => {
    const bmr = formData.gender === 'male'
      ? 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5
      : 10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;

    const activityMultipliers = {
      sedentary: 1.2,
      moderate: 1.375,
      active: 1.55
    };

    let calories = bmr * activityMultipliers[formData.activityLevel];
    calories = formData.goal === 'lose' ? calories - 500 : formData.goal === 'gain' ? calories + 500 : calories;
    
    return Math.round(calories);
  };

  const calculateMacronutrients = (calories) => {
    const protein = formData.gender === 'male' ? Math.round(formData.weight * 2.2) : Math.round(formData.weight * 1.8);
    const fats = Math.round((calories * (formData.goal === 'lose' ? 0.2 : 0.3)) / 9);
    const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);

    return { protein, fats, carbs };
  };

  const generateMealPortions = (mealCalories, goal) => ({
    protein: Math.round((mealCalories * (goal === 'lose' ? 0.3 : 0.35)) / 4),
    carbs: Math.round((mealCalories * (goal === 'lose' ? 0.4 : 0.45)) / 4),
    fats: Math.round((mealCalories * (goal === 'lose' ? 0.3 : 0.2)) / 9)
  });

  const generateMealSuggestions = (meal, goal) => {
    const options = {
      lose: {
        breakfast: [
          { item: "Greek yogurt", quantity: "200g", extras: "1 tbsp chia seeds, 1/2 cup berries" },
          { item: "Egg whites", quantity: "5 egg whites", sides: "1 slice whole grain toast" }
        ],
        snack: [{ item: "Apple", quantity: "1 medium", extras: "10 almonds" }],
        lunch: [{ item: "Grilled chicken breast", quantity: "150g", sides: "1 cup mixed greens, 1/2 cup quinoa" }],
        dinner: [{ item: "Baked chicken breast", quantity: "150g", sides: "Steamed broccoli, 1/2 sweet potato" }]
      },
      gain: {
        breakfast: [
          { item: "Scrambled eggs", quantity: "3 whole eggs", sides: "2 slices whole grain toast, 1/4 avocado" },
          { item: "Oatmeal", quantity: "1 cup", extras: "1 scoop protein powder, 1 banana" }
        ],
        snack: [{ item: "Banana", quantity: "1 large", extras: "1 tbsp peanut butter" }],
        lunch: [{ item: "Salmon", quantity: "200g", sides: "1 cup brown rice, 1 cup vegetables" }],
        dinner: [{ item: "Lean beef", quantity: "200g", sides: "1 cup whole grain pasta, large salad" }]
      },
      maintain: {
        breakfast: [
          { item: "Avocado toast", quantity: "2 slices whole grain toast", sides: "1/4 avocado, 1 poached egg" },
          { item: "Smoothie", quantity: "1 large glass", extras: "spinach, 1 banana, 1 scoop protein powder" }
        ],
        snack: [{ item: "Mixed nuts", quantity: "1 handful", extras: "no added salt" }],
        lunch: [{ item: "Grilled chicken", quantity: "150g", sides: "1 cup mixed greens, 1/2 cup wild rice" }],
        dinner: [{ item: "Stir-fried tofu", quantity: "200g", sides: "1 cup quinoa, mixed vegetables" }]
      }
    };
  
    return options[goal][meal];
  };
  

  const generateDietPlan = () => {
    const dailyCalories = calculateCalories();
    const macronutrients = calculateMacronutrients(dailyCalories);
    const mealDistribution = {
      breakfast: 0.25,
      snack1: 0.1,
      lunch: 0.3,
      snack2: 0.1,
      dinner: 0.25
    };

    const meals = {
      breakfast: {
        calories: Math.round(dailyCalories * mealDistribution.breakfast),
        portions: generateMealPortions(dailyCalories * mealDistribution.breakfast, formData.goal),
        suggestions: generateMealSuggestions('breakfast', formData.goal)
      },
      snack1: {
        calories: Math.round(dailyCalories * mealDistribution.snack1),
        portions: generateMealPortions(dailyCalories * mealDistribution.snack1, formData.goal),
        suggestions: generateMealSuggestions('snack', formData.goal)
      },
      lunch: {
        calories: Math.round(dailyCalories * mealDistribution.lunch),
        portions: generateMealPortions(dailyCalories * mealDistribution.lunch, formData.goal),
        suggestions: generateMealSuggestions('lunch', formData.goal)
      },
      snack2: {
        calories: Math.round(dailyCalories * mealDistribution.snack2),
        portions: generateMealPortions(dailyCalories * mealDistribution.snack2, formData.goal),
        suggestions: generateMealSuggestions('snack', formData.goal)
      },
      dinner: {
        calories: Math.round(dailyCalories * mealDistribution.dinner),
        portions: generateMealPortions(dailyCalories * mealDistribution.dinner, formData.goal),
        suggestions: generateMealSuggestions('dinner', formData.goal)
      }
    };

    setDietPlan({ dailyCalories, macronutrients, meals });
    setShowPlan(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="md:min-h-screen w-full p-2 md:p-8">
      <div className="max-w-4xl mx-auto bg-[#241010a6] text-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold mb-6">Personalized Diet Planner</h1>
        
        <form className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Height (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
          </div>
          <div>
            <label className="block mb-2">Weight (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
          </div>
          <div>
            <label className="block mb-2">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
          </div>
          <div>
            <label className="block mb-2">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent">
              <option className='text-black' value="male">Male</option>
              <option className='text-black' value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange} className="w-full px-3 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent">
              <option className='text-black' value="lose">Lose Weight</option>
              <option className='text-black' value="maintain">Maintain Weight</option>
              <option className='text-black' value="gain">Gain Weight</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Activity Level</label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-3 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent">
              <option className='text-black' value="sedentary">Sedentary</option>
              <option className='text-black' value="moderate">Moderate</option>
              <option className='text-black' value="active">Active</option>
            </select>
          </div>
        </form>

        <button onClick={generateDietPlan} className="mt-6 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg focus:outline-none hover:bg-blue-600">
          Generate Diet Plan
        </button>

        {showPlan && dietPlan && (
          <div className="mt-6  ">
            <h2 className="text-xl font-bold text-red-400">Your Personalized Diet Plan</h2>
            <p>BMI: {calculateBMI()}</p>
            <p>Daily Calories: {dietPlan.dailyCalories}</p>
            <p>Protein: {dietPlan.macronutrients.protein}g</p>
            <p>Carbs: {dietPlan.macronutrients.carbs}g</p>
            <p>Fats: {dietPlan.macronutrients.fats}g</p>

            {Object.entries(dietPlan.meals).map(([meal, details]) => (
              <div key={meal} className="mt-4 border p-2 border-gray-400 rounded-lg">
                <h3 className="text-lg font-semibold capitalize text-red-400">{meal}</h3>
                <p>Calories: {details.calories}</p>
                <p>Protein: {details.portions.protein}g</p>
                <p>Carbs: {details.portions.carbs}g</p>
                <p>Fats: {details.portions.fats}g</p>
                <ul>
                  {details.suggestions.map((suggestion, index) => (
                    <li key={index}>
                      {suggestion.item} - {suggestion.quantity} {suggestion.sides ? `with ${suggestion.sides}` : ''} {suggestion.extras ? `, ${suggestion.extras}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlanner;
