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

export const mealAlternatives: Record<string, Meal[]> = {
  Breakfast: [
    { id: 'alt-b1', name: 'Greek Yogurt Parfait', calories: 280, carbs: 35, proteins: 18, fats: 8, mealType: 'Breakfast', time: '08:00', date: '' },
    { id: 'alt-b2', name: 'Smoothie Bowl', calories: 350, carbs: 50, proteins: 14, fats: 10, mealType: 'Breakfast', time: '08:00', date: '' },
    { id: 'alt-b3', name: 'Avocado Toast & Eggs', calories: 420, carbs: 30, proteins: 20, fats: 24, mealType: 'Breakfast', time: '08:00', date: '' },
  ],
  Lunch: [
    { id: 'alt-l1', name: 'Turkey Wrap', calories: 450, carbs: 35, proteins: 32, fats: 18, mealType: 'Lunch', time: '12:30', date: '' },
    { id: 'alt-l2', name: 'Quinoa Buddha Bowl', calories: 520, carbs: 55, proteins: 22, fats: 20, mealType: 'Lunch', time: '12:30', date: '' },
    { id: 'alt-l3', name: 'Tuna Poke Bowl', calories: 460, carbs: 40, proteins: 35, fats: 14, mealType: 'Lunch', time: '12:30', date: '' },
  ],
  Dinner: [
    { id: 'alt-d1', name: 'Chicken Stir-Fry', calories: 480, carbs: 35, proteins: 40, fats: 16, mealType: 'Dinner', time: '19:00', date: '' },
    { id: 'alt-d2', name: 'Shrimp Tacos', calories: 440, carbs: 38, proteins: 30, fats: 18, mealType: 'Dinner', time: '19:00', date: '' },
    { id: 'alt-d3', name: 'Lean Beef & Sweet Potato', calories: 550, carbs: 42, proteins: 44, fats: 20, mealType: 'Dinner', time: '19:00', date: '' },
  ],
  Snack: [
    { id: 'alt-s1', name: 'Trail Mix', calories: 200, carbs: 18, proteins: 6, fats: 14, mealType: 'Snack', time: '16:00', date: '' },
    { id: 'alt-s2', name: 'Apple & Peanut Butter', calories: 220, carbs: 25, proteins: 8, fats: 12, mealType: 'Snack', time: '16:00', date: '' },
    { id: 'alt-s3', name: 'Greek Yogurt & Honey', calories: 160, carbs: 20, proteins: 14, fats: 4, mealType: 'Snack', time: '16:00', date: '' },
  ],
};
