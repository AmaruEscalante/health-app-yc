import { DailyNutrition, Meal } from './types';

function generateNutritionHistory(): DailyNutrition[] {
  const days: DailyNutrition[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const cals = 1400 + Math.floor(Math.random() * 800);
    const meals: Meal[] = [
      { id: `m-${dateStr}-1`, name: 'Oatmeal & Berries', calories: 320, carbs: 45, proteins: 12, fats: 8, mealType: 'Breakfast', time: '08:00', date: dateStr },
      { id: `m-${dateStr}-2`, name: 'Grilled Chicken Salad', calories: 480, carbs: 20, proteins: 42, fats: 18, mealType: 'Lunch', time: '12:30', date: dateStr },
      { id: `m-${dateStr}-3`, name: 'Salmon & Vegetables', calories: 520, carbs: 30, proteins: 38, fats: 22, mealType: 'Dinner', time: '19:00', date: dateStr },
      { id: `m-${dateStr}-4`, name: 'Protein Shake', calories: 180, carbs: 10, proteins: 30, fats: 3, mealType: 'Snack', time: '16:00', date: dateStr },
    ];
    days.push({
      date: dateStr,
      totalCalories: cals,
      goalCalories: 1500,
      carbs: { current: 80 + Math.floor(Math.random() * 40), goal: 174 },
      proteins: { current: 90 + Math.floor(Math.random() * 40), goal: 130 },
      fats: { current: 40 + Math.floor(Math.random() * 20), goal: 65 },
      meals,
    });
  }
  return days;
}

export const mockNutritionHistory = generateNutritionHistory();
